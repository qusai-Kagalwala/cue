// src/components/ResultsPanel.jsx
// T4.1 feedback panel + mode badge: shows which engine produced this
// result — flash-lite (primary), flash (backup bucket), or offline.
// Honest about the machinery without making noise about it.

import { useState } from 'react'
import ScoreDial from './ScoreDial'
import XPToast from './XPToast'
import ShareCard from './ShareCard'

function FeedbackList({ label, items, tone }) {
  if (!items?.length) return null
  return (
    <div className="space-y-1.5">
      <p className={`text-xs uppercase tracking-widest ${tone}`}>{label}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function modeLabel(result) {
  if (result.offline) return 'offline heuristic'
  if (result.model === 'gemini-2.5-flash') return 'flash · backup'
  if (result.model === 'gemini-2.5-flash-lite') return 'flash-lite'
  return result.model // future-proof: show whatever the proxy reports
}

export default function ResultsPanel({ result, award, takeaway }) {
  const [copied, setCopied] = useState(false)
  if (!result) return null

  async function copyRewrite() {
    try {
      await navigator.clipboard.writeText(result.rewrittenExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — button just stays as "copy" */
    }
  }

  return (
    <section
      aria-label="Evaluation results"
      className="space-y-5 rounded-xl border border-line bg-surface p-4 sm:p-5"
    >
      {/* Score + mode badge */}
      <div className="flex items-center gap-4">
        <ScoreDial score={result.score} offline={result.offline} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg font-semibold">
              {result.offline ? 'Offline estimate' : 'Your result'}
            </p>
            <span
              title="Which engine evaluated this prompt"
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-faint"
            >
              {modeLabel(result)}
            </span>
          </div>
          {result.offline && (
            <p className="text-sm leading-snug text-muted">
              Couldn't reach the evaluator — this is a rough local check.
              Full feedback returns when you're back online.
            </p>
          )}
          {!result.budgetRespected && (
            <p className="font-mono text-xs text-over">over token budget</p>
          )}
        </div>
      </div>

      <FeedbackList label="What worked" items={result.strengths} tone="text-good" />
      <FeedbackList label="Push it further" items={result.improvements} tone="text-cue" />

      {/* Rewrite — real evaluations only; heuristics can't rewrite honestly */}
      {result.rewrittenExample && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-faint">
              A stronger version
            </p>
            <button
              onClick={copyRewrite}
              className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted transition-colors hover:border-cue-dim hover:text-cue"
            >
              {copied ? 'copied ✓' : 'copy'}
            </button>
          </div>
          <p className="rounded-lg border border-line bg-raised p-3 font-mono text-sm leading-relaxed">
            {result.rewrittenExample}
          </p>
        </div>
      )}

      {/* T-v1-4 — the one-line lesson takeaway: renders on EVERY result,
          real or offline (it comes from the lesson, not the evaluation) */}
      {takeaway && (
        <p className="border-l-2 border-cue-dim pl-3 text-sm italic leading-relaxed text-muted">
          <span className="not-italic font-mono text-xs uppercase tracking-widest text-faint">
            the takeaway ·{' '}
          </span>
          {takeaway}
        </p>
      )}

      {/* v2-1 — share this score (real evaluations only; an offline
          estimate on a share card would misrepresent the result) */}
      {!result.offline && <ShareCard score={result.score} label="Share this score" />}

      <XPToast award={award} />
    </section>
  )
}