// src/data/lessons.js
// T1.1 — Lesson content schema. All 8 lessons × 3 persona variants STUBBED.
// Real content is written in Phase 6 (T6.1) — do NOT polish copy here.
// Structure is final; only the strings change later.

export const PERSONAS = [
  { id: 'student', label: 'Student' },
  { id: 'everyday', label: 'Everyday user' },
  { id: 'professional', label: 'Professional' },
]

// Small factory so stubs stay consistent and greppable ("STUB" = unwritten).
const stub = (persona, lessonTitle) => ({
  scenario: `STUB [${persona}] — a short relatable situation for "${lessonTitle}".`,
  task: `STUB [${persona}] — what the learner must get the AI to do.`,
  exampleBad: `STUB [${persona}] — a weak prompt that fails this lesson's concept.`,
  hints: [
    `STUB hint 1 for ${lessonTitle}.`,
    `STUB hint 2 for ${lessonTitle}.`,
  ],
})

const variants = (title) => ({
  student: stub('student', title),
  everyday: stub('everyday', title),
  professional: stub('professional', title),
})

export const LESSONS = [
  {
    id: 'l1',
    order: 1,
    title: 'Be Specific',
    concept:
      'STUB — vague prompts get vague answers. Name exactly what you want: the subject, the scope, the detail level.',
    tokenBudget: null,
    variants: variants('Be Specific'),
  },
  {
    id: 'l2',
    order: 2,
    title: 'Give Context',
    concept:
      'STUB — the AI only knows what you tell it. Share the background a helpful stranger would need.',
    tokenBudget: null,
    variants: variants('Give Context'),
  },
  {
    id: 'l3',
    order: 3,
    title: 'Define the Output Format',
    concept:
      'STUB — say what the answer should look like: a list, a table, three sentences, an email.',
    tokenBudget: null,
    variants: variants('Define the Output Format'),
  },
  {
    id: 'l4',
    order: 4,
    title: 'Set Constraints',
    concept:
      'STUB — boundaries sharpen answers: length limits, tone, what to avoid, who it is for.',
    tokenBudget: null,
    variants: variants('Set Constraints'),
  },
  {
    id: 'l5',
    order: 5,
    title: 'Provide Examples',
    concept:
      'STUB — showing one example of what you want (few-shot) beats paragraphs of description.',
    tokenBudget: null,
    variants: variants('Provide Examples'),
  },
  {
    id: 'l6',
    order: 6,
    title: 'Assign a Role',
    concept:
      'STUB — telling the AI who to be ("act as a career counselor") frames how it answers.',
    tokenBudget: null,
    variants: variants('Assign a Role'),
  },
  {
    id: 'l7',
    order: 7,
    title: 'Iterate & Refine',
    concept:
      'STUB — the first answer is a draft. Point at what is off and ask for the change you want.',
    tokenBudget: null,
    variants: variants('Iterate & Refine'),
  },
  {
    id: 'l8',
    order: 8,
    title: 'Prompt Economy',
    concept:
      'STUB — every token costs. Say it once, cut filler, keep the essentials — beat the budget.',
    tokenBudget: 40, // the only lesson with a budget
    variants: variants('Prompt Economy'),
  },
]

export const TOTAL_LESSONS = LESSONS.length

/**
 * Get a lesson merged with the chosen persona's variant.
 * Returns null for unknown ids; falls back to 'everyday' for unknown personas
 * (defensive — corrupt localStorage should never white-screen the app).
 */
export function getLesson(id, persona = 'everyday') {
  const lesson = LESSONS.find((l) => l.id === id)
  if (!lesson) return null
  const variant = lesson.variants[persona] ?? lesson.variants.everyday
  return {
    id: lesson.id,
    order: lesson.order,
    title: lesson.title,
    concept: lesson.concept,
    tokenBudget: lesson.tokenBudget,
    ...variant, // scenario, task, exampleBad, hints
  }
}

/** Get a lesson by queue position (0-based) — used by the auto-continue flow. */
export function getLessonByIndex(index, persona = 'everyday') {
  const lesson = LESSONS[index]
  return lesson ? getLesson(lesson.id, persona) : null
}