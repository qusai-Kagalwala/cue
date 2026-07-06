# Cue — Build Plan (AI-Ticket Backlog) · v2

**Format:** Every ticket is sized to be one AI-assistant session (paste the ticket, get working code, verify, commit). Each has acceptance criteria (AC) so you know when it's done. Build strictly in order — later tickets assume earlier ones exist.

**Golden rule:** One ticket = one commit. Never let an AI session touch files outside the ticket's scope.

**v2 changes:** Hosting pivoted to **Vercel + stateless serverless proxy** for the Gemini key. The key never ships to the client. Phase 3 and 7 updated; Phase 0 complete. This does NOT break the "no backend" lock — one stateless function, no database, no auth, no server to maintain.

---

## Phase 0 — Scaffold ✅ COMPLETE

### ✅ T0.1 — Project scaffold
Vite + React + Tailwind v4. Folder structure:
```
src/
  components/     # dumb UI pieces
  screens/        # Challenge, Results, LessonMap, Settings
  data/           # lessons.js (static content)
  lib/            # storage.js, gemini.js, tokens.js, xp.js
  hooks/          # useProgress, useEvaluation
api/
  evaluate.js     # serverless proxy (Phase 3)
```
**AC:** `npm run dev` works; Tailwind renders; dark bg by default. ✅

### ✅ T0.2 — Design tokens
Tailwind v4 `@theme` in `index.css`: warm near-black stage (`#0e0d0b`), amber cue accent (`#f5b942`), Fraunces (display) / Space Grotesk (UI) / JetBrains Mono (prompt + counter). Amber focus rings + selection styles locked on day 1.
**AC:** TokensDemo page verified at 375 / 768 / 1440. ✅

### ✅ T0.3 — App shell + routing
State-based routing (no router lib): Challenge / Map / Settings. Sticky top bar: Fraunces "Cue" logo (always returns to Challenge), streak flame, XP/level pill, nav icons.
**AC:** Works at 375px, amber focus rings, no horizontal scroll. ✅

---

## Phase 1 — Data & State (Week 1–2)

