# Cue — Complete Roadmap

**Layers:** this file is strategy · `task.md` is execution · `structure.md`
is the file-tree scope fence.

---

## ✅ v1.0 — SHIPPED, DEMOED, TEACHER-APPROVED

Zero-friction core: landing = challenge · 8 lessons × 3 personas, 24
interview-sourced Indian-context scenarios · serverless Gemini proxy with
two-model fallback + strict responseSchema · six-dimension rubric scorer
(the platform) · cold-start handling, dedup, transition-gated XP ·
attempt-history logger · XP/levels/streaks (tested) · WCAG AA · mobile-
first with first-class desktop. Full detail in git history at tag `v1.0`.

## ✅ v2.0 — COMPLETE

1. **Share cards** — canvas, client-side, theatre rank ladder ✅
2. **The Sandbox** — Freeplay + The Critic's Review (data-not-instructions
   framing), one leveled daily quota ✅
3. **The Opening Act** — 5 skippable beats, typewriter title, name
   capture, The Audition (rubric-scored, zero quota, sets starting rank),
   persona pick ✅
4. **Audition callback + prompt diff** — before/after ranks + hand-rolled
   LCS word diff on the finale ✅
5. **Graded practice** — 48 curated scenarios; **amended into the teaching
   ladder:** guided → assisted → assessment as the main flow, per lesson,
   with plain-language guides, idea+takeaway per rung, skip link, and
   once-ever practice XP (+5/+10) ✅
6. **Resources** — 4 per persona, free/auditable, on the finale ✅
7. **Persona matcher** — one enum-locked Gemini call, once ever, chips as
   the permanent floor ✅
8. **Voice input** — Web Speech, en-IN/हिंदी, hidden unsupported ✅
9. **The Encore** — 6-boss pool, date-seeded, L4 gate, 100 base XP ✅
10. **Daily challenge** — same picker (salted), starred lesson, +20 rider ✅
11. **Prompt library** — ≥58 real scores auto-saved, copy/remove, cap 50 ✅
12. **The Season Report** — pure tested stats + hand-rolled SVG chart,
    honest about offline estimates ✅
13. **The Playbill** — 8 derived achievements, persisted earns ✅
14. **Import/export** — full-account validated round-trip ✅
15. **Light theme** — variable swap, AA-checked, Level 3 unlock ✅
16. **Animations** — CSS-only, reduced-motion disables by non-existence ✅
17. **Calibration** — offline Python pipeline (ridge, confidence-blended,
    refuses tiny data) + logger rider; **weight swap deferred until real
    data clears n=15** — the refusal is the feature ✅
18. **The Programme** — built-in user guide under an altitude rule
    (what/where, never how) — the demo companion ✅

## 🔨 v3 — STAGES (ACTIVE NEXT — the flagship)

**Stages:** the entire shipped machine, repeated as modes. A stage = a
content pack (8 lessons ×3 personas, 48 practice scenarios, a dimension
weights table, one proxy prompt variant) through the SAME code — ladder,
XP, Encore, Report all untouched. Text is the main stage. Coming stages:
**Image** (subject/scene/composition/technical controls/style refs/
economy — the six dimensions survive, renamed) → Video → Audio → Code.
Shared identity (name, rank, streak); per-stage progress. ~90% content,
~10% code per stage.

0. **v3-0 — Stages note** (docs/v3-stages.md, pre-docs-phase): mode
   contract + dimension mapping + cost — the SRS future-scope anchor
1. **v3-1 — Image Stage** (post-submission): first proof of the pattern
2. Localization · adaptive tracks · sound cue — demoted to notes below
   Stages

## 📄 Final Phase — Docs & Submission (deliberately last)

SRS + UML assembled from the living docs (this file, decisions.md,
calibration-findings.md, ticket-tagged commits, teacher feedback) →
final a11y/responsive re-audit → final tag → GitHub Release → submission.

---

## XP & Rank Economy (as shipped)

- **Earn:** 50 base + score bonus on assessments (replays half) · +5/+10
  once-ever practice completions · 100 base + bonus Encore (daily) ·
  +20 daily-lesson rider · streaks on any evaluation
- **Ranks:** Understudy → Ensemble → Lead → Director → Playwright;
  Audition sets the starting rank (caps at Lead), XP climbs the rest
- **Unlocks:** Level 3 → light theme · Level 4 → the Encore · every
  level → +1 daily sandbox evaluation
- **Never:** currency/shop, leaderboards, XP-gating core lessons

## Permanently Out of Scope

Backend, auth, payments, search, confetti, fake loading screens,
translate-page toggle, site-visitor analytics.

---

**Quota architecture (as shipped):** Gemini is touched only by assessments,
the Sandbox (both tabs, capped, leveled), the persona matcher (once ever),
the Encore, and the daily lesson's normal evaluation. The Audition, both
practice tiers, the live checklist, the diff, the Season Report, and the
Playbill run free on the rubric or localStorage. Two-model fallback chain
underneath; heuristic floor under everything; no billing — ever.