// src/data/scenarios.guided.js  (lands properly in v2-5b)
// v2-5a — GUIDED tier: 8 lessons × 3 personas. Simple, small-stakes,
// the scenario suggests its own answer. Skeleton = alternating text/blank
// parts; any sane fill produces a decent prompt (nearly impossible to fail).
// Generated from the Solo seeds' voice — CURATE BY HAND before shipping.

export const GUIDED = {
  l1: {
    student: {
      scenario: "Class test tomorrow on one chapter of Chemistry, and you only have tonight. You want the AI to explain it — but 'explain chemistry' will get you the whole textbook.",
      task: 'Ask for exactly the chapter and depth you need.',
      skeleton: [
        { text: 'Explain ' }, { blank: 'the exact chapter/topic', hint: 'e.g. chemical bonding' },
        { text: ' from Class ' }, { blank: 'your class', hint: '11, 12…' },
        { text: ' ' }, { blank: 'subject', hint: 'Chemistry, Physics…' },
        { text: ' in ' }, { blank: 'how many', hint: 'a number' },
        { text: ' simple points for a class test tomorrow.' },
      ],
    },
    everyday: {
      scenario: "The old ceiling fan finally died in peak summer. You're buying a new one online tonight and want suggestions that fit your room and wallet — not a list of ₹15,000 designer fans.",
      task: 'Ask for fan suggestions with the details that narrow it to YOUR room.',
      skeleton: [
        { text: 'Suggest ' }, { blank: 'how many', hint: 'a number' },
        { text: ' ceiling fans under ₹' }, { blank: 'budget', hint: 'e.g. 2500' },
        { text: ' for a ' }, { blank: 'room size', hint: 'small / 10x10 ft…' },
        { text: ' room in India, available online.' },
      ],
    },
    professional: {
      scenario: "You're taking two days off and need an out-of-office auto-reply. Short, clear, tells people who to contact — nothing more.",
      task: 'Ask for the auto-reply with the two facts it needs.',
      skeleton: [
        { text: 'Write a 2-line out-of-office reply: away ' },
        { blank: 'dates', hint: 'e.g. 12–13 June' },
        { text: ', for urgent work contact ' },
        { blank: 'colleague name', hint: 'a name' },
        { text: '.' },
      ],
    },
  },

  l2: {
    student: {
      scenario: "Prelims in twelve days, five subjects, and one of them scares you. A study plan only helps if the AI knows your actual situation.",
      task: 'Ask for a study plan with your dates and weak spot included.',
      skeleton: [
        { text: 'Make a ' }, { blank: 'days', hint: 'a number' },
        { text: '-day study plan for my ' }, { blank: 'exam', hint: 'prelims, boards…' },
        { text: '. Subjects: ' }, { blank: 'list them', hint: 'comma-separated' },
        { text: ". I'm weakest in " }, { blank: 'subject', hint: 'the scary one' },
        { text: ' — give it extra time.' },
      ],
    },
    everyday: {
      scenario: "Diwali sweets shopping, but your uncle is diabetic and he's staying the whole week. You want ideas that include him instead of a table he can't touch.",
      task: 'Ask for sweet options with the context that changes the answer.',
      skeleton: [
        { text: 'Suggest ' }, { blank: 'how many', hint: 'a number' },
        { text: ' low-sugar sweet options for ' }, { blank: 'occasion', hint: 'Diwali, Eid…' },
        { text: ' — my ' }, { blank: 'who', hint: 'uncle, father…' },
        { text: ' is diabetic and will be eating with us all week.' },
      ],
    },
    professional: {
      scenario: "You emailed a vendor last Tuesday about a delayed delivery. Silence. Time to follow up — and the AI needs the backstory to write it right.",
      task: 'Ask for the follow-up with the history included.',
      skeleton: [
        { text: 'Draft a polite follow-up email to ' },
        { blank: 'who', hint: 'vendor, client…' },
        { text: ' about ' }, { blank: 'what', hint: 'the pending thing' },
        { text: '. I first emailed on ' }, { blank: 'when', hint: 'day/date' },
        { text: ' and got no reply. Keep it firm but friendly.' },
      ],
    },
  },

  l3: {
    student: {
      scenario: "Your week is chaos — classes, tuition, cricket, and somehow revision. You want the AI to organise it, and a paragraph won't help you at 7 AM.",
      task: 'Ask for your week as a table with the columns you\'ll actually read.',
      skeleton: [
        { text: 'Make my week a table with columns: ' },
        { blank: 'columns', hint: 'Day, Morning, Evening…' },
        { text: '. Fixed items: ' },
        { blank: 'your commitments', hint: 'classes Mon–Fri 8–2, tuition…' },
        { text: '. Fit revision around them.' },
      ],
    },
    everyday: {
      scenario: "Sunday bazaar run covers three stops — kirana, sabziwala, medical store. One jumbled list means three trips back.",
      task: 'Ask for your list reorganised by shop as a checklist.',
      skeleton: [
        { text: 'Turn this into a checklist grouped by shop (' },
        { blank: 'your stops', hint: 'kirana / sabzi / medical' },
        { text: '): ' },
        { blank: 'the items', hint: 'paste your list' },
        { text: '' },
      ],
    },
    professional: {
      scenario: "Your manager wants 'just the essence' of the client call, and your notes are a wall of text. She reads bullets, not essays.",
      task: 'Ask for a summary in the exact shape she reads.',
      skeleton: [
        { text: 'Summarise these notes as ' },
        { blank: 'how many', hint: 'a number' },
        { text: ' bullets, each under ' },
        { blank: 'word limit', hint: 'e.g. 15' },
        { text: ' words: ' },
        { blank: 'notes', hint: 'paste them' },
        { text: '' },
      ],
    },
  },

  l4: {
    student: {
      scenario: "Value-education essay due: the teacher wants exactly 300 words and marks down big-dictionary showing off. The fence is the assignment.",
      task: 'Ask for the essay with the limits stated up front.',
      skeleton: [
        { text: 'Write a ' }, { blank: 'word count', hint: 'e.g. 300' },
        { text: '-word essay on ' }, { blank: 'topic', hint: 'the given topic' },
        { text: ' in simple English a ' }, { blank: 'class', hint: 'Class 9…' },
        { text: ' student would write. No fancy vocabulary.' },
      ],
    },
    everyday: {
      scenario: "Your daughter's birthday party at home: twelve kids, pure veg house, and a budget your spouse already fixed. Plans that ignore any of this are useless.",
      task: 'Ask for a menu that respects every real limit.',
      skeleton: [
        { text: 'Plan a birthday menu for ' }, { blank: 'how many', hint: 'kids count' },
        { text: ' kids, pure veg, under ₹' }, { blank: 'budget', hint: 'total ₹' },
        { text: ', things I can make at home or get from a ' },
        { blank: 'nearby option', hint: 'local bakery…' },
        { text: '.' },
      ],
    },
    professional: {
      scenario: "Client wants a quick WhatsApp update, not an email. Your company rule: short, plain language, never promise dates you don't control.",
      task: 'Ask for the message with the fences stated.',
      skeleton: [
        { text: 'Draft a ' }, { blank: 'lines', hint: '2–3' },
        { text: '-line WhatsApp update to a client about ' },
        { blank: 'topic', hint: 'the project bit' },
        { text: '. Plain language, no technical words, no committed dates.' },
      ],
    },
  },

  l5: {
    student: {
      scenario: "You found a note style that finally sticks: one bold term, one dash, one everyday example. You want twenty more lines exactly like it.",
      task: 'Show one example line, then ask for more in that pattern.',
      skeleton: [
        { text: "Here's my note style: '" },
        { blank: 'one example line', hint: 'Osmosis — water moving like gossip: high to low' },
        { text: "'. Make " }, { blank: 'how many', hint: 'a number' },
        { text: ' more exactly like this for ' },
        { blank: 'topic', hint: 'chapter/subject' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "Cousin's engagement photos need captions for the family group, and your style is short Hindi-English mix with one emoji. Describe it and the AI writes greeting-card English; show it and it clicks.",
      task: 'Give one caption in your voice, ask for more like it.',
      skeleton: [
        { text: "Caption style example: '" },
        { blank: 'one caption you\'d write', hint: 'your real voice, emoji included' },
        { text: "'. Write " }, { blank: 'how many', hint: 'a number' },
        { text: ' more like this for ' },
        { blank: 'event', hint: 'engagement, haldi…' },
        { text: ' photos.' },
      ],
    },
    professional: {
      scenario: "Your best-performing email subject line last quarter had a pattern: number + benefit + no drama. You want variations, not the AI's clickbait instincts.",
      task: 'Show the winning example, ask for the same species.',
      skeleton: [
        { text: "Best subject line I've used: '" },
        { blank: 'the example', hint: 'paste it' },
        { text: "'. Write " }, { blank: 'how many', hint: 'a number' },
        { text: ' subject lines in the same pattern for ' },
        { blank: 'this email', hint: 'what it announces' },
        { text: '.' },
      ],
    },
  },

  l6: {
    student: {
      scenario: "Unit test Friday and self-quizzing from your own notes is too easy — you always peek. You need someone across the table asking the questions.",
      task: 'Assign the AI the quiz-master role with its rules.',
      skeleton: [
        { text: 'Act as a ' },
        { blank: 'the role', hint: 'strict quiz master…' },
        { text: ' and ask me ' }, { blank: 'how many', hint: 'a number' },
        { text: ' questions on ' }, { blank: 'topic', hint: 'chapter/subject' },
        { text: ', one at a time. Tell me if my answer is wrong before the next one.' },
      ],
    },
    everyday: {
      scenario: "Your mother wants to practice English before her sister's family visits from abroad — she understands everything but freezes speaking. A patient partner would change that.",
      task: 'Assign the AI the right teaching role for her.',
      skeleton: [
        { text: 'Act as a ' },
        { blank: 'the role', hint: 'patient spoken-English partner' },
        { text: ' for my mother. Do ' }, { blank: 'how many', hint: 'a number' },
        { text: ' short practice conversations about ' },
        { blank: 'everyday topics', hint: 'market, cooking, family' },
        { text: ' — simple words, lots of encouragement.' },
      ],
    },
    professional: {
      scenario: "Big interview Monday. Your friends' mock questions are too soft — you need the interviewer who actually shows up: specific, probing, unimpressed.",
      task: 'Assign the AI the interviewer role with the details it needs.',
      skeleton: [
        { text: 'Act as an interviewer for a ' },
        { blank: 'role', hint: 'the job title' },
        { text: ' position at a ' },
        { blank: 'company type', hint: 'startup, bank…' },
        { text: '. Ask ' }, { blank: 'how many', hint: 'a number' },
        { text: ' questions one at a time, and push back on vague answers.' },
      ],
    },
  },

  l7: {
    student: {
      scenario: "The AI's essay draft is good but 200 words over the limit, and the second paragraph wanders. Starting over would waste what already works.",
      task: 'Direct the exact edits — keep the good, fix the specific.',
      skeleton: [
        { text: 'Keep all the points but cut it to ' },
        { blank: 'word limit', hint: 'the required count' },
        { text: ' words. Also ' },
        { blank: 'the specific fix', hint: 'tighten paragraph 2 / simpler intro' },
        { text: '.' },
      ],
    },
    everyday: {
      scenario: "The dal makhani recipe the AI gave looks great — except it's too spicy for the kids and calls for cream you don't have. The recipe isn't wrong; it just needs bending.",
      task: 'Ask it to adapt, naming what stays and what changes.',
      skeleton: [
        { text: 'Adapt this recipe: much less ' },
        { blank: 'what to reduce', hint: 'chilli, spice…' },
        { text: ' (kids are eating), keep the ' },
        { blank: 'what stays', hint: 'the flavour/step you like' },
        { text: ', and replace ' },
        { blank: 'missing ingredient', hint: 'cream…' },
        { text: ' with something from a regular kirana.' },
      ],
    },
    professional: {
      scenario: "The AI drafted your leave request like a resignation letter — content's right, tone is funereal. One notch lighter and it's perfect.",
      task: 'Keep the content, direct the tone shift precisely.',
      skeleton: [
        { text: 'Keep all the details but rewrite ' },
        { blank: 'the tone shift', hint: 'lighter / friendlier / less formal' },
        { text: " — I'm writing to " },
        { blank: 'relationship', hint: 'a manager I get along with' },
        { text: ', not a court.' },
      ],
    },
  },

  l8: {
    student: {
      scenario: "Two minutes before class, one confusion between two terms that always swap in your head. No time for essays — yours or the AI's.",
      task: 'Get the distinction in the fewest words that still work.',
      skeleton: [
        { text: 'Explain ' }, { blank: 'term 1', hint: 'first concept' },
        { text: ' vs ' }, { blank: 'term 2', hint: 'the one it swaps with' },
        { text: ' in ' }, { blank: 'how many', hint: '2–3' },
        { text: ' lines with one example each.' },
      ],
    },
    everyday: {
      scenario: "The dahi's been out of the fridge since morning and dinner needs deciding now. One question, one answer, move on.",
      task: 'Ask the safety question with only the deciding facts.',
      skeleton: [
        { blank: 'the food', hint: 'dahi, cooked rice…' },
        { text: ' left out ' },
        { blank: 'how long', hint: 'since morning / 6 hours' },
        { text: ' in ' },
        { blank: 'weather', hint: 'Mumbai humidity / winter' },
        { text: ' — safe to eat or toss?' },
      ],
    },
    professional: {
      scenario: "Ninety seconds before the standup and you need three crisp talking points about yesterday's release. The prompt has to be as fast as the moment.",
      task: 'Ask tight — the what, the audience, the count, nothing else.',
      skeleton: [
        { blank: 'how many', hint: 'a number' },
        { text: ' talking points on ' },
        { blank: 'the topic', hint: "yesterday's release / the demo" },
        { text: ' for a ' },
        { blank: 'audience', hint: 'standup, client call' },
        { text: '. One line each.' },
      ],
    },
  },
}