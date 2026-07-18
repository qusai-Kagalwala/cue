// src/components/ShareCard.jsx
// v2-1 — Generate + share/download the canvas card.
// Web Share API (with files) where supported — Android/mobile share sheet;
// everywhere else, a straight PNG download. Preview shown after generating.

import { useEffect, useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { rankForLevel } from '../lib/ranks'
import { makeShareCard } from '../lib/shareCard'

export default function ShareCard({ score = null, label = 'Share your card' }) {
  const { level, xp, streak, name } = useProgress()
  const [card, setCard] = useState(null) // { blob, url }
  const [busy, setBusy] = useState(false)

  // Revoke the object URL when the card changes or unmounts
  useEffect(() => () => card && URL.revokeObjectURL(card.url), [card])

  async function generate() {
    setBusy(true)
    try {
      const next = await makeShareCard({
        score,
        level,
        xp,
        streak,
        name,                       // journey card shows it under the rank
        rank: rankForLevel(level),
      })
      setCard((prev) => {
        if (prev) URL.revokeObjectURL(prev.url)
        return next
      })
    } finally {
      setBusy(false)
    }
  }

  async function shareOrDownload() {
    if (!card) return
    const file = new File([card.blob], 'cue-card.png', { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Cue', text: 'My Cue card 🎭' })
        return
      } catch {
        /* user cancelled the sheet — fall through to nothing */
        return
      }
    }
    // Download fallback (desktop)
    const a = document.createElement('a')
    a.href = card.url
    a.download = 'cue-card.png'
    a.click()
  }

  return (
    <div className="space-y-3">
      {!card ? (
        <button
          onClick={generate}
          disabled={busy}
          className="rounded-lg border border-cue-dim px-5 py-2.5 text-sm text-cue transition-colors hover:bg-cue/10 disabled:opacity-60"
        >
          {busy ? 'setting the stage…' : `🎭 ${label}`}
        </button>
      ) : (
        <div className="space-y-3">
          <img
            src={card.url}
            alt="Your Cue share card"
            className="mx-auto w-48 rounded-xl border border-line sm:w-56"
          />
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={shareOrDownload}
              className="rounded-lg bg-cue px-5 py-2 text-sm font-medium text-stage transition-colors hover:bg-cue-bright"
            >
              {navigator.canShare ? 'Share' : 'Download'}
            </button>
            <button
              onClick={generate}
              className="rounded-lg border border-line px-4 py-2 font-mono text-xs text-muted hover:text-ink"
            >
              redraw
            </button>
          </div>
        </div>
      )}
    </div>
  )
}