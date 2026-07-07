// src/screens/Challenge.jsx
// T2.2 — The real challenge screen (mobile-first single column).
// Landing screen IS this screen: read concept → read scenario → type → submit.
// Desktop two-panel rearrangement lands in T2.4; evaluation wiring in Phase 3.

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import ScenarioCard from '../components/ScenarioCard'
import PromptInput from '../components/PromptInput'

export default function Challenge() {
  const { currentLesson, currentLessonIndex, totalLessons, isComplete } =
    useProgress()
  const [prompt, setPrompt] = useState('')
  const [conceptOpen, setConceptOpen] = useState(true)

  // All 8 lessons done — real Completion screen lands in T4.2
  if (isComplete || !currentLesson) {
    return (
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-cue">
          That's a wrap 🎭
        </h1>
        <p className="max-w-[65ch] text-muted">
          You've finished all {totalLessons} lessons. The full completion
          screen (totals, replay) arrives in Phase 4.
        </p>
      </div>
    )
  }

  function handleSubmit() {
    // Phase 3 (T3.3) wires this to the evaluation flow.
    console.log('[cue] submit:', prompt)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">

      {/* Lesson header */}
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          Lesson {currentLessonIndex + 1} of {totalLessons}
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          {currentLesson.title}
        </h1>
      </header>

      {/* Concept blurb — collapsible so repeat visitors can tuck it away */}
      <section className="rounded-xl border border-line bg-surface">
        <button
          onClick={() => setConceptOpen((v) => !v)}
          aria-expanded={conceptOpen}
          className="flex w-full items-center justify-between rounded-xl p-4 text-left sm:px-5"
        >
          <span className="text-xs uppercase tracking-widest text-faint">
            The idea
          </span>
          <span className="font-mono text-xs text-muted" aria-hidden="true">
            {conceptOpen ? '−' : '+'}
          </span>
        </button>
        {conceptOpen && (
          <p className="max-w-[65ch] px-4 pb-4 leading-relaxed text-muted sm:px-5">
            {currentLesson.concept}
          </p>
        )}
      </section>

      <ScenarioCard
        scenario={currentLesson.scenario}
        task={currentLesson.task}
        hints={currentLesson.hints}
      />

      <PromptInput
        value={prompt}
        onChange={setPrompt}
        onSubmit={handleSubmit}
        tokenBudget={currentLesson.tokenBudget}
      />
    </div>
  )
}