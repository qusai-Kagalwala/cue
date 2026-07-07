// src/screens/Challenge.jsx
// T2.2 mobile-first layout + T2.3 first-visit persona picker.
// Landing screen IS this screen. Persona null → chips appear above the
// challenge (which still renders the 'everyday' variant beneath — the
// learner can type immediately either way).

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import PersonaPicker from '../components/PersonaPicker'
import ScenarioCard from '../components/ScenarioCard'
import PromptInput from '../components/PromptInput'

export default function Challenge() {
  const {
    persona,
    setPersona,
    currentLesson,
    currentLessonIndex,
    totalLessons,
    isComplete,
  } = useProgress()
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

      {/* First visit only — picking never navigates, text swaps in place */}
      {persona === null && <PersonaPicker onPick={setPersona} />}

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