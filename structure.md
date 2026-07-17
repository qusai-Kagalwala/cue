# Cue — Project File Structure

The tree as it stands (v1.0 shipped & teacher-approved) plus what the
current phase will add, marked ⏳. Rule unchanged: **a file not on this tree gets questioned
before an AI session may create it.**

```
cue/
├── api/
│   └── evaluate.js              # serverless proxy — ONLY place the key is used;
│                                #   model chain flash-lite → flash, responseSchema,
│                                #   15s budget, typed errors, returns served model
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── TopBar.jsx           # logo, streak flame, XP pill (tiny-screen safe)
│   │   ├── TokenCounter.jsx     # live est. tokens, budget states, aria-live
│   │   ├── PersonaPicker.jsx    # inline first-visit chips
│   │   ├── ScenarioCard.jsx     # scenario + task + reveal-on-tap hints
│   │   ├── PromptInput.jsx      # mono textarea, 2000-char cap, Ctrl+Enter,
│   │   │                        #   desktop-only autofocus
│   │   ├── ShortcutOverlay.jsx  # `?` overlay, Esc/click-out close
│   │   ├── CurtainLoader.jsx    # amber sweep + cold-start-aware label
│   │   ├── ResultsPanel.jsx     # dial, feedback, copyable rewrite, mode badge
│   │   ├── ScoreDial.jsx        # SVG 0–100 dial (gray when offline)
│   │   ├── XPToast.jsx          # +XP breakdown, replay label, level-up banner
│   │   ├── AutoContinue.jsx     # Next + 25s countdown (user-tested) + cancel
│   │   └── ConfirmDialog.jsx    # destructive-action confirm, Enter=Cancel
│   │
│   ├── screens/
│   │   ├── Challenge.jsx        # THE landing screen: two-panel ≥1024px,
│   │   │                        #   evaluation flow, sr-only live region
│   │   ├── LessonMap.jsx        # 8 cards: done/current/locked, half-XP replays
│   │   ├── Settings.jsx         # persona switch, dark-only note, reset
│   │   └── Completion.jsx       # finale: attempts, best-score strip,
│   │                            #   marked v2 Audition slot
│   │
│   ├── data/
│   │   └── lessons.js           # 24 interview-sourced scenarios + takeaway ×8
│   │
│   ├── lib/                     # pure logic, no React imports
│   │   ├── screens.js           # SCREENS routing constants
│   │   ├── storage.js           # cue:v1 blob, corrupt guard, in-memory fallback
│   │   │                        #   + cue:attempts:v1 append-only history (cap 500)
│   │   ├── xp.js                # awardXP/levels/streaks — the tested core
│   │   ├── tokens.js            # estimateTokens + budgetStatus
│   │   ├── gemini.js            # thin client, 12s timeout, cold-start retry
│   │   │                        #   routing, warm-up ping, model passthrough
│   │   ├── heuristic.js         # thin wrapper over rubric (stable import path)
│   │   └── rubric.js            # THE PLATFORM: 6 weighted dimensions,
│   │                            #   per-lesson weights, seeded templates,
│   │                            #   dimensions breakdown for v2 checklist
│   │
│   ├── hooks/
│   │   ├── useProgress.js       # useSyncExternalStore store: persona, XP,
│   │   │                        #   streak, replay half-XP, goToLesson, reset
│   │   └── useEvaluation.js     # idle→evaluating→done|error, double-submit
│   │                            #   guard, transition-gated XP, hash dedup,
│   │                            #   attempt logging
│   │
│   ├── App.jsx                  # state routing, passes onNavigate
│   ├── main.jsx
│   └── index.css                # ALL design tokens (@theme), AA-passing faint,
│                                #   focus rings, curtain keyframes
│
├── tests/
│   └── xp.test.js               # 14 vitest tests — gamification engine
│
├── docs/                        # FINAL PHASE (after v2 + v3 drafts)
│   ├── decisions.md             # ⏳ start NOW: one line per v2 decision
│   ├── SRS.md                   # ⏳ assembled last from living docs
│   └── uml/                     # ⏳ use-case, class, sequence (evaluate flow)
│
├── .vscode/settings.json        # tailwind v4 at-rules squiggle off
├── .env                         # 🔒 gitignored · GEMINI_API_KEY (local vercel dev)
├── .env.example
├── .gitignore                   # node_modules, dist, .env, .vercel
├── index.html                   # fonts, favicon, dark <html>, noscript fallback
├── vite.config.js               # react + tailwindcss plugins (NO tailwind.config)
├── eslint.config.js             # browser globals for src/, node globals for api/
├── package.json                 # scripts: dev/build/lint/preview/test
├── README.md
├── task.md                      # execution layer (active tickets)
├── roadmap.md                   # strategy layer (v1/v2/v3)
└── LICENSE                      # MIT
```

## Rules the structure enforces

- **`lib/` is React-free.** Pure functions only — testable, and clean UML boxes.
- **One-way flow:** screens/components → hooks → lib. No component touches
  localStorage or fetch directly. This IS the SRS architecture section.
- **`api/` sits outside `src/`** — Vite never bundles it; that separation is
  the reason the key stays server-side.
- **All colors/fonts live in `index.css` `@theme`.** A hex code anywhere
  else is a bug (this is how the AA contrast fix was one line).
- **No `tailwind.config.js`** — v4 is CSS-first; reject any AI session that
  "helpfully" creates one.
- **ESLint knows the boundary:** `process` in `api/` is fine; `process` in
  `src/` is an architecture alarm, not a lint annoyance.

## v2 additions (preview only — ticketized lazily, not yet on the tree)

Sandbox screen + Critic's Review proxy mode · Opening Act sequence ·
practice-tier scenario files (`lessons.meta.js`, `scenarios.{solo,assisted,guided}.js`) ·
Season Report + Playbill under "Your Progress" · share-card canvas util.
None may be created until their ticket exists in task.md.