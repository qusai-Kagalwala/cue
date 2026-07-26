// src/data/lessons.meta.audio.js
// v3-4b — AUDIO STAGE curriculum. Same 8-lesson arc, taught for audio &
// music generators (Suno, Udio, ElevenLabs). Concept + takeaway + one
// bad→good pair each. AI-assisted drafting, hand-curated.
// Weights lean: l1 sound, l2 mood, l3 voice/instrument, l4 structure,
// l5 technical, l6 genre, l7 refine, l8 density.

export const LESSON_META_AUDIO = [
  {
    id: 'l1', order: 1, title: 'Name the Sound',
    concept:
      'Audio models guess everything you leave out. "A song" could be anything. Name what you actually hear: the instrument or voice, and the single defining quality of it.',
    takeaway: 'Name the sound itself — the instrument or voice, not just "music".',
    example: { bad: 'make music', good: 'A solo acoustic guitar, warm and fingerpicked, close and intimate' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Set the Mood',
    concept:
      'The same instruments can feel joyful or grieving. Mood is not decoration — it is the instruction that shapes tempo, key, and dynamics. State how it should feel.',
    takeaway: 'Say how it should feel — calm, tense, joyful, devotional.',
    example: { bad: 'a piano piece', good: 'A slow, melancholic solo piano piece, sparse and reflective, late-night mood' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Choose Voice or Instrument',
    concept:
      'Who or what is making the sound? A female voice, a male narrator, a sitar, a full band — naming the source is the most concrete instruction you can give.',
    takeaway: 'Name the voice or the instruments — precisely, not "some music".',
    example: { bad: 'a devotional track', good: 'A female voice, warm and unhurried, with harmonium and tabla, devotional bhajan feel' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Structure It',
    concept:
      'Sound has shape over time — intro, build, chorus, drop, outro. A prompt that names the structure gives the model an arrangement instead of a loop that goes nowhere.',
    takeaway: 'Give it a shape: intro, verse, chorus, build, outro.',
    example: { bad: 'an upbeat song', good: 'Upbeat pop: soft intro, building verse, big chorus with layered vocals, short outro' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Technical Controls',
    concept:
      'Tempo, key, duration, production style — these are the dials musicians reach for, and audio models understand every one. 90 bpm in A minor is a precise instruction.',
    takeaway: 'Set the numbers: tempo in bpm, the key, and the length.',
    example: { bad: 'a chill beat', good: 'A chill lo-fi beat, 75 bpm, in C minor, vinyl crackle, 2-minute loop' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Pick the Genre',
    concept:
      'Genre carries a hundred decisions at once — instrumentation, rhythm, production, feel. Naming one ("qawwali", "lo-fi hip-hop", "Carnatic") is the largest single lever you have.',
    takeaway: 'Name the genre — it decides more than any other single word.',
    example: { bad: 'a happy Indian song', good: 'An energetic bhangra track, dhol and tumbi, festive and danceable, punchy production' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Refine the Take',
    concept:
      'The first take is a draft. Keep the parts that worked, change one thing — slower tempo, add strings, warmer mix — instead of describing the whole track again.',
    takeaway: 'Keep what worked, change one thing at a time.',
    example: { bad: "that's not it, try again", good: 'Same melody and mood, but slow it to 70 bpm, add soft strings under the chorus, keep the vocals' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Dense Prompting',
    concept:
      'Audio prompts pack instrument, mood, genre, tempo, key, and structure into a breath. No sentences — comma-separated fragments, every word changing what you hear.',
    takeaway: 'Instrument, mood, genre, tempo, key, structure — nothing else.',
    example: {
      bad: 'Please make a really nice calm song that sounds peaceful and relaxing for studying, thanks',
      good: 'Lo-fi study beat, mellow, jazzy keys and soft drums, 70 bpm, D minor, loopable, gentle vinyl crackle',
    },
    tokenBudget: 45,
  },
]