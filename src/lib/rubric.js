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


// ---------------------------------------------------------------- v3-3/4/5
// VIDEO, AUDIO and CODE detectors. Same six canonical slots, three more
// vocabularies (docs/v3-stages.md §3). Slot → meaning per stage:
//   video: role=style · context=scene continuity · format=shot type ·
//          constraints=camera movement · specificity=subject & action ·
//          length=timing & pacing
//   audio: role=voice/instrument · context=mood & setting · format=structure ·
//          constraints=technical (tempo/key/duration) · specificity=timbre ·
//          length=density
//   code:  role=stack & conventions · context=goal/problem · format=interface ·
//          constraints=edge cases · specificity=expected behaviour ·
//          length=scope discipline

// ---- VIDEO ----
const VID_STYLE =
  /\b(warm(er)? (light|tone|colour|color)|cool(er)? (light|tone)|desaturated|saturated|contrast|colou?r grade|grading|cinematic|documentary|film noir|anime|animated|3d animation|stop motion|claymation|hand-?drawn|vhs|8mm|16mm|35mm|film grain|music video|commercial|trailer|vlog|found footage|hyper-?lapse|time-?lapse|slow motion|photorealistic|surreal|dreamlike|retro|vintage|black and white|monochrome)\b/i
const VID_SHOT =
  /\b(close-?up|extreme close-?up|medium shot|wide shot|establishing shot|long shot|full shot|two-?shot|over the shoulder|point of view|pov|aerial|drone shot|bird'?s eye|low angle|high angle|eye level|dutch angle|macro shot|insert shot|tracking shot|follow shot|static shot|locked-?off shot|handheld shot|shot of|footage of|scene of)\b/i
const VID_MOVEMENT =
  /\b(pan(ning)?|tilt(ing)?|dolly|dolly in|dolly out|truck|track(ing)? shot|zoom(ing)? (in|out)|crane|jib|steadicam|handheld|orbit(ing)?|push in|pull (back|out)|static (shot|camera)|locked off|whip pan|follow shot|arc shot|camera (move|movement|motion)|slow(er|ly)? (the )?(camera|move|movement|pan|zoom)|faster (camera|move|pan)|smooth(er)? (move|motion))\b/i
const VID_CONTINUITY =
  /\b(scene|sequence|then|after|next|transition|cut to|match cut|dissolve|fade (in|out)|continu(ity|ous)|same [a-z]+|keep (the )?[a-z]+|hold (the |on )?[a-z]+|unchanged|identical|throughout|begins?|ends?|starts? with|finishes|final frame|first frame|opening|closing)\b/i
const VID_TIMING =
  /\b(\d+\s?(second|sec|s|minute|min)s?|duration|loop(ing|s|ed)?|beat|rhythm|paced?|pacing|fast[- ]cut|slow(ly)?|gradual(ly)?|abrupt|frame rate|\d+\s?fps|24p|60fps)\b/i

const VIDEO_DETECTORS = {
  role: (p) => (VID_STYLE.test(p) ? 1 : 0),
  context(p) {
    const hits = (p.match(new RegExp(VID_CONTINUITY.source, 'gi')) ?? []).length
    let s = clamp01(hits / 2) * 0.55
    if (IMG_SCENE.test(p)) s += 0.3
    const sceneHits = (p.match(new RegExp(IMG_SCENE.source, 'gi')) ?? []).length
    s += clamp01((sceneHits - 1) / 2) * 0.15
    return clamp01(s)
  },
  format: (p) => (VID_SHOT.test(p) ? 1 : 0),
  constraints(p) {
    const hits = (p.match(new RegExp(VID_MOVEMENT.source, 'gi')) ?? []).length
    return clamp01(hits / 2)
  },
  specificity(p) {
    let s = 0
    const mat = (p.match(new RegExp(IMG_SUBJECT_MATERIAL.source, 'gi')) ?? []).length
    s += clamp01(mat / 2) * 0.3
    // motion verbs — the subject DOING something is video's core specificity
    const verbs = (p.match(/\b(follow(s|ing)?|walk(s|ing)?|run(s|ning)?|rid(es|ing)|cycl(es|ing)|driv(es|ing)|danc(es|ing)|shap(es|ing)|pour(s|ing)|open(s|ing)|clos(es|ing)|turn(s|ing)|lift(s|ing)|throw(s|ing)|catch(es|ing)|ris(es|ing)|fall(s|ing)|spin(s|ning)?|shak(es|ing)|fly(ing|s)?|flying|splash(es|ing)?|steam(s|ing)?|whistl(es|ing)|knead(s|ing)|strain(s|ing)|wind(s|ing)|drift(s|ing)|swirl(s|ing)|blow(s|ing)|wav(es|ing)|jump(s|ing)|climb(s|ing)|swim(s|ming)?|scroll(s|ing)|tap(s|ping)|type?(s|ing)|swipe?(s|ing))\b/gi) ?? []).length
    s += clamp01(verbs / 2) * 0.3
    if (IMG_COLOUR.test(p)) s += 0.15
    if (/\b[A-Z][a-z]{3,}/.test(p.slice(1))) s += 0.15
    const adj = (p.match(/\b[a-z]{4,}(?:ful|ous|ish|ive|less|able|ed|y)\b/gi) ?? []).length
    s += clamp01(adj / 3) * 0.1
    return clamp01(s)
  },
  length(p, lesson) {
    const words = p.trim().split(/\s+/).filter(Boolean).length
    if (lesson.tokenBudget != null) {
      const t = estimateTokens(p)
      return t <= lesson.tokenBudget ? 1 : clamp01(1 - (t - lesson.tokenBudget) / lesson.tokenBudget)
    }
    let s = words < 5 ? 0.05 : words < 10 ? 0.4 : words <= 70 ? 1 : clamp01(1 - (words - 70) / 70)
    if (VID_TIMING.test(p)) s = Math.max(s, 0.85) // stating duration IS pacing craft
    return s
  },
}

const LESSON_WEIGHTS_VIDEO = {
  l1: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.50, length: 0.15 },
  l2: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.50, specificity: 0.15, length: 0.10 },
  l3: { role: 0.05, context: 0.10, constraints: 0.50, format: 0.15, specificity: 0.10, length: 0.10 },
  l4: { role: 0.05, context: 0.50, constraints: 0.15, format: 0.10, specificity: 0.10, length: 0.10 },
  l5: { role: 0.10, context: 0.15, constraints: 0.10, format: 0.10, specificity: 0.15, length: 0.40 },
  l6: { role: 0.50, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l7: { role: 0.10, context: 0.35, constraints: 0.30, format: 0.10, specificity: 0.05, length: 0.10 },
  l8: { role: 0.05, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.20, length: 0.45 },
}

