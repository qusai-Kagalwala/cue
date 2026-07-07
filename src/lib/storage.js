// src/lib/storage.js
// T1.2 — Single localStorage blob under `cue:v1`. Pure module, no React.
// Rules: only this file touches localStorage. Corrupt/missing data never throws —
// it resets to defaults with a console warning (AC: no white screens, ever).

const KEY = 'cue:v1'
const VERSION = 1

export const DEFAULT_STATE = Object.freeze({
  version: VERSION,
  persona: null,                 // null → first visit → show persona picker (T2.3)
  currentLessonIndex: 0,         // 0-based position in the flat queue
  xp: 0,
  level: 1,
  streak: { count: 0, lastActiveDate: null },   // date as 'YYYY-MM-DD'
  lessonScores: {},              // { l1: 82, ... } — best score per lesson
  settings: {},                  // reserved (persona lives top-level, theme is dark-only MVP)
})

/** Deep-ish clone of defaults so callers can't mutate the frozen template. */
function freshState() {
  return {
    ...DEFAULT_STATE,
    streak: { ...DEFAULT_STATE.streak },
    lessonScores: {},
    settings: {},
  }
}

/** True if the parsed blob looks like a usable state object. */
function isValid(state) {
  return (
    state !== null &&
    typeof state === 'object' &&
    typeof state.version === 'number' &&
    typeof state.xp === 'number' &&
    typeof state.currentLessonIndex === 'number' &&
    state.streak !== null &&
    typeof state.streak === 'object' &&
    typeof state.lessonScores === 'object'
  )
}

/**
 * Placeholder for future schema migrations. v1 is current, so any other
 * version resets. If a v2 ever ships, transform old shapes here instead.
 */
function migrate(state) {
  if (state.version === VERSION) return state
  console.warn(`[cue] unknown state version ${state.version} — resetting.`)
  return freshState()
}

/** Load state. Never throws. Merges over defaults so new fields appear on old saves. */
export function loadState() {
  let raw
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    // localStorage blocked (private mode / permissions) — run in-memory this session
    console.warn('[cue] localStorage unavailable — progress will not persist.')
    return freshState()
  }

  if (raw === null) return freshState() // genuine first visit

  try {
    const parsed = JSON.parse(raw)
    if (!isValid(parsed)) throw new Error('invalid shape')
    return { ...freshState(), ...migrate(parsed), streak: { ...DEFAULT_STATE.streak, ...parsed.streak } }
  } catch (err) {
    console.warn('[cue] corrupt saved state — resetting to defaults.', err)
    saveState(freshState())
    return freshState()
  }
}

/** Save the full state object. Never throws (quota-full / blocked = warn and continue). */
export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch (err) {
    console.warn('[cue] could not save progress.', err)
    return false
  }
}

/** Merge a partial patch into stored state and persist. Returns the new state. */
export function updateState(patch) {
  const next = { ...loadState(), ...patch }
  saveState(next)
  return next
}

/** Wipe everything — used by Settings → Reset progress (T5.2). */
export function resetState() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore — nothing to remove or storage blocked */
  }
  return freshState()
}