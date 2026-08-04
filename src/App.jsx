// src/App.jsx
// App shell: state-based routing + T-fix-2 warm-up ping on mount
// (thaws the serverless container before the first real submit).

import { useEffect, useState } from 'react'
import { SCREENS } from './lib/screens'
import { warmUpProxy } from './lib/gemini'
import { loadState, updateState } from './lib/storage'
import { useProgress } from './hooks/useProgress'
import OpeningAct from './screens/OpeningAct'
import Landing from './screens/Landing'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import AnimatedBackground from './components/AnimatedBackground'
import CursorGlow from './components/CursorGlow'
import Challenge from './screens/Challenge'
import LessonMap from './screens/LessonMap'
import Sandbox from './screens/Sandbox'
import Studio from './screens/Studio'
import Completion from './screens/Completion'
import GuidedPrompt from './components/GuidedPrompt'
import Encore from './screens/Encore'
import Library from './screens/Library'
import SeasonReport from './screens/SeasonReport'
import Programme from './screens/Programme'
import AssistedPrompt from './components/AssistedPrompt'
import Settings from './screens/Settings'

export default function App() {
  const [screen, setScreen] = useState(SCREENS.CHALLENGE)
  const { theme } = useProgress()

  // v2-15 — the theme rides on <html data-theme>; CSS does the rest
  useEffect(() => {
    // v2-20c — 'god' is a third theme, set only by the session overlay.
    document.documentElement.dataset.theme =
      theme === 'light' ? 'light' : theme === 'god' ? 'god' : ''
  }, [theme])
  const [practiceLessonId, setPracticeLessonId] = useState(null) // v2-5c

  function openPractice(lessonId, tier) {
    setPracticeLessonId(lessonId)
    setScreen(tier === 'assisted' ? SCREENS.ASSISTED : SCREENS.GUIDED)
  }
  // v2-3a — read once at mount; completing the act flips both.
  const [showLanding, setShowLanding] = useState(
    () => !loadState().landingSeen
  )
  const [showOpening, setShowOpening] = useState(
    () => !loadState().openingActDone
  )

  function enterFromLanding() {
    updateState({ landingSeen: true })
    setShowLanding(false)
  }

  useEffect(() => {
    warmUpProxy()
  }, [])

  function completeOpeningAct() {
    updateState({ openingActDone: true })
    setShowOpening(false)
  }

  if (showLanding) {
    return <Landing onEnter={enterFromLanding} />
  }

  if (showOpening) {
    return <OpeningAct onComplete={completeOpeningAct} />
  }

  return (
    <div className="min-h-dvh">
      <AnimatedBackground />
      <CursorGlow />
      <TopBar screen={screen} onNavigate={setScreen} />

      <main
        key={screen}
        className="cue-screen-enter mx-auto max-w-5xl px-4 pb-24 pt-6 lg:px-6 lg:pb-12"
      >
        {screen === SCREENS.CHALLENGE && <Challenge onNavigate={setScreen} />}
        {screen === SCREENS.MAP && (
          <LessonMap onNavigate={setScreen} onPractice={openPractice} />
        )}
        {screen === SCREENS.GUIDED && practiceLessonId && (
          <GuidedPrompt
            lessonId={practiceLessonId}
            onExit={() => setScreen(SCREENS.MAP)}
          />
        )}
        {screen === SCREENS.LIBRARY && <Library />}
        {screen === SCREENS.PROGRESS && <SeasonReport />}
        {screen === SCREENS.PROGRAMME && <Programme onNavigate={setScreen} />}
        {screen === SCREENS.ENCORE && (
          <Encore onExit={() => setScreen(SCREENS.MAP)} />
        )}
        {screen === SCREENS.ASSISTED && practiceLessonId && (
          <AssistedPrompt
            lessonId={practiceLessonId}
            onExit={() => setScreen(SCREENS.MAP)}
          />
        )}
        {screen === SCREENS.SANDBOX && <Sandbox />}
        {screen === SCREENS.STUDIO && <Studio />}
        {screen === SCREENS.COMPLETION && (
          <Completion onGoToMap={() => setScreen(SCREENS.MAP)} />
        )}
        {screen === SCREENS.SETTINGS && <Settings onNavigate={setScreen} />}
      </main>

      <BottomNav screen={screen} onNavigate={setScreen} />
    </div>
  )
}