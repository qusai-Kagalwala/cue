// src/App.jsx
// App shell: state-based routing + T-fix-2 warm-up ping on mount
// (thaws the serverless container before the first real submit).

import { useEffect, useState } from 'react'
import { SCREENS } from './lib/screens'
import { warmUpProxy } from './lib/gemini'
import TopBar from './components/TopBar'
import Challenge from './screens/Challenge'
import LessonMap from './screens/LessonMap'
import Sandbox from './screens/Sandbox'
import Settings from './screens/Settings'

export default function App() {
  const [screen, setScreen] = useState(SCREENS.CHALLENGE)

  useEffect(() => {
    warmUpProxy()
  }, [])

  return (
    <div className="min-h-dvh bg-stage">
      <TopBar screen={screen} onNavigate={setScreen} />

      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6 lg:px-6">
        {screen === SCREENS.CHALLENGE && <Challenge onNavigate={setScreen} />}
        {screen === SCREENS.MAP && <LessonMap onNavigate={setScreen} />}
        {screen === SCREENS.SANDBOX && <Sandbox />}
        {screen === SCREENS.SETTINGS && <Settings onNavigate={setScreen} />}
      </main>
    </div>
  )
}