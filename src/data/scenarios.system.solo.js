// src/data/scenarios.system.solo.js
// v6 — SYSTEM PROMPT / AGENT INSTRUCTIONS solo scenarios: 8x3. The assessed
// tier. Real system-prompt asks; personas = student, everyday user,
// professional. Teaches writing the persistent instruction that governs an AI.
// AI-assisted drafting, hand-curated. Indian-everyday framing where natural.

export const SOLO_SYSTEM = {
  // L1 — set the identity
  l1: {
    student: { scenario: "You are building a study bot for your class project, but with no stated identity it answers like a generic chatbot with no consistent character.", task: 'Write a system prompt that opens with a clear identity.', hints: ['Who is it?', 'What does it do?'] },
    everyday: { scenario: "Your shop assistant bot has no stated role, so it does not sound like it belongs to your store.", task: 'Write a system prompt that gives the assistant a clear identity.', hints: ['Whose bot is it?', 'For what?'] },
    professional: { scenario: "Your support agent has no defined role, so its personality wanders from reply to reply.", task: 'Write a system prompt that establishes the agent role up front.', hints: ['What role?', 'For which company?'] },
  },
  // L2 — set the scope
  l2: {
    student: { scenario: "Your homework helper cheerfully answers about anything, drifting far from actual schoolwork.", task: 'Write a system prompt that pins the bot to its subject scope.', hints: ['Which subjects?', 'What is out of bounds?'] },
    everyday: { scenario: "Your shop bot tries to answer about weather and cricket, well outside what it should cover.", task: 'Write a system prompt that limits the bot to store topics.', hints: ['What does it cover?', 'What does it not?'] },
    professional: { scenario: "Your billing assistant keeps wading into technical bug reports it is not meant to handle.", task: 'Write a system prompt that scopes the agent to its domain.', hints: ['Its actual job?', 'Where to redirect?'] },
  },
  // L3 — set the boundaries
  l3: {
    student: { scenario: "Your study bot just hands over final answers, which defeats the point of learning.", task: 'Write a system prompt with a firm rule against giving direct answers.', hints: ['Never do what?', 'Do what instead?'] },
    everyday: { scenario: "Your shop bot makes up prices when unsure and risks sharing private details, misleading customers.", task: 'Write a system prompt with hard rules against guessing or sharing private data.', hints: ['Never guess what?', 'Never reveal what?'] },
    professional: { scenario: "Your agent reveals internal policy details when a user pushes, which it must never do.", task: 'Write a system prompt with clear boundaries and refusal rules.', hints: ['What is off-limits?', 'How to refuse?'] },
  },
  // L4 — set the style
  l4: {
    student: { scenario: "Your bot swings between terse and rambling, so students never know what to expect.", task: 'Write a system prompt that fixes a consistent, encouraging style.', hints: ['What tone?', 'How long?'] },
    everyday: { scenario: "Your shop assistant sounds cold one moment and chatty the next, off-brand for your friendly store.", task: 'Write a system prompt that sets a consistent, warm tone and language.', hints: ['What tone?', 'Which language?'] },
    professional: { scenario: "Your agent varies wildly in formality, sometimes too casual for customers.", task: 'Write a system prompt that fixes a professional, consistent style.', hints: ['How formal?', 'What format?'] },
  },
  // L5 — make rules concrete
  l5: {
    student: { scenario: "Your rule to 'be helpful with maths' is too vague, so the bot still just solves everything for the student.", task: 'Write a system prompt with a concrete if-then rule for a maths request.', hints: ['When X happens...', '...do exactly what?'] },
    everyday: { scenario: "Telling the bot to 'be careful with stock questions' is fuzzy, so it keeps guessing.", task: 'Write a system prompt with a specific rule for when it is unsure.', hints: ['If unsure...', '...then do what?'] },
    professional: { scenario: "Your instruction to 'handle bugs well' leaves the agent improvising inconsistently.", task: 'Write a system prompt with an explicit do-this-when rule for bug reports.', hints: ['When a bug is reported...', '...always do what?'] },
  },
  // L6 — shape the persona
  l6: {
    student: { scenario: "Your bot is correct but cold, and students find it discouraging to use.", task: 'Write a system prompt that gives it a patient, encouraging persona.', hints: ['What character?', 'What does it value?'] },
    everyday: { scenario: "Your shop bot is accurate but personality-less, missing the warmth of your store.", task: 'Write a system prompt that gives it a cheerful, on-brand character.', hints: ['What personality?', 'What habit?'] },
    professional: { scenario: "Your agent is competent but sometimes reads as blaming the user for problems.", task: 'Write a system prompt that defines a calm persona that never blames the user.', hints: ['What demeanor?', 'What to avoid?'] },
  },
  // L7 — iterate the rules
  l7: {
    student: { scenario: "Despite your rule, the bot still gives answers when a student asks a few times in a row.", task: 'Write a follow-up that strengthens the no-direct-answers boundary.', hints: ['Make it firmer.', 'Hold under pressure.'] },
    everyday: { scenario: "The bot keeps answering off-topic questions despite the scope you set.", task: 'Write a follow-up that reinforces the scope and adds a redirect rule.', hints: ['Restate the limit.', 'Redirect how?'] },
    professional: { scenario: "The agent revealed internal information when the user insisted repeatedly.", task: 'Write a follow-up that closes the boundary so it holds even under pressure.', hints: ['Tighten the rule.', 'Even if insisted?'] },
  },
  // L8 — keep it tight
  l8: {
    student: { scenario: "Your system prompt has grown long and repetitive; you want it complete but lean.", task: 'Write a tight system prompt: identity, scope, one boundary, and style.', hints: ['All four, briefly.', 'Cut repetition.'] },
    everyday: { scenario: "You are setting up the shop bot quickly and want everything essential in a short block.", task: 'Write a compact system prompt with identity, scope, a boundary, and tone.', hints: ['Short but whole.', 'Nothing essential missing.'] },
    professional: { scenario: "A senior system prompt is durable and minimal, not a sprawling document.", task: 'Write an economical system prompt: identity, scope, boundary, and a refusal rule.', hints: ['Lean and durable.', 'No sprawl.'] },
  },
}