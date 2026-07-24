# Cue — Task Board (v7)

**Rules:** one ticket = one AI session = one commit. Files listed are the
scope fence. Strategy in `roadmap.md`; contract in `docs/v3-stages.md`.
**Every ticket ends with a line in `docs/decisions.md` if it made a call.**

**The Stages contract:** a stage is a CONTENT PACK — 8 lessons ×3 personas
+ 48 practice scenarios + a dimension/weights table + one proxy framing —
flowing through the UNCHANGED machine. If a ticket wants to fork a screen,
the ticket is wrong.

---

## ✅ v1.0 — SHIPPED & TEACHER-APPROVED (tagged)

Phases 0–6 + v1 sprint. Full record in roadmap.md.

## ✅ v2.0 — COMPLETE (tagged)

Identity arc (share cards, Opening Act, Audition, name echo, callback +
LCS diff) · Sandbox arc (Freeplay, review mode, Critic's Review) ·
Practice arc (48 scenarios, data split, guided + assisted, **the teaching
ladder**, practice XP) · World & reward (resources, persona matcher,
voice, Encore, daily, library) · Progress arc (Season Report, Playbill) ·
Platform (import/export, light theme, animations, calibration pipeline) ·
The Programme guide.

## ✅ v3 PHASE A — Stage-aware machine (COMPLETE)

- **v3-0** Stages contract note (`docs/v3-stages.md`) ✅
- **v3-1a** Stage-aware data layer + lossless migration ✅
- **v3-1b** Stage-aware rubric + proxy framing ✅
- **v3-1c** Stage picker (locked stages teased) ✅
- **AUDIT FIX** — five consumers still read pre-v3 flat journey fields
  (currentLesson null, practice tiers served text content in image mode,
  achievements unearnable, import validation rejected v3 exports) ✅

## ✅ v3 PHASE B — The Image Stage (SHIPPED)

- **v3-2a** Image dimensions, detectors, weights ✅
- **v3-2b** Image curriculum: 8 lessons + 24 solo scenarios ✅
- **v3-2c** Image practice: 24 guided (skeletons) + 24 assisted ✅
- **v3-2d** Shipped by registration alone — **zero screen files changed** ✅

## ✅ v3 PHASE C (partial) — Video / Audio / Code rubrics

- **v3-3a / v3-4a / v3-5a** All three dimension sets, detectors, weights,
  and labels shipped together; calibrated and regression-checked ✅

---

## 🔨 ACTIVE — Content packs for the remaining stages

Each stage needs exactly three tickets now (the code is done):

### v3-3b — Video curriculum (OFFLINE — your session)
Deliverable: `lessons.meta.video.js` + `scenarios.video.solo.js`
- 8 lessons mapped from the arc: Name the Subject & Action · Choose the
  Shot · Move the Camera · Keep Continuity · Time & Pacing · Set the Style
  · Refine the Take · Dense Prompting
- Concepts + takeaways + one bad→good pair each; 24 solo scenarios
**AC:** every lesson has a takeaway; every bad→good pair scores a real
gain under the video rubric.

### v3-3c — Video practice content (OFFLINE — your session)
Deliverable: `scenarios.video.guided.js` (24 + skeletons) +
`scenarios.video.assisted.js` (24)
**AC:** every skeleton filled with its own hints scores ≥40.

### v3-3d — Ship the Video Stage
Files: `src/data/stages.js` (registration only)
**AC:** full ladder playable in video mode; no screen file modified.

### v3-4b / v3-4c / v3-4d — Audio Stage
Same three tickets. Lesson arc: Name the Sound · Set the Mood · Choose
Voice or Instrument · Structure It · Technical Controls · Pick the Genre ·
Refine the Take · Dense Prompting.

### v3-5b / v3-5c / v3-5d — Code Stage
Same three tickets. Lesson arc: State the Goal · Give the Context (stack,
versions, constraints) · Define the Interface · Name the Edge Cases ·
Show an Example · Set the Output Shape · Iterate on Real Errors ·
Scope Discipline.

---

## ⏭ QUEUED — near-term features (from the v2 board)

### v2-19a/b — The First-Night Coach
Files: `CoachOverlay.jsx`, `data/coach.js`, `Challenge.jsx`, `storage.js`
(coachDone), `Programme.jsx` (replay link)
- 19a: spotlight tour machine (targets via `data-coach` attrs, scrim +
  highlight ring, Next/Skip, reduced-motion, missing-target skip)
- 19b: the ~6-step L1 script + once-only flag + Programme replay
**AC:** appears once for a fresh visitor at L1, skippable, replayable.

### v2-20a/b/c — God Mode (the `Qu$@1` easter egg)
Files: `lib/godMode.js`, `OpeningAct.jsx`, `useProgress.js`,
`GodModeBadge.jsx`, `index.css`
- 20a: session-only synthetic state overlay (never persisted, writes
  no-op while active) — **`cue:v1` byte-identical before/after**
- 20b: name-box trigger + always-visible exit badge
- 20c: alt palette + verify every gate opens
**AC:** every locked feature reachable in 30s; refresh exits; real save
untouched. NOT documented in README/Programme — it lives in decisions.md.

### v3-6a — Matcher suggests a stage
The persona matcher also nudges a stage from the user's self-description.
**AC:** suggestion only, never a lock.

### v3-6b/6c — Adaptive difficulty · Localization
Decision notes first (`docs/v3-adaptive.md`, `docs/v3-localization.md`);
build-or-defer decided IN the note.

### v3-7 — Sound cue · v3-8 — Calibration re-run (v2-17b's real swap)

---

## 📄 FINAL PHASE — Docs & submission (end of year, per plan)

SRS + UML assembled from roadmap.md + decisions.md + v3-stages.md +
calibration-findings.md + ticket-tagged commits → final a11y/responsive
re-audit (all stages, both themes) → final tag → GitHub Release.

## Ship gates
`v1.0` `v1.1` `v1.2` `v1.3` `v2.0` `v3.0-image` tagged · next tag when
video ships · final tag after docs.

## Tripwires (standing)
- **No screen file may branch on stage id** — stages are DATA
- After any state-shape change, grep EVERY reader (the v3 audit lesson)
- No new deps; the proxy is the only backend surface; no Gemini billing
- Solo/Encore pay XP; practice pays once-ever; nothing else pays
- decisions.md line before the commit, not "later"