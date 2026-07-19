// src/components/PromptInput.jsx
// T2.2 — The heart of the app: mono textarea + live token counter + submit.
// Controlled by the parent (Challenge owns the text state).
// Autofocus on desktop only — on mobile it would pop the keyboard over
// the scenario before the learner has read it.
// v2-8 — voice input: Web Speech API mic, en-IN/hi-IN toggle. The button
// simply doesn't exist on unsupported browsers (Firefox etc.) — hidden
// features beat broken ones. Dictation APPENDS to whatever's typed;
// keyboard flow untouched.

import { useEffect, useRef, useState } from 'react'
import TokenCounter from './TokenCounter'

export const MAX_PROMPT_CHARS = 2000

// One constructor reference, resolved once (Chrome ships it prefixed).
const SpeechRecognition =
  typeof window !== 'undefined'
    ? (window.SpeechRecognition ?? window.webkitSpeechRecognition)
    : undefined

const VOICE_LANGS = [
  { code: 'en-IN', label: 'EN' },
  { code: 'hi-IN', label: 'हिं' },
]

export default function PromptInput({
  value,
  onChange,
  onSubmit,
  tokenBudget = null,
  disabled = false,
}) {
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [langIndex, setLangIndex] = useState(0)

  // Desktop-only autofocus (zero-friction rule: land and type immediately)
  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      textareaRef.current?.focus()
    }
  }, [])

  // Stop any live recognition when the component unmounts
  useEffect(() => () => recognitionRef.current?.abort(), [])

  const isEmpty = value.trim().length === 0

  function handleKeyDown(e) {
    // Ctrl/Cmd+Enter submits (full shortcut set lands in T2.4)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isEmpty && !disabled) {
      onSubmit()
    }
  }

  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop()
      return
    }
    const rec = new SpeechRecognition()
    recognitionRef.current = rec
    rec.lang = VOICE_LANGS[langIndex].code
    rec.continuous = false
    rec.interimResults = false

    rec.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript ?? ''
      if (!transcript) return
      // Append with a joining space, respect the char cap
      const joined = (value.trim() ? value.replace(/\s*$/, ' ') : '') + transcript
      onChange(joined.slice(0, MAX_PROMPT_CHARS))
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)

    setListening(true)
    rec.start()
  }

  return (
    <section className="space-y-2">
      <label htmlFor="prompt-input" className="sr-only">
        Write your prompt
      </label>
      <textarea
        id="prompt-input"
        ref={textareaRef}
        rows={6}
        value={value}
        maxLength={MAX_PROMPT_CHARS}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write your prompt here…"
        className="w-full resize-none rounded-xl border border-line bg-raised p-4 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim disabled:opacity-60"
      />

      <TokenCounter text={value} budget={tokenBudget} />

      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="hidden font-mono text-xs text-faint lg:inline">
          ctrl+enter to submit
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* v2-8 — voice controls: rendered ONLY when the API exists */}
          {SpeechRecognition && (
            <>
              <button
                type="button"
                onClick={() => setLangIndex((i) => (i + 1) % VOICE_LANGS.length)}
                disabled={disabled || listening}
                title="Voice language"
                aria-label={`Voice language: ${VOICE_LANGS[langIndex].code}. Tap to switch.`}
                className="rounded-lg border border-line px-2.5 py-2 font-mono text-xs text-muted transition-colors hover:border-cue-dim hover:text-cue disabled:opacity-50"
              >
                {VOICE_LANGS[langIndex].label}
              </button>
              <button
                type="button"
                onClick={toggleVoice}
                disabled={disabled}
                aria-pressed={listening}
                aria-label={listening ? 'Stop dictation' : 'Dictate your prompt'}
                title={listening ? 'Stop dictation' : 'Dictate your prompt'}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors disabled:opacity-50 ${
                  listening
                    ? 'animate-pulse border-over text-over'
                    : 'border-line text-muted hover:border-cue-dim hover:text-cue'
                }`}
              >
                {listening ? '● rec' : '🎤'}
              </button>
            </>
          )}

          <button
            onClick={onSubmit}
            disabled={isEmpty || disabled}
            className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  )
}