# Cue — Task Board (v6)

**Rules:** one ticket = one session = one commit. Files listed are the scope
fence. Strategy lives in `roadmap.md`; only ticketized work lives here.
**Every ticket ends with one line in `docs/decisions.md` if it made a call.**

---

## ✅ v1.0 — SHIPPED & TEACHER-APPROVED (tagged)

Phases 0–6 + the v1 sprint. Full record in roadmap.md.

## ✅ v2.0 — COMPLETE (tagged)

All 17 roadmap items, ~30 tickets:

**Identity arc** — share cards + rank ladder (v2-1) · Opening Act shell,
beats, typewriter (v2-3a/b) · The Audition (v2-3c) · name echo (v2-3d) ·
audition callback + LCS prompt diff (v2-4a/b) → tagged `v1.1 — identity`

**Sandbox arc** — Freeplay + daily quota sink (v2-2a) · review mode w/
data-not-instructions framing (v2-2b) · The Critic's Review tab, refund
on failure (v2-2c)

**Practice arc** — 48 scenarios generated + curated (v2-5a) · data split
w/ re-export shim (v2-5b) · Guided skeleton UI (v2-5c) · Assisted + live
RubricChecklist (v2-5d) · **flow amendment: the teaching ladder** —
guided → assisted → assessment IS the main flow; plain-language stage
guides; idea+takeaway on every rung; two-panel grids; once-ever practice
XP (+5/+10, ledgered) → tagged `v1.2 — practice`

**World & reward** — resources by persona (v2-6) · persona matcher,
enum-locked, once ever (v2-7) · voice input en-IN/hi-IN (v2-8) · The
Encore: daily boss, L4 gate, 100 base XP (v2-9) · daily challenge on the
shared date picker, +20 rider (v2-10) · prompt library, ≥58 auto-saved
(v2-11)

**Progress arc** — season stats, pure + 7 tests (v2-12a) · Season Report
w/ hand-rolled SVG chart (v2-12b) · The Playbill, derived achievements
(v2-13) → tagged `v1.3 — progress`

**Guide** — The Programme: user-facing feature guide under an altitude
rule (what/where, never how); Settings + finale entries (v2-18)

**Platform** — import/export, validated round-trip (v2-14) · light theme,
AA-checked, L3 unlock (v2-15) · CSS-only animations, reduced-motion-safe
(v2-16) · calibration pipeline: script + logger rider (v2-17a) ·
**v2-17b closed as a documented no-op** — calibration refuses below
n=15 pairs; shipped weights retained; re-run scheduled post-usage

---

## 🔨 NEXT — v3: STAGES (the flagship) + drafts

**The Stages vision:** Cue's whole machine — Opening Act, the
guided→assisted→assessment ladder, 8 lessons, XP, Encore, Report —
becomes a repeatable pattern. A "stage" (mode) = a new content pack
(8 lessons ×3 personas + 48 practice + weights table + one proxy prompt
variant) through the SAME untouched machine. Text is the main stage;
image, video, audio are new stages. ~90% content, ~10% code per stage.

### v3-0 — Stages vision & architecture note (BEFORE docs phase)
Deliverable: docs/v3-stages.md
- The mode contract (what a stage must supply) · text→image dimension
  mapping table · shared identity vs per-stage progress decision framed ·
  honest cost per stage
**AC:** SRS-citable future-scope note; the "where next?" viva answer.

### v3-1 — Image Stage (POST-SUBMISSION build)
Content sprint (v2-5a scale) + short code sprint (mode field, data files
keyed per stage, stage picker). Ticketized when its turn comes.

### v3-2/3/4 — Drafts (demoted below Stages)
Localization note · adaptive-tracks note · sound cue note — each one
docs/v3-*.md, feasibility only.

## 📄 FINAL PHASE — Docs & Submission

Assembled from roadmap.md + decisions.md + calibration-findings.md +
ticket-tagged commits + ma'am's demo feedback:
1. docs/SRS.md — scope, architecture (proxy modes, rubric platform,
   quota architecture, storage keys), security (injection posture),
   versioned future scope (v3 notes)
2. docs/uml/ — use-case, class (lib layer shines here), sequence
   (evaluate flow incl. fallback chain)
3. Final responsive + a11y re-audit (light theme included)
4. Tag final release → GitHub Release → submission links the Release

## Ship gates
`v2.0` tagged · v3 notes committed · docs phase → final tag · submission
links the Release, never main.

## Tripwires (standing)
- The proxy was the last architecture change (all AI modes live inside it)
- No new deps — diff, charts, canvas, animations all hand-rolled and DONE
- Quota: Solo/Sandbox/matcher/Encore/daily only; practice + Audition +
  checklist + diff + Report + Playbill run free forever
- Solo/Encore award full XP; practice pays once-ever completion rewards;
  nothing else pays
- No billing on the Gemini account — ever
- decisions.md gets its line BEFORE the commit, not "later"