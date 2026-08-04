// src/components/AnimatedBackground.jsx
// A subtle animated backdrop behind everything: two slow amber "spotlights"
// plus a faint per-stage motif that gives each stage its own identity. Pure
// CSS motion (GPU-friendly), fixed + pointer-events-none, reduced-motion safe.
// The motif is a static, very-low-opacity SVG texture (no animation), theme-
// aware (darker ink on light mode so it stays visible on cream), and can be
// switched off entirely from Settings.

import { useProgress } from '../hooks/useProgress'
import { stageMotifDataUrl } from '../lib/stageMotifs'

export default function AnimatedBackground() {
  const { activeStage, theme, doodlesOn } = useProgress()
  const showDoodles = doodlesOn ?? true

  // Amber reads on the dark stage, but at 0.06 it vanishes on the cream light
  // background — so light mode uses a warmer, darker ink at a touch more opacity.
  const isLight = theme === 'light'
  const motifColor = isLight ? '#8a6a1f' : '#f5b942'
  const motifOpacity = isLight ? 0.10 : 0.06
  const motif = stageMotifDataUrl(activeStage ?? 'text', motifOpacity, motifColor)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-stage"
    >
      {/* two soft amber spotlights drifting on different paths */}
      <div className="cue-bg-orb cue-bg-orb-1" />
      <div className="cue-bg-orb cue-bg-orb-2" />
      <div className="cue-bg-orb cue-bg-orb-3" />

      {/* per-stage motif — faint tiled texture identifying the active stage;
          hidden entirely when the user switches doodles off */}
      {showDoodles && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url("${motif}")`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* a faint vignette to keep edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(14,13,11,0.6)_100%)]" />
    </div>
  )
}