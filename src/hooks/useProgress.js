// src/hooks/useProgress.js
// T1.4 — Single source of truth for all progress state.
// Pattern: one module-level store + useSyncExternalStore. Every component
// calling useProgress() reads the SAME state and re-renders on any change —
// no prop drilling, no Context provider, no component ever touching
// localStorage directly (that stays storage.js's job).

import { useSyncExternalStore } from 'react'
import {
  loadState,
  saveState,
  resetState as wipeStorage,
} from '../lib/storage'
import {
  awardXP,
  levelFor,
  xpToNextLevel,
  applyStreak,
  todayKey,
} from '../lib/xp'
import { LESSONS, TOTAL_LESSONS, getLessonByIndex } from '../data/lessons'

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
  state = { ...state, ...patch }
  saveState(state)
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
  const xpGained = awardXP(score)
  const xp = state.xp + xpGained
  const level = levelFor(xp)
  const leveledUp = level > state.level
  const streak = applyStreak(state.streak, todayKey())

  const lesson = LESSONS[state.currentLessonIndex]
  const lessonScores = { ...state.lessonScores }
  if (lesson) {
    const clamped = Math.min(100, Math.max(0, Number(score) || 0))
    lessonScores[lesson.id] = Math.max(lessonScores[lesson.id] ?? 0, clamped)
  }

  setState({ xp, level, streak, lessonScores })
  return { xpGained, leveledUp, newLevel: level }
}

/** Move to the next lesson in the flat queue (called by auto-continue). */
export function advanceLesson() {
  if (state.currentLessonIndex < TOTAL_LESSONS) {
    setState({ currentLessonIndex: state.currentLessonIndex + 1 })
  }
}

/** Jump to a specific lesson (lesson map replay, T5.1). */
export function goToLesson(index) {
  if (index >= 0 && index < TOTAL_LESSONS) {
    setState({ currentLessonIndex: index })
  }
}

/** Full wipe — Settings → Reset progress (T5.2). */
export function resetProgress() {
  state = wipeStorage()
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
    currentLessonIndex: s.currentLessonIndex,
    currentLesson,          // merged with persona variant, null when all done
    isComplete,
    xp: s.xp,
    level: s.level,
    xpToNext: xpToNextLevel(s.xp),
    streak: s.streak.count,
    lessonScores: s.lessonScores,
    totalLessons: TOTAL_LESSONS,
    // actions
    setPersona,
    completeLesson,
    advanceLesson,
    goToLesson,
    resetProgress,
  }
}