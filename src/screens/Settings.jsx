// src/screens/Settings.jsx
// T5.2 — Persona switcher, theme note (dark-only MVP), reset with confirm.
// Reset wipes storage → persona becomes null → landing on the Challenge
// shows the Lesson 1 persona picker again (the T2.3 flow, replayed).

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { PERSONAS } from '../data/lessons'
import { SCREENS } from '../lib/screens'
import ConfirmDialog from '../components/ConfirmDialog'
import { downloadExport, validateImport, applyImport } from '../lib/portability'

export default function Settings({ onNavigate }) {
  const { persona, setPersona, resetProgress } = useProgress()
  const [confirming, setConfirming] = useState(false)
  const [importError, setImportError] = useState(null)
  const [importReady, setImportReady] = useState(null) // validated file waiting for confirm

  // v2-14 — read the chosen file, validate, stage for confirmation
  function handleImportFile(e) {
    setImportError(null)
    const file = e.target.files?.[0]
    e.target.value = '' // same file can be re-picked after an error
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      let parsed
      try {
        parsed = JSON.parse(reader.result)
      } catch {
        setImportError("That file isn't valid JSON.")
        return
      }
      const verdict = validateImport(parsed)
      if (!verdict.ok) {
        setImportError(verdict.error)
        return
      }
      setImportReady(parsed) // → ConfirmDialog takes it from here
    }
    reader.onerror = () => setImportError('Could not read the file.')
    reader.readAsText(file)
  }

  function confirmImport() {
    if (importReady && applyImport(importReady)) {
      window.location.reload() // store re-initialises from storage on boot
    } else {
      setImportError('Import failed while writing — nothing was changed.')
      setImportReady(null)
    }
  }

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
      {/* v2-14 — Your data: export / import */}
      <section className="space-y-3">
        <div>
          <h2 className="font-display font-semibold">Your data</h2>
          <p className="text-sm text-muted">
            Everything lives on this device. Download it as one file to back
            up or move to another browser — progress, history, library, and
            stickers all included.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={downloadExport}
            className="rounded-lg border border-cue-dim px-5 py-2 text-sm text-cue transition-colors hover:bg-cue/10"
          >
            ⬇ Export my data
          </button>
          <label className="cursor-pointer rounded-lg border border-line px-5 py-2 text-sm text-muted transition-colors hover:border-cue-dim hover:text-cue">
            ⬆ Import from file
            <input
              type="file"
              accept="application/json,.json"
              onChange={handleImportFile}
              className="sr-only"
            />
          </label>
        </div>
        {importError && (
          <p className="font-mono text-xs text-over" role="alert">
            {importError}
          </p>
        )}
      </section>

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

      {importReady && (
        <ConfirmDialog
          title="Replace everything with this file?"
          body="Your current progress on this device will be overwritten by the imported file. This cannot be undone."
          confirmLabel="Import & replace"
          onConfirm={confirmImport}
          onCancel={() => setImportReady(null)}
        />
      )}

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