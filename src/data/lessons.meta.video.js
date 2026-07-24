// src/data/lessons.meta.video.js
// v3-3b — VIDEO STAGE curriculum. Same 8-lesson arc, taught for video
// generators (Veo, Runway, Kling). Each lesson carries the concept, the
// takeaway rule, and one bad→good pair the learner sees before writing.
// AI-assisted drafting, hand-curated — same pipeline honesty as text.
//
// Weights note: the video rubric leans l1→subject&action, l2→shot type,
// l3→camera movement, l4→continuity, l5→timing, l6→style, l8→density.

export const LESSON_META_VIDEO = [
  {
    id: 'l1',
    order: 1,
    title: 'Name the Subject & Action',
    concept:
      'A video is a subject DOING something. Name both. "A dog" gives you a still-life that happens to move; "a wet golden retriever shaking off river water" gives you a shot.',
    takeaway: 'Name what it is and what it is doing — the verb is half the shot.',
    example: {
      bad: 'a video of a dog',
      good: 'A wet golden retriever shaking off river water on a stone bank, droplets flying, slow motion close-up',
    },
    tokenBudget: null,
  },
  {
    id: 'l2',
    order: 2,
    title: 'Choose the Shot',
    concept:
      'How much of the world is in frame changes the meaning entirely. A close-up on hands says craft; a wide establishing shot says place. Choose, or the model chooses for you.',
    takeaway: 'Say how close you are: close-up, medium, wide, or establishing.',
    example: {
      bad: 'someone making chai',
      good: 'Close-up shot of hands straining chai into a glass, steam rising, kettle in the background',
    },
    tokenBudget: null,
  },
  {
    id: 'l3',
    order: 3,
    title: 'Move the Camera',
    concept:
      'A static camera and a moving one tell different stories. Dolly in for intimacy, track alongside for energy, orbit for reveal, lock off for stillness. Camera movement is grammar.',
    takeaway: 'Say what the camera does: static, dolly, track, pan, orbit, or handheld.',
    example: {
      bad: 'a cyclist riding through a street',
      good: 'Tracking shot following a cyclist through a narrow lane, camera moving alongside at his speed, handheld',
    },
    tokenBudget: null,
  },
  {
    id: 'l4',
    order: 4,
    title: 'Keep Continuity',
    concept:
      'Multi-shot prompts fall apart when the model forgets what stays the same. Anchor the constants — same character, same light, same place — and name the transitions between shots.',
    takeaway: 'Say what stays the same before you say what changes.',
    example: {
      bad: 'a potter working then the finished pot',
      good: 'Same potter, same warm workshop light throughout: dolly in on hands shaping clay, then cut to a wide shot of the finished pot on the shelf',
    },
    tokenBudget: null,
  },
  {
    id: 'l5',
    order: 5,
    title: 'Time & Pacing',
    concept:
      'Video has a length, and length is a creative choice. Eight seconds of slow drift feels nothing like eight seconds of fast cuts. State the duration and the rhythm.',
    takeaway: 'Give it a clock: how many seconds, and how fast it moves.',
    example: {
      bad: 'a sunrise over the sea',
      good: 'A 10-second time-lapse of sunrise over the sea, clouds moving fast, light shifting gradually, slow steady pace',
    },
    tokenBudget: null,
  },
  {
    id: 'l6',
    order: 6,
    title: 'Set the Style',
    concept:
      'Documentary, cinematic, anime, VHS home video, stop motion — the style decides how the footage feels before a single frame renders. It is the largest single lever.',
    takeaway: 'Decide what KIND of footage it is: documentary, cinematic, animated, archival.',
    example: {
      bad: 'a street festival at night',
      good: 'Handheld documentary footage of a street festival at night, film grain, natural available light, slightly desaturated',
    },
    tokenBudget: null,
  },
  {
    id: 'l7',
    order: 7,
    title: 'Refine the Take',
    concept:
      'The first take is a draft. Keep the composition that worked, change the one thing that did not — slower move, warmer light, no cuts — instead of describing the whole shot again.',
    takeaway: 'Name what to keep, then change one thing at a time.',
    example: {
      bad: "that's not right, do it again",
      good: 'Same subject, same framing and documentary style — but slow the camera move by half, warmer light, and hold the final frame for two seconds',
    },
    tokenBudget: null,
  },
  {
    id: 'l8',
    order: 8,
    title: 'Dense Prompting',
    concept:
      'Video prompts must pack six things into a breath: subject, action, shot, movement, style, and duration. No sentences — comma-separated fragments, every word earning its frame.',
    takeaway: 'Subject, action, shot, movement, style, seconds — nothing else.',
    example: {
      bad: 'Please could you make me a really lovely video showing a train journey through the mountains, thank you so much',
      good: 'Toy train winding through misty hills, wide aerial tracking shot, slow orbit, documentary style, golden hour, 8 seconds',
    },
    tokenBudget: 45,
  },
]