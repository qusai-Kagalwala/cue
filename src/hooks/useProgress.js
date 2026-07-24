// src/hooks/useProgress.js
// T1.4 — Single source of truth for all progress state.
// Pattern: one module-level store + useSyncExternalStore. Every component
// calling useProgress() reads the SAME state and re-renders on any change —
// no prop drilling, no Context provider, no component ever touching
// localStorage directly (that stays storage.js's job).

import { useSyncExternalStore } from 'react'
import {
  loadState,
  updateState,
  resetState,
  getStageProgress,
  patchStageProgress,
} from '../lib/storage'
import {
  awardXP,
  levelFor,
  xpToNextLevel,
  applyStreak,
  todayKey,
} from '../lib/xp'
import { LESSONS, TOTAL_LESSONS, getLessonByIndex } from '../data/lessons'
import { dailyLessonIndexFor } from '../data/encore'

// ---------- store (module scope: shared by every hook instance) ----------

let state = loadState()
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return state
}

function setState(patch) {
  state = updateState(patch)
  listeners.forEach((l) => l())
}

// v3-1a — journey fields (currentLessonIndex, lessonStage, lessonScores,
// practicePaid) live PER STAGE; identity (xp/level/streak/name/…) stays
// shared. These two helpers are the ONLY code that knows that split.

/** The active stage's progress block. */
function journey() {
  return getStageProgress(state, state.activeStage ?? 'text')
}

/** Merge a patch into the ACTIVE stage's progress and persist. */
function setJourney(patch) {
  const next = patchStageProgress(state, state.activeStage ?? 'text', patch)
  state = updateState({ stageProgress: next.stageProgress })
  listeners.forEach((l) => l())
}

// ---------- actions (stable module functions — safe in deps arrays) ----------

export function setPersona(personaId) {
  setState({ persona: personaId })
}

/**
 * Record a finished lesson: award XP, update level/streak/best score.
 * Does NOT advance the queue — persisting on receipt and advancing on
 * "next" is what makes a mid-results refresh lossless (T4.2 AC).
 * Returns a summary for the XP toast / level-up UI.
 */
export function completeLesson(score) {
  // T5.1 — replays (lesson already has a best score) earn HALF XP.
  // Keeps the economy honest: mastery pays once, practice pays a little.
  const j = journey()
  const lesson = LESSONS[j.currentLessonIndex]
  const isReplay = lesson ? j.lessonScores[lesson.id] != null : false
  let xpGained = isReplay ? Math.round(awardXP(score) / 2) : awardXP(score)

  // v2-10 — daily challenge: if THIS lesson is today's daily and the
  // bonus hasn't been claimed, +20 rides along. Once per day; streak
  // already applies below (any evaluation is streak activity).
  const today = todayKey()
  const isDaily =
    lesson &&
    j.currentLessonIndex === dailyLessonIndexFor(today, TOTAL_LESSONS)
  const dailyBonus = isDaily && state.dailyDone !== today ? 20 : 0
  xpGained += dailyBonus

  const xp = state.xp + xpGained
  const level = levelFor(xp)
  const leveledUp = level > state.level
  const streak = applyStreak(state.streak, todayKey())

  const lessonScores = { ...j.lessonScores }
  if (lesson) {
    const clamped = Math.min(100, Math.max(0, Number(score) || 0))
    lessonScores[lesson.id] = Math.max(lessonScores[lesson.id] ?? 0, clamped)
  }

  setJourney({ lessonScores })        // per-stage
  setState({                          // shared identity
    xp,
    level,
    streak,
    ...(dailyBonus > 0 ? { dailyDone: today } : {}),
  })
  return { xpGained, leveledUp, newLevel: level, isReplay, dailyBonus }
}

/** Move to the next lesson in the flat queue (called by auto-continue).
    Each new lesson starts at the guided stage — the teaching ladder. */
export function advanceLesson() {
  const j = journey()
  if (j.currentLessonIndex < TOTAL_LESSONS) {
    setJourney({
      currentLessonIndex: j.currentLessonIndex + 1,
      lessonStage: 'guided',
    })
  }
}

