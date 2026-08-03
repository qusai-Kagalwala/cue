// src/components/ScoreDial.jsx
// T4.1 — Circular score dial (0–100). Pure SVG, no libraries.
// Color tells the story before the number does: amber for solid,
// red-ish only when the prompt genuinely missed.
// The number counts up in sync with the arc fill (reward motion, CSS+RAF).

import { useEffect, useRef, useState } from 'react'

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function ScoreDial({ score, offline = false }) {
  const clamped = Math.min(100, Math.max(0, Math.round(score)))

  // Count the displayed number from 0 up to `clamped`, synced to the arc:
  // 150ms delay (matching the arc), then ~800ms of counting. Reduced-motion
  // shows the final number immediately.
  const [shown, setShown] = useState(prefersReduced ? clamped : 0)
  const rafRef = useRef(0)
  useEffect(() => {
    // Reduced-motion: no animation. The initial state already holds the final
    // value, so there's nothing to do — return without any setState.
    if (prefersReduced) return undefined

    const DELAY = 150
    const DUR = 800
    let start = 0
    const tick = (t) => {
      if (!start) start = t
      const elapsed = t - start - DELAY
      if (elapsed <= 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const p = Math.min(1, elapsed / DUR)
      // ease-out so it decelerates into the final number
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(Math.round(eased * clamped)) // inside a RAF callback, not the body
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [clamped])

  const R = 34
  const CIRC = 2 * Math.PI * R
  const filled = (clamped / 100) * CIRC

  const tone =
    clamped >= 40 ? 'var(--color-cue)' : 'var(--color-over)'

  return (
    <div className="relative h-24 w-24 shrink-0" role="img" aria-label={`Score ${clamped} out of 100`}>
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={R} fill="none" stroke="var(--color-raised)" strokeWidth="6" />
        {/* v2-16 — the reveal: CSS animates dasharray from empty to the
            score using the vars below; under reduced-motion the class
            does nothing and the inline dasharray renders instantly. */}
        <circle
          className="cue-dial-arc"
          cx="40" cy="40" r={R} fill="none"
          stroke={offline ? 'var(--color-sense)' : tone}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRC - filled}`}
          style={{
            '--dial-circ': CIRC,
            '--dial-fill': filled,
            '--dial-gap': CIRC - filled,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="cue-dial-num font-display text-2xl font-bold">{shown}</span>
        <span className="font-mono text-[10px] text-faint">/ 100</span>
      </div>
    </div>
  )
}