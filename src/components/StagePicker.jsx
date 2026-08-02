// src/components/StagePicker.jsx
// v3-1c — Switch between stages. Locked stages are TEASED, never hidden:
// visible coming-content beats invisible absence (the Encore-lock
// philosophy). Switching preserves every stage's own progress — the
// journey resumes where that stage left off, while name, XP, rank,
// streak and stickers carry across all of them.
//
// v6 polish — stages are grouped into Core (everyday craft) and Advanced
// (agentic / power-user) so a growing list stays legible and beginners
// aren't overwhelmed by developer stages. Subtle entrance motion.

import { motion } from 'motion/react'
import { useProgress, setActiveStage } from '../hooks/useProgress'
import { STAGE_LIST, isStagePlayable } from '../data/stages'

// Which stages are the "advanced / agentic" cluster. Everything else is core.
const ADVANCED = new Set(['code', 'agent', 'rag', 'automation', 'system'])

function StageButton({ stage, active, playable, onChoose, index, reduce }) {
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: reduce ? 0 : index * 0.03 }}
    >
      <motion.button
        whileTap={reduce || !playable ? {} : { scale: 0.98 }}
        onClick={() => onChoose(stage.id)}
        disabled={!playable}
        aria-current={active ? 'true' : undefined}
        className={`w-full rounded-xl border p-3 text-left transition-colors ${
          active
            ? 'border-cue bg-cue/10'
            : playable
              ? 'border-line bg-surface hover:border-cue-dim'
              : 'cursor-not-allowed border-line bg-surface opacity-55'
        }`}
      >
        <p
          className={`flex items-center gap-2 font-display text-sm font-semibold ${
            active ? 'text-cue' : playable ? 'text-ink' : 'text-muted'
          }`}
        >
          {playable ? stage.label : `🔒 ${stage.label}`}
          {active && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-cue">
              on stage
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-muted">
          {stage.blurb}
        </p>
        {!playable && (
          <p className="mt-1 font-mono text-[10px] text-faint">coming soon</p>
        )}
      </motion.button>
    </motion.li>
  )
}

export default function StagePicker({ onSwitched, compact = false }) {
  const { activeStage } = useProgress()
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  function choose(id) {
    if (setActiveStage(id)) onSwitched?.(id)
  }

  const core = STAGE_LIST.filter((s) => !ADVANCED.has(s.id))
  const advanced = STAGE_LIST.filter((s) => ADVANCED.has(s.id))

  const renderGroup = (stages, offset) => (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {stages.map((stage, i) => (
        <StageButton
          key={stage.id}
          stage={stage}
          active={stage.id === activeStage}
          playable={isStagePlayable(stage.id)}
          onChoose={choose}
          index={offset + i}
          reduce={reduce}
        />
      ))}
    </ul>
  )

  return (
    <div className={compact ? 'space-y-3' : 'space-y-5'}>
      {!compact && (
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            the stages
          </p>
          <p className="mt-1 max-w-[60ch] text-sm text-muted">
            Same three steps, different craft. Your name, XP, rank and
            stickers travel with you — each stage keeps its own lessons.
          </p>
        </div>
      )}

      {/* Core stages */}
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
          everyday craft
        </p>
        {renderGroup(core, 0)}
      </div>

      {/* Advanced / agentic stages */}
      {advanced.length > 0 && (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-cue/70">
            advanced · directing AI
          </p>
          {renderGroup(advanced, core.length)}
        </div>
      )}
    </div>
  )
}