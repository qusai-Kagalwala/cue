// src/lib/avatars.js
// v6.1 — DP selector, upgraded from emoji to hand-drawn SVG theatre avatars.
// Each is a self-contained SVG on a themed disc, rendered inline (Settings /
// profile) and rasterised onto the share card + certificate. Vector → crisp at
// any size, zero assets, tiny localStorage footprint (just the id).
// Palette: cue #f5b942, bright #ffcb5c, dim #6b5320, ink #ede8df, stage #0e0d0b.

const A = '#f5b942'
const B = '#ffcb5c'
const D = '#6b5320'
const I = '#ede8df'
const K = '#141109'

export const AVATARS = [
  {
    id: 'masks', label: 'The Masks',
    art: `
      <path d="M28 38 Q28 30 38 30 L46 30 Q50 30 50 36 L50 52 Q50 64 39 64 Q28 64 28 52 Z" fill="${A}" stroke="${K}" stroke-width="2"/>
      <circle cx="36" cy="44" r="2.4" fill="${K}"/><circle cx="44" cy="44" r="2.4" fill="${K}"/>
      <path d="M35 54 Q39 51 44 54" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M52 40 Q52 34 60 34 L70 34 Q74 34 74 40 L74 56 Q74 70 63 70 Q52 70 52 58 Z" fill="${B}" stroke="${K}" stroke-width="2"/>
      <path d="M58 47 L63 47 M67 47 L71 47" stroke="${K}" stroke-width="2" stroke-linecap="round"/>
      <path d="M59 62 Q64 58 69 62" stroke="${K}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  },
  {
    id: 'spotlight', label: 'The Spotlight',
    art: `
      <path d="M42 30 L58 30 L74 72 L26 72 Z" fill="${A}" opacity="0.28"/>
      <rect x="42" y="22" width="16" height="9" rx="2" fill="${I}" stroke="${K}" stroke-width="2"/>
      <rect x="47" y="18" width="6" height="5" rx="1" fill="${D}"/>
      <ellipse cx="50" cy="72" rx="20" ry="5" fill="${B}"/>
      <circle cx="50" cy="58" r="6" fill="${B}"/>`,
  },
  {
    id: 'star', label: 'The Star',
    art: `
      <path d="M50 24 L57 43 L77 43 L61 55 L67 74 L50 62 L33 74 L39 55 L23 43 L43 43 Z"
        fill="${A}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 34 L54 45 L50 52 L46 45 Z" fill="${B}"/>`,
  },
  {
    id: 'curtain', label: 'The Director',
    art: `
      <rect x="24" y="26" width="52" height="8" rx="2" fill="${D}"/>
      <path d="M28 34 Q34 54 30 74 L42 74 Q40 52 44 34 Z" fill="${A}" stroke="${K}" stroke-width="1.5"/>
      <path d="M72 34 Q66 54 70 74 L58 74 Q60 52 56 34 Z" fill="${A}" stroke="${K}" stroke-width="1.5"/>
      <path d="M46 34 Q50 40 54 34 Z" fill="${B}"/>`,
  },
  {
    id: 'quill', label: 'The Playwright',
    art: `
      <path d="M30 74 Q50 66 66 34 Q60 30 52 34 Q34 46 30 74 Z" fill="${A}" stroke="${K}" stroke-width="2"/>
      <path d="M42 54 Q50 48 60 40" stroke="${K}" stroke-width="1.5" fill="none" opacity="0.5"/>
      <circle cx="30" cy="74" r="3" fill="${I}"/>`,
  },
  {
    id: 'crown', label: 'The Lead',
    art: `
      <path d="M26 62 L30 38 L42 52 L50 32 L58 52 L70 38 L74 62 Z"
        fill="${A}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>
      <rect x="26" y="62" width="48" height="8" rx="2" fill="${D}"/>
      <circle cx="50" cy="32" r="3" fill="${B}"/>
      <circle cx="30" cy="38" r="2.5" fill="${B}"/><circle cx="70" cy="38" r="2.5" fill="${B}"/>`,
  },
  {
    id: 'ticket', label: 'The Ticket',
    art: `
      <path d="M28 40 Q32 40 32 44 Q32 48 28 48 L28 60 L72 60 L72 48 Q68 48 68 44 Q68 40 72 40 L72 34 L28 34 Z"
        fill="${A}" stroke="${K}" stroke-width="2"/>
      <line x1="50" y1="36" x2="50" y2="58" stroke="${K}" stroke-width="2" stroke-dasharray="3 3"/>
      <circle cx="39" cy="47" r="2" fill="${K}"/>`,
  },
  {
    id: 'trophy', label: 'The Encore',
    art: `
      <path d="M37 28 L63 28 L61 47 Q61 57 50 57 Q39 57 39 47 Z" fill="${A}" stroke="${K}" stroke-width="2"/>
      <path d="M37 32 Q26 32 28 43 Q30 50 39 48" fill="none" stroke="${A}" stroke-width="4" stroke-linecap="round"/>
      <path d="M63 32 Q74 32 72 43 Q70 50 61 48" fill="none" stroke="${A}" stroke-width="4" stroke-linecap="round"/>
      <rect x="46" y="57" width="8" height="9" fill="${D}"/>
      <rect x="37" y="66" width="26" height="6" rx="2" fill="${D}"/>
      <path d="M45 39 L49 44 L55 36" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    id: 'comedy', label: 'The Comedy',
    art: `
      <circle cx="50" cy="50" r="24" fill="${A}" stroke="${K}" stroke-width="2"/>
      <path d="M40 44 Q42 40 46 44" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M54 44 Q56 40 60 44" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M38 56 Q50 68 62 56 Q50 60 38 56 Z" fill="${K}"/>`,
  },
  {
    id: 'sage', label: 'The Sage',
    art: `
      <circle cx="50" cy="50" r="24" fill="${D}" stroke="${K}" stroke-width="2"/>
      <circle cx="42" cy="46" r="8" fill="${I}"/><circle cx="58" cy="46" r="8" fill="${I}"/>
      <circle cx="42" cy="46" r="3" fill="${K}"/><circle cx="58" cy="46" r="3" fill="${K}"/>
      <path d="M46 56 L50 60 L54 56 Z" fill="${A}"/>
      <path d="M34 34 L42 40 M66 34 L58 40" stroke="${A}" stroke-width="2" stroke-linecap="round"/>`,
  },
  {
    id: 'rising', label: 'The Rising',
    art: `
      <path d="M50 26 Q60 40 58 58 L42 58 Q40 40 50 26 Z" fill="${A}" stroke="${K}" stroke-width="2"/>
      <circle cx="50" cy="44" r="4" fill="${K}"/>
      <path d="M42 58 L36 68 L44 62 Z" fill="${B}"/>
      <path d="M58 58 L64 68 L56 62 Z" fill="${B}"/>
      <path d="M50 62 L50 74" stroke="${B}" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: 'flame', label: 'The Streak',
    art: `
      <path d="M50 24 Q64 40 60 58 Q58 72 50 72 Q42 72 40 58 Q38 46 50 24 Z"
        fill="${A}" stroke="${K}" stroke-width="2"/>
      <path d="M50 42 Q57 52 54 62 Q52 68 50 68 Q48 68 46 62 Q44 54 50 42 Z" fill="${B}"/>`,
  },
]

export const DEFAULT_AVATAR = 'masks'

export function avatarFor(id) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS.find((a) => a.id === DEFAULT_AVATAR)
}

export function avatarSvg(id, size = 96) {
  const a = avatarFor(id)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${a.label}"><defs><radialGradient id="disc-${a.id}" cx="50%" cy="38%" r="70%"><stop offset="0%" stop-color="#20190f"/><stop offset="100%" stop-color="${K}"/></radialGradient></defs><circle cx="50" cy="50" r="48" fill="url(#disc-${a.id})" stroke="${D}" stroke-width="2"/>${a.art}</svg>`
}

export function avatarDataUrl(id, size = 96) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg(id, size))}`
}