// src/data/scenarios.audio.solo.js
// v3-4b — AUDIO STAGE solo scenarios: 8 lessons × 3 personas. Assessed
// tier. Real reasons someone opens an audio generator, Indian contexts.
// AI-assisted drafting, hand-curated.

export const SOLO_AUDIO = {
  l1: {
    student: { scenario: "Your short film needs a theme and 'background music' keeps giving you generic orchestral swells. You need to name the actual sound you hear in your head.", task: 'Write an audio prompt naming the specific sound.', hints: ['What single instrument or voice leads?', 'What quality defines it?'] },
    everyday: { scenario: "You want a simple tune for a family video montage. 'Nice music' returns stock corporate loops — name what you actually want to hear.", task: 'Write a prompt naming the sound precisely.', hints: ['Instrument or voice?', 'Warm, bright, soft?'] },
    professional: { scenario: "Your app's notification sound brief says 'pleasant'. The AI gives you random chimes. You need to name the exact sound character.", task: 'Write a prompt naming the sound and its quality.', hints: ['What makes the sound — bell, synth, pluck?', 'How long, how bright?'] },
  },
  l2: {
    student: { scenario: "Your documentary's opening needs to feel like quiet dread. Every attempt sounds triumphant instead — the mood is the whole instruction.", task: 'Write a prompt where the mood drives everything.', hints: ['What exact feeling?', 'What tempo and dynamics suit it?'] },
    everyday: { scenario: "A track for your parents' anniversary slideshow should feel tender and nostalgic, not upbeat and generic.", task: 'Write a prompt whose mood carries the emotion.', hints: ['Tender, wistful, warm?', 'Slow and sparse, or full?'] },
    professional: { scenario: "The brand video needs music that feels 'confident but calm' — the client rejected three upbeat tracks as 'trying too hard'.", task: 'Write a prompt that nails a specific mood.', hints: ['Two mood words, precisely.', 'What pace matches confident-calm?'] },
  },
  l3: {
    student: { scenario: "Your cultural-fest intro needs a specific voice-and-instrument combination that says 'classical Indian', not a generic world-music pad.", task: 'Write a prompt naming voice and instruments.', hints: ['Which voice, which instruments?', 'Solo or ensemble?'] },
    everyday: { scenario: "You want a lullaby for your niece in a female voice with just one soft instrument — not a full produced track.", task: 'Write a prompt naming the voice and the single instrument.', hints: ['Whose voice, what character?', 'Which one instrument?'] },
    professional: { scenario: "The audiobook sample needs a specific narrator voice: male, warm, unhurried, trustworthy — casting it in words.", task: 'Write a prompt describing the voice precisely.', hints: ['Gender, age, texture, pace?', 'What feeling should it convey?'] },
  },
  l4: {
    student: { scenario: "Your two-minute submission needs an actual arrangement — intro, build, peak, resolve — not a flat loop that repeats for two minutes.", task: 'Write a prompt that specifies the structure.', hints: ['What are the sections in order?', 'Where does it peak?'] },
    everyday: { scenario: "The birthday song you're making just loops the same eight bars. You want it to go somewhere — a proper beginning and ending.", task: 'Write a prompt that gives the track a shape.', hints: ['How does it start and end?', 'Where does the energy lift?'] },
    professional: { scenario: "The 30-second ad needs a clear arc: quiet hook, rising middle, punchy button at the end, timed to the edit.", task: 'Write a prompt whose structure matches the edit.', hints: ['What happens in each stretch?', 'Where is the button?'] },
  },
  l5: {
    student: { scenario: "Your dance-team track must be exactly 120 bpm to match the choreography counts, in a bright major key. Vague tempo ruins the routine.", task: 'Write a prompt with tempo, key and length stated.', hints: ['Exact bpm?', 'Major or minor, and how long?'] },
    everyday: { scenario: "You want a two-minute meditation track, very slow, in a calm key, that loops without a jarring seam.", task: 'Write a prompt with the technical details.', hints: ['How slow in bpm?', 'What length, and loopable?'] },
    professional: { scenario: "The podcast intro must be 8 seconds, 100 bpm to match the host's cadence, and end cleanly on a beat.", task: 'Write a prompt with precise technical specs.', hints: ['Exact length and tempo?', 'How should it end?'] },
  },
  l6: {
    student: { scenario: "Your fest needs a qawwali-style piece, and every 'Indian music' attempt gives you a sitar-over-tabla cliché instead of the real genre.", task: 'Write a prompt that names the genre exactly.', hints: ['Which specific genre?', 'What instrumentation defines it?'] },
    everyday: { scenario: "You want a Sunday-morning track in the style of old Bollywood — a specific era and sound, instantly recognisable if named.", task: 'Write a prompt naming that genre and era.', hints: ['Which decade and style?', 'What production feel?'] },
    professional: { scenario: "The café wants a playlist track in 'lo-fi hip-hop' — precisely that genre, so it sits right with the others.", task: 'Write a prompt locking the genre.', hints: ['Name the genre and its markers.', 'Tempo and texture typical of it?'] },
  },
  l7: {
    student: { scenario: "The generated track is close — right mood, right instruments — but it's too fast and the ending stops dead.", task: 'Write a refinement prompt fixing only what is wrong.', hints: ['What stays?', 'Name each change.'] },
    everyday: { scenario: "Your montage music is lovely but the drums are too loud over the soft part and it needs to be a touch slower.", task: 'Write a refinement prompt naming keep-and-change.', hints: ['What worked?', 'Two specific changes?'] },
    professional: { scenario: "The client likes the track but wants it 'a bit warmer and less busy' — the arrangement is approved, only the mix and density change.", task: 'Write a refinement prompt from vague feedback.', hints: ['Translate "warmer" and "less busy".', 'What is untouched?'] },
  },
  l8: {
    student: { scenario: "The submission field caps prompts at ~45 tokens. Your track still needs instrument, mood, genre, tempo, key and structure.", task: 'Write the densest complete prompt in the budget.', hints: ['Fragments, no sentences.', 'Order: instrument, mood, genre, tempo, key, structure.'] },
    everyday: { scenario: "Slow connection, one attempt at a good study track — no room for a long prompt or a retry.", task: 'Write one dense, complete prompt in the budget.', hints: ['Every word changes the sound.', 'Cut politeness.'] },
    professional: { scenario: "Your shared prompt library caps entries so they stay reusable across briefs. The track must still be fully specified.", task: 'Write a complete dense prompt in the cap.', hints: ['Comma-separated fragments.', 'Keep only what changes the sound.'] },
  },
}