### T1.1 — Lesson content schema
Define the shape in `data/lessons.js`:
```js
{
  id: 'l1',
  title: 'Be Specific',
  concept: '...',          // 2-3 sentence teaching blurb
  order: 1,
  tokenBudget: null,       // number for Lesson 8 only
  variants: {
    student:      { scenario, task, exampleBad, hints: [] },
    everyday:     { ... },
    professional: { ... }
  }
}
```
Stub all 8 lessons with placeholder text (real content is Phase 6 — don't write copy now).
**AC:** 8 lessons × 3 variants stubbed; a `getLesson(id, persona)` helper.

### T1.2 — localStorage store
`lib/storage.js`: single JSON blob under one key (`cue:v1`). Shape: `{ persona, currentLessonIndex, xp, level, streak: { count, lastActiveDate }, lessonScores: {}, settings }`. Read/write helpers with try/catch (corrupt JSON → reset with console warning). Version field for future migration.
**AC:** Survives refresh; corrupt data doesn't white-screen the app.

### T1.3 — XP / level / streak logic
`lib/xp.js`: pure functions, no React. `awardXP(score)` → 50 base + bonus (score 0–100 → bonus = round(score/2)). Level thresholds [100, 250, 500, 1000, 2000]. Streak: increments if lastActiveDate was yesterday, resets if older, unchanged if today.
**AC:** Unit-testable pure functions; 5–6 quick Vitest tests (cheap win for the SRS test section).

### T1.4 — useProgress hook
Wraps storage + xp lib into one hook: `{ persona, setPersona, currentLesson, completeLesson(score), xp, level, streak }`. All screens consume this — no component touches localStorage directly. Replace the TopBar stub values.
**AC:** TopBar and Challenge stay in sync through the hook.

---

## Phase 2 — Challenge Screen, Mobile-First (Week 2)

### T2.1 — Token counter
`lib/tokens.js`: `estimateTokens(str) = Math.ceil(str.length / 4)`. Component: live count under the textarea, mono font, amber when within budget, red (`over`) when over (budget only applies in Lesson 8; otherwise plain count).
**AC:** Updates on every keystroke with zero lag on a long paste.

### T2.2 — Challenge screen layout (mobile)
The landing screen. Single column at 375px: concept blurb (collapsible), scenario card, prompt textarea (mono), token counter, submit button. Zero-friction: no modal, no "start" button — user can type immediately on load.
**AC:** Fully usable at 375px with keyboard open; no horizontal scroll; textarea autofocuses on desktop but NOT on mobile (autofocus pops the keyboard over content).

### T2.3 — First-visit persona picker
Inline, not a modal wall: first visit shows three persona chips above the challenge ("I'm a… Student / Everyday user / Professional"), picking one instantly swaps variant text and persists. Changeable later in settings.
**AC:** Picking persona never navigates away from the challenge; returning users skip it.

### T2.4 — Desktop two-panel layout (≥1024px)
Left panel: concept + scenario + hints. Right panel: textarea + counter + submit. Keyboard shortcuts: `Ctrl/Cmd+Enter` submit, sane Tab behavior in textarea, `?` shows shortcut overlay.
**AC:** 768px still single column; 1440px two-panel with ~65ch line lengths.

---

## Phase 3 — Gemini Evaluation via Serverless Proxy (Week 3)

> 🔑 **Key architecture (v2):** the Gemini key lives ONLY in Vercel's environment variables (`GEMINI_API_KEY`, no `VITE_` prefix) and local `.env`. It is never bundled client-side. Keep the key itself restricted in Google Cloud anyway: Gemini API scope only + daily quota cap (~200/day). Defense in depth.

### T3.0 — Vercel project setup (30 min, do first)
Import the `cue` repo in Vercel (auto-detects Vite). Add `GEMINI_API_KEY` env var in dashboard. Install CLI: `npm i -g vercel`, `vercel login`, `vercel link`. From now on use `vercel dev` instead of `npm run dev` so `/api` routes run locally. Add key to local `.env`; confirm `.env` is gitignored; `.env.example` has `GEMINI_API_KEY=your-key-here`.
**AC:** `vercel dev` serves the app; pushes to main auto-deploy.

### T3.1 — Serverless proxy + thin client
`api/evaluate.js`: POST-only handler; validates input (type/length caps, reject empty); calls Gemini Flash with `responseMimeType: "application/json"` + response schema:
```json
{ "score": 0-100, "strengths": ["..."], "improvements": ["..."], "rewrittenExample": "...", "budgetRespected": true }
```
System prompt template lives server-side. 15s AbortController timeout. Maps upstream failures to typed errors: `RATE_LIMIT`, `TIMEOUT`, `BAD_JSON`, `NETWORK`, `UPSTREAM`, `BAD_INPUT`.
`lib/gemini.js`: thin client calling `/api/evaluate`, parses JSON, throws typed `EvalError`.
**AC:** Real prompt gets a real scored JSON response through the proxy; each error path returns its typed code.

### T3.2 — Resilience layer
Retry once on `BAD_JSON`/`NETWORK`. On final failure: graceful fallback card — "Couldn't evaluate right now" + a client-side heuristic mini-score (length in sane range? mentions scenario keywords? within budget?) clearly labeled "offline estimate", so the app never dead-ends. Fallback awards flat 50 XP, no bonus.
**AC:** Kill the network in devtools → app degrades gracefully, no crash, XP still flows.

### T3.3 — useEvaluation hook + loading state
States: `idle → evaluating → done | error`. Evaluating state shows a subtle amber "curtain line" shimmer (theatre motif, cheap). Double-submit blocked while evaluating.
**AC:** Double-submit blocked; Escape doesn't break state.

---

## Phase 4 — Results & Loop (Week 4)

### T4.1 — Results panel
Renders below/beside the challenge (not a new page — keep the loop tight): score dial or bar, strengths, improvements, rewritten example in a copyable block, XP earned toast (+50 +bonus), level-up state if crossed.
**AC:** Readable at 375px; rewritten example has a copy button.

### T4.2 — Auto-continue
After results: "Next lesson" primary button + 8s auto-advance with visible countdown and a cancel. Advances `currentLessonIndex`; after Lesson 8, completion state (total XP, level, streak, "replay any lesson" → map).
**AC:** Auto-advance cancellable; refresh mid-results doesn't lose the score (persist on receipt, not on advance).

### T4.3 — Lesson 8 token budget mode
Budget shown prominently; counter turns red over budget; submit allowed but the proxy's system prompt includes the budget and `budgetRespected` gates part of the score.
**AC:** Over-budget submit gets scored lower and the feedback names it.

---

## Phase 5 — Secondary Screens (Week 4)

### T5.1 — Lesson map
Simple vertical list (mobile) / grid (desktop): 8 cards with title, best score, done/current/locked state. Tapping a completed lesson replays it (replays award half XP — documented).
**AC:** Locked lessons visibly locked; current lesson highlighted amber.

### T5.2 — Settings
Persona switcher, theme note (dark only for MVP), reset progress with confirm.
**AC:** Reset wipes storage and lands you on Lesson 1 persona picker.

---

## Phase 6 — Content & Polish (Week 5)

### T6.1 — Write real lesson content (the big one)
24 variants (8 × 3). Draft these yourself — this is the pedagogical core and your viva differentiator. Use AI to critique/tighten drafts, not generate them. Lesson arc:
1. Be Specific · 2. Give Context · 3. Define the Output Format · 4. Set Constraints · 5. Provide Examples (few-shot) · 6. Assign a Role · 7. Iterate & Refine · 8. Prompt Economy (token budget)
**AC:** Every variant has scenario, task, one bad example, 2 hints; a classmate can complete Lesson 1 without asking you anything.

### T6.2 — Empty/edge states
No-JS message, tiny screens (<340px), very long prompts (cap ~2000 chars with counter), localStorage full/blocked (private mode Safari), `/api/evaluate` cold-start slowness (first request after idle can take 2–4s — the loading state must feel intentional).
**AC:** No white screens under any of these.

### T6.3 — A11y pass
Focus rings (amber, already global), textarea labeled, results announced via `aria-live`, contrast check on amber-on-dark.
**AC:** Full keyboard-only run-through of one lesson works.

### T6.4 — Responsive audit
One session: screenshot walkthrough at 375 / 768 / 1440 of every screen, fix drift.
**AC:** No horizontal scroll anywhere; two-panel only ≥1024px.

---

## Phase 7 — Docs & Submission (Week 6)

### T7.1 — SRS
Reuse the locked-decisions list as the scope section. Security section (v2 upgrade): "Gemini key secured server-side via stateless serverless proxy; no persistent backend. Key additionally scoped + quota-capped in Google Cloud." Known limitation: localStorage-only persistence (data loss on browser clear).

### T7.2 — UML
Use-case diagram (learner, Gemini API as external actor). Class diagram (storage/xp/tokens libs + hooks + proxy). Sequence diagram: **submit → /api/evaluate → Gemini → JSON → award XP → persist → auto-continue** — now with the proxy hop, this is your money slide for the viva.

### T7.3 — Production checks
Deploy is already continuous (T3.0). Remaining: smoke test on a real phone over mobile data, verify env var present in production, confirm quota cap active, add the live URL to the README + repo About field.

---

## Week Map (5–6 weeks)

| Week | Phases | Milestone |
|------|--------|-----------|
| 1 | 0 ✅ + 1 | Shell done; state + stub lessons |
| 2 | 2 | Challenge screen usable end-to-end (no eval yet) |
| 3 | 3 | Vercel live; real Gemini scoring through proxy, with fallback |
| 4 | 4 + 5 | Full loop + map + settings = feature-complete |
| 5 | 6 | Real content + polish |
| 6 | 7 | Docs, smoke tests, buffer |

**Buffer strategy:** Content writing (T6.1) always overruns. If a week slips, cut from Phase 5 polish, never from Phase 3 resilience or Phase 6 content.

---

## MVP tripwires (things you'll be tempted to add — don't)
- Light theme, animations beyond one shimmer, sound effects → post-MVP
- Per-lesson difficulty levels → that's what personas already are
- "Compare with other users" → needs a real backend, locked out
- Auth/rate-limiting on the proxy beyond input caps + quota cap → post-MVP
- Caching Gemini responses → only if you actually hit rate limits, otherwise skip
- **The proxy was the last architecture change.** Next idea gets measured against the Week 5 content wall.