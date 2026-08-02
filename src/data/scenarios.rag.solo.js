// src/data/scenarios.rag.solo.js
// v6 — RAG / CONTEXT DESIGN solo scenarios: 8x3. The assessed tier. Real
// context-design asks; personas = student, everyday user, professional.
// Teaches designing the context you feed an AI. AI-assisted drafting,
// hand-curated. Indian-everyday framing where natural.

export const SOLO_RAG = {
  // L1 — frame the task
  l1: {
    student: { scenario: "You paste your biology notes and type 'thoughts?' — the AI just restates them instead of helping you revise.", task: 'Write a prompt that frames a clear task for the notes.', hints: ['What should it DO with them?', 'Summarize, quiz, explain?'] },
    everyday: { scenario: "You forward a long family WhatsApp thread to the AI, but with no instruction it just narrates the conversation back.", task: 'Write a prompt saying exactly what you need from the chat.', hints: ['What are you looking for?', 'One clear task.'] },
    professional: { scenario: "You drop a quarterly report in and ask 'anything useful here?' — the answer is as vague as the question.", task: 'Write a prompt that frames a specific, answerable task.', hints: ['What decision does it serve?', 'What output shape?'] },
  },
  // L2 — give the sources
  l2: {
    student: { scenario: "You ask the AI about 'the reading from today' and it confidently makes something up, because you never pasted the reading.", task: 'Write a prompt that includes the source text to work from.', hints: ['Paste the actual material.', 'It only knows what you give.'] },
    everyday: { scenario: "You describe an email vaguely and ask for a reply, so the reply misses what the email actually said.", task: 'Write a prompt that gives the AI the real message to respond to.', hints: ['Include the message.', 'The exact words help.'] },
    professional: { scenario: "You mention 'our numbers' and expect analysis, but none of the figures are in the prompt.", task: 'Write a prompt that supplies the actual data to reason over.', hints: ['Paste the figures.', 'What are the real values?'] },
  },
  // L3 — cut the noise
  l3: {
    student: { scenario: "You paste an entire chapter to ask about one idea, and the AI buries your answer under the nine other topics.", task: 'Write a prompt that focuses on one part and ignores the rest.', hints: ['What to focus on?', 'What to ignore?'] },
    everyday: { scenario: "A forwarded message is mostly jokes with one useful address buried in it.", task: 'Write a prompt that extracts only the useful part.', hints: ['What is the signal?', 'What is the noise?'] },
    professional: { scenario: "A meeting transcript is an hour of tangents around a single decision.", task: 'Write a prompt that isolates the decision and skips the rest.', hints: ['Focus on what?', 'Skip what?'] },
  },
  // L4 — structure the context
  l4: {
    student: { scenario: "You paste two sets of notes one after another and the AI mixes them up, crediting one source with the others facts.", task: 'Write a prompt that labels and separates each source.', hints: ['Name each source.', 'Keep them apart.'] },
    everyday: { scenario: "You paste a recipe and your kitchen inventory as one blob, and the AI cannot tell which is which.", task: 'Write a prompt that structures the two inputs into clear sections.', hints: ['Label each block.', 'What is what?'] },
    professional: { scenario: "Goal, constraints, and data all run together in your prompt and the AI misreads which is which.", task: 'Write a prompt that organizes the context into labeled sections.', hints: ['Use headings.', 'Separate the parts.'] },
  },
  // L5 — stay on-target
  l5: {
    student: { scenario: "You paste your whole semester of notes to ask one exam question, and the answer wanders across unrelated chapters.", task: 'Write a prompt that includes only the relevant material.', hints: ['Which part matters?', 'Cut the rest.'] },
    everyday: { scenario: "You dump a year of bank texts to ask about last months grocery spending.", task: 'Write a prompt that narrows the context to just what is relevant.', hints: ['Which month?', 'Which category?'] },
    professional: { scenario: "The document runs forty pages and your question touches only two of them.", task: 'Write a prompt that points the AI at the on-target section.', hints: ['Which section?', 'Which topic exactly?'] },
  },
  // L6 — set the lens
  l6: {
    student: { scenario: "Your notes come back as a dry recap because you never set who the AI should be while reading them.", task: 'Write a prompt that frames a helpful lens (e.g. a patient tutor).', hints: ['Which role?', 'How should it read this?'] },
    everyday: { scenario: "Your receipts get a flat summary when you wanted them read with a suspicious, flag-the-odd-ones eye.", task: 'Write a prompt that casts the AI in the right role for the material.', hints: ['What expertise?', 'What should it watch for?'] },
    professional: { scenario: "A contract clause needs a risk-spotting lens the AI will not apply unless you ask for it.", task: 'Write a prompt that sets an expert lens for reading the context.', hints: ['Whose eyes?', 'What risk to catch?'] },
  },
  // L7 — iterate the context
  l7: {
    student: { scenario: "The answer was wrong because you fed the wrong section — the fix is the context, not the question.", task: 'Write a follow-up that swaps in the right source and redoes the task.', hints: ['Which source instead?', 'What to add?'] },
    everyday: { scenario: "The reply missed something because you forgot to include one key detail.", task: 'Write a follow-up that adds the missing context and updates the result.', hints: ['What was left out?', 'Add it, then redo.'] },
    professional: { scenario: "The AI leaned on an outdated figure buried in what you pasted.", task: 'Write a follow-up that removes the stale source and re-runs on the current one.', hints: ['Which to drop?', 'Which to keep?'] },
  },
  // L8 — the right amount
  l8: {
    student: { scenario: "You paste a whole textbook page when a single formula was all the AI needed.", task: 'Write a lean prompt with just the essential context and a task.', hints: ['The one fact that matters.', 'Cut the rest.'] },
    everyday: { scenario: "You forward an entire thread when one line carried the actual point.", task: 'Write a compact prompt with only the line that matters.', hints: ['The key line.', 'Nothing extra.'] },
    professional: { scenario: "You attach a full spreadsheet when two figures decide the answer.", task: 'Write a minimal prompt with only the facts the task needs.', hints: ['Which two numbers?', 'Drop the rest.'] },
  },
}