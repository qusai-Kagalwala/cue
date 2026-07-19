// src/components/RubricChecklist.jsx
// v2-5d — Live rubric checklist: the dimensions breakdown (carried by
// scoreWithRubric since T-v1-3) finally cashing in. Ticks update as the
// learner types, debounced ~400ms. Lesson-weighted dimensions render
// first, the top two starred as "this lesson's focus". Zero quota —
// it's all the local rubric.

import { useEffect, useState } from 'react'
import { scoreWithRubric, weightsFor } from '../lib/rubric'

const LABELS = {
  role: 'Role assigned',
  context: 'Context given',
  constraints: 'Limits set',
  format: 'Shape named',
  specificity: 'Specifics named',
  length: 'Right length',
}

function Tick({ level }) {
  // level: 'full' | 'partial' | 'empty'
  if (level === 'full') {
    return <span className="text-good" aria-hidden="true">✓</span>
  }
  if (level === 'partial') {
    return <span className="text-cue" aria-hidden="true">◐</span>
  }
  return <span className="text-faint" aria-hidden="true">○</span>
}

export default function RubricChecklist({ lesson, prompt }) {
  const [debounced, setDebounced] = useState(prompt)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(prompt), 400)
    return () => clearTimeout(t)
  }, [prompt])

  const { dimensions } = scoreWithRubric(lesson, debounced)
  const weights = weightsFor(lesson.id)
  const ordered = Object.keys(weights).sort((a, b) => weights[b] - weights[a])
  const focus = new Set(ordered.slice(0, 2))

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faint">
        live checklist
      </p>
      <ul className="space-y-1.5">
        {ordered.map((dim) => {
          const raw = dimensions[dim]
          const level = raw >= 0.6 ? 'full' : raw >= 0.3 ? 'partial' : 'empty'
          return (
            <li
              key={dim}
              className="flex items-center gap-2 font-mono text-sm"
            >
              <Tick level={level} />
              <span className={level === 'empty' ? 'text-muted' : 'text-ink'}>
                {LABELS[dim]}
              </span>
              {focus.has(dim) && (
                <span
                  className="text-cue"
                  title="this lesson's focus"
                  aria-label="this lesson's focus"
                >
                  ★
                </span>
              )}
            </li>
          )
        })}
      </ul>
      <p className="mt-2 font-mono text-[10px] text-faint">
        ★ = this lesson's focus · estimates from the practice rubric
      </p>
    </div>
  )
}