// src/lib/certificate.js
// Certificates for completing a stage (or all five). Two outputs, no deps:
//  - PNG  : a landscape canvas certificate, for sharing / saving.
//  - PDF  : the same layout opened in a print window → the browser's native
//           "Save as PDF" (no PDF library — honours the no-new-deps rule).
//
// A stage counts as complete when its currentLessonIndex >= 8. The "master"
// certificate is for finishing all five stages.

const W = 1400
const H = 990 // ~A4 landscape ratio
const C = {
  stage: '#0e0d0b',
  paper: '#14120f',
  line: '#2b2721',
  ink: '#ede8df',
  muted: '#9a9184',
  cue: '#f5b942',
  cueDim: '#6b5320',
}
const SERIF = 'Georgia, "Times New Roman", serif'
const MONO = '"Courier New", monospace'

const STAGE_TITLES = {
  text: 'Text Prompting',
  image: 'Image Prompting',
  video: 'Video Prompting',
  audio: 'Audio Prompting',
  code: 'Code Prompting',
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function todayLong() {
  try {
    return new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

/**
 * Draw a certificate to a canvas and return it.
 * opts: { stageId? ('all' for master), name, rank, xp }
 */
function drawCertificate({ stageId = 'all', name, rank, xp }) {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // paper
  ctx.fillStyle = C.stage
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = C.paper
  roundRect(ctx, 40, 40, W - 80, H - 80, 18)
  ctx.fill()

  // soft spotlight from top
  const spot = ctx.createRadialGradient(W / 2, -120, 80, W / 2, -120, 900)
  spot.addColorStop(0, 'rgba(245,185,66,0.16)')
  spot.addColorStop(1, 'rgba(245,185,66,0)')
  ctx.fillStyle = spot
  ctx.fillRect(40, 40, W - 80, H - 80)

  // double border
  ctx.strokeStyle = C.cueDim
  ctx.lineWidth = 2
  roundRect(ctx, 64, 64, W - 128, H - 128, 12)
  ctx.stroke()
  ctx.strokeStyle = C.line
  roundRect(ctx, 76, 76, W - 152, H - 152, 8)
  ctx.stroke()

  ctx.textAlign = 'center'

  // wordmark
  ctx.fillStyle = C.cue
  ctx.font = `bold 44px ${SERIF}`
  ctx.fillText('Cue', W / 2, 168)
  ctx.fillStyle = C.muted
  ctx.font = `italic 20px ${SERIF}`
  ctx.fillText('Your cue to ask better', W / 2, 200)

  // "Certificate of…"
  ctx.fillStyle = C.muted
  ctx.font = `28px ${MONO}`
  ctx.fillText('CERTIFICATE OF COMPLETION', W / 2, 300)

  // recipient
  ctx.fillStyle = C.muted
  ctx.font = `22px ${SERIF}`
  ctx.fillText('This certifies that', W / 2, 372)

  ctx.fillStyle = C.ink
  ctx.font = `bold 66px ${SERIF}`
  ctx.fillText(name || 'A Prompt Practitioner', W / 2, 452)

  // underline flourish under the name
  ctx.strokeStyle = C.cueDim
  ctx.lineWidth = 2
  const nameW = Math.min(560, ctx.measureText(name || 'A Prompt Practitioner').width + 80)
  ctx.beginPath()
  ctx.moveTo(W / 2 - nameW / 2, 476)
  ctx.lineTo(W / 2 + nameW / 2, 476)
  ctx.stroke()

  // what they completed
  const isMaster = stageId === 'all'
  ctx.fillStyle = C.muted
  ctx.font = `22px ${SERIF}`
  ctx.fillText('has completed', W / 2, 540)

  ctx.fillStyle = C.cue
  ctx.font = `bold 40px ${SERIF}`
  if (isMaster) {
    ctx.fillText('All Five Stages of Prompt Craft', W / 2, 596)
    ctx.fillStyle = C.muted
    ctx.font = `20px ${MONO}`
    ctx.fillText('text · image · video · audio · code', W / 2, 632)
  } else {
    ctx.fillText(`The ${STAGE_TITLES[stageId] ?? 'Prompting'} Stage`, W / 2, 596)
    ctx.fillStyle = C.muted
    ctx.font = `20px ${SERIF}`
    ctx.fillText('eight lessons of deliberate practice', W / 2, 632)
  }

  // rank + date footer row
  const footY = 760
  ctx.fillStyle = C.muted
  ctx.font = `18px ${MONO}`
  ctx.textAlign = 'left'
  ctx.fillText(`RANK: ${(rank || 'Understudy').toUpperCase()}`, 140, footY)
  ctx.textAlign = 'right'
  ctx.fillText(todayLong(), W - 140, footY)

  // divider
  ctx.strokeStyle = C.line
  ctx.beginPath()
  ctx.moveTo(140, footY + 20)
  ctx.lineTo(W - 140, footY + 20)
  ctx.stroke()

  ctx.textAlign = 'left'
  ctx.fillStyle = C.muted
  ctx.font = `16px ${MONO}`
  ctx.fillText('Awarded by Cue', 140, footY + 54)
  ctx.textAlign = 'right'
  ctx.fillText(typeof xp === 'number' ? `${xp} XP earned` : '', W - 140, footY + 54)

  // subtle seal
  ctx.textAlign = 'center'
  ctx.fillStyle = C.cueDim
  ctx.font = `bold 15px ${MONO}`
  ctx.fillText('★', W / 2, footY + 40)

  return canvas
}

/** PNG download. Returns { blob, url }; caller revokes the url. */
export async function makeCertificatePNG(opts) {
  const canvas = drawCertificate(opts)
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'))
  return { blob, url: URL.createObjectURL(blob) }
}

/** Trigger a PNG file download directly. */
export async function downloadCertificatePNG(opts) {
  const { blob, url } = await makeCertificatePNG(opts)
  const a = document.createElement('a')
  const label = opts.stageId === 'all' ? 'all-stages' : opts.stageId
  a.href = url
  a.download = `cue-certificate-${label}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return blob
}

/**
 * "PDF": render the certificate image into a print window and invoke the
 * browser's print dialog, where the user picks "Save as PDF". No library.
 */
export async function printCertificatePDF(opts) {
  const canvas = drawCertificate(opts)
  const dataUrl = canvas.toDataURL('image/png')
  const win = window.open('', '_blank')
  if (!win) return false
  win.document.write(`
    <html>
      <head>
        <title>Cue Certificate</title>
        <style>
          @page { size: landscape; margin: 0; }
          html, body { margin: 0; padding: 0; background: #0e0d0b; }
          img { width: 100%; height: auto; display: block; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" onload="setTimeout(function(){ window.print(); }, 150)" />
      </body>
    </html>
  `)
  win.document.close()
  return true
}