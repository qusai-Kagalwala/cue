// src/data/programme.js
// v2-18 — The Programme's content. ALTITUDE RULE (the red line): this
// file describes WHAT exists and WHERE to find it — never HOW it works.
// No architecture, no evaluation internals, no model names, no quota
// mechanics, no weight tables. Everything here is already visible to a
// user who explores; the Programme just organises the visible.
// Voice: the same child-to-elder plain language as the stage guides.

export const PROGRAMME = [
  {
    id: 'what',
    title: 'What is Cue?',
    body: [
      'Cue teaches you to talk to AI clearly — so the answers you get are actually useful.',
      'You practice on real-life situations, an AI scores your attempts and shows you how to improve, and your progress grows like a theatre career: from Understudy all the way to Playwright.',
      'No account, no signup. Everything stays on your device.',
    ],
  },
  {
    id: 'ladder',
    title: 'The three steps of every lesson',
    body: [
      'Every lesson climbs the same three steps:',
    ],
    items: [
      ['1 · Guided warm-up', 'We write most of the message; you fill in the blanks. Nearly impossible to get wrong — that\'s the point.'],
      ['2 · Assisted rehearsal', 'You write the whole message yourself, watching a live checklist tick as it gets better.'],
      ['3 · The assessment', 'Your best attempt, scored out of 100 by AI, with what worked, what to fix, and a stronger version to learn from. This one earns XP.'],
    ],
    footer: 'In a hurry? "Skip to assessment" is always there.',
  },
  {
    id: 'map',
    title: 'Finding your way around',
    items: [
      ['The stage (home)', 'Your current lesson — the app opens straight into it.'],
      ['The lesson map 🗺', 'All 8 lessons: replay any finished one for a better score (half XP), or re-practice the warm-up and rehearsal anytime.'],
      ['The Sandbox 🧪', 'Bring real life in. Freeplay scores any prompt you\'re working on. The Critic\'s Review reads a prompt AND the answer some AI gave you, and tells you what to fix.'],
      ['The library 📖', 'Your best prompts (58+) are saved here automatically. Copy one whenever real life needs it.'],
      ['Your progress 📈', 'The Season Report charts every attempt you\'ve made. The Playbill collects your achievement stickers.'],
      ['Settings ⚙', 'Switch persona or theme, back up your data, or start fresh.'],
    ],
  },
  {
    id: 'rewards',
    title: 'XP, ranks & what unlocks',
    body: [
      'Assessments earn XP — better prompts earn more. Practice steps pay a small one-time reward. Show up daily and your streak grows.',
    ],
    items: [
      ['Ranks', 'Understudy → Ensemble → Lead → Director → Playwright. The Audition sets where you start; XP does the climbing.'],
      ['Level 3', 'Unlocks the light theme — house lights up.'],
      ['Level 4', 'Unlocks The Encore: one boss challenge a day, every skill at once, big XP.'],
      ['Every level', 'One more Sandbox evaluation per day.'],
      ['The daily ★', 'One lesson each day carries bonus XP — look for the star.'],
    ],
  },
  {
    id: 'personas',
    title: 'Personas — lessons in your world',
    body: [
      'Pick student, everyday, or professional and every scenario reframes to fit your life — exam prep, family plans, or client emails. Switch anytime in Settings; your progress carries over.',
    ],
  },
  {
    id: 'data',
    title: 'Your data stays yours',
    body: [
      'Everything — progress, history, library, stickers — lives on this device only. Nothing is collected, nothing is tracked.',
      'In Settings you can download it all as one file (to back up or move browsers) and bring it back with Import. Reset wipes the slate whenever you want.',
    ],
  },
  {
    id: 'howto',
    title: 'How do I…',
    items: [
      ['…hear my prompt instead of typing?', 'Tap the 🎤 next to Submit and speak — English or हिंदी (where your browser supports it).'],
      ['…share my score?', 'After a real evaluation, or from the finale: "Share this score" makes a card you can post or download.'],
      ['…retake the audition?', 'Finish all 8 lessons — the finale offers the same task again and shows how far you\'ve come, word by word.'],
      ['…practice without spending my Sandbox evaluations?', 'The warm-up and rehearsal steps are always free, from any lesson on the map.'],
      ['…use Cue offline?', 'Keep going — scoring switches to a built-in estimate (marked clearly) until you\'re back online.'],
    ],
  },
  {
    id: 'next',
    title: 'And next…',
    body: [
      'Cue teaches text today. More stages are coming — the same three steps, for talking to image, video, and audio AI. Same theatre, new productions. 🎭',
    ],
  },
]