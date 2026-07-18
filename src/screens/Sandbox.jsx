// src/screens/Sandbox.jsx
// v2-2a Freeplay + v2-2c The Critic's Review. Two tabs, ONE shared daily
// quota (sandboxQuota). No XP, no attempt history from either tab — the
// sandbox is a rehearsal room, not a performance.
//
// Review mode has NO heuristic fallback on purpose: the rubric judges
// prompts, not prompt+answer pairs — pretending otherwise would fake a
// verdict. If the API is unreachable, the review says so and the spent
// quota is refunded.

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { evaluateWithRetry } from '../lib/gemini'
import { heuristicEvaluate } from '../lib/heuristic'
import { remainingToday, spendOne, refundOne, dailyAllowance } from '../lib/sandboxQuota'
import PromptInput from '../components/PromptInput'
import CurtainLoader from '../components/CurtainLoader'
import ResultsPanel from '../components/ResultsPanel'

const TABS = [
  { id: 'freeplay', label: 'Freeplay' },
  { id: 'review', label: "The Critic's Review" },
]

// Freeplay lesson shell — existing proxy + rubric work unchanged.
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

// Inline review client (scope fence: this ticket touches Sandbox only).
// Mirrors gemini.js shape-checking so ResultsPanel can trust the result.
async function requestReview(pastedPrompt, pastedAnswer) {
  const res = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'review', pastedPrompt, pastedAnswer }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body?.error ?? 'UPSTREAM')
  const r = body?.result
  if (
    !r || typeof r.score !== 'number' || !Array.isArray(r.strengths) ||
    !Array.isArray(r.improvements) || typeof r.rewrittenExample !== 'string'
  ) {
    throw new Error('BAD_JSON')
  }
  return { ...r, model: body.model ?? null }
}

function QuotaStrip({ left, allowance }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-2.5 font-mono text-xs">
      <span className="text-muted">evaluations left today</span>
      <span className={left > 0 ? 'text-cue' : 'text-over'}>
        {left} / {allowance}
      </span>
    </div>
  )
}

function QuotaExhausted() {
  return (
    <div className="rounded-xl border border-cue-dim bg-cue/5 p-4 text-sm leading-relaxed text-muted">
      <span className="text-ink">House is full for today.</span> Your sandbox
      evaluations reset tomorrow — and every level you gain adds one more per
      day. Meanwhile, the lessons and replays are always open.
    </div>
  )
}

export default function Sandbox() {
  const { level } = useProgress()
  const [tab, setTab] = useState('freeplay')

  // Freeplay state
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [fpStatus, setFpStatus] = useState('idle')
  const [fpResult, setFpResult] = useState(null)

  // Review state
  const [pastedPrompt, setPastedPrompt] = useState('')
  const [pastedAnswer, setPastedAnswer] = useState('')
  const [rvStatus, setRvStatus] = useState('idle') // idle | evaluating | done | error
  const [rvResult, setRvResult] = useState(null)

  const left = remainingToday(level)
  const allowance = dailyAllowance(level)

  async function submitFreeplay() {
    if (fpStatus === 'evaluating') return
    if (!spendOne(level)) return
    setFpStatus('evaluating')
    const lesson = freeplayLesson(context)
    let evaluation
    try {
      evaluation = await evaluateWithRetry(lesson, prompt)
    } catch {
      evaluation = heuristicEvaluate(lesson, prompt)
    }
    setFpResult(evaluation)
    setFpStatus('done')
    // NO completeLesson, NO appendAttempt — sandbox leaves no trace.
  }

  async function submitReview() {
    if (rvStatus === 'evaluating') return
    const ready =
      pastedPrompt.trim().length > 0 && pastedAnswer.trim().length > 0
    if (!ready || !spendOne(level)) return
    setRvStatus('evaluating')
    try {
      const verdict = await requestReview(pastedPrompt, pastedAnswer)
      setRvResult(verdict)
      setRvStatus('done')
    } catch {
      // No honest offline verdict exists for a pair — refund the spend.
      setRvStatus('error')
      refundOne()
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          The Sandbox
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          {tab === 'freeplay' ? 'Freeplay' : "The Critic's Review"}
        </h1>
        <p className="max-w-[65ch] text-sm text-muted">
          {tab === 'freeplay'
            ? 'Rehearsal room: bring any real prompt from your life and get it scored. No XP, no history — just practice.'
            : 'Paste a prompt you sent to any AI and the answer it gave you. The Critic judges whether the answer was up to the mark — and traces its weaknesses back to your prompt.'}
        </p>
      </header>

      {/* Tab bar */}
      <div role="tablist" aria-label="Sandbox modes" className="flex gap-1 rounded-xl border border-line bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              tab === t.id
                ? 'bg-raised text-cue'
                : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <QuotaStrip left={left} allowance={allowance} />

      {/* ---- FREEPLAY ---- */}
      {tab === 'freeplay' &&
        (left === 0 && fpStatus !== 'done' ? (
          <QuotaExhausted />
        ) : (
          <>
            {left > 0 && (
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
                  onSubmit={submitFreeplay}
                  disabled={fpStatus === 'evaluating'}
                />
              </>
            )}
            {fpStatus === 'evaluating' && <CurtainLoader />}
            {fpStatus === 'done' && fpResult && (
              <ResultsPanel result={fpResult} award={null} />
            )}
          </>
        ))}

      {/* ---- THE CRITIC'S REVIEW ---- */}
      {tab === 'review' &&
        (left === 0 && rvStatus !== 'done' ? (
          <QuotaExhausted />
        ) : (
          <>
            {left > 0 && (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="review-prompt" className="font-mono text-xs uppercase tracking-widest text-faint">
                    the prompt you sent
                  </label>
                  <textarea
                    id="review-prompt"
                    rows={3}
                    value={pastedPrompt}
                    maxLength={2000}
                    onChange={(e) => setPastedPrompt(e.target.value)}
                    placeholder="Paste your prompt here…"
                    className="w-full resize-none rounded-xl border border-line bg-raised p-3 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="review-answer" className="font-mono text-xs uppercase tracking-widest text-faint">
                    the answer you got
                  </label>
                  <textarea
                    id="review-answer"
                    rows={5}
                    value={pastedAnswer}
                    maxLength={2000}
                    onChange={(e) => setPastedAnswer(e.target.value)}
                    placeholder="Paste the AI's answer here…"
                    className="w-full resize-none rounded-xl border border-line bg-raised p-3 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={submitReview}
                    disabled={
                      rvStatus === 'evaluating' ||
                      pastedPrompt.trim().length === 0 ||
                      pastedAnswer.trim().length === 0
                    }
                    className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
                  >
                    Summon The Critic
                  </button>
                </div>
              </>
            )}
            {rvStatus === 'evaluating' && <CurtainLoader />}
            {rvStatus === 'done' && rvResult && (
              <ResultsPanel result={rvResult} award={null} />
            )}
            {rvStatus === 'error' && (
              <p className="rounded-xl border border-line bg-surface p-4 font-mono text-sm text-muted">
                The Critic couldn't be reached — a review needs the live
                evaluator, so nothing was judged and your evaluation was
                not counted. Try again in a moment.
              </p>
            )}
          </>
        ))}
    </div>
  )
}