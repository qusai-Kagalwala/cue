// src/components/CoachOverlay.jsx
// v2-19a — The First-Night Coach: a reusable spotlight-tour engine.
// Given a script of steps, it highlights real on-screen elements (found by
// their [data-coach="key"] attribute), dims everything else, and shows a
// tooltip with Next / Skip. The L1 script itself lives in data/coach.js
// (v2-19b) — this file is just the machine.
//
// Design decisions:
//  - Targets are located by data-coach attribute, so screens stay ignorant
//    of the coach (no coupling; the tripwire against screens knowing about
//    features holds).
//  - A step whose target isn't in the DOM is SKIPPED automatically, so the
//    tour never points at nothing (e.g. the theme toggle before Lv3).
//  - Under prefers-reduced-motion the ring/tooltip appear without transition.
//  - The scrim is four dimming rectangles around the target rather than one
//    overlay with a hole, so the highlighted element stays fully interactive
//    and crisp.

import { useEffect, useState, useCallback, useRef } from 'react'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Measure a target element by its data-coach key. Returns null if absent.
function measure(key) {
  const el = document.querySelector(`[data-coach="${key}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (r.width === 0 && r.height === 0) return null // present but not laid out
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

// Pure resolver: from step `from`, walk forward past any missing-target
// steps and return the first that exists (targetless steps are valid).
// Returns { i, r }; i === steps.length means "nothing left → finish".
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
  // Resolve the opening step at init (lazy initialisers) so the first
  // render is already correct — no setState-in-effect on mount.
  const first = resolveFrom(steps, 0)
  const [, forceTick] = useState(0)
  const [index, setIndex] = useState(first.i)
  const [rect, setRect] = useState(first.r)
  const doneRef = useRef(false)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDone?.()
  }, [onDone])

  const goTo = useCallback(
    (from) => {
      const { i, r } = resolveFrom(steps, from)
      if (i >= steps.length) {
        finish()
        return
      }
      setIndex(i)
      setRect(r)
    },
    [steps, finish],
  )

  // If the very first resolved step was already past the end (no targets in
  // the DOM at all), finish — done as an effect so it runs after render,
  // not during it.
  useEffect(() => {
    if (first.i >= steps.length) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the highlight aligned on resize / scroll (layout can shift).
  useEffect(() => {
    const step = steps[index]
    if (!step?.target) return
    const reflow = () => {
      setRect(measure(step.target))
      forceTick((n) => n + 1) // recompute viewport size for the dimmer
    }
    window.addEventListener('resize', reflow)
    window.addEventListener('scroll', reflow, true)
    return () => {
      window.removeEventListener('resize', reflow)
      window.removeEventListener('scroll', reflow, true)
    }
  }, [index, steps])

  // Esc skips the whole tour.
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

  const last = index === steps.length - 1
  const pad = 6 // ring padding around the target
  const trans = reducedMotion ? '' : 'transition-all duration-300 ease-out'

  // Tooltip placement: below the target if there's room, else above; for a
  // centred (targetless) step, dead centre.
  const tip = (() => {
    if (!rect) {
      return { position: 'centre' }
    }
    const below = rect.top + rect.height + 12
    const spaceBelow = window.innerHeight - below
    if (spaceBelow > 160) return { top: below, left: rect.left, position: 'below' }
    return { top: rect.top - 12, left: rect.left, position: 'above' }
  })()

  const vw = typeof window !== 'undefined' ? window.innerWidth : 0
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Guided tour"
    >
      {/* One full-viewport dimmer covering the ENTIRE page — navbar included —
          with a real rounded cutout punched out around the target, so the
          highlighted element is the only thing not dimmed. z-50 sits above the
          sticky header (z-10). Tapping the dim area advances. */}
      <svg
        width={vw}
        height={vh}
        className={`absolute inset-0 ${trans}`}
        onClick={() => goTo(index + 1)}
        style={{ cursor: 'pointer' }}
      >
        <defs>
          <mask id="coach-cutout">
            <rect x="0" y="0" width={vw} height={vh} fill="white" />
            {rect && (
              <rect
                x={rect.left - pad}
                y={rect.top - pad}
                width={rect.width + pad * 2}
                height={rect.height + pad * 2}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width={vw}
          height={vh}
          fill="rgba(14,13,11,0.72)"
          mask="url(#coach-cutout)"
        />
      </svg>

      {/* Bright ring around the cutout so the target reads as 'spotlit' */}
      {rect && (
        <div
          className={`pointer-events-none absolute rounded-xl ring-2 ring-cue ${trans}`}
          style={{
            top: rect.top - pad,
            left: rect.left - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className={`absolute z-51 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-cue-dim bg-surface p-4 shadow-xl ${trans}`}
        style={
          tip.position === 'centre'
            ? { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }
            : tip.position === 'above'
              ? { top: tip.top, left: tip.left, transform: 'translateY(-100%)' }
              : { top: tip.top, left: tip.left }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {step.title && (
          <h3 className="mb-1 font-display text-base font-semibold text-cue">{step.title}</h3>
        )}
        <p className="text-sm leading-relaxed text-ink">{step.body}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            {index + 1} / {steps.length}
          </span>
          <div className="flex items-center gap-2">
            {!last && (
              <button
                onClick={finish}
                className="rounded-lg px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                skip
              </button>
            )}
            <button
              onClick={() => goTo(index + 1)}
              className="rounded-lg bg-cue px-4 py-1.5 text-sm font-medium text-stage transition-colors hover:bg-cue-bright"
            >
              {last ? 'Got it' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}