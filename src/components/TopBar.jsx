// src/components/TopBar.jsx
// T0.3 shell → T1.4: STUB values replaced with live state from useProgress.

import { SCREENS } from '../lib/screens'
import { useProgress } from '../hooks/useProgress'

function IconButton({ label, active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg p-2 transition-colors ${
        active
          ? 'bg-raised text-cue'
          : 'text-muted hover:bg-raised hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

export default function TopBar({ screen, onNavigate }) {
  const { streak, xp, level } = useProgress()

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-stage/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 lg:px-6">

        {/* Logo — always returns to the challenge (zero-friction rule) */}
        <button
          onClick={() => onNavigate(SCREENS.CHALLENGE)}
          className="rounded-lg px-1 font-display text-xl font-bold text-cue"
        >
          Cue
        </button>

        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Streak pill — number hides below sm to save space */}
          <span
            title={`${streak} day streak`}
            className="flex items-center gap-1 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-3.5 w-3.5 ${streak > 0 ? 'fill-cue' : 'fill-faint'}`}
              aria-hidden="true"
            >
              <path d="M13.5 0.7c0.3 3.2-0.8 5.6-2.6 7.6-1.5 1.7-3.4 3.2-4.6 5.4C4.1 17.8 6.4 22.6 12 23.3c-2.2-1.5-2.9-4.6-1.2-6.7 0.6-0.8 1.5-1.4 2.1-2.4 0.5-0.8 0.8-1.8 0.7-2.8 2.6 1.9 4.4 4.8 3.4 8.1-0.4 1.5-1.4 2.7-2.5 3.7 4.6-1 7.3-4.9 7-9.1C21.2 8.5 17.3 3 13.5 0.7z" />
            </svg>
            <span className="hidden sm:inline">{streak}</span>
          </span>

          {/* XP / level pill — level hides below 380px (T6.2 tiny screens) */}
          <span className="rounded-full border border-cue-dim px-2.5 py-1 font-mono text-xs text-cue">
            <span className="hidden min-[380px]:inline">Lv {level} · </span>
            {xp} XP
          </span>

          {/* Lesson map */}
          <IconButton
            label="Lesson map"
            active={screen === SCREENS.MAP}
            onClick={() => onNavigate(SCREENS.MAP)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 20L3 17V4l6 3m0 13l6-3m-6 3V7m6 10l6 3V7l-6-3m0 13V4M9 7l6-3" />
            </svg>
          </IconButton>

          {/* Sandbox */}
          <IconButton
            label="The Sandbox"
            active={screen === SCREENS.SANDBOX}
            onClick={() => onNavigate(SCREENS.SANDBOX)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 2v6L4.5 18a2 2 0 001.8 3h11.4a2 2 0 001.8-3L14 8V2" />
              <path d="M8.5 2h7" />
              <path d="M7 15h10" />
            </svg>
          </IconButton>

          {/* Library */}
          <IconButton
            label="Prompt library"
            active={screen === SCREENS.LIBRARY}
            onClick={() => onNavigate(SCREENS.LIBRARY)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          </IconButton>

          {/* Your Progress */}
          <IconButton
            label="Your progress"
            active={screen === SCREENS.PROGRESS}
            onClick={() => onNavigate(SCREENS.PROGRESS)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3v18h18" />
              <path d="M7 14l4-4 3 3 5-6" />
            </svg>
          </IconButton>

          {/* Settings */}
          <IconButton
            label="Settings"
            active={screen === SCREENS.SETTINGS}
            onClick={() => onNavigate(SCREENS.SETTINGS)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h0a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5h0a1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
          </svg>
          </IconButton>
        </div>
      </div>
    </header>
  )
}