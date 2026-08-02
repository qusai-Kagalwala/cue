// src/data/scenarios.agent.guided.js
// v5 — AGENT STAGE guided tier: 8×3. Skeleton carries agent-brief structure
// (goal → codebase context → guardrails → output shape → acceptance → scope).
// Teaches how to BRIEF a coding agent (Claude Code, Cursor, Copilot) that
// edits real files with little oversight. Any sane fill yields a decent brief.
// AI-assisted, hand-curated. Indian-everyday framing kept where natural.

export const GUIDED_AGENT = {
  // L1 — Be specific: state the task before any detail.
  l1: {
    student: { scenario: "Telling an agent 'fix my project' gives chaos. Name the one task.", task: 'Fill in the exact task.',
      skeleton: [{ text: 'Ask the agent to ' }, { blank: 'the task', hint: 'add a search bar to the notes list' }, { text: ' so that ' }, { blank: 'the outcome', hint: 'typing filters notes live' }, { text: '. ' }, { blank: 'one detail', hint: 'match on title and body' }, { text: '.' }] },
    everyday: { scenario: "Your shop's billing script needs one clear change, not 'improve it'.", task: 'Fill in the single task.',
      skeleton: [{ text: 'Ask the agent to ' }, { blank: 'the task', hint: 'add a GST column to the invoice' }, { text: ', so that ' }, { blank: 'the purpose', hint: 'each item shows tax separately' }, { text: '. ' }, { blank: 'a detail', hint: 'GST is 18% of the item price' }, { text: '.' }] },
    professional: { scenario: "Lead with the outcome so the agent knows the target.", task: 'Fill in the goal.',
      skeleton: [{ text: 'Have the agent ' }, { blank: 'the task', hint: 'add rate limiting to the login route' }, { text: ', so that ' }, { blank: 'the outcome', hint: 'repeated failed logins are throttled' }, { text: '. ' }, { blank: 'a detail', hint: 'max 5 attempts per minute per IP' }, { text: '.' }] },
  },
  // L2 — Give context: the codebase facts the agent needs.
  l2: {
    student: { scenario: "Without the stack, the agent guesses React when you're on plain HTML.", task: 'Fill in the environment.',
      skeleton: [{ text: 'My project is ' }, { blank: 'stack', hint: 'plain HTML/CSS/JS, no framework' }, { text: '. The relevant file is ' }, { blank: 'the file', hint: 'index.html' }, { text: '. ' }, { blank: 'the task', hint: 'add a dark-mode toggle' }, { text: '.' }] },
    everyday: { scenario: "The agent needs to know it's old Python on a college PC.", task: 'Fill in the context.',
      skeleton: [{ text: 'My code runs on ' }, { blank: 'environment', hint: 'Python 3.7, no internet on the lab PCs' }, { text: '. The file ' }, { blank: 'the file', hint: 'attendance.py' }, { text: ' does ' }, { blank: 'what it does', hint: 'reads a CSV of student names' }, { text: '. ' }, { blank: 'the task', hint: 'add a total-present count' }, { text: '.' }] },
    professional: { scenario: "Pin the stack and the file so the agent edits the right place.", task: 'Fill in the codebase context.',
      skeleton: [{ text: 'In our ' }, { blank: 'stack', hint: 'Next.js 14 + TypeScript app' }, { text: ', the file ' }, { blank: 'path', hint: 'lib/auth/session.ts' }, { text: ' handles ' }, { blank: 'what', hint: 'session validation' }, { text: '. ' }, { blank: 'the task', hint: 'add a 30-minute idle timeout' }, { text: '.' }] },
  },
  // L3 — Output shape: what form the agent's result should take.
  l3: {
    student: { scenario: "Say whether you want the whole file or just the change.", task: 'Fill in the output shape.',
      skeleton: [{ text: 'Make the change and ' }, { blank: 'output shape', hint: 'show me only the lines that changed' }, { text: ', with ' }, { blank: 'extra', hint: 'a one-line note on what each does' }, { text: '. ' }, { blank: 'task', hint: 'add input validation to the form' }, { text: '.' }] },
    everyday: { scenario: "You want a diff you can paste back, not a rewritten file.", task: 'Fill in what to return.',
      skeleton: [{ text: 'Return ' }, { blank: 'output', hint: 'a diff, not the full file' }, { text: ', and ' }, { blank: 'also', hint: 'list any files you touched' }, { text: '. Task: ' }, { blank: 'task', hint: 'fix the date format in the receipt' }, { text: '.' }] },
    professional: { scenario: "Specify the deliverable: diff, tests, and a PR summary.", task: 'Fill in the output shape.',
      skeleton: [{ text: 'Deliver ' }, { blank: 'output shape', hint: 'a diff plus unit tests' }, { text: ' and ' }, { blank: 'plus', hint: 'a short PR description' }, { text: '. Task: ' }, { blank: 'task', hint: 'extract the pricing logic into its own module' }, { text: '.' }] },
  },
  // L4 — Set guardrails: the agentic core. What NOT to touch, when to stop.
  l4: {
    student: { scenario: "An agent can rewrite your whole file — fence it in.", task: 'Fill in the guardrails.',
      skeleton: [{ text: 'Do the task but ' }, { blank: 'guardrail 1', hint: "don't change anything outside the login function" }, { text: ' and ' }, { blank: 'guardrail 2', hint: 'no new libraries' }, { text: '. Task: ' }, { blank: 'task', hint: 'add a show-password toggle' }, { text: '.' }] },
    everyday: { scenario: "Protect the working parts of the billing script.", task: 'Fill in the limits.',
      skeleton: [{ text: 'Change only ' }, { blank: 'scope', hint: 'the total-calculation part' }, { text: ', ' }, { blank: 'guardrail', hint: "don't touch the print/receipt code" }, { text: ', and ' }, { blank: 'stop rule', hint: 'stop and ask if it affects other files' }, { text: '.' }] },
    professional: { scenario: "An autonomous agent needs firm boundaries and a stop condition.", task: 'Fill in the guardrails.',
      skeleton: [{ text: 'Constraints: ' }, { blank: 'guardrail 1', hint: 'do not change the public API signature' }, { text: ', ' }, { blank: 'guardrail 2', hint: 'no new dependencies' }, { text: ', and ' }, { blank: 'stop rule', hint: 'stop and ask before editing more than 3 files' }, { text: '. Task: refactor the retry logic.' }] },
  },
  // L5 — Provide examples / acceptance criteria: how to know it's right.
  l5: {
    student: { scenario: "Give the agent a concrete pass/fail so it can self-check.", task: 'Fill in an example.',
      skeleton: [{ text: 'Task: ' }, { blank: 'task', hint: 'format phone numbers' }, { text: '. It should pass: input ' }, { blank: 'example input', hint: '"9876543210"' }, { text: ' → output ' }, { blank: 'expected', hint: '"+91 98765 43210"' }, { text: '.' }] },
    everyday: { scenario: "Show the exact before-and-after so the agent hits it.", task: 'Fill in the worked case.',
      skeleton: [{ text: 'Task: ' }, { blank: 'task', hint: 'shorten long product names on the bill' }, { text: '. Example: ' }, { blank: 'input', hint: '"Tata Salt 1kg Pack"' }, { text: ' should become ' }, { blank: 'output', hint: '"Tata Salt 1kg"' }, { text: '.' }] },
    professional: { scenario: "State acceptance criteria the agent can verify against.", task: 'Fill in the acceptance criteria.',
      skeleton: [{ text: 'Task: ' }, { blank: 'task', hint: 'validate the discount code' }, { text: '. Acceptance: ' }, { blank: 'criterion 1', hint: 'rejects expired codes' }, { text: ', ' }, { blank: 'criterion 2', hint: 'is case-insensitive' }, { text: ', ' }, { blank: 'criterion 3', hint: 'returns a clear error message' }, { text: '.' }] },
  },
  // L6 — Assign a role: which agent/expertise it should assume.
  l6: {
    student: { scenario: "Framing the agent's role sets the standard of the work.", task: 'Fill in the role.',
      skeleton: [{ text: 'Act as ' }, { blank: 'role', hint: 'a careful beginner-friendly tutor-coder' }, { text: ' and ' }, { blank: 'task', hint: 'add comments explaining each function' }, { text: ', ' }, { blank: 'style', hint: 'keeping the code simple and readable' }, { text: '.' }] },
    everyday: { scenario: "Tell the agent what kind of coder to be.", task: 'Fill in the persona.',
      skeleton: [{ text: 'Act as ' }, { blank: 'role', hint: 'a practical Python developer' }, { text: ' and ' }, { blank: 'task', hint: 'clean up the messy inventory script' }, { text: ', ' }, { blank: 'priority', hint: 'favouring clarity over cleverness' }, { text: '.' }] },
    professional: { scenario: "Set the expertise so it applies the right rigour.", task: 'Fill in the role.',
      skeleton: [{ text: 'Act as ' }, { blank: 'role', hint: 'a senior security-minded backend engineer' }, { text: ' and ' }, { blank: 'task', hint: 'review and harden the file-upload endpoint' }, { text: ', ' }, { blank: 'focus', hint: 'flagging injection and size risks' }, { text: '.' }] },
  },
  // L7 — Iterate & refine: guiding a second pass on the agent's work.
  l7: {
    student: { scenario: "The agent's first try worked but ignored a rule — refine it.", task: 'Fill in the correction.',
      skeleton: [{ text: 'Good, but ' }, { blank: 'what was wrong', hint: 'it added a library I said not to' }, { text: '. Redo it ' }, { blank: 'the fix', hint: 'using only built-in functions' }, { text: ', ' }, { blank: 'keep', hint: 'keeping the rest as is' }, { text: '.' }] },
    everyday: { scenario: "It changed too much — narrow the next pass.", task: 'Fill in the redirection.',
      skeleton: [{ text: 'That ' }, { blank: 'the issue', hint: 'also rewrote the print section I liked' }, { text: '. This time ' }, { blank: 'the ask', hint: 'only touch the total calculation' }, { text: ' and ' }, { blank: 'preserve', hint: 'leave the receipt layout untouched' }, { text: '.' }] },
    professional: { scenario: "First pass passed tests but missed an edge — iterate precisely.", task: 'Fill in the refinement.',
      skeleton: [{ text: 'The change works but ' }, { blank: 'the gap', hint: 'fails on empty input' }, { text: '. Add handling for ' }, { blank: 'the case', hint: 'empty and null payloads' }, { text: ', ' }, { blank: 'constraint', hint: 'without altering the passing tests' }, { text: '.' }] },
  },
  // L8 — Prompt economy: one tight, scoped brief (token budget).
  l8: {
    student: { scenario: "Pack a full brief into one tight instruction — no rambling.", task: 'Fill in a lean, complete brief.',
      skeleton: [{ text: 'In ' }, { blank: 'stack', hint: 'plain JS' }, { text: ', ' }, { blank: 'task', hint: 'validate the email field' }, { text: ' — ' }, { blank: 'criteria', hint: 'reject blanks and missing @' }, { text: ', ' }, { blank: 'guardrail', hint: "don't touch other fields" }, { text: '.' }] },
    everyday: { scenario: "One message that says everything the agent needs, briefly.", task: 'Fill in the compact brief.',
      skeleton: [{ text: 'In ' }, { blank: 'context', hint: 'the Python billing script' }, { text: ', ' }, { blank: 'task', hint: 'add an 18% GST line' }, { text: '; ' }, { blank: 'acceptance', hint: '₹100 item → ₹18 GST' }, { text: '; ' }, { blank: 'guardrail', hint: 'return a diff only' }, { text: '.' }] },
    professional: { scenario: "A senior brief: complete, scoped, and short.", task: 'Fill in the economical brief.',
      skeleton: [{ text: 'As a ' }, { blank: 'role', hint: 'backend engineer' }, { text: ', in ' }, { blank: 'context', hint: 'orders/validate.ts' }, { text: ', ' }, { blank: 'task', hint: 'add duplicate-ID rejection' }, { text: '; acceptance ' }, { blank: 'criteria', hint: 'dup ID → 409 error' }, { text: '; ' }, { blank: 'guardrail', hint: 'no new deps, diff + test' }, { text: '.' }] },
  },
}