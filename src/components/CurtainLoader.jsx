// src/components/CurtainLoader.jsx
// T3.3 — The "curtain line": a thin amber shimmer that sweeps while the
// evaluation runs. The theatre motif earning its keep for ~15 lines.
// Needs the `curtain` keyframes added to index.css (see T3.3 notes).

export default function CurtainLoader({ label = 'evaluating your prompt…' }) {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-raised">
        <div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-cue to-transparent"
          style={{ animation: 'curtain 1.2s ease-in-out infinite' }}
        />
      </div>
      <p className="text-center font-mono text-xs text-muted">{label}</p>
    </div>
  )
}