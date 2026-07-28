// src/components/CoachOverlay.jsx
// The First-Night Coach: a reusable guided tour. Given a script of steps, it
// highlights real on-screen elements (found by their [data-coach="key"]
// attribute) and shows a card with Next / Skip. The L1 script lives in
// data/coach.js — this file is just the machine.
//
// Design (rewritten for reliability on touch):
//  - The dimmer is a plain layer with NO click handler and pointer-events
//    NONE. It only darkens; it never competes with the buttons. This is the
//    key fix — the previous full-screen click-catching SVG was swallowing
//    taps on the tour's own buttons.
//  - The card is FIXED to the bottom of the screen (a bottom sheet). Its
//    position never depends on the target, so its buttons are always in the
//    same reachable place and can't be pushed off-screen.
//  - A soft highlight ring still marks the current target (pointer-events
//    none, purely visual), so the tour still "points at" the L1 elements.
//  - A step whose target isn't in the DOM is skipped automatically.

import { useEffect, useState, useCallback, useRef } from 'react'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Measure a target element by its data-coach key. Returns null if absent.
function measure(key) {
  const el = document.querySelector(`[data-coach="${key}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (r.width === 0 && r.height === 0) return null
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

// From step `from`, walk forward past any missing-target steps and return the
// first that exists (targetless steps are valid). i === steps.length means
// "nothing left -> finish".
function resolveFrom(steps, from) {
  let i = from
  while (i < steps.length) {
    const step = steps[i]
    if (!step.target) return { i, r: null }
    const r = measure(step.target)
    if (r) return { i, r }
    i += 1
  }
  return { i: steps.length, r: null }
}

export default function CoachOverlay({ steps, onDone }) {
  const first = resolveFrom(steps, 0)
  const [index, setIndex] = useState(first.i)
  // `tick` is bumped by resize/scroll listeners to force a re-measure during
  // render — we never store the rect in state (that would need setState in an
  // effect). The rect is derived below, on every render.
  const [, setTick] = useState(0)
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDone?.()
  }, [onDone])

  const goTo = useCallback(
    (from) => {
      const { i } = resolveFrom(steps, from)
      if (i >= steps.length) {
        finish()
        return
      }
      setIndex(i)
    },
    [steps, finish],
  )

  // If the opening step was already past the end, finish (after render).
  useEffect(() => {
    if (first.i >= steps.length) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Subscribe to layout changes so the highlight ring re-measures. The
  // listener only bumps `tick` (a re-render) — it never calls setState with a
  // computed value inside the effect body, so there's no cascading-render
  // lint issue. The rect itself is derived during render (below).
  useEffect(() => {
    const bump = () => setTick((n) => n + 1)
    window.addEventListener('resize', bump)
    window.addEventListener('scroll', bump, true)
    return () => {
      window.removeEventListener('resize', bump)
      window.removeEventListener('scroll', bump, true)
    }
  }, [])

  // Keyboard: Esc skips, Enter / -> advances.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') finish()
      else if (e.key === 'Enter' || e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, goTo, finish])

  const step = steps[index]
  if (!step) return null

  // Derived, not stored: measure the current target every render. Re-runs on
  // index change and on the tick bumps from resize/scroll listeners.
  const rect = step.target ? measure(step.target) : null

  const last = index === steps.length - 1
  const pad = 6
  const trans = reducedMotion ? '' : 'transition-all duration-300 ease-out'

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Guided tour">
      {/* Dimmer: darkens the page. NO click handler, NO pointer events — it
          can never intercept a tap meant for the card's buttons. */}
      <div
        className={`absolute inset-0 bg-stage/70 ${trans}`}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* Highlight ring around the current target — purely visual. */}
      {rect && (
        <div
          className={`pointer-events-none absolute rounded-xl ring-2 ring-cue ${trans}`}
          style={{
            top: rect.top - pad,
            left: rect.left - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
            boxShadow: '0 0 0 4px rgba(245,185,66,0.15)',
          }}
        />
      )}

      {/* The card — FIXED to the bottom. Its buttons are the only interactive
          elements in the overlay, always in the same reachable spot. */}
      <div
        className={`absolute inset-x-0 bottom-0 ${trans}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto max-w-md p-4">
          <div className="rounded-2xl border border-cue-dim bg-surface p-5 shadow-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {index + 1} / {steps.length}
            </span>
            {step.title && (
              <h3 className="mt-1 font-display text-lg font-semibold text-cue">
                {step.title}
              </h3>
            )}
            <p className="mt-1 text-sm leading-relaxed text-ink">{step.body}</p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={finish}
                className="rounded-lg px-3 py-2 font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                {last ? '' : 'skip tour'}
              </button>
              <button
                type="button"
                onClick={() => (last ? finish() : goTo(index + 1))}
                className="rounded-lg bg-cue px-6 py-2.5 text-sm font-medium text-stage transition-colors hover:bg-cue-bright"
              >
                {last ? 'Got it' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}