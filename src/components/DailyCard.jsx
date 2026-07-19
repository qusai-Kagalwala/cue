// src/components/DailyCard.jsx
// v2-10 — Today's daily challenge banner. Reuses the Encore's date-seeded
// picker against the core lesson pool: one starred lesson per day, +20 XP
// riding on its normal evaluation, once. Streaks maintain themselves —
// completing any evaluation is streak activity.

import { useProgress, goToLesson, setLessonStage } from '../hooks/useProgress'
import { LESSONS } from '../data/lessons'

export default function DailyCard() {
  const { currentLessonIndex, dailyLessonIndex, dailyDoneToday } = useProgress()
  const daily = LESSONS[dailyLessonIndex]
  if (!daily) return null

  // Done → one quiet line of pride, no button
  if (dailyDoneToday) {
    return (
      <p className="font-mono text-xs text-faint">
        ★ daily done — streak fed for today
      </p>
    )
  }

  // Already ON the daily lesson → badge it instead of linking to it
  if (currentLessonIndex === dailyLessonIndex) {
    return (
      <p className="font-mono text-xs text-cue">
        ★ this is today's daily — +20 XP rides on this one
      </p>
    )
  }

  return (
    <button
      onClick={() => goToLesson(dailyLessonIndex)}
      className="flex w-full items-center justify-between rounded-xl border border-cue-dim bg-cue/5 px-4 py-2.5 text-left transition-colors hover:border-cue"
    >
      <span className="text-sm text-ink">
        <span className="text-cue">★ Today's daily:</span> L{daily.order} ·{' '}
        {daily.title}
      </span>
      <span className="font-mono text-xs text-muted">+20 XP →</span>
    </button>
  )
}