// src/lib/rubric.js
// T-v1-3 — The reusable rubric scorer. Pure module: no React, no network,
// no randomness (variation is seeded from the prompt itself, so the same
// prompt always gets the same feedback — deterministic and testable).
//
// This is a PLATFORM, not a fallback: the v2 Audition, live checklist,
// and practice tiers all import scoreWithRubric unchanged. Keep it clean.
//
// Six dimensions, each detected 0..1, combined with per-lesson weights.
// v1 quality bar: directionally right, varied wording, lesson-aware.
// Numerical perfection belongs to the v2 Python calibration.

import { estimateTokens } from './tokens'

// ---------------------------------------------------------------- detectors

const ROLE_PATTERNS =
  /\b(act as|you are|you're a|as an? (expert|teacher|doctor|examiner|chef|coach|physiotherapist|engineer|lawyer|consultant|professional)|imagine you('re| are)|pretend (to be|you)|role of)\b/i

const CONSTRAINT_PATTERNS =
  /\b(under|at most|no more than|maximum|max|limit(ed)? to|within|only|exactly|at least|avoid|don't|do not|never|must(n't| not)?|without|no ([a-z]+ing|jargon|emojis?))\b|\b\d+\s?(words?|lines?|points?|steps?|minutes?|days?|km|kilometres?|rupees?|tokens?|₹)/i

const FORMAT_PATTERNS =
  /\b(list|bullet(s| points)?|table|columns?|steps?|numbered|flashcards?|q&a|format|template|one[- ]lin(e|er)|paragraphs?|summar(y|ise|ize)|email|subject line|headings?|for example|e\.g\.|like this|such as)\b|["“'‘][^"”'’]{8,}["”'’]/i

/** Words worth matching: lowercase, letters only, 5+ chars, deduped. */
function keywords(text) {
  return [...new Set((text ?? '').toLowerCase().match(/[a-z]{5,}/g) ?? [])]
}

function clamp01(n) {
  return Math.min(1, Math.max(0, n))
}

/** Each detector: (prompt, lesson) → 0..1 */
const DETECTORS = {
  role(prompt) {
    return ROLE_PATTERNS.test(prompt) ? 1 : 0
  },

  context(prompt) {
    // Background signals: personal framing, situational detail, numbers.
    let score = 0
    if (/\b(my|our|i am|i'm|i have|we are|we're)\b/i.test(prompt)) score += 0.35
    if (/\d/.test(prompt)) score += 0.25
    const sentences = prompt.split(/[.!?]+/).filter((s) => s.trim().length > 12)
    score += clamp01(sentences.length / 3) * 0.4 // multi-sentence = background given
    return clamp01(score)
  },

  constraints(prompt) {
    const hits = prompt.match(new RegExp(CONSTRAINT_PATTERNS.source, 'gi')) ?? []
    return clamp01(hits.length / 2) // two clear constraints = full marks
  },

  format(prompt) {
    return FORMAT_PATTERNS.test(prompt) ? 1 : 0
  },

  specificity(prompt, lesson) {
    // On-topic vocabulary + concrete detail (digits, named things).
    const topic = keywords(`${lesson.scenario} ${lesson.task}`)
    const used = keywords(prompt)
    const overlap = used.filter((w) => topic.includes(w)).length
    let score = clamp01(overlap / 4) * 0.6
    if (/\d/.test(prompt)) score += 0.2
    if (/\b[A-Z][a-z]{3,}/.test(prompt.slice(1))) score += 0.2 // named specifics
    return clamp01(score)
  },

  length(prompt, lesson) {
    const chars = prompt.trim().length
    if (lesson.tokenBudget != null) {
      // Budget lessons: within budget = good, over = collapses fast.
      const tokens = estimateTokens(prompt)
      if (tokens <= lesson.tokenBudget) return 1
      return clamp01(1 - (tokens - lesson.tokenBudget) / lesson.tokenBudget)
    }
    if (chars < 25) return 0.1        // barely a sentence
    if (chars <= 500) return 1        // healthy zone
    return clamp01(1 - (chars - 500) / 1000) // rambling decays
  },
}

// -------------------------------------------------------- per-lesson weights

