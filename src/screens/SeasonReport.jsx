// src/screens/SeasonReport.jsx
// v2-12b — The Season Report: the attempt history shown back to its
// owner. Hand-rolled SVG line chart (~60 lines, NO chart library —
// tripwire), stat lines from seasonStats. Zero quota, zero disclosure:
// this is the user's own localStorage, rendered.
// The "Your Progress" shell carries tabs — the Playbill (v2-13) is the
// sibling; its tab sits here waiting.

import { useState } from 'react'
import { loadAttempts } from '../lib/storage'
import Playbill from './Playbill'
import { LESSONS } from '../data/lessons'
import {
  coreAttempts,
  avgScoreByLesson,
  firstVsBest,
  trendHeadline,
  overallStats,
} from '../lib/seasonStats'

// ---- The chart: score over time, hand-rolled ----------------------------
function ScoreChart({ attempts }) {
  const W = 600
  const H = 200
  const PAD = { top: 14, right: 14, bottom: 22, left: 30 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const x = (i) =>
    PAD.left + (attempts.length === 1 ? innerW / 2 : (i / (attempts.length - 1)) * innerW)
  const y = (score) => PAD.top + innerH - (score / 100) * innerH

  const points = attempts.map((a, i) => `${x(i)},${y(a.score)}`).join(' ')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Score chart: ${attempts.length} attempts over time`}
      className="w-full rounded-xl border border-line bg-surface"
    >
      {/* gridlines + axis labels at 0/25/50/75/100 */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line
            x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)}
            stroke="var(--color-line)" strokeWidth="1"
            strokeDasharray={v === 0 ? '' : '3 5'}
          />
          <text
            x={PAD.left - 6} y={y(v) + 3} textAnchor="end"
            fontSize="9" fontFamily="monospace" fill="var(--color-faint)"
          >
            {v}
          </text>
        </g>
      ))}

      {/* the 58 "high band" floor — the line worth crossing */}
      <line
        x1={PAD.left} x2={W - PAD.right} y1={y(58)} y2={y(58)}
        stroke="var(--color-cue-dim)" strokeWidth="1" strokeDasharray="6 4"
      />

      {/* the journey */}
      {attempts.length > 1 && (
        <polyline
          points={points} fill="none"
          stroke="var(--color-cue)" strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round"
        />
      )}
      {attempts.map((a, i) => (
        <circle
          key={i} cx={x(i)} cy={y(a.score)} r="3.5"
          fill={a.engine === 'heuristic' ? 'var(--color-faint)' : 'var(--color-cue)'}
        >
          <title>{`${a.lessonId} · ${a.score}${a.engine === 'heuristic' ? ' (offline estimate)' : ''}`}</title>
        </circle>
      ))}

      <text
        x={W - PAD.right} y={H - 6} textAnchor="end"
        fontSize="9" fontFamily="monospace" fill="var(--color-faint)"
      >
        attempts →
      </text>
    </svg>
  )
}

// ---- The report ----------------------------------------------------------
export default function SeasonReport() {
  const [tab, setTab] = useState('report') // report | playbill
  const attempts = loadAttempts()
  const chrono = coreAttempts(attempts)
  const trend = trendHeadline(attempts)
  const totals = overallStats(attempts)
  const avgs = avgScoreByLesson(attempts)
  const fvb = firstVsBest(attempts)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          your progress
        </p>
        {/* Sibling tabs — the Playbill (v2-13) lands beside this */}
        <div role="tablist" aria-label="Your progress" className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {[
            ['report', 'Season Report'],
            ['playbill', 'The Playbill'],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-sm transition-colors ${
                tab === id ? 'bg-raised text-cue' : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {tab === 'playbill' && <Playbill />}

      {tab === 'report' && (chrono.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface p-6 text-center">
          <p className="text-muted">No performances on record yet.</p>
          <p className="mt-1 font-mono text-xs text-faint">
            complete an assessment and your season begins here
          </p>
        </div>
      ) : (
        <>
          {/* The headline — or the honest keep-going line */}
          <p className="max-w-[65ch] font-display text-lg font-semibold leading-snug">
            {trend
              ? trend.line
              : `${chrono.length} performance${chrono.length === 1 ? '' : 's'} on record — a few more and the trend shows itself.`}
          </p>

          <ScoreChart attempts={chrono} />

          {/* Season totals */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              ['performances', totals.total],
              ['average', totals.avg],
              ['best', totals.best],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-line bg-surface px-3 py-2.5">
                <p className="font-display text-xl font-bold text-cue">{value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Per-lesson: average bar + first→best */}
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-faint">
              lesson by lesson
            </p>
            {LESSONS.filter((l) => avgs[l.id] != null).map((l) => (
              <div key={l.id} className="flex items-center gap-3">
                <span className="w-8 font-mono text-xs text-faint">
                  L{l.order}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-raised">
                  <div
                    className="h-full rounded-full bg-cue/70"
                    style={{ width: `${avgs[l.id]}%` }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs text-ink">
                  {avgs[l.id]}
                </span>
                <span className="w-20 text-right font-mono text-[11px] text-muted">
                  {fvb[l.id].first} → {fvb[l.id].best}
                  {fvb[l.id].improved && <span className="text-good"> ↑</span>}
                </span>
              </div>
            ))}
          </div>

          {totals.heuristicCount > 0 && (
            <p className="font-mono text-[10px] text-faint">
              grey dots are offline estimates ({totals.heuristicCount} of{' '}
              {totals.total}) — amber dots were scored by the real evaluator
            </p>
          )}
        </>
      ))}
    </div>
  )
}