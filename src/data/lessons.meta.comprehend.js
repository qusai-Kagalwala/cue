// src/data/lessons.meta.comprehend.js
// v7 CAPSTONE — READING AI OUTPUT. The other stages teach you to make an AI
// understand YOU; this one teaches you to understand the AI — to verify,
// critique, correct, and act on what it gives back. Every lesson shows a
// hand-authored AI response (with deliberate flaws) and asks the learner to
// READ it well, not to write a prompt. The arc: verify (l1-2) -> critique
// (l3-5) -> correct (l6) -> act (l7-8). AI-assisted drafting, hand-curated.
// Voice: the same child-to-elder plain language as the other stage guides.

export const LESSON_META_COMPREHEND = [
  {
    id: 'l1', order: 1, title: 'Read Closely',
    concept:
      'Before judging an AI answer, say back what it actually told you — in your own words. Most mistakes come from acting on what we ASSUMED it said, not what it really said. Reading closely is the first skill.',
    takeaway: 'Restate what the AI actually said before you trust or use it.',
    example: {
      bad: 'ok looks good',
      good: 'So it is saying I should pay the electricity bill online by the 10th to avoid a late fee — let me check that is really what it said',
    },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Spot the Gap',
    concept:
      'An answer can sound complete and still leave out the one thing you needed. The skill is noticing what is MISSING — the question it did not answer, the step it skipped, the case it ignored.',
    takeaway: 'Name what the answer left out, not just what it included.',
    example: {
      bad: 'it explained it well',
      good: 'It told me how to apply for the PAN card but never said which documents I need to attach — that gap is the part I actually needed',
    },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Catch the Flaw',
    concept:
      'AI sounds confident even when it is wrong. Catching the flaw means pointing to the exact error — a wrong number, a bad assumption, a step that does not follow — instead of a vague feeling that something is off.',
    takeaway: 'Point to the exact error, not a vague "this seems wrong".',
    example: {
      bad: 'something feels off',
      good: 'It says the train leaves at 6:00 but earlier it said the journey is 3 hours to reach by 8:00 — those do not add up, the departure time is wrong',
    },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Check the Claim',
    concept:
      'Some answers state things as fact that you cannot take on trust — a figure, a rule, a date. The skill is flagging what needs verifying and what the AI has no real basis for (a made-up "fact" is a hallucination).',
    takeaway: 'Flag the claims that need checking before you rely on them.',
    example: {
      bad: 'sounds right',
      good: 'It claims the last date for the form is March 31 with no source — I should not trust that blindly; I will check the official site before relying on it',
    },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Judge the Fit',
    concept:
      'An answer can be correct and well-written and still not solve YOUR problem. Judging the fit means asking whether it actually meets your need and situation — not just whether it sounds good.',
    takeaway: 'Ask if it solves your actual need, not just if it reads well.',
    example: {
      bad: 'nice answer',
      good: 'It gave a great formal complaint letter, but I needed a short WhatsApp message to the shopkeeper — good writing, wrong fit for what I asked',
    },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Correct It',
    concept:
      'Once you have found the biggest problem, the move is to fix it — usually by writing a precise follow-up that tells the AI exactly what to change. A good correction names the problem and the fix together.',
    takeaway: 'Write the follow-up that fixes the biggest problem, precisely.',
    example: {
      bad: 'fix it',
      good: 'You left out the ₹5000 budget I mentioned — redo the shopping list so the total stays under ₹5000 and show the price next to each item',
    },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Extract the Value',
    concept:
      'Few answers are all good or all bad. The skill is separating the usable part from the rest — keeping what helps, dropping what does not — so a flawed answer still moves you forward.',
    takeaway: 'Keep the usable part, discard the rest — do not throw it all out.',
    example: {
      bad: 'half of it was useless',
      good: 'The first three steps for filing the RTI are solid and I will use them; the last part about fees is outdated, so I will drop that and check current fees myself',
    },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Read the Medium',
    concept:
      'The final skill turns the whole stage outward: apply the same reading to AI-GENERATED media — a text, image, audio, video, or a no-code build. You cannot reliably "detect" a fake by looking (the tells change with every model), so the durable move is verification: check the source, the context, and whether it can be corroborated — and decide how much to trust it, rather than guessing real-or-fake.',
    takeaway: 'Do not guess real-or-fake — verify the source and calibrate trust.',
    example: {
      bad: 'looks real to me so it is fine',
      good: 'This photo could be AI-made and I cannot tell by eye, so I will not treat it as proof — I will check where it first appeared and look for the same event from a trusted source before believing or sharing it',
    },
    tokenBudget: null,
  },
]