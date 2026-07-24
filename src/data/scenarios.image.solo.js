// src/data/scenarios.image.solo.js
// v3-2b — IMAGE STAGE solo scenarios: 8 lessons × 3 personas.
// The assessed tier — Gemini-evaluated, XP-awarded. Every scenario is a
// real reason someone opens an image generator, in Indian contexts.
// AI-assisted drafting, hand-curated (same pipeline as the text stage).

export const SOLO_IMAGE = {
  l1: {
    student: {
      scenario:
        "Your biology assignment needs a diagram-style illustration of a plant cell, and the AI keeps giving you generic green blobs. The subject has to be named properly before anything else can work.",
      task: 'Write an image prompt that names exactly what the illustration must show.',
      hints: ['What kind of cell, and which parts labelled?', 'What does it actually look like — shape, colour, structure?'],
    },
    everyday: {
      scenario:
        "You want a photo-style image of your society's Ganpati decoration for the building WhatsApp group cover. 'Ganpati decoration' gives you a stock temple. You need YOUR kind of scene named precisely.",
      task: 'Write a prompt that names the subject in enough detail to be recognisable.',
      hints: ['What is the idol like — size, colour, ornaments?', 'What surrounds it?'],
    },
    professional: {
      scenario:
        "Your startup's landing page needs a hero image of 'a delivery partner' — but the AI's version looks nothing like the real thing: wrong bike, wrong bag, wrong city.",
      task: 'Write a prompt that names the subject specifically enough to be right.',
      hints: ['What is the person wearing and carrying?', 'What vehicle, what condition?'],
    },
  },

  l2: {
    student: {
      scenario:
        "Your college fest poster needs a background image of the campus amphitheatre at night. The AI gave you a generic stage in a void — no campus, no night, no atmosphere.",
      task: 'Write a prompt that places the subject in a real, specific scene.',
      hints: ['Time of day, weather, lighting of the place?', 'What is visible behind and around?'],
    },
    everyday: {
      scenario:
        "You're making a birthday card for your father with an image of 'a man fishing'. What you actually picture is the backwater near his village at sunrise — the AI can't guess that.",
      task: 'Write a prompt that builds the scene you actually have in mind.',
      hints: ['Where exactly — water, trees, boats?', 'What time and what weather?'],
    },
    professional: {
      scenario:
        "A client needs a banner image showing 'a modern office'. The AI keeps producing glass towers in an American downtown. Your client's office is a converted bungalow in Pune with a courtyard.",
      task: 'Write a prompt whose scene matches the real place.',
      hints: ['What kind of building, what surroundings?', 'What light, what time?'],
    },
  },

  l3: {
    student: {
      scenario:
        "For your photography assignment you need a reference image of 'a cyclist'. Your brief says the framing must show effort — but the AI keeps producing a small figure in a wide landscape.",
      task: 'Write a prompt that controls how the shot is framed.',
      hints: ['How close, and from what angle?', 'What fills the frame?'],
    },
    everyday: {
      scenario:
        "You want a header image of your kitchen garden for a gardening group post. Wide shots make it look empty; you want the tomatoes to feel abundant and close.",
      task: 'Write a prompt that specifies the composition.',
      hints: ['Close-up or wide? From above or eye level?', 'What is in the foreground?'],
    },
    professional: {
      scenario:
        "The product page needs a shot of a handmade brass lamp. Marketing wants it to look premium — which is mostly a framing decision, not a subject one.",
      task: 'Write a prompt whose framing does the selling.',
      hints: ['What angle makes an object look premium?', 'How much negative space?'],
    },
  },

  l4: {
    student: {
      scenario:
        "Your design portfolio needs a moody image of a study desk at night. The AI's version is flat and evenly lit — it looks like a catalogue photo, not 2am.",
      task: 'Write a prompt using technical controls to get the mood.',
      hints: ['What light source, from where?', 'Depth of field, lens, detail level?'],
    },
    everyday: {
      scenario:
        "You want a print-worthy image of your daughter's rangoli for the family album. Phone-photo lighting flattens the colours; you want it to look properly photographed.",
      task: 'Write a prompt with the technical details that make it look shot, not generated.',
      hints: ['Overhead? What light? What aspect ratio for printing?', 'How much detail?'],
    },
    professional: {
      scenario:
        "The pitch deck's cover needs a wide banner image, 16:9, of a team in discussion — soft, warm, professional, with the background falling away.",
      task: 'Write a prompt that specifies every technical requirement.',
      hints: ['Aspect ratio, lens, depth of field?', 'Lighting quality and direction?'],
    },
  },

  l5: {
    student: {
      scenario:
        "Your history project needs illustrations that all look like they belong together — you found one style you like (old inked map illustrations) and need five more images matching it.",
      task: 'Write a prompt that references the style instead of describing it.',
      hints: ['What medium and era is that look?', 'What visual traits define it?'],
    },
    everyday: {
      scenario:
        "You're making invitations for your parents' anniversary and want them to look like the hand-painted wedding cards from the 1970s — you can picture it but can't describe it.",
      task: 'Write a prompt that names that style precisely enough to reproduce it.',
      hints: ['What medium — painted, printed, screen-printed?', 'What palette and era?'],
    },
    professional: {
      scenario:
        "The brand guide says all illustrations must be 'flat vector, two-tone, no gradients'. The AI keeps giving you glossy 3D renders instead.",
      task: 'Write a prompt that locks the style to the brand.',
      hints: ['Name the medium and the constraints of it.', 'What must be absent?'],
    },
  },

  l6: {
    student: {
      scenario:
        "Your presentation on climate change needs a striking cover image. A photorealistic photo feels like stock; a painted, dramatic look would land harder — but you must choose and commit.",
      task: 'Write a prompt that decides the art style before anything else.',
      hints: ['Photo, painting, render, or illustration?', 'What does that style do for the message?'],
    },
    everyday: {
      scenario:
        "You want a picture of your childhood home to frame as a gift. A photo-real render feels cold; something painterly would carry the memory better.",
      task: 'Write a prompt that commits to an art style that fits the feeling.',
      hints: ['What medium suits nostalgia?', 'How loose or precise should it be?'],
    },
    professional: {
      scenario:
        "The app's empty-state illustrations need one consistent art style across twelve screens. Whatever you choose now, everything else must match.",
      task: 'Write a prompt that establishes the art style as the anchor.',
      hints: ['What style scales across many simple images?', 'What makes it repeatable?'],
    },
  },

  l7: {
    student: {
      scenario:
        "The AI gave you a good poster image — right subject, right mood — but the crop cuts off the title area and the colours are too cold for the fest branding.",
      task: 'Write a follow-up prompt that fixes only what is wrong.',
      hints: ['What must stay exactly as it is?', 'Name each change specifically.'],
    },
    everyday: {
      scenario:
        "The festive greeting image is almost right — the diyas look lovely — but there are odd extra hands in the corner and the text it invented is gibberish.",
      task: 'Write a refinement prompt that keeps the good and removes the wrong.',
      hints: ['What to preserve?', 'What to exclude explicitly?'],
    },
    professional: {
      scenario:
        "The client liked the product shot but wants it 'a bit more premium' — in practice: tighter crop, darker background, warmer highlight on the metal.",
      task: 'Write a precise refinement prompt from that vague feedback.',
      hints: ['Translate "premium" into concrete changes.', 'What stays untouched?'],
    },
  },

  l8: {
    student: {
      scenario:
        "Your assignment portal accepts a short prompt field only — about 45 tokens. You need a complete image spec for a solar system diagram in that space.",
      task: 'Write the densest complete prompt you can within the budget.',
      hints: ['Drop every polite word.', 'Order: subject, scene, style, technical.'],
    },
    everyday: {
      scenario:
        "You're on a slow connection and want one good image of a festive dinner table on the first try — no room for a long back-and-forth or a rambling prompt.",
      task: 'Write one tight, complete prompt within the budget.',
      hints: ['Every word must add a visual.', 'Cut articles and pleasantries.'],
    },
    professional: {
      scenario:
        "Your team's asset pipeline caps prompts at roughly 45 tokens so they stay reusable across briefs. The image still has to be fully specified.",
      task: 'Write a complete, dense prompt inside the cap.',
      hints: ['Comma-separated fragments beat sentences.', 'Keep only what changes the image.'],
    },
  },
}