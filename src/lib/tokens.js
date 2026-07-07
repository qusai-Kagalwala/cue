// src/lib/tokens.js
// T2.1 — Token estimation. Pure module, no React.
// chars/4 is the standard rough heuristic for English text — good enough
// for teaching prompt economy, and honest about being an estimate
// (the UI says "est. tokens", never "tokens").

/** Rough token estimate: ceil(length / 4). Empty/junk input → 0. */
export function estimateTokens(str) {
  if (typeof str !== 'string' || str.length === 0) return 0
  return Math.ceil(str.length / 4)
}

/**
 * Budget status for the counter UI.
 *   no budget      → 'plain'  (muted count, most lessons)
 *   within budget  → 'within' (amber — you're on stage, in the light)
 *   over budget    → 'over'   (red — Lesson 8 pressure)
 */
export function budgetStatus(tokens, budget) {
  if (budget == null) return 'plain'
  return tokens > budget ? 'over' : 'within'
}