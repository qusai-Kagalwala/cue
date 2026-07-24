// src/data/scenarios.image.assisted.js
// v3-2c — IMAGE STAGE assisted tier: 8 lessons × 3 personas. Free
// textarea + the live checklist (labels renamed per stage in v3-1b).
// Medium difficulty: one real wrinkle each, still narrower than solo.
// AI-assisted drafting, hand-curated.

export const ASSISTED_IMAGE = {
  l1: {
    student: {
      scenario: "Your zoology submission needs an illustration of a specific bird — the Indian roller — and every generic 'blue bird' image is wrong in the details your examiner will check: wing bands, beak shape, posture.",
      task: 'Write an image prompt precise enough that an examiner would accept the species.',
    },
    everyday: {
      scenario: "You want an image of your grandmother's sewing machine — the old black hand-crank kind with gold lettering — for a memory album. Modern machines keep showing up instead.",
      task: 'Write a prompt that names the object so precisely the wrong era becomes impossible.',
    },
    professional: {
      scenario: "The catalogue needs a hero shot of a specific handloom saree: the weave, the border, the pallu pattern all matter to buyers who know the craft.",
      task: 'Write a prompt naming the product in the detail a buyer would recognise.',
    },
  },

  l2: {
    student: {
      scenario: "Your geography presentation needs one image that shows monsoon arriving over the Western Ghats — the drama is entirely in the weather and time of day, not the landform.",
      task: 'Write a prompt where the scene does the storytelling.',
    },
    everyday: {
      scenario: "You want an image of a wedding baraat as you remember it: narrow lane, evening, band lights, dust in the air. Daylight stock-photo processions miss all of it.",
      task: 'Write a prompt that reconstructs that specific scene.',
    },
    professional: {
      scenario: "A travel client wants a hero image of their homestay — a hill cottage in winter, wood smoke, low sun. The building alone means nothing without the setting.",
      task: 'Write a prompt where setting, season, and light carry the sell.',
    },
  },

  l3: {
    student: {
      scenario: "For your design brief the same subject must be shot two ways: one that isolates it, one that shows its context. This attempt is the isolating one — everything hinges on framing.",
      task: 'Write a prompt whose framing isolates the subject deliberately.',
    },
    everyday: {
      scenario: "You are making a poster of your father's workshop. What matters is the hands and the tool, not the room — but every attempt puts the whole room in.",
      task: 'Write a prompt that forces the frame onto what matters.',
    },
    professional: {
      scenario: "The banner is 3:1 and mostly text space — the image must sit to one side with the subject small and off-centre, not filling the frame.",
      task: 'Write a prompt whose composition leaves room for the text.',
    },
  },

  l4: {
    student: {
      scenario: "Your architecture submission needs an interior render where the light is the point: late afternoon sun cutting across a concrete wall, everything else subdued.",
      task: 'Write a prompt where the technical controls create the effect.',
    },
    everyday: {
      scenario: "The family portrait you want should look like an actual studio photograph — soft, flattering, background falling away — not a flat phone snap.",
      task: 'Write a prompt with the technical specs that make it look studio-shot.',
    },
    professional: {
      scenario: "The jewellery shot must show fine engraving: macro detail, controlled reflections on metal, dark backdrop, printable resolution.",
      task: 'Write a prompt with every technical requirement the product demands.',
    },
  },

  l5: {
    student: {
      scenario: "Your comic assignment must match a reference panel you love — heavy black ink, halftone dots, limited colour. Describing it in adjectives keeps failing.",
      task: 'Write a prompt that references the style rather than describing it.',
    },
    everyday: {
      scenario: "You want festival greetings that look like the printed calendars from your childhood — a specific era and printing process, instantly recognisable if named.",
      task: 'Write a prompt that names that visual tradition.',
    },
    professional: {
      scenario: "A pitch needs three images in the same illustration style so they read as a set — the style reference has to be tight enough to repeat.",
      task: 'Write a prompt whose style reference is repeatable across images.',
    },
  },

  l6: {
    student: {
      scenario: "Your poster's message is serious, and the art style will decide whether it lands or looks like clip art. Photo-real, painterly, and graphic all say different things.",
      task: 'Write a prompt that commits to an art style suited to the message.',
    },
    everyday: {
      scenario: "You are printing an image for the living room wall. It has to feel like art, not like a screenshot — the medium choice is the whole decision.",
      task: 'Write a prompt that commits to a medium worth framing.',
    },
    professional: {
      scenario: "The brand is moving away from photography to illustration. This first image sets the house style everything else will copy.",
      task: 'Write a prompt that establishes a house style deliberately.',
    },
  },

  l7: {
    student: {
      scenario: "The generated diagram is accurate but cluttered and the labels are unreadable. The structure is right; the presentation needs surgery.",
      task: 'Write a refinement prompt that keeps the accuracy and fixes the clutter.',
    },
    everyday: {
      scenario: "The portrait of your dog is lovely except the background is a chaotic garden and the tail is cut off at the edge.",
      task: 'Write a refinement prompt naming what to preserve and what to change.',
    },
    professional: {
      scenario: "The client says the image feels 'too cold and corporate'. The composition is approved; only the mood must change.",
      task: 'Write a refinement prompt turning that feedback into concrete visual changes.',
    },
  },

  l8: {
    student: {
      scenario: "Submission portal, one short prompt field, one attempt: a labelled cross-section diagram that must be complete and readable.",
      task: 'Write the densest complete prompt that fits the budget.',
    },
    everyday: {
      scenario: "Poor connection, one shot at a good festive greeting image. No room for a second try or a wasted word.",
      task: 'Write one dense, complete prompt within the budget.',
    },
    professional: {
      scenario: "Prompts in the shared asset library are capped so they stay reusable — yours must specify subject, scene, style, and technical inside the cap.",
      task: 'Write a complete prompt in comma-separated fragments within the budget.',
    },
  },
}