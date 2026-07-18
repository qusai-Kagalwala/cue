// src/data/audition.js
// v2-3c — Static Audition content: 4 pick-the-better-prompt pairs + the
// mini task (a lesson shell so scoreWithRubric works unchanged, zero quota).

export const AUDITION_MCQS = [
  {
    id: 'a1',
    question: 'You need dinner ideas. Which prompt gets a more useful answer?',
    pair: [
      { text: 'give me some dinner recipes', better: false },
      { text: 'Suggest 3 veg dinner recipes under 30 minutes using paneer, tomatoes, and rice.', better: true },
    ],
    why: 'The second names ingredients, time, diet, and how many ideas — nothing left to guesswork.',
  },
  {
    id: 'a2',
    question: 'Asking for study help. Which works better?',
    pair: [
      { text: 'Explain photosynthesis like I\'m a Class 10 student revising for boards — 5 simple points.', better: true },
      { text: 'explain photosynthesis', better: false },
    ],
    why: 'The first tells the AI who it\'s for and what shape the answer should take.',
  },
  {
    id: 'a3',
    question: 'You want an email drafted. Which prompt?',
    pair: [
      { text: 'write a leave email to my boss', better: false },
      { text: 'Draft a 4-line leave email to my manager: 2 days off next Thu–Fri for a family function, work handed over to Priya.', better: true },
    ],
    why: 'Dates, reason, handover, length — the second gives everything the email actually needs.',
  },
  {
    id: 'a4',
    question: 'The AI\'s answer was too long and formal. What now?',
    pair: [
      { text: 'that\'s bad, try again', better: false },
      { text: 'Keep the same points but rewrite in half the length, casual tone, like a WhatsApp message.', better: true },
    ],
    why: 'Pointing at exactly what to change beats starting over — that\'s iteration.',
  },
]

// Mini task — shaped like a lesson so the rubric scores it (DEFAULT_WEIGHTS).
export const AUDITION_TASK = {
  id: 'audition',
  title: 'The Audition',
  concept: 'Show your instincts: clarity, context, constraints, format, specificity, economy.',
  scenario:
    'Your phone gallery is full — 8,000 photos. You want help deciding what to delete safely without losing memories that matter.',
  task: 'Write the prompt you would send an AI to help with this. Best instincts forward.',
  tokenBudget: null,
}