# Cue — v3 Board: STAGES (paste into task.md)

**Rules:** one ticket = one AI session = one commit. Files are the scope
fence. **The Stages contract:** a stage is a CONTENT PACK — 8 lessons ×3
personas + 48 practice + a dimension/weights table + one proxy prompt
variant — flowing through the UNCHANGED machine (Opening Act, the
guided→assisted→assessment ladder, XP, Encore, Report, Playbill). If a
ticket wants to fork a screen, the ticket is wrong.

---

## Phase A — Pre-work (before any stage content)

### v3-0 — Stages vision & architecture note
Files: docs/v3-stages.md (new)
- The mode contract (what a stage must supply, what it may NOT change) ·
  text→image dimension mapping table · shared-identity vs per-stage
  progress decision, decided and written · honest cost per stage
**AC:** SRS-citable; a reader could build a new stage from this note alone.

### v3-1a — Stage-aware data layer
Files: src/data/stages.js (new), src/data/lessons.js (shim widens),
src/lib/storage.js (activeStage + per-stage progress), src/hooks/useProgress.js
- `STAGES` registry: { id, label, blurb, locked, lessons, scenarios{solo,
  assisted,guided}, weightsTable, proxyMode }
- Text stage registers the EXISTING data — zero content moves
- Storage: `activeStage: 'text'`, and lesson progress keyed per stage
  (`stageProgress: { text: { currentLessonIndex, lessonStage, lessonScores,
  practicePaid } }`); identity (name/xp/level/streak/rank/playbill) stays SHARED
- Migration: existing saves' flat progress folds into `stageProgress.text`
**AC:** app runs identically; existing save migrates losslessly; `npm test`
green; grep shows no screen imports a stage directly.

### v3-1b — Stage-aware rubric + proxy
Files: src/lib/rubric.js (weights table per stage), api/evaluate.js (mode
per stage), src/lib/gemini.js (pass stage)
- `scoreWithRubric(lesson, prompt, stageId)` selects the stage's weights
  + detector set; text behaviour unchanged when stageId is 'text'
- Proxy: `stage: 'image'` → image-prompt-craft system prompt, SAME schema,
  SAME chain, SAME fallback. Judges PROMPTS, never generates media
**AC:** text scores byte-identical to today; unknown stage falls back to
text weights; proxy validates the new field.

### v3-1c — The stage picker
Files: src/components/StagePicker.jsx (new), TopBar.jsx, LessonMap.jsx,
src/screens/OpeningAct.jsx (optional beat)
- Switch active stage; locked stages show "coming soon" not emptiness;
  switching preserves each stage's own progress
**AC:** switch → correct lessons/scenarios/weights load; progress per
stage independent; identity shared; 375px clean.

---

## Phase B — The Image Stage (first proof)

### v3-2a — Image dimensions & weights (OFFLINE + code)
Files: src/lib/rubric.js (image detectors + LESSON_WEIGHTS_IMAGE)
- Six dimensions, renamed and re-detected: subject · scene/context ·
  composition & framing · technical controls (lighting, lens, aspect,
  quality) · style reference · economy/density
**AC:** a strong image prompt (your Persian-cat example) scores high; a
bare "a cat" scores low; text stage untouched.

### v3-2b — Image curriculum (OFFLINE — your session)
Deliverable: 8 lessons ×3 personas, mapped from text's arc —
Name the Subject · Set the Scene · Composition & Framing · Technical
Controls · Style References · Choose the Art Style · Refine the Render ·
Dense Prompting. Concepts + takeaways + one bad→good example each.
**AC:** 24 solo scenarios curated; every lesson has a takeaway.

### v3-2c — Image practice content (OFFLINE — your session)
Deliverable: 48 scenarios (24 guided w/ skeletons + 24 assisted),
generated from the v2-5a pipeline with image seeds.
**AC:** skeletons produce decent prompts on any sane fill.

### v3-2d — Ship the Image Stage
Files: src/data/scenarios.image.*.js, stages.js registration
**AC:** full ladder playable in image mode; XP/Encore/Report/Playbill all
work unchanged; no screen file modified.

---

## Phase C — More stages (recipe now proven)

### v3-3 — Video Stage · v3-4 — Audio Stage · v3-5 — Code Stage
Each = one dimensions/weights ticket + two content sessions + one ship
ticket, exactly like Phase B. Ticketize when its turn comes.
- Video dimensions: subject · shot type · camera movement · scene
  continuity · timing/pacing · style
- Audio: intent · voice/instrument · mood · structure · technical · length
- Code: goal · context (stack/constraints) · interface/signature ·
  edge cases · output format · scope discipline

---

## Phase D — Personalization (the earlier discussion, now ticketized)

### v3-6a — Persona matcher → per-stage tracks
Files: api/evaluate.js (persona mode widens), OpeningAct.jsx
- The existing matcher also suggests which STAGE fits a user's described
  life (a designer → image; a founder → text+video)
**AC:** suggestion shown as a nudge, never a lock; manual choice always wins.

### v3-6b — Adaptive difficulty note (draft first)
Files: docs/v3-adaptive.md
- Runtime scenario generation vs curated packs: quota, safety, curation
  loss, caching. Decide build-or-defer IN the note
**AC:** an honest decision, written down.

### v3-6c — Localization note (draft first)
Files: docs/v3-localization.md
- Hindi-first: content ×N, evaluation language, rubric detectors per
  language, UI strings. Cost stated honestly
**AC:** same — a real feasibility note, not a promise.

---

## Phase E — Polish carried from v2

### v3-7 — Sound cue · v3-8 — Calibration re-run (v2-17b's real swap)
Small, do when data/appetite exists.

## Tripwires (unchanged, plus one)
- No screen file may branch on stage id — stages are DATA
- No new deps; proxy stays the only backend surface; no Gemini billing
- Solo/Encore pay XP; practice pays once-ever; nothing else
- decisions.md line before every commit