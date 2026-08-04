// src/data/scenarios.comprehend.guided.js
// v7.1 CAPSTONE — READING AI OUTPUT, guided scenarios: 8x3. Most scaffolded.
// KEY REDESIGN: the AI's answer is SHOWN (aiResponse) on screen, so the
// skeleton no longer asks the learner to reconstruct it. Instead the blanks
// scaffold the learner's REACTION to the visible answer — the flaw they found,
// the fix, the decision. The hints point at what to look for in the shown text.
// personas = student, everyday, professional.

export const GUIDED_COMPREHEND = {
  // l1 — READ CLOSELY: restate the shown answer
  l1: {
    student: { scenario: 'Read the AI\'s reply above, then say back its two key points.', aiResponse: 'Log in to the student portal, open the Assignments tab, upload your PDF, and submit before the deadline. You will get a confirmation email.', task: 'Fill in what it said.',
      skeleton: [{ text: 'The main thing it told me to do is ' }, { blank: 'the key action', hint: 'upload my PDF on the portal and submit before the deadline' }, { text: ', and afterwards ' }, { blank: 'what happens', hint: 'I get a confirmation email' }, { text: '.' }] },
    everyday: { scenario: 'Read the AI\'s reply above, then say back its two key points.', aiResponse: 'Go to the board site, open Quick Pay, enter your consumer number, and pay by UPI before the due date. Save the receipt.', task: 'Fill in what it said.',
      skeleton: [{ text: 'It told me to ' }, { blank: 'the key action', hint: 'enter my consumer number and pay by UPI on the board site' }, { text: ', and to ' }, { blank: 'the caution', hint: 'save the receipt and pay before the due date' }, { text: '.' }] },
    professional: { scenario: 'Read the AI\'s summary above, then restate the asks.', aiResponse: 'The client wants the revised proposal by Friday, with expanded pricing and two case studies, and asks to move the kickoff call to next week.', task: 'Fill in the asks.',
      skeleton: [{ text: 'The client wants ' }, { blank: 'the main ask', hint: 'the revised proposal by Friday' }, { text: ', plus ' }, { blank: 'the extras', hint: 'expanded pricing, two case studies, and moving the call' }, { text: '.' }] },
  },
  // l2 — SPOT THE GAP: what the shown answer left out
  l2: {
    student: { scenario: 'Read the reply above. You lost the original mark sheet — notice what it skips.', aiResponse: 'Go to the university office, fill in the form, pay the fee, and collect the duplicate after 7 days.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It covers ' }, { blank: 'what it did say', hint: 'the form, the fee, and the 7-day wait' }, { text: ', but for a LOST original it never mentions ' }, { blank: 'the missing part', hint: 'attaching an FIR copy for the lost original' }, { text: '.' }] },
    everyday: { scenario: 'Read the reply above and notice what it assumes is already set up.', aiResponse: 'Open the gas agency app, tap Book Refill, confirm your address, and pay online. It arrives in 2-3 days.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It explains ' }, { blank: 'what it did say', hint: 'booking and paying in the app' }, { text: ', but assumes without checking ' }, { blank: 'the missing part', hint: 'that my registered mobile number is linked' }, { text: '.' }] },
    professional: { scenario: 'Read the reply above and find the step your process needs earlier.', aiResponse: 'Collect their GST details, sign the contract, add them to the payment system, and share the PO.', task: 'Fill in the gap.',
      skeleton: [{ text: 'It lists ' }, { blank: 'what it did say', hint: 'GST details, contract, payment setup, and PO' }, { text: ', but leaves out ' }, { blank: 'the missing step', hint: 'the compliance check before signing the contract' }, { text: '.' }] },
  },
  // l3 — CATCH THE FLAW: point to the exact error in the shown answer
  l3: {
    student: { scenario: 'Read the reply above — the maths is wrong. Pin down the error.', aiResponse: 'You have 5 subjects and 4 days, so study one per day and you will finish all of them comfortably.', task: 'Fill in the error.',
      skeleton: [{ text: 'It says ' }, { blank: 'the claim', hint: 'one subject a day finishes all of them' }, { text: ', but that is wrong because ' }, { blank: 'why', hint: '5 subjects cannot fit in 4 days at one per day' }, { text: '.' }] },
    everyday: { scenario: 'Read the reply above — the timing is off. Pin down the error.', aiResponse: 'At highway speed the 180 km takes about 2 hours, so leaving by 6 PM gives you plenty of time.', task: 'Fill in the error.',
      skeleton: [{ text: 'It claims ' }, { blank: 'the claim', hint: 'leaving at 6 PM is plenty of time' }, { text: ', but that is wrong because ' }, { blank: 'why', hint: 'a 2-hour drive from 6 PM only just reaches by 8, not comfortably before 7' }, { text: '.' }] },
    professional: { scenario: 'Read the reply above — the arithmetic is wrong. Pin down the error.', aiResponse: 'Each of the 3 phases takes 2 weeks, and running one after another, the project finishes in 3 weeks total.', task: 'Fill in the error.',
      skeleton: [{ text: 'It states ' }, { blank: 'the claim', hint: 'the project finishes in 3 weeks' }, { text: ', which is wrong because ' }, { blank: 'why', hint: 'three 2-week phases in sequence take 6 weeks' }, { text: '.' }] },
  },
  // l4 — CHECK THE CLAIM: flag the unsupported bit in the shown answer
  l4: {
    student: { scenario: 'Read the reply above. Notice the date it states as fact.', aiResponse: 'The national merit scholarship closes on October 15th every year, so you have plenty of time.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should not trust ' }, { blank: 'the unsupported claim', hint: 'the October 15th deadline stated as fact' }, { text: ' because ' }, { blank: 'why', hint: 'it gave no source' }, { text: '; I will ' }, { blank: 'how to verify', hint: 'check the official scholarship site' }, { text: '.' }] },
    everyday: { scenario: 'Read the reply above. Notice how certain it is about medicine.', aiResponse: 'Yes, it is completely safe to take both together, no problem at all.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should not rely on ' }, { blank: 'the claim', hint: 'that the two are completely safe together' }, { text: ' because ' }, { blank: 'why', hint: 'an AI should not be this certain about medicine' }, { text: '; I will ' }, { blank: 'what to do', hint: 'ask a pharmacist or doctor' }, { text: '.' }] },
    professional: { scenario: 'Read the reply above. Notice the figure it states without a source.', aiResponse: 'Services under ₹20 lakh a year are fully exempt from GST registration, so you do not need to register.', task: 'Fill in the check.',
      skeleton: [{ text: 'I should verify ' }, { blank: 'the claim', hint: 'the ₹20 lakh exemption threshold' }, { text: ' because ' }, { blank: 'why', hint: 'it cited nothing' }, { text: '; I will ' }, { blank: 'how', hint: 'confirm on the official GST portal' }, { text: '.' }] },
  },
  // l5 — JUDGE THE FIT: does the shown answer suit the need
  l5: {
    student: { scenario: 'You wanted a short warm email. Read what it produced above and judge the fit.', aiResponse: 'Dear Professor, I am writing to formally express my most sincere and profound gratitude for the recommendation letter you so graciously provided... [four formal paragraphs]', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'The answer is ' }, { blank: 'its quality', hint: 'well-written' }, { text: ', but it does not fit because ' }, { blank: 'the mismatch', hint: 'I wanted a short warm email, not a long formal letter' }, { text: '.' }] },
    everyday: { scenario: 'You wanted quick steps. Read what it gave above and judge the fit.', aiResponse: 'Stains form when pigment molecules bond to fabric fibres; the polarity determines the solvent... [a chemistry explanation]', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'It is ' }, { blank: 'its quality', hint: 'accurate' }, { text: ', but the wrong fit because ' }, { blank: 'the mismatch', hint: 'I asked what to do, not how stains work' }, { text: '.' }] },
    professional: { scenario: 'You wanted a one-line update. Read what it produced above and judge the fit.', aiResponse: 'Project Status Report — Background:... Analysis:... Next Steps:... [a half-page report]', task: 'Fill in the fit judgement.',
      skeleton: [{ text: 'The content is ' }, { blank: 'its quality', hint: 'thorough and correct' }, { text: ', but it does not fit because ' }, { blank: 'the mismatch', hint: 'a busy manager needs one line, not a report' }, { text: '.' }] },
  },
  // l6 — CORRECT IT: fix the shown answer
  l6: {
    student: { scenario: 'Read the plan above — it ignores that Physics is first and 3 days away. Correct it.', aiResponse: 'Here is a balanced 8-day plan: rotate through Maths, Physics, Chemistry, Biology and English, equal time each.', task: 'Fill in the correction.',
      skeleton: [{ text: 'You ' }, { blank: 'the problem', hint: 'spread subjects evenly and ignored that Physics is in 3 days' }, { text: ' — please ' }, { blank: 'the fix', hint: 'front-load Physics for the next 3 days, then the rest' }, { text: '.' }] },
    everyday: { scenario: 'Read the list above — it is over your ₹2000 budget. Correct it.', aiResponse: 'Weekly list: rice, dal, oil, vegetables, fruits, milk, eggs, snacks, spices. Estimated total: around ₹3200.', task: 'Fill in the correction.',
      skeleton: [{ text: 'The list ' }, { blank: 'the problem', hint: 'comes to ₹3200 and ignored my ₹2000 budget' }, { text: ' — please ' }, { blank: 'the fix', hint: 'redo it under ₹2000 and show each item price' }, { text: '.' }] },
    professional: { scenario: 'Read the email above — it left out the delivery date. Correct it.', aiResponse: 'Dear Client, thank you for your message. We are happy to proceed and look forward to working together. Best regards.', task: 'Fill in the correction.',
      skeleton: [{ text: 'The draft ' }, { blank: 'the problem', hint: 'left out the delivery date the client asked about' }, { text: ' — please ' }, { blank: 'the fix', hint: 'add a clear line stating the delivery date' }, { text: '.' }] },
  },
  // l7 — EXTRACT THE VALUE: sort the shown list
  l7: {
    student: { scenario: 'Read the 5 tips above — some useful, some filler. Sort them.', aiResponse: '1) Research the company. 2) Prepare thoughtful questions. 3) Practise speaking aloud. 4) Just be confident. 5) Remember to smile.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will keep ' }, { blank: 'the useful part', hint: 'researching, preparing questions, and practising aloud' }, { text: ' and drop ' }, { blank: 'the filler', hint: 'the vague "be confident" and "smile" tips' }, { text: '.' }] },
    everyday: { scenario: 'Read the 6 steps above — most safe, one risky. Sort them.', aiResponse: '1) Clear cache. 2) Close apps. 3) Delete unused apps. 4) Factory reset immediately to be safe. 5) Restart. 6) Update software.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will use ' }, { blank: 'the safe part', hint: 'clearing cache, closing apps, and restarting' }, { text: ' and skip ' }, { blank: 'the risky part', hint: 'the immediate factory reset' }, { text: '.' }] },
    professional: { scenario: 'Read the feedback above — mostly sharp, one bit outdated. Sort it.', aiResponse: 'Your structure is clear and action verbs are strong. Quantify achievements. Also add a lengthy "Career Objective" paragraph at the top.', task: 'Fill in what to keep/drop.',
      skeleton: [{ text: 'I will take ' }, { blank: 'the good advice', hint: 'the structure, action-verb, and quantifying feedback' }, { text: ' and ignore ' }, { blank: 'the outdated part', hint: 'the long "Career Objective" suggestion' }, { text: '.' }] },
  },
  // l8 — READ THE MEDIUM: verify AI-generated media (not detect it)
  l8: {
    student: { scenario: 'Read the group caption above. The photo could be real, old, or AI-made — you cannot tell by eye.', aiResponse: 'Group caption: "Our campus RIGHT NOW 🌊 100% real I was there, share fast!"', task: 'Fill in how you would verify it.',
      skeleton: [{ text: 'I cannot tell real from fake by looking, so I will not trust it yet — first I will ' }, { blank: 'the check', hint: 'trace where it first appeared, confirm via a trusted source' }, { text: '.' }] },
    everyday: { scenario: 'Read the forwarded message above. The face and voice can both be AI-faked now.', aiResponse: 'Forward: "BREAKING — free gas cylinders for all, claim before the link closes 👇"', task: 'Fill in how you would verify it.',
      skeleton: [{ text: 'A convincing video is not proof, so before sharing I will ' }, { blank: 'the check', hint: 'look for a real news source; the urgency to claim now is a scam sign' }, { text: '.' }] },
    professional: { scenario: 'Read the vendor note above. Fluent text and code can still be fabricated or subtly broken.', aiResponse: 'Vendor: "5-star review from a Fortune 500 client, plus AI-generated code — fully tested, just ship it."', task: 'Fill in how you would verify it.',
      skeleton: [{ text: 'Fluency is not proof, so I will ' }, { blank: 'the check', hint: 'confirm the review independently and run the code myself' }, { text: '.' }] },
  },
}