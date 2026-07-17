# Cue — Task Board (v4)

**Rules:** one ticket = one AI session = one commit. Files per ticket are the
scope fence. Strategy lives in `roadmap.md`; only ticketized work lives here.
v2 items are ticketized LAZILY — one at a time, the day each is built.

---

## ✅ v1.0 — SHIPPED & TEACHER-APPROVED (tagged)

**Phases 0–6:** scaffold, tokens, shell · data layer + XP engine (14 tests) ·
challenge UX (mobile-first, two-panel, shortcuts) · serverless proxy +
fallback chain + heuristic · results loop, auto-continue (25s), budget
mode · map (half-XP replays), settings · 24 interview-sourced scenarios,
edge states, a11y AA pass, mode badge.

**v1 sprint:** transition-gated XP + prompt-hash dedup + attempt logger ·
cold-start fix (12s timeout, warm-up ping, retry routing) · rubric scorer
v2 (6 weighted dimensions, seeded templates, reusable platform) ·
takeaway lines ×8 · finale upgrade (attempts, best-score strip, Audition
slot) · responsive audit + phone smoke test.

---

## 🔨 Active — v2 Build (in roadmap order, ticketized on demand)

**NEXT UP → v2-1: Shareable result cards** — say "go v2-1" to ticketize.
Canvas-generated score/level/streak image, client-side · rank titles as
XP sink: Understudy → Ensemble → Lead → Director → Playwright.

**Queue (see roadmap.md for full specs):**
2. The Sandbox (Freeplay + The Critic's Review, shared daily cap)
3. The Opening Act (5 beats incl. The Audition — rubric-scored, zero quota)
4. Audition callback + prompt diff view (fills the finale slot)
5. Graded practice mode (Guided/Assisted/Solo + offline content pipeline)
6. AI courses resources page
7. Custom persona onboarding (tier-1 matcher, one Gemini call)
8. Voice input (Web Speech, hi-IN/en-IN)
9. The Encore (boss challenge, Level 4 gate)
10. Daily challenge (Encore's date-seeded picker)
11. Prompt library
12. The Season Report (SVG analytics on the attempt history)
13. The Playbill (achievements grid)
14. Import/export (JSON, history included)
15. Light theme (Level 3 unlock)
16. CSS-only animations
17. Python heuristic calibration → new LESSON_WEIGHTS constants

---

## ⏭ After v2 — v3 drafts

Localization · adaptive tracks · one sound cue. Draft-level only.

## 📄 Final phase — DOCS (deliberately last, per amended plan)

SRS + UML + submission package → final tag → GitHub Release → submit.
**Standing mitigation so this stays assembly, not archaeology:**
- `docs/decisions.md` — one line per architectural decision, written the
  moment it's made during v2 (30 seconds each, non-negotiable)
- roadmap.md updated as versions complete; commits stay ticket-tagged

## Ship gates

v2 milestones tag as v1.x when natural · final tag after docs · submission
links the Release, never main.

## Tripwires

- The proxy was the last architecture change
- No chart libraries (Season Report = hand-rolled SVG); no new deps
  without a fight; no billing on the Gemini account — ever
- Quota diet: develop offline against the rubric; real requests for
  content checks and demos (~40/day across the chain)
- Solo evaluations only award XP; practice tiers never do
- decisions.md gets its line BEFORE the commit, not "later"