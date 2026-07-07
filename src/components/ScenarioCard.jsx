// src/components/ScenarioCard.jsx
// T2.2 — The lesson's scenario + task, with hints hidden behind a reveal
// (hints given away for free teach nothing; a tap is the right friction).

import { useState } from 'react'

export default function ScenarioCard({ scenario, task, hints = [] }) {
  const [showHints, setShowHints] = useState(false)

  return (
    <section className="space-y-4 rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-faint">Scenario</p>
        <p className="max-w-[65ch] leading-relaxed">{scenario}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-faint">Your task</p>
        <p className="max-w-[65ch] leading-relaxed text-cue">{task}</p>
      </div>

      {hints.length > 0 && (
        <div>
          <button
            onClick={() => setShowHints((v) => !v)}
            aria-expanded={showHints}
            className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {showHints ? 'hide hints' : `need a hint? (${hints.length})`}
          </button>

          {showHints && (
            <ul className="mt-2 space-y-1.5 border-l-2 border-cue-dim pl-3">
              {hints.map((hint, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted">
                  {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}