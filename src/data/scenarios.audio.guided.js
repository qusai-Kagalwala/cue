// src/data/scenarios.audio.guided.js
// v3-4c — AUDIO STAGE guided tier: 8×3. Skeleton carries audio structure
// (instrument/voice → mood → genre → tempo/key → structure). Any sane
// fill yields a decent prompt. AI-assisted, hand-curated.

export const GUIDED_AUDIO = {
  l1: {
    student: { scenario: "Your film theme needs a named lead sound, not 'background music'.", task: 'Fill in the sound and its quality.',
      skeleton: [{text:'A '},{blank:'the lead sound',hint:'solo cello'},{text:', '},{blank:'quality',hint:'warm and mournful'},{text:', '},{blank:'how it is played',hint:'slow, sustained bowing'},{text:', close and intimate, gentle mood.'}] },
    everyday: { scenario: "A tune for a family montage — name what you actually hear.", task: 'Fill in the instrument and character.',
      skeleton: [{text:'A '},{blank:'the instrument',hint:'acoustic guitar'},{text:', '},{blank:'quality',hint:'soft and warm'},{text:', '},{blank:'playing style',hint:'gently fingerpicked'},{text:', calm and homely feel.'}] },
    professional: { scenario: "Your podcast needs a short signature sting — a named sound, not a random chime.", task: 'Fill in the exact sound.',
      skeleton: [{text:'A short signature sting: '},{blank:'the lead sound',hint:'warm electric piano chord'},{text:', '},{blank:'quality',hint:'bright and resonant'},{text:', '},{blank:'mood',hint:'confident and welcoming'},{text:', '},{blank:'a second layer',hint:'soft synth swell underneath'},{text:', '},{blank:'length',hint:'about three seconds'},{text:'.'}] },
  },
  l2: {
    student: { scenario: "The doc opening must feel like quiet dread.", task: 'Fill in the mood and what carries it.',
      skeleton: [{blank:'the mood',hint:'tense and uneasy'},{text:' '},{blank:'the sound',hint:'low drone and sparse piano'},{text:', '},{blank:'pace',hint:'very slow'},{text:', '},{blank:'dynamics',hint:'quiet, building slightly'},{text:'.'}] },
    everyday: { scenario: "The anniversary track should feel tender and nostalgic.", task: 'Fill in the feeling.',
      skeleton: [{blank:'the mood',hint:'tender and nostalgic'},{text:' '},{blank:'the sound',hint:'soft piano and strings'},{text:', '},{blank:'pace',hint:'slow and gentle'},{text:', warm and reflective.'}] },
    professional: { scenario: "'Confident but calm' — two moods at once.", task: 'Fill in the precise mood.',
      skeleton: [{blank:'the mood',hint:'confident yet calm'},{text:' '},{blank:'the sound',hint:'steady piano and soft pads'},{text:', '},{blank:'tempo feel',hint:'unhurried, steady pulse'},{text:', '},{blank:'dynamics',hint:'even, understated'},{text:'.'}] },
  },
  l3: {
    student: { scenario: "The fest intro needs a specific classical-Indian voice-and-instrument set.", task: 'Fill in voice and instruments.',
      skeleton: [{blank:'the voice',hint:'a female classical voice'},{text:' with '},{blank:'instruments',hint:'sitar and tabla'},{text:', '},{blank:'mood',hint:'graceful, meditative'},{text:', '},{blank:'texture',hint:'sparse, spacious'},{text:'.'}] },
    everyday: { scenario: "A lullaby — one voice, one soft instrument.", task: 'Fill in the voice and instrument.',
      skeleton: [{text:'A '},{blank:'the voice',hint:'gentle female voice'},{text:' with '},{blank:'one instrument',hint:'soft music box'},{text:', '},{blank:'mood',hint:'soothing, sleepy'},{text:', '},{blank:'pace',hint:'very slow'},{text:'.'}] },
    professional: { scenario: "Cast the audiobook narrator in words.", task: 'Fill in the voice qualities.',
      skeleton: [{text:'A '},{blank:'gender and age',hint:'middle-aged male'},{text:' voice, '},{blank:'texture',hint:'warm and slightly gravelly'},{text:', '},{blank:'pace',hint:'unhurried'},{text:', '},{blank:'feeling',hint:'trustworthy, calm'},{text:', spoken clearly.'}] },
  },
  l4: {
    student: { scenario: "Two-minute piece needs a real arrangement, not a loop.", task: 'Fill in the sections in order.',
      skeleton: [{blank:'genre/sound',hint:'ambient electronic'},{text:' with: '},{blank:'intro',hint:'soft pad intro'},{text:', then '},{blank:'build',hint:'a rising build with drums'},{text:', then '},{blank:'peak',hint:'a full bright peak'},{text:', then '},{blank:'ending',hint:'a slow fade out'},{text:'.'}] },
    everyday: { scenario: "The birthday song just loops — give it a shape.", task: 'Fill in beginning to end.',
      skeleton: [{text:'A cheerful song: '},{blank:'intro',hint:'gentle intro'},{text:', '},{blank:'middle',hint:'a lively verse and chorus'},{text:', '},{blank:'lift',hint:'a big final chorus'},{text:', '},{blank:'ending',hint:'a clean finish'},{text:'.'}] },
    professional: { scenario: "30-second ad needs a clear arc timed to the edit.", task: 'Fill in the arc.',
      skeleton: [{text:'A 30-second track: '},{blank:'hook',hint:'quiet hook'},{text:', '},{blank:'rise',hint:'rising middle'},{text:', '},{blank:'button',hint:'punchy end button'},{text:', '},{blank:'genre',hint:'upbeat corporate pop'},{text:'.'}] },
  },
  l5: {
    student: { scenario: "Dance track — exact bpm matters to the counts.", task: 'Fill in the numbers.',
      skeleton: [{blank:'genre/sound',hint:'energetic electronic'},{text:', '},{blank:'tempo',hint:'120 bpm'},{text:', in '},{blank:'key',hint:'a bright major key'},{text:', '},{blank:'length',hint:'90 seconds'},{text:', punchy.'}] },
    everyday: { scenario: "Meditation track — very slow, loopable.", task: 'Fill in the technical details.',
      skeleton: [{blank:'sound',hint:'soft ambient pads'},{text:', '},{blank:'tempo',hint:'very slow, 55 bpm'},{text:', '},{blank:'key/feel',hint:'calm, in a minor key'},{text:', '},{blank:'length and loop',hint:'2-minute seamless loop'},{text:'.'}] },
    professional: { scenario: "Podcast intro — 8 seconds, matched to cadence.", task: 'Fill in the specs.',
      skeleton: [{blank:'sound',hint:'warm synth and light drums'},{text:', '},{blank:'tempo',hint:'100 bpm'},{text:', '},{blank:'length',hint:'exactly 8 seconds'},{text:', '},{blank:'ending',hint:'ends cleanly on a beat'},{text:'.'}] },
  },
  l6: {
    student: { scenario: "Fest needs real qawwali, not a cliché.", task: 'Fill in the genre and its markers.',
      skeleton: [{text:'A '},{blank:'the genre',hint:'traditional qawwali'},{text:' with '},{blank:'instruments',hint:'harmonium, tabla, handclaps'},{text:', '},{blank:'vocals',hint:'lead and chorus call-and-response'},{text:', '},{blank:'mood',hint:'devotional, building intensity'},{text:'.'}] },
    everyday: { scenario: "Old-Bollywood Sunday-morning track.", task: 'Fill in the genre and era.',
      skeleton: [{blank:'the genre and era',hint:'1970s Bollywood'},{text:' style, '},{blank:'instruments',hint:'strings and gentle percussion'},{text:', '},{blank:'mood',hint:'warm and romantic'},{text:', '},{blank:'production',hint:'vintage analog feel'},{text:'.'}] },
    professional: { scenario: "Café playlist — precisely lo-fi hip-hop.", task: 'Fill in the genre and markers.',
      skeleton: [{text:'A '},{blank:'the genre',hint:'lo-fi hip-hop'},{text:' track, '},{blank:'instruments',hint:'jazzy keys, soft drums'},{text:', '},{blank:'tempo',hint:'around 75 bpm'},{text:', '},{blank:'texture',hint:'warm vinyl crackle'},{text:'.'}] },
  },
  l7: {
    student: { scenario: "Right mood and instruments — but too fast, ends dead.", task: 'Fill in keep and change.',
      skeleton: [{text:'Same '},{blank:'what to keep',hint:'melody, mood and instruments'},{text:', but '},{blank:'change 1',hint:'slow it by 10 bpm'},{text:' and '},{blank:'change 2',hint:'a gentle fade-out ending'},{text:', everything else unchanged.'}] },
    everyday: { scenario: "Lovely track but drums too loud, needs slightly slower.", task: 'Fill in the fixes.',
      skeleton: [{text:'Keep the '},{blank:'what worked',hint:'same melody and instruments'},{text:', but '},{blank:'change 1',hint:'lower the drums in the soft part'},{text:' and '},{blank:'change 2',hint:'slow it a touch'},{text:', same length.'}] },
    professional: { scenario: "'Warmer and less busy' — mix and density only.", task: 'Fill in the translation.',
      skeleton: [{text:'Same '},{blank:'what stays',hint:'arrangement and structure'},{text:', but '},{blank:'warmth',hint:'warmer, rounder mix'},{text:' and '},{blank:'less busy',hint:'thin out the background layers'},{text:', keep '},{blank:'what to keep',hint:'the lead melody'},{text:'.'}] },
  },
  l8: {
    student: { scenario: "~45 tokens. Everything still in there.", task: 'Fill in fragments only.',
      skeleton: [{blank:'instrument/sound',hint:'piano and strings'},{text:', '},{blank:'mood',hint:'hopeful'},{text:', '},{blank:'genre',hint:'cinematic score'},{text:', '},{blank:'tempo/key',hint:'80 bpm, D major'},{text:', '},{blank:'structure',hint:'build to a peak'},{text:'.'}] },
    everyday: { scenario: "One attempt at a study track.", task: 'Fill in the essentials.',
      skeleton: [{blank:'sound',hint:'soft piano and beats'},{text:', '},{blank:'mood',hint:'calm, focused'},{text:', '},{blank:'genre',hint:'lo-fi'},{text:', '},{blank:'tempo',hint:'70 bpm'},{text:', '},{blank:'loop',hint:'seamless loop'},{text:'.'}] },
    professional: { scenario: "Shared library entry, capped.", task: 'Fill in dense fragments.',
      skeleton: [{blank:'sound',hint:'acoustic guitar'},{text:', '},{blank:'mood',hint:'warm, uplifting'},{text:', '},{blank:'genre',hint:'folk-pop'},{text:', '},{blank:'tempo/key',hint:'100 bpm, G major'},{text:', '},{blank:'structure',hint:'verse-chorus'},{text:'.'}] },
  },
}