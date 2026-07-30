// src/components/XPToast.jsx
// T4.1 — XP earned banner. Shows base + bonus honestly (the learner should
// see WHY a better score pays more), and celebrates a level-up.
//
// Reward motion (v-anim): the toast springs in, the XP number counts up, and
// a level-up gets a scale-pulse celebration. Uses `motion` — the one small
// animation library we allow, used only for these reward moments. Respects
// reduced motion (motion honors the OS setting automatically for transitions;
// we also skip the count-up under it).

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BASE_XP } from '../lib/xp'
import { useProgress } from '../hooks/useProgress'

// Count a number from 0 to `target` over `dur` ms (eased). Returns the current
// value. Reduced-motion callers should pass animate=false to skip it.
function useCountUp(target, animate, dur = 700) {
  const [n, setN] = useState(animate ? 0 : target)
  const raf = useRef(0)
  useEffect(() => {
    if (!animate) return undefined
    let start = 0
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * target))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, animate, dur])
  return n
}

export default function XPToast({ award }) {
  const { name } = useProgress()
  const reduce = useReducedMotion()
  const xp = useCountUp(award?.xpGained ?? 0, !reduce)

  if (!award) return null

  const bonus = award.xpGained - BASE_XP
  const dailyTag = award.dailyBonus > 0 ? ' + 20 daily ★' : ''
  const breakdown = award.encore
    ? '100 base + bonus · the encore'
    : award.practice
      ? 'practice reward · first time only'
      : award.isReplay
        ? 'replay · half XP'
        : `${BASE_XP} base${bonus - (award.dailyBonus ?? 0) > 0 ? ` + ${bonus - (award.dailyBonus ?? 0)} bonus` : ''}${dailyTag}`

  // spring entrance for both variants
  const springIn = {
    initial: reduce ? {} : { opacity: 0, y: 8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring', stiffness: 380, damping: 26 },
  }

  if (award.leveledUp) {
    return (
      <motion.div
        {...springIn}
        className="relative overflow-hidden rounded-xl border border-cue bg-cue/10 px-4 py-3 text-center"
      >
        {/* a soft sweep of light across the level-up card */}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-cue/15 to-transparent"
            initial={{ left: '-40%' }}
            animate={{ left: '120%' }}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
          />
        )}
        <motion.p
          className="font-display text-lg font-bold text-cue"
          initial={reduce ? {} : { scale: 0.9 }}
          animate={reduce ? {} : { scale: [0.9, 1.08, 1] }}
          transition={{ duration: 0.5, delay: 0.15, times: [0, 0.6, 1] }}
        >
          Level {award.newLevel}
          {name ? `, ${name}` : ''} 🎭
        </motion.p>
        <p className="font-mono text-xs text-muted">
          +{xp} XP ({breakdown})
        </p>
      </motion.div>
    )
  }

  return (
    <motion.p {...springIn} className="text-center font-mono text-sm text-cue">
      <span className="font-semibold">+{xp} XP</span>
      <span className="text-muted"> · {breakdown}</span>
    </motion.p>
  )
}