// Every lesson sees all six dimensions, but its own teaching point dominates.
// (L5's "examples" and L7's "directed edits" are detected inside format and
// constraints respectively — the patterns include their markers.)
const LESSON_WEIGHTS = {
  l1: { role: 0.05, context: 0.15, constraints: 0.10, format: 0.05, specificity: 0.45, length: 0.20 },
  l2: { role: 0.05, context: 0.45, constraints: 0.10, format: 0.05, specificity: 0.20, length: 0.15 },
  l3: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.45, specificity: 0.15, length: 0.15 },
  l4: { role: 0.05, context: 0.10, constraints: 0.45, format: 0.10, specificity: 0.15, length: 0.15 },
  l5: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.40, specificity: 0.20, length: 0.15 },
  l6: { role: 0.45, context: 0.15, constraints: 0.10, format: 0.05, specificity: 0.10, length: 0.15 },
  l7: { role: 0.05, context: 0.15, constraints: 0.35, format: 0.10, specificity: 0.20, length: 0.15 },
  l8: { role: 0.05, context: 0.10, constraints: 0.15, format: 0.05, specificity: 0.20, length: 0.45 },
}

const DEFAULT_WEIGHTS = { role: 0.1, context: 0.2, constraints: 0.15, format: 0.15, specificity: 0.25, length: 0.15 }


// ---------------------------------------------------------------- v3-2a
// IMAGE STAGE detectors. Same six SLOTS as text (docs/v3-stages.md §3),
// different vocabulary. Slot names stay canonical (role/context/format/
// constraints/specificity/length) so the machine is untouched; the
// LABELS below are what the learner actually reads.
//
//   role        → style & art direction   ("in the style of", "oil painting")
//   context     → scene & setting          (where, when, weather, mood)
//   format      → composition & framing    (close-up, wide shot, rule of thirds)
//   constraints → technical controls       (lighting, lens, aspect, quality, negatives)
//   specificity → subject detail           (what exactly, colour, material, action)
//   length      → prompt density           (image prompts reward packed detail)

const IMG_STYLE =
  /\b(in the style of|style of|art style|painting|painted|painterly|illustration|illustrated|drawing|sketch(ed)?|render(ed|ing)?|isometric|oil painting|watercolou?r|acrylic|gouache|charcoal|pencil sketch|ink drawing|line art|vector|flat illustration|3d render|cgi|octane|unreal engine|pixar|anime|manga|studio ghibli|ukiyo-?e|art nouveau|art deco|bauhaus|impressionis(m|t)|surreal(ism|ist)?|cyberpunk|steampunk|vaporwave|noir|minimalist|photorealistic|hyper-?realistic|realistic|photo(graph)?|cinematic|editorial|documentary photo|street photography|portrait photography|concept art|matte painting|storybook|comic|cartoon|graphic novel|retro|vintage|film still|infographic|diagram)\b/i

const IMG_SCENE =
  /\b(background|backdrop|setting|environment|landscape|indoor|outdoor|street|forest|desert|beach|mountain|city|village|market|room|studio|rooftop|alley|field|sky|night|day|dawn|dusk|sunset|sunrise|golden hour|blue hour|morning|evening|midnight|rain(y|ing)?|snow(y|ing)?|fog(gy)?|mist(y)?|storm(y)?|cloudy|sunny|monsoon|winter|summer|autumn|spring|festival|diwali|holi|wedding)\b/i

const IMG_COMPOSITION =
  /\b(close-?up|extreme close-?up|wide shot|wide-?angle|long shot|medium shot|full body|head ?shot|portrait|landscape orientation|bird'?s eye|worm'?s eye|top-?down|overhead|low angle|high angle|eye level|dutch angle|over the shoulder|profile|three-?quarter|centred|centered|rule of thirds|symmetr(y|ical)|framed|foreground|midground|composition|crop(ped)?|negative space|leading lines|silhouette)\b/i

