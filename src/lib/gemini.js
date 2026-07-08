// src/lib/gemini.js
// T3.1 thin client + T3.2 retry layer + model passthrough for the mode badge.
// evaluatePrompt  = single attempt, throws typed EvalError
// evaluateWithRetry = retries ONCE on transient failures (BAD_JSON/NETWORK).

/** Error codes: BAD_INPUT | RATE_LIMIT | TIMEOUT | BAD_JSON | NETWORK | UPSTREAM */
export class EvalError extends Error {
  constructor(code) {
    super(`evaluation failed: ${code}`)
    this.name = 'EvalError'
    this.code = code
  }
}

const RETRYABLE = new Set(['BAD_JSON', 'NETWORK'])
const RETRY_DELAY_MS = 700

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Single evaluation attempt against our proxy. */
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

  // Which model answered — shown as the mode badge in the results panel.
  return { ...r, model: body.model ?? null }
}

/**
 * T3.2 — evaluate with one retry on transient failures.
 * RATE_LIMIT / TIMEOUT / UPSTREAM / BAD_INPUT are NOT retried:
 * hammering a rate-limited or broken upstream only makes it worse,
 * and bad input won't become good input by asking twice.
 * @throws {EvalError} after the final attempt fails
 */
export async function evaluateWithRetry(lesson, userPrompt) {
  try {
    return await evaluatePrompt(lesson, userPrompt)
  } catch (err) {
    if (err instanceof EvalError && RETRYABLE.has(err.code)) {
      await sleep(RETRY_DELAY_MS)
      return evaluatePrompt(lesson, userPrompt) // second failure propagates
    }
    throw err
  }
}