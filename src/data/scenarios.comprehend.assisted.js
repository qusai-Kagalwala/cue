// src/data/scenarios.comprehend.assisted.js
// v7 CAPSTONE — READING AI OUTPUT, assisted scenarios: 8x3. The middle tier:
// the flawed AI answer is described, with a clear task but no skeleton and no
// hints — the learner structures the reading themselves. personas = student,
// everyday, professional.

export const ASSISTED_COMPREHEND = {
  l1: {
    student: { scenario: 'An AI gave you five steps to submit an assignment online, ending with "you will get a confirmation email".', task: 'Restate in your own words exactly what it told you to do.' },
    everyday: { scenario: 'An AI told you to pay your electricity bill via Quick Pay using your consumer number, before the due date.', task: 'Restate in your own words exactly what it told you to do.' },
    professional: { scenario: 'An AI summarised a client email as wanting the revised proposal by Friday, with expanded pricing and two case studies.', task: 'Restate in your own words exactly what the client wants.' },
  },
  l2: {
    student: { scenario: 'An AI explained getting a duplicate mark sheet (form, fee, collect in 7 days) but never mentioned the FIR copy you need if the original was lost.', task: 'Name the specific thing the answer left out that you need.' },
    everyday: { scenario: 'An AI explained booking a gas refill in the app but skipped that you must first check your registered mobile number is linked.', task: 'Name the specific thing the answer left out that you need.' },
    professional: { scenario: 'An AI outlined vendor onboarding (GST, contract, payment, PO) but skipped your required compliance check before the contract.', task: 'Name the specific step the answer left out.' },
  },
  l3: {
    student: { scenario: 'An AI said 5 subjects over 4 days works out to "one per day, comfortably".', task: 'Point to the exact error in its reasoning.' },
    everyday: { scenario: 'An AI said leaving at 6 PM for a 180 km drive gives "plenty of time" for a 7 PM event.', task: 'Point to the exact error in its reasoning.' },
    professional: { scenario: 'An AI said three sequential 2-week phases finish "in 3 weeks total".', task: 'Point to the exact error in its arithmetic.' },
  },
  l4: {
    student: { scenario: 'An AI stated a scholarship "closes October 15th every year" as fact, with no source.', task: 'Flag the claim you should not trust as-is, and say how you would verify it.' },
    everyday: { scenario: 'An AI said two of your medicines are "completely safe together", with full confidence and no caveat.', task: 'Flag why you should not trust this as-is, and say what you would do.' },
    professional: { scenario: 'An AI stated a "₹20 lakh GST exemption threshold" as fact, citing nothing.', task: 'Flag the claim that needs verifying, and say how you would confirm it.' },
  },
  l5: {
    student: { scenario: 'You wanted a short warm thank-you email; the AI produced a formal 4-paragraph letter with letterhead.', task: 'Judge whether it fits your actual need, and say why or why not.' },
    everyday: { scenario: 'You wanted quick stain-removal steps; the AI gave a detailed chemistry explanation instead.', task: 'Judge whether it fits your actual need, and say why or why not.' },
    professional: { scenario: 'You wanted a one-line status update; the AI wrote a thorough half-page report.', task: 'Judge whether it fits your actual need, and say why or why not.' },
  },
  l6: {
    student: { scenario: 'An AI made a revision plan that spread subjects evenly, ignoring that Physics is first and only 3 days away.', task: 'Write the follow-up that tells it exactly what to change.' },
    everyday: { scenario: 'An AI made a grocery list totalling ₹3200, ignoring your ₹2000 budget.', task: 'Write the follow-up that tells it exactly what to change.' },
    professional: { scenario: 'An AI drafted a client email but left out the delivery date the client specifically asked about.', task: 'Write the follow-up that tells it exactly what to change.' },
  },
  l7: {
    student: { scenario: 'An AI gave 5 interview tips: 3 useful (research, prepare questions, practise), 2 filler ("be confident", "smile").', task: 'Say which you will keep and use, and which you will drop.' },
    everyday: { scenario: 'An AI gave 6 phone-fixing steps: most are safe, but one says to "factory reset immediately".', task: 'Say which you will keep and use, and which you will drop.' },
    professional: { scenario: 'An AI reviewed your resume: sharp advice on structure and verbs, plus an outdated tip to add a long "objective" section.', task: 'Say which feedback you will keep and which you will drop.' },
  },
  l8: {
    student: { scenario: 'An AI explained a maths concept clearly and mostly correctly, but one formula differs from your textbook.', task: 'Decide your next step — use it, redo it, or verify first — and say why.' },
    everyday: { scenario: 'An AI gave cough remedies: mostly harmless, but it also specified a particular medicine dose.', task: 'Decide your next step — use it, redo it, or verify first — and say why.' },
    professional: { scenario: 'An AI drafted a contract clause that reads well, but one term could carry real liability.', task: 'Decide your next step — use it, redo it, or verify first — and say why.' },
  },
}