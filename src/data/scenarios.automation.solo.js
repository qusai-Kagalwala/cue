// src/data/scenarios.automation.solo.js
// v6 — AUTOMATION / WORKFLOW BRIEF solo scenarios: 8x3. The assessed tier. Real
// workflow-brief asks; personas = student, everyday user, professional.
// Teaches describing a workflow to hand to a tool or AI. AI-assisted drafting,
// hand-curated. Indian-everyday framing where natural.

export const SOLO_AUTOMATION = {
  // L1 — name the trigger
  l1: {
    student: { scenario: "You want to stop missing assignment deadlines, but 'keep me on top of my work' has no starting event for an automation to fire on.", task: 'Write a brief that names the trigger event.', hints: ['What sets it off?', 'A new post? A time?'] },
    everyday: { scenario: "You ask for shop reminders but never say what moment should set one off.", task: 'Write a brief stating exactly when the workflow starts.', hints: ['On what event?', 'When exactly?'] },
    professional: { scenario: "You describe a goal for the team but not the event behind it, so the automation has nothing to hook onto.", task: 'Write a brief that leads with a concrete trigger.', hints: ['The starting event.', 'What happens first?'] },
  },
  // L2 — name the systems
  l2: {
    student: { scenario: "You want your grades tracked but say 'put them somewhere', naming neither the portal nor the sheet.", task: 'Write a brief naming the source app and the destination.', hints: ['From which app?', 'To which app?'] },
    everyday: { scenario: "You want payments tracked automatically but never say where they come from or land.", task: 'Write a brief naming the systems involved.', hints: ['Which payment app?', 'Which sheet or tool?'] },
    professional: { scenario: "You describe a flow between 'our tools' without naming which ones, so it cannot be built.", task: 'Write a brief naming each app in the chain.', hints: ['Source system?', 'Destination system?'] },
  },
  // L3 — lay out the steps
  l3: {
    student: { scenario: "Your ask 'handle deadline reminders' actually hides several actions that need to happen in order.", task: 'Write a brief that lays out the steps in sequence.', hints: ['First do what?', 'Then what?'] },
    everyday: { scenario: "'Handle my bills' is really save, then log, then remind, but as one phrase it is unclear.", task: 'Write a brief that breaks it into ordered steps.', hints: ['Step one?', 'Step two?'] },
    professional: { scenario: "A new signup should trigger several actions in sequence, but you describe it as one vague step.", task: 'Write a brief that sequences each action unambiguously.', hints: ['In what order?', 'What is last?'] },
  },
  // L4 — set the conditions
  l4: {
    student: { scenario: "Your reminder fires on every assignment, including the ones you already finished, because nothing filters them.", task: 'Write a brief that adds the condition for when it runs.', hints: ['Run only when?', 'Skip when?'] },
    everyday: { scenario: "Every tiny payment gets logged and the sheet fills with noise.", task: 'Write a brief that filters so only what matters gets through.', hints: ['Over what amount?', 'What to ignore?'] },
    professional: { scenario: "The team is pinged for every order, big or small, drowning the important ones.", task: 'Write a brief with conditions that keep only the important events.', hints: ['Which orders matter?', 'What threshold?'] },
  },
  // L5 — define the output
  l5: {
    student: { scenario: "Your workflow does the work but delivers nothing you can see, so it feels like nothing happened.", task: 'Write a brief that says what the output is and where it goes.', hints: ['What is produced?', 'Delivered where?'] },
    everyday: { scenario: "The automation logs data but never notifies you, so you never know it ran.", task: 'Write a brief that defines a clear output and destination.', hints: ['Notify how?', 'Where does it land?'] },
    professional: { scenario: "The flow processes events but the result lands nowhere useful to the team.", task: 'Write a brief naming the deliverable and where it is posted.', hints: ['What deliverable?', 'Which channel?'] },
  },
  // L6 — frame the pattern
  l6: {
    student: { scenario: "You are unsure whether you want something scheduled or event-based, so the whole shape stays fuzzy.", task: 'Write a brief framing whether it is scheduled or event-triggered.', hints: ['On a schedule?', 'Or on an event?'] },
    everyday: { scenario: "A daily digest and a per-event alert are very different, and your ask does not say which.", task: 'Write a brief that names the automation pattern you want.', hints: ['Daily? Or per-event?', 'What rhythm?'] },
    professional: { scenario: "The flow could be a webhook, a schedule, or a poll, and the brief leaves it open.", task: 'Write a brief that frames the triggering pattern clearly.', hints: ['Which pattern?', 'What drives it?'] },
  },
  // L7 — iterate the flow
  l7: {
    student: { scenario: "Your reminder works but fires far too often, and you want to dial it back without rebuilding it.", task: 'Write a follow-up that adjusts how often it runs.', hints: ['How often instead?', 'When only?'] },
    everyday: { scenario: "The flow is logging the same payment twice and needs a de-duplication rule.", task: 'Write a follow-up that adds a check to prevent duplicates.', hints: ['Check what?', 'Skip when?'] },
    professional: { scenario: "The alerts are too noisy and you need to tighten the condition, not rebuild the flow.", task: 'Write a follow-up that narrows the trigger condition.', hints: ['Tighter how?', 'Which threshold?'] },
  },
  // L8 — scope it tight
  l8: {
    student: { scenario: "Your brief sprawls across many ideas; you want one tight workflow in a single line.", task: 'Write one lean brief: trigger, action, and a condition.', hints: ['One flow only.', 'Trigger, action, filter.'] },
    everyday: { scenario: "You are describing the automation on your phone between customers, so it must be short but complete.", task: 'Write one compact brief with trigger, action, and filter.', hints: ['Short but whole.', 'Nothing missing.'] },
    professional: { scenario: "One clean scoped workflow beats a tangle of half-described ones.", task: 'Write one economical brief: trigger, steps, condition, output.', hints: ['All four, tightly.', 'No sprawl.'] },
  },
}