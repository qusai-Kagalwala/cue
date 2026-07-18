// src/screens/OpeningAct.jsx
// v2-3a — The Opening Act SHELL: beat state machine, skip logic,
// reduced-motion handling, completion flag. Beats render placeholder
// cards until v2-3b (beats 1/2/4/5) and v2-3c (the Audition) fill them.
//
// Contract with the rest of the app:
//   - shown ONLY while state.openingActDone is false (App gates it)
//   - every beat individually skippable; "skip intro" bails the whole act
//   - skip-all defaults: no name, Understudy rank (rank already derives
//     from level 1 — nothing to write)
//   - prefers-reduced-motion → beats receive `reducedMotion` and the
//     shell applies no transitions
//   - onComplete fires exactly once; the flag write happens in App

import { useState } from 'react'
import { BEATS } from '../lib/screens'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// ---- Placeholder beat renderers — replaced in v2-3b / v2-3c ----
function PlaceholderBeat({ beat, onNext, reducedMotion }) {
  const COPY = {
    title: ['Beat 1 — Title card', 'Typewriter + spotlight land in v2-3b.'],
    name: ['Beat 2 — Your name', 'Name capture lands in v2-3b.'],
    audition: ['Beat 3 — The Audition', 'MCQs + mini task land in v2-3c.'],
    why: ['Beat 4 — Why prompting', 'Two concept cards land in v2-3b.'],
    persona: ['Beat 5 — Who takes the stage', 'Persona pick lands in v2-3b.'],
    curtain: ['Curtain up', '"Places." — final beat, lands in v2-3b.'],
  }
  const [title, note] = COPY[beat]
  return (
    <div className="space-y-3 text-center">
      <h2 className="font-display text-2xl font-semibold text-cue">{title}</h2>
      <p className="font-mono text-xs text-faint">{note}</p>
      <p className="font-mono text-[10px] text-faint">
        {reducedMotion ? 'reduced-motion: static variant' : 'motion enabled'}
      </p>
      <button
        onClick={onNext}
        className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright"
      >
        Continue →
      </button>
    </div>
  )
}

export default function OpeningAct({ onComplete }) {
  const [beatIndex, setBeatIndex] = useState(0)
  const beat = BEATS[beatIndex]

  function next() {
    if (beatIndex < BEATS.length - 1) {
      setBeatIndex((i) => i + 1)
    } else {
      onComplete()
    }
  }

  function skipBeat() {
    next() // skipping a beat = advancing without its payload
  }

  function skipAll() {
    onComplete() // defaults: no name; rank derives from level → Understudy
  }

  return (
    <div
      className={`flex min-h-dvh flex-col bg-stage ${
        reducedMotion ? '' : 'transition-opacity duration-300'
      }`}
    >
      {/* Skip rail — always reachable, every beat */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <span className="font-mono text-xs text-faint">
          {beatIndex + 1} / {BEATS.length}
        </span>
        <div className="flex gap-3">
          {beat !== 'curtain' && (
            <button
              onClick={skipBeat}
              className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              skip this
            </button>
          )}
          <button
            onClick={skipAll}
            className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            skip intro
          </button>
        </div>
      </div>

      {/* Stage — one beat at a time */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <PlaceholderBeat
            beat={beat}
            onNext={next}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      {/* Beat dots */}
      <div className="flex justify-center gap-2 pb-8" aria-hidden="true">
        {BEATS.map((b, i) => (
          <span
            key={b}
            className={`h-1.5 w-1.5 rounded-full ${
              i === beatIndex ? 'bg-cue' : i < beatIndex ? 'bg-cue-dim' : 'bg-line'
            }`}
          />
        ))}
      </div>
    </div>
  )
}