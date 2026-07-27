// src/components/GodModeBadge.jsx
// v2-20b — the always-visible God Mode indicator + exit. Renders nothing
// unless God Mode is active, so it's safe to mount unconditionally in the
// TopBar. Clicking it exits, restoring the real (untouched) save and
// forcing a re-render via the store's god-mode subscription.

import { useSyncExternalStore } from 'react'
import { isGodMode, exitGodMode, subscribeGodMode } from '../lib/godMode'

export default function GodModeBadge() {
  const on = useSyncExternalStore(subscribeGodMode, isGodMode, isGodMode)
  if (!on) return null

  return (
    <button
      onClick={exitGodMode}
      title="Exit God Mode — returns to your real progress"
      aria-label="Exit God Mode"
      className="inline-flex items-center gap-1.5 rounded-full border border-cue-dim bg-cue/10 px-3 py-1 font-mono text-xs text-cue transition-colors hover:bg-cue/20"
    >
      <span aria-hidden="true">⚡</span>
      god mode
      <span className="text-faint">· exit</span>
    </button>
  )
}