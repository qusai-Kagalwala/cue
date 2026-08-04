// src/lib/avatars.js
// v7 — DP selector, redrawn as CHARACTERS with personality (wizard, jester,
// knight, etc.) rather than flat icons. Each is a little figure on a themed
// disc: hat/crown/hair, a face, a body/robe, and a signature prop. Vector art
// (SVG) → crisp at any size, zero assets, tiny localStorage footprint (just the
// id). A mix of theatre roles + fun characters, all in Cue's amber world.
// Palette: cue #f5b942, bright #ffcb5c, dim #6b5320, ink #ede8df, skin #e8c9a0.

const A = '#f5b942' // amber accent
const B = '#ffcb5c' // bright
const D = '#6b5320' // dim
const I = '#ede8df' // ink / white
const S = '#e8c9a0' // skin
const K = '#1a140b' // outline dark
const R = '#3a2f1a' // robe/body base
const R2 = '#4a3a1e' // robe/body lighter

// disc + a face helper reused across characters (cx,cy = face center, r = radius)
const face = (cx, cy, r = 9) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${S}"/>` +
  `<circle cx="${cx - 3.5}" cy="${cy - 1}" r="1.3" fill="${K}"/>` +
  `<circle cx="${cx + 3.5}" cy="${cy - 1}" r="1.3" fill="${K}"/>`

// star path generator (cx,cy,size,fill)
const star = (cx, cy, sz, fill) => {
  const p = (a, r) => `${cx + Math.cos(a) * r * sz},${cy + Math.sin(a) * r * sz}`
  let d = 'M'
  for (let i = 0; i < 5; i++) {
    const o = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const inn = o + Math.PI / 5
    d += p(o, 1) + ' L' + p(inn, 0.42) + ' L'
  }
  return `<path d="${d.slice(0, -2)}Z" fill="${fill}"/>`
}

