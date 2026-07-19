// src/screens/LessonMap.jsx
// T5.1 — Secondary overview: vertical list (mobile) / 2-col grid (desktop).
// States: done (has a best score) · current (amber, in the queue) · locked.
// Tapping done/current jumps there via goToLesson; locked cards are inert.
// Unlock logic: a lesson is locked only if it's beyond the queue position
// AND was never completed — so replaying an early lesson never re-locks
// lessons you've already finished.

import { useProgress, goToLesson } from '../hooks/useProgress'
import { LESSONS } from '../data/lessons'
import { SCREENS } from '../lib/screens'

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  )
}

export default function LessonMap({ onNavigate, onPractice }) {
  const { currentLessonIndex, lessonScores } = useProgress()

  // Highest done index +1 stays unlocked even if the queue pointer
  // has been moved back by a replay.
  const maxDone = LESSONS.reduce(
    (max, l, i) => (lessonScores[l.id] != null ? i : max), -1)
  const unlockedThrough = Math.max(currentLessonIndex, maxDone + 1)

  function handleReplay(index) {
    goToLesson(index)
    onNavigate(SCREENS.CHALLENGE)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          Your progress
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Lesson map
        </h1>
        <p className="font-mono text-xs text-faint">
          replaying a finished lesson can raise your best score · replays earn half XP
        </p>
      </header>

      <ol className="grid gap-3 lg:grid-cols-2">
        {LESSONS.map((lesson, i) => {
          const best = lessonScores[lesson.id]
          const done = best != null
          const current = i === currentLessonIndex
          const locked = !done && i > unlockedThrough

          return (
            <li key={lesson.id} className="space-y-1.5">
              <button
                onClick={() => !locked && handleReplay(i)}
                disabled={locked}
                aria-label={
                  locked
                    ? `Lesson ${i + 1}: ${lesson.title} — locked`
                    : `Lesson ${i + 1}: ${lesson.title}${done ? `, best score ${best}` : ''}`
                }
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                  current
                    ? 'border-cue bg-cue/5'
                    : locked
                      ? 'cursor-not-allowed border-line bg-stage opacity-50'
                      : 'border-line bg-surface hover:border-cue-dim'
                }`}
              >
                {/* Number / state marker */}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm ${
                    current
                      ? 'bg-cue text-stage'
                      : done
                        ? 'border border-good text-good'
                        : 'border border-line text-faint'
                  }`}
                >
                  {locked ? <LockIcon /> : done && !current ? '✓' : i + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display font-semibold">
                    {lesson.title}
                  </span>
                  <span className="block font-mono text-xs text-muted">
                    {current
                      ? 'up next'
                      : done
                        ? `best ${best}/100 · replay`
                        : locked
                          ? 'locked'
                          : 'ready'}
                  </span>
                </span>

                {lesson.tokenBudget != null && !locked && (
                  <span className="shrink-0 rounded-full border border-cue-dim px-2 py-0.5 font-mono text-[10px] text-cue">
                    {lesson.tokenBudget} tok
                  </span>
                )}
              </button>

              {/* v2-5c — practice tiers (no XP); assisted joins in v2-5d */}
              {!locked && onPractice && (
                <div className="flex justify-end">
                  <button
                    onClick={() => onPractice(lesson.id)}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-cue-dim hover:text-cue"
                  >
                    ✎ guided practice
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}