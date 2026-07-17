// src/screens/Completion.jsx
// T4.2 finale → T-v1-5 upgrade: fuller summary (XP + next-level progress,
// streak, per-lesson best scores, attempt count from the history log) and
// the marked slot where the v2 Audition callback will land.
// No speculative logic — the slot is a location, not a feature.

import { useProgress } from '../hooks/useProgress'
import { loadAttempts } from '../lib/storage'
import { LESSONS } from '../data/lessons'

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3 text-center">
      <p className="font-display text-2xl font-bold text-cue">{value}</p>
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        {label}
      </p>
      {sub && <p className="mt-0.5 font-mono text-[10px] text-faint">{sub}</p>}
    </div>
  )
}

export default function Completion({ onGoToMap }) {
  const { xp, level, xpToNext, streak, lessonScores, totalLessons } =
    useProgress()
  const attemptCount = loadAttempts().length

  return (
    <div className="mx-auto max-w-xl space-y-7 pt-6 text-center">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          all {totalLessons} lessons complete
        </p>
        <h1 className="font-display text-3xl font-bold text-cue sm:text-4xl">
          That's a wrap 🎭
        </h1>
        <p className="mx-auto max-w-[48ch] leading-relaxed text-muted">
          {attemptCount > 0
            ? `${attemptCount} prompts written, eight ideas learned. The curtain's down — but the stage is yours.`
            : `Eight lessons, eight ideas. The curtain's down — but the stage is yours.`}
        </p>
      </div>

      {/* Headline numbers */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="total xp" value={xp} />
        <Stat
          label="level"
          value={level}
          sub={xpToNext != null ? `${xpToNext} xp to next` : 'max level'}
        />
        <Stat label="streak" value={`${streak}🔥`} />
      </div>

      {/* Best score per lesson — replay targets at a glance */}
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          best scores
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {LESSONS.map((lesson) => {
            const best = lessonScores[lesson.id]
            return (
              <div
                key={lesson.id}
                title={lesson.title}
                className="rounded-lg border border-line bg-surface px-1 py-2"
              >
                <p className="font-mono text-[10px] text-faint">
                  L{lesson.order}
                </p>
                <p
                  className={`font-display text-sm font-semibold ${
                    best != null && best >= 58 ? 'text-cue' : 'text-muted'
                  }`}
                >
                  {best ?? '—'}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/*
        ── v2 AUDITION CALLBACK SLOT ─────────────────────────────────
        The Opening Act's audition attempt gets its callback here:
        parallel prompt task + before/after diff — "Your audition:
        Understudy. Your closing night: Lead." Renders between the
        best-scores strip and the replay CTA. Until v2 ships, this
        slot is intentionally empty.
        ──────────────────────────────────────────────────────────────
      */}

      <button
        onClick={onGoToMap}
        className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright"
      >
        Replay any lesson →
      </button>
      <p className="font-mono text-xs text-faint">
        replays can raise your best scores · half XP
      </p>
    </div>
  )
}