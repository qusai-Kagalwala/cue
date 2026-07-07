// src/screens/Completion.jsx
// T4.2 — Shown when currentLessonIndex passes the last lesson.
// Totals + route to the map for replays (map itself is T5.1).

import { useProgress } from '../hooks/useProgress'

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3 text-center">
      <p className="font-display text-2xl font-bold text-cue">{value}</p>
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        {label}
      </p>
    </div>
  )
}

export default function Completion({ onGoToMap }) {
  const { xp, level, streak, totalLessons } = useProgress()

  return (
    <div className="mx-auto max-w-xl space-y-6 pt-6 text-center">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          all {totalLessons} lessons complete
        </p>
        <h1 className="font-display text-3xl font-bold text-cue sm:text-4xl">
          That's a wrap 🎭
        </h1>
        <p className="mx-auto max-w-[48ch] leading-relaxed text-muted">
          You've been through every lesson. The curtain's down — but the
          stage is yours: replay any lesson to push your best scores higher.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="total xp" value={xp} />
        <Stat label="level" value={level} />
        <Stat label="streak" value={`${streak}🔥`} />
      </div>

      <button
        onClick={onGoToMap}
        className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright"
      >
        Replay any lesson →
      </button>
    </div>
  )
}