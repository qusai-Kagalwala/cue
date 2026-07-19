// src/screens/Encore.jsx
// v2-9 — The boss challenge screen. Level 4 gate, today's scenario from
// the date-seeded picker, full evaluation (Gemini → heuristic fallback),
// 100 base XP + score bonus, ONCE per day.

import { useState } from 'react'
import { useProgress, completeEncore } from '../hooks/useProgress'
import { todayKey } from '../lib/xp'
import { encoreForDate } from '../data/encore'
import { evaluateWithRetry } from '../lib/gemini'
import { heuristicEvaluate } from '../lib/heuristic'
import { appendAttempt, saveToLibrary, LIBRARY_THRESHOLD } from '../lib/storage'
import PromptInput from '../components/PromptInput'
import CurtainLoader from '../components/CurtainLoader'
import ResultsPanel from '../components/ResultsPanel'

const ENCORE_GATE_LEVEL = 4

export default function Encore({ onExit }) {
  const { level, encoreDoneToday } = useProgress()
  const today = todayKey()
  const boss = encoreForDate(today)

  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState('idle') // idle | evaluating | done
  const [result, setResult] = useState(null)
  const [award, setAward] = useState(null)

  // ---- Gate: locked below Level 4 ----
  if (level < ENCORE_GATE_LEVEL) {
    return (
      <div className="mx-auto max-w-md space-y-4 pt-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the encore
        </p>
        <h1 className="font-display text-3xl font-bold text-faint">🔒</h1>
        <p className="leading-relaxed text-muted">
          The Encore unlocks at{' '}
          <span className="text-cue">Level {ENCORE_GATE_LEVEL}</span>. One boss
          challenge a day — every skill from all eight lessons, under a tight
          token budget, for 100 base XP.
        </p>
        <p className="font-mono text-xs text-faint">
          you're Level {level} — keep going 🎭
        </p>
        <button
          onClick={onExit}
          className="rounded-lg border border-line px-5 py-2 text-sm text-muted transition-colors hover:text-ink"
        >
          ← back
        </button>
      </div>
    )
  }

  async function handleSubmit() {
    if (status === 'evaluating') return
    setStatus('evaluating')
    const shell = {
      id: 'encore',
      title: boss.title,
      concept:
        'The full toolkit at once: role, context, constraints, format, specificity, and economy.',
      scenario: boss.scenario,
      task: boss.task,
      tokenBudget: boss.tokenBudget,
    }
    let evaluation
    try {
      evaluation = await evaluateWithRetry(shell, prompt)
    } catch {
      evaluation = heuristicEvaluate(shell, prompt)
    }
    appendAttempt({
      lessonId: 'encore',
      score: evaluation.score,
      engine: evaluation.offline ? 'heuristic' : (evaluation.model ?? 'unknown'),
      prompt,
    })
    if (!evaluation.offline && evaluation.score >= LIBRARY_THRESHOLD) {
      saveToLibrary({
        lessonId: 'encore',
        title: `Encore · ${boss.title}`,
        prompt,
        score: evaluation.score,
      })
    }
    // 100 base + bonus, ONCE per day (null if already claimed today)
    setAward(completeEncore(evaluation.offline ? 0 : evaluation.score))
    setResult(evaluation)
    setStatus('done')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        <button
          onClick={onExit}
          className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← back
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the encore · today's boss · 100 base XP · once a day
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          {boss.title}
        </h1>
      </header>

      {encoreDoneToday && status === 'idle' && (
        <div className="rounded-xl border border-cue-dim bg-cue/5 p-4 text-sm leading-relaxed text-muted">
          <span className="text-ink">Tonight's show is done.</span> You've
          taken today's Encore bow — a new boss walks on at midnight. You can
          still rehearse below, but the XP is claimed.
        </div>
      )}

      <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
        <p className="text-muted">{boss.scenario}</p>
        <p className="mt-2 text-cue">{boss.task}</p>
        <p className="mt-2 font-mono text-xs text-faint">
          token budget: {boss.tokenBudget} · every dimension counts
        </p>
      </div>

      {status !== 'done' && (
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          tokenBudget={boss.tokenBudget}
          disabled={status === 'evaluating'}
        />
      )}

      {status === 'evaluating' && <CurtainLoader />}
      {status === 'done' && result && (
        <>
          <ResultsPanel result={result} award={award} />
          <div className="flex justify-center">
            <button
              onClick={onExit}
              className="rounded-lg bg-cue px-5 py-2 text-sm font-medium text-stage transition-colors hover:bg-cue-bright"
            >
              Take a bow →
            </button>
          </div>
        </>
      )}
    </div>
  )
}