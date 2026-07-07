// src/screens/Challenge.jsx
// T2.2 mobile-first + T2.3 persona picker + T2.4 desktop two-panel & shortcuts.
// <1024px: single column (read → type, top to bottom).
// ≥1024px: reading panel left, sticky editor panel right — eyes on the
// scenario, hands on the keyboard, nothing scrolls away from you.

import { useEffect, useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import PersonaPicker from '../components/PersonaPicker'
import ScenarioCard from '../components/ScenarioCard'
import PromptInput from '../components/PromptInput'
import ShortcutOverlay from '../components/ShortcutOverlay'

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
  const [showShortcuts, setShowShortcuts] = useState(false)

  // `?` toggles the overlay, Esc closes it — but never while typing
  // (a "?" belongs in the learner's prompt, not hijacked by the UI).
  useEffect(() => {
    function onKeyDown(e) {
      const typing = ['TEXTAREA', 'INPUT'].includes(e.target.tagName)
      if (e.key === '?' && !typing) {
        e.preventDefault()
        setShowShortcuts((v) => !v)
      }
      if (e.key === 'Escape') setShowShortcuts(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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
    <div className="mx-auto max-w-2xl space-y-5 lg:max-w-none lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:space-y-0">

      {/* First visit only — spans both panels on desktop */}
      {persona === null && (
        <div className="lg:col-span-2 lg:mb-2">
          <PersonaPicker onPick={setPersona} />
        </div>
      )}

      {/* ---- LEFT PANEL: read ---- */}
      <div className="space-y-5">
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
      </div>

      {/* ---- RIGHT PANEL: type (sticky under the top bar on desktop) ---- */}
      <div className="mt-5 lg:sticky lg:top-20 lg:mt-0 lg:self-start">
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          tokenBudget={currentLesson.tokenBudget}
        />
        <p className="mt-3 hidden text-right font-mono text-xs text-faint lg:block">
          press ? for shortcuts
        </p>
      </div>

      {showShortcuts && <ShortcutOverlay onClose={() => setShowShortcuts(false)} />}
    </div>
  )
}