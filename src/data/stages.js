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
// v3-2d — the Image Stage content pack
import { LESSON_META_IMAGE } from './lessons.meta.image'
import { SOLO_IMAGE } from './scenarios.image.solo'
import { ASSISTED_IMAGE } from './scenarios.image.assisted'
import { GUIDED_IMAGE } from './scenarios.image.guided'
// v3-3d — the Video Stage content pack
import { LESSON_META_VIDEO } from './lessons.meta.video'
import { SOLO_VIDEO } from './scenarios.video.solo'
import { ASSISTED_VIDEO } from './scenarios.video.assisted'
import { GUIDED_VIDEO } from './scenarios.video.guided'
// v3-4d — the Audio Stage content pack
import { LESSON_META_AUDIO } from './lessons.meta.audio'
import { SOLO_AUDIO } from './scenarios.audio.solo'
import { ASSISTED_AUDIO } from './scenarios.audio.assisted'
import { GUIDED_AUDIO } from './scenarios.audio.guided'
// v3-5d — the Code Stage content pack
import { LESSON_META_CODE } from './lessons.meta.code'
import { SOLO_CODE } from './scenarios.code.solo'
import { ASSISTED_CODE } from './scenarios.code.assisted'
import { GUIDED_CODE } from './scenarios.code.guided'
// v5 — the Agent Stage content pack
import { LESSON_META_AGENT } from './lessons.meta.agent'
import { SOLO_AGENT } from './scenarios.agent.solo'
import { ASSISTED_AGENT } from './scenarios.agent.assisted'
import { GUIDED_AGENT } from './scenarios.agent.guided'
// v6 — the RAG / Context Design Stage content pack
import { LESSON_META_RAG } from './lessons.meta.rag'
import { SOLO_RAG } from './scenarios.rag.solo'
import { ASSISTED_RAG } from './scenarios.rag.assisted'
import { GUIDED_RAG } from './scenarios.rag.guided'
// v6 — the Automation / Workflow Brief Stage content pack
import { LESSON_META_AUTOMATION } from './lessons.meta.automation'
import { SOLO_AUTOMATION } from './scenarios.automation.solo'
import { ASSISTED_AUTOMATION } from './scenarios.automation.assisted'
import { GUIDED_AUTOMATION } from './scenarios.automation.guided'
// v6 — the System Prompt / Agent Instructions Stage content pack
import { LESSON_META_SYSTEM } from './lessons.meta.system'
import { SOLO_SYSTEM } from './scenarios.system.solo'
import { ASSISTED_SYSTEM } from './scenarios.system.assisted'
import { GUIDED_SYSTEM } from './scenarios.system.guided'
import { LESSON_META_COMPREHEND } from './lessons.meta.comprehend'
import { SOLO_COMPREHEND } from './scenarios.comprehend.solo'
import { ASSISTED_COMPREHEND } from './scenarios.comprehend.assisted'
import { GUIDED_COMPREHEND } from './scenarios.comprehend.guided'

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
    proxyMode: 'text',    // → api/evaluate.js STAGE_FRAMING key
  },

  // ---- Teased, not yet built (Phase B/C). Content slots stay null so a
  // half-registered stage can never render as an empty lesson. ----
  // v3-2d — SHIPPED. Content pack only; not one screen changed.
  image: {
    id: 'image',
    label: 'Image',
    blurb: 'Subject, light, framing — prompting what you want to see.',
    locked: false,
    lessons: LESSON_META_IMAGE,
    scenarios: {
      solo: SOLO_IMAGE,
      assisted: ASSISTED_IMAGE,
      guided: GUIDED_IMAGE,
    },
    weightsKey: 'image',
    proxyMode: 'image',
  },
  // v3-3d — SHIPPED. Content pack only; not one screen changed.
  video: {
    id: 'video',
    label: 'Video',
    blurb: 'Shots, movement, continuity — prompting things that move.',
    locked: false,
    lessons: LESSON_META_VIDEO,
    scenarios: {
      solo: SOLO_VIDEO,
      assisted: ASSISTED_VIDEO,
      guided: GUIDED_VIDEO,
    },
    weightsKey: 'video',
    proxyMode: 'video',
  },
  // v3-4d — SHIPPED. Content pack only; not one screen changed.
  audio: {
    id: 'audio',
    label: 'Audio',
    blurb: 'Voice, mood, structure — prompting what you want to hear.',
    locked: false,
    lessons: LESSON_META_AUDIO,
    scenarios: {
      solo: SOLO_AUDIO,
      assisted: ASSISTED_AUDIO,
      guided: GUIDED_AUDIO,
    },
    weightsKey: 'audio',
    proxyMode: 'audio',
  },
  // v3-5d — SHIPPED. The final stage; content pack only.
  code: {
    id: 'code',
    label: 'Code',
    blurb: 'Goal, context, interface — prompting the code you need.',
    locked: false,
    lessons: LESSON_META_CODE,
    scenarios: {
      solo: SOLO_CODE,
      assisted: ASSISTED_CODE,
      guided: GUIDED_CODE,
    },
    weightsKey: 'code',
    proxyMode: 'code',
  },
  // v5 — SHIPPED. The Agentic Track: briefing a coding agent (Claude Code,
  // Cursor, Copilot). Content pack + rubric only; not one screen changed.
  agent: {
    id: 'agent',
    label: 'Agent',
    blurb: 'Task, guardrails, acceptance — briefing an AI that edits your code.',
    locked: false,
    lessons: LESSON_META_AGENT,
    scenarios: {
      solo: SOLO_AGENT,
      assisted: ASSISTED_AGENT,
      guided: GUIDED_AGENT,
    },
    weightsKey: 'agent',
    proxyMode: 'agent',
  },
  // v6 — SHIPPED. RAG / Context Design: what context to feed an AI so it
  // answers well. Content pack + rubric only; not one screen changed.
  rag: {
    id: 'rag',
    label: 'Context',
    blurb: 'Sources, focus, structure — feeding an AI the right context.',
    locked: false,
    lessons: LESSON_META_RAG,
    scenarios: {
      solo: SOLO_RAG,
      assisted: ASSISTED_RAG,
      guided: GUIDED_RAG,
    },
    weightsKey: 'rag',
    proxyMode: 'rag',
  },
  // v6 — SHIPPED. Automation / Workflow Brief: describing a workflow to hand
  // to n8n, Zapier, Make, or an AI. Content pack + rubric only.
  automation: {
    id: 'automation',
    label: 'Automation',
    blurb: 'Trigger, steps, conditions — briefing a workflow to build.',
    locked: false,
    lessons: LESSON_META_AUTOMATION,
    scenarios: {
      solo: SOLO_AUTOMATION,
      assisted: ASSISTED_AUTOMATION,
      guided: GUIDED_AUTOMATION,
    },
    weightsKey: 'automation',
    proxyMode: 'automation',
  },
  // v6 — SHIPPED. System Prompt / Agent Instructions: the persistent rules
  // that govern an AI on every turn. Content pack + rubric only.
  system: {
    id: 'system',
    label: 'System',
    blurb: 'Identity, boundaries, rules — the AI\'s standing instructions.',
    locked: false,
    lessons: LESSON_META_SYSTEM,
    scenarios: {
      solo: SOLO_SYSTEM,
      assisted: ASSISTED_SYSTEM,
      guided: GUIDED_SYSTEM,
    },
    weightsKey: 'system',
    proxyMode: 'system',
  },
  comprehend: {
    id: 'comprehend',
    label: 'Reading',
    blurb: 'Read the AI\'s answer well — verify, critique, correct, and act on it.',
    locked: false,
    lessons: LESSON_META_COMPREHEND,
    scenarios: {
      solo: SOLO_COMPREHEND,
      assisted: ASSISTED_COMPREHEND,
      guided: GUIDED_COMPREHEND,
    },
    weightsKey: 'comprehend',
    proxyMode: 'comprehend',
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