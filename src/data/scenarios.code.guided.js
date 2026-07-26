// src/data/scenarios.code.guided.js
// v3-5c — CODE STAGE guided tier: 8×3. Skeleton carries code-prompt
// structure (goal → context/stack → interface → edge cases → output).
// Any sane fill yields a decent prompt. AI-assisted, hand-curated.

export const GUIDED_CODE = {
  l1: {
    student: { scenario: "State the goal before any detail — 'write code for arrays' gives noise.", task: 'Fill in the outcome.',
      skeleton: [{text:'Write a function that '},{blank:'what it takes',hint:'takes a list of integers'},{text:' and '},{blank:'what it returns',hint:'returns the largest difference between any two'},{text:'. '},{blank:'one detail',hint:'the smaller must come before the larger'},{text:'.'}] },
    everyday: { scenario: "The photo-rename script needs a stated goal.", task: 'Fill in what it must do.',
      skeleton: [{text:'Write a script that '},{blank:'the action',hint:'renames all .jpg files in a folder'},{text:' '},{blank:'the rule',hint:'to their creation date, like 2024-06-01.jpg'},{text:', '},{blank:'a detail',hint:'keeping the original if a name clashes'},{text:'.'}] },
    professional: { scenario: "Lead with the outcome so the assistant knows the target.", task: 'Fill in the goal.',
      skeleton: [{text:'Write a helper that '},{blank:'the goal',hint:'debounces a callback'},{text:', so that '},{blank:'the purpose',hint:'it only fires after typing stops'},{text:'. '},{blank:'a detail',hint:'configurable delay in milliseconds'},{text:'.'}] },
  },
  l2: {
    student: { scenario: "Name the stack or you get React answers for plain JS.", task: 'Fill in the environment.',
      skeleton: [{text:'In '},{blank:'language and version',hint:'plain JavaScript (ES2022), no framework'},{text:', '},{blank:'the task',hint:'toggle a class on a button click'},{text:'. '},{blank:'a constraint',hint:'no external libraries'},{text:'.'}] },
    everyday: { scenario: "Old Python on a Pi — say so, or libraries won't install.", task: 'Fill in the constraints.',
      skeleton: [{text:'In '},{blank:'environment',hint:'Python 3.7 on a Raspberry Pi'},{text:', '},{blank:'the task',hint:'read a temperature sensor every minute'},{text:', '},{blank:'a limit',hint:'standard library only'},{text:'.'}] },
    professional: { scenario: "Pin the stack and the no-new-deps rule.", task: 'Fill in the stack.',
      skeleton: [{text:'In a '},{blank:'stack',hint:'React 19 + Tailwind v4 (no config)'},{text:' app, '},{blank:'the task',hint:'add a copy-to-clipboard button'},{text:'. '},{blank:'a rule',hint:'no new dependencies'},{text:'.'}] },
  },
  l3: {
    student: { scenario: "The autograder calls a specific signature.", task: 'Fill in the interface.',
      skeleton: [{text:'A function '},{blank:'name and params',hint:'is_palindrome(s: str)'},{text:' that returns '},{blank:'return',hint:'a bool'},{text:', where '},{blank:'behaviour',hint:'case and spaces are ignored'},{text:'.'}] },
    everyday: { scenario: "Fix the name, inputs, and output so it fits together.", task: 'Fill in the contract.',
      skeleton: [{text:'A function '},{blank:'name and input',hint:'to_celsius(fahrenheit: float)'},{text:' returning '},{blank:'output',hint:'a float rounded to 1 decimal'},{text:'. '},{blank:'a detail',hint:'handle negative values'},{text:'.'}] },
    professional: { scenario: "It must slot into an existing module.", task: 'Fill in the precise signature.',
      skeleton: [{text:'A function '},{blank:'signature',hint:'group_by(items: list, key: str) -> dict'},{text:' that '},{blank:'behaviour',hint:'groups items into lists keyed by that field'},{text:', '},{blank:'edge',hint:'skipping items missing the key'},{text:'.'}] },
  },
  l4: {
    student: { scenario: "Hidden tests throw empties and duplicates.", task: 'Fill in the edge cases.',
      skeleton: [{text:'Write a function to '},{blank:'the task',hint:'find the average of a list'},{text:', handling '},{blank:'edge 1',hint:'an empty list (return 0)'},{text:' and '},{blank:'edge 2',hint:'non-number values (skip them)'},{text:'.'}] },
    everyday: { scenario: "The script crashes on empty files and odd names.", task: 'Fill in what to guard.',
      skeleton: [{text:'Write a script to '},{blank:'the task',hint:'read a CSV of expenses'},{text:', handling '},{blank:'edge 1',hint:'an empty file'},{text:', '},{blank:'edge 2',hint:'missing columns'},{text:', by '},{blank:'how',hint:'skipping and logging a warning'},{text:'.'}] },
    professional: { scenario: "Production sends nulls, dupes, oversized payloads.", task: 'Fill in the edge cases.',
      skeleton: [{text:'A handler that '},{blank:'the task',hint:'validates an incoming order'},{text:', handling '},{blank:'edge 1',hint:'null fields'},{text:', '},{blank:'edge 2',hint:'duplicate order IDs'},{text:', '},{blank:'edge 3',hint:'payloads over 1MB'},{text:'.'}] },
  },
  l5: {
    student: { scenario: "Words keep failing — show an example.", task: 'Fill in an input and output.',
      skeleton: [{text:'Write a function to '},{blank:'the task',hint:'convert snake_case to camelCase'},{text:': input '},{blank:'example input',hint:'"user_first_name"'},{text:' should return '},{blank:'expected output',hint:'"userFirstName"'},{text:'.'}] },
    everyday: { scenario: "Show the exact date reformat.", task: 'Fill in the example.',
      skeleton: [{text:'Reformat dates: input '},{blank:'input',hint:'"01/06/2024"'},{text:' should return '},{blank:'output',hint:'"1 June 2024"'},{text:'. '},{blank:'a detail',hint:'assume DD/MM/YYYY input'},{text:'.'}] },
    professional: { scenario: "The tricky parsing case needs an example.", task: 'Fill in the worked case.',
      skeleton: [{text:'Parse tags from a string: input '},{blank:'input',hint:'"#one #two done"'},{text:' should return '},{blank:'output',hint:'["one", "two"]'},{text:', '},{blank:'edge',hint:'ignoring text after the last tag'},{text:'.'}] },
  },
  l6: {
    student: { scenario: "Course wants stdlib-only, typed.", task: 'Fill in the rules.',
      skeleton: [{text:'Write '},{blank:'the thing',hint:'a function to count word frequency'},{text:' in '},{blank:'stack rules',hint:'Python 3, standard library only'},{text:', with '},{blank:'style',hint:'full type hints and a docstring'},{text:', '},{blank:'avoid',hint:'no external packages'},{text:'.'}] },
    everyday: { scenario: "You want readable, commented, simple code.", task: 'Fill in the style.',
      skeleton: [{text:'Write '},{blank:'the thing',hint:'a script to back up a folder'},{text:' in '},{blank:'language',hint:'Python 3'},{text:', '},{blank:'style',hint:'simple and heavily commented'},{text:', '},{blank:'avoid',hint:'no clever one-liners'},{text:'.'}] },
    professional: { scenario: "Repo enforces linter + no new deps.", task: 'Fill in the conventions.',
      skeleton: [{text:'Write '},{blank:'the thing',hint:'a rate-limiter utility'},{text:' in '},{blank:'stack',hint:'TypeScript, strict mode'},{text:', following '},{blank:'style',hint:'ESLint airbnb config'},{text:', '},{blank:'deps',hint:'no new dependencies'},{text:'.'}] },
  },
  l7: {
    student: { scenario: "Paste the real error, not 'it broke'.", task: 'Fill in error and expectation.',
      skeleton: [{text:'This code raises '},{blank:'the error',hint:'IndexError on line 8'},{text:' when '},{blank:'the trigger',hint:'the list is empty'},{text:'; it should '},{blank:'expected',hint:'return None instead'},{text:'. Keep '},{blank:'what to keep',hint:'the rest of the logic'},{text:'.'}] },
    everyday: { scenario: "Say what input triggers the crash.", task: 'Fill in the failure details.',
      skeleton: [{text:'The script fails with '},{blank:'the error',hint:'a UnicodeDecodeError'},{text:' on '},{blank:'the input',hint:'files with emoji in the name'},{text:'; it should '},{blank:'expected',hint:'handle them, not crash'},{text:'.'}] },
    professional: { scenario: "Targeted fix, not a rewrite.", task: 'Fill in the error, trigger, and desired behaviour.',
      skeleton: [{text:'This raises '},{blank:'the error',hint:'a TimeoutError'},{text:' when '},{blank:'the condition',hint:'the API takes over 5s'},{text:'; it should '},{blank:'expected',hint:'retry twice then return a default'},{text:', '},{blank:'keep',hint:'without changing the signature'},{text:'.'}] },
  },
  l8: {
    student: { scenario: "One function, not a program.", task: 'Fill in a single focused unit.',
      skeleton: [{text:'Write just the function '},{blank:'name and signature',hint:'is_prime(n: int) -> bool'},{text:', '},{blank:'one rule',hint:'efficient for n up to a million'},{text:', with '},{blank:'proof',hint:'three test cases'},{text:'. Nothing else.'}] },
    everyday: { scenario: "The minimum useful piece.", task: 'Fill in one unit.',
      skeleton: [{text:'Write just '},{blank:'the one thing',hint:'a function to validate a PIN'},{text:', '},{blank:'the rule',hint:'exactly 4 digits, numeric only'},{text:', returning '},{blank:'output',hint:'true or false'},{text:'. No UI, no extras.'}] },
    professional: { scenario: "One function, fully specified.", task: 'Fill in a scoped unit.',
      skeleton: [{text:'Write only '},{blank:'signature',hint:'slugify(title: str) -> str'},{text:', '},{blank:'the rule',hint:'lowercase, spaces to hyphens, strip punctuation'},{text:', '},{blank:'stack',hint:'standard library only'},{text:', with '},{blank:'tests',hint:'two examples'},{text:'.'}] },
  },
}