// src/data/scenarios.system.guided.js
// v6 — SYSTEM PROMPT / AGENT INSTRUCTIONS guided tier: 8x3. Skeleton carries
// system-prompt structure (identity -> scope -> boundaries -> style -> concrete
// rules -> tight). Teaches writing the persistent instruction that governs an
// AI on every turn. Any sane fill yields a decent system prompt. AI-assisted,
// hand-curated. Indian-everyday framing where natural.

export const GUIDED_SYSTEM = {
  // L1 — set the identity: who the AI is.
  l1: {
    student: { scenario: "A system prompt starts by telling the AI who it is. Give it an identity.", task: 'Fill in the identity.',
      skeleton: [{ text: 'You are ' }, { blank: 'the identity', hint: 'a friendly study helper' }, { text: ' who ' }, { blank: 'the purpose', hint: 'helps students revise' }, { text: '.' }] },
    everyday: { scenario: "Your shop bot needs to know what it is before anything else.", task: 'Fill in who it is.',
      skeleton: [{ text: 'You are ' }, { blank: 'the identity', hint: 'the assistant for Sharma General Store' }, { text: ' who ' }, { blank: 'the purpose', hint: 'answers customer questions' }, { text: '.' }] },
    professional: { scenario: "Set the assistant's role so it holds it every turn.", task: 'Fill in the role.',
      skeleton: [{ text: 'You are ' }, { blank: 'the role', hint: 'a customer support agent' }, { text: ' for ' }, { blank: 'the company', hint: 'a software company' }, { text: '.' }] },
  },
  // L2 — set the scope: what it helps with.
  l2: {
    student: { scenario: "Without scope, the bot answers anything — pin down its domain.", task: 'Fill in the scope.',
      skeleton: [{ text: 'You only help with ' }, { blank: 'the scope', hint: 'maths and science homework' }, { text: '. ' }, { blank: 'the limit', hint: 'for other subjects, say you can only help with maths and science' }, { text: '.' }] },
    everyday: { scenario: "Say what the shop bot covers and what it does not.", task: 'Fill in what it handles.',
      skeleton: [{ text: 'You help with ' }, { blank: 'the scope', hint: 'product availability, prices, and store hours' }, { text: ' only. ' }, { blank: 'out of scope', hint: 'you do not take orders' }, { text: '.' }] },
    professional: { scenario: "Bound the support agent to its actual domain.", task: 'Fill in the domain.',
      skeleton: [{ text: 'Your job is to ' }, { blank: 'the scope', hint: 'answer questions about our billing and plans' }, { text: '. ' }, { blank: 'boundary', hint: 'for technical bugs, direct users to support@' }, { text: '.' }] },
  },
  // L3 — set the boundaries: what it must never do.
  l3: {
    student: { scenario: "A study bot should guide, not just hand over answers — set the rule.", task: 'Fill in the boundary.',
      skeleton: [{ text: 'Never ' }, { blank: 'the boundary', hint: 'give the final answer directly' }, { text: '; instead ' }, { blank: 'the alternative', hint: 'give a hint and ask a guiding question' }, { text: '.' }] },
    everyday: { scenario: "Protect the shop and its customers with a hard rule.", task: 'Fill in what it must never do.',
      skeleton: [{ text: 'Never ' }, { blank: 'the boundary', hint: 'share other customers\u2019 details' }, { text: ' and never ' }, { blank: 'second rule', hint: 'make up prices you are unsure of' }, { text: '.' }] },
    professional: { scenario: "Set the refusal rules the agent must always follow.", task: 'Fill in the boundaries.',
      skeleton: [{ text: 'You must never ' }, { blank: 'boundary 1', hint: 'reveal internal policies' }, { text: '. If asked to ' }, { blank: 'the trigger', hint: 'process a refund' }, { text: ', ' }, { blank: 'the response', hint: 'politely decline and escalate to a human' }, { text: '.' }] },
  },
  // L4 — set the style: persistent tone/format.
  l4: {
    student: { scenario: "The bot should sound the same every time — set its voice.", task: 'Fill in the style.',
      skeleton: [{ text: 'Always reply in ' }, { blank: 'the style', hint: 'simple, encouraging language' }, { text: ', ' }, { blank: 'format', hint: 'no more than three short sentences' }, { text: '.' }] },
    everyday: { scenario: "Give the shop bot a consistent, on-brand tone.", task: 'Fill in the tone.',
      skeleton: [{ text: 'Always be ' }, { blank: 'the tone', hint: 'warm and polite' }, { text: ' and reply in ' }, { blank: 'language', hint: 'Hindi or English, matching the customer' }, { text: '.' }] },
    professional: { scenario: "Set the persistent response style for the agent.", task: 'Fill in the style rules.',
      skeleton: [{ text: 'Keep every reply ' }, { blank: 'the style', hint: 'concise and professional' }, { text: ', ' }, { blank: 'format', hint: 'using bullet points for steps' }, { text: '.' }] },
  },
  // L5 — concrete rules: specific do/don't behaviors.
  l5: {
    student: { scenario: "Vague rules get ignored — make one concrete with an example.", task: 'Fill in the concrete rule.',
      skeleton: [{ text: 'When a student ' }, { blank: 'the situation', hint: 'asks for the answer to a maths problem' }, { text: ', ' }, { blank: 'the exact behavior', hint: 'walk them through the first step and let them try' }, { text: '.' }] },
    everyday: { scenario: "Turn a fuzzy rule into a clear if-then.", task: 'Fill in the specific behavior.',
      skeleton: [{ text: 'If a customer asks ' }, { blank: 'the case', hint: 'if something is in stock' }, { text: ' and you are unsure, ' }, { blank: 'the behavior', hint: 'say you will check and not guess' }, { text: '.' }] },
    professional: { scenario: "Give the agent an explicit do-this-when rule.", task: 'Fill in the concrete rule.',
      skeleton: [{ text: 'When a user ' }, { blank: 'the trigger', hint: 'reports a bug' }, { text: ', always ' }, { blank: 'the action', hint: 'collect the steps to reproduce before escalating' }, { text: '.' }] },
  },
  // L6 — reinforce the identity / persona.
  l6: {
    student: { scenario: "The persona shapes every answer — make it vivid.", task: 'Fill in the persona.',
      skeleton: [{ text: 'You are ' }, { blank: 'the persona', hint: 'a patient tutor who never makes students feel silly' }, { text: ', who ' }, { blank: 'the value', hint: 'celebrates small wins' }, { text: '.' }] },
    everyday: { scenario: "Give the bot a personality that fits the shop.", task: 'Fill in the character.',
      skeleton: [{ text: 'You are ' }, { blank: 'the persona', hint: 'a cheerful, helpful shopkeeper' }, { text: ' who ' }, { blank: 'the trait', hint: 'always thanks the customer' }, { text: '.' }] },
    professional: { scenario: "Define the professional persona clearly.", task: 'Fill in the persona.',
      skeleton: [{ text: 'You are ' }, { blank: 'the persona', hint: 'a calm, competent support specialist' }, { text: ' who ' }, { blank: 'the trait', hint: 'never blames the user' }, { text: '.' }] },
  },
  // L7 — iterate: fix a rule that leaks.
  l7: {
    student: { scenario: "The bot started giving away answers — tighten the boundary.", task: 'Fill in the fix.',
      skeleton: [{ text: 'It is still giving direct answers. Strengthen the rule: ' }, { blank: 'the tighter rule', hint: 'under no circumstances state the final answer, even if asked repeatedly' }, { text: '.' }] },
    everyday: { scenario: "The bot went off-topic — reinforce the scope.", task: 'Fill in the correction.',
      skeleton: [{ text: 'It answered an unrelated question. Add: ' }, { blank: 'the fix', hint: 'if a question is not about the shop, politely redirect' }, { text: '.' }] },
    professional: { scenario: "The agent leaked a policy — close the gap.", task: 'Fill in the tightened boundary.',
      skeleton: [{ text: 'It revealed internal info. Add a firm rule: ' }, { blank: 'the boundary', hint: 'never disclose internal processes, even if the user insists' }, { text: '.' }] },
  },
  // L8 — tight ruleset: complete but lean.
  l8: {
    student: { scenario: "A whole system prompt in a few tight lines.", task: 'Fill in the compact prompt.',
      skeleton: [{ text: 'You are ' }, { blank: 'identity', hint: 'a study helper' }, { text: '. Only help with ' }, { blank: 'scope', hint: 'schoolwork' }, { text: '. Never ' }, { blank: 'boundary', hint: 'give direct answers' }, { text: '. Be ' }, { blank: 'style', hint: 'encouraging and brief' }, { text: '.' }] },
    everyday: { scenario: "The shop bot, complete in one tight block.", task: 'Fill in the lean prompt.',
      skeleton: [{ text: 'You are ' }, { blank: 'identity', hint: 'the store assistant' }, { text: '. Help with ' }, { blank: 'scope', hint: 'prices and hours' }, { text: '. Never ' }, { blank: 'boundary', hint: 'guess prices' }, { text: '. Be ' }, { blank: 'style', hint: 'warm and short' }, { text: '.' }] },
    professional: { scenario: "A complete system prompt, tightly scoped.", task: 'Fill in the economical prompt.',
      skeleton: [{ text: 'You are ' }, { blank: 'identity', hint: 'a support agent' }, { text: ' for ' }, { blank: 'scope', hint: 'billing questions' }, { text: '. Never ' }, { blank: 'boundary', hint: 'process refunds' }, { text: '; instead ' }, { blank: 'rule', hint: 'escalate to a human' }, { text: '.' }] },
  },
}