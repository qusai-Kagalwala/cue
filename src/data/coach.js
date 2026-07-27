// src/data/coach.js
// v2-19b — The First-Night Coach script for Lesson 1. Six beats that walk
// a brand-new visitor through the challenge screen once. Steps are read by
// CoachOverlay (v2-19a): `target` is a data-coach key on a real element, or
// omitted for a centred message. A step whose target isn't present is
// skipped automatically, so this script is safe on any lesson layout.

export const L1_COACH = [
  {
    // no target → centred welcome
    title: 'Welcome to Cue',
    body: "This is where you'll learn to ask AI for exactly what you want. Here's the thirty-second tour — skip any time.",
  },
  {
    target: 'scenario',
    title: 'The scenario',
    body: 'Every challenge sets a real situation and a task. Read it, then write the prompt you think would work best.',
  },
  {
    target: 'prompt-input',
    title: 'Your prompt',
    body: 'Type your prompt here. This is the whole game — the clearer and more specific you are, the better your score.',
  },
  {
    target: 'token-counter',
    title: 'The token counter',
    body: 'This counts roughly how much your prompt costs the AI to read. Later lessons give you a budget — economy is a skill.',
  },
  {
    target: 'submit',
    title: 'Take the stage',
    body: 'Submit when ready and Cue scores your prompt across six dimensions, with a note on what to sharpen. Ctrl/⌘ + Enter works too.',
  },
  {
    title: "That's it",
    body: 'Eight lessons, three steps each. Finish the core track to unlock new stages — image, video, audio and code. Break a leg.',
  },
]