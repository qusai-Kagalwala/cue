// tests/xp.test.js
// T1.3 — Unit tests for the XP/level/streak pure functions.
// Run: npm test   (vitest)

import { describe, it, expect } from 'vitest'
import {
  awardXP,
  levelFor,
  xpToNextLevel,
  applyStreak,
  todayKey,
} from '../src/lib/xp'

describe('awardXP', () => {
  it('gives 50 base + half the score as bonus', () => {
    expect(awardXP(0)).toBe(50)
    expect(awardXP(60)).toBe(80)
    expect(awardXP(100)).toBe(100)
  })

  it('clamps out-of-range or junk scores instead of trusting them', () => {
    expect(awardXP(150)).toBe(100)   // over-max clamped to 100
    expect(awardXP(-20)).toBe(50)    // negative clamped to 0
    expect(awardXP('not a number')).toBe(50)
  })
})

describe('levelFor', () => {
  it('maps XP totals to levels at 100/250/500/1000/2000', () => {
    expect(levelFor(0)).toBe(1)
    expect(levelFor(99)).toBe(1)
    expect(levelFor(100)).toBe(2)    // exact threshold levels up
    expect(levelFor(250)).toBe(3)
    expect(levelFor(500)).toBe(4)
    expect(levelFor(999)).toBe(4)
    expect(levelFor(1000)).toBe(5)
  })

  it('caps at level 6 for 2000+', () => {
    expect(levelFor(2000)).toBe(6)
    expect(levelFor(99999)).toBe(6)
  })
})

describe('xpToNextLevel', () => {
  it('reports remaining XP to the next threshold', () => {
    expect(xpToNextLevel(0)).toBe(100)
    expect(xpToNextLevel(180)).toBe(70)   // next is 250
  })

  it('returns null at max level', () => {
    expect(xpToNextLevel(2000)).toBe(null)
  })
})

describe('applyStreak', () => {
  it('starts a streak of 1 on first ever activity', () => {
    const next = applyStreak({ count: 0, lastActiveDate: null }, '2026-07-07')
    expect(next).toEqual({ count: 1, lastActiveDate: '2026-07-07' })
  })

  it('is unchanged when completing again the same day', () => {
    const s = { count: 3, lastActiveDate: '2026-07-07' }
    expect(applyStreak(s, '2026-07-07')).toEqual(s)
  })

  it('increments when last activity was yesterday', () => {
    const next = applyStreak({ count: 3, lastActiveDate: '2026-07-06' }, '2026-07-07')
    expect(next).toEqual({ count: 4, lastActiveDate: '2026-07-07' })
  })

  it('handles month and year rollovers', () => {
    expect(
      applyStreak({ count: 5, lastActiveDate: '2026-06-30' }, '2026-07-01').count
    ).toBe(6)
    expect(
      applyStreak({ count: 9, lastActiveDate: '2025-12-31' }, '2026-01-01').count
    ).toBe(10)
  })

  it('resets to 1 after a missed day', () => {
    const next = applyStreak({ count: 7, lastActiveDate: '2026-07-04' }, '2026-07-07')
    expect(next).toEqual({ count: 1, lastActiveDate: '2026-07-07' })
  })

  it('never mutates the input object', () => {
    const s = { count: 2, lastActiveDate: '2026-07-06' }
    applyStreak(s, '2026-07-07')
    expect(s).toEqual({ count: 2, lastActiveDate: '2026-07-06' })
  })

  it('survives null/undefined streak (corrupt storage defence)', () => {
    expect(applyStreak(null, '2026-07-07')).toEqual({
      count: 1,
      lastActiveDate: '2026-07-07',
    })
  })
})

describe('todayKey', () => {
  it('formats a date as YYYY-MM-DD with zero padding', () => {
    expect(todayKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})