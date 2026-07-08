// api/evaluate.js
// T3.1 proxy + model fallback chain. THE ONLY PLACE THE GEMINI KEY IS USED.
// Chain: flash-lite (primary) → flash (separate free-tier quota bucket).
// Only a 429 falls through to the next model — other failures return
// immediately with a typed code. Response includes which model answered,
// so the UI can show the active mode.

const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash']

// What Gemini must return — enforced via responseSchema, not hope.
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    score: { type: 'INTEGER', description: '0-100 quality score' },
    strengths: { type: 'ARRAY', items: { type: 'STRING' } },
    improvements: { type: 'ARRAY', items: { type: 'STRING' } },
    rewrittenExample: { type: 'STRING' },
    budgetRespected: { type: 'BOOLEAN' },
  },
  required: ['score', 'strengths', 'improvements', 'rewrittenExample', 'budgetRespected'],
}

function buildSystemPrompt({ title, concept, scenario, task, tokenBudget }) {
  return [
    `You are the evaluator inside "Cue", an app teaching people to write clear, economical prompts for AI.`,
    `Current lesson: "${title}". Teaching point: ${concept}`,
    `Scenario given to the learner: ${scenario}`,
    `Their task: ${task}`,
    tokenBudget
      ? `TOKEN BUDGET LESSON: the prompt must be at most ${tokenBudget} estimated tokens (chars/4). If it exceeds the budget, set budgetRespected=false and reduce the score meaningfully; mention it in improvements.`
      : `No token budget applies; always set budgetRespected=true.`,
    ``,
    `Evaluate the learner's prompt (their next message) against this lesson's teaching point.`,
    `Scoring: 0-100. Be encouraging but honest — reserve 90+ for genuinely strong prompts.`,
    `strengths: 1-3 short bullets, specific to what they wrote.`,
    `improvements: 1-3 short bullets, actionable, tied to the lesson concept.`,
    `rewrittenExample: a stronger version of THEIR prompt (keep their intent), under 60 words.`,
    `Write for a learner who may be new to AI: plain language, no jargon.`,
  ].join('\n')
}

// Cheap abuse guards — reject junk before it costs quota.
function validate(body) {
  const { title, concept, scenario, task, userPrompt, tokenBudget } = body ?? {}
  const str = (v, max) => typeof v === 'string' && v.length > 0 && v.length <= max
  if (!str(title, 100)) return 'title'
  if (!str(concept, 600)) return 'concept'
  if (!str(scenario, 1200)) return 'scenario'
  if (!str(task, 600)) return 'task'
  if (!str(userPrompt, 3000) || userPrompt.trim().length === 0) return 'userPrompt'
  if (tokenBudget != null && (!Number.isInteger(tokenBudget) || tokenBudget < 1 || tokenBudget > 500))
    return 'tokenBudget'
  return null
}

function callGemini(model, systemPrompt, userPrompt, signal) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  return fetch(`${url}?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.3,
        maxOutputTokens: 800,
      },
    }),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' })
  }

  const invalidField = validate(req.body)
  if (invalidField) {
    return res.status(400).json({ error: 'BAD_INPUT', field: invalidField })
  }

  const { userPrompt } = req.body
  const systemPrompt = buildSystemPrompt(req.body)

  try {
    // One 15s budget spans the whole chain — the client contract stays honest.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

    let upstream = null
    let servedBy = null
    for (const model of MODELS) {
      upstream = await callGemini(model, systemPrompt, userPrompt, controller.signal)
      if (upstream.status !== 429) {
        servedBy = model
        break // success or a non-quota failure — either way, stop here
      }
      console.warn(`[cue/api] ${model} rate-limited, trying next model`)
    }
    clearTimeout(timeout)

    if (upstream.status === 429) {
      // Every model in the chain is out of quota.
      return res.status(429).json({ error: 'RATE_LIMIT' })
    }
    if (!upstream.ok) {
      console.error('[cue/api] upstream', servedBy, upstream.status, await upstream.text().catch(() => ''))
      return res.status(502).json({ error: 'UPSTREAM' })
    }

    const data = await upstream.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) return res.status(502).json({ error: 'BAD_JSON' })

    let result
    try {
      result = JSON.parse(text)
    } catch {
      return res.status(502).json({ error: 'BAD_JSON' })
    }

    return res.status(200).json({ result, model: servedBy })
  } catch (err) {
    const code = err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK'
    return res.status(504).json({ error: code })
  }
}