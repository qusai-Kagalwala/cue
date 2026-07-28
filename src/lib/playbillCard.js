// src/lib/playbillCard.js
// A shareable card of the Playbill — the achievement wall. Draws the earned
// stickers in a grid on a 1080x1080 square (social-friendly), with the count
// and the person's name. Same hand-rolled canvas approach as shareCard.js —
// no dependencies, system fonts only.

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
 * Draw the Playbill card. opts: { achievements: [{sticker,title,earned}],
 * name }. Returns the canvas element.
 */
function drawPlaybillCard({ achievements = [], name }) {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')

  const earned = achievements.filter((a) => a.earned)
  const total = achievements.length

  // background
  ctx.fillStyle = C.stage
  ctx.fillRect(0, 0, SIZE, SIZE)
  const spot = ctx.createRadialGradient(SIZE / 2, 120, 80, SIZE / 2, 120, 820)
  spot.addColorStop(0, 'rgba(245,185,66,0.14)')
  spot.addColorStop(1, 'rgba(245,185,66,0)')
  ctx.fillStyle = spot
  ctx.fillRect(0, 0, SIZE, SIZE)

  // border
  ctx.strokeStyle = C.cueDim
  ctx.lineWidth = 2
  roundRect(ctx, 48, 48, SIZE - 96, SIZE - 96, 20)
  ctx.stroke()

  ctx.textAlign = 'center'

  // header
  ctx.fillStyle = C.cue
  ctx.font = `bold 52px ${SERIF}`
  ctx.fillText('Cue', SIZE / 2, 150)
  ctx.fillStyle = C.muted
  ctx.font = `italic 24px ${SERIF}`
  ctx.fillText('My Playbill', SIZE / 2, 192)

  // count line
  ctx.fillStyle = C.ink
  ctx.font = `bold 34px ${MONO}`
  ctx.fillText(`${earned.length} of ${total} stickers earned`, SIZE / 2, 262)

  // sticker grid — draw earned stickers (with a few placeholders if none)
  const show = earned.length > 0 ? earned : achievements.slice(0, 4)
  const cols = 3
  const cellW = 300
  const cellH = 250
  const gridW = cols * cellW
  const startX = (SIZE - gridW) / 2 + cellW / 2
  let startY = 380
  const rows = Math.ceil(show.length / cols)
  // if the grid is short, nudge it down to centre vertically a bit
  if (rows <= 2) startY = 430

  show.slice(0, 9).forEach((a, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const cx = startX + col * cellW
    const cy = startY + row * cellH

    // sticker tile
    ctx.fillStyle = a.earned ? 'rgba(245,185,66,0.06)' : C.surface
    ctx.strokeStyle = a.earned ? C.cueDim : C.line
    ctx.lineWidth = 1.5
    roundRect(ctx, cx - 130, cy - 90, 260, 200, 16)
    ctx.fill()
    ctx.stroke()

    // emoji sticker
    ctx.font = '72px sans-serif'
    ctx.fillStyle = C.ink
    ctx.globalAlpha = a.earned ? 1 : 0.35
    ctx.fillText(a.sticker || 'star', cx, cy + 6)
    ctx.globalAlpha = 1

    // title
    ctx.fillStyle = a.earned ? C.cue : C.muted
    ctx.font = `bold 22px ${SERIF}`
    const title = (a.title || '').slice(0, 20)
    ctx.fillText(title, cx, cy + 72)
  })

  // footer
  ctx.fillStyle = C.muted
  ctx.font = `22px ${MONO}`
  const who = name ? `${name} · ` : ''
  ctx.fillText(`${who}cue-orpin-five.vercel.app`, SIZE / 2, SIZE - 90)
  ctx.fillStyle = C.cueDim
  ctx.font = `bold 18px ${MONO}`
  ctx.fillText('Your cue to ask better', SIZE / 2, SIZE - 58)

  return canvas
}

/** Trigger a PNG download of the Playbill card. */
export async function downloadPlaybillCard(opts) {
  const canvas = drawPlaybillCard(opts)
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'))
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cue-playbill.png'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return blob
}

/** Web Share API where available (mobile), else fall back to download. */
export async function sharePlaybillCard(opts) {
  const canvas = drawPlaybillCard(opts)
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'))
  const file = new File([blob], 'cue-playbill.png', { type: 'image/png' })
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'My Cue Playbill',
        text: 'My achievement wall on Cue.',
      })
      return true
    } catch {
      /* user cancelled — fall through to download */
    }
  }
  return downloadPlaybillCard(opts)
}