// src/components/AnimatedBackground.jsx
// A subtle animated backdrop behind everything: two slow amber "spotlights"
// plus a faint per-stage motif that gives each stage its own identity. Pure
// CSS motion (GPU-friendly), fixed + pointer-events-none, reduced-motion safe.
// The motif is a static, very-low-opacity SVG texture (no animation), so it
// stays calm and readable and needs no reduced-motion branch of its own.

import { useProgress } from '../hooks/useProgress'
import { stageMotifDataUrl } from '../lib/stageMotifs'

export default function AnimatedBackground() {
  const { activeStage } = useProgress()
  const motif = stageMotifDataUrl(activeStage ?? 'text', 0.06)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-stage"
    >
      {/* two soft amber spotlights drifting on different paths */}
      <div className="cue-bg-orb cue-bg-orb-1" />
      <div className="cue-bg-orb cue-bg-orb-2" />
      <div className="cue-bg-orb cue-bg-orb-3" />

      {/* per-stage motif — faint tiled texture identifying the active stage */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url("${motif}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* a faint vignette to keep edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(14,13,11,0.6)_100%)]" />
    </div>
  )
}