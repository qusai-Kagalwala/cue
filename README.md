# 🎭 Cue

**Your cue to ask better.**

Cue is an interactive web app that teaches anyone — students, everyday users, professionals — to communicate clearly and economically with AI. No signup, no friction: **the landing screen *is* the first challenge.** Open the page, start typing.

> The name comes from theatre: the prompter in the wings who gives actors their **cue**. Cue does the same for your prompts.

---

## ✨ Features

- **8 hands-on lessons** — from being specific to prompt economy, in a flat auto-continuing queue
- **3 persona tracks** — the same lesson, framed for a student, an everyday user, or a professional
- **AI-powered feedback** — Gemini Flash scores your prompt (0–100), highlights strengths and improvements, and shows a stronger rewrite
- **Live token counter** — see the cost of your words as you type; Lesson 8 puts you on a strict token budget
- **XP, levels & streaks** — 50 XP base + score bonus per lesson, level milestones at 100 / 250 / 500 / 1000 / 2000, daily streaks
- **Zero friction, offline-tolerant** — no account, progress lives in localStorage, graceful fallback if the API is unreachable
- **Mobile-first, desktop first-class** — single column on phones, two-panel challenge screen + keyboard shortcuts at ≥1024px

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 (Vite) |
| Styling | Tailwind CSS v4 — dark theme, amber accent, subtle theatre motif |
| AI evaluation | Gemini Flash (strict JSON output) via a stateless serverless proxy |
| Persistence | localStorage only |
| Hosting | Vercel (frontend + `/api` function, single deploy) |
| Backend | **None** — one stateless function, no database, no auth |

## 🚀 Run locally

```bash
git clone https://github.com/qusai-Kagal/cue.git
cd cue
npm install
npm run dev        # Phases 0–2: pure client-side work
```

Once the evaluation proxy exists (Phase 3+), run through the Vercel CLI instead so the `/api` route works locally:

```bash
npm i -g vercel && vercel login && vercel link
cp .env.example .env    # add your Gemini API key
vercel dev
```

Requires Node 18+.

## 🔑 Security

The Gemini API key is **never shipped to the client**. It lives server-side in a stateless serverless function (`api/evaluate.js`) that proxies evaluation requests — no key in the bundle, in devtools, or in git. Defense in depth: the key is additionally scoped to the Gemini API only and quota-capped in Google Cloud.

## 📚 The lessons

1. Be Specific
2. Give Context
3. Define the Output Format
4. Set Constraints
5. Provide Examples (few-shot)
6. Assign a Role
7. Iterate & Refine
8. Prompt Economy — beat the token budget

Each lesson ships in three persona variants, so the scenario always feels like *your* world.

## 🗺️ Status

🚧 **In active development** — building in public over a 6-week sprint. See [`task.md`](./task.md) for the full ticket backlog.

- [x] Phase 0 — Scaffold, design tokens, app shell
- [x] Phase 1 — Data layer & progress state
- [x] Phase 2 — Challenge screen (mobile-first)
- [ ] Phase 3 — Gemini evaluation via serverless proxy
- [ ] Phase 4 — Results & auto-continue loop
- [ ] Phase 5 — Lesson map & settings
- [ ] Phase 6 — Real lesson content & polish
- [ ] Phase 7 — Docs (SRS, UML) & production checks

## 📄 About

Final-year BSc Computer Science capstone project, KC College, Mumbai (2026).
Built solo by [Qusai Kagalwala](https://github.com/qusai-Kagalwala) · [LinkedIn](https://www.linkedin.com/in/qusai-kagalwala/)

## License

[MIT](./LICENSE)