const IMG_TECHNICAL =
  /\b(brush ?strokes?|linework|shading|texture|grain|film grain|halftone|dithered|cel-?shaded|palette|muted|saturated|desaturated|contrast|exposure|vignette|lighting|lit|backlit|rim light|soft light|hard light|natural light|studio light|neon|volumetric|god rays|chiaroscuro|shallow depth of field|deep depth of field|depth of field|bokeh|f\/?\d|\d{2,3}\s?mm|lens|macro|telephoto|fisheye|tilt-?shift|long exposure|motion blur|sharp focus|soft focus|hdr|8k|4k|ultra-?detailed|high detail|highly detailed|high resolution|aspect ratio|\d{1,2}:\d{1,2}|--ar|--v|--q|--style|--no|portrait mode|landscape mode|square|vertical|horizontal|no |without |avoid |negative prompt)\b/i

const IMG_SUBJECT_MATERIAL =
  /\b(wearing|holding|sitting|standing|walking|running|jumping|smiling|looking|reading|cooking|playing|dancing|sleeping|flying|floating|made of|wooden|metal(lic)?|glass|marble|velvet|silk|cotton|leather|fur|fluffy|furry|shiny|matte|rusty|worn|cracked|glowing|translucent|embroidered|patterned|striped|polka|carved|woven)\b/i

const IMG_COLOUR =
  /\b(red|orange|yellow|green|blue|indigo|violet|purple|pink|magenta|cyan|teal|turquoise|gold(en)?|silver|bronze|copper|black|white|grey|gray|beige|cream|ivory|crimson|scarlet|maroon|navy|olive|amber|saffron|pastel|monochrome|sepia|muted|vibrant|neon|warm tones?|cool tones?|colou?r palette)\b/i

const IMAGE_DETECTORS = {
  // style & art direction
  role(prompt) {
    return IMG_STYLE.test(prompt) ? 1 : 0
  },

  // scene & setting — where/when/weather, plus atmosphere words
  context(prompt) {
    let score = 0
    if (IMG_SCENE.test(prompt)) score += 0.55
    const hits = (prompt.match(new RegExp(IMG_SCENE.source, 'gi')) ?? []).length
    score += clamp01((hits - 1) / 3) * 0.3   // several scene cues = a real setting
    if (/\b(in|on|at|under|beside|inside|outside|behind|above)\b/i.test(prompt)) score += 0.15
    return clamp01(score)
  },

  // composition & framing
  format(prompt) {
    return IMG_COMPOSITION.test(prompt) ? 1 : 0
  },

  // technical controls — lighting, lens, aspect, quality, negatives
  constraints(prompt) {
    const hits = (prompt.match(new RegExp(IMG_TECHNICAL.source, 'gi')) ?? []).length
    return clamp01(hits / 3)   // three technical cues = full marks
  },

  // subject detail — the thing itself, specified
  specificity(prompt, lesson) {
    let score = 0
    // the subject, actually described: what it's doing / made of
    const matHits = (prompt.match(new RegExp(IMG_SUBJECT_MATERIAL.source, 'gi')) ?? []).length
    score += clamp01(matHits / 2) * 0.35
    // named colours or palette
    if (IMG_COLOUR.test(prompt)) score += 0.2
    // descriptive adjectives (fluffy, weathered, ornate…)
    const adjectives = (prompt.match(/\b[a-z]{4,}(?:ful|ous|ish|ive|less|able|ed|y)\b/gi) ?? []).length
    score += clamp01(adjectives / 3) * 0.25
    // proper nouns / concrete places-things (Persian, Tokyo, Rajasthani)
    if (/\b[A-Z][a-z]{3,}/.test(prompt.slice(1))) score += 0.1
    // on-topic overlap is a small bonus, never the gate
    const topic = keywords(`${lesson.scenario ?? ''} ${lesson.task ?? ''}`)
    const overlap = keywords(prompt).filter((w) => topic.includes(w)).length
    score += clamp01(overlap / 4) * 0.1
    return clamp01(score)
  },

  // prompt density — image prompts reward packed detail, punish both
  // one-word prompts and rambling paragraphs
  length(prompt, lesson) {
    const words = prompt.trim().split(/\s+/).filter(Boolean).length
    if (lesson.tokenBudget != null) {
      const tokens = estimateTokens(prompt)
      if (tokens <= lesson.tokenBudget) return 1
      return clamp01(1 - (tokens - lesson.tokenBudget) / lesson.tokenBudget)
    }
    if (words < 4) return 0.05          // "a cat"
    if (words < 8) return 0.35
    if (words <= 60) return 1           // the dense sweet spot
    return clamp01(1 - (words - 60) / 60)
  },
}

