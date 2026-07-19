// tests/seasonStats.test.js
// v2-12a — the stats module's contract: pure, total, honest on tiny data.

import { describe, it, expect } from 'vitest'
import {
  coreAttempts,
  avgScoreByLesson,
  firstVsBest,
  trendHeadline,
  overallStats,
} from '../src/lib/seasonStats'

// tiny fixture builder — timestamps encode order
const at = (lessonId, score, i, engine = 'gemini-2.5-flash-lite') => ({
  lessonId,
  score,
  engine,
  timestamp: `2026-01-${String(i).padStart(2, '0')}T10:00:00.000Z`,
  attemptNumber: 1,
})

describe('empty & tiny histories are safe', () => {
  it('empty history: everything returns its safe value, nothing throws', () => {
    expect(coreAttempts([])).toEqual([])
    expect(avgScoreByLesson([])).toEqual({})
    expect(firstVsBest([])).toEqual({})
    expect(trendHeadline([])).toBeNull()
    expect(overallStats([])).toEqual({
      total: 0, avg: null, best: null, realCount: 0, heuristicCount: 0,
    })
    expect(trendHeadline(undefined)).toBeNull()
  })

  it('single attempt: stats exist, headline stays silent', () => {
    const h = [at('l1', 60, 1)]
    expect(avgScoreByLesson(h)).toEqual({ l1: 60 })
    expect(firstVsBest(h)).toEqual({ l1: { first: 60, best: 60, improved: false } })
    expect(trendHeadline(h)).toBeNull() // <6 attempts → no headline
    expect(overallStats(h).total).toBe(1)
  })
})

describe('per-lesson derivations', () => {
  it('averages per lesson, rounded, non-core filtered out', () => {
    const h = [at('l1', 50, 1), at('l1', 61, 2), at('l2', 70, 3), at('encore', 90, 4)]
    expect(avgScoreByLesson(h)).toEqual({ l1: 56, l2: 70 }) // 55.5 → 56; encore excluded
  })

  it('first vs best tracks improvement chronologically', () => {
    const h = [at('l3', 40, 1), at('l3', 72, 2), at('l3', 55, 3)]
    expect(firstVsBest(h)).toEqual({ l3: { first: 40, best: 72, improved: true } })
  })
})

describe('the trend headline', () => {
  it('6+ attempts: first-three vs last-three, improving line', () => {
    const h = [10, 12, 14, 60, 62, 64].map((s, i) => at('l1', s, i + 1))
    const t = trendHeadline(h)
    expect(t.firstAvg).toBe(12)
    expect(t.lastAvg).toBe(62)
    expect(t.direction).toBe('up')
    expect(t.line).toContain('12')
    expect(t.line).toContain('62')
  })

  it('declining and flat directions phrase honestly', () => {
    const down = [70, 70, 70, 40, 40, 40].map((s, i) => at('l2', s, i + 1))
    expect(trendHeadline(down).direction).toBe('down')
    const flat = [50, 50, 50, 50, 50, 50].map((s, i) => at('l2', s, i + 1))
    expect(trendHeadline(flat).direction).toBe('flat')
  })
})

describe('overall stats', () => {
  it('counts engines and finds the best', () => {
    const h = [at('l1', 50, 1), at('l2', 80, 2), at('l3', 65, 3, 'heuristic')]
    const o = overallStats(h)
    expect(o).toEqual({ total: 3, avg: 65, best: 80, realCount: 2, heuristicCount: 1 })
  })
})