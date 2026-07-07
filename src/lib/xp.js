// src/lib/xp.js
// T1.3 — XP, level, and streak logic. Pure functions only: no React,
// no localStorage, no Date.now() hidden inside (dates are passed in),
// which is exactly what makes this file unit-testable.

export const BASE_XP = 50
export const LEVEL_THRESHOLDS = [100, 250, 500, 1000, 2000]
export const MAX_LEVEL = LEVEL_THRESHOLDS.length + 1 // 6

/**
 * XP earned for a completed lesson.
 * 50 base + bonus of round(score/2), so a perfect 100 earns 100 XP.
 * Score is clamped to 0–100 defensively (Gemini should respect the schema,
 * but the XP system shouldn't trust it).
 */
export function awardXP(score) {
  const s = Math.min(100, Math.max(0, Number(score) || 0))
  return BASE_XP + Math.round(s / 2)
}

/** Level for a total XP amount: below 100 → 1, 100–249 → 2, … 2000+ → 6. */
export function levelFor(xp) {
  let level = 1
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold) level++
  }
  return level
}

/** XP still needed for the next level, or null at max level (drives the pill/progress UI). */
export function xpToNextLevel(xp) {
  const next = LEVEL_THRESHOLDS.find((t) => xp < t)
  return next === undefined ? null : next - xp
}

/** Local date as 'YYYY-MM-DD' — the streak's unit of time. */
export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** The day before a 'YYYY-MM-DD' key (handles month/year rollovers via Date math). */
function yesterdayOf(dayKey) {
  const [y, m, d] = dayKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() - 1)
  return todayKey(date)
}

/**
 * Streak transition on lesson completion.
 *   same day again    → unchanged
 *   was yesterday     → count + 1
 *   older / first use → reset to 1 (today starts a new streak)
 * Returns a NEW object — never mutates input.
 */
export function applyStreak(streak, today = todayKey()) {
  const { count = 0, lastActiveDate = null } = streak ?? {}

  if (lastActiveDate === today) {
    return { count, lastActiveDate }
  }
  if (lastActiveDate === yesterdayOf(today)) {
    return { count: count + 1, lastActiveDate: today }
  }
  return { count: 1, lastActiveDate: today }
}