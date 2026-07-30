// src/components/CursorGlow.jsx
// A soft amber glow that trails the pointer on desktop — a subtle "the page is
// alive under your hand" touch. Deliberately restrained: low opacity, heavy
// blur, and it eases toward the cursor rather than sticking to it, so it feels
// like a light source, not a laser dot.
//
// Guards:
//  - Only mounts on devices with a FINE pointer (mouse/trackpad). On touch
//    there's no cursor, so it never runs — no wasted work on phones.
//  - Respects prefers-reduced-motion (doesn't mount at all).
//  - pointer-events-none and fixed behind content, so it never blocks clicks.
//  - Uses one rAF loop with eased interpolation; cheap and smooth.

import { useEffect, useRef, useState } from 'react'

function hasFinePointer() {
  if (typeof window === 'undefined') return false
  const fine = window.matchMedia?.('(pointer: fine)').matches
  const noReduce = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return Boolean(fine && noReduce)
}

export default function CursorGlow() {
  const [enabled] = useState(hasFinePointer)
  const glowRef = useRef(null)
  const target = useRef({ x: -9999, y: -9999 })
  const pos = useRef({ x: -9999, y: -9999 })
  const visible = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    if (!enabled) return undefined
    const el = glowRef.current
    if (!el) return undefined

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visible.current) {
        visible.current = true
        el.style.opacity = '1'
      }
    }
    const onLeave = () => {
      visible.current = false
      el.style.opacity = '0'
    }

    const tick = () => {
      // ease toward the cursor (lag = smooth, alive feel)
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onMove)
    document.addEventListener('mouseleave', onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[-5] h-64 w-64 rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--color-cue) 22%, transparent) 0%, transparent 65%)',
        filter: 'blur(24px)',
        willChange: 'transform',
      }}
    />
  )
}