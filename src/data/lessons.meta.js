// src/data/lessons.meta.js
// v2-5b — Lesson metadata: everything EXCEPT scenario content.
// Personas + the 8 lessons' identity, concept, takeaway, budget.
// Scenario content lives in scenarios.{solo,assisted,guided}.js.

export const PERSONAS = [
  { id: 'student', label: 'Student' },
  { id: 'everyday', label: 'Everyday user' },
  { id: 'professional', label: 'Professional' },
]

export const LESSON_META = [
  {
    "id": "l1",
    "order": 1,
    "title": "Be Specific",
    "concept": "Vague questions get vague answers — from people and from AI. Name exactly what you are dealing with: the thing, the details, the situation. If a stranger could not help you with what you wrote, the AI cannot either.",
    "tokenBudget": null,
    "takeaway": "Specific in, specific out — name the thing, the amount, the situation."
  },
  {
    "id": "l2",
    "order": 2,
    "title": "Give Context",
    "concept": "The AI only knows what you tell it — it cannot see your situation, your level, or your history. Share the background a helpful stranger would need before they could give advice you can actually use.",
    "tokenBudget": null,
    "takeaway": "The AI only knows what you tell it. Brief it like a stranger who just walked in."
  },
  {
    "id": "l3",
    "order": 3,
    "title": "Define the Output Format",
    "concept": "The AI will pick a format for you if you do not pick one first — usually long paragraphs. Say what the answer should look like: a table, a list, five flashcards, a two-line summary. Shape the container and the content improves too.",
    "tokenBudget": null,
    "takeaway": "Shape the container before the content: say what the answer should look like."
  },
  {
    "id": "l4",
    "order": 4,
    "title": "Set Constraints",
    "concept": "Boundaries sharpen answers. Length limits, tone, what to avoid, who it is for — every constraint you set removes a way the answer can go wrong. The tighter the fence, the closer the AI lands to what you actually want.",
    "tokenBudget": null,
    "takeaway": "Every constraint you set removes one way the answer can go wrong."
  },
  {
    "id": "l5",
    "order": 5,
    "title": "Provide Examples",
    "concept": "Showing beats describing. One example of what you want — the style, the level, the shape — teaches the AI more than a paragraph of explanation. This is called few-shot prompting, and it is the fastest way to get YOUR kind of answer.",
    "tokenBudget": null,
    "takeaway": "One example teaches the AI more than a paragraph of description."
  },
  {
    "id": "l6",
    "order": 6,
    "title": "Assign a Role",
    "concept": "Telling the AI who to be changes how it answers. 'Act as a strict examiner' gets you harder questions; 'act as a patient teacher' gets you gentler steps. The right role carries your requirements with it — expertise, tone, and priorities in one line.",
    "tokenBudget": null,
    "takeaway": "Tell the AI who to be, and it changes how the answer thinks."
  },
  {
    "id": "l7",
    "order": 7,
    "title": "Iterate & Refine",
    "concept": "The first answer is a first draft, not a verdict. Point at exactly what is off — too long, wrong assumption, missing your situation — and ask for the specific change. This is jugaad thinking: work with what you got, and bend it until it fits.",
    "tokenBudget": null,
    "takeaway": "The first answer is a draft. Point at what's off and ask for the exact change."
  },
  {
    "id": "l8",
    "order": 8,
    "title": "Prompt Economy",
    "concept": "Every word you send costs tokens — and burying your request in politeness and backstory makes answers worse, not better. Say it once, cut the filler, keep only what changes the answer. Precision is cheaper than length.",
    "tokenBudget": 40,
    "takeaway": "Say it once. Cut the filler. Every word left should earn its place."
  }
]

export const TOTAL_LESSONS = LESSON_META.length