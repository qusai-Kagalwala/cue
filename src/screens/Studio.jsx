// src/screens/Studio.jsx
// The Prompt-Drafting Studio — the "I finished the lessons, now help me with a
// REAL thing" mode. Pick a stage, describe what you want to make, optionally
// paste a reference/inspiration, and Cue drafts a strong prompt AND coaches
// you on why it works. A curated per-stage model guide shows which tools fit
// and how to prompt them.
//
// Uses the proxy's `draft` mode (no new backend) and the curated modelGuide
// data file (stays accurate — you maintain it).

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { STAGE_LIST, isStagePlayable } from '../data/stages'
import { guideFor } from '../data/modelGuide'
import { promptGuideFor } from '../data/promptGuide'
import { draftPrompt } from '../lib/gemini'
import { saveToLibrary } from '../lib/storage'
import InlineHint from '../components/InlineHint'

// which stages truly analyse a reference vs. describe-only (honest UX)
const ANALYSES_REFERENCE = { text: true, code: true, image: true }
// stages where uploading an actual image helps (vision)
const ACCEPTS_IMAGE = { image: true }

export default function Studio() {
  // The Studio drafts prompts. The Reading capstone (comprehend) is about
  // reading an AI's answer, not writing a prompt — so it's excluded here.
  const stages = STAGE_LIST.filter(
    (s) => isStagePlayable(s.id) && s.id !== 'comprehend'
  )
  const [stageId, setStageId] = useState('text')
  const [goal, setGoal] = useState('')
  const [reference, setReference] = useState('')
  const [image, setImage] = useState(null) // base64 data URL
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const reduce = useReducedMotion()
  const guide = guideFor(stageId)
  const craft = promptGuideFor(stageId)
  const stageLabel = (stages.find((x) => x.id === stageId)?.label) ?? 'Text'
  const refAnalysed = ANALYSES_REFERENCE[stageId]
  const acceptsImage = ACCEPTS_IMAGE[stageId]

  async function run() {
    if (goal.trim().length < 3) return
    setStatus('loading')
    setResult(null)
    try {
      const r = await draftPrompt({ stageId, goal, reference, image })
      setResult(r)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(result.draftedPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }

  function saveDraft() {
    // Studio drafts have no score; save with a stage-tagged title. The library
    // de-dupes on prompt text, so re-saving is a no-op.
    const ok = saveToLibrary({
      lessonId: `studio:${stageId}`,
      title: `Studio · ${stageLabel}`,
      prompt: result.draftedPrompt,
      score: null,
    })
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1600)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <InlineHint id="studio">
        Bring something you actually want to make. Pick the type, describe it,
        and Cue drafts a strong prompt — and shows you which tool fits and why
        the prompt works.
      </InlineHint>

      <header className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          the studio
        </p>
        <h1 className="font-display text-2xl font-semibold text-cue">
          Draft a prompt
        </h1>
        <p className="text-sm text-muted">
          Describe what you want to create. Cue writes you a strong prompt and
          coaches you on why it works.
        </p>
      </header>

      {/* stage picker */}
      <div className="flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setStageId(s.id)
              setStatus('idle')
              setResult(null)
              setImage(null)
            }}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              stageId === s.id
                ? 'border-cue bg-cue/10 text-cue'
                : 'border-line bg-surface text-muted hover:border-cue-dim'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* goal */}
      <div className="space-y-2">
        <label className="block font-mono text-xs text-faint" htmlFor="goal">
          what do you want to make?
        </label>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          placeholder="e.g. a moody poster for a jazz night at a small cafe"
          className="w-full resize-none rounded-xl border border-line bg-surface p-3 text-sm text-ink outline-none transition-colors focus:border-cue focus:ring-1 focus:ring-cue/30"
        />
      </div>

      {/* image upload — only for the image stage, where Gemini can SEE it */}
      {acceptsImage && (
        <div className="space-y-2">
          <label className="block font-mono text-xs text-faint">
            upload a reference image{' '}
            <span className="text-muted">(optional — Cue will look at it)</span>
          </label>
          {image ? (
            <div className="flex items-center gap-3 rounded-xl border border-cue-dim bg-surface p-3">
              <img
                src={image}
                alt="reference"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="rounded-md border border-line px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-over hover:text-over"
              >
                remove
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-line bg-surface p-4 text-sm text-muted transition-colors hover:border-cue-dim hover:text-cue">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 4 * 1024 * 1024) {
                    // keep uploads small (proxy + base64 overhead)
                    return
                  }
                  const reader = new FileReader()
                  reader.onload = () => setImage(reader.result)
                  reader.readAsDataURL(file)
                }}
              />
              + tap to upload an image (max 4MB)
            </label>
          )}
        </div>
      )}

      {/* reference */}
      <div className="space-y-2">
        <label className="block font-mono text-xs text-faint" htmlFor="ref">
          reference or inspiration{' '}
          <span className="text-muted">
            {refAnalysed
              ? '(optional — paste an example)'
              : '(optional — describe it; this stage can’t read media)'}
          </span>
        </label>
        <textarea
          id="ref"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          rows={2}
          placeholder={
            refAnalysed
              ? 'paste a sample, or describe the style you’re after'
              : 'describe the sound / clip you’re inspired by'
          }
          className="w-full resize-none rounded-xl border border-line bg-surface p-3 text-sm text-ink outline-none transition-colors focus:border-cue focus:ring-1 focus:ring-cue/30"
        />
      </div>

      <motion.button
        onClick={run}
        disabled={status === 'loading' || goal.trim().length < 3}
        whileTap={reduce ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        className="w-full rounded-xl bg-cue px-4 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:opacity-50"
      >
        {status === 'loading' ? 'Drafting…' : 'Draft my prompt'}
      </motion.button>

      {status === 'error' && (
        <p className="rounded-lg border border-over/40 bg-over/5 p-3 text-sm text-over">
          Something went wrong drafting that. Try again in a moment.
        </p>
      )}

      {/* result */}
      {status === 'done' && result && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 rounded-xl border border-cue-dim bg-surface p-4"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                your prompt
              </p>
              <div className="flex gap-2">
                <button
                  onClick={saveDraft}
                  className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-cue-dim hover:text-cue"
                >
                  {saved ? 'saved ✓' : 'save'}
                </button>
                <button
                  onClick={copyDraft}
                  className="rounded-md border border-cue-dim px-2.5 py-1 font-mono text-xs text-cue transition-colors hover:bg-cue/10"
                >
                  {copied ? 'copied ✓' : 'copy'}
                </button>
              </div>
            </div>
            <p className="whitespace-pre-wrap rounded-lg bg-raised p-3 text-sm leading-relaxed text-ink">
              {result.draftedPrompt}
            </p>
          </div>

          {result.why?.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-widest text-cue">
                why it works
              </p>
              <ul className="space-y-1.5">
                {result.why.map((w, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">
                    · {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.tips?.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-widest text-muted">
                try tweaking
              </p>
              <ul className="space-y-1.5">
                {result.tips.map((t, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted">
                    · {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.section>
      )}

      {/* what to craft in this mode */}
      <section className="space-y-3 rounded-xl border border-line bg-surface p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            what to put in your prompt
          </p>
          <p className="text-sm text-muted">{craft.craft}</p>
        </div>
        <ul className="space-y-1.5">
          {craft.include.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="select-none text-cue">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-cue-dim/50 bg-raised/50 p-3">
          <p className="font-mono text-xs uppercase tracking-widest text-cue">example</p>
          <p className="mt-1 text-sm italic text-ink">{craft.example}</p>
        </div>
        <p className="text-xs text-muted">
          <span className="text-faint">Avoid:</span> {craft.avoid}
        </p>
      </section>

      {/* curated model guide for this stage */}
      <section className="space-y-3 rounded-xl border border-line bg-surface p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            which tool & how
          </p>
          <p className="text-sm text-muted">{guide.blurb}</p>
        </div>
        <div className="space-y-3">
          {guide.models.map((m) => (
            <div key={m.name} className="border-l-2 border-cue-dim pl-3">
              <p className="text-sm font-semibold text-ink">{m.name}</p>
              <p className="text-xs text-muted">{m.best}</p>
              <p className="mt-0.5 font-mono text-xs text-faint">→ {m.tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}