// ---- AUDIO ----
const AUD_VOICE =
  /\b(voice|vocals?|narrator|narration|male|female|child|elderly|deep|raspy|breathy|whisper(ed|ing)?|spoken word|choir|acappella|guitar|acoustic guitar|electric guitar|piano|keys|synth(esizer)?|violin|sitar|tabla|flute|bansuri|drums?|percussion|bass|strings|brass|saxophone|harmonium|dholak|orchestra|band|solo)\b/i
const AUD_MOOD =
  /\b(mood|feel(ing)?|atmosphere|ambien(t|ce)|calm|peaceful|melanchol(y|ic)|sad|joyful|uplifting|energetic|dramatic|tense|eerie|haunting|warm|nostalgic|romantic|playful|epic|meditative|devotional|festive|somber|hopeful)\b/i
const AUD_STRUCTURE =
  /\b(intro|verse|chorus|hook|bridge|outro|refrain|build(-?up)?|drop|breakdown|loop(ed|ing)?|repeat(s|ing)?|section|structure|arrangement|begins?|ends?|fade (in|out)|call and response|alaap|antara|mukhda)\b/i
const AUD_TECHNICAL =
  /\b(\d{2,3}\s?bpm|tempo|beats per minute|key of|in [a-g](#|b)? (major|minor)|major|minor|scale|raag|raga|taal|time signature|\d\/\d|\d+\s?(second|sec|minute|min)s?|duration|stereo|mono|reverb|delay|echo|compress(ed|ion)|eq|lo-?fi|hi-?fi|8-?bit|sample rate|mix(ed|ing)?|master(ed|ing)?)\b/i
const AUD_GENRE =
  /\b(genre|lo-?fi|hip-?hop|rap|rock|pop|jazz|blues|classical|carnatic|hindustani|folk|indie|electronic|edm|house|techno|trance|ambient|cinematic score|soundtrack|bollywood|ghazal|qawwali|bhajan|sufi|reggae|country|metal|punk|r&b|soul|funk|disco|orchestral)\b/i

const AUDIO_DETECTORS = {
  role(p) {
    let s = 0
    if (AUD_VOICE.test(p)) s += 0.6
    if (AUD_GENRE.test(p)) s += 0.4
    return clamp01(s)
  },
  context: (p) => (AUD_MOOD.test(p) ? 1 : 0),
  format(p) {
    const hits = (p.match(new RegExp(AUD_STRUCTURE.source, 'gi')) ?? []).length
    return clamp01(hits / 2)
  },
  constraints(p) {
    const hits = (p.match(new RegExp(AUD_TECHNICAL.source, 'gi')) ?? []).length
    return clamp01(hits / 2)
  },
  specificity(p) {
    let s = 0
    const inst = (p.match(new RegExp(AUD_VOICE.source, 'gi')) ?? []).length
    s += clamp01(inst / 2) * 0.4
    if (/\b[A-Z][a-z]{3,}/.test(p.slice(1))) s += 0.15
    const adj = (p.match(/\b[a-z]{4,}(?:ful|ous|ish|ive|less|able|ed|y|ing)\b/gi) ?? []).length
    s += clamp01(adj / 3) * 0.3
    if (/\d/.test(p)) s += 0.15
    return clamp01(s)
  },
  length(p, lesson) {
    const words = p.trim().split(/\s+/).filter(Boolean).length
    if (lesson.tokenBudget != null) {
      const t = estimateTokens(p)
      return t <= lesson.tokenBudget ? 1 : clamp01(1 - (t - lesson.tokenBudget) / lesson.tokenBudget)
    }
    return words < 4 ? 0.05 : words < 8 ? 0.4 : words <= 60 ? 1 : clamp01(1 - (words - 60) / 60)
  },
}

const LESSON_WEIGHTS_AUDIO = {
  l1: { role: 0.10, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.45, length: 0.15 },
  l2: { role: 0.10, context: 0.50, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l3: { role: 0.50, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l4: { role: 0.10, context: 0.10, constraints: 0.10, format: 0.50, specificity: 0.10, length: 0.10 },
  l5: { role: 0.10, context: 0.10, constraints: 0.50, format: 0.10, specificity: 0.10, length: 0.10 },
  l6: { role: 0.45, context: 0.15, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l7: { role: 0.10, context: 0.20, constraints: 0.25, format: 0.20, specificity: 0.15, length: 0.10 },
  l8: { role: 0.10, context: 0.10, constraints: 0.15, format: 0.10, specificity: 0.15, length: 0.40 },
}

// ---- CODE ----
const CODE_STACK =
  /\b(python|javascript|typescript|java|c\+\+|c#|go|golang|rust|ruby|php|swift|kotlin|sql|html|css|react|vue|angular|svelte|node(\.?js)?|express|django|flask|fastapi|spring|rails|laravel|next(\.?js)?|tailwind|bootstrap|pandas|numpy|pytorch|tensorflow|postgres(ql)?|mysql|mongodb|sqlite|redis|docker|kubernetes|aws|version \d|es\d{4}|python ?3)\b/i
const CODE_GOAL =
  /\b(i (want|need|am building|have)|we (need|want|are)|the goal|purpose|so that|in order to|currently|existing|my (app|script|project|code|function)|this (script|function|component|file)|bug|error|failing|broken|slow|refactor|optimi[sz]e|migrate|add(ing)? a|implement)\b/i
const CODE_INTERFACE =
  /\b(function|method|class|component|endpoint|api|route|returns?|parameters?|arguments?|inputs?|outputs?|signature|type|interface|props|schema|json|dict|list|array|object|takes? a|accepts?|response|payload|cli|command)\b/i
const CODE_EDGE =
  /\b(edge case|error handling|handle|invalid|empty|null|none|undefined|missing|duplicate|timeout|retry|fail(s|ure)?|exception|try\/?except|catch|validate|validation|sanitiz|constraint|must not|should not|don'?t|avoid|no external|without using|only use|standard library|no dependencies|performance|memory|large (file|dataset|input))\b/i
const CODE_FORMAT =
  /\b(only (the )?code|no explanation|with comments|docstring|type hints?|typed|readable|pep ?8|eslint|prettier|formatted|as a (function|class|module|snippet)|single file|separate files?|include tests?|unit tests?|example usage|step by step|explain)\b/i

const CODE_DETECTORS = {
  role: (p) => (CODE_STACK.test(p) ? 1 : 0),
  context(p) {
    let s = CODE_GOAL.test(p) ? 0.6 : 0
    const sentences = p.split(/[.!?\n]+/).filter((x) => x.trim().length > 12)
    s += clamp01(sentences.length / 3) * 0.25
    if (/```|\bcode\b|\bsnippet\b/i.test(p)) s += 0.15
    return clamp01(s)
  },
  format(p) {
    const hits = (p.match(new RegExp(CODE_FORMAT.source, 'gi')) ?? []).length
    return clamp01(hits / 2)
  },
  constraints(p) {
    const hits = (p.match(new RegExp(CODE_EDGE.source, 'gi')) ?? []).length
    return clamp01(hits / 2)
  },
  specificity(p) {
    let s = 0
    const iface = (p.match(new RegExp(CODE_INTERFACE.source, 'gi')) ?? []).length
    s += clamp01(iface / 3) * 0.5
    if (/\d/.test(p)) s += 0.2
    if (/[`'"][^`'"]{2,}[`'"]|\b[a-z_]+\(\)|\b[a-z]+[A-Z][a-z]+\b/.test(p)) s += 0.3 // names/identifiers
    return clamp01(s)
  },
  length(p, lesson) {
    const words = p.trim().split(/\s+/).filter(Boolean).length
    if (lesson.tokenBudget != null) {
      const t = estimateTokens(p)
      return t <= lesson.tokenBudget ? 1 : clamp01(1 - (t - lesson.tokenBudget) / lesson.tokenBudget)
    }
    // code prompts tolerate length — precision matters more than brevity
    return words < 6 ? 0.1 : words < 12 ? 0.5 : words <= 120 ? 1 : clamp01(1 - (words - 120) / 120)
  },
}

const LESSON_WEIGHTS_CODE = {
  l1: { role: 0.10, context: 0.10, constraints: 0.10, format: 0.10, specificity: 0.45, length: 0.15 },
  l2: { role: 0.10, context: 0.50, constraints: 0.10, format: 0.10, specificity: 0.10, length: 0.10 },
  l3: { role: 0.10, context: 0.10, constraints: 0.10, format: 0.50, specificity: 0.10, length: 0.10 },
  l4: { role: 0.10, context: 0.10, constraints: 0.50, format: 0.10, specificity: 0.10, length: 0.10 },
  l5: { role: 0.10, context: 0.15, constraints: 0.15, format: 0.35, specificity: 0.15, length: 0.10 },
  l6: { role: 0.50, context: 0.15, constraints: 0.10, format: 0.05, specificity: 0.10, length: 0.10 },
  l7: { role: 0.10, context: 0.25, constraints: 0.25, format: 0.15, specificity: 0.15, length: 0.10 },
  l8: { role: 0.10, context: 0.10, constraints: 0.15, format: 0.10, specificity: 0.20, length: 0.35 },
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
  video: {
    detectors: VIDEO_DETECTORS,
    weights: LESSON_WEIGHTS_VIDEO,
    labels: {
      role: 'Style set', context: 'Scene continuity', constraints: 'Camera movement',
      format: 'Shot type', specificity: 'Subject & action', length: 'Timing & pacing',
    },
  },
  audio: {
    detectors: AUDIO_DETECTORS,
    weights: LESSON_WEIGHTS_AUDIO,
    labels: {
      role: 'Voice / instrument', context: 'Mood set', constraints: 'Technical details',
      format: 'Structure named', specificity: 'Timbre detailed', length: 'Right density',
    },
  },
  code: {
    detectors: CODE_DETECTORS,
    weights: LESSON_WEIGHTS_CODE,
    labels: {
      role: 'Stack named', context: 'Goal explained', constraints: 'Edge cases',
      format: 'Output shape', specificity: 'Interface defined', length: 'Scope discipline',
    },
  },
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