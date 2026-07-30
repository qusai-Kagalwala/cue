// src/components/BottomNav.jsx
// Mobile-only bottom navigation. The top bar was carrying 6 nav icons plus
// status pills — far too dense on a phone. On mobile the primary
// destinations move here (thumb-reachable, labelled, one active state);
// this bar is hidden from lg upward, where the top bar has room for icons.
//
// Five destinations, chosen as the things people actually move between:
// Learn (the challenge), Map, Sandbox, Progress, Settings. Library and the
// Programme stay reachable from within those screens.

import { motion, useReducedMotion } from 'motion/react'
import { SCREENS } from '../lib/screens'

function Item({ label, active, onClick, children, reduce }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      whileTap={reduce ? {} : { scale: 0.9 }}
      className={`relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
        active ? 'text-cue' : 'text-muted'
      }`}
    >
      <motion.span
        className="flex h-6 w-6 items-center justify-center"
        animate={
          reduce
            ? {}
            : active
              ? { scale: 1.15, y: -1 }
              : { scale: 1, y: 0 }
        }
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        {children}
      </motion.span>
      {label}
      {/* animated active indicator that slides between items */}
      {active && !reduce && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -top-px h-0.5 w-8 rounded-full bg-cue"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export default function BottomNav({ screen, onNavigate }) {
  const reduce = useReducedMotion()
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-stage/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-lg items-stretch">
        <Item
          label="Learn"
          reduce={reduce}
          active={screen === SCREENS.CHALLENGE}
          onClick={() => onNavigate(SCREENS.CHALLENGE)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
        </Item>

        <Item
          label="Map"
          reduce={reduce}
          active={screen === SCREENS.MAP}
          onClick={() => onNavigate(SCREENS.MAP)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
            <path d="M9 20L3 17V4l6 3m0 13l6-3m-6 3V7m6 10l6 3V7l-6-3m0 13V4M9 7l6-3" />
          </svg>
        </Item>

        <Item
          label="Sandbox"
          reduce={reduce}
          active={screen === SCREENS.SANDBOX}
          onClick={() => onNavigate(SCREENS.SANDBOX)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
            <path d="M10 2v6L4.5 18a2 2 0 001.8 3h11.4a2 2 0 001.8-3L14 8V2" />
            <path d="M8.5 2h7" />
            <path d="M7 15h10" />
          </svg>
        </Item>

        <Item
          label="Progress"
          reduce={reduce}
          active={screen === SCREENS.PROGRESS}
          onClick={() => onNavigate(SCREENS.PROGRESS)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 3 3 5-6" />
          </svg>
        </Item>

        <Item
          label="Settings"
          reduce={reduce}
          active={screen === SCREENS.SETTINGS}
          onClick={() => onNavigate(SCREENS.SETTINGS)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </Item>
      </div>
    </nav>
  )
}