// src/hooks/useEvaluation.js
// T3.3 state machine + T-fix-1: transition-gated XP, prompt-hash dedup,
// attempt-history logging.
//
// XP rule: awarded exactly once per unique evaluation, at the moment the
// machine transitions INTO `done` with a fresh result. Two guards enforce it:
//   1. inFlight ref — blocks concurrent/re-entrant submits (spam, races)
//   2. hash dedup — an identical resubmission (same lesson variant + same
//      trimmed prompt) replays the cached result: zero network, zero XP,
//      zero quota. Change one character and it's a fresh evaluation again.

import { useRef, useState } from 'react'
import { evaluateWithRetry } from '../lib/gemini'
import { heuristicEvaluate } from '../lib/heuristic'
import { appendAttempt, saveToLibrary, LIBRARY_THRESHOLD } from '../lib/storage'
import { completeLesson, getActiveStageId } from './useProgress'

/** djb2 — tiny, fast, plenty for dedup (not crypto, doesn't need to be). */
function hashSubmission(lesson, prompt) {
  const str = `${lesson.id}|${lesson.scenario}|${prompt.trim()}`
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0
  }
  return h
}

export function useEvaluation() {
  const [status, setStatus] = useState('idle') // idle | evaluating | done | error
  const [result, setResult] = useState(null)
  const [award, setAward] = useState(null)
  const [errorCode, setErrorCode] = useState(null)
  const [cached, setCached] = useState(false)  // true when showing a dedup replay
  const inFlight = useRef(false)
  // Last unique evaluation: { hash, result, award } — the dedup cache.
  const lastEval = useRef(null)

  async function submit(lesson, userPrompt) {
    if (inFlight.current) return

    // T-fix-1: identical resubmission → replay cached outcome.
    // No network, no XP, no attempt logged (nothing new was evaluated).
    const hash = hashSubmission(lesson, userPrompt)
    if (lastEval.current?.hash === hash) {
      setResult(lastEval.current.result)
      setAward(lastEval.current.award)
      setCached(true)
      setStatus('done')
      return
    }

    inFlight.current = true
    setStatus('evaluating')
    setErrorCode(null)
    setCached(false)

    try {
      let evaluation
      try {
        evaluation = await evaluateWithRetry(lesson, userPrompt, getActiveStageId())
      } catch (err) {
        setErrorCode(err.code ?? 'UNKNOWN')
        evaluation = heuristicEvaluate(lesson, userPrompt, getActiveStageId())
      }

      // --- The single transition into `done` with a fresh result. ---
      // Everything that must happen exactly once per evaluation, happens here:
      const xpAward = completeLesson(evaluation.offline ? 0 : evaluation.score)
      appendAttempt({
        lessonId: lesson.id,
        score: evaluation.score,
        engine: evaluation.offline ? 'heuristic' : (evaluation.model ?? 'unknown'),
        prompt: userPrompt,
      })
      // v2-11 — real high scores earn a place in the library (never
      // heuristic estimates: the library canonizes judged work only)
      if (!evaluation.offline && evaluation.score >= LIBRARY_THRESHOLD) {
        saveToLibrary({
          lessonId: lesson.id,
          title: lesson.title,
          prompt: userPrompt,
          score: evaluation.score,
        })
      }
      lastEval.current = { hash, result: evaluation, award: xpAward }

      setResult(evaluation)
      setAward(xpAward)
      setStatus('done')
    } catch (err) {
      console.error('[cue] evaluation flow failed entirely', err)
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  /** Back to idle for the next lesson (dedup cache survives on purpose —
      returning to a lesson and resubmitting the same prompt stays free). */
  function reset() {
    setStatus('idle')
    setResult(null)
    setAward(null)
    setErrorCode(null)
    setCached(false)
  }

  return { status, result, award, errorCode, cached, submit, reset }
}