export const AVATARS = [
  {
    id: 'wizard', label: 'The Wizard',
    art: `
      <path d="M32 86 Q34 58 50 56 Q66 58 68 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      ${star(48, 72, 4, A)}
      ${face(50, 48)}
      <path d="M42 50 Q50 68 58 50 Q54 58 50 58 Q46 58 42 50 Z" fill="${I}"/>
      <path d="M35 40 L50 12 L65 40 Z" fill="${R2}" stroke="${K}" stroke-width="1.5"/>
      <path d="M33 40 L67 40 L64 44 L36 44 Z" fill="${R2}" stroke="${K}" stroke-width="1.5"/>
      ${star(50, 27, 4, B)}
      <circle cx="69" cy="66" r="6.5" fill="${B}"/>
      <circle cx="69" cy="66" r="9" fill="none" stroke="${A}" stroke-width="0.8" opacity="0.4"/>`,
  },
  {
    id: 'jester', label: 'The Jester',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      <path d="M34 86 L50 86 L50 56 Z" fill="${R2}"/>
      ${face(50, 48)}
      <path d="M50 52 Q52 55 54 52" stroke="${K}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M40 40 Q40 30 32 28 Q38 34 40 40Z" fill="${A}" stroke="${K}" stroke-width="1.2"/>
      <path d="M60 40 Q60 30 68 28 Q62 34 60 40Z" fill="${B}" stroke="${K}" stroke-width="1.2"/>
      <path d="M42 40 Q50 32 58 40 Q50 42 42 40Z" fill="${R2}" stroke="${K}" stroke-width="1.2"/>
      <circle cx="32" cy="28" r="2.4" fill="${I}"/><circle cx="68" cy="28" r="2.4" fill="${I}"/>
      <circle cx="50" cy="60" r="2" fill="${A}"/>`,
  },
  {
    id: 'monarch', label: 'The Monarch',
    art: `
      <path d="M32 86 Q34 56 50 54 Q66 56 68 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      <path d="M50 54 L46 86 L54 86 Z" fill="${A}" opacity="0.5"/>
      ${face(50, 46)}
      <path d="M44 50 Q50 55 56 50 Q50 54 44 50Z" fill="${I}"/>
      <path d="M37 36 L40 22 L46 32 L50 18 L54 32 L60 22 L63 36 Z" fill="${A}" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/>
      <rect x="37" y="36" width="26" height="4" fill="${D}"/>
      <circle cx="50" cy="20" r="1.8" fill="${B}"/>`,
  },
  {
    id: 'bard', label: 'The Bard',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      ${face(46, 46)}
      <path d="M36 40 Q38 32 46 32 Q54 32 54 42 Q50 38 44 38 Q40 38 36 44Z" fill="${R2}" stroke="${K}" stroke-width="1"/>
      <circle cx="60" cy="64" r="9" fill="${A}" stroke="${K}" stroke-width="1.3"/>
      <circle cx="60" cy="64" r="2.6" fill="${K}"/>
      <path d="M62 56 L72 40" stroke="${D}" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 55 L69 41 M62 57 L71 43" stroke="${I}" stroke-width="0.6" opacity="0.7"/>`,
  },
  {
    id: 'playwright', label: 'The Playwright',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      <rect x="40" y="62" width="20" height="16" rx="1.5" fill="${I}" stroke="${K}" stroke-width="1"/>
      <path d="M43 66 h14 M43 70 h14 M43 74 h9" stroke="${D}" stroke-width="0.9"/>
      ${face(50, 46)}
      <path d="M40 42 Q42 34 50 34 Q58 34 60 42 Q54 38 50 38 Q46 38 40 42Z" fill="${R2}"/>
      <path d="M63 58 Q70 44 74 40 Q71 40 68 42 Q60 52 60 60Z" fill="${A}" stroke="${K}" stroke-width="1"/>`,
  },
  {
    id: 'diva', label: 'The Diva',
    art: `
      <path d="M34 86 Q36 56 50 54 Q64 56 66 86 Z" fill="${R2}" stroke="${K}" stroke-width="1.5"/>
      ${star(46, 70, 3.5, A)}
      <path d="M36 46 Q32 30 50 27 Q68 30 64 46 Q62 60 58 64 L60 46 Q58 34 50 34 Q42 34 40 46 L42 64 Q38 60 36 46Z" fill="${D}" stroke="${K}" stroke-width="1"/>
      ${face(50, 45)}
      <path d="M47 51 Q50 54 53 51" stroke="${K}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <circle cx="67" cy="60" r="4" fill="${A}" stroke="${K}" stroke-width="1"/>
      <path d="M67 64 L67 72" stroke="${D}" stroke-width="2" stroke-linecap="round"/>`,
  },
  {
    id: 'knight', label: 'The Knight',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="#5a5a5e" stroke="${K}" stroke-width="1.5"/>
      <path d="M44 58 L50 64 L56 58" stroke="#7a7a7e" stroke-width="1.5" fill="none"/>
      <path d="M40 46 Q40 32 50 32 Q60 32 60 46 L60 52 Q50 56 40 52 Z" fill="#8a8a8e" stroke="${K}" stroke-width="1.3"/>
      <rect x="47" y="38" width="6" height="14" fill="${K}"/>
      <path d="M40 40 L60 40" stroke="${K}" stroke-width="1"/>
      <path d="M50 30 L50 24 L54 26" stroke="${A}" stroke-width="1.5" fill="none"/>
      <path d="M66 54 L74 46 M74 46 L71 44 M74 46 L72 49" stroke="#8a8a8e" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  },
  {
    id: 'sage', label: 'The Sage',
    art: `
      <path d="M32 86 Q34 56 50 54 Q66 56 68 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      ${face(50, 46)}
      <path d="M40 48 Q50 78 60 48 Q56 62 50 62 Q44 62 40 48Z" fill="${I}"/>
      <path d="M40 42 Q42 34 50 34 Q58 34 60 42 Q54 38 50 38 Q46 38 40 42Z" fill="${I}" opacity="0.85"/>
      <path d="M44 47 Q46 45 48 47 M52 47 Q54 45 56 47" stroke="${K}" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M64 40 Q70 44 68 52" stroke="${D}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="68" cy="54" r="2.5" fill="${A}"/>`,
  },
  {
    id: 'hero', label: 'The Hero',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="#3a4a6a" stroke="${K}" stroke-width="1.5"/>
      ${star(50, 68, 4, A)}
      <path d="M50 56 Q40 60 34 74 L38 76 Q42 64 50 60Z" fill="#a03a3a"/>
      <path d="M50 56 Q60 60 66 74 L62 76 Q58 64 50 60Z" fill="#a03a3a"/>
      ${face(50, 46)}
      <path d="M40 43 Q40 37 50 37 Q60 37 60 43 L57 43 Q54 40 50 40 Q46 40 43 43Z" fill="${A}"/>
      <path d="M40 42 Q42 32 50 32 Q58 32 60 42 Q54 38 50 38 Q46 38 40 42Z" fill="${K}"/>`,
  },
  {
    id: 'director', label: 'The Director',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="${R}" stroke="${K}" stroke-width="1.5"/>
      ${face(48, 46)}
      <path d="M39 40 Q41 33 48 33 Q55 33 56 41 Q51 37 47 37 Q43 37 39 43Z" fill="${K}"/>
      <rect x="58" y="48" width="16" height="11" rx="1.5" fill="${K}" stroke="${A}" stroke-width="1"/>
      <path d="M74 50 L80 47 L80 60 L74 57 Z" fill="${K}" stroke="${A}" stroke-width="1"/>
      <circle cx="62" cy="53" r="2" fill="${A}"/>
      <path d="M40 62 L46 58 M40 58 L46 62" stroke="${I}" stroke-width="1.5"/>`,
  },
  {
    id: 'detective', label: 'The Detective',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="#4a4032" stroke="${K}" stroke-width="1.5"/>
      <path d="M44 58 L50 58 L48 68 L46 68Z" fill="${I}" opacity="0.6"/>
      ${face(48, 47)}
      <path d="M38 40 Q38 34 48 34 Q58 34 58 40 L58 42 L38 42Z" fill="${R2}" stroke="${K}" stroke-width="1"/>
      <path d="M35 42 L61 42" stroke="${K}" stroke-width="1.4"/>
      <circle cx="66" cy="60" r="6" fill="none" stroke="${A}" stroke-width="2"/>
      <path d="M70 64 L76 70" stroke="${D}" stroke-width="2.4" stroke-linecap="round"/>`,
  },
  {
    id: 'star', label: 'The Star',
    art: `
      <path d="M34 86 Q36 58 50 56 Q64 58 66 86 Z" fill="${R2}" stroke="${K}" stroke-width="1.5"/>
      ${face(50, 46)}
      <path d="M40 42 Q42 32 50 32 Q58 32 60 42 Q54 38 50 38 Q46 38 40 42Z" fill="${A}"/>
      <path d="M46 52 Q50 56 54 52" stroke="${K}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      ${star(30, 34, 4.5, B)}
      ${star(72, 40, 3.5, A)}
      ${star(68, 68, 3, B)}`,
  },
]

export const DEFAULT_AVATAR = 'wizard'

export function avatarFor(id) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS.find((a) => a.id === DEFAULT_AVATAR)
}

export function avatarSvg(id, size = 96) {
  const a = avatarFor(id)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${a.label}"><defs><radialGradient id="d-${a.id}" cx="50%" cy="35%" r="72%"><stop offset="0%" stop-color="#241c10"/><stop offset="100%" stop-color="#120f0a"/></radialGradient></defs><circle cx="50" cy="50" r="48" fill="url(#d-${a.id})" stroke="${D}" stroke-width="2"/>${a.art}</svg>`
}

export function avatarDataUrl(id, size = 96) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg(id, size))}`
}