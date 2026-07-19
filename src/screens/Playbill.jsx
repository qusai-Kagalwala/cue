// src/screens/Playbill.jsx
// v2-13 — The sticker grid. Earned stickers glow amber with their date;
// unearned sit greyed with the how-to — visible goals beat hidden ones
// (the Encore-lock philosophy, applied eight times).

import { loadState, loadAttempts } from '../lib/storage'
import { syncPlaybill } from '../lib/achievements'

export default function Playbill() {
  const playbill = syncPlaybill({
    state: loadState(),
    attempts: loadAttempts(),
  })
  const earnedCount = playbill.filter((a) => a.earned).length

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-faint">
        {earnedCount} of {playbill.length} stickers earned
      </p>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {playbill.map((a) => (
          <li
            key={a.id}
            className={`rounded-xl border p-3 text-center transition-colors ${
              a.earned
                ? 'border-cue-dim bg-cue/5'
                : 'border-line bg-surface opacity-60'
            }`}
          >
            <p
              className={`text-3xl ${a.earned ? '' : 'grayscale'}`}
              aria-hidden="true"
            >
              {a.sticker}
            </p>
            <p
              className={`mt-1 font-display text-sm font-semibold ${
                a.earned ? 'text-cue' : 'text-muted'
              }`}
            >
              {a.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">
              {a.description}
            </p>
            <p className="mt-1 font-mono text-[10px] text-faint">
              {a.earned
                ? `earned ${new Date(a.earnedAt).toLocaleDateString()}`
                : 'not yet'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}