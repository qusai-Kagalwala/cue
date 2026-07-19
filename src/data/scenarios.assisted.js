// src/data/scenarios.assisted.js  (lands properly in v2-5b)
// v2-5a — ASSISTED tier: 8 lessons × 3 personas. Medium difficulty:
// real-life messiness (a constraint, a wrinkle, a second requirement),
// still narrower than the Solo originals. Free textarea + live rubric
// checklist (v2-5d); no skeleton, no XP.
// Generated from the Solo seeds' voice — CURATE BY HAND before shipping.

export const ASSISTED = {
  l1: {
    student: {
      scenario: "Your seminar slot is 10 minutes and the professor's only instruction was 'pick one angle' on a huge subject. Ask the AI for the whole subject and you'll drown; the skill is naming the one slice you'll present.",
      task: 'Ask for seminar material on one precisely named angle, sized for 10 minutes.',
    },
    everyday: {
      scenario: "The society's water comes at random hours this month and you're drafting a complaint to the secretary. 'Water problem in our wing' will get a shrug — the days, the timings, and the flat numbers affected will get a meeting.",
      task: 'Ask for a complaint letter with the specifics that make it actionable.',
    },
    professional: {
      scenario: "A vendor sent a 9-page quotation and your manager wants one answer: is the AMC worth it compared to pay-per-visit? Asking the AI to 'summarize the quotation' buries the one comparison you need.",
      task: 'Ask for exactly the comparison that answers the decision.',
    },
  },

  l2: {
    student: {
      scenario: "Your Python script crashes on the third run, never the first. You've already tried reinstalling the library. Pasting just the error line gives the AI nothing — it wasn't there for the first two runs.",
      task: 'Ask for debugging help with the background a stranger would need: what it does, when it breaks, what you tried.',
    },
    everyday: {
      scenario: "Your parents are flying for the first time — Mumbai to Dubai for your cousin's wedding. Your father walks slowly after his surgery; your mother reads Hindi, not English. Generic 'first flight tips' won't cover what actually worries you.",
      task: 'Ask for a preparation guide shaped by their real situation.',
    },
    professional: {
      scenario: "You're interviewing candidates tomorrow for a junior role on YOUR team — small company, everyone wears three hats, the last hire quit over exactly that. The AI's stock interview questions won't surface what you need to know.",
      task: 'Ask for interview questions with the team context that makes them yours.',
    },
  },

  l3: {
    student: {
      scenario: "Your college's lab record has a fixed format — Aim, Apparatus, Procedure, Observations, Result — and the examiner checks the headings before reading a word. The AI's essay-style answer will cost you marks even if the science is right.",
      task: 'Ask for the experiment write-up in the exact sections your college requires.',
    },
    everyday: {
      scenario: "The family is splitting your sister's wedding costs and Sunday's discussion needs numbers everyone can point at — venue, catering, decoration, who pays what. A paragraph of estimates will start an argument; a table might prevent one.",
      task: 'Ask for the budget as a table with the columns the family discussion needs.',
    },
    professional: {
      scenario: "Your team's Friday status update has a fixed shape the manager actually reads: Done / In Progress / Blocked, three bullets each, blockers named with owners. Your week's notes are scattered across four places.",
      task: 'Ask for your notes reshaped into the team\'s exact status format.',
    },
  },

  l4: {
    student: {
      scenario: "The project abstract must be exactly 150 words, formal tone, and your guide rejects anything that 'sounds like the internet wrote it.' Three fences, and the assignment lives inside all of them.",
      task: 'Ask for the abstract with every limit stated before the topic.',
    },
    everyday: {
      scenario: "Diwali gifts for eleven people, ₹5,000 total, and the unwritten family rule: nothing under ₹300 for elders, nothing that looks like a re-gift. The math and the politics are both constraints.",
      task: 'Ask for a gift plan that respects the budget, the caps, and the family rules.',
    },
    professional: {
      scenario: "HR wants the job post under 100 words, zero buzzwords ('rockstar' is banned), hybrid policy stated clearly, and salary range included — legal insists. Every constraint came from a different department.",
      task: 'Ask for the post with all four fences named up front.',
    },
  },

  l5: {
    student: {
      scenario: "Your board-exam answers keep losing marks despite correct content. The topper's model answer has a visible pattern — definition, labeled diagram mention, three points, one-line conclusion. You want your answers rebuilt in that pattern.",
      task: 'Paste the model answer as the example, then ask for your topic in its pattern.',
    },
    everyday: {
      scenario: "Last year's haldi invitation message in the family group hit the perfect note — warm, a little funny, respectful to elders. This year's function needs the same voice, and you still have last year's message.",
      task: 'Show last year\'s message as the example, ask for this year\'s in the same voice.',
    },
    professional: {
      scenario: "One of your LinkedIn posts got real engagement — short paragraphs, a concrete story, no hashtag soup. The AI's default LinkedIn voice is everything yours isn't. Your best post is the spec.",
      task: 'Paste your best post as the example, ask for a new one in that voice.',
    },
  },

  l6: {
    student: {
      scenario: "Your SOP draft for the exchange program is done, but you keep missing your own grammar slips. A cheerleader won't help — you need the red-pen teacher who explains why each correction matters.",
      task: 'Assign the AI the strict-editor role with rules for how to correct you.',
    },
    everyday: {
      scenario: "Grandparents want a Haridwar trip — trains not flights, ground floor rooms, food that suits them, nothing rushed. A generic travel planner would build the wrong trip; a budget-rail specialist who plans for elders would build the right one.",
      task: 'Assign the AI the travel-agent role with the expertise your trip needs.',
    },
    professional: {
      scenario: "Your proposal goes to the finance head Thursday, and she's famous for one thing: finding the weak number. Better to meet her twice — once as an AI rehearsal, once for real.",
      task: 'Assign the AI the skeptical-CFO role and have it interrogate your proposal.',
    },
  },

  l7: {
    student: {
      scenario: "The AI's code for your mini-project works — but it's one giant function with variable names like 'x2', and your viva examiner WILL ask you to walk through it. The logic is right; the readability is the problem.",
      task: 'Ask for the cleanup you need while protecting the logic that works.',
    },
    everyday: {
      scenario: "The AI's 3-day Udaipur itinerary is genuinely good — except day 2 crams five places between lunch and sunset with your in-laws in the group. Days 1 and 3 are perfect. Only day 2 needs surgery.",
      task: 'Ask for the fix to day 2 alone, keeping the rest untouched.',
    },
    professional: {
      scenario: "The AI's summary of your quarterly report reads well but skipped the risks section entirely — and the risks are why the meeting exists. The rest of the summary is fine as is.",
      task: 'Point at the gap precisely: add what\'s missing, leave the rest alone.',
    },
  },

  l8: {
    student: {
      scenario: "Exam morning, phone in hand outside the hall, five minutes. You've blanked on when to use one formula versus its twin. Every extra word in your ask is time you don't have.",
      task: 'Get the distinction and one worked line each — in the tightest ask you can write.',
    },
    everyday: {
      scenario: "Your data pack expires tonight and the recharge is three days away. Before it dies you want the week's veg tiffin menu sorted — one message, complete answer, no follow-ups possible.",
      task: 'Ask for the full week\'s menu in one economical, complete prompt.',
    },
    professional: {
      scenario: "The call got preponed — it starts in ten minutes and you're chairing it. You need a crisp 4-item agenda for 15 minutes, and you have time for exactly one message to the AI.",
      task: 'Ask for the agenda with only the facts that shape it — nothing spare.',
    },
  },
}