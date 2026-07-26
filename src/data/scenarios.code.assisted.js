// src/data/scenarios.code.assisted.js
// v3-5c — CODE STAGE assisted tier: 8×3. Free textarea + live checklist
// (Stack · Goal · Interface · Edge cases · Output shape · Scope).
// One wrinkle each. AI-assisted, hand-curated.

export const ASSISTED_CODE = {
  l1: {
    student: { scenario: "Your assignment is one clear algorithm but you keep prompting by naming the topic ('recursion', 'graphs') and getting unrelated snippets.", task: 'Write a prompt whose first line is the concrete goal.' },
    everyday: { scenario: "You want to automate a repetitive rename-and-sort chore, but 'a file script' is too vague to be useful.", task: 'Write a prompt that states the exact outcome you need.' },
    professional: { scenario: "You are prototyping and every wasted turn costs time — the assistant needs the goal before any specifics.", task: 'Write a prompt that leads with a precise, testable goal.' },
  },
  l2: {
    student: { scenario: "Your submission must be vanilla JS in the browser, but generic answers assume Node or a framework you're not allowed to use.", task: 'Write a prompt that fully pins your environment and its limits.' },
    everyday: { scenario: "Your automation targets a specific old runtime where most modern libraries fail to install.", task: 'Write a prompt naming the runtime and what may not be used.' },
    professional: { scenario: "Your team's stack has hard rules — a specific framework version and a strict no-new-dependencies policy that CI enforces.", task: 'Write a prompt encoding the full stack and its constraints.' },
  },
  l3: {
    student: { scenario: "The grader imports your function by an exact name and signature — get either wrong and every test fails.", task: 'Write a prompt fixing the precise callable contract.' },
    everyday: { scenario: "You are building a small toolkit and want each helper to have a predictable name, inputs, and return shape.", task: 'Write a prompt defining a clean, consistent interface.' },
    professional: { scenario: "The function plugs into existing callers, so its signature and return type are non-negotiable.", task: 'Write a prompt specifying the exact signature and return shape.' },
  },
  l4: {
    student: { scenario: "Your code passes the visible test and fails the hidden ones on empty and boundary inputs.", task: 'Write a prompt naming the edge cases the graders will throw.' },
    everyday: { scenario: "Your script works on tidy files and dies on the messy real ones — blank lines, odd encodings, missing fields.", task: 'Write a prompt listing the real-world inputs to survive.' },
    professional: { scenario: "The service is fine in staging and breaks in production on nulls, duplicates, and race conditions.", task: 'Write a prompt enumerating the production edge cases to handle.' },
  },
  l5: {
    student: { scenario: "Your transformation task is subtle and words keep leaving room for the assistant to guess the format wrong.", task: 'Write a prompt anchored by one exact input-output example.' },
    everyday: { scenario: "You need a very specific output format and a description alone keeps producing near-misses.", task: 'Write a prompt that shows the exact transformation with an example.' },
    professional: { scenario: "The parsing rule has one non-obvious exception that only an example captures cleanly.", task: 'Write a prompt whose example pins the tricky case.' },
  },
  l6: {
    student: { scenario: "Your course bans third-party packages and requires type hints and docstrings — answers keep ignoring both.", task: 'Write a prompt encoding the exact stack rules and style.' },
    everyday: { scenario: "You want code you can learn from — clear, commented, no dense tricks — but you keep getting terse expert code.", task: 'Write a prompt specifying the readability and style you need.' },
    professional: { scenario: "Generated code must pass your linter and match your style guide before it can even be reviewed.", task: 'Write a prompt encoding your linter and convention rules.' },
  },
  l7: {
    student: { scenario: "Your submission errors and 'please fix' makes the assistant rewrite everything, losing the parts that worked.", task: 'Write a prompt with the exact error, the trigger, and what to preserve.' },
    everyday: { scenario: "Your script crashes on some inputs and vague complaints get vague, wrong fixes.", task: 'Write a prompt giving the real failure and the expected behaviour.' },
    professional: { scenario: "A function fails only under specific production conditions; you need a surgical fix that keeps the interface intact.", task: 'Write a prompt with the traceback context and the constraint to not change the signature.' },
  },
  l8: {
    student: { scenario: "You tend to over-ask and get sprawling code; the assignment needs exactly one well-scoped function.", task: 'Write a tightly-scoped prompt for a single function, nothing more.' },
    everyday: { scenario: "Asking for 'a whole tool' gives you code you can't debug — you need just the one piece that matters, fully specified.", task: 'Write a prompt scoped to one clear, testable unit.' },
    professional: { scenario: "Fast iteration means one function per request; a tight complete ask beats a vague big one every time.", task: 'Write a scoped, complete prompt for a single unit within the budget.' },
  },
}