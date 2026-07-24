// src/data/lessons.js
// v2-5b re-export shim → v3-1a stage-aware.
// The public surface screens use is UNCHANGED: LESSONS, getLesson,
// getLessonByIndex, PERSONAS, TOTAL_LESSONS. What changed underneath is
// that each function now resolves content from the ACTIVE STAGE.
//
// Screens never pass a stage id and never import stages.js — they ask
// for "the current lesson" and this shim answers from whichever stage is
// active. That indirection IS the stages architecture.

import { resolveStage, DEFAULT_STAGE, PERSONAS, TOTAL_LESSONS } from './stages'
import { getActiveStage } from '../lib/storage'

export { PERSONAS, TOTAL_LESSONS }

/** Content of the active stage (defensive: falls back to text). */
function active() {
  return resolveStage(getActiveStage?.() ?? DEFAULT_STAGE)
}

/**
 * The old LESSONS shape, from the active stage: meta + solo variants.
 * Recomputed per access so a stage switch is reflected immediately —
 * cheap (8 objects) and avoids a stale-module-cache class of bug.
 */
export function getLessons() {
  const stage = active()
  return stage.lessons.map((meta) => ({
    ...meta,
    variants: stage.scenarios.solo[meta.id],
  }))
}

/** Back-compat: LESSONS as a live getter, so existing imports keep working. */
export const LESSONS = new Proxy([], {
  get(_t, prop) {
    const list = getLessons()
    const value = list[prop]
    return typeof value === 'function' ? value.bind(list) : value
  },
  has: (_t, prop) => prop in getLessons(),
  ownKeys: () => Reflect.ownKeys(getLessons()),
  getOwnPropertyDescriptor: (_t, prop) =>
    Object.getOwnPropertyDescriptor(getLessons(), prop),
})

/**
 * Get a lesson merged with the chosen persona's variant.
 * Unknown id → null; unknown persona → 'everyday' (corrupt localStorage
 * must never white-screen the app).
 */
export function getLesson(id, persona = 'everyday') {
  const lesson = getLessons().find((l) => l.id === id)
  if (!lesson) return null
  const variant = lesson.variants[persona] ?? lesson.variants.everyday
  return {
    id: lesson.id,
    order: lesson.order,
    title: lesson.title,
    concept: lesson.concept,
    takeaway: lesson.takeaway,
    tokenBudget: lesson.tokenBudget,
    ...variant,
  }
}

/** Get a lesson by queue position (0-based) — the auto-continue flow. */
export function getLessonByIndex(index, persona = 'everyday') {
  const lesson = getLessons()[index]
  return lesson ? getLesson(lesson.id, persona) : null
}

/** Practice-tier content for the active stage (v2-5c/5d consumers). */
export function getPracticeContent(tier, lessonId, persona = 'everyday') {
  const pack = active().scenarios[tier]
  return pack?.[lessonId]?.[persona] ?? pack?.[lessonId]?.everyday ?? null
}