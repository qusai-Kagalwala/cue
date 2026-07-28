// src/components/InlineHint.jsx
// A small, dismissible tip shown the FIRST time a person lands on a screen.
// Each hint has a unique id; once dismissed it's recorded in storage
// (hintsSeen) and never shows again. This is the "self-explaining UI" layer:
// every major screen gets one first-visit line so nothing needs explaining
// out loud.
//
// God Mode note: hints check real storage, so a demoer who's already seen
// them won't get them again — which is fine for a demo.

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
      className="mb-4 flex items-start gap-3 rounded-xl border border-cue-dim bg-cue/5 p-3"
    >
      <span aria-hidden="true" className="mt-0.5 text-cue">
        💡
      </span>
      <p className="flex-1 text-sm leading-relaxed text-ink">{children}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss hint"
        className="rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        got it
      </button>
    </div>
  )
}