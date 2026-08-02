// src/data/scenarios.agent.solo.js
// v5 — AGENT STAGE solo scenarios: 8×3. The assessed tier. Real agent-briefing
// asks; personas = CS student, hobbyist/everyday coder, working dev. Teaches
// briefing a coding agent (Claude Code, Cursor, Copilot) that edits real files.
// AI-assisted drafting, hand-curated. Indian-everyday framing where natural.

export const SOLO_AGENT = {
  // L1 — name the task
  l1: {
    student: { scenario: "You open a coding agent on your class project and type 'make it better' — it starts editing files all over and you lose track of what changed.", task: 'Write a brief that gives the agent one concrete task.', hints: ['What single thing must it do?', 'What is the outcome, in one line?'] },
    everyday: { scenario: "You want the agent to fix one thing in your shop's billing script, but 'clean it up' sends it rewriting parts that already worked fine.", task: 'Write a brief naming the single change you want.', hints: ['One task, not many.', 'What should be true after?'] },
    professional: { scenario: "You're delegating a task to an agent to run while you're away — a vague goal means sprawling, hard-to-review changes when you return.", task: 'Write a brief that leads with one precise, testable task.', hints: ['The task as an outcome.', 'What does done look like?'] },
  },
  // L2 — give the codebase
  l2: {
    student: { scenario: "The agent keeps writing React components, but your project is one plain HTML file — it can't see your setup and guesses wrong.", task: 'Write a brief that states your stack and the exact file to edit.', hints: ['Language, framework, no-framework?', 'Which file?'] },
    everyday: { scenario: "Your attendance script runs on old Python on the college lab PCs with no internet, and the agent's modern-library suggestions won't install.", task: 'Write a brief naming the runtime, its limits, and the file involved.', hints: ['Which Python, which machine?', 'What can\u2019t be installed?'] },
    professional: { scenario: "The agent must edit one module in a large monorepo, but without the path and conventions it changes the wrong layer.", task: 'Write a brief giving the stack, the exact file path, and the conventions to follow.', hints: ['Framework and version?', 'Which file, whose style?'] },
  },
  // L3 — set the output shape
  l3: {
    student: { scenario: "The agent rewrites and reprints your whole file each time, so you can't tell what actually changed.", task: 'Write a brief that asks for only the changed lines, with a note on each.', hints: ['Diff or full file?', 'What explanation do you want?'] },
    everyday: { scenario: "You want to review before applying, but the agent keeps overwriting the file directly instead of showing a diff.", task: 'Write a brief specifying a diff and a list of touched files.', hints: ['Ask for a diff.', 'Which files did it change?'] },
    professional: { scenario: "This change goes through review, so you need a reviewable package, not a pile of raw edits.", task: 'Write a brief asking for a diff, tests, and a short PR description.', hints: ['Name the deliverables.', 'What makes it reviewable?'] },
  },
  // L4 — set the guardrails (the agentic core)
  l4: {
    student: { scenario: "Last time the agent added a whole library you didn't ask for and touched files unrelated to your task.", task: 'Write a brief with firm guardrails on what it may and may not change.', hints: ['What must it NOT touch?', 'New dependencies allowed?'] },
    everyday: { scenario: "Your billing script's receipt layout is exactly how you want it — only the total math needs fixing, nothing else.", task: 'Write a brief that limits the agent to one part and forbids the rest.', hints: ['Change only what?', 'Leave what alone?'] },
    professional: { scenario: "An autonomous agent will run this unattended, so it must know its boundaries and when to stop and check in.", task: 'Write a brief with hard guardrails (no API changes, no new deps) and a stop condition.', hints: ['What\u2019s off-limits?', 'When should it stop and ask?'] },
  },
  // L5 — give acceptance criteria
  l5: {
    student: { scenario: "You describe the behaviour in words and the agent's version is subtly wrong each time — it needs something concrete to check against.", task: 'Write a brief anchored by one exact input-to-output example.', hints: ['One worked example.', 'Input \u2192 expected output?'] },
    everyday: { scenario: "The phone-number formatting keeps coming out slightly off because 'format it nicely' means different things.", task: 'Write a brief showing the exact before and after (e.g. a +91 example).', hints: ['Show a real input.', 'Show the exact result.'] },
    professional: { scenario: "The validation logic has non-obvious rules that only explicit acceptance criteria pin down.", task: 'Write a brief listing the acceptance criteria the agent must satisfy.', hints: ['What must pass?', 'What must be rejected?'] },
  },
  // L6 — assign the role
  l6: {
    student: { scenario: "You want the agent to teach as it works — clear comments, simple code — but it defaults to terse, clever code you can't follow.", task: 'Write a brief framing the agent as a beginner-friendly tutor-coder.', hints: ['What kind of coder?', 'What should it prioritise?'] },
    everyday: { scenario: "Your inventory script is a mess and you want it cleaned up plainly and maintainably, not made more clever.", task: 'Write a brief setting the agent as a practical developer favouring clarity.', hints: ['Name the persona.', 'Clarity over cleverness?'] },
    professional: { scenario: "The file-upload endpoint needs a security lens the agent won't apply unless you ask for it.", task: 'Write a brief casting the agent as a security-minded senior engineer.', hints: ['What expertise?', 'What should it watch for?'] },
  },
  // L7 — iterate & refine
  l7: {
    student: { scenario: "The agent's first attempt works but ignored a rule you gave — you want to redirect it, not start over.", task: 'Write a follow-up brief naming what was wrong and how to redo it.', hints: ['What did it miss?', 'What to keep?'] },
    everyday: { scenario: "The agent's change also touched the part you liked, so the next pass needs to be narrower.", task: 'Write a follow-up brief that narrows the scope and preserves what worked.', hints: ['Only touch what now?', 'Preserve what?'] },
    professional: { scenario: "The change passed the tests but misses an edge case, and you must fix it without disturbing the passing behaviour.", task: 'Write a follow-up brief that adds the missing case and protects the rest.', hints: ['Which case is missing?', 'What must stay untouched?'] },
  },
  // L8 — brief economy (token budget)
  l8: {
    student: { scenario: "Your briefs sprawl across five messages; you want everything the agent needs in one tight instruction.", task: 'Write one lean brief covering stack, task, a check, and a guardrail.', hints: ['Everything, said once.', 'Cut every wasted word.'] },
    everyday: { scenario: "You're briefing the agent on your phone between customers — it has to be short but complete.", task: 'Write one compact brief with context, task, acceptance, and a guardrail.', hints: ['Short but complete.', 'What can\u2019t be dropped?'] },
    professional: { scenario: "Every extra token is context the agent must carry; a senior brief is complete yet minimal.", task: 'Write one economical brief: role, file, task, acceptance, guardrail — no waste.', hints: ['All five, tightly.', 'No filler.'] },
  },
}