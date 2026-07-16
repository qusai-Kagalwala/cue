// src/lib/heuristic.js
// T-v1-3 — now a thin wrapper over the rubric scorer, so every existing
// import (useEvaluation) keeps working unchanged. The real machinery
// lives in rubric.js, which the v2 Audition / checklist / practice
// tiers will import directly.

import { scoreWithRubric } from './rubric'

export function heuristicEvaluate(lesson, userPrompt) {
  return scoreWithRubric(lesson, userPrompt)
}