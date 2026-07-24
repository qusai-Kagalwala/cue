// src/data/scenarios.image.guided.js
// v3-2c — IMAGE STAGE guided tier: 8 lessons × 3 personas. The skeleton
// carries the prompt's structure (subject, scene, style, technical) and
// the learner supplies the specifics. Designed so ANY sane fill produces
// a decent image prompt — nearly impossible to fail, by construction.
// AI-assisted drafting, hand-curated.

export const GUIDED_IMAGE = {
  l1: {
    student: {
      scenario: "Your notes need one clear illustration of a lab apparatus. 'Beaker' alone gives you a random glass — the subject has to be pinned down.",
      task: 'Fill in exactly what the illustration must show.',
      skeleton: [
        { text: 'A detailed illustration of a ' }, { blank: 'the object', hint: 'e.g. glass beaker' },
        { text: ' made of ' }, { blank: 'material', hint: 'glass, brass, plastic' },
        { text: ', ' }, { blank: 'colour', hint: 'clear, blue, copper' },
        { text: ', ' }, { blank: 'what it is doing/showing', hint: 'half-filled with blue liquid' },
        { text: ', clean white background, sharp focus.' },
      ],
    },
    everyday: {
      scenario: "You want an image of a sweet dish for the family recipe group. 'Indian sweet' could be anything — name the one you mean.",
      task: 'Fill in the exact dish and how it looks.',
      skeleton: [
        { text: 'A close-up photo of ' }, { blank: 'the dish', hint: 'gulab jamun, modak…' },
        { text: ', ' }, { blank: 'colour and texture', hint: 'golden brown, syrupy' },
        { text: ', served on a ' }, { blank: 'what it sits on', hint: 'brass plate, banana leaf' },
        { text: ', garnished with ' }, { blank: 'garnish', hint: 'pistachios, silver leaf' },
        { text: ', natural light, appetising.' },
      ],
    },
    professional: {
      scenario: "The website needs an image of your product. 'A bag' returns a stock handbag — nothing like the one you sell.",
      task: 'Fill in what the product actually is.',
      skeleton: [
        { text: 'Product photo of a ' }, { blank: 'the product', hint: 'canvas messenger bag' },
        { text: ' in ' }, { blank: 'colour', hint: 'olive green' },
        { text: ', made of ' }, { blank: 'material', hint: 'waxed canvas and leather' },
        { text: ', ' }, { blank: 'one distinctive detail', hint: 'brass buckles, hand-stitched seam' },
        { text: ', plain background, studio lighting.' },
      ],
    },
  },

  l2: {
    student: {
      scenario: "Your travel-writing blog needs a header image of a hill station. Without a scene, you get a generic mountain.",
      task: 'Fill in where and when this is.',
      skeleton: [
        { text: 'A photo of ' }, { blank: 'the subject', hint: 'a winding hill road' },
        { text: ' in ' }, { blank: 'the place', hint: 'Lonavala, Munnar…' },
        { text: ', ' }, { blank: 'time of day', hint: 'early morning' },
        { text: ', ' }, { blank: 'weather', hint: 'light mist after rain' },
        { text: ', ' }, { blank: 'what surrounds it', hint: 'tea slopes, pine trees' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "A picture of your morning walk spot for the neighbourhood group — the AI needs the scene, not just the path.",
      task: 'Fill in the setting around the subject.',
      skeleton: [
        { text: 'A photo of ' }, { blank: 'the subject', hint: 'a walking path' },
        { text: ' at ' }, { blank: 'time', hint: 'sunrise, evening' },
        { text: ', ' }, { blank: 'weather/season', hint: 'monsoon drizzle, winter fog' },
        { text: ', with ' }, { blank: 'what is around', hint: 'old banyan trees, a lake' },
        { text: ' in the background, soft natural light.' },
      ],
    },
    professional: {
      scenario: "The recruitment post needs a workplace image that matches your actual office, not a glass tower.",
      task: 'Fill in the real setting.',
      skeleton: [
        { text: 'A photo of ' }, { blank: 'the subject', hint: 'a small team working' },
        { text: ' inside a ' }, { blank: 'the kind of space', hint: 'converted bungalow office' },
        { text: ', ' }, { blank: 'time of day', hint: 'mid-morning' },
        { text: ', ' }, { blank: 'light source', hint: 'sunlight through large windows' },
        { text: ', ' }, { blank: 'one detail of the place', hint: 'plants on the sill, exposed brick' },
        { text: '.' },
      ],
    },
  },

  l3: {
    student: {
      scenario: "Your photography assignment needs a specific framing, not a random one.",
      task: 'Fill in the shot you want.',
      skeleton: [
        { blank: 'shot type', hint: 'close-up, wide shot' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a street violinist' },
        { text: ', shot from ' }, { blank: 'angle', hint: 'low angle, eye level' },
        { text: ', with ' }, { blank: 'what fills the frame', hint: 'hands and instrument' },
        { text: ' in the foreground, background softly blurred.' },
      ],
    },
    everyday: {
      scenario: "The garden photo needs to feel abundant — that is a framing decision.",
      task: 'Fill in how it should be framed.',
      skeleton: [
        { blank: 'shot type', hint: 'close-up, overhead' },
        { text: ' of ' }, { blank: 'the subject', hint: 'ripe tomatoes on the vine' },
        { text: ', viewed from ' }, { blank: 'angle', hint: 'above, slightly to the side' },
        { text: ', ' }, { blank: 'what dominates the frame', hint: 'clusters filling most of it' },
        { text: ', shallow depth of field.' },
      ],
    },
    professional: {
      scenario: "The product must look premium — mostly a matter of angle and space.",
      task: 'Fill in the composition that sells it.',
      skeleton: [
        { blank: 'shot type', hint: 'three-quarter view, close-up' },
        { text: ' of ' }, { blank: 'the product', hint: 'a brass table lamp' },
        { text: ', ' }, { blank: 'angle', hint: 'slightly low angle' },
        { text: ', centred with ' }, { blank: 'how much empty space', hint: 'generous negative space' },
        { text: ' around it, dark background.' },
      ],
    },
  },

  l4: {
    student: {
      scenario: "Your desk-at-night image looks flat. Technical controls fix that.",
      task: 'Fill in the light and lens.',
      skeleton: [
        { text: 'A photo of ' }, { blank: 'the subject', hint: 'a study desk at night' },
        { text: ', lit by ' }, { blank: 'light source', hint: 'a single warm desk lamp' },
        { text: ', ' }, { blank: 'lighting quality', hint: 'soft shadows, moody' },
        { text: ', ' }, { blank: 'lens/DoF', hint: '50mm, shallow depth of field' },
        { text: ', highly detailed.' },
      ],
    },
    everyday: {
      scenario: "The rangoli photo should look properly shot, and printable.",
      task: 'Fill in the technical requirements.',
      skeleton: [
        { blank: 'angle', hint: 'overhead top-down' },
        { text: ' photo of ' }, { blank: 'the subject', hint: 'a coloured rangoli' },
        { text: ', ' }, { blank: 'lighting', hint: 'warm diya glow, golden hour' },
        { text: ', ' }, { blank: 'aspect ratio', hint: '1:1, 4:5' },
        { text: ' aspect ratio, ' }, { blank: 'detail level', hint: 'highly detailed, 4k' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "The deck cover needs a wide banner with the background falling away.",
      task: 'Fill in every technical spec.',
      skeleton: [
        { text: 'A photo of ' }, { blank: 'the subject', hint: 'a team in discussion' },
        { text: ', ' }, { blank: 'lighting', hint: 'soft window light' },
        { text: ', ' }, { blank: 'lens', hint: '85mm' },
        { text: ' lens, shallow depth of field, ' }, { blank: 'aspect ratio', hint: '16:9' },
        { text: ' aspect ratio, professional, sharp focus.' },
      ],
    },
  },

  l5: {
    student: {
      scenario: "Your project images must all share one look — reference the style instead of describing it.",
      task: 'Fill in the style you are pointing at.',
      skeleton: [
        { blank: 'medium', hint: 'ink drawing, watercolour' },
        { text: ' of ' }, { blank: 'the subject', hint: 'an old trade route map' },
        { text: ', in the style of ' }, { blank: 'era or tradition', hint: 'vintage cartography' },
        { text: ', ' }, { blank: 'palette', hint: 'sepia and faded blue' },
        { text: ', ' }, { blank: 'one style trait', hint: 'hand-lettered labels' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "The invitations should look like the hand-painted cards you remember.",
      task: 'Fill in the style reference.',
      skeleton: [
        { blank: 'medium', hint: 'hand-painted illustration' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a floral border and two peacocks' },
        { text: ', ' }, { blank: 'era/style', hint: '1970s Indian wedding card' },
        { text: ' style, ' }, { blank: 'palette', hint: 'gold, deep red, cream' },
        { text: ', ' }, { blank: 'texture', hint: 'slightly faded paper' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "Brand rules: flat vector, two-tone, no gradients. Say so.",
      task: 'Fill in the style and its limits.',
      skeleton: [
        { text: 'Flat ' }, { blank: 'medium', hint: 'vector illustration' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a person receiving a parcel' },
        { text: ', ' }, { blank: 'palette limit', hint: 'two-tone navy and cream' },
        { text: ', ' }, { blank: 'what to avoid', hint: 'no gradients, no shadows' },
        { text: ', clean geometric shapes.' },
      ],
    },
  },

  l6: {
    student: {
      scenario: "Your cover image needs a decision: photo or painting?",
      task: 'Fill in the art style first.',
      skeleton: [
        { blank: 'art style', hint: 'digital painting, photorealistic render' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a flooded coastal city' },
        { text: ', ' }, { blank: 'mood', hint: 'dramatic, hopeful' },
        { text: ', ' }, { blank: 'a style trait', hint: 'painterly clouds, visible brushwork' },
        { text: ', high detail.' },
      ],
    },
    everyday: {
      scenario: "A picture of your childhood home, as a gift — the medium carries the feeling.",
      task: 'Fill in the art style that fits.',
      skeleton: [
        { blank: 'art style', hint: 'soft watercolour painting' },
        { text: ' of ' }, { blank: 'the subject', hint: 'a small blue house with a courtyard' },
        { text: ', ' }, { blank: 'mood', hint: 'nostalgic, warm' },
        { text: ', ' }, { blank: 'palette', hint: 'muted pastels' },
        { text: ', ' }, { blank: 'a style trait', hint: 'loose edges, paper texture' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "Twelve app illustrations must share one repeatable style.",
      task: 'Fill in the anchor style.',
      skeleton: [
        { blank: 'art style', hint: 'flat isometric illustration' },
        { text: ' of ' }, { blank: 'the subject', hint: 'an empty inbox' },
        { text: ', ' }, { blank: 'palette', hint: 'three brand colours' },
        { text: ', ' }, { blank: 'line/shape treatment', hint: 'rounded shapes, thin outlines' },
        { text: ', simple, consistent, white background.' },
      ],
    },
  },

  l7: {
    student: {
      scenario: "The poster image is close — the crop and the colour temperature are off.",
      task: 'Fill in what stays and what changes.',
      skeleton: [
        { text: 'Same ' }, { blank: 'what to keep', hint: 'subject, scene and lighting' },
        { text: ', but ' }, { blank: 'change 1', hint: 'wider crop with space at the top' },
        { text: ' and ' }, { blank: 'change 2', hint: 'warmer colour tones' },
        { text: ', ' }, { blank: 'what to exclude', hint: 'no text in the image' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "The festive image has odd extra hands and invented text.",
      task: 'Fill in the fix without losing the good parts.',
      skeleton: [
        { text: 'Keep the ' }, { blank: 'what worked', hint: 'diyas and warm glow' },
        { text: ', but ' }, { blank: 'the fix', hint: 'show only two hands, correct anatomy' },
        { text: ', ' }, { blank: 'what to remove', hint: 'no text, no watermark' },
        { text: ', ' }, { blank: 'one refinement', hint: 'slightly tighter crop' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "'A bit more premium' has to become concrete changes.",
      task: 'Fill in the specific edits.',
      skeleton: [
        { text: 'Same product and angle, but ' },
        { blank: 'change 1', hint: 'tighter crop' },
        { text: ', ' }, { blank: 'change 2', hint: 'darker background' },
        { text: ', ' }, { blank: 'change 3', hint: 'warm highlight along the metal edge' },
        { text: ', keep ' }, { blank: 'what stays', hint: 'the same lighting direction' },
        { text: '.' },
      ],
    },
  },

  l8: {
    student: {
      scenario: "A short prompt field — about 45 tokens. Pack it.",
      task: 'Fill in only what changes the image.',
      skeleton: [
        { blank: 'subject', hint: 'solar system diagram' },
        { text: ', ' }, { blank: 'scene/background', hint: 'black space background' },
        { text: ', ' }, { blank: 'style', hint: 'clean vector infographic' },
        { text: ', ' }, { blank: 'technical', hint: 'labelled, 16:9, high detail' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "One tight prompt, one good image, first try.",
      task: 'Fill in the four essentials only.',
      skeleton: [
        { blank: 'subject', hint: 'festive dinner table' },
        { text: ', ' }, { blank: 'scene', hint: 'evening, candlelit home' },
        { text: ', ' }, { blank: 'style', hint: 'warm food photography' },
        { text: ', ' }, { blank: 'technical', hint: 'overhead, shallow depth of field' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "Asset pipeline caps prompts at ~45 tokens; the spec must still be complete.",
      task: 'Fill in dense, comma-separated fragments.',
      skeleton: [
        { blank: 'subject', hint: 'hands exchanging a parcel' },
        { text: ', ' }, { blank: 'scene', hint: 'doorway, daylight' },
        { text: ', ' }, { blank: 'style', hint: 'flat vector, two-tone' },
        { text: ', ' }, { blank: 'technical', hint: '1:1, no gradients' },
        { text: '.' },
      ],
    },
  },
}