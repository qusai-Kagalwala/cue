# Cue — Complete Roadmap

**Layers:** this file is strategy · `task.md` is execution (active tickets) ·
`structure.md` is the file-tree scope fence. v2 items are ticketized lazily,
one at a time, the day each is built.

---

## ✅ v1.0 — SHIPPED, DEMOED, TEACHER-APPROVED (tagged)

**Core experience**
- Monkeytype-style zero-friction UX — landing screen IS the challenge screen
- 8 core lessons × 3 persona variants = 24 hand-written scenarios, Indian
  everyday contexts, sourced from user interviews
- Flat lesson queue with auto-continue (25s, tuned from user testing);
  lesson map secondary with half-XP replays
- Lesson 8 = Prompt Economy with token budgets; live token counter (chars/4)
- Per-lesson takeaway line on every result

**Evaluation**
- Gemini via stateless Vercel serverless proxy (`api/evaluate.js`, key server-side)
- Two-model fallback chain: `gemini-2.5-flash-lite` → `gemini-2.5-flash` on 429
- Strict JSON via `responseSchema`; engine mode badge on every result
- **Rubric scorer (the platform):** six weighted dimensions
  (role/context/constraints/format/specificity/length), per-lesson weights,
  seeded feedback templates, dimensions breakdown exposed for v2
- Cold-start handling: 12s client timeout, warm-up ping on mount,
  429 → instant fallback, timeout/5xx → one retry with backoff
- Duplicate-XP fix: transition-gated award + prompt-hash dedup (saves quota)
- **Attempt-history logger** — {lessonId, score, timestamp, engine,
  attemptNumber} per evaluation; history accumulating since day one

**Gamification & platform**
- XP (50 base + score bonus, Solo only), levels at 100/250/500/1000/2000,
  streaks; 14 Vitest tests
- React 19 (Vite) + Tailwind v4, localStorage only, no backend/auth
- Mobile-first; desktop two-panel ≥1024px, keyboard shortcuts
- Dark default, amber accent, theatre motif; WCAG AA pass; noscript,
  tiny-screen, and private-mode edge states handled

---

## 🔨 v2 — Post-MVP Build Order (ACTIVE)

1. **Shareable result cards** ← NEXT — canvas-generated, client-side
   - *XP sink:* rank titles on card — Understudy → Ensemble → Lead → Director → Playwright
2. **The Sandbox** — two tabs, shared localStorage daily quota:
   - **Freeplay:** evaluate any prompt
   - **The Critic's Review:** paste your prompt + the answer it produced
     (~2,000-char cap) → one Gemini call judges the answer, traces its
     weaknesses back to prompt weaknesses, suggests a rewrite. New
     `mode: "review"` proxy system prompt with data-not-instructions framing
   - *XP sink:* levels earn bonus daily evaluations across both tabs
3. **The Opening Act** — first-visit sequence, skippable every beat,
   `prefers-reduced-motion` fallback:
   - Beat 1: typewriter title card, spotlight follows the caret
   - Beat 2: name ask — "Every performance needs a name on the programme."
   - Beat 3 — **The Audition:** 3–4 pick-the-better-prompt MCQs + one mini
     prompt task scored by the rubric (zero API cost); sets starting rank;
     skip = Understudy; attempt saved for the callback
   - Beat 4: what & why prompting (2 cards)
   - Beat 5: persona pick
   - Curtain up: "Places, [Name]." — name echoes across greeting,
     level-ups, finale, Encore, share cards
4. **Audition callback + prompt diff view** — fills the marked finale slot:
   parallel prompt task, before/after side by side — "Your audition:
   Understudy. Your closing night: Lead."
5. **Graded practice mode — Guided → Assisted → Solo:**
   - Guided: simpler generated scenario + fill-in-the-blank skeleton, rubric-checked
   - Assisted: medium scenario, free textarea + live rubric checklist
     (keystroke debounce, powered by the dimensions breakdown)
   - Solo: original 24 hand-written scenarios, Gemini-evaluated, XP awarded
   - One-time offline pipeline: seeded generation → 48 practice scenarios →
     hand-curated → static files: `lessons.meta.js` · `scenarios.solo.js` ·
     `scenarios.assisted.js` · `scenarios.guided.js` (with `skeleton` field)
6. **AI courses resources page** — 8–12 curated links by persona, on the finale
7. **Custom persona onboarding (tier-1 matcher)** — one Gemini call
   classifies track; upgrades Beat 5, personalizes courses
8. **Voice input** — Web Speech API, `hi-IN`/`en-IN`, hidden if unsupported
9. **The Encore** — boss challenge: all rubric dimensions + tight token
   budget, 100 base XP, gated at Level 4, date-seeded scenario picker
10. **Daily challenge** — reuses the Encore's date-seeded picker, hooks streaks
11. **Prompt library** — best-scoring prompts saved locally, copy buttons
12. **The Season Report** — user-facing analytics on the attempt-history
    log: average per lesson, first-vs-best, improvement trend headline,
    hand-rolled SVG chart (~60 lines, no library). Zero quota, zero privacy
    disclosure — the user's own data shown back to them
13. **The Playbill (achievements)** — sticker grid, localStorage flags:
    *Audition Complete · First Curtain · Full House (20+) · Act One (1–4) ·
    Closing Night (all 8) · Encore! · Week's Run (7-day streak) · Playwright*.
    Sibling to the Season Report under "Your Progress"
14. **Import/export** — JSON download of all progress (history included) +
    validated restore
15. **One light theme** — Tailwind v4 CSS variables · *XP sink:* Level 3 unlock
16. **Animations** — CSS-only: score reveal, XP tick-up, sticker stamp-in,
    curtain transitions
17. **Python heuristic calibration** — offline regression against real Gemini
    scores from the attempt log; learned weights ship as new
    `LESSON_WEIGHTS` constants; also validates Audition scoring

## ⏭ v3 — Long Horizon (drafts after v2)

1. Full content localization (multilingual lessons + evaluation)
2. AI-generated adaptive learning tracks (runtime custom scenarios)
3. Sound — one on-brand curtain-up cue, autoplay-policy safe

## 📄 Final Phase — Docs & Submission (deliberately last)

SRS + UML assembled from living docs (`roadmap.md`, `task.md`,
`docs/decisions.md`, ticket-tagged commits) → final tag → GitHub Release →
submission links the Release.
**Standing rule:** `docs/decisions.md` gets one line per architectural
decision at the moment it's made — assembly, not archaeology.

---

## XP & Rank Economy

- **Earn:** 50 base + score bonus (Solo only — practice tiers award
  nothing) · 100 base Encore · streak multiplier
- **Ranks:** one theatre ladder; Audition sets starting rank, XP advances it
- **Unlock:** Level 3 → light theme · Level 4 → Encore · every level →
  rank title + Sandbox bonus evaluations
- **Never:** currency/shop, leaderboards, XP-gating core lessons

## Permanently Out of Scope

Backend, auth, payments, search, confetti, fake loading screens,
translate-page toggle, site-visitor analytics.

---

**Quota architecture:** Gemini touched only by Solo finals, the Sandbox
(capped, both tabs), the persona matcher (once ever), Encore, and daily
challenge. Audition, practice tiers, checklist, diff view, Season Report,
and Playbill run free on the rubric or localStorage. Two-model fallback
chain doubles the daily ceiling underneath (~40/day). Development runs
offline against the rubric; no billing on the Gemini account — ever.