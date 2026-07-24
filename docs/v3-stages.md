# Cue v3 — Stages

**Status:** design note, pre-implementation. Written before Phase A so the
contract exists before the first stage does.

**The idea in one line:** Cue's entire machine — the Opening Act, the
guided → assisted → assessment ladder, eight lessons, XP, the Encore, the
Season Report — becomes a repeatable pattern. A **stage** is a content
pack that flows through that machine unchanged. Text is the main stage;
image, video, audio, and code are stages the same performer walks onto.

**Why this works (the load-bearing insight):** Cue never generates media.
It judges *prompts*, and prompt craft is text-in, text-out regardless of
what the prompt would have produced. An image-prompt evaluation is a text
evaluation with a different rubric — no image model, no new quota class,
no architectural change. The app was accidentally built for this on day
one, when lessons became data and scoring became a weights table.

---

## 1. The mode contract

### What a stage MUST supply

| Piece | Shape | Notes |
|---|---|---|
| Identity | `{ id, label, blurb, locked }` | `id` is the storage key and rubric key |
| Lesson metadata | 8 lessons: `{ id, order, title, concept, takeaway, tokenBudget }` | Same schema as `lessons.meta.js` |
| Solo scenarios | 8 × 3 personas: `{ scenario, task, hints }` | The assessed content — hand-written, interview-sourced |
| Assisted scenarios | 8 × 3 personas: `{ scenario, task }` | Practice tier 2 |
| Guided scenarios | 8 × 3 personas: `{ scenario, task, skeleton[] }` | Practice tier 1; skeleton = alternating `{text}` / `{blank,hint}` |
| Dimension set | 6 named dimensions + detectors | Six is a contract, not a coincidence — see §3 |
| Weights table | Per-lesson weights over those 6 | `LESSON_WEIGHTS_<STAGE>` |
| Proxy prompt variant | One system-prompt builder | Same `responseSchema`, same model chain |
| Audition + Encore content | 4 MCQ pairs, 1 mini task, ≥4 bosses | Optional at launch; falls back to text's if absent |

### What a stage MAY NOT change

- **No screen may branch on stage id.** If `Challenge.jsx` ever contains
  `if (stage === 'image')`, the architecture has failed and forks begin.
- No new dependencies, no new backend surface, no second proxy.
- No change to the ladder (guided → assisted → assessment), the XP rules,
  the streak logic, or the rank ladder.
- No media generation, ever. Stages judge prompts; they don't render.

### What a stage inherits for free

Opening Act · the three-rung ladder with its plain-language guides ·
token counter · rubric scorer + live checklist · the three-tier
evaluation fallback · share cards · Sandbox · library · Season Report ·
Playbill · import/export · themes · animations · voice input.

---

## 2. Shared identity, per-stage progress — DECIDED

One career, many productions.

| Shared across all stages | Per stage |
|---|---|
| Name, XP, level, rank | `currentLessonIndex` |
| Streak | `lessonStage` (which rung) |
| Playbill (achievements) | `lessonScores` |
| Library (tagged by stage) | `practicePaid` ledger |
| Theme, persona, settings | Completion state |
| Audition + callback | Encore/daily claims (per stage per day) |

**Rationale:** a learner who masters image prompting hasn't restarted
their career — the theatre ladder should keep climbing. But "Lesson 3 of
the Image Stage" must not inherit "Lesson 3 of Text" progress, or
completion states lie. Storage shape:

```js
{
  // shared identity — unchanged keys
  name, xp, level, streak, playbill, theme, persona, auditionAttempt, …
  activeStage: 'text',
  stageProgress: {
    text:  { currentLessonIndex, lessonStage, lessonScores, practicePaid },
    image: { … },
  },
}
```

**Migration:** existing saves have flat progress fields. On first load
under v3, they fold into `stageProgress.text` and the flat fields are
dropped. Lossless, one-way, done in `storage.js`'s migrate step.

---

## 3. The dimension mapping

Six dimensions survived every stage sketch — not by design, by
discovery. Every prompting medium asks: *who's speaking, what's the
situation, what's the shape, what are the limits, what's the reference,
how dense is it.* The names change; the questions don't.

| Text (shipped) | Image | Video | Audio | Code |
|---|---|---|---|---|
| role | style / art direction | style / genre | voice or instrument | context: stack & conventions |
| context | scene & setting | scene continuity | mood & setting | goal & problem statement |
| format | composition & framing | shot type | structure (verse/loop) | interface / signature |
| constraints | technical controls (lighting, lens, aspect) | camera movement | technical (tempo, key, length) | edge cases & constraints |
| specificity | subject detail | subject & action | timbre detail | expected behaviour / examples |
| length | prompt density | timing & pacing | duration | scope discipline |

**Worked example (Image, Lesson 1 — Name the Subject):**

> ✗ `a cat`
> ✓ `A fluffy orange Persian cat sitting on a rainy Tokyo street at night,
> cinematic lighting, shallow depth of field, ultra-realistic, 8k`

The second scores high on subject, scene, technical controls, and style;
the first scores the floor on all six. That gap is the lesson, and the
rubric detects it with the same weighted machinery text uses.

**Detector work per stage:** each dimension needs its own vocabulary
patterns (image: lens/lighting/aspect/quality terms; video: shot and
movement terms; code: language/framework/signature terms). This is the
only genuinely new *code* per stage, and it's one file section.

---

## 4. Honest cost per stage

| Work | Effort | Who |
|---|---|---|
| Curriculum: 8 lessons, concepts, takeaways | 1 session + curation | You |
| 24 solo scenarios × 3 personas | 1–2 sessions + curation day | You |
| 48 practice scenarios + skeletons | 1 session + curation day | You (pipeline exists) |
| Dimension detectors + weights table | 1 session | Code |
| Proxy prompt variant | ½ session | Code |
| Registration + smoke test | ½ session | Code |
| **Total** | **~90% content, ~10% code** | |

The first stage (Image) also pays the one-time Phase A cost: stage-aware
data layer, stage-aware rubric/proxy, and the picker — three tickets.
After Phase A, stage number three costs the same as stage number two.

---

## 5. Build order

1. **Phase A** (code, 3 tickets): stage-aware data layer → stage-aware
   rubric + proxy → stage picker. Text keeps behaving byte-identically.
2. **Phase B** (Image Stage): dimensions/weights → curriculum → practice
   content → ship. First proof that the contract holds.
3. **Phase C**: Video, Audio, Code — recipe repeats, no new architecture.
4. **Phase D**: personalization (matcher suggests a stage), plus
   adaptive-difficulty and localization decided in their own notes.

## 6. Open questions (decide at ticket time, not now)

- Does each stage get its own Encore boss pool, or does the Encore stay
  text-only as the "final exam of the house"?
- Do share cards name the stage ("Lead · Image Stage")?
- Should the Playbill add per-stage stickers, or stay career-wide?
- Locked stages: teased in the picker from day one, or hidden until ready?

---

**One-line summary for the SRS:** *Cue's lesson content, scoring weights,
and evaluation prompts are data, not code; a new prompting modality
("stage") is therefore a content pack plus a weights table, requiring no
change to the application's screens, state machine, or architecture.*