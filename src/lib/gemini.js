// src/lib/gemini.js
// T3.1 — Thin client for the evaluation proxy. No key, no prompt template —
// just a fetch to our own /api/evaluate and typed errors for T3.2's
// resilience layer to catch. Pure module, no React.

/** Error codes: BAD_INPUT | RATE_LIMIT | TIMEOUT | BAD_JSON | NETWORK | UPSTREAM */
export class EvalError extends Error {
  constructor(code) {
    super(`evaluation failed: ${code}`)
    this.name = 'EvalError'
    this.code = code
  }
}

/**
 * Evaluate the learner's prompt against the current lesson.
 * @param {object} lesson  merged lesson from getLesson/useProgress
 *                         (title, concept, scenario, task, tokenBudget)
 * @param {string} userPrompt
 * @returns {Promise<{score:number, strengths:string[], improvements:string[],
 *                    rewrittenExample:string, budgetRespected:boolean}>}
 * @throws {EvalError}
 */
export async function evaluatePrompt(lesson, userPrompt) {
  let res
  try {
    res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: lesson.title,
        concept: lesson.concept,
        scenario: lesson.scenario,
        task: lesson.task,
        tokenBudget: lesson.tokenBudget ?? null,
        userPrompt,
      }),
    })
  } catch {
    throw new EvalError('NETWORK')
  }

  let body
  try {
    body = await res.json()
  } catch {
    throw new EvalError('BAD_JSON')
  }

  if (!res.ok) {
    throw new EvalError(body?.error ?? 'UPSTREAM')
  }

  const r = body?.result
  // Shape check — the proxy enforces the schema, but the client
  // shouldn't trust the network any more than the XP system trusts scores.
  if (
    !r ||
    typeof r.score !== 'number' ||
    !Array.isArray(r.strengths) ||
    !Array.isArray(r.improvements) ||
    typeof r.rewrittenExample !== 'string' ||
    typeof r.budgetRespected !== 'boolean'
  ) {
    throw new EvalError('BAD_JSON')
  }

  return r
}