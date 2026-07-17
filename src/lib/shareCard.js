// src/lib/shareCard.js
// v2-1 — Canvas share card, 1080×1080, fully client-side.
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
export async function makeShareCard({ score = null, level, rank, xp, streak, name = null }) {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')

  // Stage
  ctx.fillStyle = C.stage
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Spotlight: soft amber radial from the top
  const spot = ctx.createRadialGradient(SIZE / 2, -200, 100, SIZE / 2, -200, 900)
  spot.addColorStop(0, 'rgba(245,185,66,0.22)')
  spot.addColorStop(1, 'rgba(245,185,66,0)')
  ctx.fillStyle = spot
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Frame
  ctx.strokeStyle = C.cueDim
  ctx.lineWidth = 4
  roundRect(ctx, 40, 40, SIZE - 80, SIZE - 80, 32)
  ctx.stroke()

  ctx.textAlign = 'center'

  // Cue mark
  ctx.fillStyle = C.cue
  ctx.font = `bold 92px ${SERIF}`
  ctx.fillText('Cue', SIZE / 2, 190)
  ctx.fillStyle = C.muted
  ctx.font = `28px ${MONO}`
  ctx.fillText('your cue to ask better', SIZE / 2, 240)

  // Centerpiece: score (result card) or rank (journey card)
  if (score != null) {
    ctx.fillStyle = C.ink
    ctx.font = `bold 300px ${SERIF}`
    ctx.fillText(String(Math.round(score)), SIZE / 2, 580)
    ctx.fillStyle = C.muted
    ctx.font = `32px ${MONO}`
    ctx.fillText('/ 100', SIZE / 2, 640)
    ctx.fillStyle = C.cue
    ctx.font = `bold 64px ${SERIF}`
    ctx.fillText(rank, SIZE / 2, 740)
  } else {
    ctx.fillStyle = C.cue
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