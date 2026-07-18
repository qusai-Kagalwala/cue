// src/lib/ranks.js
// v2-1 — Theatre rank ladder. Pure, tiny, and imported by the share card
// today, the Audition (v2-3c) and callback (v2-4a) tomorrow.
// Level → rank: 1 Understudy · 2 Ensemble · 3 Lead · 4 Director · 5+ Playwright

export const RANKS = ['Understudy', 'Ensemble', 'Lead', 'Director', 'Playwright']

/** Rank title for a level (levels 1–6 map onto the 5-rung ladder). */
export function rankForLevel(level) {
  const idx = Math.min(RANKS.length - 1, Math.max(0, (level ?? 1) - 1))
  return RANKS[idx]
}

/** The next rung, or null at the top (for "X XP to <rank>" copy later). */
export function nextRank(level) {
  const idx = Math.min(RANKS.length - 1, Math.max(0, (level ?? 1) - 1))
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null
}

/** v2-3c — starting rank from the combined Audition score (caps at Lead). */
export function auditionRank(combined) {
  if (combined >= 55) return 'Lead'
  if (combined >= 35) return 'Ensemble'
  return 'Understudy'
}