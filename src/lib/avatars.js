// src/lib/avatars.js
// v6 — DP (display picture) selector. Theatre-themed preset avatars, chosen in
// Settings and shown on the profile, certificate, and share card. Emoji-based
// so they need zero assets, render everywhere, and store as a tiny string id in
// localStorage. On-brand with Cue's theatre motif.

export const AVATARS = [
  { id: 'masks', emoji: '🎭', label: 'The Masks' },
  { id: 'star', emoji: '🌟', label: 'The Star' },
  { id: 'spotlight', emoji: '🔦', label: 'The Spotlight' },
  { id: 'curtain', emoji: '🎬', label: 'The Director' },
  { id: 'quill', emoji: '🪶', label: 'The Playwright' },
  { id: 'crown', emoji: '👑', label: 'The Lead' },
  { id: 'ticket', emoji: '🎟️', label: 'The Ticket' },
  { id: 'trophy', emoji: '🏆', label: 'The Encore' },
  { id: 'comedy', emoji: '😄', label: 'Comedy' },
  { id: 'owl', emoji: '🦉', label: 'The Sage' },
  { id: 'rocket', emoji: '🚀', label: 'The Rising' },
  { id: 'flame', emoji: '🔥', label: 'The Streak' },
]

export const DEFAULT_AVATAR = 'masks'

/** Resolve an avatar id to its record, falling back to the default. */
export function avatarFor(id) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS.find((a) => a.id === DEFAULT_AVATAR)
}

/** The emoji for an id (convenience for canvas/inline rendering). */
export function avatarEmoji(id) {
  return avatarFor(id).emoji
}