# Calibration Findings — 2026-08-03

- Input: 24 unique prompt/score pairs (library + prompt-bearing attempts + extra_pairs.csv)
- Global fit (ridge, λ=0.5), per-lesson fits where n≥8, confidence-blended with shipped weights
- Per-lesson: text/l1: global nudge (n=4 — below 8); text/l2: global nudge (n=4 — below 8); text/l3: global nudge (n=3 — below 8); text/l4: global nudge (n=2 — below 8); text/l5: global nudge (n=2 — below 8); text/l6: global nudge (n=3 — below 8); text/l7: global nudge (n=2 — below 8); text/l8: global nudge (n=2 — below 8)
- KNOWN LIMITS: library pairs skew ≥58 (survivor bias); specificity detector
  runs WITHOUT scenario-keyword overlap offline (flat stand-in) — treat its
  fitted weight with suspicion; n this small proposes NUDGES, not truths.

## Proposed weights
```js
const LESSON_WEIGHTS = {
  l1: { role: 0.05, context: 0.16, constraints: 0.09, format: 0.08, specificity: 0.37, length: 0.25 },
  l2: { role: 0.05, context: 0.39, constraints: 0.09, format: 0.08, specificity: 0.19, length: 0.21 },
  l3: { role: 0.05, context: 0.12, constraints: 0.09, format: 0.38, specificity: 0.15, length: 0.21 },
  l4: { role: 0.05, context: 0.12, constraints: 0.36, format: 0.11, specificity: 0.15, length: 0.21 },
  l5: { role: 0.05, context: 0.12, constraints: 0.09, format: 0.34, specificity: 0.19, length: 0.21 },
  l6: { role: 0.35, context: 0.16, constraints: 0.09, format: 0.08, specificity: 0.11, length: 0.21 },
  l7: { role: 0.05, context: 0.16, constraints: 0.28, format: 0.11, specificity: 0.19, length: 0.21 },
  l8: { role: 0.05, context: 0.12, constraints: 0.13, format: 0.08, specificity: 0.19, length: 0.44 },
}
```
