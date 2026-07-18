// src/components/XPToast.jsx
// T4.1 — XP earned banner. Shows base + bonus honestly (the learner
// should see WHY a better score pays more), and goes full amber on level-up.

import { BASE_XP } from '../lib/xp'
import { useProgress } from '../hooks/useProgress'

export default function XPToast({ award }) {
  const { name } = useProgress()
  if (!award) return null
  const bonus = award.xpGained - BASE_XP
  // Replays halve the award, so the base+bonus breakdown doesn't apply.
  const breakdown = award.isReplay
    ? 'replay · half XP'
    : `${BASE_XP} base${bonus > 0 ? ` + ${bonus} bonus` : ''}`

  if (award.leveledUp) {
    return (
      <div className="rounded-xl border border-cue bg-cue/10 px-4 py-3 text-center">
        <p className="font-display text-lg font-bold text-cue">
          Level {award.newLevel}{name ? `, ${name}` : ''} 🎭
        </p>
        <p className="font-mono text-xs text-muted">
          +{award.xpGained} XP ({breakdown})
        </p>
      </div>
    )
  }

  return (
    <p className="text-center font-mono text-sm text-cue">
      +{award.xpGained} XP
      <span className="text-muted"> · {breakdown}</span>
    </p>
  )
}