// src/components/AnimatedBackground.jsx
// A subtle, performance-light animated backdrop that sits behind everything.
// Two slow-drifting radial "spotlights" in the amber theme colour plus a very
// faint moving grain, so the page feels alive without distracting from
// reading. Pure CSS animation (GPU-friendly transforms/opacity), fixed and
// pointer-events-none so it never interferes. Fully disabled under
// prefers-reduced-motion via the media query in index.css.

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-stage"
    >
      {/* two soft amber spotlights drifting on different paths */}
      <div className="cue-bg-orb cue-bg-orb-1" />
      <div className="cue-bg-orb cue-bg-orb-2" />
      <div className="cue-bg-orb cue-bg-orb-3" />
      {/* a faint vignette to keep edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(14,13,11,0.6)_100%)]" />
    </div>
  )
}