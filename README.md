# 🎭 Cue

**Your cue to ask better.**

Cue is an interactive web app that teaches anyone — students, everyday users, professionals — to communicate clearly and economically with AI. No signup, no friction: **the landing screen *is* the first challenge.** Open the page, start typing.

**Live:** https://cue-orpin-five.vercel.app

> The name comes from theatre: the prompter in the wings who gives actors their **cue**. Cue does the same for your prompts.

---

## ✨ Features (v1.0)

- **8 hands-on lessons × 3 personas** — 24 hand-crafted scenarios rooted in Indian everyday life (pressure-cooker whistles, sabzi mandi decisions, one-blackboard classrooms), sourced from user interviews
- **AI-powered feedback** — Gemini scores your prompt (0–100), names strengths and improvements, and rewrites your prompt while keeping your intent
- **Three-tier evaluation resilience** — primary model → backup model (separate quota bucket) → client-side **rubric scorer** (six weighted dimensions, lesson-aware feedback); the active engine shows as a badge on every result
- **Live token counter** — see the cost of your words as you type; Lesson 8 puts you on a strict token budget
- **XP, levels & streaks** — 50 XP base + score bonus, half-XP replays, duplicate-submission dedup, per-lesson takeaways, attempt history from day one
- **Zero friction, offline-tolerant** — no account, progress in localStorage, cold-start warm-up, graceful degradation everywhere
- **Mobile-first, desktop first-class** — two-panel challenge screen + keyboard shortcuts ≥1024px
- **Accessible** — WCAG AA contrast, full keyboard-only flow, screen-reader announcements

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 (Vite) |
| Styling | Tailwind CSS v4 — dark theme, amber accent, theatre motif |
| AI evaluation | Gemini Flash-Lite → Flash fallback chain, strict `responseSchema` JSON, via a stateless serverless proxy |
| Offline scoring | Six-dimension weighted rubric, seeded feedback templates |
| Persistence | localStorage only (state + append-only attempt history) |
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

The Gemini API key is **never shipped to the client**. It lives server-side in a stateless serverless function (`api/evaluate.js`) — not in the bundle, not in devtools, not in git. Defense in depth: input length caps at the proxy, key scoped + quota-capped in Google Cloud.

## 📚 The lessons

1. Be Specific · 2. Give Context · 3. Define the Output Format · 4. Set Constraints · 5. Provide Examples · 6. Assign a Role · 7. Iterate & Refine · 8. **Prompt Economy** — beat the token budget

Each lesson ships in three persona variants, with a one-line takeaway you'll actually remember.

## 🗺️ Status

**✅ v1.0 shipped, demoed, and approved.** Now building v2 — see
[`task.md`](./task.md) for the active board and [`roadmap.md`](./roadmap.md)
for the full v2/v3 plan (Sandbox, Opening Act, practice tiers, Season
Report, and more). Docs (SRS + UML) land as the final pre-submission phase.

## 📄 About

Final-year BSc Computer Science capstone, KC College, Mumbai (2026).
Built solo by [Qusai Kagalwala](https://github.com/qusai-Kagalwala) · [LinkedIn](https://www.linkedin.com/in/qusai-kagalwala/)

🏆 Content approach informed by a 1st-place finish in Prompt Craft, Cyberstrike'25.

## License

[MIT](./LICENSE)