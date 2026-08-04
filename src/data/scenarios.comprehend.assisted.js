// src/data/scenarios.comprehend.assisted.js
// v7.1 CAPSTONE — READING AI OUTPUT, assisted scenarios: 8x3. Middle tier.
// The AI's actual answer is shown (aiResponse); a clear task, but no skeleton
// and no hints — the learner structures the reading themselves.
// personas = student, everyday, professional.

export const ASSISTED_COMPREHEND = {
  l1: {
    student: { scenario: 'You asked an AI how to submit an assignment online. Read its reply.', aiResponse: 'Log in to the student portal, open the Assignments tab, click Upload, attach your PDF, and press Submit before the deadline. You will get a confirmation email.', task: 'Restate in your own words exactly what it told you to do.' },
    everyday: { scenario: 'You asked an AI how to pay your electricity bill online. Read its reply.', aiResponse: 'Go to the board site, open Quick Pay, enter your consumer number, and pay by UPI or card before the due date. Save the receipt.', task: 'Restate in your own words exactly what it told you to do.' },
    professional: { scenario: 'You asked an AI to summarise a client email. Read its summary.', aiResponse: 'The client wants the revised proposal by Friday, with expanded pricing and two case studies added, and asks to move the kickoff call to next week.', task: 'Restate in your own words exactly what the client wants.' },
  },
  l2: {
    student: { scenario: 'You lost your original mark sheet and asked how to get a duplicate. Read the reply and find what is missing.', aiResponse: 'Go to the university office, fill in the form, pay the fee, and collect the duplicate after 7 days.', task: 'Name the specific thing it left out that a lost original needs (an FIR copy).' },
    everyday: { scenario: 'You asked how to book a gas refill. Read the reply and find what it assumes.', aiResponse: 'Open the gas agency app, tap Book Refill, confirm your address, and pay online. It arrives in 2-3 days.', task: 'Name the setup step it assumes is already done but never tells you to check.' },
    professional: { scenario: 'You asked for vendor onboarding steps. Read the reply and find the missing step.', aiResponse: 'Collect their GST details, sign the contract, add them to the payment system, and share the PO.', task: 'Name the compliance step it skipped that must happen before signing.' },
  },
  l3: {
    student: { scenario: 'You asked an AI to plan your exam timetable. Read its reply.', aiResponse: 'You have 5 subjects and 4 days, so study one per day and you will finish all of them comfortably.', task: 'Point to the exact error in its reasoning.' },
    everyday: { scenario: 'You asked when to leave for a 7 PM event 180 km away. Read its reply.', aiResponse: 'At highway speed the 180 km takes about 2 hours, so leaving by 6 PM gives you plenty of time.', task: 'Point to the exact error in its reasoning.' },
    professional: { scenario: 'You asked an AI to work out a project timeline. Read its reply.', aiResponse: 'Each of the 3 phases takes 2 weeks, and running one after another, the project finishes in 3 weeks total.', task: 'Point to the exact error in its arithmetic.' },
  },
  l4: {
    student: { scenario: 'You asked about a scholarship deadline. Read its reply.', aiResponse: 'The national merit scholarship closes on October 15th every year, so you have plenty of time.', task: 'Flag the claim you should not trust as-is, and say how you would verify it.' },
    everyday: { scenario: 'You asked if a medicine is safe with your BP tablets. Read its reply.', aiResponse: 'Yes, it is completely safe to take both together, no problem at all.', task: 'Flag why you should not trust this as-is, and say what you would do.' },
    professional: { scenario: 'You asked about a GST rule for your invoice. Read its reply.', aiResponse: 'Services under ₹20 lakh a year are fully exempt from GST registration, so you do not need to register.', task: 'Flag the claim that needs verifying, and say how you would confirm it.' },
  },
  l5: {
    student: { scenario: 'You wanted a short warm thank-you email to a professor. Read what it produced.', aiResponse: 'Dear Professor, I am writing to formally express my most sincere and profound gratitude for the recommendation letter you so graciously provided... [four formal paragraphs]', task: 'Judge whether it fits your actual need, and say why or why not.' },
    everyday: { scenario: 'You wanted quick steps to remove a stain. Read what it gave.', aiResponse: 'Stains form when pigment molecules bond to fabric fibres; the polarity of the stain determines the solvent... [a chemistry explanation]', task: 'Judge whether it fits your actual need, and say why or why not.' },
    professional: { scenario: 'You wanted a one-line status update for a busy manager. Read what it produced.', aiResponse: 'Project Status Report — Background: the initiative began in Q2... Analysis:... Next Steps:... [a half-page report]', task: 'Judge whether it fits your actual need, and say why or why not.' },
  },
  l6: {
    student: { scenario: 'You asked for a revision plan; it ignored that Physics is first and 3 days away. Read it.', aiResponse: 'Here is a balanced 8-day plan: rotate through Maths, Physics, Chemistry, Biology and English, equal time each so nothing is neglected.', task: 'Write the follow-up that tells it exactly what to change.' },
    everyday: { scenario: 'You asked for a grocery list under ₹2000; it went over. Read it.', aiResponse: 'Weekly list: rice, dal, oil, vegetables, fruits, milk, eggs, snacks, spices. Estimated total: around ₹3200.', task: 'Write the follow-up that tells it exactly what to change.' },
    professional: { scenario: 'You asked for a client email; it left out the delivery date. Read it.', aiResponse: 'Dear Client, thank you for your message. We are happy to proceed and look forward to working together. Best regards.', task: 'Write the follow-up that tells it exactly what to change.' },
  },
  l7: {
    student: { scenario: 'You asked how to prepare for a group interview. Read its 5 tips.', aiResponse: '1) Research the company. 2) Prepare thoughtful questions. 3) Practise speaking aloud. 4) Just be confident. 5) Remember to smile.', task: 'Say which you will keep and use, and which you will drop.' },
    everyday: { scenario: 'You asked how to fix a slow phone. Read its 6 steps.', aiResponse: '1) Clear cache. 2) Close background apps. 3) Delete unused apps. 4) Factory reset immediately to be safe. 5) Restart. 6) Update software.', task: 'Say which you will keep and use, and which you will drop.' },
    professional: { scenario: 'You asked an AI to review your resume. Read its feedback.', aiResponse: 'Your structure is clear and action verbs are strong. Quantify achievements. Also add a lengthy "Career Objective" paragraph at the top.', task: 'Say which feedback you will keep and which you will drop.' },
  },
  l8: {
    student: { scenario: 'A photo of a "flooded campus today" is spreading in your class group. You cannot tell by eye if it is real, old, or AI-made.', aiResponse: 'Group caption: "Campus RIGHT NOW 🌊 100% real, share fast!"', task: 'Say how you would verify it before believing or forwarding — not how to "spot the fake".' },
    everyday: { scenario: 'A WhatsApp video of a leader "announcing free cylinders" arrives, forwarded by a relative. Face and voice can both be AI-faked now.', aiResponse: 'Forward: "BREAKING — free gas cylinders for all, claim before the link closes 👇"', task: 'Say how you would verify it before trusting or sharing — not how to detect the fake.' },
    professional: { scenario: 'A vendor sends a glowing "client testimonial" and AI-generated code they call "fully tested". Fluent text and code can still be fabricated or broken.', aiResponse: 'Vendor: "5-star review from a Fortune 500 client, plus AI-generated integration code — fully tested, just ship it."', task: 'Say how you would verify both before relying on them — fluency is not proof.' },
  },
}