// src/components/GuidedPrompt.jsx
// v2-5c — Guided tier: fill-in-the-blank practice. The training wheels:
// the skeleton carries the prompt's structure, the learner supplies only
// the specifics. Assembled prompt → scoreWithRubric with the REAL lesson
// id (so the lesson's weights apply). Zero quota, NO XP, no attempt
// logged — practice tiers leave no trace in the economy (tripwire).

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { getLesson } from '../data/lessons'
import { GUIDED } from '../data/scenarios.guided'
import { scoreWithRubric } from '../lib/rubric'
import ResultsPanel from './ResultsPanel'

export default function GuidedPrompt({ lessonId, onExit, onDone, flowLabel }) {
  const { persona } = useProgress()
  const meta = getLesson(lessonId, persona ?? 'everyday')
  const content =
    GUIDED[lessonId]?.[persona ?? 'everyday'] ?? GUIDED[lessonId]?.everyday

  const blanks = content.skeleton.filter((p) => p.blank)
  const [values, setValues] = useState(() => blanks.map(() => ''))
  const [result, setResult] = useState(null)

  if (!meta || !content) return null

  // Assemble: text parts verbatim, blank parts from the inputs (in order)
  function assembled() {
    let b = 0
    return content.skeleton
      .map((p) => (p.text != null ? p.text : values[b++] || `[${p.blank}]`))
      .join('')
  }

  const allFilled = values.every((v) => v.trim().length > 0)

  function check() {
    const shell = {
      id: lessonId, // real id → the lesson's own rubric weights apply
      title: meta.title,
      concept: meta.concept,
      scenario: content.scenario,
      task: content.task,
      tokenBudget: null,
    }
    setResult(scoreWithRubric(shell, assembled())) // zero quota
    // NO completeLesson, NO appendAttempt — guided leaves no trace.
  }

  function tryAgain() {
    setResult(null)
  }

  // Pure mapping: skeleton position → blank ordinal (zero mutation;
  // react-hooks/immutability). blankAt[i] = input index for part i,
  // or -1 for text parts. O(n²) on a ~7-part array — irrelevant.
  const blankAt = content.skeleton.map((part, i) =>
    part.blank
      ? content.skeleton.slice(0, i).filter((p) => p.blank).length
      : -1
  )

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        {onExit && (
          <button
            onClick={onExit}
            className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            ← lesson map
          </button>
        )}
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          {flowLabel ?? `guided practice · L${meta.order} ${meta.title} · no XP, just reps`}
        </p>
      </header>

      {/* The idea — same teaching point the assessment shows, here from
          the first rung. Concept + the takeaway rule to remember. */}
      <section className="rounded-xl border border-line bg-surface p-4 sm:px-5">
        <p className="mb-1 text-xs uppercase tracking-widest text-faint">
          The idea
        </p>
        <p className="max-w-[65ch] leading-relaxed text-muted">
          {meta.concept}
        </p>
        {meta.takeaway && (
          <p className="mt-2 border-l-2 border-cue-dim pl-3 text-sm italic leading-relaxed text-muted">
            <span className="not-italic font-mono text-xs uppercase tracking-widest text-faint">
              remember ·{' '}
            </span>
            {meta.takeaway}
          </p>
        )}
      </section>

      {/* Plain-language guide — readable by a child or an elder */}
      {!result && (
        <div className="rounded-xl border border-cue-dim bg-cue/5 p-4 text-sm leading-relaxed">
          <p className="text-ink">
            <span className="font-semibold text-cue">How this works:</span>{' '}
            We wrote most of the message for you. Fill in the empty boxes
            with your details — the grey text inside each box tells you what
            goes there. When every box is filled, press{' '}
            <span className="text-cue">Check my prompt</span>.
          </p>
        </div>
      )}

      {/* Scenario */}
      <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
        <p className="text-muted">{content.scenario}</p>
        <p className="mt-2 text-cue">{content.task}</p>
      </div>

      {!result ? (
        <>
          {/* The skeleton: text runs + inline blank inputs */}
          <div className="rounded-xl border border-line bg-raised p-4 font-mono text-sm leading-loose">
            {content.skeleton.map((part, i) => {
              if (part.text != null) return <span key={i}>{part.text}</span>
              const b = blankAt[i]
              return (
                <input
                  key={i}
                  value={values[b]}
                  onChange={(e) =>
                    setValues((v) => v.map((x, j) => (j === b ? e.target.value : x)))
                  }
                  placeholder={part.hint}
                  aria-label={part.blank}
                  size={Math.max(part.hint.length, 8)}
                  className="mx-1 inline-block rounded border-b-2 border-cue-dim bg-stage px-2 py-0.5 text-cue placeholder:text-faint focus:border-cue focus:outline-none"
                />
              )
            })}
          </div>

          {/* Live assembled preview once they start */}
          {values.some((v) => v.trim()) && (
            <div className="space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                your prompt so far
              </p>
              <p className="rounded-lg border border-line bg-surface p-3 font-mono text-sm leading-relaxed text-muted">
                {assembled()}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={check}
              disabled={!allFilled}
              className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
            >
              Check my prompt →
            </button>
          </div>
        </>
      ) : (
        <>
          <ResultsPanel result={result} award={null} />
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={tryAgain}
              className="rounded-lg border border-line px-5 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Try different fills
            </button>
            <button
              onClick={onDone ?? onExit}
              className="rounded-lg bg-cue px-5 py-2 text-sm font-medium text-stage transition-colors hover:bg-cue-bright"
            >
              {onDone ? 'Continue →' : 'Back to the map →'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}