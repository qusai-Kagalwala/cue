# v2-5a — Practice Content Pipeline (Work Kit)

**Goal:** 48 curated scenarios — 8 lessons × 3 personas × 2 tiers
(guided + assisted). Guided ones also carry a fill-in-the-blank skeleton.
**Budget:** one generation afternoon (16 prompts) + one curation day.
**Rule:** generation drafts, YOU decide. Nothing ships uncurated — same
pipeline honesty as the original 24 ("AI-assisted generation with human
curation, seeded from user-interview scenarios").

---

## 1. Output format (curate INTO this — v2-5b consumes it directly)

```js
// scenarios.assisted.js shape (per lesson, per persona):
{ scenario: '...', task: '...' }

// scenarios.guided.js shape — adds the skeleton:
{
  scenario: '...',
  task: '...',
  skeleton: [
    { text: 'Suggest ' },
    { blank: 'how many ideas', hint: 'a number' },
    { text: ' veg dinner recipes under ' },
    { blank: 'time limit', hint: 'minutes' },
    { text: ' using ' },
    { blank: 'your ingredients', hint: '2-3 things in your kitchen' },
    { text: '.' },
  ],
}
```

Skeleton = alternating `{text}` and `{blank, hint}` parts. The learner
fills only the blanks; assembled prompt = concatenation. Design blanks so
that ANY sane fill produces a decent prompt — guided is nearly
impossible to fail (roadmap rule).

## 2. Tier definitions (paste into every generation prompt)

- **GUIDED** — simpler, smaller-stakes version of the lesson's situation.
  One clear thing to ask for. The scenario should suggest its own answer.
- **ASSISTED** — medium: real-life messiness (a constraint, a wrinkle,
  a second requirement) but still narrower than the Solo originals.
- Both tiers: 2 sentences max for scenario, 1 sentence task, second
  person ("You're…"), Indian everyday texture like the seeds — kirana,
  local trains, society WhatsApp groups, tiffin, board exams, monsoon.
  Never reuse the seed scenarios' exact situations.

## 3. The master generation prompt (fill 4 slots, run 16 times)

> You write practice scenarios for "Cue", an app teaching prompt writing
> through Indian everyday situations. Style seeds below show the voice —
> match their texture, never their exact situations.
>
> LESSON: {L# — title}. Teaching point: {paste concept from lessons.js}
> TIER: {paste the GUIDED or ASSISTED definition from section 2}
> PERSONAS: student (college life, exams, assignments, hostel/home),
> everyday (household, family incl. elders, festivals, travel, health),
> professional (office, clients, email, meetings, deadlines)
>
> STYLE SEEDS (voice reference only):
> {paste 2–3 scenario+task pairs from lessons.js for this lesson}
>
> Generate 3 candidate scenarios PER PERSONA (9 total) for this lesson
> and tier. Each candidate: scenario (≤2 sentences, second person),
> task (1 sentence, imperative, achievable in one prompt).
> {GUIDED ONLY: also draft a fill-in-the-blank skeleton per candidate —
> a template sentence with 2–4 blanks, each blank labeled with a short
> hint. Blanks must be answerable from the scenario itself.}
> Output as a numbered list grouped by persona. No commentary.

**Run order:** L1 guided, L1 assisted, L2 guided, … L8 assisted.
Where to run it: any AI you have quota on — this is offline tooling, not
the app; your Cue proxy is NOT for this. 16 calls, one afternoon.
Save every raw output to a scratch file before curating anything.

## 4. Curation checklist (day 2 — pick 1 of 3 per slot, then edit)

Reject or rewrite any candidate that fails one of these:
- [ ] The scenario's *specific failure mode* matches THIS lesson's
      concept (a guided L4 scenario must invite constraints, not vagueness)
- [ ] Would your interviewees recognize this moment? (the biryani test)
- [ ] Tier feels right: guided = your nani could do it; assisted = a
      thoughtful attempt needed; neither rivals the Solo originals
- [ ] No AI-isms ("delve", "leverage", "in today's world"), no repeated
      situations across the 48, nothing that duplicates a Solo scenario
- [ ] Guided skeletons: every blank answerable from the scenario; any
      sane fill scores ≥ the rubric's mid band (spot-check 2–3 by
      pasting assembled prompts into Freeplay… or just eyeball with the
      rubric dimensions in mind — zero quota preferred)
- [ ] Personalization pass: swap generic details for real ones, exactly
      like the T6.1 pass (names, dishes, routes, subjects)

## 5. Where it lands

Curated results go into two new files (created properly in v2-5b's
restructure — for now, collect them in `scratch-guided.md` and
`scratch-assisted.md` in this exact shape so 5b is copy-paste):
- 24 assisted: `{ lessonId, persona, scenario, task }`
- 24 guided: same + `skeleton`

## 6. Ship gate for this ticket
- [ ] 48 slots filled, every one hand-touched
- [ ] 24 skeletons drafted, blanks-answerable check passed
- [ ] decisions.md line: "v2-5a: practice content generated from Solo
      seeds, 3-candidates-pick-1, hand-curated per checklist."