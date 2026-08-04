# 🎭 Cue

**Your cue to ask better.**

Cue is an interactive web app that teaches anyone — students, everyday users, professionals — to communicate clearly and economically with AI. No signup, no friction: **the landing screen *is* the first challenge.** Open the page, start typing.

**Live:** https://cue-orpin-five.vercel.app

> The name comes from theatre: the prompter in the wings who gives actors their **cue**. Cue does the same for your prompts.

---

## 🎭 Multi-modal — the ten Stages

Cue teaches **ten stages** of prompt craft through one machine, grouped into
everyday craft, the agentic track, and a capstone:

**Everyday craft** — Text · Image · Video · Audio
**Directing AI** — Code · Agent · Context · Automation · System
**Capstone** — Reading (understanding the AI's *response*)

The advanced stages teach the skills that grow as base models get smarter:
briefing a coding **Agent** (Claude Code, Cursor), designing **Context** for an
AI (the skill behind RAG), describing an **Automation** (n8n, Zapier), and
writing a **System** prompt (the persistent rules that govern an AI).

The capstone **Reading** stage flips the whole app around: every other stage
teaches you to make an AI understand *you*; Reading teaches you to understand
the *AI* — to verify, critique, correct, and act on the answer it gives back.
The AI's response is shown on screen and the learner reads it, so it scores a
critical reading, not a prompt.

A "stage" is a content pack — 8 lessons, 24 scenarios across three tiers, and
its own six-dimension rubric — flowing through the *unchanged* app: same
ladder, same XP, same Encore, same Season Report. Your name, rank, streak and
stickers travel across every stage; each keeps its own lesson progress.

Every stage after the first two changed exactly one data file each and **zero
screens** — the architecture's core claim, proven ten times over.

## ✨ What's inside

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

**The Programme** — a built-in user guide (Settings → 🎭): every feature, where to find it, how to use it — the booklet at the theatre door.

**Ten stages live** — Text and Image (with lens terms, aspect ratios, art movements, negative prompts), Video, Audio, Code, the four agentic-era stages (Agent, Context, Automation, System), and the **Reading** capstone (judging an AI's response). Each has its own six-dimension rubric; the checklist relabels itself per stage.

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 (Vite) |
| Styling | Tailwind CSS v4 — CSS-first tokens; dark default + AA-checked light theme (L3 unlock) |
| AI evaluation | Gemini Flash-Lite → Flash fallback chain via a stateless serverless proxy; three modes (lesson / review / persona), strict `responseSchema` JSON |
| Cue Sense | Six-dimension weighted rubric **per stage** — Cue's on-device read that powers instant scoring, the Audition, the live checklist, and both practice tiers at zero quota |
| Stages | All ten shipped: Text · Image · Video · Audio · Code · Agent · Context · Automation · System · Reading |
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

**✅ v2.0 complete**, **✅ v3–v7 complete** — the machine is stage-aware and all ten stages are live, including the full agentic track (Agent, Context, Automation, System) and the Reading capstone (understanding AI output). Character avatars, per-stage background motifs (with a light-mode-aware toggle), and Cue Sense round out the experience. Docs (SRS + UML) land as the final phase. See [`task.md`](./task.md), [`roadmap.md`](./roadmap.md), and the architecture contract in [`docs/v3-stages.md`](./docs/v3-stages.md). See [`task.md`](./task.md) and [`roadmap.md`](./roadmap.md).

## 📄 About

Final-year BSc Computer Science capstone, KC College, Mumbai (2026).
Built solo by [Qusai Kagalwala](https://github.com/qusai-Kagalwala) · [LinkedIn](https://www.linkedin.com/in/qusai-kagalwala/)

🏆 Content approach informed by a 1st-place finish in Prompt Craft, Cyberstrike'25.

## License

[MIT](./LICENSE)