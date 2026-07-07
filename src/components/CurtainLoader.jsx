// src/components/CurtainLoader.jsx
// T3.3 curtain line + T6.2 cold-start awareness: if the evaluation runs
// long (serverless cold start on the free tier can take 2–4s+ after
// idle), the label says so — a silent shimmer reads as "broken".

import { useEffect, useState } from 'react'

export default function CurtainLoader() {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-raised">
        <div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-cue to-transparent"
          style={{ animation: 'curtain 1.2s ease-in-out infinite' }}
        />
      </div>
      <p className="text-center font-mono text-xs text-muted">
        {slow
          ? 'still working — the first request after a while takes a few extra seconds…'
          : 'evaluating your prompt…'}
      </p>
    </div>
  )
}