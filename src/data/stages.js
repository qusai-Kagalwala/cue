// src/data/stages.js
// v3-1a — The STAGES registry. A stage is a CONTENT PACK flowing through
// the unchanged machine (docs/v3-stages.md is the contract). Text
// registers the existing data verbatim — zero content moved, zero
// scenarios rewritten.
//
// Screens must NEVER import this file or branch on stage id. Data flows:
//   stages.js → lessons.js (shim) → screens
// Locked stages are teased in the picker; their data slots stay null
// until their content ships (Phase B onward).

import { PERSONAS, LESSON_META, TOTAL_LESSONS } from './lessons.meta'
import { SOLO } from './scenarios.solo'
import { ASSISTED } from './scenarios.assisted'
import { GUIDED } from './scenarios.guided'

export const DEFAULT_STAGE = 'text'

export const STAGES = {
  text: {
    id: 'text',
    label: 'Text',
    blurb: 'Emails, essays, explanations — the everyday ask.',
    locked: false,
    lessons: LESSON_META,
    scenarios: { solo: SOLO, assisted: ASSISTED, guided: GUIDED },
    weightsKey: 'text',   // → rubric.js selects LESSON_WEIGHTS (v3-1b)
    proxyMode: 'lesson',  // → api/evaluate.js (v3-1b widens this)
  },

  // ---- Teased, not yet built (Phase B/C). Content slots stay null so a
  // half-registered stage can never render as an empty lesson. ----
  image: {
    id: 'image',
    label: 'Image',
    blurb: 'Subject, light, framing — prompting what you want to see.',
    locked: true,
    lessons: null,
    scenarios: null,
    weightsKey: 'image',
    proxyMode: 'lesson-image',
  },
  video: {
    id: 'video',
    label: 'Video',
    blurb: 'Shots, movement, continuity — prompting things that move.',
    locked: true,
    lessons: null,
    scenarios: null,
    weightsKey: 'video',
    proxyMode: 'lesson-video',
  },
  audio: {
    id: 'audio',
    label: 'Audio',
    blurb: 'Voice, mood, structure — prompting what you want to hear.',
    locked: true,
    lessons: null,
    scenarios: null,
    weightsKey: 'audio',
    proxyMode: 'lesson-audio',
  },
}

/** Every stage, ordered for the picker. */
export const STAGE_LIST = Object.values(STAGES)

/** A stage is playable only if unlocked AND its content is present. */
export function isStagePlayable(stageId) {
  const s = STAGES[stageId]
  return Boolean(s && !s.locked && s.lessons && s.scenarios)
}

/** Resolve a stage id defensively — unknown/locked/empty → text. */
export function resolveStage(stageId) {
  return isStagePlayable(stageId) ? STAGES[stageId] : STAGES[DEFAULT_STAGE]
}

export { PERSONAS, TOTAL_LESSONS }