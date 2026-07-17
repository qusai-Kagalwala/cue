// src/lib/sandboxQuota.js
// v2-2a — Daily sandbox evaluation quota. Pure module, localStorage-backed.
// Base 3/day + 1 per level (the XP sink). Shared by Freeplay AND the
// Critic's Review (v2-2c). Resets by local date key — no timers needed.

const KEY = 'cue:sandbox:v1'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    // Stale date → fresh day, counter resets implicitly
    if (parsed?.date === todayKey() && Number.isInteger(parsed.used)) return parsed
  } catch { /* corrupt → fresh */ }
  return { date: todayKey(), used: 0 }
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private mode */ }
}

/** Total allowed today for a given level: base 3 + 1 per level. */
export function dailyAllowance(level) {
  return 3 + Math.max(0, level ?? 1)
}

/** Evaluations left today. */
export function remainingToday(level) {
  return Math.max(0, dailyAllowance(level) - load().used)
}

/** Spend one. Returns true if spent, false if quota exhausted. */
export function spendOne(level) {
  const state = load()
  if (state.used >= dailyAllowance(level)) return false
  save({ date: state.date, used: state.used + 1 })
  return true
}