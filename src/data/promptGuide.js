// src/data/promptGuide.js
// v8 — "what to craft in each mode." A plain-language field guide: for every
// stage, the ingredients that make a strong prompt in that medium, mapped to the
// six things Cue actually scores. This is reference metadata — the Studio, the
// Programme, or an in-lesson tooltip can all read it. One entry per stage id.
//
// Shape per stage:
//   craft   — a one-line "what you're really writing" summary
//   include — the ingredients to put in the prompt (ordered by leverage)
//   example — a short strong example of the mode
//   avoid   — the most common mistake in that mode
// Reading (comprehend) is intentionally different: it's not a prompt-writing
// mode, so its entry describes what to LOOK FOR when reading an AI's answer.

export const PROMPT_GUIDE = {
  text: {
    craft: 'A clear ask with a role, the context, and the shape you want back.',
    include: [
      'A role for the AI ("act as a...")',
      'The context and who it\'s for',
      'Limits (length, tone, what to avoid)',
      'The output shape (list, email, table, steps)',
      'Specifics — names, numbers, the actual details',
    ],
    example: 'Act as a careful editor. Rewrite this email to a landlord to sound firm but polite, under 120 words, keeping the move-out date of the 15th.',
    avoid: 'A bare command with no role, context, or shape ("write an email").',
  },
  image: {
    craft: 'A described scene: subject, style, framing, and the technical look.',
    include: [
      'The subject, in detail',
      'An art style or medium (photo, oil painting, 3D render)',
      'The scene / setting around it',
      'Framing (close-up, wide, aerial) and aspect ratio',
      'Technical controls (lighting, lens, mood)',
      'Negative prompts — what to keep out',
    ],
    example: 'A close-up photo of an old brass compass on a weathered map, warm window light, shallow depth of field, 35mm, muted tones. No text, no hands.',
    avoid: 'Naming only the subject with no style, light, or framing ("a compass").',
  },
  video: {
    craft: 'A shot described over time: subject, camera movement, and pacing.',
    include: [
      'The subject and its action',
      'An overall style / look',
      'Camera movement (pan, dolly, static)',
      'Shot type (wide, close, tracking)',
      'Scene continuity across the clip',
      'Timing and pacing (slow, rapid cuts)',
    ],
    example: 'A slow dolly-in on a lone lighthouse at dusk, waves crashing below, cinematic teal-and-orange grade, 5 seconds, calm and building.',
    avoid: 'Describing a still image and forgetting movement, camera, or timing.',
  },
  audio: {
    craft: 'A described sound: the voice or instrument, mood, and structure.',
    include: [
      'The voice or instrument',
      'The mood / emotion',
      'Structure (intro, build, drop, outro)',
      'Timbre and texture (warm, bright, gritty)',
      'Technical details (tempo, key, format)',
      'The right density — not too busy',
    ],
    example: 'A warm acoustic guitar loop, 90 BPM, mellow and hopeful, simple fingerpicked intro building to a fuller strum, clean and uncluttered.',
    avoid: 'Naming a genre only, with no mood, structure, or texture ("lofi beat").',
  },
  code: {
    craft: 'A precise spec: the goal, the stack, the interface, and edge cases.',
    include: [
      'The goal — what it should do',
      'The stack / language and versions',
      'The interface (inputs, outputs, signatures)',
      'Edge cases and error handling',
      'The output shape (a function, a file, a diff)',
      'Scope — what NOT to build',
    ],
    example: 'Write a Python 3.11 function `parse_upi(id: str) -> dict` that validates a UPI ID, returns {handle, bank}, raises ValueError on bad input. Just the function, no CLI.',
    avoid: 'Asking for a feature with no stack, interface, or scope ("make a parser").',
  },
  agent: {
    craft: 'A brief for an AI that edits your codebase — task plus guardrails.',
    include: [
      'The task, framed for an agent',
      'The codebase / files it can touch',
      'Guardrails — what it must NOT change',
      'Acceptance criteria (how you\'ll know it\'s done)',
      'The output shape (a PR, a diff, tests)',
      'Scope discipline — one job, bounded',
    ],
    example: 'In `src/auth/`, add rate-limiting to the login route. Don\'t touch the DB schema. Done when: 5 attempts/min enforced, a test covers it, existing tests pass. Return a diff.',
    avoid: 'A vague task with no guardrails or acceptance criteria ("fix the auth").',
  },
  rag: {
    craft: 'The right context, well-structured, so the AI answers from your material.',
    include: [
      'The task framed clearly',
      'The sources / documents to use',
      'Cutting the noise — only what\'s relevant',
      'Clear structure (headings, delimiters)',
      'Keeping it on-target to the question',
      'The right amount — enough, not a data dump',
    ],
    example: 'Using only the pasted refund policy below, answer: is a 40-day-old opened item refundable? Quote the exact clause. [policy text...]',
    avoid: 'Dumping everything in with no structure and hoping the AI finds it.',
  },
  automation: {
    craft: 'A workflow spec: the trigger, the steps, the systems, and conditions.',
    include: [
      'The trigger — what starts it',
      'The systems / apps involved',
      'The steps, in order',
      'Conditions and branches (if/then)',
      'The output — what it produces',
      'Scope — one clear workflow',
    ],
    example: 'When a form is submitted (Google Forms), if the budget field > ₹50k, add a row to Sheet "Big" and Slack #sales; else add to Sheet "Small". Nothing more.',
    avoid: 'Describing a goal with no trigger, steps, or conditions ("automate leads").',
  },
  system: {
    craft: 'The standing rules that govern an AI on every turn — identity to limits.',
    include: [
      'The identity — who the AI is',
      'The scope — what it does and doesn\'t handle',
      'Hard boundaries and refusals',
      'The style / voice it should use',
      'Concrete rules (numbered, explicit)',
      'A tight ruleset — no bloat',
    ],
    example: 'You are a support bot for a bank. Only answer account and card questions. Never give financial advice or share internal data. Be brief and formal. If unsure, escalate to a human.',
    avoid: 'A one-off request instead of durable rules that hold every turn.',
  },
  // Reading is NOT a prompt-writing mode — it's about reading an AI's answer.
  comprehend: {
    craft: 'Not a prompt — this is reading an AI\'s answer well. Here\'s what to look for.',
    include: [
      'Grounded — refer to what it actually said',
      'Specific — name the exact gap or claim',
      'Critical — question, don\'t just accept',
      'Accurate — is the answer actually correct?',
      'Actionable — what\'s the fix or next step?',
      'Discerning — what to trust, verify, or discard',
    ],
    example: 'The answer says the deadline is March 31 with no source — I won\'t trust that; I\'ll check the official site. The rest of the steps are sound and I\'ll use them.',
    avoid: 'Accepting a fluent answer at face value, or guessing real-vs-fake by eye.',
  },
}

/** Guide for a stage, defensively falling back to text. */
export function promptGuideFor(stageId) {
  return PROMPT_GUIDE[stageId] ?? PROMPT_GUIDE.text
}