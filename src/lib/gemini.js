// src/lib/gemini.js
// Thin client + retry layer + T-fix-2 cold-start handling.
//
// Timeout: 12s client-side (under the proxy's 15s, so the client's verdict
// always lands first and the code is honest — a TIMEOUT means OUR deadline).
//
// Retry policy (T-fix-2):
//   TIMEOUT / UPSTREAM / NETWORK / BAD_JSON → one retry with backoff.
//     A cold serverless container is a *transient* condition — the first
//     request thaws it, the retry usually succeeds.
//   RATE_LIMIT → instant fallback, NO retry. Quota exhaustion is not
//     transient; hammering it just burns the next bucket.
//   BAD_INPUT → no retry. Bad input doesn't improve by asking twice.

/** Error codes: BAD_INPUT | RATE_LIMIT | TIMEOUT | BAD_JSON | NETWORK | UPSTREAM */
export class EvalError extends Error {
  constructor(code) {
    super(`evaluation failed: ${code}`)
    this.name = 'EvalError'
    this.code = code
  }
}

const CLIENT_TIMEOUT_MS = 12_000
const RETRYABLE = new Set(['TIMEOUT', 'UPSTREAM', 'NETWORK', 'BAD_JSON'])
const RETRY_BACKOFF_MS = 1500

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * T-fix-2 — warm-up ping. Fire-and-forget on app mount: a bare GET thaws
 * the serverless container (it boots, runs the handler, returns 405 —
 * Gemini is never touched, quota cost is zero). By the time the learner
 * finishes reading the scenario and typing, the container is warm and
 * their first real submit doesn't eat the cold start.
 */
export function warmUpProxy() {
  try {
    fetch('/api/evaluate', { method: 'GET' }).catch(() => {})
  } catch {
    /* never let a warm-up failure surface anywhere */
  }
}

/** Single evaluation attempt against our proxy. */
export async function evaluatePrompt(lesson, userPrompt, stageId = 'text') {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS)

  let res
  try {
    res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        title: lesson.title,
        concept: lesson.concept,
        scenario: lesson.scenario,
        task: lesson.task,
        tokenBudget: lesson.tokenBudget ?? null,
        stage: stageId,           // v3-1b — selects the proxy's framing
        userPrompt,
      }),
    })
  } catch (err) {
    throw new EvalError(err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK')
  } finally {
    clearTimeout(timer)
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

  return { ...r, model: body.model ?? null }
}

/**
 * Evaluate with one retry on transient failures (see policy above).
 * @throws {EvalError} after the final attempt fails
 */
export async function evaluateWithRetry(lesson, userPrompt, stageId = 'text') {
  try {
    return await evaluatePrompt(lesson, userPrompt, stageId)
  } catch (err) {
    if (err instanceof EvalError && RETRYABLE.has(err.code)) {
      await sleep(RETRY_BACKOFF_MS)
      return evaluatePrompt(lesson, userPrompt, stageId) // 2nd failure propagates
    }
    throw err
  }
}