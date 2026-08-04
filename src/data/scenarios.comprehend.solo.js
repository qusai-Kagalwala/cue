// src/data/scenarios.comprehend.solo.js
// v7 CAPSTONE — READING AI OUTPUT, solo scenarios: 8x3. The assessed tier.
// Each scenario shows a hand-authored AI RESPONSE containing a deliberate flaw
// (gap, error, unsupported claim, or wrong fit); the learner writes their
// reading/critique/correction. personas = student, everyday user, professional.
// Indian-everyday contexts. The AI's answer is embedded in the scenario text so
// the learner has something concrete to read.

export const SOLO_COMPREHEND = {
  // l1 — READ CLOSELY: restate what it actually said
  l1: {
    student: { scenario: 'You asked an AI how to submit your college assignment online. It replied: "Log in to the student portal, open the Assignments tab, click Upload, attach your PDF, and press Submit before the deadline. You will get a confirmation email." Read it closely.', task: 'Restate, in your own words, exactly what the AI told you to do.', hints: ['What are the actual steps?', 'Say it back plainly'] },
    everyday: { scenario: 'You asked an AI how to pay your electricity bill online. It replied: "Visit the board\'s website, go to Quick Pay, enter your consumer number, check the amount, pay by UPI or card, and save the receipt. Pay before the due date to avoid a late fee." Read it closely.', task: 'Restate, in your own words, exactly what the AI told you to do.', hints: ['What are the real steps?', 'Say it back plainly'] },
    professional: { scenario: 'You asked an AI to summarise a client email. It replied: "The client wants the revised proposal by Friday, with the pricing section expanded and two case studies added. They also asked to move the kickoff call to next week." Read it closely.', task: 'Restate, in your own words, exactly what the AI said the client wants.', hints: ['What are the actual asks?', 'Say it back plainly'] },
  },
  // l2 — SPOT THE GAP: what did it leave out
  l2: {
    student: { scenario: 'You asked an AI how to apply for a duplicate mark sheet. It replied: "Go to the university office, fill the application form, pay the fee, and collect it after 7 days." You know from a friend that you also need to attach an FIR copy if the original was lost — the AI never mentioned that.', task: 'Point out the specific thing the answer left out that you actually need.', hints: ['What is missing?', 'Name the gap'] },
    everyday: { scenario: 'You asked an AI how to book a gas cylinder refill. It replied: "Open the gas agency app, tap Book Refill, confirm your address, and pay online. It arrives in 2-3 days." It never mentioned that you must first check your registered mobile number is linked, which you needed to know.', task: 'Point out the specific thing the answer left out that you actually need.', hints: ['What is missing?', 'Name the gap'] },
    professional: { scenario: 'You asked an AI to outline steps to onboard a new vendor. It replied: "Collect their GST details, sign the contract, add them to the payment system, and share the PO." It skipped the compliance/background check step your company requires before any contract.', task: 'Point out the specific step the answer left out that your process needs.', hints: ['What step is missing?', 'Name the gap'] },
  },
  // l3 — CATCH THE FLAW: point to the exact error
  l3: {
    student: { scenario: 'You asked an AI to help plan your exam timetable. It replied: "You have 5 subjects and 4 days, so study one subject per day and you will finish all of them comfortably." Something is wrong with that maths.', task: 'Point to the exact error in the AI\'s answer.', hints: ['Check the numbers', 'What does not add up?'] },
    everyday: { scenario: 'You asked an AI when to leave for a wedding 180 km away that starts at 7 PM. It replied: "At highway speed you will cover it in about 2 hours, so leaving by 6 PM gives you plenty of time." Something is off in that reasoning.', task: 'Point to the exact error in the AI\'s answer.', hints: ['Check the timing', 'What does not add up?'] },
    professional: { scenario: 'You asked an AI to calculate a project timeline. It replied: "Each of the 3 phases takes 2 weeks, so the whole project will be done in 3 weeks total." The arithmetic is wrong.', task: 'Point to the exact error in the AI\'s answer.', hints: ['Check the maths', 'What does not add up?'] },
  },
  // l4 — CHECK THE CLAIM: flag what needs verifying
  l4: {
    student: { scenario: 'You asked an AI about scholarship deadlines. It replied: "The national merit scholarship application closes on October 15th every year, so you have time." It gave no source and stated the date as fact.', task: 'Flag which claim you should not trust as-is, and say how you would verify it.', hints: ['Which "fact" is unsupported?', 'How would you check?'] },
    everyday: { scenario: 'You asked an AI whether a medicine is safe with your blood pressure tablets. It replied: "Yes, it is completely safe to take both together, no problem at all." It stated this with full confidence and no caveat.', task: 'Flag why you should not trust this claim as-is, and say what you would do.', hints: ['Should an AI be this certain here?', 'Who should confirm?'] },
    professional: { scenario: 'You asked an AI about a tax rule for your invoice. It replied: "Services under ₹20 lakh a year are fully exempt from GST registration, so you do not need to register." It cited nothing and stated the threshold as fact.', task: 'Flag which claim needs verifying, and say how you would confirm it.', hints: ['Which figure is unsupported?', 'How would you check?'] },
  },
  // l5 — JUDGE THE FIT: does it meet YOUR need
  l5: {
    student: { scenario: 'You asked an AI to help you thank a professor for a recommendation letter. It wrote a formal 4-paragraph letter with letterhead formatting. You just wanted a short, warm email.', task: 'Judge whether this answer fits your actual need, and say why or why not.', hints: ['Is it the right length and tone?', 'Right fit for the ask?'] },
    everyday: { scenario: 'You asked an AI how to remove a stain from a shirt. It gave a detailed chemistry explanation of how stain molecules bond to fabric. You just wanted to know what to do.', task: 'Judge whether this answer fits your actual need, and say why or why not.', hints: ['Did it answer what you asked?', 'Right fit?'] },
    professional: { scenario: 'You asked an AI for a one-line status update for a busy manager. It produced a thorough half-page report with background, analysis, and next steps. The content is good but not what you asked for.', task: 'Judge whether this answer fits your actual need, and say why or why not.', hints: ['Right format for the audience?', 'Right fit?'] },
  },
  // l6 — CORRECT IT: write the precise follow-up
  l6: {
    student: { scenario: 'You asked an AI to make a revision plan. It replied with a plan that ignores that your Physics exam is first and only 3 days away — it spread all subjects evenly. You need to fix that.', task: 'Write the follow-up that tells the AI exactly what to change.', hints: ['Name the problem AND the fix', 'Be specific'] },
    everyday: { scenario: 'You asked an AI for a grocery list for a week under ₹2000. It gave a good list but the total comes to ₹3200 and ignored your budget. You need to correct it.', task: 'Write the follow-up that tells the AI exactly what to change.', hints: ['Name the problem AND the fix', 'Be specific'] },
    professional: { scenario: 'You asked an AI to draft a client email. It wrote a solid email but left out the delivery date the client specifically asked about. You need to correct it.', task: 'Write the follow-up that tells the AI exactly what to change.', hints: ['Name the omission AND the fix', 'Be specific'] },
  },
  // l7 — EXTRACT THE VALUE: keep the good, drop the rest
  l7: {
    student: { scenario: 'You asked an AI how to prepare for a group interview. It gave 5 tips: 3 are genuinely useful (research the company, prepare questions, practise aloud), but 2 are generic filler ("be confident", "smile"). Extract the value.', task: 'Say which parts you will keep and use, and which you will drop.', hints: ['What is genuinely useful?', 'What is filler?'] },
    everyday: { scenario: 'You asked an AI how to fix a slow phone. It gave 6 steps: clearing cache and closing apps are solid, but one step tells you to "factory reset immediately" which is overkill and risky. Extract the value.', task: 'Say which parts you will keep and use, and which you will drop.', hints: ['What is safe and useful?', 'What is overkill?'] },
    professional: { scenario: 'You asked an AI to review your resume. Its feedback on structure and action verbs is sharp and useful, but its suggestion to add a lengthy "objective" section is outdated advice. Extract the value.', task: 'Say which feedback you will keep and which you will drop.', hints: ['What advice is current?', 'What is outdated?'] },
  },
  // l8 — ACT ON IT: decide the next step with right trust
  l8: {
    student: { scenario: 'You asked an AI to explain a tricky maths concept for tomorrow\'s test. The explanation is clear and mostly right, but one formula looks different from your textbook. Decide your next step.', task: 'Decide what to do next — use it, redo it, or verify first — and say why.', hints: ['What is trustworthy here?', 'What needs checking first?'] },
    everyday: { scenario: 'You asked an AI for home remedies for a persistent cough. Most tips are harmless (warm water, honey), but it also suggests a specific medicine dose. Decide your next step.', task: 'Decide what to do next — use it, redo it, or verify first — and say why.', hints: ['What is safe to use?', 'What needs a professional?'] },
    professional: { scenario: 'You asked an AI to draft a contract clause. It reads well, but it is a legal document and one term could carry real liability. Decide your next step.', task: 'Decide what to do next — use it, redo it, or verify first — and say why.', hints: ['What can you use as-is?', 'What needs expert review?'] },
  },
}