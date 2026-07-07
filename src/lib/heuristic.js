// src/lib/heuristic.js
// T3.2 — Offline fallback evaluator. Pure module, no React, no network.
// When the proxy is unreachable after retry, this produces an honest
// "offline estimate" so the learner is never dead-ended. It mirrors the
// real result shape + `offline: true`, which the UI uses to label it and
// the XP flow uses to award flat 50 (score here is DISPLAY-ONLY).

import { estimateTokens } from './tokens'

/** Words worth matching: lowercase, letters only, 5+ chars, deduped. */
function keywords(text) {
  return [
    ...new Set(
      (text.toLowerCase().match(/[a-z]{5,}/g) ?? [])
    ),
  ]
}

/**
 * Heuristic mini-score for a prompt, 20–75 range (never rivals a real eval).
 * Checks: sane length, keyword overlap with scenario+task, budget respect.
 */
export function heuristicEvaluate(lesson, userPrompt) {
  const prompt = (userPrompt ?? '').trim()
  const strengths = []
  const improvements = []
  let score = 20 // floor: they wrote *something*

  // 1. Length in a sane range (roughly a real sentence → not an essay)
  if (prompt.length >= 40 && prompt.length <= 1200) {
    score += 20
    strengths.push('Your prompt has substance — not too short, not rambling.')
  } else if (prompt.length < 40) {
    improvements.push('Very short prompts usually leave the AI guessing — add the key details.')
  } else {
    improvements.push('Long prompts bury the request — trim to the essentials.')
  }

  // 2. Overlap with the scenario/task vocabulary (is it on-topic?)
  const topic = keywords(`${lesson.scenario} ${lesson.task}`)
  const used = keywords(prompt)
  const overlap = used.filter((w) => topic.includes(w)).length
  if (overlap >= 2) {
    score += 20
    strengths.push('You anchored the prompt in the scenario.')
  } else {
    improvements.push('Reference the scenario directly — name the specifics it gives you.')
  }

  // 3. Token budget (Lesson 8 only)
  const tokens = estimateTokens(prompt)
  const budgetRespected = lesson.tokenBudget == null || tokens <= lesson.tokenBudget
  if (lesson.tokenBudget != null) {
    if (budgetRespected) {
      score += 15
      strengths.push(`Within the ${lesson.tokenBudget}-token budget.`)
    } else {
      improvements.push(`Over the ${lesson.tokenBudget}-token budget — cut filler words first.`)
    }
  }

  return {
    score: Math.min(75, score),
    strengths,
    improvements,
    rewrittenExample: null, // only a real evaluation can rewrite their prompt
    budgetRespected,
    offline: true,
  }
}