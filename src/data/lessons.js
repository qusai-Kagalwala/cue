// src/data/lessons.js
// v2-5b — RE-EXPORT SHIM. The data moved:
//   lessons.meta.js       → PERSONAS, LESSON_META, TOTAL_LESSONS
//   scenarios.solo.js     → the original 24 (Gemini-evaluated, XP)
//   scenarios.assisted.js → 24 medium practice scenarios (no XP)
//   scenarios.guided.js   → 24 simple scenarios + skeletons (no XP)
// This file rebuilds the OLD public surface so every existing import
// keeps working unchanged. New code (v2-5c/5d) imports the new files
// directly; old consumers migrate lazily or never.

import { PERSONAS, LESSON_META, TOTAL_LESSONS } from './lessons.meta'
import { SOLO } from './scenarios.solo'

export { PERSONAS, TOTAL_LESSONS }

/** The old LESSONS shape: meta + solo variants, exactly as before. */
export const LESSONS = LESSON_META.map((meta) => ({
  ...meta,
  variants: SOLO[meta.id],
}))

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
    takeaway: lesson.takeaway,
    tokenBudget: lesson.tokenBudget,
    ...variant, // scenario, task, exampleBad, hints
  }
}

/** Get a lesson by queue position (0-based) — used by the auto-continue flow. */
export function getLessonByIndex(index, persona = 'everyday') {
  const lesson = LESSONS[index]
  return lesson ? getLesson(lesson.id, persona) : null
}