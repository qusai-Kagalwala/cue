// src/screens/Completion.jsx
// T-v1-5 finale + v2-3d name echo + v2-4a: the Audition callback fills
// the marked slot. Post-Audition users get one parallel prompt task
// (same scenario, rubric-scored, zero quota); the "after" attempt is
// stored and the before/after rank line renders. Skipped-audition users
// see no slot — absence is the default, as designed in v2-3c.
// v2-4b — word-level diff of the two prompts renders in the comparison.

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { loadAttempts, loadState, updateState } from '../lib/storage'
import { LESSONS } from '../data/lessons'
import { AUDITION_TASK } from '../data/audition'
import { RESOURCES } from '../data/resources'
import { scoreWithRubric } from '../lib/rubric'
import { rankForLevel } from '../lib/ranks'
import ShareCard from '../components/ShareCard'
import PromptDiff from '../components/PromptDiff'

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

// ---- v2-4a: The Callback -------------------------------------------------
function CallbackSlot({ level }) {
  // Read once; local state carries the session's changes.
  const [audition] = useState(() => loadState().auditionAttempt)
  const [callback, setCallback] = useState(() => loadState().callbackAttempt)
  const [prompt, setPrompt] = useState('')

  // No audition = no callback. Absence is the default (v2-3c).
  if (!audition) return null

  function submit() {
    const rubric = scoreWithRubric(AUDITION_TASK, prompt) // zero quota
    const attempt = {
      taskPrompt: prompt.trim(),
      taskScore: rubric.score,
      rank: rankForLevel(level), // closing-night rank = the one XP earned
      timestamp: new Date().toISOString(),
    }
    updateState({ callbackAttempt: attempt })
    setCallback(attempt)
  }

  if (callback) {
    const improved = callback.taskScore > audition.taskScore
    return (
      <section className="space-y-3 rounded-xl border border-cue-dim bg-cue/5 p-5 text-left">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the callback
        </p>
        <p className="font-display text-xl font-semibold leading-snug">
          Your audition: <span className="text-muted">{audition.rank}</span>.
          <br />
          Your closing night: <span className="text-cue">{callback.rank}</span>.
        </p>
        <p className="font-mono text-xs text-muted">
          same task, then and now — prompt score {audition.taskScore} →{' '}
          <span className={improved ? 'text-good' : 'text-ink'}>
            {callback.taskScore}
          </span>
        </p>

        {/* v2-4b — what actually changed, word by word */}
        <PromptDiff before={audition.taskPrompt} after={callback.taskPrompt} />
      </section>
    )
  }

  return (
    <section className="space-y-4 rounded-xl border border-cue-dim bg-cue/5 p-5 text-left">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the callback · one last audition
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Before Lesson 1, you auditioned with this exact task. Eight lessons
          later — same stage, same scene. Show what changed.
        </p>
      </div>
      <div className="rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed">
        <p className="text-muted">{AUDITION_TASK.scenario}</p>
        <p className="mt-2 text-cue">{AUDITION_TASK.task}</p>
      </div>
      <textarea
        rows={4}
        value={prompt}
        maxLength={1000}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write it the way you would now…"
        className="w-full resize-none rounded-xl border border-line bg-raised p-3 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
        aria-label="Your callback prompt"
      />
      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={prompt.trim().length === 0}
          className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
        >
          Take the callback →
        </button>
      </div>
    </section>
  )
}

export default function Completion({ onGoToMap }) {
  const { xp, level, xpToNext, streak, lessonScores, totalLessons, name, persona } =
    useProgress()
  const attemptCount = loadAttempts().length

  return (
    <div className="mx-auto max-w-xl space-y-7 pt-6 text-center">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          all {totalLessons} lessons complete
        </p>
        <h1 className="font-display text-3xl font-bold text-cue sm:text-4xl">
          That's a wrap{name ? `, ${name}` : ''} 🎭
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

      {/* v2-1 — journey share card */}
      <ShareCard label="Share your run" />

      {/* v2-4a — the Audition callback (renders only post-Audition) */}
      <CallbackSlot level={level} />

      {/* v2-6 — keep learning: curated next steps for YOUR persona */}
      <section className="space-y-3 text-left">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-faint">
          keep learning
        </p>
        <ul className="space-y-2">
          {(RESOURCES[persona] ?? RESOURCES.everyday).map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-cue-dim"
              >
                <p className="font-medium text-ink">
                  {r.title}{' '}
                  <span className="font-mono text-xs text-faint">↗</span>
                </p>
                <p className="font-mono text-xs text-cue">{r.provider}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {r.note}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center font-mono text-[10px] text-faint">
          free or free-to-audit · picked for the {persona ?? 'everyday'} track
        </p>
      </section>

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