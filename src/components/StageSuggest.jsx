// src/components/StageSuggest.jsx
// v3-6a — a one-time, dismissible nudge toward a stage. After the persona
// step, we ask what the person actually wants to make and suggest the
// matching stage. It is ALWAYS a suggestion: tapping switches the active
// stage (via setActiveStage, which itself refuses unplayable stages), and
// "just start" or the dismiss control leaves them on text. Nothing locks,
// nothing is forced — every stage is still reachable from the map.

import { setActiveStage } from '../hooks/useProgress'
import { isStagePlayable, STAGES } from '../data/stages'

// What someone might say they want → the stage that teaches it. Text is the
// default home, so it isn't offered as a "goal" here — it's where you land
// if you dismiss.
const GOALS = [
  { key: 'image', label: 'Images & art', blurb: 'posters, illustrations, photos' },
  { key: 'video', label: 'Video clips', blurb: 'shots, motion, short scenes' },
  { key: 'audio', label: 'Music & audio', blurb: 'tracks, voice, sound' },
  { key: 'code', label: 'Code', blurb: 'functions, scripts, fixes' },
]

export default function StageSuggest({ onDone }) {
  // only offer stages that are actually playable right now
  const options = GOALS.filter((g) => isStagePlayable(g.key) && STAGES[g.key])

  // if nothing else is unlocked yet, there's nothing to suggest — skip
  if (options.length === 0) {
    onDone?.()
    return null
  }

  function choose(stageId) {
    setActiveStage(stageId) // refuses gracefully if somehow unplayable
    onDone?.()
  }

  return (
    <section
      aria-label="What would you like to make?"
      className="rounded-xl border border-cue-dim bg-surface p-4 sm:p-5"
    >
      <p className="mb-1 text-sm text-ink">What do you most want to make?</p>
      <p className="mb-3 font-mono text-xs text-faint">
        just a starting point — you can switch stages anytime
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map((g) => (
          <button
            key={g.key}
            onClick={() => choose(g.key)}
            className="group rounded-xl border border-line bg-raised px-4 py-2.5 text-left transition-colors hover:border-cue-dim"
          >
            <span className="block text-sm text-ink group-hover:text-cue">{g.label}</span>
            <span className="block font-mono text-[11px] text-faint">{g.blurb}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onDone?.()}
        className="mt-3 font-mono text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
      >
        I'll start with writing →
      </button>
    </section>
  )
}