// src/data/scenarios.comprehend.guided.js
// v7 CAPSTONE — READING AI OUTPUT, guided scenarios: 8x3. The most scaffolded
// tier: a fill-in-the-blank READING FRAME that teaches the shape of a good
// critical reading (e.g. "It said ___, but ___"). Each blank carries a hint.
// The short scenario names the AI answer being read; the skeleton structures
// the learner's response. personas = student, everyday, professional.

export const GUIDED_COMPREHEND = {
  // l1 — READ CLOSELY: restate what it said
  l1: {
    student: { scenario: 'The AI gave you steps to submit an assignment online. Say back what it actually told you.', task: 'Fill in what it said.',
      skeleton: [{ text: 'The answer said I should ' }, { blank: 'the main action', hint: 'upload my PDF on the portal and submit before the deadline' }, { text: ', and then ' }, { blank: 'what happens next', hint: 'I get a confirmation email' }, { text: '.' }] },
    everyday: { scenario: 'The AI told you how to pay your electricity bill online. Say it back plainly.', task: 'Fill in what it said.',
      skeleton: [{ text: 'It told me to ' }, { blank: 'the main action', hint: 'enter my consumer number and pay by UPI on the board site' }, { text: ', and to ' }, { blank: 'the caution', hint: 'save the receipt and pay before the due date' }, { text: '.' }] },
    professional: { scenario: 'The AI summarised a client email. Restate what the client wants.', task: 'Fill in the asks.',
      skeleton: [{ text: 'The client wants ' }, { blank: 'the main ask', hint: 'the revised proposal by Friday' }, { text: ', plus ' }, { blank: 'the extras', hint: 'expanded pricing and two case studies' }, { text: '.' }] },
  },
  // l2 — SPOT THE GAP
  l2: {
    student: { scenario: 'The AI explained applying for a duplicate mark sheet but missed something you need.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It covered ' }, { blank: 'what it did say', hint: 'the form, the fee, and the collection time' }, { text: ', but it never mentioned ' }, { blank: 'the missing part', hint: 'the FIR copy needed if the original was lost' }, { text: '.' }] },
    everyday: { scenario: 'The AI explained booking a gas refill but left out a step you needed.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It explained ' }, { blank: 'what it did say', hint: 'booking and paying in the app' }, { text: ', but skipped ' }, { blank: 'the missing part', hint: 'checking my registered mobile number is linked first' }, { text: '.' }] },
    professional: { scenario: 'The AI outlined vendor onboarding but skipped a step your process requires.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It listed ' }, { blank: 'what it did say', hint: 'GST details, contract, payment setup, and PO' }, { text: ', but left out ' }, { blank: 'the missing step', hint: 'the compliance/background check before the contract' }, { text: '.' }] },
  },
  // l3 — CATCH THE FLAW
  l3: {
    student: { scenario: 'The AI said 5 subjects over 4 days is "one per day, comfortably". The maths is off.', task: 'Fill in the error.',
      skeleton: [{ text: 'It said ' }, { blank: 'the claim', hint: 'one subject a day finishes all of them' }, { text: ', but that is wrong because ' }, { blank: 'why', hint: '5 subjects will not fit in 4 days at one per day' }, { text: '.' }] },
    everyday: { scenario: 'The AI said leaving at 6 PM for a 180 km, 7 PM event gives "plenty of time". Something is off.', task: 'Fill in the error.',
      skeleton: [{ text: 'It claimed ' }, { blank: 'the claim', hint: 'leaving at 6 PM is plenty of time' }, { text: ', but that is wrong because ' }, { blank: 'why', hint: 'a ~2 hour drive from 6 PM arrives after the 7 PM start' }, { text: '.' }] },
    professional: { scenario: 'The AI said three 2-week phases finish "in 3 weeks total". The arithmetic is wrong.', task: 'Fill in the error.',
      skeleton: [{ text: 'It stated ' }, { blank: 'the claim', hint: 'the project finishes in 3 weeks' }, { text: ', which is wrong because ' }, { blank: 'why', hint: 'three 2-week phases in sequence take 6 weeks, not 3' }, { text: '.' }] },
  },
  // l4 — CHECK THE CLAIM
  l4: {
    student: { scenario: 'The AI stated a scholarship "closes October 15th every year" with no source.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should not trust ' }, { blank: 'the unsupported claim', hint: 'the October 15th deadline stated as fact' }, { text: ' because ' }, { blank: 'why', hint: 'it gave no source' }, { text: '; I will ' }, { blank: 'how to verify', hint: 'check the official scholarship site' }, { text: '.' }] },
    everyday: { scenario: 'The AI said two medicines are "completely safe together" with full confidence.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should not rely on ' }, { blank: 'the claim', hint: 'that the two are completely safe together' }, { text: ' because ' }, { blank: 'why', hint: 'an AI should not be this certain about medicine' }, { text: '; I will ' }, { blank: 'what to do', hint: 'ask a pharmacist or doctor' }, { text: '.' }] },
    professional: { scenario: 'The AI stated a "₹20 lakh GST exemption" as fact with no citation.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should verify ' }, { blank: 'the claim', hint: 'the ₹20 lakh exemption threshold' }, { text: ' because ' }, { blank: 'why', hint: 'it cited nothing' }, { text: '; I will ' }, { blank: 'how', hint: 'confirm on the official GST portal or with an accountant' }, { text: '.' }] },
  },
  // l5 — JUDGE THE FIT
  l5: {
    student: { scenario: 'You wanted a short warm thank-you email; the AI wrote a formal 4-paragraph letter.', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'The answer is ' }, { blank: 'its quality', hint: 'well-written' }, { text: ', but it does not fit because ' }, { blank: 'the mismatch', hint: 'I wanted a short warm email, not a formal letter' }, { text: '.' }] },
    everyday: { scenario: 'You wanted quick stain-removal steps; the AI gave a chemistry lecture.', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'It is ' }, { blank: 'its quality', hint: 'accurate' }, { text: ', but the wrong fit because ' }, { blank: 'the mismatch', hint: 'I asked what to do, not how stains work' }, { text: '.' }] },
    professional: { scenario: 'You wanted a one-line update; the AI wrote a half-page report.', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'The content is ' }, { blank: 'its quality', hint: 'thorough and correct' }, { text: ', but it does not fit because ' }, { blank: 'the mismatch', hint: 'a busy manager needs one line, not a report' }, { text: '.' }] },
  },
  // l6 — CORRECT IT
  l6: {
    student: { scenario: 'The revision plan ignored that Physics is first and only 3 days away. Fix it.', task: 'Fill in the correction.',
      skeleton: [{ text: 'You ' }, { blank: 'the problem', hint: 'spread subjects evenly and ignored that Physics is in 3 days' }, { text: ' — please ' }, { blank: 'the fix', hint: 'front-load Physics for the next 3 days, then the rest' }, { text: '.' }] },
    everyday: { scenario: 'The grocery list totals ₹3200 but your budget was ₹2000. Fix it.', task: 'Fill in the correction.',
      skeleton: [{ text: 'The list ' }, { blank: 'the problem', hint: 'comes to ₹3200 and ignored my ₹2000 budget' }, { text: ' — please ' }, { blank: 'the fix', hint: 'redo it under ₹2000 and show each item price' }, { text: '.' }] },
    professional: { scenario: 'The client email left out the delivery date they asked about. Fix it.', task: 'Fill in the correction.',
      skeleton: [{ text: 'The draft ' }, { blank: 'the problem', hint: 'left out the delivery date the client asked about' }, { text: ' — please ' }, { blank: 'the fix', hint: 'add a clear line stating the delivery date' }, { text: '.' }] },
  },
  // l7 — EXTRACT THE VALUE
  l7: {
    student: { scenario: 'Of 5 interview tips, 3 are useful and 2 are filler. Sort them.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will keep ' }, { blank: 'the useful part', hint: 'researching the company, preparing questions, practising aloud' }, { text: ' and drop ' }, { blank: 'the filler', hint: 'the vague "be confident" and "smile" tips' }, { text: '.' }] },
    everyday: { scenario: 'Of 6 phone-fixing steps, most are safe but one ("factory reset now") is risky. Sort them.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will use ' }, { blank: 'the safe part', hint: 'clearing cache and closing apps' }, { text: ' and skip ' }, { blank: 'the risky part', hint: 'the immediate factory reset' }, { text: '.' }] },
    professional: { scenario: 'Resume feedback: structure/verbs advice is sharp, the "objective section" tip is outdated. Sort them.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will take ' }, { blank: 'the good advice', hint: 'the structure and action-verb feedback' }, { text: ' and ignore ' }, { blank: 'the outdated part', hint: 'the suggestion to add a long objective section' }, { text: '.' }] },
  },
  // l8 — ACT ON IT
  l8: {
    student: { scenario: 'A maths explanation is mostly right, but one formula differs from your textbook. Decide.', task: 'Fill in the decision.',
      skeleton: [{ text: 'I will ' }, { blank: 'what to use', hint: 'use the clear explanation of the concept' }, { text: ', but first ' }, { blank: 'what to verify', hint: 'check the differing formula against my textbook' }, { text: '.' }] },
    everyday: { scenario: 'Cough remedies are mostly harmless, but it gave a specific medicine dose. Decide.', task: 'Fill in the decision.',
      skeleton: [{ text: 'I will ' }, { blank: 'what to use', hint: 'use the harmless tips like warm water and honey' }, { text: ', but ' }, { blank: 'what to verify', hint: 'confirm the medicine dose with a pharmacist first' }, { text: '.' }] },
    professional: { scenario: 'A contract clause reads well, but one term could carry real liability. Decide.', task: 'Fill in the decision.',
      skeleton: [{ text: 'I will ' }, { blank: 'what to use', hint: 'use the clause as a starting draft' }, { text: ', but ' }, { blank: 'what to verify', hint: 'have a lawyer review the liability term before signing' }, { text: '.' }] },
  },
}