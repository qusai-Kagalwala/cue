# Cue — Project File Structure

The complete tree as it will look at submission (Phase 7). Files marked with the phase that creates them — anything unmarked exists already from Phase 0.

```
cue/
├── api/
│   └── evaluate.js              # P3 · serverless proxy — the ONLY place the Gemini key is used
│
├── public/
│   └── favicon.svg              # P6 · amber "C" mark (theatre motif, optional polish)
│
├── src/
│   ├── components/              # dumb, reusable UI pieces
│   │   ├── TopBar.jsx           # ✅ logo, streak flame, XP pill, nav icons
│   │   ├── TokenCounter.jsx     # P2 · live count, amber/red budget states
│   │   ├── PersonaPicker.jsx    # P2 · inline first-visit chips
│   │   ├── ScenarioCard.jsx     # P2 · scenario + task + hints display
│   │   ├── PromptInput.jsx      # P2 · mono textarea + submit + shortcuts
│   │   ├── ResultsPanel.jsx     # P4 · score, strengths, improvements, rewrite
│   │   ├── ScoreDial.jsx        # P4 · the 0–100 visual
│   │   ├── XPToast.jsx          # P4 · "+50 +32 XP" / level-up state
│   │   ├── AutoContinue.jsx     # P4 · next button + 8s countdown + cancel
│   │   ├── CurtainLoader.jsx    # P3 · amber shimmer line while evaluating
│   │   └── ConfirmDialog.jsx    # P5 · used by settings reset
│   │
│   ├── screens/                 # one component per route
│   │   ├── Challenge.jsx        # ✅ stub → P2 real layout (mobile + two-panel)
│   │   ├── LessonMap.jsx        # ✅ stub → P5 list/grid of 8 lesson cards
│   │   ├── Settings.jsx         # ✅ stub → P5 persona switch + reset
│   │   ├── Completion.jsx       # P4 · after lesson 8 — totals + replay CTA
│   │   └── TokensDemo.jsx       # ✅ throwaway — DELETE in P2
│   │
│   ├── data/
│   │   └── lessons.js           # P1 stubs → P6 real content · 8 lessons × 3 variants
│   │
│   ├── lib/                     # pure logic, no React imports
│   │   ├── storage.js           # P1 · localStorage blob under `cue:v1`
│   │   ├── xp.js                # P1 · awardXP, levelFor, streak logic (pure fns)
│   │   ├── tokens.js            # P2 · estimateTokens = ceil(len/4)
│   │   ├── gemini.js            # P3 · thin client → POST /api/evaluate, typed EvalError
│   │   └── heuristic.js         # P3 · offline fallback mini-score
│   │
│   ├── hooks/
│   │   ├── useProgress.js       # P1 · single source of truth: persona, XP, streak, lesson index
│   │   └── useEvaluation.js     # P3 · idle → evaluating → done | error state machine
│   │
│   ├── App.jsx                  # ✅ state routing between screens
│   ├── main.jsx                 # ✅ vite entry
│   └── index.css                # ✅ tailwind v4 @theme — ALL design tokens live here
│
├── tests/
│   └── xp.test.js               # P1 · vitest — XP/level/streak pure functions
│
├── docs/                        # P7 · college submission material
│   ├── SRS.md                   # scope, requirements, security design decision
│   └── uml/
│       ├── use-case.png
│       ├── class-diagram.png
│       └── sequence-evaluate.png   # the viva money slide
│
├── .env                         # 🔒 gitignored · GEMINI_API_KEY=... (P3, local vercel dev)
├── .env.example                 # GEMINI_API_KEY=your-key-here
├── .gitignore                   # node_modules, dist, .env, .vercel
├── index.html                   # ✅ fonts (Fraunces/Space Grotesk/JetBrains Mono), dark <html>
├── vite.config.js               # ✅ react + tailwindcss plugins
├── package.json
├── README.md                    # ✅ v2
├── task.md                      # ✅ v2 ticket backlog
└── LICENSE                      # MIT
```

## Rules the structure enforces

- **`lib/` is React-free.** Pure functions only — this is what makes T1.3 unit-testable and gives the class diagram clean boxes.
- **No component touches localStorage or fetch directly.** Screens/components → hooks → lib. One-way dependency flow; this IS the architecture section of your SRS.
- **`api/` sits outside `src/`.** Vercel deploys it as a serverless function; Vite never bundles it — that separation is exactly why the key stays server-side.
- **All colors/fonts live in `index.css` `@theme`.** If a hex code appears anywhere else, it's a bug.
- **No Tailwind config file** — v4 is CSS-first; don't let an AI session "helpfully" create `tailwind.config.js`.
- **~25 source files total.** If a ticket wants to create a file not on this tree, question it before accepting.

## Files per phase (session planning)

| Phase | Creates/edits |
|---|---|
| 1 | `data/lessons.js`, `lib/storage.js`, `lib/xp.js`, `hooks/useProgress.js`, `tests/xp.test.js` |
| 2 | `lib/tokens.js`, `TokenCounter`, `PersonaPicker`, `ScenarioCard`, `PromptInput`, real `Challenge.jsx` (deletes `TokensDemo`) |
| 3 | `api/evaluate.js`, `lib/gemini.js`, `lib/heuristic.js`, `hooks/useEvaluation.js`, `CurtainLoader` |
| 4 | `ResultsPanel`, `ScoreDial`, `XPToast`, `AutoContinue`, `Completion.jsx` |
| 5 | real `LessonMap.jsx`, real `Settings.jsx`, `ConfirmDialog` |
| 6 | real content in `lessons.js`, `favicon.svg`, edge-state edits across screens |
| 7 | `docs/` everything |