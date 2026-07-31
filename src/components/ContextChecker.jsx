// src/components/ContextChecker.jsx
// The Context Checker — a live "you might be missing…" nudge under the prompt
// box. As the person types, it shows which strong-prompt dimensions their
// prompt hasn't hit yet (role, context, limits, format, specifics). The chips
// shrink as they address each one, so it's a gentle guide, not a scold.
//
// Answers the #1 complaint in the research: people forget to include context.
// Reuses the rubric's detectors (checkContext) so it's consistent with how
// the prompt will actually be scored.

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { checkContext } from '../lib/rubric'

// Only nudge once there's enough text to be worth checking — don't flash
// chips at someone who's typed three characters.
const MIN_CHARS = 12

export default function ContextChecker({ prompt, stageId = 'text' }) {
  const missing = useMemo(() => {
    if (!prompt || prompt.trim().length < MIN_CHARS) return []
    return checkContext(prompt, stageId)
  }, [prompt, stageId])

  // Nothing missing (or too short) → say nothing. Silence = "you're good."
  if (missing.length === 0) return null

  // If they've nailed most of it, celebrate the near-miss rather than nag.
  const nearlyThere = missing.length <= 1

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
        {nearlyThere ? 'almost — consider' : 'consider adding'}
      </span>
      <AnimatePresence mode="popLayout">
        {missing.map((m) => (
          <motion.span
            key={m.dim}
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="rounded-full border border-cue-dim/50 bg-cue/5 px-2 py-0.5 font-mono text-[10px] text-muted"
          >
            {m.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}