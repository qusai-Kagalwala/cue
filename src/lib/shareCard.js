// src/lib/shareCard.js
// v2-1 — Canvas share card, 1080×1080, fully client-side.
import { avatarDataUrl } from './avatars'

// System font stacks only: canvas can't reliably wait on webfonts, and a
// card that sometimes renders in fallback anyway should ALWAYS render in
// fallback — deterministic beats occasionally-prettier.

const SIZE = 1080
const C = {
  stage: '#0e0d0b',
  surface: '#171512',
  line: '#2b2721',
  ink: '#ede8df',
  muted: '#9a9184',
  cue: '#f5b942',
  cueDim: '#6b5320',
}

// v6 — share-card style variants. redraw cycles through these. Each themes the
// spotlight, accent (Cue mark, score, rank), and frame; ink/muted stay for
// legibility. Amber is the classic/default (index 0).
export const CARD_VARIANTS = [
  { id: 'amber',   accent: '#f5b942', dim: '#6b5320', spot: '245,185,66' },
  { id: 'crimson', accent: '#e5674d', dim: '#6b2e20', spot: '229,103,77' },
  { id: 'violet',  accent: '#a98cf0', dim: '#3f2f6b', spot: '169,140,240' },
  { id: 'emerald', accent: '#5fc98a', dim: '#245239', spot: '95,201,138' },
]

// Rasterise an SVG data-URL onto the canvas — awaited so the card waits for it.
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const SERIF = 'Georgia, "Times New Roman", serif'
const MONO = '"Courier New", monospace'

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * Draw the card. Two flavours from one function:
 *   journey card (Completion): { level, rank, xp, streak, name? }
 *   score card (a result):     same + { score }
 * Returns { blob, url } — caller revokes the URL when done.
 */
export async function makeShareCard({ score = null, level, rank, xp, streak, name = null, variant = 0, avatar = null }) {
  const vi = Number.isInteger(variant) ? variant : 0
  const V =
    CARD_VARIANTS[((vi % CARD_VARIANTS.length) + CARD_VARIANTS.length) % CARD_VARIANTS.length] ??
    CARD_VARIANTS[0]
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')

  // Stage
  ctx.fillStyle = C.stage
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Spotlight: soft amber radial from the top
  const spot = ctx.createRadialGradient(SIZE / 2, -200, 100, SIZE / 2, -200, 900)
  spot.addColorStop(0, `rgba(${V.spot},0.22)`)
  spot.addColorStop(1, `rgba(${V.spot},0)`)
  ctx.fillStyle = spot
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Frame
  ctx.strokeStyle = V.dim
  ctx.lineWidth = 4
  roundRect(ctx, 40, 40, SIZE - 80, SIZE - 80, 32)
  ctx.stroke()

  ctx.textAlign = 'center'

  // Avatar (the stage face) — the hand-drawn SVG, rasterised onto the card.
  if (avatar) {
    const ax = SIZE / 2
    const ay = 120
    const d = 104
    try {
      const img = await loadImage(avatarDataUrl(avatar, d))
      ctx.drawImage(img, ax - d / 2, ay - d / 2, d, d)
    } catch {
      // if the SVG fails to load, skip silently — the card still renders
    }
  }

  // Cue mark
  ctx.fillStyle = V.accent
  ctx.font = `bold 92px ${SERIF}`
  ctx.fillText('Cue', SIZE / 2, avatar ? 250 : 190)
  ctx.fillStyle = C.muted
  ctx.font = `28px ${MONO}`
  ctx.fillText('your cue to ask better', SIZE / 2, avatar ? 300 : 240)

  // Centerpiece: score (result card) or rank (journey card)
  if (score != null) {
    // Big number + "/100" balanced as one unit on a shared baseline
    // (was a cramped centered stack). Measure both, center the block.
    const numStr = String(Math.round(score))
    const numFont = `bold 280px ${SERIF}`
    const maxFont = `36px ${MONO}`
    const baseline = 560
    const gap = 18
    ctx.font = numFont
    const numW = ctx.measureText(numStr).width
    ctx.font = maxFont
    const maxW = ctx.measureText('/100').width
    const startX = SIZE / 2 - (numW + gap + maxW) / 2
    ctx.textAlign = 'left'
    ctx.fillStyle = C.ink
    ctx.font = numFont
    ctx.fillText(numStr, startX, baseline)
    ctx.fillStyle = C.muted
    ctx.font = maxFont
    ctx.fillText('/100', startX + numW + gap, baseline)
    ctx.textAlign = 'center'
    ctx.fillStyle = V.accent
    ctx.font = `bold 64px ${SERIF}`
    ctx.fillText(rank, SIZE / 2, 690)
  } else {
    ctx.fillStyle = V.accent
    ctx.font = `bold 140px ${SERIF}`
    ctx.fillText(rank, SIZE / 2, 560)
    ctx.fillStyle = C.muted
    ctx.font = `30px ${MONO}`
    ctx.fillText('current rank', SIZE / 2, 620)
    if (name) {
      ctx.fillStyle = C.ink
      ctx.font = `44px ${SERIF}`
      ctx.fillText(name, SIZE / 2, 710)
    }
  }

  // Stat row: three pills
  const stats = [
    [`Lv ${level}`, 'level'],
    [`${xp}`, 'xp'],
    [`${streak}🔥`, 'streak'],
  ]
  const pillW = 250
  const gap = 40
  const totalW = stats.length * pillW + (stats.length - 1) * gap
  let px = (SIZE - totalW) / 2
  const py = 800
  for (const [value, label] of stats) {
    ctx.fillStyle = C.surface
    ctx.strokeStyle = C.line
    ctx.lineWidth = 2
    roundRect(ctx, px, py, pillW, 130, 20)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = C.ink
    ctx.font = `bold 52px ${SERIF}`
    ctx.fillText(value, px + pillW / 2, py + 62)
    ctx.fillStyle = C.muted
    ctx.font = `24px ${MONO}`
    ctx.fillText(label, px + pillW / 2, py + 102)
    px += pillW + gap
  }

  // Footer
  ctx.fillStyle = C.cueDim
  ctx.font = `26px ${MONO}`
  ctx.fillText('cue-orpin-five.vercel.app', SIZE / 2, SIZE - 70)

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  return { blob, url: URL.createObjectURL(blob) }
}