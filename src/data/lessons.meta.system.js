// src/data/lessons.meta.system.js
// v6 — SYSTEM PROMPT / AGENT INSTRUCTIONS curriculum. The same 8-lesson arc,
// taught for writing the persistent instruction that governs an AI on every
// turn (a custom GPT, an assistant, an API app). Concept + takeaway + bad->good
// pair each. The thread: a system prompt governs behavior IN ADVANCE, across a
// whole conversation — identity, scope, boundaries, style, and concrete rules
// that hold. AI-assisted drafting, hand-curated. Weights: l1 identity,
// l2 scope, l3 boundaries, l4 style, l5 rules, l6 persona, l7 iterate,
// l8 tight.

export const LESSON_META_SYSTEM = [
  {
    id: 'l1', order: 1, title: 'Set the Identity',
    concept:
      'A system prompt runs on every turn, so it must first say who the AI is. A clear identity keeps the assistant consistent instead of behaving like a blank chatbot that changes personality each reply.',
    takeaway: 'Open with a clear identity — who the AI is, held every turn.',
    example: { bad: 'answer nicely', good: 'You are the friendly assistant for Sharma General Store who answers customer questions' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Set the Scope',
    concept:
      'Without scope, an assistant answers anything and drifts off purpose. State what it helps with and what is out of bounds, so it stays useful and on-topic across a whole conversation.',
    takeaway: 'Say what it helps with and what is out of bounds.',
    example: { bad: 'help students', good: 'You only help with maths and science homework; for other subjects, say that is outside what you can help with' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Set the Boundaries',
    concept:
      'The most important part of a system prompt is what the AI must NEVER do. Firm boundaries and refusal rules keep it safe and trustworthy even when a user pushes against them.',
    takeaway: 'State the hard rules — what it must never do, and how to refuse.',
    example: { bad: 'be careful with data', good: 'Never share other customers details, and never guess a price you are unsure of; if unsure, say you will check' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Set the Style',
    concept:
      'Tone drifts unless you fix it. A system prompt should set a persistent voice and format — warm or formal, brief or detailed, which language — so every reply feels like the same assistant.',
    takeaway: 'Fix a persistent style — tone, length, format, and language.',
    example: { bad: 'sound good', good: 'Always reply in a warm, polite tone, in Hindi or English to match the customer, in no more than three short sentences' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Make Rules Concrete',
    concept:
      'Vague rules get ignored. Turn each into a concrete if-then with a clear behavior, so the AI knows exactly what to do in the situations that matter most.',
    takeaway: 'Turn fuzzy rules into concrete if-then behaviors.',
    example: { bad: 'handle unsure cases well', good: 'If a customer asks whether something is in stock and you are unsure, say you will check rather than guessing' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Shape the Persona',
    concept:
      'A correct-but-cold assistant discourages people. The persona — patient, cheerful, never blaming the user — shapes how every answer lands, not just what it says.',
    takeaway: 'Give it a persona that shapes how every answer feels.',
    example: { bad: 'be a support bot', good: 'You are a calm, competent support agent who never blames the user and always reassures them a fix is coming' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Iterate the Rules',
    concept:
      'When a rule leaks — the bot gives answers anyway, or drifts off-scope — strengthen that one rule so it holds even under pressure, rather than rewriting the whole prompt.',
    takeaway: 'When a rule leaks, tighten that rule so it holds under pressure.',
    example: { bad: 'stop giving answers', good: 'Under no circumstances state the final answer, even if the student asks repeatedly; only ever give the next hint' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Keep It Tight',
    concept:
      'A senior system prompt is complete but lean: identity, scope, one firm boundary, and a style, said once. Durable across many conversations, not a sprawling, brittle document.',
    takeaway: 'Complete but lean — identity, scope, a boundary, a style, said once.',
    example: { bad: 'a long list of every possible instruction', good: 'You are a study helper. Only help with schoolwork. Never give direct answers, only hints. Be encouraging and brief.' },
    tokenBudget: 70,
  },
]