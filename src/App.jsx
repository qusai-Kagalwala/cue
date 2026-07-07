// src/App.jsx
// T0.3 — App shell: state-based routing (no router lib needed for 3 screens).
// SCREENS lives in lib/screens.js so this file exports only a component.

import { useState } from 'react'
import { SCREENS } from './lib/screens'
import TopBar from './components/TopBar'
import Challenge from './screens/Challenge'
import LessonMap from './screens/LessonMap'
import Settings from './screens/Settings'

export default function App() {
  const [screen, setScreen] = useState(SCREENS.CHALLENGE)

  return (
    <div className="min-h-dvh bg-stage">
      <TopBar screen={screen} onNavigate={setScreen} />

      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6 lg:px-6">
        {screen === SCREENS.CHALLENGE && <Challenge onNavigate={setScreen} />}
        {screen === SCREENS.MAP && <LessonMap />}
        {screen === SCREENS.SETTINGS && <Settings />}
      </main>
    </div>
  )
}