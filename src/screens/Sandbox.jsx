// src/screens/Sandbox.jsx
// v2-2a — The Sandbox: Freeplay tab (evaluate ANY prompt, no lesson).
// The Critic's Review tab arrives in v2-2c — the tab bar is built for two.
// No XP here, ever: the sandbox is a rehearsal room, not a performance.

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { evaluateWithRetry } from '../lib/gemini'
import { heuristicEvaluate } from '../lib/heuristic'
import { remainingToday, spendOne, dailyAllowance } from '../lib/sandboxQuota'
import PromptInput from '../components/PromptInput'
import CurtainLoader from '../components/CurtainLoader'
import ResultsPanel from '../components/ResultsPanel'

// A lesson "shell" so the existing proxy + rubric work unchanged.
// Context (optional) becomes the scenario the evaluation anchors to.
function freeplayLesson(context) {
  return {
    id: 'freeplay',
    title: 'Freeplay',
    concept:
      'An open evaluation: clarity, context, constraints, format, specificity, and economy all count.',
    scenario:
      context?.trim() ||
      'No specific scenario — the prompt is judged on general prompting craft.',
    task: 'Write the strongest version of whatever you are trying to ask.',
    tokenBudget: null,
  }
}

export default function Sandbox() {
  const { level } = useProgress()
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [status, setStatus] = useState('idle') // idle | evaluating | done
  const [result, setResult] = useState(null)
  const left = remainingToday(level)

  async function handleSubmit() {
    if (status === 'evaluating') return
    if (!spendOne(level)) return // quota gate — UI below explains
    setStatus('evaluating')
    const lesson = freeplayLesson(context)
    let evaluation
    try {
      evaluation = await evaluateWithRetry(lesson, prompt)
    } catch {
      evaluation = heuristicEvaluate(lesson, prompt)
    }
    setResult(evaluation)
    setStatus('done')
    // NO completeLesson, NO appendAttempt — sandbox runs leave no trace
    // in the XP economy or the Season Report's history.
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          The Sandbox
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Freeplay
        </h1>
        <p className="max-w-[65ch] text-sm text-muted">
          Rehearsal room: bring any real prompt from your life and get it
          scored. No XP, no history — just practice.
        </p>
      </header>

      {/* Quota strip */}
      <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-xs">
        <span className="text-muted">evaluations left today</span>
        <span className={left > 0 ? 'text-cue' : 'text-over'}>
          {left} / {dailyAllowance(level)}
        </span>
      </div>

      {left === 0 ? (
        <div className="rounded-xl border border-cue-dim bg-cue/5 p-4 text-sm leading-relaxed text-muted">
          <span className="text-ink">House is full for today.</span> Your
          sandbox evaluations reset tomorrow — and every level you gain adds
          one more per day. Meanwhile, the lessons and replays are always open.
        </div>
      ) : (
        <>
          <div className="space-y-1.5">
            <label htmlFor="sandbox-context" className="font-mono text-xs uppercase tracking-widest text-faint">
              context (optional)
            </label>
            <textarea
              id="sandbox-context"
              rows={2}
              value={context}
              maxLength={600}
              onChange={(e) => setContext(e.target.value)}
              placeholder="What's the situation this prompt is for?"
              className="w-full resize-none rounded-xl border border-line bg-raised p-3 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
            />
          </div>

          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            disabled={status === 'evaluating'}
          />
        </>
      )}

      {status === 'evaluating' && <CurtainLoader />}
      {status === 'done' && result && (
        <ResultsPanel result={result} award={null} />
      )}
    </div>
  )
}