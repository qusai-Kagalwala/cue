// src/lib/storage.js
// T1.2 — Single localStorage blob under `cue:v1`. Pure module, no React.
// T-fix-1 — attempt-history log under its own key `cue:attempts:v1`
// (separate from the state blob: append-only data shouldn't ride through
// the state merge logic, and the Season Report reads it independently).

const KEY = 'cue:v1'
const ATTEMPTS_KEY = 'cue:attempts:v1'
const MAX_ATTEMPTS = 500 // cap so years of replays can't blow localStorage
const VERSION = 1

export const DEFAULT_STATE = Object.freeze({
  version: VERSION,
  persona: null,                 // null → first visit → show persona picker
  name: null,                    // v2-3a — captured in Opening Act beat 2
  openingActDone: false,         // v2-3a — the act never repeats once true
  auditionAttempt: null,         // v2-3c — the "before" (null = skipped)
  callbackAttempt: null,         // v2-4a — the "after", written on the finale
  activeStage: 'text',           // v3-1a — which stage is being played
  // v3-1a — PER-STAGE progress. Identity (name/xp/level/streak/playbill/
  // theme/persona/audition) stays SHARED above; only the lesson journey
  // is keyed by stage. See docs/v3-stages.md §2.
  stageProgress: {
    text: {
      currentLessonIndex: 0,
      lessonStage: 'guided',     // flow: guided → assisted → solo
      lessonScores: {},
      practicePaid: [],          // 'l1:guided' — each tier pays ONCE ever
    },
  },
  matcherUsed: false,            // v2-7 — the persona matcher fires once, ever
  encoreDone: null,              // v2-9 — dateKey of the last claimed Encore
  dailyDone: null,               // v2-10 — dateKey of the last daily bonus
  theme: 'dark',                 // v2-15 — 'dark' | 'light' (light = L3 unlock)
  xp: 0,
  level: 1,
  streak: { count: 0, lastActiveDate: null },
  settings: {},
})

/** v3-1a — a fresh per-stage progress block. */
export function freshStageProgress() {
  return {
    currentLessonIndex: 0,
    lessonStage: 'guided',
    lessonScores: {},
    practicePaid: [],
  }
}

function freshState() {
  return {
    ...DEFAULT_STATE,
    streak: { ...DEFAULT_STATE.streak },
    settings: {},
    activeStage: 'text',
    stageProgress: { text: freshStageProgress() },
  }
}

function isValid(state) {
  // v3-1a — accepts BOTH shapes: pre-v3 flat saves (migrated below) and
  // v3 staged saves. Either must carry identity + a lesson journey.
  const hasIdentity =
    state !== null &&
    typeof state === 'object' &&
    typeof state.version === 'number' &&
    typeof state.xp === 'number' &&
    state.streak !== null &&
    typeof state.streak === 'object'
  if (!hasIdentity) return false
  const flat =
    typeof state.currentLessonIndex === 'number' &&
    typeof state.lessonScores === 'object'
  const staged =
    state.stageProgress !== null && typeof state.stageProgress === 'object'
  return flat || staged
}

/**
 * v3-1a — fold a pre-v3 flat save into the staged shape. Lossless and
 * one-way: the four journey fields move into stageProgress.text, the
 * flat copies are dropped, identity is untouched. Idempotent — a save
 * that already has stageProgress passes through unchanged.
 */
function migrateToStages(state) {
  if (state.stageProgress && typeof state.stageProgress === 'object') {
    // already staged; just make sure text exists
    if (!state.stageProgress.text) {
      state.stageProgress = { ...state.stageProgress, text: freshStageProgress() }
    }
    return state
  }
  const folded = {
    currentLessonIndex: state.currentLessonIndex ?? 0,
    lessonStage: state.lessonStage ?? 'guided',
    lessonScores: state.lessonScores ?? {},
    practicePaid: state.practicePaid ?? [],
  }
  const next = { ...state, activeStage: 'text', stageProgress: { text: folded } }
  delete next.currentLessonIndex
  delete next.lessonStage
  delete next.lessonScores
  delete next.practicePaid
  console.info('[cue] progress migrated into the Text stage.')
  return next
}

function migrate(state) {
  if (state.version === VERSION) return migrateToStages(state)
  console.warn(`[cue] unknown state version ${state.version} — resetting.`)
  return freshState()
}

