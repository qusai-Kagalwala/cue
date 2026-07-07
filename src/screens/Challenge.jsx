// src/screens/Challenge.jsx
// T2.2 layout + T2.3 persona + T2.4 two-panel/shortcuts + T3.3 evaluation flow.
// Submit → useEvaluation state machine → real Gemini score (or offline
// fallback) → XP awarded. The console harness is retired.
// T4.1 results + T4.2 auto-continue + T4.3 budget mode (Lesson 8).

import { useEffect, useState } from 'react'
import { useProgress, advanceLesson } from '../hooks/useProgress'
import { useEvaluation } from '../hooks/useEvaluation'
import PersonaPicker from '../components/PersonaPicker'
import ScenarioCard from '../components/ScenarioCard'
import PromptInput from '../components/PromptInput'
import ShortcutOverlay from '../components/ShortcutOverlay'
import CurtainLoader from '../components/CurtainLoader'
import ResultsPanel from '../components/ResultsPanel'
import AutoContinue from '../components/AutoContinue'
import Completion from './Completion'
import { SCREENS } from '../lib/screens'

export default function Challenge({ onNavigate }) {
  const {
    persona,
    setPersona,
    currentLesson,
    currentLessonIndex,
    totalLessons,
    isComplete,
  } = useProgress()
  const { status, result, award, submit, reset } = useEvaluation()
  const [prompt, setPrompt] = useState('')
  const [conceptOpen, setConceptOpen] = useState(true)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const evaluating = status === 'evaluating'

  // `?` toggles the overlay, Esc closes it — never while typing, and
  // Esc must NOT touch the evaluation state machine (AC: Escape is safe).
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

  // All 8 lessons done — hand over to the completion screen
  if (isComplete || !currentLesson) {
    return <Completion onGoToMap={() => onNavigate(SCREENS.MAP)} />
  }

  function handleSubmit() {
    if (evaluating) return
    submit(currentLesson, prompt)
  }

  // T4.2 — advance the queue and reset the loop for the next lesson.
  // The score was already persisted on receipt (useEvaluation), so a
  // refresh before pressing Next loses nothing.
  function handleNext() {
    advanceLesson()
    reset()
    setPrompt('')
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
      <div className="mt-5 space-y-4 lg:sticky lg:top-20 lg:mt-0 lg:self-start">

        {/* T4.3 — budget shown prominently BEFORE typing (Lesson 8 only) */}
        {currentLesson.tokenBudget != null && (
          <div className="flex items-center gap-3 rounded-xl border border-cue-dim bg-cue/5 px-4 py-3">
            <span className="font-display text-xl font-bold text-cue">
              {currentLesson.tokenBudget}
            </span>
            <p className="text-sm leading-snug text-muted">
              <span className="text-ink">token budget.</span> Every word
              costs — say it once, cut the filler.
            </p>
          </div>
        )}

        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          tokenBudget={currentLesson.tokenBudget}
          disabled={evaluating}
        />

        {evaluating && <CurtainLoader />}

        {status === 'done' && (
          <>
            <ResultsPanel result={result} award={award} />
            <AutoContinue
              onNext={handleNext}
              isLast={currentLessonIndex === totalLessons - 1}
            />
          </>
        )}

        {status === 'error' && (
          <p className="font-mono text-sm text-over">
            Something went wrong — try submitting again.
          </p>
        )}

        <p className="hidden text-right font-mono text-xs text-faint lg:block">
          press ? for shortcuts
        </p>
      </div>

      {showShortcuts && <ShortcutOverlay onClose={() => setShowShortcuts(false)} />}
    </div>
  )
}