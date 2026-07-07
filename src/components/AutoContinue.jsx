// src/components/AutoContinue.jsx
// T4.2 — After results: primary "Next lesson" + 8s auto-advance with a
// visible countdown and a cancel. Cancel stops the timer but keeps the
// button — auto-advance is a convenience, never a trap.

import { useEffect, useRef, useState } from 'react'

const SECONDS = 8

export default function AutoContinue({ onNext, isLast = false }) {
  const [remaining, setRemaining] = useState(SECONDS)
  const [cancelled, setCancelled] = useState(false)
  const firedRef = useRef(false) // onNext fires exactly once, ever

  useEffect(() => {
    if (cancelled) return
    const timer = setInterval(() => {
      setRemaining((r) => r - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cancelled])

  useEffect(() => {
    if (remaining <= 0 && !cancelled && !firedRef.current) {
      firedRef.current = true
      onNext()
    }
  }, [remaining, cancelled, onNext])

  function handleManualNext() {
    if (firedRef.current) return
    firedRef.current = true
    onNext()
  }

  const label = isLast ? 'Finish' : 'Next lesson'

  return (
    <div className="flex items-center justify-between gap-3">
      {cancelled ? (
        <span className="font-mono text-xs text-faint">auto-continue off</span>
      ) : (
        <button
          onClick={() => setCancelled(true)}
          className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          cancel · continuing in {remaining}s
        </button>
      )}

      <button
        onClick={handleManualNext}
        className="rounded-lg bg-cue px-6 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright"
      >
        {label} →
      </button>
    </div>
  )
}