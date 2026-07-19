// src/lib/screens.js
// Screen identifiers for state-based routing.
// Lives in lib/ so component files export only components (Fast Refresh rule).

export const SCREENS = {
  CHALLENGE: 'challenge',
  MAP: 'map',
  SANDBOX: 'sandbox',
  GUIDED: 'guided',
  SETTINGS: 'settings',
}

// v2-3a — Opening Act beat order (the product spec; v2-3b/3c import this)
export const BEATS = ['title', 'name', 'audition', 'why', 'persona', 'curtain']