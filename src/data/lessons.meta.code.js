// src/data/lessons.meta.code.js
// v3-5b — CODE STAGE curriculum. Same 8-lesson arc, taught for coding
// assistants (Copilot, Claude, ChatGPT). Concept + takeaway + bad→good
// pair each. AI-assisted drafting, hand-curated.
// Weights: l1 goal, l2 context, l3 interface, l4 edge cases, l5 example,
// l6 stack, l7 iterate, l8 scope.

export const LESSON_META_CODE = [
  {
    id: 'l1', order: 1, title: 'State the Goal',
    concept:
      'A coding assistant needs to know what you are trying to achieve, not just "write code". State the outcome in one clear sentence before any detail.',
    takeaway: 'Say what the code must DO, as an outcome — not "make a program".',
    example: { bad: 'write code', good: 'Write a function that takes a list of numbers and returns the two that sum to a given target' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Give the Context',
    concept:
      'The same request has ten right answers depending on your stack. Name the language, version, framework, and any existing constraints — the model cannot see your project.',
    takeaway: 'Name the language, version, and framework — the model cannot see your project.',
    example: { bad: 'add dark mode', good: 'In a React 19 app using Tailwind v4 (no config file), add a dark-mode toggle using a data-theme attribute' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Define the Interface',
    concept:
      'Say how the code should be called and what it returns. The function name, its parameters, and its output shape turn a vague request into a precise contract.',
    takeaway: 'Give the signature: name, parameters, and what it returns.',
    example: { bad: 'a function to clean data', good: 'A function clean_rows(rows: list[dict]) -> list[dict] that drops rows missing an "id" and trims whitespace from all string values' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Name the Edge Cases',
    concept:
      'The difference between toy code and real code is the edge cases. Empty inputs, nulls, duplicates, timeouts — name the ones that matter so the model handles them.',
    takeaway: 'List what could go wrong: empty, null, duplicate, too large, malformed.',
    example: { bad: 'parse the file', good: 'Parse the CSV; handle an empty file, missing columns, and rows with extra commas by skipping them and logging a warning' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Show an Example',
    concept:
      'One concrete input-output example removes more ambiguity than a paragraph of description. Show the model exactly what "correct" looks like.',
    takeaway: 'Give one input and its expected output — show, do not just tell.',
    example: { bad: 'format phone numbers nicely', good: 'Format phone numbers: input "9876543210" should return "+91 98765 43210"; handle numbers already starting with +91' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Set the Stack & Style',
    concept:
      'Beyond the language, name the conventions: which libraries are allowed, the style guide, whether you want comments or type hints. This is the role you are casting the code in.',
    takeaway: 'State the rules: allowed libraries, style, comments, types.',
    example: { bad: 'make it clean', good: 'Python 3, standard library only, PEP 8, full type hints and a docstring, no external dependencies' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Iterate on Real Errors',
    concept:
      'When code fails, paste the actual error and what you expected versus what happened. "It doesn\'t work" gives the model nothing; the traceback gives it everything.',
    takeaway: 'Paste the real error and expected-vs-actual — never just "it broke".',
    example: { bad: 'your code is broken, fix it', good: 'This raises "KeyError: email" on line 12 when the user has no email; it should default to an empty string instead' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Scope Discipline',
    concept:
      'Ask for exactly what you need. A prompt that requests one focused function gets clean, correct code; one that asks for "a full app" gets a sprawling mess. Keep it tight.',
    takeaway: 'Ask for one thing well — scope creep in the prompt becomes bugs in the code.',
    example: {
      bad: 'Build me a complete social media app with login, posts, comments, likes, messaging, notifications and an admin panel',
      good: 'Write just the validateEmail(email: str) -> bool function, RFC-5322-lite, standard library only, with three test cases',
    },
    tokenBudget: 60,
  },
]