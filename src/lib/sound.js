// src/lib/sound.js
// v3-7 — score-reveal sound cues, hand-rolled with the Web Audio API.
// No dependencies, no audio files: every cue is synthesised on the fly, so
// it adds nothing to the bundle and honours the no-new-deps tripwire.
//
// Cues are OFF by default (many people use Cue in class, on a train, or at
// work) and toggle in Settings. They're intentionally short, soft, and
// pitched by score band so a strong prompt lands brighter than a weak one —
// the sound carries the same feedback the number does.

let ctx = null

// Lazily create (and resume) a single shared AudioContext. Browsers require
// this to happen inside a user gesture the first time; a submit click is one.
function audioCtx() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

// One soft sine "note": frequency in Hz, start offset and length in seconds.
function note(ac, freq, start, dur, peak = 0.14) {
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  const t0 = ac.currentTime + start
  // gentle attack + release so nothing clicks
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

// Little arpeggios per score band — a rising major triad for a great score,
// a plain two-note lift for a decent one, a soft low tone for a weak one.
// Frequencies are a pentatonic-ish set so any combination sounds pleasant.
function melodyFor(score) {
  if (score >= 75) return [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6 — triumphant
  if (score >= 55) return [523.25, 659.25, 783.99] // C5 E5 G5 — solid
  if (score >= 40) return [523.25, 659.25] // C5 E5 — a small lift
  return [392.0, 440.0] // G4 A4 — gentle, non-punishing
}

/**
 * Play the score-reveal cue. No-ops if sound is off or Web Audio is missing.
 * `enabled` is the user's setting; pass it from the caller so this module
 * stays free of app state.
 */
export function playScoreCue(score, enabled) {
  if (!enabled) return
  const ac = audioCtx()
  if (!ac) return
  const notes = melodyFor(score)
  const step = 0.09
  notes.forEach((f, i) => note(ac, f, i * step, 0.22 + (i === notes.length - 1 ? 0.15 : 0)))
}

/** A tiny, distinct two-note flourish for level-ups (optional callers). */
export function playLevelCue(enabled) {
  if (!enabled) return
  const ac = audioCtx()
  if (!ac) return
  note(ac, 659.25, 0, 0.18)
  note(ac, 987.77, 0.1, 0.28, 0.16) // E5 → B5
}