export function loadState() {
  let raw
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    console.warn('[cue] localStorage unavailable — progress will not persist.')
    return freshState()
  }

  if (raw === null) return freshState()

  try {
    const parsed = JSON.parse(raw)
    if (!isValid(parsed)) throw new Error('invalid shape')
    const migrated = migrate(parsed)
    return {
      ...freshState(),
      ...migrated,
      streak: { ...DEFAULT_STATE.streak, ...parsed.streak },
      stageProgress: {
        text: freshStageProgress(),
        ...(migrated.stageProgress ?? {}),
      },
    }
  } catch (err) {
    console.warn('[cue] corrupt saved state — resetting to defaults.', err)
    saveState(freshState())
    return freshState()
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch (err) {
    console.warn('[cue] could not save progress.', err)
    return false
  }
}

export function updateState(patch) {
  const next = { ...loadState(), ...patch }
  saveState(next)
  return next
}

export function resetState() {
  try {
    localStorage.removeItem(KEY)
    localStorage.removeItem(ATTEMPTS_KEY) // reset wipes history too
    localStorage.removeItem('cue:sandbox:v1') // sandbox quota resets with everything else
    localStorage.removeItem('cue:library:v1') // the library goes with everything else
    localStorage.removeItem('cue:playbill:v1') // stickers too — a reset is a reset
  } catch {
    /* ignore */
  }
  return freshState()
}

// ---------- v3-1a: stage accessors ----------

/** Active stage id — read by the lessons shim on every content access. */
export function getActiveStage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    return typeof parsed?.activeStage === 'string' ? parsed.activeStage : 'text'
  } catch {
    return 'text'
  }
}

/** Progress block for a stage, always a valid object. */
export function getStageProgress(state, stageId) {
  return state?.stageProgress?.[stageId] ?? freshStageProgress()
}

/** Merge a patch into ONE stage's progress; returns the next full state. */
export function patchStageProgress(state, stageId, patch) {
  const current = getStageProgress(state, stageId)
  return {
    ...state,
    stageProgress: {
      ...state.stageProgress,
      [stageId]: { ...current, ...patch },
    },
  }
}

// ---------- v2-11: prompt library (best work, kept) ----------

const LIBRARY_KEY = 'cue:library:v1'
const MAX_LIBRARY = 50
export const LIBRARY_THRESHOLD = 58 // the rubric's "high" band floor

/** Read the library, newest first. Never throws; corrupt/missing → []. */
export function loadLibrary() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LIBRARY_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Save a winning prompt. Dedupes on exact prompt text (replays of the
 * same words don't multiply); cap enforced OLDEST-OUT (slice keeps the
 * newest 50). Returns true if saved, false if duplicate/failed.
 */
export function saveToLibrary({ lessonId, title, prompt, score }) {
  const library = loadLibrary()
  const text = (prompt ?? '').trim()
  if (!text) return false
  if (library.some((e) => e.prompt === text)) return false
  library.unshift({
    lessonId,
    title,
    prompt: text,
    score,
    timestamp: new Date().toISOString(),
  })
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library.slice(0, MAX_LIBRARY)))
    return true
  } catch (err) {
    console.warn('[cue] could not save to library.', err)
    return false
  }
}

/** Remove one entry by its timestamp (the stable id). */
export function removeFromLibrary(timestamp) {
  const library = loadLibrary().filter((e) => e.timestamp !== timestamp)
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library))
  } catch {
    /* ignore */
  }
}

// ---------- T-fix-1: attempt history (append-only) ----------

/** Read the attempts array. Never throws; corrupt/missing → []. */
export function loadAttempts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ATTEMPTS_KEY))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Append one evaluation to history and return the stored entry.
 * entry: { lessonId, score, engine } — timestamp + attemptNumber added here.
 * attemptNumber counts prior attempts for the SAME lesson (1-based).
 */
export function appendAttempt({ lessonId, score, engine, prompt = null }) {
  const attempts = loadAttempts()
  const entry = {
    lessonId,
    score,
    engine,
    // v2-17a rider — truncated prompt makes history calibratable; the
    // original logger skipped it (storage weight) and calibration paid.
    ...(prompt ? { prompt: String(prompt).slice(0, 500) } : {}),
    timestamp: new Date().toISOString(),
    attemptNumber: attempts.filter((a) => a.lessonId === lessonId).length + 1,
  }
  attempts.push(entry)
  try {
    localStorage.setItem(
      ATTEMPTS_KEY,
      JSON.stringify(attempts.slice(-MAX_ATTEMPTS))
    )
  } catch (err) {
    console.warn('[cue] could not save attempt history.', err)
  }
  return entry
}