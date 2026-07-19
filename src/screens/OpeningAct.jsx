// src/screens/OpeningAct.jsx
// v2-3a shell + v2-3b real beats 1/2/4/5 + curtain.
// Beat 3 (Audition) stays a placeholder until v2-3c.
// All animation is CSS-only (index.css: cue-type / cue-blink) and fully
// disabled under prefers-reduced-motion.

import { useState } from 'react'
import { BEATS } from '../lib/screens'
import { PERSONAS } from '../data/lessons'
import { loadState, updateState } from '../lib/storage'
import { setPersona } from '../hooks/useProgress'
import { scoreWithRubric } from '../lib/rubric'
import { auditionRank } from '../lib/ranks'
import { AUDITION_MCQS, AUDITION_TASK } from '../data/audition'

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

// ---- Beat 3: The Audition (v2-3c) ---------------------------------------
// Skip note: the shell's "skip this" advances WITHOUT saving an attempt —
// downstream (share card, v2-4a callback) treats a missing auditionAttempt
// as skipped → Understudy. Absence IS the default.
function AuditionBeat({ onNext }) {
  const [phase, setPhase] = useState('mcq') // mcq | task | reveal
  const [mcqIndex, setMcqIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [picked, setPicked] = useState(null) // index picked this question
  const [taskPrompt, setTaskPrompt] = useState('')
  const [outcome, setOutcome] = useState(null)

  const mcq = AUDITION_MCQS[mcqIndex]

  function pick(i) {
    if (picked !== null) return
    setPicked(i)
    if (mcq.pair[i].better) setCorrect((c) => c + 1)
  }

  function nextMcq() {
    setPicked(null)
    if (mcqIndex < AUDITION_MCQS.length - 1) setMcqIndex((i) => i + 1)
    else setPhase('task')
  }

  function submitTask() {
    const rubric = scoreWithRubric(AUDITION_TASK, taskPrompt) // zero quota
    const mcqScore = Math.round((correct / AUDITION_MCQS.length) * 100)
    const combined = Math.round(mcqScore * 0.5 + rubric.score * 0.5)
    const rank = auditionRank(combined)
    const attempt = {
      mcqCorrect: correct,
      mcqTotal: AUDITION_MCQS.length,
      taskPrompt: taskPrompt.trim(),
      taskScore: rubric.score,
      combined,
      rank,
      timestamp: new Date().toISOString(),
    }
    updateState({ auditionAttempt: attempt }) // v2-4a callback reads this
    setOutcome(attempt)
    setPhase('reveal')
  }

  if (phase === 'mcq') {
    return (
      <div className="space-y-4">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-faint">
          the audition · {mcqIndex + 1} / {AUDITION_MCQS.length}
        </p>
        <h2 className="text-center font-display text-xl font-semibold">
          {mcq.question}
        </h2>
        <div className="space-y-2">
          {mcq.pair.map((option, i) => {
            const chosen = picked === i
            const showState = picked !== null
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={`w-full rounded-xl border p-3 text-left font-mono text-sm leading-relaxed transition-colors ${
                  showState && option.better
                    ? 'border-good text-ink'
                    : chosen
                      ? 'border-over text-muted'
                      : 'border-line bg-raised text-ink hover:border-cue-dim'
                }`}
              >
                {option.text}
              </button>
            )
          })}
        </div>
        {picked !== null && (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-muted">{mcq.why}</p>
            <div className="flex justify-center">
              <Continue onClick={nextMcq}>
                {mcqIndex < AUDITION_MCQS.length - 1 ? 'Next →' : 'One last thing →'}
              </Continue>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (phase === 'task') {
    return (
      <div className="space-y-4">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-faint">
          the audition · your turn
        </p>
        <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
          <p className="text-muted">{AUDITION_TASK.scenario}</p>
          <p className="mt-2 text-cue">{AUDITION_TASK.task}</p>
        </div>
        <textarea
          rows={4}
          value={taskPrompt}
          maxLength={1000}
          onChange={(e) => setTaskPrompt(e.target.value)}
          placeholder="Write your prompt…"
          className="w-full resize-none rounded-xl border border-line bg-raised p-3 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
          aria-label="Your audition prompt"
        />
        <div className="flex justify-center">
          <Continue onClick={submitTask}>
            {taskPrompt.trim().length > 0 ? 'Take the audition →' : 'Submit blank (brave) →'}
          </Continue>
        </div>
      </div>
    )
  }

  // reveal
  return (
    <div className="space-y-4 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        the verdict
      </p>
      <h2 className="font-display text-3xl font-bold text-cue">
        {outcome.rank}
      </h2>
      <p className="text-sm text-muted">
        {outcome.mcqCorrect}/{outcome.mcqTotal} picks · prompt scored{' '}
        {outcome.taskScore} — your starting rank. Eight lessons from now,
        we'll see how far you've climbed.
      </p>
      <div className="flex justify-center">
        <Continue onClick={onNext} />
      </div>
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

// ---- Beat 5: persona pick + v2-7 matcher (one Gemini call, once ever) ----
function PersonaBeat({ onNext }) {
  const [description, setDescription] = useState('')
  const [matching, setMatching] = useState(false)
  const [matchFailed, setMatchFailed] = useState(false)
  // Once-ever flag: read at mount; ANY attempt (success or fail) sets it.
  const [matcherAvailable] = useState(() => !loadState().matcherUsed)

  function pick(id) {
    setPersona(id) // same store action the inline picker uses — the
    onNext()       // Challenge picker then never shows (persona !== null)
  }

  async function matchMe() {
    if (matching || description.trim().length < 3) return
    setMatching(true)
    updateState({ matcherUsed: true }) // burn the flag BEFORE the call —
    // a refresh mid-flight must not grant a second shot
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'persona', selfDescription: description }),
      })
      const body = await res.json()
      const p = body?.result?.persona
      if (!res.ok || !['student', 'everyday', 'professional'].includes(p)) {
        throw new Error('bad classification')
      }
      pick(p) // classified → set + advance, same path as a manual tap
    } catch {
      setMatchFailed(true) // chips below are the fallback — always visible
      setMatching(false)
    }
  }

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-semibold">
        Who’s taking the stage tonight?
      </h2>
      <p className="text-sm text-muted">Examples read better in your world.</p>

      {/* v2-7 — the matcher: describe yourself, let the AI pick the track */}
      {matcherAvailable && !matchFailed && (
        <div className="space-y-2">
          <input
            value={description}
            maxLength={300}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && matchMe()}
            placeholder="One line about your life — e.g. 'retired teacher, love cooking'"
            aria-label="Describe yourself for track matching, optional"
            className="w-full rounded-xl border border-line bg-raised p-3 text-center font-mono text-sm placeholder:text-faint focus:border-cue-dim"
          />
          <button
            onClick={matchMe}
            disabled={matching || description.trim().length < 3}
            className="rounded-lg border border-cue-dim px-5 py-2 text-sm text-cue transition-colors hover:bg-cue/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {matching ? 'reading the room…' : '✨ Match me to a track'}
          </button>
          <p className="font-mono text-[10px] text-faint">
            or pick for yourself below
          </p>
        </div>
      )}
      {matchFailed && (
        <p className="font-mono text-xs text-muted">
          The matcher couldn't decide — pick your track below.
        </p>
      )}
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
    audition: <AuditionBeat onNext={next} />,
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