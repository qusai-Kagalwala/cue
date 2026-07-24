// src/data/lessons.meta.image.js
// v3-2b — IMAGE STAGE curriculum. Same 8-lesson arc as text, taught for
// image generators. Each lesson carries the concept, the takeaway rule,
// and one bad→good pair the learner sees before they write.
// AI-assisted drafting, hand-curated — same pipeline honesty as text.

export const LESSON_META_IMAGE = [
  {
    id: 'l1',
    order: 1,
    title: 'Name the Subject',
    concept:
      'An image generator draws exactly what you name — and invents the rest. "A cat" gives you a random cat. Say which cat: what it is, what it looks like, what it is doing.',
    takeaway: 'Name the thing, not the category — breed, colour, action, material.',
    example: {
      bad: 'a cat',
      good: 'A fluffy orange Persian cat sitting upright, green eyes, long whiskers',
    },
    tokenBudget: null,
  },
  {
    id: 'l2',
    order: 2,
    title: 'Set the Scene',
    concept:
      'A subject floating in nowhere looks like a cut-out. Where is it? What time of day, what weather, what is behind it? The scene is half the picture.',
    takeaway: 'Every subject stands somewhere — say where, when, and in what weather.',
    example: {
      bad: 'a chai stall',
      good: 'A roadside chai stall at dawn, monsoon drizzle, wet street reflecting the kettle steam',
    },
    tokenBudget: null,
  },
  {
    id: 'l3',
    order: 3,
    title: 'Composition & Framing',
    concept:
      'The same subject and scene look completely different close-up versus wide, from above versus eye level. Framing is a choice — make it, or the model makes it for you.',
    takeaway: 'Choose the shot: how close, from what angle, and what fills the frame.',
    example: {
      bad: 'a potter working',
      good: 'Close-up of a potter\'s hands shaping wet clay, low angle, wheel filling the foreground',
    },
    tokenBudget: null,
  },
  {
    id: 'l4',
    order: 4,
    title: 'Technical Controls',
    concept:
      'Lighting, lens, depth of field, aspect ratio, detail level — these are the dials photographers and artists reach for, and image models understand every one of them.',
    takeaway: 'Light it and lens it: golden hour, 85mm, shallow depth of field, 16:9.',
    example: {
      bad: 'a nice portrait of a grandmother',
      good: 'Portrait of a grandmother, golden hour side lighting, 85mm lens, shallow depth of field, warm tones',
    },
    tokenBudget: null,
  },
  {
    id: 'l5',
    order: 5,
    title: 'Style References',
    concept:
      'Describing a style takes a paragraph; naming one takes three words. Reference a medium, a movement, or a recognisable look and the model locks onto it instantly.',
    takeaway: 'Point at a style you know — medium, movement, or era — instead of describing it.',
    example: {
      bad: 'make it look old-fashioned and hand-painted with soft edges',
      good: 'Watercolour illustration, loose brush strokes, muted vintage storybook palette',
    },
    tokenBudget: null,
  },
  {
    id: 'l6',
    order: 6,
    title: 'Choose the Art Style',
    concept:
      'Photorealistic, anime, 3D render, oil painting, line art, concept art — the art style decides everything about how the image feels. It is the single biggest lever you have.',
    takeaway: 'Decide what KIND of image it is before anything else — photo, painting, or render.',
    example: {
      bad: 'a temple on a hill',
      good: 'Matte painting of a hilltop temple at dusk, concept-art style, dramatic scale, painterly clouds',
    },
    tokenBudget: null,
  },
  {
    id: 'l7',
    order: 7,
    title: 'Refine the Render',
    concept:
      'The first image is a draft. Keep what worked, name what to change — tighter crop, warmer light, remove the extra hands — instead of starting from scratch.',
    takeaway: 'Change one thing at a time, and say what to keep.',
    example: {
      bad: 'this is wrong, try again',
      good: 'Same scene and lighting, but tighter crop on the face, warmer tones, no text in frame',
    },
    tokenBudget: null,
  },
  {
    id: 'l8',
    order: 8,
    title: 'Dense Prompting',
    concept:
      'Image prompts reward packing, not padding. Every word should add a visual — drop the polite filler, keep the nouns, adjectives, and technical terms that change what you see.',
    takeaway: 'No sentences, just signal — subject, scene, style, technical, in that order.',
    example: {
      bad: 'Could you please create for me a really beautiful image of a woman who is dancing, thank you',
      good: 'Kathak dancer mid-spin, red and gold costume, temple courtyard at dusk, motion blur on the skirt, cinematic lighting, 50mm',
    },
    tokenBudget: 45,
  },
]