// Image curriculum weights — each lesson leans on its own teaching point.
// (l1 subject · l2 scene · l3 composition · l4 technical · l5 style refs ·
//  l6 art style · l7 refine · l8 density)
const LESSON_WEIGHTS_IMAGE = {
  l1: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.50, length: 0.15 },
  l2: { role: 0.05, context: 0.50, constraints: 0.10, format: 0.10, specificity: 0.15, length: 0.10 },
  l3: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.50, specificity: 0.15, length: 0.10 },
  l4: { role: 0.05, context: 0.10, constraints: 0.50, format: 0.10, specificity: 0.15, length: 0.10 },
  l5: { role: 0.40, context: 0.10, constraints: 0.10, format: 0.15, specificity: 0.15, length: 0.10 },
  l6: { role: 0.50, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l7: { role: 0.10, context: 0.15, constraints: 0.30, format: 0.20, specificity: 0.15, length: 0.10 },
  l8: { role: 0.05, context: 0.10, constraints: 0.15, format: 0.10, specificity: 0.20, length: 0.40 },
}

// ---------------------------------------------------------------- v3-1b
// STAGE REGISTRY. Six dimension SLOTS are fixed (docs/v3-stages.md §3);
// each stage supplies its own detectors, weights, and human labels for
// those slots. Text's entries below are the exact v1 behaviour — the
// same DETECTORS object and LESSON_WEIGHTS table, referenced, not copied.
// A stage with no entry falls back to text. Stages judge PROMPTS only.

const STAGE_RUBRICS = {
  text: {
    detectors: DETECTORS,
    weights: LESSON_WEIGHTS,
    labels: {
      role: 'Role assigned', context: 'Context given', constraints: 'Limits set',
      format: 'Shape named', specificity: 'Specifics named', length: 'Right length',
    },
  },
  image: {
    detectors: IMAGE_DETECTORS,
    weights: LESSON_WEIGHTS_IMAGE,
    labels: {
      role: 'Art style named',
      context: 'Scene set',
      constraints: 'Technical controls',
      format: 'Framing chosen',
      specificity: 'Subject detailed',
      length: 'Good density',
    },
  },
  // video/audio detectors land with their content packs (v3-3/3-4)
}

/** The rubric bundle for a stage — unknown/absent → text (AC). */
function rubricFor(stageId) {
  return STAGE_RUBRICS[stageId] ?? STAGE_RUBRICS.text
}

/** v3-1b — dimension labels for the live checklist, per stage. */
export function labelsFor(stageId) {
  return rubricFor(stageId).labels
}

/** v2-5d/v3-1b — weights for a lesson within a stage (checklist ordering). */
export function weightsFor(lessonId, stageId = 'text') {
  return rubricFor(stageId).weights[lessonId] ?? DEFAULT_WEIGHTS
}

// ------------------------------------------------------- feedback templates

// Seeded pick: same prompt → same wording; different prompts → variety.
function seedFrom(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  }
  return Math.abs(h)
}

const BAND_OPENERS = {
  low: [
    'This prompt leaves the AI guessing at almost everything.',
    'There is not enough here for a useful answer yet.',
    'A stranger reading this could not help you — neither can the AI.',
  ],
  mid: [
    'A solid start — the core request is there, but it is underpowered.',
    'The AI can work with this, though it will fill gaps with guesses.',
    'Halfway there: the intent is clear, the details are thin.',
  ],
  high: [
    'A strong prompt — clear intent, real detail.',
    'This gives the AI what it needs to be genuinely useful.',
    'Well built — most of what matters is on the page.',
  ],
}

