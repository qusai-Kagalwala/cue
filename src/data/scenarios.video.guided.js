// src/data/scenarios.video.guided.js
// v3-3c — VIDEO STAGE guided tier: 8 lessons × 3 personas. The skeleton
// carries video's structure (subject + action → shot → camera move →
// style → duration); the learner supplies the specifics. Designed so ANY
// sane fill produces a decent video prompt.
// AI-assisted drafting, hand-curated.

export const GUIDED_VIDEO = {
  l1: {
    student: {
      scenario: "Your club reel needs one clip of a robot in motion. 'A robot' gives you a lab humanoid — the action is what makes it yours.",
      task: 'Fill in the subject and exactly what it does.',
      skeleton: [
        { text: 'A ' }, { blank: 'the subject', hint: 'small line-following robot' },
        { text: ', ' }, { blank: 'colour/material', hint: 'black chassis, blue wheels' },
        { text: ', ' }, { blank: 'the action', hint: 'following a taped line, turning at a corner' },
        { text: ', close-up shot, smooth camera, 6 seconds.' },
      ],
    },
    everyday: {
      scenario: "A cooking reel needs the whistle moment — the steam and sound are the point, not the kitchen.",
      task: 'Fill in the subject and the action.',
      skeleton: [
        { text: 'A ' }, { blank: 'the subject', hint: 'steel pressure cooker' },
        { text: ' on a ' }, { blank: 'where it sits', hint: 'gas stove' },
        { text: ', ' }, { blank: 'the action', hint: 'whistling, steam bursting upward' },
        { text: ', close-up shot, static camera, 5 seconds.' },
      ],
    },
    professional: {
      scenario: "The product loop needs the specific gesture your app is known for, not generic scrolling.",
      task: 'Fill in who, what device, and which action.',
      skeleton: [
        { text: "A person's " }, { blank: 'whose hands', hint: 'hands with a silver ring' },
        { text: ' holding a ' }, { blank: 'device', hint: 'phone' },
        { text: ', ' }, { blank: 'the exact action', hint: 'swiping a card upward, tapping confirm' },
        { text: ', close-up shot, static camera, 5 seconds.' },
      ],
    },
  },

  l2: {
    student: {
      scenario: "Your documentary opens on the campus gate. The framing decides whether it feels grand or intimate.",
      task: 'Fill in the shot type.',
      skeleton: [
        { blank: 'shot type', hint: 'establishing shot, medium shot' },
        { text: ' of ' }, { blank: 'the subject', hint: 'the college gate at 7 AM' },
        { text: ', ' }, { blank: 'what else is in frame', hint: 'students walking in, a chai cart' },
        { text: ', static camera, documentary style, 8 seconds.' },
      ],
    },
    everyday: {
      scenario: "The birthday reel needs the hands-kneading-dough shot, framed the way you remember watching it.",
      task: 'Fill in how close the camera is.',
      skeleton: [
        { blank: 'shot type', hint: 'close-up shot' },
        { text: ' of ' }, { blank: 'the subject and action', hint: 'hands kneading dough' },
        { text: ', ' }, { blank: 'what fills the frame', hint: 'flour-dusted hands and steel bowl' },
        { text: ', slow dolly in, warm natural light, 6 seconds.' },
      ],
    },
    professional: {
      scenario: "The brand video needs a shot that establishes the workshop before any detail shots.",
      task: 'Fill in the establishing framing.',
      skeleton: [
        { blank: 'shot type', hint: 'wide establishing shot' },
        { text: ' of ' }, { blank: 'the place', hint: 'a small carpentry workshop' },
        { text: ', showing ' }, { blank: 'what must be visible', hint: 'benches, tools, one worker' },
        { text: ', static camera, documentary style, 8 seconds.' },
      ],
    },
  },

  l3: {
    student: {
      scenario: "The fest aftermovie needs energy — the camera itself has to move.",
      task: 'Fill in the camera movement.',
      skeleton: [
        { blank: 'shot type', hint: 'medium shot' },
        { text: ' of ' }, { blank: 'subject and action', hint: 'a crowd dancing under stage lights' },
        { text: ', camera ' }, { blank: 'the movement', hint: 'tracking alongside, pushing in' },
        { text: ', ' }, { blank: 'how fast', hint: 'fast and handheld' },
        { text: ', cinematic style, 6 seconds.' },
      ],
    },
    everyday: {
      scenario: "The terrace garden clip should drift, not sit still.",
      task: 'Fill in the move that creates calm.',
      skeleton: [
        { blank: 'shot type', hint: 'wide shot' },
        { text: ' of ' }, { blank: 'the subject', hint: 'potted plants on a terrace' },
        { text: ', camera ' }, { blank: 'the movement', hint: 'slowly panning left to right' },
        { text: ', ' }, { blank: 'pace', hint: 'very slow, steady' },
        { text: ', morning light, 10 seconds.' },
      ],
    },
    professional: {
      scenario: "The opening shot should reveal the product through movement, not a cut.",
      task: 'Fill in the revealing move.',
      skeleton: [
        { text: 'Camera ' }, { blank: 'the movement', hint: 'slowly orbiting, pushing in' },
        { text: ' around ' }, { blank: 'the subject', hint: 'a brass lamp on a dark table' },
        { text: ', starting ' }, { blank: 'starting position', hint: 'from behind, in shadow' },
        { text: ' and ending ' }, { blank: 'ending position', hint: 'facing the lit front' },
        { text: ', cinematic style, 8 seconds.' },
      ],
    },
  },

  l4: {
    student: {
      scenario: "Two shots — setup, then result — keep producing two different labs.",
      task: 'Fill in what must stay identical.',
      skeleton: [
        { text: 'Same ' }, { blank: 'what stays constant', hint: 'lab bench, same lighting' },
        { text: ' throughout: first ' }, { blank: 'shot 1', hint: 'close-up of the apparatus being set up' },
        { text: ', then cut to ' }, { blank: 'shot 2', hint: 'the same bench with the reaction glowing' },
        { text: ', documentary style, 10 seconds total.' },
      ],
    },
    everyday: {
      scenario: "Dough rising, then the same dough baking — the kitchen keeps changing between shots.",
      task: 'Fill in the constants and the transition.',
      skeleton: [
        { text: 'Same ' }, { blank: 'what stays the same', hint: 'kitchen, same bowl, same warm light' },
        { text: ': first ' }, { blank: 'shot 1', hint: 'close-up of dough rising in the bowl' },
        { text: ', then ' }, { blank: 'the transition', hint: 'cut to, dissolve to' },
        { text: ' ' }, { blank: 'shot 2', hint: 'the same dough baking in the oven' },
        { text: ', 8 seconds.' },
      ],
    },
    professional: {
      scenario: "Three beats — problem, action, result — must feel like one session at one desk.",
      task: 'Fill in the anchors that hold it together.',
      skeleton: [
        { text: 'Same ' }, { blank: 'the constants', hint: 'person, desk and lighting' },
        { text: ' throughout: ' }, { blank: 'beat 1', hint: 'frustrated look at a slow screen' },
        { text: ', then ' }, { blank: 'beat 2', hint: 'typing a command' },
        { text: ', then ' }, { blank: 'beat 3', hint: 'a satisfied nod at the result' },
        { text: ', medium shot, static camera, 9 seconds.' },
      ],
    },
  },

  l5: {
    student: {
      scenario: "Exactly 8 seconds — pacing decides whether the diagram is readable.",
      task: 'Fill in the duration and rhythm.',
      skeleton: [
        { text: 'A ' }, { blank: 'duration', hint: '8-second' },
        { text: ' clip of ' }, { blank: 'the subject and action', hint: 'a diagram assembling piece by piece' },
        { text: ', ' }, { blank: 'the pace', hint: 'slow and steady, one element per second' },
        { text: ', ' }, { blank: 'camera behaviour', hint: 'static camera' },
        { text: ', clean animated style.' },
      ],
    },
    everyday: {
      scenario: "Rain on the window, unhurried, and it should loop cleanly.",
      task: 'Fill in the timing and loop.',
      skeleton: [
        { text: 'A ' }, { blank: 'duration', hint: '10-second' },
        { text: ' ' }, { blank: 'loop or not', hint: 'seamless loop' },
        { text: ' of ' }, { blank: 'the subject', hint: 'monsoon rain running down a window' },
        { text: ', ' }, { blank: 'pace', hint: 'calm, unhurried' },
        { text: ', static camera, soft grey light.' },
      ],
    },
    professional: {
      scenario: "6-second ad slot, hard cap, product visible by second 3.",
      task: 'Fill in what happens when.',
      skeleton: [
        { text: 'A 6-second clip: first ' }, { blank: 'the first beat', hint: 'hands opening a package' },
        { text: ', then by 3 seconds ' }, { blank: 'the product moment', hint: 'the product held up to camera' },
        { text: ', ending on ' }, { blank: 'the final beat', hint: 'a smile, product in focus' },
        { text: ', ' }, { blank: 'pace', hint: 'quick cuts, energetic' },
        { text: ', commercial style.' },
      ],
    },
  },

  l6: {
    student: {
      scenario: "Your short film's look is grainy handheld 90s — every clip comes back glossy.",
      task: 'Fill in the visual style.',
      skeleton: [
        { blank: 'the style', hint: 'VHS home video, handheld documentary' },
        { text: ' footage of ' }, { blank: 'subject and action', hint: 'friends walking home at dusk' },
        { text: ', ' }, { blank: 'style artefacts', hint: 'film grain, slight colour bleed' },
        { text: ', ' }, { blank: 'light quality', hint: 'natural available light' },
        { text: ', medium shot, 8 seconds.' },
      ],
    },
    everyday: {
      scenario: "The trip memory should feel like old camcorder footage, not 4K travel content.",
      task: 'Fill in the recording style.',
      skeleton: [
        { blank: 'the style', hint: '90s camcorder footage' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a family walking on a beach' },
        { text: ', ' }, { blank: 'artefacts', hint: 'soft focus, date stamp, slight shake' },
        { text: ', ' }, { blank: 'colour', hint: 'warm faded tones' },
        { text: ', handheld, 8 seconds.' },
      ],
    },
    professional: {
      scenario: "'Documentary, not corporate' — natural light, no gloss.",
      task: 'Fill in the style and what it excludes.',
      skeleton: [
        { blank: 'the style', hint: 'handheld documentary' },
        { text: ' footage of ' }, { blank: 'the subject', hint: 'a weaver at a loom' },
        { text: ', ' }, { blank: 'light', hint: 'natural window light only' },
        { text: ', ' }, { blank: 'what to avoid', hint: 'no gloss, no colour grading' },
        { text: ', medium shot, 10 seconds.' },
      ],
    },
  },

  l7: {
    student: {
      scenario: "Right subject and framing — but the camera move is too fast and it ends abruptly.",
      task: 'Fill in what to keep and what to change.',
      skeleton: [
        { text: 'Same ' }, { blank: 'what to keep', hint: 'subject, framing and lighting' },
        { text: ', but ' }, { blank: 'change 1', hint: 'slow the camera move by half' },
        { text: ' and ' }, { blank: 'change 2', hint: 'hold the final frame for two seconds' },
        { text: ', everything else unchanged.' },
      ],
    },
    everyday: {
      scenario: "The festival clip is lovely but the light turned cold and there is a jump in the middle.",
      task: 'Fill in the preserve-and-fix instruction.',
      skeleton: [
        { text: 'Keep the ' }, { blank: 'what worked', hint: 'same scene, framing and camera move' },
        { text: ', but ' }, { blank: 'change 1', hint: 'warmer light' },
        { text: ' and ' }, { blank: 'change 2', hint: 'one continuous take, no cut' },
        { text: ', ' }, { blank: 'the ending', hint: 'hold the final frame for two seconds' },
        { text: ', same duration and style.' },
      ],
    },
    professional: {
      scenario: "'Rushed and a bit cheap' — the shot list is approved, only pace and finish change.",
      task: 'Fill in the concrete translation.',
      skeleton: [
        { text: 'Same ' }, { blank: 'what stays', hint: 'shots, framing and subject' },
        { text: ', but ' }, { blank: 'pace change', hint: 'slower camera moves, longer holds' },
        { text: ', ' }, { blank: 'finish change', hint: 'cinematic colour grade, warmer tone' },
        { text: ', and ' }, { blank: 'one more fix', hint: 'smoother transitions between shots' },
        { text: '.' },
      ],
    },
  },

  l8: {
    student: {
      scenario: "Roughly 45 tokens. Everything still has to be in there.",
      task: 'Fill in fragments only — no sentences.',
      skeleton: [
        { blank: 'subject + action', hint: 'robot arm assembling a part' },
        { text: ', ' }, { blank: 'shot', hint: 'close-up' },
        { text: ', ' }, { blank: 'camera move', hint: 'slow dolly in' },
        { text: ', ' }, { blank: 'style', hint: 'clean industrial, sharp focus' },
        { text: ', ' }, { blank: 'duration', hint: '6 seconds' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "One attempt at a festive street clip, slow connection, no second try.",
      task: 'Fill in the six essentials.',
      skeleton: [
        { blank: 'subject + action', hint: 'crowd walking past lit stalls' },
        { text: ', ' }, { blank: 'shot', hint: 'wide shot' },
        { text: ', ' }, { blank: 'camera move', hint: 'slow tracking' },
        { text: ', ' }, { blank: 'style', hint: 'documentary, warm night light' },
        { text: ', ' }, { blank: 'duration', hint: '8 seconds' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "Shared prompt library caps entries so they stay reusable.",
      task: 'Fill in dense fragments.',
      skeleton: [
        { blank: 'subject + action', hint: 'hands unboxing a product' },
        { text: ', ' }, { blank: 'shot', hint: 'overhead close-up' },
        { text: ', ' }, { blank: 'camera move', hint: 'static' },
        { text: ', ' }, { blank: 'style', hint: 'commercial, soft studio light' },
        { text: ', ' }, { blank: 'duration', hint: '5 seconds' },
        { text: '.' },
      ],
    },
  },
}