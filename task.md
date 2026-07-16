# Cue — Task Board (v3)

**Rules:** one ticket = one AI session = one commit. Files per ticket are the
scope fence — a session touching unlisted files gets questioned. AC must pass
before the commit. Strategy lives in `roadmap.md`; only ticketized work lives here.

---

## ✅ Done — Phases 0–6 (v1 MVP, live on Vercel)

Scaffold + design tokens + shell (P0) · lesson schema, storage,
XP/streak engine + 14 tests, useProgress (P1) · token counter, challenge
screen, persona picker, two-panel + shortcuts (P2) · Vercel setup,
serverless proxy, retry + heuristic fallback, useEvaluation + curtain
loader (P3) · results panel, auto-continue (25s, tuned from user
testing), budget mode (P4) · lesson map with half-XP replays, settings +
reset (P5) · 24 real interview-sourced scenarios, edge states, a11y pass,
model fallback chain + mode badge (P6).

---

## 🔨 Active — v1 Pre-Submission Sprint

### T-fix-1 — Duplicate XP + attempt logger
Files: src/hooks/useEvaluation.js, src/hooks/useProgress.js, src/lib/storage.js
- Award XP only on state transition INTO `done` (re-render/re-entry can
  never fire completeLesson twice for one evaluation)
- Prompt hash dedup: hash(lessonId + persona + trimmed prompt) of last
  evaluated submission; identical resubmit → cached result, zero Gemini cost
- RIDER: attempt-history logger — push {lessonId, score, timestamp,
  engine, attemptNumber} to a localStorage array on every evaluation
  (~5 lines; feeds the v2 Season Report + calibration — history starts NOW)
**AC:** One submit → XP exactly once. Identical resubmit → no network
call. localStorage attempts array grows per evaluation.

### T-fix-2 — Premature heuristic fallback (cold starts)
Files: src/lib/gemini.js, src/hooks/useEvaluation.js (ping: App.jsx)
- 12s client timeout (under the proxy's 15s)
- Warm-up ping on mount: GET /api/evaluate — thaws the container,
  MUST NOT call Gemini (the 405 response is the whole point)
- Routing: 429 → instant heuristic; TIMEOUT/5xx → one retry with
  backoff, then heuristic
**AC:** Cold production visit → first real submit succeeds without
falling back. 429 still falls back instantly.

### T-v1-3 — Rubric heuristic v2 (timebox: 2 sessions)
Files: src/lib/heuristic.js (rewrite), optionally src/lib/rubric.js
- Six weighted dimensions: role / context / constraints / format /
  specificity / length; per-lesson weights (L6 weights role, L8 length…)
- 3–4 feedback templates per score band, seeded variation
- Same return shape as today (+ offline flag); pure + REUSABLE — the v2
  Audition, live checklist, and practice tiers import it unchanged
**AC:** Same prompt scores differently on L1 vs L6. Same-band prompts get
varied wording. Perfection belongs to v2 (calibration), not here.

### T-v1-4 — "What you learned" strings
Files: src/data/lessons.js (add `takeaway` ×8), src/components/ResultsPanel.jsx
**AC:** Takeaway line renders on every result, real or offline.

### T-v1-5 — Lesson 8 finale screen
Files: src/screens/Completion.jsx (upgrade)
- Fuller XP/level/streak summary + one marked placeholder slot for the
  v2 Audition callback (no speculative logic)
**AC:** Renders at 375/768/1440; replay path intact.

### T-v1-6 — Responsive audit + phone smoke test
No new files — every screen × 375/768/1440 with real content, fix drift;
finish on the live URL with a real phone on mobile data.
**AC:** No horizontal scroll anywhere; ~65ch prose holds; phone run clean.

### T-v1-7 — Docs (SRS + UML) — ⏸ PARKED until after teacher demo
Files: docs/SRS.md, docs/uml/*
- SRS cites v2/v3 as versioned roadmap; content pipeline: "AI-assisted
  generation with human curation, seeded from user interviews"; three-tier
  degradation + quota architecture section
**AC:** A stranger could reconstruct Cue's scope from the SRS alone.

### T-v1-8 (STRETCH) — Opening Act Beats 2–5, no title animation
Dies without ceremony if anything above is at risk.

---

## Ship gate

T-v1-6 done → tag `v0.95` (code-complete). T-v1-7 done → phone re-check →
tag `v1.0` → GitHub Release → submission links to the release, not main.

## v2 / v3

Live in `roadmap.md`. Items are ticketized lazily — one at a time, the day
each is about to be built, never before. No v2 work before v1.0 is tagged.

## Tripwires

- The proxy was the last architecture change
- No chart libraries (Season Report is hand-rolled SVG), no new deps
  without a fight, no billing on the Gemini account — ever
- Quota diet: develop against the offline heuristic; real requests are
  for content checks and demos only (~40/day across the chain)