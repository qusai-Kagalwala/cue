// src/lib/godMode.js
// v2-20a — God Mode: a session-only synthetic-state overlay for demos.
// The entire point is that the REAL save is never touched: this state
// lives in memory only, is never written to localStorage, and vanishes
// on refresh. Activated by the Qu$@1 easter egg (v2-20b).
//
// NOT documented in README or the Programme — it's a demo/cheat tool, and
// a documented easter egg is just a feature. Its only record is in
// decisions.md. See useProgress.js for how the overlay intercepts reads
// and no-ops writes.

import { __registerGodActiveStage } from './storage'

let active = false
let listeners = new Set()
let godCurrentStage = null // v2-20a — the stage the demoer switched to

/** Is God Mode currently on? (session-only, never persisted) */
export function isGodMode() {
  return active
}

export function subscribeGodMode(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function emit() {
  listeners.forEach((l) => l())
}

/** Turn God Mode on (v2-20b calls this from the name-box trigger). */
export function enterGodMode() {
  active = true
  emit()
}

/** Turn it off — returns to the real, untouched save. */
export function exitGodMode() {
  active = false
  emit()
}

// A fully-unlocked synthetic account. Every gate in the app reads from
// this while active: max level, all stages' lessons scored, every
// achievement earned, both themes + the god palette available, Encore
// and daily unclaimed-but-reachable, library seeded so it isn't empty.
const ALL_LESSONS = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8']
const ALL_STAGES = ['text', 'image', 'video', 'audio', 'code']

function fullScores() {
  const s = {}
  for (const id of ALL_LESSONS) s[id] = 85 + ((id.charCodeAt(1) * 7) % 15)
  return s
}

function fullStageProgress() {
  const out = {}
  for (const stage of ALL_STAGES) {
    out[stage] = {
      currentLessonIndex: 8, // all complete
      lessonStage: 'solo',
      lessonScores: fullScores(),
      practicePaid: ALL_LESSONS.flatMap((id) => [`${id}:guided`, `${id}:assisted`]),
    }
  }
  return out
}

/**
 * Build the synthetic state fresh each call (so it always reflects the
 * current stage the demoer switched to). `realState` is the true state —
 * we borrow its name so the demo feels personal, nothing else.
 */
export function godState(realState) {
  const today = new Date().toISOString().slice(0, 10)
  return {
    version: realState?.version ?? 1,
    name: realState?.name || 'Director',
    persona: realState?.persona ?? 'professional',
    xp: 2000, // top of the ladder
    level: 6,
    streak: { count: 30, lastActiveDate: today },
    theme: 'god', // the alt palette (v2-20c)
    activeStage: godCurrentStage ?? realState?.activeStage ?? 'text',
    stageProgress: fullStageProgress(),
    // identity extras so callbacks/echoes render
    auditionAttempt: { rank: 'Playwright', taskScore: 75, at: today },
    callbackAttempt: null,
    openingActDone: true,
    matcherUsed: true,
    // Encore shown as earned (its achievement) but the boss itself stays
    // playable; daily left unclaimed so it can be triggered live.
    encoreDone: { at: today, score: 100 },
    dailyDone: null,
    settings: {},
    __god: true, // marker some UI can read (badge, etc.)
  }
}

/**
 * v2-20c — a synthetic attempt history for the Playbill's history-based
 * stickers (first-curtain ≥1, full-house ≥20). Session-only, never
 * persisted to cue:attempts:v1. Read by the achievements sync while
 * God Mode is active.
 */
export function godAttempts() {
  if (!active) return null
  const today = new Date().toISOString().slice(0, 10)
  const out = []
  for (const stage of ALL_STAGES) {
    for (const id of ALL_LESSONS.slice(0, 5)) {
      out.push({ lessonId: id, stage, score: 80, at: today, tier: 'solo' })
    }
  }
  return out // 25 attempts
}

// wire storage → god active stage (one-way; storage never imports godMode)
__registerGodActiveStage(() => (active ? godCurrentStage : null))

/** v2-20a — record the stage the demoer switched to (session only). */
export function setGodStage(stageId) {
  godCurrentStage = stageId
}