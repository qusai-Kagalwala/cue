// src/lib/stageMotifs.js
// v6.2 — per-stage background motifs. Each stage gets a faint tiled SVG pattern
// drawn behind the amber orbs (still behind all content), giving every stage a
// distinct identity without hurting readability. Rendered as a full-bleed SVG
// <pattern> at very low opacity; the AnimatedBackground picks the motif by the
// active stage. Amber-on-stage so it reads in both themes; the opacity does the
// "subtle" work. Reduced-motion safe (no animation here — it's static texture).
//
// Each entry is the inner <pattern> content on a tile; TILE defines the repeat.

const C = '#f5b942' // amber, drawn at low layer opacity

// Tile size per stage kept ~200px so symbols breathe. mono = monospace glyphs.
const mono = 'monospace'

// The motif tile markup for each stage. Symbols chosen from the stage's world.
const MOTIFS = {
  // everyday craft ---------------------------------------------------------
  text: `
    <text x="24" y="40" font-family="Georgia" font-size="30" fill="${C}">A</text>
    <text x="120" y="80" font-family="Georgia" font-size="22" fill="${C}">a</text>
    <text x="60" y="120" font-family="Georgia" font-size="18" fill="${C}">"</text>
    <text x="150" y="150" font-family="Georgia" font-size="26" fill="${C}">¶</text>
    <line x1="24" y1="150" x2="90" y2="150" stroke="${C}" stroke-width="2"/>`,
  image: `
    <rect x="24" y="24" width="46" height="36" rx="3" fill="none" stroke="${C}" stroke-width="2"/>
    <circle cx="38" cy="38" r="4" fill="${C}"/>
    <path d="M28 56 L44 42 L56 54 L66 46" stroke="${C}" stroke-width="2" fill="none"/>
    <path d="M120 90 L140 70 L160 90 Z" fill="none" stroke="${C}" stroke-width="2"/>
    <circle cx="70" cy="130" r="10" fill="none" stroke="${C}" stroke-width="2"/>`,
  video: `
    <rect x="24" y="30" width="50" height="34" rx="4" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M42 40 L42 54 L54 47 Z" fill="${C}"/>
    <rect x="120" y="90" width="8" height="8" fill="${C}"/><rect x="134" y="90" width="8" height="8" fill="${C}"/>
    <rect x="148" y="90" width="8" height="8" fill="${C}"/>
    <path d="M40 120 L70 120 M40 132 L60 132" stroke="${C}" stroke-width="2"/>`,
  audio: `
    <path d="M24 90 L24 110 M34 78 L34 122 M44 66 L44 134 M54 84 L54 116 M64 74 L64 126"
      stroke="${C}" stroke-width="3" stroke-linecap="round"/>
    <path d="M130 40 Q150 40 150 70 Q150 100 130 100" fill="none" stroke="${C}" stroke-width="2"/>
    <circle cx="150" cy="140" r="6" fill="none" stroke="${C}" stroke-width="2"/>`,
  // directing AI -----------------------------------------------------------
  code: `
    <text x="24" y="40" font-family="${mono}" font-size="24" fill="${C}">&lt;/&gt;</text>
    <text x="130" y="80" font-family="${mono}" font-size="20" fill="${C}">{ }</text>
    <text x="50" y="120" font-family="${mono}" font-size="18" fill="${C}">( )</text>
    <text x="150" y="150" font-family="${mono}" font-size="22" fill="${C}">;</text>
    <rect x="34" y="132" width="9" height="16" fill="${C}"/>
    <text x="95" y="160" font-family="${mono}" font-size="16" fill="${C}">=&gt;</text>`,
  agent: `
    <rect x="30" y="28" width="34" height="30" rx="6" fill="none" stroke="${C}" stroke-width="2"/>
    <circle cx="40" cy="42" r="3" fill="${C}"/><circle cx="54" cy="42" r="3" fill="${C}"/>
    <line x1="47" y1="20" x2="47" y2="28" stroke="${C}" stroke-width="2"/><circle cx="47" cy="18" r="3" fill="${C}"/>
    <path d="M120 90 L140 90 L140 110 M140 90 L134 84 M140 90 L134 96" stroke="${C}" stroke-width="2" fill="none"/>
    <circle cx="70" cy="130" r="4" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M150 130 L166 130" stroke="${C}" stroke-width="2" stroke-dasharray="3 3"/>`,
  rag: `
    <path d="M30 30 h30 v40 h-30 z M30 38 h30 M30 46 h30 M30 54 h22" stroke="${C}" stroke-width="1.5" fill="none"/>
    <path d="M120 80 L150 80 M120 92 L142 92 M120 104 L150 104" stroke="${C}" stroke-width="2"/>
    <circle cx="70" cy="130" r="12" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M79 139 L92 152" stroke="${C}" stroke-width="2"/>`,
  automation: `
    <circle cx="44" cy="44" r="14" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M44 30 v-6 M44 58 v6 M30 44 h-6 M58 44 h6 M34 34 l-4 -4 M54 54 l4 4 M54 34 l4 -4 M34 54 l-4 4" stroke="${C}" stroke-width="2"/>
    <circle cx="44" cy="44" r="5" fill="${C}"/>
    <path d="M110 100 L134 100 L134 120 L158 120 M134 100 L128 94 M134 100 L128 106" stroke="${C}" stroke-width="2" fill="none"/>`,
  comprehend: `
    <path d="M26 30 h40 v22 h-26 l-8 8 v-8 h-6 z" fill="none" stroke="${C}" stroke-width="1.6"/>
    <path d="M34 38 h24 M34 44 h16" stroke="${C}" stroke-width="1.4"/>
    <path d="M120 96 l6 6 l12 -14" stroke="${C}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="60" cy="120" r="10" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M67 127 l9 9" stroke="${C}" stroke-width="2" stroke-linecap="round"/>
    <path d="M150 40 q10 -10 20 0 q-10 10 -20 0z" fill="none" stroke="${C}" stroke-width="1.6"/>
    <circle cx="160" cy="40" r="3" fill="${C}"/>`,
  system: `
    <rect x="28" y="28" width="44" height="44" rx="6" fill="none" stroke="${C}" stroke-width="2"/>
    <path d="M40 44 h20 M40 52 h20 M40 60 h12" stroke="${C}" stroke-width="2"/>
    <circle cx="140" cy="90" r="4" fill="${C}"/><path d="M140 78 v-6 M140 108 v-6 M128 90 h-6 M152 90 h6" stroke="${C}" stroke-width="2"/>
    <text x="55" y="150" font-family="${mono}" font-size="18" fill="${C}">§</text>`,
}

const TILE = 200

/**
 * A full SVG string (as a data-URL body) with the stage's motif tiled across
 * it, at the given opacity. Falls back to the text motif for unknown stages.
 */
export function stageMotifSvg(stageId, opacity = 0.06, color = '#f5b942') {
  // motifs are authored in amber (#f5b942); swap to `color` for theming.
  const motif = (MOTIFS[stageId] ?? MOTIFS.text).replaceAll('#f5b942', color)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="m-${stageId}" width="${TILE}" height="${TILE}" patternUnits="userSpaceOnUse">
        <g opacity="${opacity}">${motif}</g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#m-${stageId})"/>
  </svg>`
}

/** Data-URL form for use as a CSS background-image. */
export function stageMotifDataUrl(stageId, opacity = 0.06, color = '#f5b942') {
  return `data:image/svg+xml;utf8,${encodeURIComponent(stageMotifSvg(stageId, opacity, color))}`
}

export const MOTIF_STAGES = Object.keys(MOTIFS)