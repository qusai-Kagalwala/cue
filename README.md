# 🎭 Cue

**Your cue to ask better.**

Cue is an interactive web app that teaches anyone — students, everyday users, professionals — to communicate clearly and economically with AI. No signup, no friction: **the landing screen *is* the first challenge.** Open the page, start typing.

**Live:** https://cue-orpin-five.vercel.app

> The name comes from theatre: the prompter in the wings who gives actors their **cue**. Cue does the same for your prompts.

---

## ✨ What's inside (v2.0)

**The teaching ladder** — every lesson climbs three rungs:
1. **Guided warm-up** — fill-in-the-blank skeletons; the structure is visible, you supply the specifics
2. **Assisted rehearsal** — write freely while a live checklist ticks off the six prompt dimensions as you type
3. **The assessment** — your best prompt, scored 0–100 by AI, with strengths, fixes, and a rewritten example

**The Opening Act** — a skippable first-visit sequence: typewriter title, your name on the programme, **The Audition** (pick-the-better-prompt + a mini task that sets your starting rank), and a persona pick — or describe yourself in a line and the **matcher** classifies your track.

**24 core scenarios × 3 personas** — hand-crafted from user interviews, rooted in Indian everyday life (pressure-cooker whistles, sabzi mandi decisions, one-blackboard classrooms) — plus **48 curated practice scenarios** across the guided and assisted tiers.

**The Sandbox** — bring real life in: **Freeplay** evaluates any prompt; **The Critic's Review** judges a prompt *and the answer it produced*, tracing answer weaknesses back to prompt gaps. Daily quota grows with your level.

**The Encore & the daily** — a Level-4-gated daily boss (every dimension, tight token budget, 100 base XP) and a starred daily lesson riding +20 XP, both on one date-seeded picker.

**Your Progress** — the **Season Report** (hand-rolled SVG score chart over your whole history, honest about offline estimates) and **The Playbill** (eight theatre-sticker achievements, earned states persisted).

**The library** — every prompt that scores 58+ with the real evaluator is kept automatically, ready to copy back into real life.

**Identity & reward** — theatre rank ladder (Understudy → Playwright), audition-vs-closing-night callback with a word-level prompt diff, canvas share cards, XP with level unlocks (light theme at L3, the Encore at L4), streaks, voice input (English/हिंदी).

**Yours, portably** — everything lives in localStorage; one-button export/import moves the whole account as a single JSON file.

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 (Vite) |
| Styling | Tailwind CSS v4 — CSS-first tokens; dark default + AA-checked light theme (L3 unlock) |
| AI evaluation | Gemini Flash-Lite → Flash fallback chain via a stateless serverless proxy; three modes (lesson / review / persona), strict `responseSchema` JSON |
| Offline scoring | Six-dimension weighted rubric — powers the fallback, the Audition, the live checklist, and both practice tiers at zero quota |
| Persistence | localStorage only — state, attempt history, library, playbill; full export/import |
| Hosting | Vercel (frontend + `/api` function, single deploy) |
| Backend | **None** — one stateless function, no database, no auth, no analytics |
| Tests | Vitest — 21 unit tests (XP engine + season stats) |
| Calibration | Offline Python (stdlib-only ridge regression) proposing rubric weights from real evaluation data |

## 🚀 Run locally

```bash
git clone https://github.com/qusai-Kagalwala/cue.git
cd cue
npm install
npm run dev        # UI-only work (evaluation needs the proxy)
```

For real evaluation locally, run through the Vercel CLI so `/api` works:

```bash
npm i -g vercel && vercel login && vercel link
cp .env.example .env    # add your Gemini API key
vercel dev
```

Requires Node 18+.

## 🔑 Security

The Gemini API key **never ships to the client** — it lives in one stateless serverless function. Pasted content in the Critic's Review and the persona matcher is fenced and declared data-not-instructions; injection attempts are judged as material, never obeyed. Input caps at the proxy; key scoped and quota-capped in Google Cloud.

## 📚 The lessons

1. Be Specific · 2. Give Context · 3. Define the Output Format · 4. Set Constraints · 5. Provide Examples · 6. Assign a Role · 7. Iterate & Refine · 8. **Prompt Economy**

Each in three persona variants, each with a one-line takeaway, each climbable in three rungs.

## 🗺️ Status

**✅ v2.0 complete.** v1.0 shipped and teacher-approved; the full v2 board (17 items, ~30 tickets) is built and live. Next: v3 drafts, then docs (SRS + UML) as the final pre-submission phase. See [`task.md`](./task.md) and [`roadmap.md`](./roadmap.md).

## 📄 About

Final-year BSc Computer Science capstone, KC College, Mumbai (2026).
Built solo by [Qusai Kagalwala](https://github.com/qusai-Kagalwala) · [LinkedIn](https://www.linkedin.com/in/qusai-kagalwala/)

🏆 Content approach informed by a 1st-place finish in Prompt Craft, Cyberstrike'25.

## License

[MIT](./LICENSE)