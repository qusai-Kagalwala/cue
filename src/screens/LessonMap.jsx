// src/screens/LessonMap.jsx
// T5.1 — Secondary overview: vertical list (mobile) / 2-col grid (desktop).
// States: done (has a best score) · current (amber, in the queue) · locked.
// Tapping done/current jumps there via goToLesson; locked cards are inert.
// Unlock logic: a lesson is locked only if it's beyond the queue position
// AND was never completed — so replaying an early lesson never re-locks
// lessons you've already finished.

import { useProgress, goToLesson } from '../hooks/useProgress'
import { motion, useReducedMotion } from 'motion/react'
import InlineHint from '../components/InlineHint'
import { LESSONS } from '../data/lessons'
import { SCREENS } from '../lib/screens'
import StagePicker from '../components/StagePicker'

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
  const { currentLessonIndex, lessonScores, level } = useProgress()
  const reduce = useReducedMotion()

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
      <InlineHint id="map">
        This is your season. Each lesson has three tiers — try Solo first, then Guided and Assisted if you want more scaffolding.
      </InlineHint>
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
      {/* v3-1c — stage switcher; locked stages teased, never hidden */}
      <div className="mb-5">
        <StagePicker />
      </div>


      <ol className="grid gap-3 lg:grid-cols-2">
        {LESSONS.map((lesson, i) => {
          const best = lessonScores[lesson.id]
          const done = best != null
          const current = i === currentLessonIndex
          const locked = !done && i > unlockedThrough

          return (
            <motion.li
              key={lesson.id}
              className="space-y-1.5"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: reduce ? 0 : i * 0.04, ease: 'easeOut' }}
            >
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
                {/* Number / state marker — the current one gently pulses
                    so the eye lands on where to go next. */}
                <motion.span
                  animate={
                    current && !reduce
                      ? { boxShadow: ['0 0 0 0 rgba(245,185,66,0.5)', '0 0 0 8px rgba(245,185,66,0)'] }
                      : {}
                  }
                  transition={
                    current && !reduce
                      ? { duration: 1.6, repeat: Infinity, ease: 'easeOut' }
                      : {}
                  }
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm ${
                    current
                      ? 'bg-cue text-stage'
                      : done
                        ? 'border border-good text-good'
                        : 'border border-line text-faint'
                  }`}
                >
                  {locked ? <LockIcon /> : done && !current ? '✓' : i + 1}
                </motion.span>

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

              {/* v2-5c/5d — practice tiers (no XP, no quota) */}
              {!locked && onPractice && (
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => onPractice(lesson.id, 'guided')}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-cue-dim hover:text-cue"
                  >
                    ✎ guided
                  </button>
                  <button
                    onClick={() => onPractice(lesson.id, 'assisted')}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-cue-dim hover:text-cue"
                  >
                    ✎ assisted
                  </button>
                </div>
              )}
            </motion.li>
          )
        })}
      </ol>

      {/* v2-9 — The Encore: the daily boss, gated at Level 4 */}
      <button
        onClick={() => onNavigate(SCREENS.ENCORE)}
        className="mt-4 w-full rounded-xl border border-cue-dim bg-cue/5 p-4 text-left transition-colors hover:border-cue"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the encore · daily boss
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-cue">
          {level >= 4 ? "Tonight's challenge awaits 🎭" : '🔒 Unlocks at Level 4'}
        </p>
        <p className="mt-0.5 text-sm text-muted">
          Every skill at once, tight token budget, 100 base XP — one bow per day.
        </p>
      </button>
    </div>
  )
}