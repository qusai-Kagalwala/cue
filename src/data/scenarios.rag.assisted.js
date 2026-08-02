// src/data/scenarios.rag.assisted.js
// v6 — RAG / CONTEXT DESIGN assisted tier: 8×3. Free textarea + live checklist
// (Task framed · Sources given · Noise cut · Well structured · On-target ·
// Right amount). One wrinkle each. Teaches designing the context you feed an
// AI. AI-assisted, hand-curated. Indian-everyday framing where natural.

export const ASSISTED_RAG = {
  // L1 — frame the task
  l1: {
    student: { scenario: "You paste your lecture notes and get a bland restatement, because you never told the AI what you actually wanted from them.", task: 'Write a prompt that frames a clear task for the notes.' },
    everyday: { scenario: "You forward a long chat to the AI expecting help, but with no instruction it just describes the conversation back to you.", task: 'Write a prompt that says exactly what to do with the chat.' },
    professional: { scenario: "You drop a report in and ask 'thoughts?' — the answer is vague because the task was.", task: 'Write a prompt that frames a specific, answerable task for the report.' },
  },
  // L2 — give the sources
  l2: {
    student: { scenario: "You ask the AI about 'the reading' and it invents an answer, because you referenced a source you never actually pasted.", task: 'Write a prompt that includes the source material the AI needs.' },
    everyday: { scenario: "You want help replying to a message but describe it vaguely instead of pasting it, so the reply misses the point.", task: 'Write a prompt that gives the AI the actual message to work from.' },
    professional: { scenario: "You mention 'the numbers' and expect analysis, but the AI has none of the figures in front of it.", task: 'Write a prompt that supplies the real data to reason over.' },
  },
  // L3 — cut the noise
  l3: {
    student: { scenario: "You paste a whole chapter to ask about one concept, and the AI drowns your question in the other nine topics.", task: 'Write a prompt that tells the AI what to focus on and what to ignore.' },
    everyday: { scenario: "The forwarded message is mostly jokes with one useful detail buried inside.", task: 'Write a prompt that extracts only the useful part and ignores the rest.' },
    professional: { scenario: "The meeting transcript is an hour of tangents around a single decision.", task: 'Write a prompt that focuses on the decision and skips the noise.' },
  },
  // L4 — structure the context
  l4: {
    student: { scenario: "You paste two sets of notes back to back and the AI blends them, attributing one source's facts to the other.", task: 'Write a prompt that clearly labels and separates each source.' },
    everyday: { scenario: "You paste a recipe and what's in your kitchen as one blob, and the AI can't tell them apart.", task: 'Write a prompt that structures the two inputs into clear sections.' },
    professional: { scenario: "Several inputs — goal, constraints, data — run together and the AI misreads which is which.", task: 'Write a prompt that organizes the context into labeled sections.' },
  },
  // L5 — stay on-target
  l5: {
    student: { scenario: "You paste your entire semester's notes to ask one exam question, and the AI's answer wanders across unrelated topics.", task: 'Write a prompt that includes only the material relevant to the question.' },
    everyday: { scenario: "You dump a year of transaction texts to ask about last month's groceries.", task: 'Write a prompt that narrows the context to just what is relevant.' },
    professional: { scenario: "The document is forty pages and your question touches two of them.", task: 'Write a prompt that points the AI at only the on-target section.' },
  },
  // L6 — the lens / role
  l6: {
    student: { scenario: "The same notes come back as a dry recap because you didn't set who the AI should be while reading them.", task: 'Write a prompt that frames a helpful lens for the material (e.g. a patient tutor).' },
    everyday: { scenario: "Your receipts get a flat summary when you wanted them read with a careful, flag-the-odd-ones eye.", task: 'Write a prompt that casts the AI in the right role for your context.' },
    professional: { scenario: "The contract clause needs a risk-spotting lens the AI won't apply unless you ask.", task: 'Write a prompt that sets an expert lens for reading the context.' },
  },
  // L7 — iterate on the context
  l7: {
    student: { scenario: "The answer was off because you fed the wrong section — you need to correct the context, not the question.", task: 'Write a follow-up that swaps in the right source and redoes the task.' },
    everyday: { scenario: "The reply missed something because you forgot to include one key detail.", task: 'Write a follow-up that adds the missing context and updates the result.' },
    professional: { scenario: "The AI leaned on an outdated figure buried in what you pasted.", task: 'Write a follow-up that removes the stale source and re-runs on the current one.' },
  },
  // L8 — right amount
  l8: {
    student: { scenario: "You paste the whole textbook page when a single formula was all the AI needed.", task: 'Write a lean prompt with just the essential context and a clear task.' },
    everyday: { scenario: "You forward an entire thread when one line carried the actual point.", task: 'Write a compact prompt with only the line that matters.' },
    professional: { scenario: "You attach the full spreadsheet when two figures decide the answer.", task: 'Write a minimal prompt with only the facts the task needs.' },
  },
}