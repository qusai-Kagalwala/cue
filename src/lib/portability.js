// src/lib/portability.js
// v2-14 — Import/export: the whole account as one JSON file. Every key
// the app owns rides along (state, attempts, library, playbill, sandbox
// quota), so export → reset → import is a true round-trip. Validation is
// structural and unforgiving: a file that doesn't prove its shape is
// rejected with a reason, never half-imported.

const EXPORT_FORMAT = 'cue-export'
const EXPORT_VERSION = 1

const KEYS = {
  state: 'cue:v1',
  attempts: 'cue:attempts:v1',
  library: 'cue:library:v1',
  playbill: 'cue:playbill:v1',
  sandbox: 'cue:sandbox:v1',
}

function readRaw(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

/** Assemble the export object from everything on disk. */
export function buildExport() {
  return {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      state: readRaw(KEYS.state),
      attempts: readRaw(KEYS.attempts) ?? [],
      library: readRaw(KEYS.library) ?? [],
      playbill: readRaw(KEYS.playbill) ?? {},
      sandbox: readRaw(KEYS.sandbox),
    },
  }
}

/** Trigger the browser download of the export file. */
export function downloadExport() {
  const payload = JSON.stringify(buildExport(), null, 2)
  const blob = new Blob([payload], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `cue-progress-${date}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Structural validation. Returns { ok: true } or { ok: false, error }.
 * Checks the envelope, then each section's shape; the state section must
 * look like a real Cue state (the fields the app can't run without).
 */
export function validateImport(obj) {
  if (obj == null || typeof obj !== 'object') {
    return { ok: false, error: 'Not a Cue export file.' }
  }
  if (obj.format !== EXPORT_FORMAT) {
    return { ok: false, error: 'Not a Cue export file (wrong format tag).' }
  }
  if (obj.version !== EXPORT_VERSION) {
    return { ok: false, error: `Unsupported export version (${obj.version}).` }
  }
  const d = obj.data
  if (d == null || typeof d !== 'object') {
    return { ok: false, error: 'Export file has no data section.' }
  }
  const s = d.state
  // v3 fix — accept BOTH shapes: pre-v3 flat saves and staged saves.
  // storage.js migrates a flat import on the next load.
  const hasIdentity =
    s != null && typeof s === 'object' &&
    typeof s.version === 'number' &&
    typeof s.xp === 'number' &&
    s.streak != null && typeof s.streak === 'object'
  const flatJourney =
    typeof s?.currentLessonIndex === 'number' &&
    typeof s?.lessonScores === 'object'
  const stagedJourney =
    s?.stageProgress != null && typeof s.stageProgress === 'object'
  if (!hasIdentity || !(flatJourney || stagedJourney)) {
    return { ok: false, error: 'Progress data inside the file is damaged.' }
  }
  if (!Array.isArray(d.attempts)) {
    return { ok: false, error: 'Attempt history inside the file is damaged.' }
  }
  if (!Array.isArray(d.library)) {
    return { ok: false, error: 'Prompt library inside the file is damaged.' }
  }
  if (d.playbill != null && typeof d.playbill !== 'object') {
    return { ok: false, error: 'Playbill data inside the file is damaged.' }
  }
  return { ok: true }
}

/**
 * Write a VALIDATED export into storage. Caller validates first; this
 * writes all keys then reports success. The caller should reload the app
 * afterwards — the in-memory store re-initialises from storage on boot.
 */
export function applyImport(obj) {
  try {
    localStorage.setItem(KEYS.state, JSON.stringify(obj.data.state))
    localStorage.setItem(KEYS.attempts, JSON.stringify(obj.data.attempts))
    localStorage.setItem(KEYS.library, JSON.stringify(obj.data.library))
    localStorage.setItem(KEYS.playbill, JSON.stringify(obj.data.playbill ?? {}))
    if (obj.data.sandbox != null) {
      localStorage.setItem(KEYS.sandbox, JSON.stringify(obj.data.sandbox))
    }
    return true
  } catch {
    return false
  }
}