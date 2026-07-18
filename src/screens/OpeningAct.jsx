// src/screens/OpeningAct.jsx
// v2-3a shell + v2-3b real beats 1/2/4/5 + curtain.
// Beat 3 (Audition) stays a placeholder until v2-3c.
// All animation is CSS-only (index.css: cue-type / cue-blink) and fully
// disabled under prefers-reduced-motion.

import { useState } from 'react'
import { BEATS } from '../lib/screens'
import { PERSONAS } from '../data/lessons'
import { updateState } from '../lib/storage'
import { setPersona } from '../hooks/useProgress'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const Continue = ({ onClick, children = 'Continue →' }) => (
  <button
    onClick={onClick}
    className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright"
  >
    {children}
  </button>
)

// ---- Beat 1: typewriter title, spotlight caret --------------------------
function TitleBeat({ onNext }) {
  return (
    <div className="space-y-8 text-center">
      <h1 className="font-display text-4xl font-bold text-cue sm:text-5xl">
        Cue
      </h1>

      {/* Explicit flex centering: the typewriter's width animates, so
          text-center alone re-centers every frame — anchor it instead */}
      <div className="flex justify-center">
        <p
          className={`font-mono text-lg text-ink ${
            reducedMotion ? '' : 'cue-typewriter'
          }`}
        >
          Your cue to ask better.
        </p>
      </div>

      <div className="flex justify-center">
        <Continue onClick={onNext} />
      </div>
    </div>
  )
}

// ---- Beat 3 placeholder (v2-3c) -----------------------------------------
function AuditionPlaceholder({ onNext }) {
  return (
    <div className="space-y-3 text-center">
      <h2 className="font-display text-2xl font-semibold text-cue">
        The Audition
      </h2>
      <p className="font-mono text-xs text-faint">arrives in v2-3c</p>
      <Continue onClick={onNext} />
    </div>
  )
}

// ---- Beat 4: what & why prompting — two cards ---------------------------
function WhyBeat({ onNext }) {
  const CARDS = [
    {
      title: 'What is a prompt?',
      body: 'Everything you type to an AI. The question, the details, the instructions — the whole ask. The AI can only work with what you put in it.',
    },
    {
      title: 'Why does it matter?',
      body: 'Same AI, wildly different answers — the difference is the prompt. Eight short lessons teach you the moves that make answers actually useful.',
    },
  ]
  const [card, setCard] = useState(0)
  const last = card === CARDS.length - 1

  return (
    <div className="space-y-5 text-center">
      <div className="rounded-xl border border-line bg-surface p-5 text-left">
        <h2 className="mb-2 font-display text-xl font-semibold text-cue">
          {CARDS[card].title}
        </h2>
        <p className="max-w-[48ch] leading-relaxed text-muted">
          {CARDS[card].body}
        </p>
      </div>
      <Continue onClick={() => (last ? onNext() : setCard(card + 1))}>
        {last ? 'Continue →' : 'Next card →'}
      </Continue>
    </div>
  )
}

// ---- Beat 5: persona pick (merges with T2.3's flow) ---------------------
function PersonaBeat({ onNext }) {
  function pick(id) {
    setPersona(id) // same store action the inline picker uses — the
    onNext()       // Challenge picker then never shows (persona !== null)
  }
  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-semibold">
        Who’s taking the stage tonight?
      </h2>
      <p className="text-sm text-muted">Examples read better in your world.</p>
      <div className="flex flex-wrap justify-center gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => pick(p.id)}
            className="rounded-full border border-line bg-raised px-5 py-2.5 text-sm text-ink transition-colors hover:border-cue-dim hover:text-cue"
          >
            {p.label}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        decide later
      </button>
    </div>
  )
}

// ---- Curtain ------------------------------------------------------------
function CurtainBeat({ onComplete, name }) {
  return (
    <div className="space-y-5 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        curtain up
      </p>
      <h2 className="font-display text-3xl font-bold text-cue">
        Places{name ? `, ${name}` : ''}.
      </h2>
      <p className="text-muted">Lesson 1 begins.</p>
      <Continue onClick={onComplete}>Take the stage →</Continue>
    </div>
  )
}

// ---- Shell --------------------------------------------------------------
export default function OpeningAct({ onComplete }) {
  const [beatIndex, setBeatIndex] = useState(0)
  const [name, setName] = useState(null) // local echo for the curtain line
  const beat = BEATS[beatIndex]

  function next() {
    if (beatIndex < BEATS.length - 1) setBeatIndex((i) => i + 1)
    else onComplete()
  }

  // NameBeat writes storage itself; shell mirrors for the curtain line.
  function nextFromName(capturedName) {
    if (capturedName) setName(capturedName)
    next()
  }

  const BEAT_VIEWS = {
    title: <TitleBeat onNext={next} />,
    name: (
      <NameBeatWrapper onDone={nextFromName} />
    ),
    audition: <AuditionPlaceholder onNext={next} />,
    why: <WhyBeat onNext={next} />,
    persona: <PersonaBeat onNext={next} />,
    curtain: <CurtainBeat onComplete={onComplete} name={name} />,
  }

  return (
    <div className="flex min-h-dvh flex-col bg-stage">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <span className="font-mono text-xs text-faint">
          {beatIndex + 1} / {BEATS.length}
        </span>
        <div className="flex gap-3">
          {beat !== 'curtain' && (
            <button
              onClick={next}
              className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              skip this
            </button>
          )}
          <button
            onClick={onComplete}
            className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            skip intro
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">{BEAT_VIEWS[beat]}</div>
      </div>

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

// Small wrapper so NameBeat can report the captured name up to the shell
function NameBeatWrapper({ onDone }) {
  const [value, setValue] = useState('')

  function save() {
    const name = value.trim().slice(0, 30)
    if (name) updateState({ name })
    onDone(name || null)
  }

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-semibold">
        Every performance needs a name on the programme.
      </h2>
      <input
        value={value}
        maxLength={30}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && save()}
        placeholder="Your name (optional)"
        className="w-full rounded-xl border border-line bg-raised p-3 text-center font-mono text-sm placeholder:text-faint focus:border-cue-dim"
        aria-label="Your name, optional"
      />
      <Continue onClick={save}>
        {value.trim() ? 'That’s me →' : 'Stay anonymous →'}
      </Continue>
    </div>
  )
}