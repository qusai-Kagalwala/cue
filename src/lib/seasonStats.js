// src/lib/seasonStats.js
// v2-12a — Pure derivations over the attempt history (T-fix-1's logger,
// harvesting at last). Every function takes the attempts ARRAY — never
// reads storage itself — so tests inject fixtures and the screen passes
// loadAttempts(). All functions are total: empty and tiny histories
// return safe values, never throw.
//
// Attempt shape: { lessonId, score, engine, timestamp, attemptNumber }
// lessonId ∈ l1..l8 | 'encore' | 'freeplay'(never logged) — core-lesson
// stats filter to l1..l8; the Encore is its own act.

const CORE = new Set(['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8'])

/** Chronological core-lesson attempts (defensive sort by timestamp). */
export function coreAttempts(attempts) {
  return (attempts ?? [])
    .filter((a) => CORE.has(a?.lessonId) && typeof a?.score === 'number')
    .slice()
    .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)))
}

/** Average score per lesson → { l1: 62, ... } (rounded; only lessons attempted). */
export function avgScoreByLesson(attempts) {
  const sums = {}
  for (const a of coreAttempts(attempts)) {
    sums[a.lessonId] = sums[a.lessonId] ?? { total: 0, n: 0 }
    sums[a.lessonId].total += a.score
    sums[a.lessonId].n += 1
  }
  const out = {}
  for (const id of Object.keys(sums)) {
    out[id] = Math.round(sums[id].total / sums[id].n)
  }
  return out
}

/** First vs best per lesson → { l1: { first, best, improved }, ... } */
export function firstVsBest(attempts) {
  const out = {}
  for (const a of coreAttempts(attempts)) {
    if (!out[a.lessonId]) {
      out[a.lessonId] = { first: a.score, best: a.score, improved: false }
    } else {
      const entry = out[a.lessonId]
      entry.best = Math.max(entry.best, a.score)
      entry.improved = entry.best > entry.first
    }
  }
  return out
}

/**
 * The trend headline: first three attempts vs last three, chronologically.
 * Needs ≥6 core attempts to say anything honest — below that, null (the
 * screen shows its keep-going state instead). Returns
 * { firstAvg, lastAvg, direction: 'up'|'flat'|'down', line }.
 */
export function trendHeadline(attempts) {
  const chrono = coreAttempts(attempts)
  if (chrono.length < 6) return null

  const avg = (arr) =>
    Math.round(arr.reduce((s, a) => s + a.score, 0) / arr.length)
  const firstAvg = avg(chrono.slice(0, 3))
  const lastAvg = avg(chrono.slice(-3))
  const direction = lastAvg > firstAvg ? 'up' : lastAvg < firstAvg ? 'down' : 'flat'

  const line =
    direction === 'up'
      ? `Your first three attempts averaged ${firstAvg}. Your last three: ${lastAvg} — the practice is working.`
      : direction === 'flat'
        ? `First three attempts averaged ${firstAvg}; the last three held at ${lastAvg} — steady hands.`
        : `First three averaged ${firstAvg}, the last three ${lastAvg} — recent bosses were harder. Keep swinging.`

  return { firstAvg, lastAvg, direction, line }
}

/** Season totals: { total, avg, best, realCount, heuristicCount } */
export function overallStats(attempts) {
  const chrono = coreAttempts(attempts)
  if (chrono.length === 0) {
    return { total: 0, avg: null, best: null, realCount: 0, heuristicCount: 0 }
  }
  const total = chrono.length
  const avg = Math.round(chrono.reduce((s, a) => s + a.score, 0) / total)
  const best = Math.max(...chrono.map((a) => a.score))
  const heuristicCount = chrono.filter((a) => a.engine === 'heuristic').length
  return { total, avg, best, realCount: total - heuristicCount, heuristicCount }
}