// src/components/ScoreDial.jsx
// T4.1 — Circular score dial (0–100). Pure SVG, no libraries.
// Color tells the story before the number does: amber for solid,
// red-ish only when the prompt genuinely missed.

export default function ScoreDial({ score, offline = false }) {
  const clamped = Math.min(100, Math.max(0, Math.round(score)))
  const R = 34
  const CIRC = 2 * Math.PI * R
  const filled = (clamped / 100) * CIRC

  const tone =
    clamped >= 40 ? 'var(--color-cue)' : 'var(--color-over)'

  return (
    <div className="relative h-24 w-24 shrink-0" role="img" aria-label={`Score ${clamped} out of 100`}>
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={R} fill="none" stroke="var(--color-raised)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={R} fill="none"
          stroke={offline ? 'var(--color-faint)' : tone}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRC - filled}`}
          style={{ transition: 'stroke-dasharray 700ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold">{clamped}</span>
        <span className="font-mono text-[10px] text-faint">/ 100</span>
      </div>
    </div>
  )
}