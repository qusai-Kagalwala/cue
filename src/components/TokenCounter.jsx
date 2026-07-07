// src/components/TokenCounter.jsx
// T2.1 — Live token estimate shown under the prompt textarea.
// Pure derived UI: receives `text` (and optional `budget`), computes on render.
// No state, no effects — recomputing ceil(len/4) is far cheaper than any
// memoization would be, which is how the "zero lag on long paste" AC is met.

import { estimateTokens, budgetStatus } from '../lib/tokens'

const STATUS_CLASSES = {
  plain: 'text-muted',
  within: 'text-cue',
  over: 'text-over',
}

export default function TokenCounter({ text, budget = null }) {
  const tokens = estimateTokens(text)
  const status = budgetStatus(tokens, budget)

  return (
    <div
      className="flex items-baseline justify-between font-mono text-xs"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-faint">est. tokens</span>

      <span className={STATUS_CLASSES[status]}>
        {budget == null ? (
          tokens
        ) : (
          <>
            {tokens} / {budget}
            {status === 'over' && (
              <span className="ml-1.5 text-over">over budget</span>
            )}
          </>
        )}
      </span>
    </div>
  )
}