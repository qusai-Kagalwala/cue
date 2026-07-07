// src/hooks/useEvaluation.js
// T3.3 — Evaluation state machine: idle → evaluating → done | error.
// Owns the whole submit flow: retry-wrapped API call, heuristic fallback,
// and XP award (persist on receipt — T4.2's refresh-safety depends on this).
// Double-submit is blocked by the state machine itself, not by UI hope.

import { useRef, useState } from 'react'
import { evaluateWithRetry } from '../lib/gemini'
import { heuristicEvaluate } from '../lib/heuristic'
import { completeLesson } from './useProgress'

export function useEvaluation() {
  const [status, setStatus] = useState('idle') // idle | evaluating | done | error
  const [result, setResult] = useState(null)   // evaluation payload (offline flag if fallback)
  const [award, setAward] = useState(null)     // { xpGained, leveledUp, newLevel }
  const [errorCode, setErrorCode] = useState(null)
  const inFlight = useRef(false)               // survives re-renders mid-flight

  async function submit(lesson, userPrompt) {
    // Hard double-submit guard — Enter mashing, button spam, anything.
    if (inFlight.current) return
    inFlight.current = true
    setStatus('evaluating')
    setErrorCode(null)

    try {
      let evaluation
      try {
        evaluation = await evaluateWithRetry(lesson, userPrompt)
      } catch (err) {
        // Proxy unreachable after retry → honest offline estimate.
        setErrorCode(err.code ?? 'UNKNOWN')
        evaluation = heuristicEvaluate(lesson, userPrompt)
      }

      // Award XP the moment we have a result (persist on receipt):
      // real eval → score-based bonus; offline → completeLesson(0) = flat 50.
      const xpAward = completeLesson(evaluation.offline ? 0 : evaluation.score)

      setResult(evaluation)
      setAward(xpAward)
      setStatus('done')
    } catch (err) {
      // Only reachable if the heuristic itself throws — defensive.
      console.error('[cue] evaluation flow failed entirely', err)
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  /** Back to idle for the next lesson (called on advance/replay). */
  function reset() {
    setStatus('idle')
    setResult(null)
    setAward(null)
    setErrorCode(null)
  }

  return { status, result, award, errorCode, submit, reset }
}