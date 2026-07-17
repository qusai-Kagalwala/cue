# Cue — Task Board (v5)

**Rules:** one ticket = one AI session = one commit. Files listed are the
scope fence. AC must pass before commit. Strategy in `roadmap.md`.
Tickets below are pre-split to session size; if reality disagrees with a
ticket when its turn comes, amend the ticket BEFORE the session, never mid-way.
**Every ticket ends with one line in `docs/decisions.md` if it made a call.**

---

## ✅ v1.0 — SHIPPED & TEACHER-APPROVED (tagged)

Phases 0–6 + v1 sprint. Full record in roadmap.md.

---

## 🔨 v2 — Ticket Board (build in order)

### v2-1 — Shareable result cards
Files: src/lib/shareCard.js (new), src/lib/ranks.js (new), src/components/ShareCard.jsx (new), Completion.jsx, ResultsPanel.jsx (button only)
- ranks.js: level → theatre rank (Understudy → Ensemble → Lead → Director → Playwright), pure
- shareCard.js: canvas 1080×1080 — stage-dark bg, amber accents, Cue mark,
  score/level/rank/streak; returns blob URL. No external fonts on canvas
  (system fallbacks — canvas can't wait on webfonts reliably)
- Share button: Web Share API where available, download fallback
**AC:** Card downloads on desktop, shares on Android; readable at
thumbnail size; rank matches level thresholds.

### v2-2a — Sandbox screen + Freeplay tab
Files: src/screens/Sandbox.jsx (new), src/lib/sandboxQuota.js (new), App.jsx, TopBar.jsx (nav), lib/screens.js
- Freeplay: any prompt + optional context textarea → existing /api/evaluate
  with a generic "freeplay" lesson shell; results reuse ResultsPanel
- sandboxQuota.js: localStorage daily counter, resets by date key;
  base 3/day + 1 per level (the XP sink); shared across both tabs
**AC:** Quota decrements, blocks at 0 with friendly copy, resets next day;
no XP awarded from freeplay.

### v2-2b — Review mode in the proxy
Files: api/evaluate.js
- `mode: "review"` in POST body → alternate system prompt: judge a pasted
  prompt+answer pair, trace answer weaknesses to prompt weaknesses,
  suggest rewritten prompt; same responseSchema
- DATA-NOT-INSTRUCTIONS framing: pasted content wrapped and declared as
  material to judge, never commands; 2,000-char cap per field validated
**AC:** Review call returns schema-valid JSON; a pasted answer containing
"ignore previous instructions" is judged, not obeyed. → decisions.md line.

### v2-2c — The Critic's Review tab
Files: src/screens/Sandbox.jsx
- Second tab: two textareas (your prompt / the answer you got) → review
  mode → verdict panel (reuses ResultsPanel patterns)
- Shares the v2-2a quota counter
**AC:** Full review flow works; quota shared with Freeplay; 375px clean.

### v2-3a — Opening Act shell
Files: src/screens/OpeningAct.jsx (new), src/lib/storage.js (openingActDone flag, name field), App.jsx
- Beat-based state machine; every beat skippable; skip-all → sensible
  defaults (Understudy, no name); `prefers-reduced-motion` → static
  variants; never repeats once done (flag)
**AC:** Fresh visitor sees it once; skip works at every beat; reduced-motion
shows no animation; returning users never see it.

### v2-3b — Beats 1, 2, 4, 5
Files: src/screens/OpeningAct.jsx, index.css (typewriter/spotlight keyframes)
- Beat 1: typewriter title card, spotlight follows caret — "Your cue to ask better."
- Beat 2: name capture (optional, stored)
- Beat 4: what/why prompting — 2 cards
- Beat 5: persona pick (reuses PERSONAS)
**AC:** Sequence flows, CSS-only animation, each beat skippable, name persists.

### v2-3c — The Audition (Beat 3)
Files: src/screens/OpeningAct.jsx, src/data/audition.js (new), src/lib/ranks.js
- 3–4 pick-the-better-prompt MCQs (static pairs in audition.js) + one mini
  prompt task scored by scoreWithRubric (zero quota)
- Sets starting rank; skip = Understudy; attempt saved to storage for the callback
**AC:** Rank assigned from combined MCQ+task score; skip defaults correctly;
attempt object persisted.

### v2-3d — Name echo wiring
Files: TopBar.jsx or Challenge greeting, XPToast.jsx, Completion.jsx, shareCard.js
- "[Name]" surfaces at: curtain-up line, level-up toast, finale, share card
**AC:** With name → echoes everywhere listed; without → graceful generic copy.

### v2-4a — Audition callback task
Files: src/screens/Completion.jsx (fills the marked slot), storage.js
- Finale offers the parallel prompt task (same audition scenario),
  rubric-scored; stores the "after" attempt
**AC:** Slot renders the task post-Audition users only; both attempts stored.

### v2-4b — Prompt diff view
Files: src/components/PromptDiff.jsx (new), Completion.jsx
- Before/after side by side (stacked on mobile), word-level highlights
  (simple LCS or token diff, hand-rolled — no diff library)
- "Your audition: Understudy. Your closing night: Lead."
**AC:** Diff readable at 375px; ranks line uses real data; no new deps.

### v2-5a — Practice content pipeline (OFFLINE — your session, not AI-coding)
Deliverable: 48 generated scenarios, hand-curated
- One generation prompt per (lesson × tier): teaching goal + persona +
  tier + 2–3 existing scenarios as style seeds; generate, then CURATE BY HAND
**AC:** 24 guided + 24 assisted scenarios curated; every guided one has a
fill-in-the-blank skeleton drafted. Budget: one afternoon + one curation day.

### v2-5b — Practice file restructure
Files: src/data/lessons.meta.js, scenarios.solo.js, scenarios.assisted.js, scenarios.guided.js (all new), lessons.js (becomes re-export shim), data consumers
- Solo = untouched originals; guided files carry `skeleton` field
- lessons.js re-exports so ALL existing imports keep working
**AC:** App runs unchanged; `npm test` green; grep confirms no consumer
imports the new files directly yet.

### v2-5c — Guided tier UI
Files: src/screens/Challenge.jsx or src/components/GuidedPrompt.jsx (new), LessonMap.jsx (tier select)
- Fill-in-the-blank skeleton inputs → assembled prompt → rubric-checked
  (zero quota); nearly impossible to fail; NO XP
**AC:** Guided flow completes offline; no XP movement; tier selectable per lesson.

### v2-5d — Assisted tier + live checklist
Files: src/components/RubricChecklist.jsx (new), Challenge.jsx
- Free textarea + live checklist ticking per dimension (uses
  scoreWithRubric().dimensions, debounced ~400ms on keystroke); NO XP
**AC:** Ticks respond while typing without lag; lesson-weighted dimensions
shown first; no quota, no XP.

### v2-6 — AI courses resources page
Files: src/data/resources.js (new), src/screens/Completion.jsx or Resources.jsx
- 8–12 curated links by persona, surfaced on the finale
**AC:** Links per persona render; external links open new tab with rel-noopener.

### v2-7 — Custom persona matcher
Files: api/evaluate.js (mode: "persona") or api/persona.js, src/screens/OpeningAct.jsx (Beat 5 upgrade)
- One Gemini call classifies free-text self-description → track; once ever
  (flag); falls back to manual pick on any failure
**AC:** Classification works; failure → manual chips; never re-fires. → decisions.md.

### v2-8 — Voice input
Files: src/components/PromptInput.jsx
- Web Speech API mic button, `hi-IN`/`en-IN`; hidden when unsupported
**AC:** Dictation appends to textarea on Chrome/Android; button absent on
unsupported browsers; keyboard flow unaffected.

### v2-9 — The Encore
Files: src/data/encore.js (new), src/screens/Encore.jsx (new), LessonMap.jsx or Completion.jsx (entry), useProgress.js (100 base XP path), lib/screens.js
- Boss challenge: all rubric dimensions + tight token budget; 100 base XP;
  gated at Level 4; date-seeded scenario picker (seed = YYYY-MM-DD hash)
**AC:** Locked below L4; same scenario all day, different tomorrow;
100+bonus XP once per day.

### v2-10 — Daily challenge
Files: src/screens/Challenge.jsx or DailyCard component, reuses encore picker
- Daily card reusing the date-seeded picker against core lesson pool;
  hooks into streaks
**AC:** One per day; completing it maintains streak; no double-award.

### v2-11 — Prompt library
Files: src/lib/storage.js (library array), src/screens/Library.jsx (new) or Sandbox tab
- Best-scoring prompts (≥58) auto-saved locally; list + copy buttons; cap ~50
**AC:** High scores appear; copy works; cap enforced oldest-out.

### v2-12a — Season Report stats derivation
Files: src/lib/seasonStats.js (new)
- Pure derivations from loadAttempts(): avg per lesson, first-vs-best,
  trend headline ("first three averaged X, last three averaged Y")
**AC:** Pure functions + 4–5 vitest tests; handles empty/1-attempt history.

### v2-12b — Season Report screen
Files: src/screens/SeasonReport.jsx (new), nav under "Your Progress"
- Hand-rolled SVG chart (~60 lines, NO chart library) + stat lines from 12a
**AC:** Renders real history at 375/768/1440; empty state graceful.

### v2-13 — The Playbill
Files: src/lib/achievements.js (new), src/screens/Playbill.jsx (new), sibling nav to Season Report
- Sticker grid, localStorage flags: Audition Complete · First Curtain ·
  Full House (20+) · Act One (1–4) · Closing Night (all 8) · Encore! ·
  Week's Run (7-day) · Playwright
**AC:** Flags set at the right moments; earned vs unearned visually clear.

### v2-14 — Import/export
Files: src/lib/portability.js (new), src/screens/Settings.jsx
- One-button JSON download (state + attempts + library + flags) +
  upload/restore with shape validation (reject corrupt gracefully)
**AC:** Export → reset → import → identical state; invalid file rejected
with message, no crash.

### v2-15 — Light theme (Level 3 unlock)
Files: src/index.css (light token set), Settings.jsx, storage.js (theme pref)
- Tailwind v4 CSS variables swap; locked until Level 3 (the XP sink);
  dark stays default
**AC:** Unlock gate works; every screen passes AA in light; persists.

### v2-16 — Animations (CSS-only)
Files: src/index.css, ScoreDial.jsx, XPToast.jsx, Playbill.jsx
- Score reveal, XP tick-up, sticker stamp-in, curtain transitions;
  all honor prefers-reduced-motion
**AC:** No JS animation libs; reduced-motion disables all; no layout shift.

### v2-17a — Calibration notebook (OFFLINE Python)
Deliverable: scripts/calibrate.py + findings
- Regression of rubric dimension scores vs real Gemini scores from an
  exported attempt history; outputs proposed LESSON_WEIGHTS
**AC:** Notebook runs on your exported JSON; proposed weights documented.

### v2-17b — Weights swap
Files: src/lib/rubric.js (LESSON_WEIGHTS constants only)
- Ship learned weights; nothing else changes
**AC:** `npm test` green; spot-check 3 prompts score sanely; → decisions.md.

---

## ⏭ v3 — Drafts (after v2)
Localization · adaptive tracks · one sound cue.

## 📄 Final Phase — Docs
SRS + UML assembled from roadmap.md + decisions.md + ticket-tagged
commits → final tag → GitHub Release → submission links the Release.

## Ship gates
Tag at natural v2 milestones (suggested: after v2-4b "v1.1 — identity",
after v2-5d "v1.2 — practice", after v2-13 "v1.3 — progress") · final
tag after docs.

## Tripwires
- The proxy was the last architecture change (v2-2b/v2-7 are modes INSIDE it, not new services)
- No new deps: diff, charts, animations, canvas — all hand-rolled
- Quota: Solo/Sandbox/matcher/Encore/daily only; everything else rubric-free
- Solo evaluations only award XP; Guided/Assisted/Freeplay never do
- No billing on the Gemini account — ever
- decisions.md gets its line BEFORE the commit, not "later"