/**
 * Small completion reward for practice tiers: +5 guided, +10 assisted,
 * paid ONCE per lesson per tier, ever (anti-farming: repeat checks and
 * "try different fills" pay nothing). No score bonus — this rewards the
 * achievement of finishing, not the number. Streak counts: practice is
 * real activity. Returns an XPToast-shaped award, or null if already paid.
 */
const PRACTICE_XP = { guided: 5, assisted: 10 }

export function completePractice(lessonId, tier) {
  const key = `${lessonId}:${tier}`
  const paid = journey().practicePaid ?? []
  if (paid.includes(key)) return null

  const xpGained = PRACTICE_XP[tier] ?? 0
  const xp = state.xp + xpGained
  const level = levelFor(xp)
  const leveledUp = level > state.level
  const streak = applyStreak(state.streak, todayKey())

  setJourney({ practicePaid: [...paid, key] })   // per-stage
  setState({ xp, level, streak })                // shared identity
  return { xpGained, leveledUp, newLevel: level, isReplay: false, practice: true }
}

/**
 * v2-9 — The Encore's payday: 100 base + round(score/2) bonus, ONCE per
 * day (encoreDone stores the claimed dateKey). Returns an XPToast-shaped
 * award, or null when today's bow is already taken. Streak counts.
 */
const ENCORE_BASE_XP = 100

export function completeEncore(score) {
  const today = todayKey()
  if (state.encoreDone === today) return null

  const bonus = Math.round((Math.min(100, Math.max(0, Number(score) || 0))) / 2)
  const xpGained = ENCORE_BASE_XP + bonus
  const xp = state.xp + xpGained
  const level = levelFor(xp)
  const leveledUp = level > state.level
  const streak = applyStreak(state.streak, todayKey())

  setState({ xp, level, streak, encoreDone: today })
  return { xpGained, leveledUp, newLevel: level, isReplay: false, encore: true }
}

/** v2-15 — theme switch. Light is a Level 3 unlock (the XP sink):
    below the gate the request is ignored, dark stays. */
export function setTheme(theme) {
  if (theme === 'light' && state.level < 3) return
  if (theme !== 'light' && theme !== 'dark') return
  setState({ theme })
}

/** Set the current lesson's flow stage: 'guided' | 'assisted' | 'solo'. */
export function setLessonStage(stage) {
  setJourney({ lessonStage: stage })
}

/** Jump to a specific lesson (lesson map replay, T5.1).
    Replays go straight to the assessment — the ladder is for first runs;
    the map's practice chips remain the way to re-practice tiers. */
export function goToLesson(index) {
  if (index >= 0 && index < TOTAL_LESSONS) {
    setJourney({ currentLessonIndex: index, lessonStage: 'solo' })
  }
}

/** Full wipe — Settings → Reset progress (T5.2). */
export function resetProgress() {
  state = resetState()
  listeners.forEach((l) => l())
}

// ---------- the hook ----------

export function useProgress() {
  const s = useSyncExternalStore(subscribe, getSnapshot)

  const isComplete = s.currentLessonIndex >= TOTAL_LESSONS
  const currentLesson = isComplete
    ? null
    : getLessonByIndex(s.currentLessonIndex, s.persona ?? 'everyday')

  return {
    // state
    persona: s.persona,
    name: s.name ?? null,          // v2-3d — echoes across toast/finale/card
    activeStage: s.activeStage ?? 'text',
    currentLessonIndex: getStageProgress(s, s.activeStage ?? 'text').currentLessonIndex,
    lessonStage: getStageProgress(s, s.activeStage ?? 'text').lessonStage ?? 'guided',
    currentLesson,          // merged with persona variant, null when all done
    isComplete,
    xp: s.xp,
    level: s.level,
    xpToNext: xpToNextLevel(s.xp),
    streak: s.streak.count,
    lessonScores: getStageProgress(s, s.activeStage ?? 'text').lessonScores,
    totalLessons: TOTAL_LESSONS,
    encoreDoneToday: s.encoreDone === todayKey(),
    dailyDoneToday: s.dailyDone === todayKey(),
    theme: s.theme ?? 'dark',
    dailyLessonIndex: dailyLessonIndexFor(todayKey(), TOTAL_LESSONS),
    // actions
    setPersona,
    completeLesson,
    advanceLesson,
    setLessonStage,
    completePractice,
    completeEncore,
    setTheme,
    goToLesson,
    resetProgress,
  }
}