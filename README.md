# 🎭 Cue

**Your cue to ask better.**

Cue is an interactive web app that teaches anyone — students, everyday users, professionals — to communicate clearly and economically with AI. No signup, no friction: **the landing screen *is* the first challenge.** Open the page, start typing.

**Live:** https://cue-orpin-five.vercel.app

> The name comes from theatre: the prompter in the wings who gives actors their **cue**. Cue does the same for your prompts.

---

## ✨ Features

- **8 hands-on lessons × 3 personas** — 24 hand-crafted scenarios rooted in Indian everyday life (pressure-cooker whistles, sabzi mandi decisions, one-blackboard classrooms), sourced from user interviews
- **AI-powered feedback** — Gemini scores your prompt (0–100), names strengths and improvements, and rewrites your prompt while keeping your intent
- **Three-tier evaluation resilience** — primary model → backup model (separate quota bucket) → client-side heuristic; the active engine shows as a badge on every result
- **Live token counter** — see the cost of your words as you type; Lesson 8 puts you on a strict token budget
- **XP, levels & streaks** — 50 XP base + score bonus, level milestones at 100/250/500/1000/2000, half-XP replays, daily streaks
- **Zero friction, offline-tolerant** — no account, progress in localStorage, graceful degradation everywhere
- **Mobile-first, desktop first-class** — single column on phones; two-panel challenge screen + keyboard shortcuts ≥1024px
- **Accessible** — WCAG AA contrast pass, full keyboard-only flow, screen-reader announcements

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 (Vite) |
| Styling | Tailwind CSS v4 — dark theme, amber accent, theatre motif |
| AI evaluation | Gemini Flash-Lite → Flash fallback chain, strict `responseSchema` JSON, via a stateless serverless proxy |
| Persistence | localStorage only |
| Hosting | Vercel (frontend + `/api` function, single deploy) |
| Backend | **None** — one stateless function, no database, no auth |
| Tests | Vitest — 14 unit tests on the gamification engine |

## 🚀 Run locally

```bash
git clone https://github.com/qusai-Kagal/cue.git
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

The Gemini API key is **never shipped to the client**. It lives server-side in a stateless serverless function (`api/evaluate.js`) that proxies evaluation requests — not in the bundle, not in devtools, not in git. Defense in depth: input length caps at the proxy, and the key is scoped + quota-capped in Google Cloud.

## 📚 The lessons

1. Be Specific · 2. Give Context · 3. Define the Output Format · 4. Set Constraints · 5. Provide Examples · 6. Assign a Role · 7. Iterate & Refine · 8. **Prompt Economy** — beat the token budget

Each lesson ships in three persona variants, so the scenario always feels like *your* world.

## 🗺️ Status

**v1 MVP feature-complete and live.** Currently in the pre-submission sprint — see [`task.md`](./task.md) for active tickets and [`roadmap.md`](./roadmap.md) for the full v1/v2/v3 plan.

- [x] Phases 0–6 — scaffold → data → challenge UX → evaluation → loop → screens → content & polish
- [ ] v1 sprint — bug fixes, rubric heuristic v2, finale, responsive audit
- [ ] Docs — SRS + UML (pre-submission)

## 📄 About

Final-year BSc Computer Science capstone, KC College, Mumbai (2026).
Built solo by [Qusai Kagalwala](https://github.com/qusai-Kagalwala) · [LinkedIn](https://www.linkedin.com/in/qusai-kagalwala/)

🏆 Content approach informed by a 1st-place finish in Prompt Craft, Cyberstrike'25.

## License

[MIT](./LICENSE)