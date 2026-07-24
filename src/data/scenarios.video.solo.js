// src/data/scenarios.video.solo.js
// v3-3b — VIDEO STAGE solo scenarios: 8 lessons × 3 personas. The
// assessed tier — Gemini-evaluated, XP-awarded. Every scenario is a real
// reason someone opens a video generator, in Indian contexts.
// AI-assisted drafting, hand-curated.

export const SOLO_VIDEO = {
  l1: {
    student: {
      scenario:
        "Your robotics club needs a 6-second clip of your line-following bot for the fest reel. 'A robot' gives you a humanoid in a lab — nothing like the small chassis crawling along a black tape line.",
      task: 'Write a video prompt naming both the subject and exactly what it does.',
      hints: ['What does the bot look like — size, parts, colour?', 'What is the action, precisely?'],
    },
    everyday: {
      scenario:
        "You want a short clip of a pressure cooker whistling for a cooking reel. Every attempt gives you a still kitchen — the steam and the whistle are the whole point.",
      task: 'Write a prompt where the action is as specific as the subject.',
      hints: ['What kind of cooker, on what stove?', 'What exactly happens in those seconds?'],
    },
    professional: {
      scenario:
        "The product page needs a 5-second loop of your app being used. 'Person using phone' gives you a stock model scrolling — you need the specific gesture your app is known for.",
      task: 'Write a prompt naming the subject and the exact action.',
      hints: ['Whose hands, what device, what environment?', 'Which gesture, in what order?'],
    },
  },

  l2: {
    student: {
      scenario:
        "Your documentary assignment opens on the college gate at 7 AM. The wide shot you keep getting looks like a drone advert; the brief asks for something more intimate.",
      task: 'Write a prompt that chooses the shot deliberately.',
      hints: ['How much of the scene should be visible?', 'What does that framing say?'],
    },
    everyday: {
      scenario:
        "You're making a birthday reel for your mother and want one shot of her hands kneading dough — the way you remember watching from the counter.",
      task: 'Write a prompt whose shot type captures that memory.',
      hints: ['Close-up, medium, or wide?', 'From what distance would a child have watched?'],
    },
    professional: {
      scenario:
        "The brand video needs one shot that establishes the workshop before any close-ups. Right now every attempt jumps straight to detail.",
      task: 'Write a prompt for an establishing shot that sets the place.',
      hints: ['What must be visible to understand the space?', 'How wide is wide enough?'],
    },
  },

  l3: {
    student: {
      scenario:
        "Your fest aftermovie needs energy. Static shots look like CCTV — the camera itself has to move with the crowd.",
      task: 'Write a prompt specifying the camera movement.',
      hints: ['Does the camera follow, orbit, push in, or stay still?', 'How fast, how steady?'],
    },
    everyday: {
      scenario:
        "A clip of your terrace garden for the family group: you picture the camera drifting slowly across the pots, not a fixed frame.",
      task: 'Write a prompt where the camera move creates the feeling.',
      hints: ['What kind of move suits calm?', 'Which direction, how slow?'],
    },
    professional: {
      scenario:
        "The pitch video's opening shot should reveal the product gradually — the movement is the reveal, not a cut.",
      task: 'Write a prompt whose camera move performs the reveal.',
      hints: ['Push in, orbit, or crane?', 'What is hidden at the start and shown at the end?'],
    },
  },

  l4: {
    student: {
      scenario:
        "Your two-shot sequence — the experiment setup, then the result — keeps producing two unrelated labs with different lighting and different equipment.",
      task: 'Write a prompt that anchors what stays constant across both shots.',
      hints: ['What must be identical in both?', 'How do you name the transition?'],
    },
    everyday: {
      scenario:
        "The reel goes: dough rising, then the same dough in the oven. The AI keeps changing the kitchen, the bowl, and the time of day between shots.",
      task: 'Write a prompt that keeps continuity across the two moments.',
      hints: ['Same what — place, light, container?', 'How do you signal "later, same place"?'],
    },
    professional: {
      scenario:
        "A three-beat demo — problem, action, result — must feel like one continuous session with the same person at the same desk.",
      task: 'Write a prompt that holds the sequence together.',
      hints: ['Name the constants first.', 'How do the beats connect?'],
    },
  },

  l5: {
    student: {
      scenario:
        "Your submission slot is exactly 8 seconds and the pacing matters: too fast and the diagram is unreadable, too slow and it feels empty.",
      task: 'Write a prompt that specifies duration and rhythm.',
      hints: ['How many seconds, and what happens in them?', 'Fast cuts or one slow move?'],
    },
    everyday: {
      scenario:
        "A short clip of monsoon rain on the window for a status update — you want it to feel unhurried, and to loop cleanly.",
      task: 'Write a prompt with the timing and pacing stated.',
      hints: ['How long? Should it loop?', 'What pace makes rain feel calm?'],
    },
    professional: {
      scenario:
        "The ad slot is 6 seconds, hard cap, and the product must appear by second 3. Pacing is a contractual requirement, not a preference.",
      task: 'Write a prompt where timing is explicit and structural.',
      hints: ['What happens in each stretch of the six seconds?', 'How fast do beats change?'],
    },
  },

  l6: {
    student: {
      scenario:
        "Your short film's mood board is grainy, handheld, 90s home-video. Every generated clip comes back looking like a glossy commercial.",
      task: 'Write a prompt that commits to a visual style.',
      hints: ['What era and format?', 'What imperfections define that look?'],
    },
    everyday: {
      scenario:
        "You're recreating a memory of a family trip as a short clip — it should feel like old camcorder footage, not 4K travel content.",
      task: 'Write a prompt whose style carries the nostalgia.',
      hints: ['Which recording format?', 'What artefacts come with it?'],
    },
    professional: {
      scenario:
        "The client wants their brand video to look 'documentary, not corporate' — natural light, no gloss, real texture.",
      task: 'Write a prompt that sets that style unmistakably.',
      hints: ['What defines documentary look?', 'What must be absent?'],
    },
  },

  l7: {
    student: {
      scenario:
        "The generated clip is close: right subject, right framing — but the camera move is too fast and the ending cuts off abruptly.",
      task: 'Write a refinement prompt that fixes only what is wrong.',
      hints: ['What must stay exactly as it is?', 'Name each change specifically.'],
    },
    everyday: {
      scenario:
        "Your festival clip looks lovely but the lighting turned cold and there is an odd jump in the middle.",
      task: 'Write a refinement prompt naming what to keep and what to change.',
      hints: ['Which elements worked?', 'How would you describe the fix in one instruction each?'],
    },
    professional: {
      scenario:
        "The client says the demo video feels 'rushed and a bit cheap'. The shot list is approved — only pace and finish should change.",
      task: 'Write a refinement prompt turning vague feedback into concrete changes.',
      hints: ['Translate "rushed" and "cheap" into camera and timing terms.', 'What is untouched?'],
    },
  },

  l8: {
    student: {
      scenario:
        "The class submission tool caps prompts at roughly 45 tokens. Your clip still needs subject, action, shot, movement, style and duration.",
      task: 'Write the densest complete video prompt inside the budget.',
      hints: ['Comma-separated fragments, no sentences.', 'Order: subject, action, shot, move, style, seconds.'],
    },
    everyday: {
      scenario:
        "Slow connection, one attempt, one good clip of a festive street at night — no room for a second try or a wasted word.",
      task: 'Write one dense, complete prompt within the budget.',
      hints: ['Every word must add a frame.', 'Cut politeness entirely.'],
    },
    professional: {
      scenario:
        "Your team's shared prompt library caps entries so they stay reusable across briefs. The shot must still be fully specified.",
      task: 'Write a complete, dense prompt inside the cap.',
      hints: ['Fragments beat sentences.', 'Keep only what changes the footage.'],
    },
  },
}