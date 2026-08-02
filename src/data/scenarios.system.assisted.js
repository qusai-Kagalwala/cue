// src/data/scenarios.system.assisted.js
// v6 — SYSTEM PROMPT / AGENT INSTRUCTIONS assisted tier: 8x3. Free textarea +
// live checklist (Identity set - Scope given - Boundaries set - Style defined -
// Rules concrete - Tight ruleset). One wrinkle each. Teaches writing the
// persistent instruction that governs an AI on every turn. AI-assisted,
// hand-curated. Indian-everyday framing where natural.

export const ASSISTED_SYSTEM = {
  // L1 — set the identity
  l1: {
    student: { scenario: "You build a study bot but never tell it who it is, so it answers like a generic chatbot with no consistent character.", task: 'Write a system prompt that opens with a clear identity.' },
    everyday: { scenario: "Your shop assistant has no stated role, so it does not sound like it belongs to your store at all.", task: 'Write a system prompt that gives the assistant a clear identity.' },
    professional: { scenario: "Your support agent lacks a defined role, so its answers wander in personality from reply to reply.", task: 'Write a system prompt that establishes the agent role up front.' },
  },
  // L2 — set the scope
  l2: {
    student: { scenario: "Your homework helper cheerfully answers questions about anything, drifting far from schoolwork.", task: 'Write a system prompt that pins the bot to its subject scope.' },
    everyday: { scenario: "Your shop bot tries to answer questions about the weather and politics, well outside what it should cover.", task: 'Write a system prompt that limits the bot to store-related topics.' },
    professional: { scenario: "Your billing assistant keeps wading into technical bug reports it is not meant to handle.", task: 'Write a system prompt that scopes the agent to its actual domain.' },
  },
  // L3 — set the boundaries
  l3: {
    student: { scenario: "Your study bot just hands over final answers, which defeats the point of learning.", task: 'Write a system prompt with a firm rule against giving direct answers.' },
    everyday: { scenario: "Your shop bot happily makes up prices when it is unsure, which misleads customers.", task: 'Write a system prompt with hard rules against guessing or sharing private data.' },
    professional: { scenario: "Your agent reveals internal policy details when a user pushes, which it should never do.", task: 'Write a system prompt with clear boundaries and refusal rules.' },
  },
  // L4 — set the style
  l4: {
    student: { scenario: "Your bot swings between terse and rambling, so students never know what to expect.", task: 'Write a system prompt that fixes a consistent, encouraging style.' },
    everyday: { scenario: "Your shop assistant sounds cold one moment and chatty the next, off-brand for your friendly store.", task: 'Write a system prompt that sets a consistent, warm tone and language.' },
    professional: { scenario: "Your agent varies wildly in formality, sometimes too casual for customers.", task: 'Write a system prompt that fixes a professional, consistent response style.' },
  },
  // L5 — concrete rules
  l5: {
    student: { scenario: "Your rule 'be helpful with maths' is too vague, so the bot still just solves everything.", task: 'Write a system prompt with a concrete if-then rule for how it handles a maths request.' },
    everyday: { scenario: "Telling the bot to 'be careful with stock questions' is fuzzy and it keeps guessing.", task: 'Write a system prompt with a specific rule for what to do when it is unsure.' },
    professional: { scenario: "Your general instruction 'handle bugs well' leaves the agent improvising inconsistently.", task: 'Write a system prompt with an explicit do-this-when rule for bug reports.' },
  },
  // L6 — reinforce the persona
  l6: {
    student: { scenario: "Your bot is correct but cold, and students find it discouraging.", task: 'Write a system prompt that gives it a patient, encouraging persona.' },
    everyday: { scenario: "Your shop bot is accurate but personality-less, missing the warmth of your store.", task: 'Write a system prompt that gives it a cheerful, on-brand character.' },
    professional: { scenario: "Your agent is competent but sometimes reads as blaming the user for problems.", task: 'Write a system prompt that defines a calm persona that never blames the user.' },
  },
  // L7 — iterate a leaking rule
  l7: {
    student: { scenario: "Despite your rule, the bot still gives answers when a student asks a few times.", task: 'Write a follow-up that strengthens the no-direct-answers boundary.' },
    everyday: { scenario: "The bot keeps answering off-topic questions despite its scope.", task: 'Write a follow-up that reinforces the scope and adds a redirect rule.' },
    professional: { scenario: "The agent revealed internal information when the user insisted.", task: 'Write a follow-up that closes the boundary so it holds even under pressure.' },
  },
  // L8 — tight ruleset
  l8: {
    student: { scenario: "Your system prompt has grown long and repetitive; you want it complete but lean.", task: 'Write a tight system prompt: identity, scope, one boundary, and style.' },
    everyday: { scenario: "You are setting up the shop bot quickly and want everything essential in a short block.", task: 'Write a compact system prompt with identity, scope, a boundary, and tone.' },
    professional: { scenario: "A senior system prompt is durable and minimal, not a sprawling document.", task: 'Write an economical system prompt: identity, scope, boundary, and a refusal rule.' },
  },
}