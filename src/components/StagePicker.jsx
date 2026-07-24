// src/components/StagePicker.jsx
// v3-1c — Switch between stages. Locked stages are TEASED, never hidden:
// visible coming-content beats invisible absence (the Encore-lock
// philosophy). Switching preserves every stage's own progress — the
// journey resumes where that stage left off, while name, XP, rank,
// streak and stickers carry across all of them.

import { useProgress, setActiveStage } from '../hooks/useProgress'
import { STAGE_LIST, isStagePlayable } from '../data/stages'

export default function StagePicker({ onSwitched, compact = false }) {
  const { activeStage } = useProgress()

  function choose(id) {
    if (setActiveStage(id)) onSwitched?.(id)
  }

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
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

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {STAGE_LIST.map((stage) => {
          const playable = isStagePlayable(stage.id)
          const active = stage.id === activeStage
          return (
            <li key={stage.id}>
              <button
                onClick={() => choose(stage.id)}
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
                  className={`font-display text-sm font-semibold ${
                    active ? 'text-cue' : playable ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {playable ? stage.label : `🔒 ${stage.label}`}
                  {active && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-cue">
                      on stage
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">
                  {stage.blurb}
                </p>
                {!playable && (
                  <p className="mt-1 font-mono text-[10px] text-faint">
                    coming soon
                  </p>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}