// src/screens/Library.jsx
// v2-11 — The prompt library: your best work, kept. Entries arrive
// automatically when a REAL evaluation scores ≥58 (the rubric's "high"
// band) — nothing to manage, the shelf fills itself. Copy takes a prompt
// back out into the world, which is the whole point.

import { useState } from 'react'
import InlineHint from '../components/InlineHint'
import { loadLibrary, removeFromLibrary } from '../lib/storage'

export default function Library() {
  const [entries, setEntries] = useState(() => loadLibrary())
  const [copiedAt, setCopiedAt] = useState(null)

  async function copy(entry) {
    try {
      await navigator.clipboard.writeText(entry.prompt)
      setCopiedAt(entry.timestamp)
      setTimeout(() => setCopiedAt(null), 1500)
    } catch {
      /* clipboard blocked — the text is selectable as fallback */
    }
  }

  function remove(timestamp) {
    removeFromLibrary(timestamp)
    setEntries(loadLibrary())
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <InlineHint id="library">
        Every prompt you save lands here, with its score. Build a personal collection of what worked.
      </InlineHint>
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the library
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Your best prompts
        </h1>
        <p className="max-w-[65ch] text-sm text-muted">
          Every prompt that scored 58+ with the real evaluator lands here
          automatically. Copy one whenever real life needs it — that's what
          they're for.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cue-dim/50 bg-cue/5 text-2xl">
            📚
          </div>
          <p className="font-display text-base font-semibold text-ink">
            Your best prompts collect here
          </p>
          <p className="mx-auto mt-1 max-w-[38ch] text-sm text-muted">
            Score 58+ on any assessment and the prompt earns a place on your
            shelf — a growing library of your sharpest work to reuse in real life.
          </p>
          <p className="mt-3 font-mono text-xs text-faint">
            go play a lesson to add your first
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry.timestamp}
              className="rounded-xl border border-line bg-surface p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-mono text-xs text-faint">
                  {entry.title}
                  {entry.score != null && (
                    <>
                      {' '}· <span className="text-cue">{entry.score}</span>
                    </>
                  )}{' '}
                  · {new Date(entry.timestamp).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => copy(entry)}
                    className="rounded-lg border border-line px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-cue-dim hover:text-cue"
                  >
                    {copiedAt === entry.timestamp ? 'copied ✓' : 'copy'}
                  </button>
                  <button
                    onClick={() => remove(entry.timestamp)}
                    aria-label="Remove from library"
                    className="rounded-lg border border-line px-2 py-1 font-mono text-xs text-faint transition-colors hover:border-over hover:text-over"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-wrap rounded-lg bg-raised p-3 font-mono text-sm leading-relaxed text-ink">
                {entry.prompt}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="text-center font-mono text-[10px] text-faint">
        keeps your 50 most recent · oldest make way for new work
      </p>
    </div>
  )
}