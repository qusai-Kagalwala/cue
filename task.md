# v5 — The Agentic Track (planning doc)

**Status:** ✅ COMPLETE (shipped in v5–v7). All four agentic stages (Agent,
Context, Automation, System) are live, plus the Reading capstone (v7) that
followed them. This doc is kept as the original planning record; the thesis
below is what drove the build.

**The thesis:** as base models get smarter, single-prompt crafting matters
less, but *instructing agents, designing context, and briefing automations*
matter more. These are still communication skills — Cue's core thesis survives
by teaching the higher-order version. This is Cue's answer to "how do you stay
relevant as models improve."

**The key architectural fact that makes this cheap:** a stage in Cue is a
**content pack + a weights table**, flowing through screens that never branch on
stage id (the `docs/v3-stages.md` contract). Text, Image, Video, Audio, and Code
already proved the recipe. An agentic stage is the *same recipe pointed at a new
domain* — no new screens, no new architecture, no backend. The only real work is
authoring content and one new rubric per stage.

---

## Scope decision — start with ONE stage, not four

Do NOT build RAG + Coding Agent + Automation + Agent Instructions at once. Pick
**one** as the pilot, prove the recipe extends to agentic content, then decide if
the others are worth it based on how the pilot lands.

**Recommended pilot: the "Coding Agent Brief" stage.** Reasons:
- Clearest, most concrete rubric (scope, constraints, acceptance criteria are
  objectively detectable in text).
- Largest, most reachable power-user audience (every developer uses Copilot /
  Claude Code / Cursor now).
- Least abstract to teach — a good brief vs. a bad brief is obvious.

(RAG/context-design and automation-briefing are more abstract; agent-instruction
design is valuable but the hardest to score. Hold them.)

---

## What ONE new stage requires (the exact contract)

Copy the Code stage's file set — it's the closest analog. Each item below is one
file, mirroring an existing one:

| Piece | New file (mirror of) | What it holds |
|---|---|---|
| Lesson metadata | `lessons.meta.agent.js` (← `lessons.meta.code.js`) | 8 lesson titles/takeaways reframed for agent-briefing |
| Solo scenarios | `scenarios.agent.solo.js` (← `.code.solo`) | 8 assessment scenarios |
| Assisted scenarios | `scenarios.agent.assisted.js` (← `.code.assisted`) | 8 rehearsal scenarios |
| Guided scenarios | `scenarios.agent.guided.js` (← `.code.guided`) | 8 fill-in skeletons |
| Rubric | new `AGENT_DETECTORS` + `LESSON_WEIGHTS_AGENT` in `rubric.js` | the scoring brain (the real work) |
| Proxy framing | new `agent` entry in `STAGE_FRAMING` in `api/evaluate.js` | how Gemini scores this stage |
| Registration | one entry in `STAGES` in `stages.js` | wires it all together |
| Model guide | new `agent` entry in `modelGuide.js` | Studio's "which tool" panel |

**Nothing else changes.** No screen, no nav, no storage. The picker teases it
automatically; the ladder, scoring, autopsy, checklist, Studio all just work.

---

## The rubric is the only hard part — design it first

The six dimensions stay the SHAPE, but their *meaning* shifts for agent-briefing.
Proposed mapping (this is the design decision to lock before authoring content):

| Cue dimension | For a coding-agent brief, means… |
|---|---|
| role | which agent / what expertise it should assume |
| context | the codebase facts: language, framework, existing files, conventions |
| constraints | what NOT to touch, style rules, dependencies to avoid, scope limits |
| format | expected output shape: a diff, a full file, a PR description, tests |
| specificity | the exact signature, acceptance criteria, example input/output |
| length | scope discipline — one clear task, not a sprawling everything-request |

Detectors are text patterns (like the existing ones): e.g. `constraints`
detector looks for "don't change / keep / only / must not / preserve"; `format`
looks for "return a diff / full file / with tests / PR description". Author
these the same way `CODE_DETECTORS` was authored.

---

## Manageable ticket breakdown (one ticket ≈ one session ≈ one commit)

Following your standing "one ticket = one session = one commit" discipline:

**Ticket A5-1 — Rubric design + detectors (do this FIRST, it's the brain)**
- Add `AGENT_DETECTORS` (six detectors, text patterns) and
  `LESSON_WEIGHTS_AGENT` (per-lesson weights) to `rubric.js`.
- Register `agent` in `STAGE_RUBRICS` with detectors + weights + labels.
- Verify: `scoreWithRubric` returns sane scores + autopsy for a good vs. bad
  agent brief. Build + lint clean.
- *No content yet — just prove the scoring works with hand-typed test briefs.*

**Ticket A5-2 — Proxy framing**
- Add an `agent` entry to `STAGE_FRAMING` in `api/evaluate.js` (persona + craft
  guidance so Gemini scores agent briefs correctly).
- Add `agent` to `modelGuide.js` (Claude Code / Copilot / Cursor, when-best,
  how-to tip).
- Verify: proxy `lesson` mode with `stage:'agent'` returns valid scored JSON.

**Ticket A5-3 — Guided content (the gentlest rung)**
- Author `scenarios.agent.guided.js`: 8 fill-in-the-blank skeletons teaching
  each dimension.
- Register nothing yet; just the file.

**Ticket A5-4 — Assisted content**
- Author `scenarios.agent.assisted.js`: 8 rehearsal scenarios.

**Ticket A5-5 — Solo content + lesson metadata**
- Author `scenarios.agent.solo.js` (8 assessments) + `lessons.meta.agent.js`
  (titles, takeaways).

**Ticket A5-6 — Register the stage + calibrate**
- Add the `agent` entry to `STAGES` in `stages.js` (unlock it).
- Full build + lint. Manual pass: play the stage end-to-end, confirm scoring
  feels right, autopsy/checklist/Studio all work for it.
- Calibrate weights if scores skew (same calibration process as prior stages).

**Ticket A5-7 (optional) — Docs**
- Note the new stage in README + roadmap. Update `docs/v3-stages.md` if the
  agentic content revealed any contract nuance.

---

## Honest risks to keep in view

1. **Audience shift.** This targets developers/power users, not the
   student/everyday/elder core. It's a broadening, not a deepening. Watch whether
   it dilutes the beginner focus or opens a healthy advanced track.
2. **Rubric authoring is real work.** A5-1 is not a copy-paste; the detectors
   need genuine design and tuning. Budget a full focused session for it.
3. **Sequence after launch.** Building an advanced track before you have
   beginner users is premature. Let launch signal whether power users show up
   and want this.
4. **Resist scope creep.** ONE stage, prove it, then decide. Do not let this
   become "add all four agentic stages" — that's a v2-company effort, not a
   capstone feature.

---

## The one-line summary

An agentic stage is not a new product — it's the **existing content-pack recipe
pointed at agent-briefing**, gated behind one new rubric. Cheap, on-thesis,
constraint-respecting. The right *first thing to build after launch*, not the
last thing before it.