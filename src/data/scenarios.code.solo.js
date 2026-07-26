// src/data/scenarios.code.solo.js
// v3-5b — CODE STAGE solo scenarios: 8×3. Assessed tier. Real coding
// asks; personas = CS student, hobbyist/everyday coder, working dev.
// AI-assisted drafting, hand-curated.

export const SOLO_CODE = {
  l1: {
    student: { scenario: "Your DSA assignment says 'implement a solution' and you keep prompting 'write code for arrays' — getting random array snippets, none of them your actual problem.", task: 'Write a prompt that states the goal as a clear outcome.', hints: ['What exactly must the code achieve?', 'Input and output in one sentence?'] },
    everyday: { scenario: "You're automating a boring task — renaming photos by date — but 'write a script' gives you generic file code that does the wrong thing.", task: 'Write a prompt stating what the script must accomplish.', hints: ['What is the end result?', 'What does it act on?'] },
    professional: { scenario: "You're prototyping fast and 'write a helper' wastes turns. You need the assistant to know the outcome before the details.", task: 'Write a prompt whose first line is the goal.', hints: ['The outcome in one sentence.', 'What does success look like?'] },
  },
  l2: {
    student: { scenario: "Your web-dev submission is in plain JS, but the assistant keeps giving you React answers because you never said which stack.", task: 'Write a prompt that names your exact stack.', hints: ['Language, version, framework?', 'What are you NOT using?'] },
    everyday: { scenario: "Your automation runs on an old Python on a Raspberry Pi, and the code you get uses libraries that won't install there.", task: 'Write a prompt that states the environment constraints.', hints: ['Which Python, which device?', 'What can and cannot be installed?'] },
    professional: { scenario: "Your team's codebase has strict conventions and no new dependencies allowed, but generic answers keep pulling in npm packages.", task: 'Write a prompt that pins the stack and its constraints.', hints: ['Framework, version, style rules?', 'Dependency policy?'] },
  },
  l3: {
    student: { scenario: "Your assignment must expose a specific function signature the autograder calls — the shape matters as much as the logic.", task: 'Write a prompt defining the exact interface.', hints: ['Function name and parameters?', 'Return type and shape?'] },
    everyday: { scenario: "You want a reusable helper, but each answer names it differently and returns different things, so nothing fits together.", task: 'Write a prompt fixing the name, inputs, and output.', hints: ['What should it be called?', 'What goes in and comes out?'] },
    professional: { scenario: "The function must slot into an existing module with a defined contract — wrong signature and it breaks the callers.", task: 'Write a prompt specifying the precise signature.', hints: ['Exact parameters and types?', 'Exact return shape?'] },
  },
  l4: {
    student: { scenario: "Your submission passes the sample test but fails the hidden ones — the grader is throwing empty inputs and duplicates your code never handled.", task: 'Write a prompt naming the edge cases to handle.', hints: ['What unusual inputs could break it?', 'How should each be handled?'] },
    everyday: { scenario: "Your file script works until it hits an empty file or a weird filename, then crashes mid-run.", task: 'Write a prompt listing the failure cases to guard.', hints: ['What real-world inputs break scripts?', 'Skip, warn, or stop?'] },
    professional: { scenario: "The endpoint works in the demo but production sends nulls, duplicates, and oversized payloads that crash it.", task: 'Write a prompt enumerating the edge cases.', hints: ['What does production actually send?', 'How should each be handled?'] },
  },
  l5: {
    student: { scenario: "Your string-formatting task keeps getting misinterpreted — the assistant guesses the format wrong every time you describe it in words.", task: 'Write a prompt with a concrete input-output example.', hints: ['One exact input?', 'Its exact expected output?'] },
    everyday: { scenario: "You want dates reformatted a specific way, and every description leaves room for the assistant to pick the wrong format.", task: 'Write a prompt showing an example transformation.', hints: ['A sample before?', 'The exact after?'] },
    professional: { scenario: "The parsing rule has an exception that words keep failing to capture — an example would nail it instantly.", task: 'Write a prompt anchored by a worked example.', hints: ['Show the tricky case.', 'Input and output both?'] },
  },
  l6: {
    student: { scenario: "Your course requires standard-library-only solutions with type hints, but the code you get imports third-party packages and skips types.", task: 'Write a prompt setting the stack rules and style.', hints: ['Allowed libraries?', 'Types, comments, style guide?'] },
    everyday: { scenario: "You want readable code you can actually learn from — commented, simple, no clever one-liners — but answers come dense and unexplained.", task: 'Write a prompt specifying the style you need.', hints: ['Comments, simplicity level?', 'What to avoid?'] },
    professional: { scenario: "Your repo enforces a linter and a no-new-deps rule; violations fail CI, so the generated code must conform up front.", task: 'Write a prompt encoding the repo conventions.', hints: ['Linter, style, dependency rules?', 'Types and docstrings?'] },
  },
  l7: {
    student: { scenario: "Your code throws an error on submission and 'it doesn't work, fix it' just makes the assistant rewrite everything, losing your working parts.", task: 'Write a prompt pasting the real error and the expectation.', hints: ['The exact error and line?', 'Expected vs actual behaviour?'] },
    everyday: { scenario: "Your script crashes on certain files and vague complaints get vague fixes that don't address the real cause.", task: 'Write a prompt with the actual failure details.', hints: ['What input triggers it?', 'What should happen instead?'] },
    professional: { scenario: "A function fails intermittently in production; you have the traceback and the conditions but need a targeted fix, not a rewrite.", task: 'Write a prompt giving the error, the trigger, and the desired behaviour.', hints: ['Paste the traceback context.', 'What must stay unchanged?'] },
  },
  l8: {
    student: { scenario: "Your prompt field is short and you tend to over-ask; you need exactly one function for the assignment, not a whole program.", task: 'Write a tightly-scoped prompt for one focused piece.', hints: ['The single thing you need?', 'Cut everything else.'] },
    everyday: { scenario: "You keep asking for 'a whole tool' and getting sprawling code you can't debug. You need just the one part that matters.", task: 'Write a prompt scoped to one clear, testable unit.', hints: ['What is the minimum useful piece?', 'What to leave out?'] },
    professional: { scenario: "Fast iteration means asking for one function at a time. A tight, complete request beats a vague big one every time.", task: 'Write a scoped prompt within the budget for a single unit.', hints: ['One function, fully specified.', 'No scope creep.'] },
  },
}