// src/components/CertificateActions.jsx
// The certificate CTA shown on stage completion. Offers PNG (share/save)
// and PDF (print) for the finished stage. When all stages are done it
// also offers the master "all stages" certificate. Fully client-side.

import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'
import { rankForLevel } from '../lib/ranks'
import { STAGE_LIST } from '../data/stages'
import {
  downloadCertificatePNG,
  printCertificatePDF,
} from '../lib/certificate'

// derived from the registry so new stages count toward the master certificate
const ALL_STAGES = STAGE_LIST.map((s) => s.id)

export default function CertificateActions() {
  const { name, level, xp, avatar, activeStage, stageProgress } = useProgress()
  const [busy, setBusy] = useState(false)
  const rank = rankForLevel(level)

  // Is every stage finished? (currentLessonIndex >= 8 for all five.)
  const raw = stageProgress ?? {}
  const allDone = ALL_STAGES.every((s) => (raw[s]?.currentLessonIndex ?? 0) >= 8)

  async function png(stageId) {
    setBusy(true)
    try {
      await downloadCertificatePNG({ stageId, name, rank, xp, avatar })
    } finally {
      setBusy(false)
    }
  }

  function pdf(stageId) {
    printCertificatePDF({ stageId, name, rank, xp, avatar })
  }

  return (
    <section className="space-y-3 rounded-xl border border-cue-dim bg-cue/5 p-4">
      <div>
        <p className="font-display text-lg font-semibold text-cue">
          Your certificate is ready
        </p>
        <p className="text-sm text-muted">
          Save it, print it, or share it — it carries your name and rank.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => png(activeStage)}
          disabled={busy}
          className="rounded-lg bg-cue px-4 py-2 text-sm font-medium text-stage transition-colors hover:bg-cue-bright disabled:opacity-60"
        >
          {busy ? 'Preparing…' : '⬇ Download PNG'}
        </button>
        <button
          onClick={() => pdf(activeStage)}
          className="rounded-lg border border-cue-dim px-4 py-2 text-sm text-cue transition-colors hover:bg-cue/10"
        >
          🖨 Print / Save PDF
        </button>
      </div>

      {allDone && (
        <div className="border-t border-cue-dim/50 pt-3">
          <p className="mb-2 text-sm text-ink">
            You've finished every stage — claim the master certificate:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => png('all')}
              disabled={busy}
              className="rounded-lg bg-cue px-4 py-2 text-sm font-medium text-stage transition-colors hover:bg-cue-bright disabled:opacity-60"
            >
              ⬇ Master PNG
            </button>
            <button
              onClick={() => pdf('all')}
              className="rounded-lg border border-cue-dim px-4 py-2 text-sm text-cue transition-colors hover:bg-cue/10"
            >
              🖨 Master PDF
            </button>
          </div>
        </div>
      )}
    </section>
  )
}