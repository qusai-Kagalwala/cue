// api/evaluate.js
// T3.1 — Serverless proxy. THE ONLY PLACE THE GEMINI KEY IS EVER USED.
// Lives outside src/ so Vite never bundles it; Vercel deploys it as a function.
// Client sends lesson fields + the learner's prompt; the system prompt
// template lives HERE, server-side.

const MODEL = 'gemini-2.5-flash'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

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
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

    const upstream = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
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
    clearTimeout(timeout)

    if (upstream.status === 429) return res.status(429).json({ error: 'RATE_LIMIT' })
    if (!upstream.ok) {
      console.error('[cue/api] upstream', upstream.status, await upstream.text().catch(() => ''))
      return res.status(502).json({ error: 'UPSTREAM' })
    }

    const data = await upstream.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) return res.status(502).json({ error: 'BAD_JSON' })

    // Parse server-side so the client always receives clean JSON or a typed error.
    let result
    try {
      result = JSON.parse(text)
    } catch {
      return res.status(502).json({ error: 'BAD_JSON' })
    }

    return res.status(200).json({ result })
  } catch (err) {
    const code = err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK'
    return res.status(504).json({ error: code })
  }
}