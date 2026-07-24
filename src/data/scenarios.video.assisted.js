// src/data/scenarios.video.assisted.js
// v3-3c — VIDEO STAGE assisted tier: 8 lessons × 3 personas. Free
// textarea + the live checklist (labels: Style set · Scene continuity ·
// Camera movement · Shot type · Subject & action · Timing & pacing).
// One real wrinkle each; narrower than solo.
// AI-assisted drafting, hand-curated.

export const ASSISTED_VIDEO = {
  l1: {
    student: {
      scenario: "Your sports-day recap needs one clip of the relay baton pass — the moment, not the race. Generic 'runners' clips miss the handoff entirely.",
      task: 'Write a prompt where the action is the subject.',
    },
    everyday: {
      scenario: "A clip of your dog greeting you at the door for a family group post. Every attempt gives a dog sitting still — the whole point is the leap and the tail.",
      task: 'Write a prompt that pins down the specific movement.',
    },
    professional: {
      scenario: "The onboarding video needs a shot of a barista completing one specific step — tamping the grounds — not general café ambience.",
      task: 'Write a prompt naming the precise action in the process.',
    },
  },

  l2: {
    student: {
      scenario: "Your film-studies exercise requires two versions of one moment: one that isolates the subject, one that shows its world. This attempt is the isolating one.",
      task: 'Write a prompt whose shot type does the isolating.',
    },
    everyday: {
      scenario: "For the anniversary reel you want the shot to show your parents' hands together — the room, the furniture, the rest of it would only distract.",
      task: 'Write a prompt whose framing excludes everything but what matters.',
    },
    professional: {
      scenario: "The case-study video opens on the client's factory floor. It must read as scale — dozens of machines, one operator, immediately legible.",
      task: 'Write a prompt whose shot communicates scale.',
    },
  },

  l3: {
    student: {
      scenario: "Your title sequence should feel restless — the subject barely moves, so the camera must supply all the motion.",
      task: 'Write a prompt where camera movement carries the energy.',
    },
    everyday: {
      scenario: "A clip walking through the Diwali-lit lane outside your building: the viewer should feel like they are walking, not watching.",
      task: 'Write a prompt whose camera movement puts the viewer inside it.',
    },
    professional: {
      scenario: "A real-estate listing clip must move through the flat continuously — entrance to balcony — without a single cut.",
      task: 'Write a prompt for one continuous moving shot.',
    },
  },

  l4: {
    student: {
      scenario: "Your process video shows the same model at three build stages. So far each shot invents a new desk, new lighting, and a different model.",
      task: 'Write a prompt that locks continuity across three shots.',
    },
    everyday: {
      scenario: "A before-and-after of your repainted room: the AI keeps changing the furniture and the window between the two shots.",
      task: 'Write a prompt where only the intended thing changes.',
    },
    professional: {
      scenario: "A two-part demo — the old workflow, then yours — must feel like the same office on the same afternoon for the comparison to land.",
      task: 'Write a prompt that holds everything constant except the workflow.',
    },
  },

  l5: {
    student: {
      scenario: "The assignment wants a 15-second clip that starts slow and accelerates — the pacing shift is graded, not the content.",
      task: 'Write a prompt whose timing and rhythm change deliberately.',
    },
    everyday: {
      scenario: "A time-lapse of your terrace from afternoon to night for the family group, and it must not feel rushed at the sunset moment.",
      task: 'Write a prompt where duration and pacing vary across the clip.',
    },
    professional: {
      scenario: "A 3-second bumper before every video: too fast to waste a frame, long enough to register the logo.",
      task: 'Write a prompt for a very short clip where every fraction counts.',
    },
  },

  l6: {
    student: {
      scenario: "Your class project is a mock news report — it must look like broadcast footage, including the imperfections that make TV look like TV.",
      task: 'Write a prompt that nails a specific footage style.',
    },
    everyday: {
      scenario: "You want a clip in the style of an old Doordarshan-era film — soft, warm, slightly faded, a little slow.",
      task: 'Write a prompt whose style is unmistakably that era.',
    },
    professional: {
      scenario: "The founder's story video should look like a documentary interview: natural light, shallow focus, no studio polish.",
      task: 'Write a prompt that sets an interview-documentary style.',
    },
  },

  l7: {
    student: {
      scenario: "The clip is right except the subject drifts out of frame at the end and the last second is empty.",
      task: 'Write a refinement prompt naming what to keep and the exact fix.',
    },
    everyday: {
      scenario: "Your cooking clip looks great but the steam disappears halfway and the pace drags in the middle.",
      task: 'Write a refinement prompt with two specific changes and everything else held.',
    },
    professional: {
      scenario: "Client feedback: 'the energy drops after the first two seconds'. The look is signed off; only motion and pacing may change.",
      task: 'Write a refinement prompt translating that into camera and timing instructions.',
    },
  },

  l8: {
    student: {
      scenario: "A 45-token cap on the submission form, and the clip still needs subject, action, shot, movement, style and duration.",
      task: 'Write the densest complete video prompt that fits.',
    },
    everyday: {
      scenario: "One attempt, poor connection, and you want a clean 6-second clip of the evening aarti at the local temple.",
      task: 'Write one dense, complete prompt inside the budget.',
    },
    professional: {
      scenario: "Prompts in the shared library are capped so they stay reusable across client briefs — yours must still specify everything.",
      task: 'Write a complete prompt in fragments within the cap.',
    },
  },
}