// src/components/PersonaPicker.jsx
// T2.3 — First-visit persona chips. Inline, never a modal wall:
// the challenge stays fully visible and usable below (it renders the
// 'everyday' variant until a choice is made — zero-friction rule).

import { PERSONAS } from '../data/lessons'

export default function PersonaPicker({ onPick }) {
  return (
    <section
      aria-label="Choose your persona"
      className="rounded-xl border border-cue-dim bg-surface p-4 sm:p-5"
    >
      <p className="mb-3 text-sm text-muted">
        Quick one — examples read better in your world.{' '}
        <span className="text-ink">I'm a…</span>
      </p>

      <div className="flex flex-wrap gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p.id)}
            className="rounded-full border border-line bg-raised px-4 py-2 text-sm text-ink transition-colors hover:border-cue-dim hover:text-cue"
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="mt-3 font-mono text-xs text-faint">
        changeable anytime in settings
      </p>
    </section>
  )
}