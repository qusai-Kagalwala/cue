// src/components/ShortcutOverlay.jsx
// T2.4 — Keyboard shortcuts overlay, opened with `?`, closed with Esc
// or a click anywhere. Desktop-first-class furniture (the Monkeytype nod).

const SHORTCUTS = [
  { keys: 'Ctrl / ⌘ + Enter', action: 'Submit your prompt' },
  { keys: '?', action: 'Show / hide this overlay' },
  { keys: 'Esc', action: 'Close overlay' },
]

export default function ShortcutOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-20 flex items-center justify-center bg-stage/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-line bg-surface p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Shortcuts</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-2 py-0.5 font-mono text-sm text-muted hover:bg-raised hover:text-ink"
          >
            esc
          </button>
        </div>

        <ul className="space-y-2.5">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">{s.action}</span>
              <kbd className="whitespace-nowrap rounded-md border border-line bg-raised px-2 py-1 font-mono text-xs text-cue">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}