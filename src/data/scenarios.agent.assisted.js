// src/data/scenarios.agent.assisted.js
// v5 — AGENT STAGE assisted tier: 8×3. Free textarea + live checklist
// (Agent framed · Codebase given · Guardrails · Output shape · Acceptance ·
// Scope). One wrinkle each. Teaches briefing a coding agent that edits real
// files. AI-assisted, hand-curated. Indian-everyday framing where natural.

export const ASSISTED_AGENT = {
  // L1 — be specific: one clear task, not "improve the project".
  l1: {
    student: { scenario: "You open Claude Code on your class project and type 'make it better' — it starts changing files everywhere and you lose track of what's happening.", task: 'Write a brief whose first line is one concrete task.' },
    everyday: { scenario: "You want the agent to fix one thing in your shop's billing script, but 'clean up the code' sends it rewriting parts that already worked.", task: 'Write a brief that names the single change you want.' },
    professional: { scenario: "You are handing a task to an autonomous agent overnight — a vague goal means you wake up to sprawling, unreviewable changes.", task: 'Write a brief that leads with one precise, testable task.' },
  },
  // L2 — context: the codebase facts the agent needs.
  l2: {
    student: { scenario: "The agent keeps suggesting React components, but your project is a single plain HTML file — it can't see your setup unless you say so.", task: 'Write a brief that states your stack and the exact file to edit.' },
    everyday: { scenario: "Your automation runs on an old Python on the college lab PCs with no internet, so the agent's modern-library suggestions all fail.", task: 'Write a brief naming the runtime, its limits, and the file involved.' },
    professional: { scenario: "The agent needs to edit the right module in a large monorepo, but without the path and conventions it edits the wrong layer.", task: 'Write a brief giving the stack, the file path, and the conventions to follow.' },
  },
  // L3 — output shape: diff vs full file vs PR.
  l3: {
    student: { scenario: "The agent rewrites and reprints your entire file every time, so you can't tell what actually changed.", task: 'Write a brief that asks for only the changed lines, with a note on each.' },
    everyday: { scenario: "You want to review before applying, but the agent keeps overwriting the file directly instead of showing you a diff.", task: 'Write a brief that specifies a diff and a list of touched files.' },
    professional: { scenario: "This change goes through code review, so you need a reviewable deliverable, not a pile of edits.", task: 'Write a brief that asks for a diff, tests, and a short PR description.' },
  },
  // L4 — guardrails: the agentic core (what NOT to touch, when to stop).
  l4: {
    student: { scenario: "Last time the agent 'helpfully' added a whole library and changed files you didn't ask about — you want it fenced in this time.", task: 'Write a brief with firm guardrails on what it may and may not change.' },
    everyday: { scenario: "Your billing script's receipt layout is perfect and you don't want it touched — only the total math needs fixing.", task: 'Write a brief that limits the agent to one part and forbids the rest.' },
    professional: { scenario: "An autonomous agent will run this without you watching, so it must know its boundaries and when to stop and ask.", task: 'Write a brief with hard guardrails (no API changes, no new deps) and a stop condition.' },
  },
  // L5 — acceptance criteria: concrete pass/fail.
  l5: {
    student: { scenario: "You describe the behaviour in words and the agent's version is subtly wrong every time — it needs something to check against.", task: 'Write a brief anchored by one exact input-to-output example.' },
    everyday: { scenario: "The phone-number formatting keeps coming out slightly off because 'format it nicely' means different things.", task: 'Write a brief that shows the exact before and after (e.g. a +91 example).' },
    professional: { scenario: "The validation logic has non-obvious rules that only explicit acceptance criteria pin down.", task: 'Write a brief listing the acceptance criteria the agent must satisfy.' },
  },
  // L6 — role: which agent/expertise it should assume.
  l6: {
    student: { scenario: "You want the agent to teach as it works — clear comments, simple code — but by default it writes terse, clever code you can't follow.", task: 'Write a brief that frames the agent as a beginner-friendly tutor-coder.' },
    everyday: { scenario: "Your inventory script is a mess and you want it cleaned up in a plain, maintainable way, not made more clever.", task: 'Write a brief that sets the agent as a practical developer favouring clarity.' },
    professional: { scenario: "The file-upload endpoint needs a security lens the agent won't apply unless you ask for it.", task: 'Write a brief that casts the agent as a security-minded senior engineer.' },
  },
  // L7 — iterate: guiding a precise second pass.
  l7: {
    student: { scenario: "The agent's first attempt works but broke a rule you gave — you need to redirect it without starting over.", task: 'Write a follow-up brief that names what was wrong and how to redo it.' },
    everyday: { scenario: "The agent's change also touched the part you liked, so the next pass needs to be narrower.", task: 'Write a follow-up brief that narrows the scope and preserves what worked.' },
    professional: { scenario: "The change passed the tests but misses an edge case, and you must fix it without disturbing the passing behaviour.", task: 'Write a follow-up brief that adds the missing case and protects the rest.' },
  },
  // L8 — economy: one tight, complete brief under a token budget.
  l8: {
    student: { scenario: "Your briefs ramble across five messages; you want to say everything the agent needs in one tight instruction.", task: 'Write one lean brief covering stack, task, a check, and a guardrail.' },
    everyday: { scenario: "You're briefing the agent on your phone between customers — it has to be short but complete.", task: 'Write one compact brief with context, task, acceptance, and a guardrail.' },
    professional: { scenario: "Every extra token is context the agent must hold; a senior brief is complete yet minimal.", task: 'Write one economical brief: role, file, task, acceptance, guardrail — no waste.' },
  },
}