const DIMENSION_FEEDBACK = {
  role: {
    strength: ['Assigning a role frames the whole answer — good move.', 'The role you set carries expertise and tone in one line.'],
    improvement: ['Tell the AI who to be — "act as a…" changes how it answers.', 'A role would frame this: whose advice do you actually want?'],
  },
  context: {
    strength: ['You gave real background — the answer can fit YOUR situation.', 'The context you shared keeps the answer from being generic.'],
    improvement: ['Add the background a helpful stranger would need first.', 'The AI cannot see your situation — describe it in a sentence or two.'],
  },
  constraints: {
    strength: ['Clear boundaries — the answer has fewer ways to go wrong.', 'Your limits (length, tone, what to avoid) sharpen the output.'],
    improvement: ['Set some fences: length, tone, what to avoid, who it is for.', 'Without constraints the AI picks its own — put numbers on what matters.'],
  },
  format: {
    strength: ['You shaped the output — the answer will arrive ready to use.', 'Naming the format (or showing an example) does half the work.'],
    improvement: ['Say what the answer should look like: a list, a table, three lines.', 'Show or name the shape you want — otherwise you get paragraphs.'],
  },
  specificity: {
    strength: ['Concrete details anchor this — names, numbers, the actual thing.', 'You named the specifics, so the answer can be specific back.'],
    improvement: ['Name the exact thing: which one, how much, where, when.', 'Swap the general words for the real details of your case.'],
  },
  length: {
    strength: ['Good economy — everything here earns its place.', 'Tight and readable; nothing buries the request.'],
    improvement: ['Trim the padding — greetings and backstory dilute the request.', 'Shorter would be stronger: keep only what changes the answer.'],
  },
}

// --------------------------------------------------------------- the scorer

/**
 * Score a prompt against a lesson's rubric.
 * Returns the evaluation shape used app-wide, plus a `dimensions`
 * breakdown (0..1 each) that the v2 live checklist will consume.
 */
export function scoreWithRubric(lesson, userPrompt, stageId = 'text') {
  const prompt = (userPrompt ?? '').trim()
  const rubric = rubricFor(stageId)
  const weights = rubric.weights[lesson.id] ?? DEFAULT_WEIGHTS
  const seed = seedFrom(`${lesson.id}|${prompt}`)

  // 1. Detect all six dimensions with THIS stage's detectors
  const dimensions = {}
  for (const dim of Object.keys(rubric.detectors)) {
    dimensions[dim] = rubric.detectors[dim](prompt, lesson)
  }

  // 2. Weighted score → 15..75 (an estimate never rivals a real evaluation)
  const weighted = Object.keys(weights).reduce(
    (sum, dim) => sum + dimensions[dim] * weights[dim], 0)
  const score = Math.round(15 + weighted * 60)

  // 3. Feedback: opener by band, then substance from the weighted best
  //    and worst dimensions (weight × detection = what mattered HERE).
  const band = score < 35 ? 'low' : score < 58 ? 'mid' : 'high'
  const ranked = Object.keys(weights)
    .map((dim) => ({ dim, contribution: dimensions[dim] * weights[dim], raw: dimensions[dim], weight: weights[dim] }))
    .sort((a, b) => b.contribution - a.contribution)

  const strengths = []
  const improvements = [BAND_OPENERS[band][seed % BAND_OPENERS[band].length]]

  // Strengths: up to 2 dimensions that genuinely landed (raw ≥ 0.6)
  ranked.filter((r) => r.raw >= 0.6).slice(0, 2).forEach((r, i) => {
    const lines = DIMENSION_FEEDBACK[r.dim].strength
    strengths.push(lines[(seed + i) % lines.length])
  })
  if (strengths.length === 0) {
    strengths.push('You made an attempt — that is where every good prompt starts.')
  }

  // Improvements: the 2 highest-weight dimensions that missed (raw < 0.5)
  ranked
    .filter((r) => r.raw < 0.5)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .forEach((r, i) => {
      const lines = DIMENSION_FEEDBACK[r.dim].improvement
      improvements.push(lines[(seed + i) % lines.length])
    })

  // 4. Budget flag (Lesson 8)
  const budgetRespected =
    lesson.tokenBudget == null || estimateTokens(prompt) <= lesson.tokenBudget
  if (!budgetRespected) {
    improvements.push(`Over the ${lesson.tokenBudget}-token budget — cut filler words first.`)
  }

  return {
    score,
    strengths,
    improvements: improvements.slice(0, 3),
    rewrittenExample: null, // only a real evaluation can rewrite their prompt
    budgetRespected,
    offline: true,
    dimensions, // v2 live-checklist hook — additive, harmless today
  }
}