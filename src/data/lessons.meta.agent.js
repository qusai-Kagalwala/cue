// src/data/lessons.meta.agent.js
// v5 — AGENT STAGE curriculum. The same 8-lesson arc, taught for briefing a
// coding AGENT (Claude Code, Cursor, Copilot) that edits real files with little
// oversight. Concept + takeaway + bad→good pair each. The agentic difference
// runs through it: guardrails, output shape, acceptance, and scope matter more
// when an autonomous actor runs your brief. AI-assisted drafting, hand-curated.
// Weights: l1 task, l2 context, l3 output, l4 guardrails, l5 acceptance,
// l6 role, l7 iterate, l8 economy.

export const LESSON_META_AGENT = [
  {
    id: 'l1', order: 1, title: 'Name the Task',
    concept:
      'A coding agent can touch your whole project, so a vague "make it better" sends it sprawling. State one concrete task and its outcome before any detail.',
    takeaway: 'Give the agent ONE clear task as an outcome — not "improve the code".',
    example: { bad: 'fix my project', good: 'Add a live search bar to the notes list so typing filters notes by title and body' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Give the Codebase',
    concept:
      'The agent cannot see your repo. Name the language, framework, the exact file or path, and your conventions, or it edits the wrong layer with the wrong assumptions.',
    takeaway: 'Name the stack, the file/path, and the conventions — the agent cannot see your project.',
    example: { bad: 'add a timeout', good: 'In our Next.js 14 + TypeScript app, in lib/auth/session.ts, add a 30-minute idle timeout following the existing error-handling style' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Set the Output Shape',
    concept:
      'Say what the agent should hand back. A diff, a full file, tests, a PR description — naming the deliverable turns "some edits" into something you can review and apply.',
    takeaway: 'Ask for a specific deliverable: a diff, tests, a PR description — not just "edits".',
    example: { bad: 'change the pricing code', good: 'Extract the pricing logic into its own module and return a diff plus unit tests and a short PR description' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Set the Guardrails',
    concept:
      'This is what makes an agent brief different from a code prompt. An autonomous agent acts with little oversight, so fence it: what NOT to touch, no new dependencies, and when to stop and ask.',
    takeaway: 'Fence the agent: what not to touch, no new deps, and when to stop and ask.',
    example: { bad: 'refactor the retry logic', good: 'Refactor the retry logic, but do not change the public signature, add no new dependencies, and stop and ask before editing more than three files' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Give Acceptance Criteria',
    concept:
      'Words leave room to guess. Give the agent concrete pass/fail criteria — an input-to-output example or a checklist — so it can verify its own work against your intent.',
    takeaway: 'State pass/fail criteria the agent can check itself against — an example or a checklist.',
    example: { bad: 'validate the discount code', good: 'Validate the discount code; acceptance: rejects expired codes, is case-insensitive, and returns a clear error message' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Assign the Role',
    concept:
      'Framing the agent\u2019s expertise sets the standard of the work. "A security-minded senior engineer" reviews differently from a default assistant — the role shapes what it notices and protects.',
    takeaway: 'Frame the agent\u2019s expertise so it applies the right rigour and lens.',
    example: { bad: 'check the upload code', good: 'Act as a security-minded senior backend engineer and review the file-upload endpoint, flagging injection and payload-size risks' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Iterate & Refine',
    concept:
      'The agent\u2019s first pass rarely lands perfectly. Guide the next one precisely: name what was wrong, what to change, and what to preserve — don\u2019t restart from scratch.',
    takeaway: 'Refine the agent\u2019s pass: name the gap, the fix, and what to leave untouched.',
    example: { bad: 'that\u2019s wrong, redo it', good: 'The change works but fails on empty input; add handling for empty and null payloads without altering the tests that already pass' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Brief Economy',
    concept:
      'Everything you give the agent is context it must hold. A senior brief is complete yet minimal: role, context, task, acceptance, and a guardrail, said once, tightly.',
    takeaway: 'Say everything the agent needs once, tightly — complete but no waste.',
    example: { bad: 'a long rambling five-message thread', good: 'As a backend engineer, in orders/validate.ts, add duplicate-ID rejection (dup ID \u2192 409); no new deps; return a diff plus a test' },
    tokenBudget: 60,
  },
]