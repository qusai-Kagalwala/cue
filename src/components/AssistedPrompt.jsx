// src/components/AssistedPrompt.jsx
// v2-5d — Assisted tier: free textarea + the live RubricChecklist.
// Training wheels off, instruments on: they write freely and watch the
// dimensions light up. Rubric-checked with the real lesson's weights.
// Zero quota, NO XP, no attempt logged (practice tiers leave no trace).

import { useState } from 'react'
import { useProgress, completePractice } from '../hooks/useProgress'
import { getLesson } from '../data/lessons'
import { ASSISTED } from '../data/scenarios.assisted'
import { scoreWithRubric } from '../lib/rubric'
import PromptInput from './PromptInput'
import RubricChecklist from './RubricChecklist'
import ResultsPanel from './ResultsPanel'

export default function AssistedPrompt({ lessonId, onExit, onDone, flowLabel }) {
  const { persona, activeStage } = useProgress()
  const meta = getLesson(lessonId, persona ?? 'everyday')
  const content =
    ASSISTED[lessonId]?.[persona ?? 'everyday'] ?? ASSISTED[lessonId]?.everyday

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [award, setAward] = useState(null)

  if (!meta || !content) return null

  const shell = {
    id: lessonId, // real id → the lesson's own rubric weights apply
    title: meta.title,
    concept: meta.concept,
    scenario: content.scenario,
    task: content.task,
    tokenBudget: null,
  }

  function check() {
    setResult(scoreWithRubric(shell, prompt, activeStage)) // zero quota
    // Small completion reward — once per lesson, ever (null after that).
    setAward(completePractice(lessonId, 'assisted'))
    // NO completeLesson, NO appendAttempt — the Solo economy stays pure.
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 lg:max-w-none lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:space-y-0">
      {/* ---- LEFT PANEL: read ---- */}
      <div className="space-y-5">
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
          {flowLabel ?? `assisted practice · L${meta.order} ${meta.title} · no XP, just reps`}
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
            This time you write the whole message yourself. As you type,
            watch the checklist below the box — circles turn into{' '}
            <span className="text-good">✓</span> ticks as your message gets
            better. The <span className="text-cue">★</span> shows what this
            lesson cares about most. Press Check when you're happy.
          </p>
        </div>
      )}

      {/* Scenario */}
      <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
        <p className="text-muted">{content.scenario}</p>
        <p className="mt-2 text-cue">{content.task}</p>
      </div>

      </div>

      {/* ---- RIGHT PANEL: act (sticky on desktop, like the assessment) ---- */}
      <div className="mt-5 space-y-5 lg:mt-0 lg:sticky lg:top-6">
      {!result ? (
        <>
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={check}
            disabled={false}
          />
          <RubricChecklist lesson={shell} prompt={prompt} />
        </>
      ) : (
        <>
          <ResultsPanel result={result} award={award} />
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setResult(null)}
              className="rounded-lg border border-line px-5 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Revise my prompt
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
    </div>
  )
}