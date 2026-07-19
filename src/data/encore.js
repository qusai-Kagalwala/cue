// src/data/encore.js
// v2-9 — The Encore: boss challenges. Every rubric dimension at once,
// under a tight token budget. One scenario per day, picked by date hash —
// same boss for everyone all day, a new one at midnight. The picker is
// reused by the daily challenge (v2-10).

export const ENCORE_POOL = [
  {
    id: 'e1',
    title: 'The Wedding Brief',
    scenario:
      "Your cousin's wedding decorator wants 'the requirements' by tonight. Venue hall, 200 guests, marigold-and-white theme, ₹40,000 ceiling, and the stage must photograph well. One prompt to an AI must produce the brief.",
    task: 'Get a decorator-ready brief: assign the right role, give every fact that matters, set the limits, and demand a usable format.',
    tokenBudget: 55,
  },
  {
    id: 'e2',
    title: 'The Skeptical Judge',
    scenario:
      "College fest pitch round in two days — 2 minutes, your app idea, judges who interrupt. You want the AI to rehearse you the hard way before they do.",
    task: 'Set up the rehearsal: the judge role, your idea in one line, the format of the grilling, and the rules of engagement.',
    tokenBudget: 50,
  },
  {
    id: 'e3',
    title: "Dadi's Checkup",
    scenario:
      "Dadi's diabetes review is Thursday and the doctor gives you seven minutes. Her sugar readings drifted up this month and she's been skipping her evening walk. You want a prepared list, not a blank mind.",
    task: 'Get the question list: the right assistant role, her actual situation, what to prioritise, and a take-along format.',
    tokenBudget: 55,
  },
  {
    id: 'e4',
    title: 'The Monsoon Plan',
    scenario:
      "First heavy rain is two weeks out and your society's ground floor flooded last year. As secretary you need a prep plan the committee WhatsApp group will actually read and act on.",
    task: 'Get the plan: a role that knows buildings, last year\'s failures as context, this year\'s constraints, and a group-readable format.',
    tokenBudget: 50,
  },
  {
    id: 'e5',
    title: 'The Job Switch',
    scenario:
      "Four years in operations, applying to a product role Monday. Your resume summary still describes the old you. Recruiters give it six seconds and buzzwords are an instant skip.",
    task: 'Get the rewrite: the recruiter\'s-eye role, your real trajectory, the hard limits, and the exact shape of the output.',
    tokenBudget: 55,
  },
  {
    id: 'e6',
    title: 'The Festival Feast',
    scenario:
      "Fourteen people for the festival dinner: two diabetic elders, three kids who fear spice, one vegan cousin, one pressure cooker, one afternoon. The menu has to work for everyone at once.",
    task: 'Get the menu plan: a cook who plans for crowds, every dietary fact, the kitchen\'s limits, and a format you can cook from.',
    tokenBudget: 55,
  },
]

/** Tiny date hash → stable index into any pool size. The one picker
    both the Encore and the daily challenge (v2-10) share. */
export function dateIndexFor(dateKey, poolSize) {
  let h = 0
  for (let i = 0; i < dateKey.length; i++) {
    h = (h * 31 + dateKey.charCodeAt(i)) | 0
  }
  return Math.abs(h) % poolSize
}

/** Same scenario all day, new one tomorrow. */
export function encoreForDate(dateKey) {
  return ENCORE_POOL[dateIndexFor(dateKey, ENCORE_POOL.length)]
}

/** v2-10 — today's daily lesson index (offset so the daily and the
    Encore don't sync onto the same hash rhythm). */
export function dailyLessonIndexFor(dateKey, totalLessons) {
  return dateIndexFor(dateKey + ':daily', totalLessons)
}