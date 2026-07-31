// src/components/PromptAutopsy.jsx
// Prompt Autopsy — the "why did it score that?" breakdown. Shows all six
// rubric dimensions for the prompt: how well each was met (bar) and how much
// it mattered for THIS lesson (weight dot). Turns a single number into a
// lesson: the learner sees exactly which parts landed and which to fix.
//
// The data comes from the offline rubric's `autopsy` array — a real,
// deterministic analysis of the prompt text — so it works even when the score
// itself came from Gemini (the rubric runs alongside to explain the shape).

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const VERDICT = {
  strong: { label: 'strong', color: 'text-good', bar: 'bg-good' },
  partial: { label: 'partial', color: 'text-cue', bar: 'bg-cue' },
  missing: { label: 'missing', color: 'text-muted', bar: 'bg-line' },
}

export default function PromptAutopsy({ autopsy }) {
  const [open, setOpen] = useState(false)
  if (!autopsy || autopsy.length === 0) return null

  return (
    <div className="rounded-xl border border-line bg-surface">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-faint">
          the report card — why this score
        </span>
        <span className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-4 pb-4">
              <p className="text-xs leading-relaxed text-muted">
                The checklist told you what to add. This is how it actually
                landed — each dimension graded, with dots showing how much it
                counted toward <span className="text-cue">this</span> lesson's
                score.
              </p>

              {autopsy.map((d) => {
                const v = VERDICT[d.verdict]
                const pct = Math.round(d.raw * 100)
                // weight → 1-3 dots (how much this dimension counted here)
                const dots = d.weight >= 0.3 ? 3 : d.weight >= 0.15 ? 2 : 1
                return (
                  <div key={d.dim} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-ink">
                        {d.label}
                        <span
                          className="font-mono text-[10px] text-faint"
                          title="how much this mattered for this lesson"
                        >
                          {'●'.repeat(dots)}
                          <span className="text-line">{'●'.repeat(3 - dots)}</span>
                        </span>
                      </span>
                      <span className={`font-mono text-xs ${v.color}`}>{v.label}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-raised">
                      <motion.div
                        className={`h-full rounded-full ${v.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )
              })}

              {(() => {
                // the biggest lever: the dimension that mattered most here yet
                // scored weakest (weight high, raw low). Unique to the report
                // card — the pre-flight checklist can't rank by impact.
                const lever = [...autopsy]
                  .filter((d) => d.raw < 0.6)
                  .sort((a, b) => b.weight * (1 - b.raw) - a.weight * (1 - a.raw))[0]
                return lever ? (
                  <div className="rounded-lg border border-cue-dim/50 bg-cue/5 p-2.5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cue">
                      biggest win next time
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      Strengthening <span className="text-ink">{lever.label}</span>{' '}
                      would move this score the most.
                    </p>
                  </div>
                ) : null
              })()}

              <p className="pt-1 font-mono text-[10px] text-faint">
                ●●● = counted most for this lesson · ● = minor here
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}