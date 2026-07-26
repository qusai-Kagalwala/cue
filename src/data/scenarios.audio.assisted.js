// src/data/scenarios.audio.assisted.js
// v3-4c — AUDIO STAGE assisted tier: 8×3. Free textarea + live checklist
// (Voice/instrument · Mood set · Technical · Structure · Timbre · Density).
// One wrinkle each. AI-assisted, hand-curated.

export const ASSISTED_AUDIO = {
  l1: {
    student: { scenario: "Your game's menu needs one signature sound loop — players will hear it a hundred times, so 'nice music' won't do; it must be a specific, named sound.", task: 'Write a prompt naming the exact sound and its character.' },
    everyday: { scenario: "You want a ringtone that is unmistakably yours — one instrument, one clear character, recognisable in a crowd.", task: 'Write a prompt naming a single distinctive sound.' },
    professional: { scenario: "The brand's audio logo is three notes. The sound of those notes — bright, wooden, electronic? — is the entire brief.", task: 'Write a prompt naming the precise sound of the audio logo.' },
  },
  l2: {
    student: { scenario: "Your poem-recital backing must feel exactly like monsoon melancholy — wrong mood and the whole piece collapses.", task: 'Write a prompt where a precise mood governs the sound.' },
    everyday: { scenario: "A track for your morning routine should feel gently energising — not sleepy, not hyper, a specific in-between.", task: 'Write a prompt that pins a subtle mood.' },
    professional: { scenario: "A meditation app needs music that is calm without being sad — clients rejected two tracks as 'too melancholy'.", task: 'Write a prompt distinguishing calm from sad in the mood.' },
  },
  l3: {
    student: { scenario: "Your fusion piece must pair a specific Western and Indian instrument — the combination is the identity of the track.", task: 'Write a prompt naming both instruments and how they share space.' },
    everyday: { scenario: "You want a duet feel: two named voices trading lines, not a single vocalist.", task: 'Write a prompt specifying the two voices and their interplay.' },
    professional: { scenario: "The explainer video needs a narrator voice with a very particular character — approachable, clear, neither corporate nor casual.", task: 'Write a prompt casting that exact voice.' },
  },
  l4: {
    student: { scenario: "Your three-minute composition assignment is graded on structure — it must have distinct, named sections, not one texture throughout.", task: 'Write a prompt laying out a full multi-section arrangement.' },
    everyday: { scenario: "The party track should have an obvious drop everyone waits for — the structure has to set it up and deliver it.", task: 'Write a prompt whose structure builds to and releases a drop.' },
    professional: { scenario: "The 60-second sizzle reel needs music timed to three beats: intro, montage, logo — the structure must map to the edit.", task: 'Write a prompt whose sections match a known edit.' },
  },
  l5: {
    student: { scenario: "Your marching-band arrangement must sit at a precise tempo and key to be playable by the ensemble.", task: 'Write a prompt with exact tempo, key and length.' },
    everyday: { scenario: "A workout track needs a driving tempo you can run to and a length that covers one full set.", task: 'Write a prompt with the tempo and duration nailed down.' },
    professional: { scenario: "The IVR hold music must loop cleanly for minutes without an audible seam and stay under a certain brightness.", task: 'Write a prompt with the technical loop requirements.' },
  },
  l6: {
    student: { scenario: "Your presentation on Carnatic music needs an authentic Carnatic example, not a generic 'Indian classical' blur.", task: 'Write a prompt naming the exact tradition and its markers.' },
    everyday: { scenario: "You want a Garba track for Navratri — specifically that genre, with the right rhythm to dance to.", task: 'Write a prompt locking the genre and its rhythm.' },
    professional: { scenario: "The retro game needs authentic 8-bit chiptune — precisely that genre, or it breaks the aesthetic.", task: 'Write a prompt that nails the chiptune genre.' },
  },
  l7: {
    student: { scenario: "The track is right except the intro is too long and the vocals sit too quiet under the beat.", task: 'Write a refinement prompt naming what to keep and two exact changes.' },
    everyday: { scenario: "Your track is good but the ending fades too abruptly and it needs a bit more warmth.", task: 'Write a refinement prompt with keep-and-change instructions.' },
    professional: { scenario: "Client note: 'love it, but it feels a little dated'. The composition is approved; only the production should modernise.", task: 'Write a refinement prompt translating that into production changes.' },
  },
  l8: {
    student: { scenario: "A 45-token cap on the submission field, and the track still needs instrument, mood, genre, tempo, key and structure.", task: 'Write the densest complete audio prompt that fits.' },
    everyday: { scenario: "One shot at a good festival track, slow connection, no retry.", task: 'Write one dense, complete prompt inside the budget.' },
    professional: { scenario: "Shared library entries are capped so they stay reusable across briefs — yours must still specify everything.", task: 'Write a complete prompt in fragments within the cap.' },
  },
}