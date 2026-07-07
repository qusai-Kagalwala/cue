// src/components/PromptInput.jsx
// T2.2 — The heart of the app: mono textarea + live token counter + submit.
// Controlled by the parent (Challenge owns the text state).
// Autofocus on desktop only — on mobile it would pop the keyboard over
// the scenario before the learner has read it.

import { useEffect, useRef } from 'react'
import TokenCounter from './TokenCounter'

export const MAX_PROMPT_CHARS = 2000

export default function PromptInput({
  value,
  onChange,
  onSubmit,
  tokenBudget = null,
  disabled = false,
}) {
  const textareaRef = useRef(null)

  // Desktop-only autofocus (zero-friction rule: land and type immediately)
  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      textareaRef.current?.focus()
    }
  }, [])

  const isEmpty = value.trim().length === 0

  function handleKeyDown(e) {
    // Ctrl/Cmd+Enter submits (full shortcut set lands in T2.4)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isEmpty && !disabled) {
      onSubmit()
    }
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

      <div className="flex items-center justify-between pt-1">
        <span className="hidden font-mono text-xs text-faint lg:inline">
          ctrl+enter to submit
        </span>
        <button
          onClick={onSubmit}
          disabled={isEmpty || disabled}
          className="ml-auto rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright disabled:cursor-not-allowed disabled:bg-raised disabled:text-faint"
        >
          Submit
        </button>
      </div>
    </section>
  )
}