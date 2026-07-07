// src/screens/Settings.jsx
// T5.2 — Persona switcher, theme note (dark-only MVP), reset with confirm.
// Reset wipes storage → persona becomes null → landing on the Challenge
// shows the Lesson 1 persona picker again (the T2.3 flow, replayed).

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { PERSONAS } from '../data/lessons'
import { SCREENS } from '../lib/screens'
import ConfirmDialog from '../components/ConfirmDialog'

export default function Settings({ onNavigate }) {
  const { persona, setPersona, resetProgress } = useProgress()
  const [confirming, setConfirming] = useState(false)

  function handleReset() {
    resetProgress()
    setConfirming(false)
    onNavigate(SCREENS.CHALLENGE) // → Lesson 1 + persona picker (AC)
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          Preferences
        </p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Settings
        </h1>
      </header>

      {/* Persona */}
      <section className="space-y-3">
        <div>
          <h2 className="font-display font-semibold">Persona</h2>
          <p className="text-sm text-muted">
            Scenarios and examples are framed for your world. Switch anytime —
            it applies from your next lesson.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERSONAS.map((p) => {
            const active = persona === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'border-cue bg-cue/10 text-cue'
                    : 'border-line bg-raised text-ink hover:border-cue-dim hover:text-cue'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
        {persona === null && (
          <p className="font-mono text-xs text-faint">
            none chosen yet — lessons currently use the everyday framing
          </p>
        )}
      </section>

      {/* Theme */}
      <section className="space-y-1">
        <h2 className="font-display font-semibold">Theme</h2>
        <p className="text-sm text-muted">
          Dark only — the house lights stay down. 🎭
        </p>
      </section>

      {/* Danger zone */}
      <section className="space-y-3 rounded-xl border border-over/30 p-4">
        <div>
          <h2 className="font-display font-semibold text-over">
            Reset progress
          </h2>
          <p className="text-sm text-muted">
            Wipes XP, levels, streak, scores, and persona. There's no undo —
            progress lives only on this device.
          </p>
        </div>
        <button
          onClick={() => setConfirming(true)}
          className="rounded-lg border border-over/50 px-4 py-2 text-sm text-over transition-colors hover:bg-over/10"
        >
          Reset everything
        </button>
      </section>

      {confirming && (
        <ConfirmDialog
          title="Reset all progress?"
          body="XP, levels, streak, best scores, and your persona choice will be permanently wiped from this device."
          confirmLabel="Yes, reset"
          onConfirm={handleReset}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  )
}