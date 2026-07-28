// src/components/InlineHint.jsx
// A small, dismissible tip shown the FIRST time a person lands on a screen.
// Each hint has a unique id; once dismissed it's recorded in storage
// (hintsSeen) and never shows again. This is the "self-explaining UI" layer:
// every major screen gets one first-visit line so nothing needs explaining
// out loud.

import { useState } from 'react'
import { isHintSeen, markHintSeen } from '../lib/storage'

export default function InlineHint({ id, children }) {
  // Derive the initial visibility once from storage (lazy init — no effect).
  const [show, setShow] = useState(() => !isHintSeen(id))

  if (!show) return null

  function dismiss() {
    markHintSeen(id)
    setShow(false)
  }

  return (
    <div
      role="note"
      className="relative mb-5 overflow-hidden rounded-xl border border-cue-dim/60 bg-cue/4 p-4 pr-10"
    >
      {/* accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-cue/50"
      />

      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-0.5 shrink-0 text-base text-cue">
          💡
        </span>
        <p className="text-sm leading-relaxed text-muted">{children}</p>
      </div>

      {/* dismiss in the corner, out of the text flow */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss hint"
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-cue/10 hover:text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  )
}