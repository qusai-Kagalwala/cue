// src/screens/Programme.jsx
// v2-18 — The Programme: the booklet you're handed at the theatre.
// A complete user-facing guide to everything Cue does and where to find
// it — the page to pull up when walking someone through the app.
// Content lives in data/programme.js under its altitude rule.

import { PROGRAMME } from '../data/programme'

export default function Programme() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the programme
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Your guide to Cue
        </h1>
        <p className="max-w-[65ch] text-sm text-muted">
          Everything the app does, in one place — like the booklet at a
          theatre door.
        </p>
      </header>

      {PROGRAMME.map((section) => (
        <section key={section.id} className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-cue">
            {section.title}
          </h2>

          {section.body?.map((line, i) => (
            <p key={i} className="max-w-[65ch] leading-relaxed text-muted">
              {line}
            </p>
          ))}

          {section.items && (
            <ul className="space-y-2">
              {section.items.map(([term, desc]) => (
                <li
                  key={term}
                  className="rounded-xl border border-line bg-surface p-3"
                >
                  <p className="font-medium text-ink">{term}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {section.footer && (
            <p className="font-mono text-xs text-faint">{section.footer}</p>
          )}
        </section>
      ))}
    </div>
  )
}