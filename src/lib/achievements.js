// src/lib/achievements.js
// v2-13 — The Playbill's engine. Achievements are DERIVED from existing
// state, not set by scattered writes: every "right moment" is already
// visible in storage (scores, attempts, streak, level, flags), so the
// checks read it. Once a check passes, the earn is PERSISTED with a date
// (cue:playbill:v1) — transient conditions (a streak) stay earned forever.
// Pure checks + one sync function; the screen calls sync on mount.

const PLAYBILL_KEY = 'cue:playbill:v1'
const CORE = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8']

/**
 * v3 fix — lesson scores live per stage. An achievement counts if ANY
 * stage cleared the required lessons: the Playbill is career-wide, so
 * finishing Act One in the Image Stage earns the sticker just as well.
 * Falls back to a pre-v3 flat save's lessonScores.
 */
function anyStageHas(state, ids) {
  const blocks = Object.values(state?.stageProgress ?? {})
  if (state?.lessonScores) blocks.push(state)
  return blocks.some((b) => ids.every((id) => b?.lessonScores?.[id] != null))
}

export const ACHIEVEMENTS = [
  {
    id: 'audition',
    sticker: '🎬',
    title: 'Audition Complete',
    description: 'Took the audition before the first lesson.',
    check: ({ state }) => state.auditionAttempt != null,
  },
  {
    id: 'first-curtain',
    sticker: '🎟',
    title: 'First Curtain',
    description: 'Completed your first assessment.',
    check: ({ attempts }) => attempts.length >= 1,
  },
  {
    id: 'act-one',
    sticker: '🎞',
    title: 'Act One',
    description: 'Cleared Lessons 1 through 4.',
    check: ({ state }) =>
      anyStageHas(state, CORE.slice(0, 4)),
  },
  {
    id: 'closing-night',
    sticker: '🎆',
    title: 'Closing Night',
    description: 'All eight lessons complete.',
    check: ({ state }) =>
      anyStageHas(state, CORE),
  },
  {
    id: 'full-house',
    sticker: '🎪',
    title: 'Full House',
    description: '20 or more performances on record.',
    check: ({ attempts }) => attempts.length >= 20,
  },
  {
    id: 'encore',
    sticker: '👏',
    title: 'Encore!',
    description: 'Took a bow at the daily boss.',
    check: ({ state }) => state.encoreDone != null,
  },
  {
    id: 'weeks-run',
    sticker: '🔥',
    title: "Week's Run",
    description: 'A 7-day streak — the show ran all week.',
    check: ({ state }) => (state.streak?.count ?? 0) >= 7,
  },
  {
    id: 'playwright',
    sticker: '🖋',
    title: 'Playwright',
    description: 'Reached the top of the rank ladder.',
    check: ({ state }) => (state.level ?? 1) >= 5,
  },
]

function loadEarned() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PLAYBILL_KEY))
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/**
 * Evaluate all checks against ctx { state, attempts }, persist any newly
 * earned (stamped with today's ISO date), and return the full playbill:
 * [{ ...achievement, earned, earnedAt }].
 */
export function syncPlaybill(ctx) {
  const earned = loadEarned()
  let changed = false
  for (const a of ACHIEVEMENTS) {
    if (!earned[a.id] && a.check(ctx)) {
      earned[a.id] = new Date().toISOString()
      changed = true
    }
  }
  if (changed) {
    try {
      localStorage.setItem(PLAYBILL_KEY, JSON.stringify(earned))
    } catch {
      /* private mode — the derived earns still render this session */
    }
  }
  return ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: earned[a.id] != null,
    earnedAt: earned[a.id] ?? null,
  }))
}