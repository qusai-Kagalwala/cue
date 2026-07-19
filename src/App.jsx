// src/App.jsx
// App shell: state-based routing + T-fix-2 warm-up ping on mount
// (thaws the serverless container before the first real submit).

import { useEffect, useState } from 'react'
import { SCREENS } from './lib/screens'
import { warmUpProxy } from './lib/gemini'
import { loadState, updateState } from './lib/storage'
import OpeningAct from './screens/OpeningAct'
import TopBar from './components/TopBar'
import Challenge from './screens/Challenge'
import LessonMap from './screens/LessonMap'
import Sandbox from './screens/Sandbox'
import GuidedPrompt from './components/GuidedPrompt'
import Settings from './screens/Settings'

export default function App() {
  const [screen, setScreen] = useState(SCREENS.CHALLENGE)
  const [practiceLessonId, setPracticeLessonId] = useState(null) // v2-5c

  function openGuided(lessonId) {
    setPracticeLessonId(lessonId)
    setScreen(SCREENS.GUIDED)
  }
  // v2-3a — read once at mount; completing the act flips both.
  const [showOpening, setShowOpening] = useState(
    () => !loadState().openingActDone
  )

  useEffect(() => {
    warmUpProxy()
  }, [])

  function completeOpeningAct() {
    updateState({ openingActDone: true })
    setShowOpening(false)
  }

  if (showOpening) {
    return <OpeningAct onComplete={completeOpeningAct} />
  }

  return (
    <div className="min-h-dvh bg-stage">
      <TopBar screen={screen} onNavigate={setScreen} />

      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6 lg:px-6">
        {screen === SCREENS.CHALLENGE && <Challenge onNavigate={setScreen} />}
        {screen === SCREENS.MAP && (
          <LessonMap onNavigate={setScreen} onPractice={openGuided} />
        )}
        {screen === SCREENS.GUIDED && practiceLessonId && (
          <GuidedPrompt
            lessonId={practiceLessonId}
            onExit={() => setScreen(SCREENS.MAP)}
          />
        )}
        {screen === SCREENS.SANDBOX && <Sandbox />}
        {screen === SCREENS.SETTINGS && <Settings onNavigate={setScreen} />}
      </main>
    </div>
  )
}