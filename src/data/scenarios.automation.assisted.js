// src/data/scenarios.automation.assisted.js
// v6 — AUTOMATION / WORKFLOW BRIEF assisted tier: 8x3. Free textarea + live
// checklist (Trigger set - Systems named - Conditions set - Output defined -
// Steps clear - Scoped). One wrinkle each. Teaches describing a workflow to
// hand to n8n/Zapier/Make or an AI. AI-assisted, hand-curated. Indian-everyday
// framing where natural.

export const ASSISTED_AUTOMATION = {
  // L1 — the trigger
  l1: {
    student: { scenario: "You want an automation but describe it as 'help me keep track of assignments' — with no starting event, nothing can fire.", task: 'Write a brief that names the trigger event.' },
    everyday: { scenario: "You ask for 'reminders for my shop' but never say what moment should set a reminder off.", task: 'Write a brief that states exactly when the workflow starts.' },
    professional: { scenario: "You describe a goal but not the event behind it, so the automation has nothing to hook onto.", task: 'Write a brief that leads with a concrete trigger.' },
  },
  // L2 — the systems
  l2: {
    student: { scenario: "You say 'move my grades somewhere useful' without naming the portal or the sheet, so nothing can be connected.", task: 'Write a brief naming the source app and the destination app.' },
    everyday: { scenario: "You want payments 'tracked automatically' but never say where they come from or where they should go.", task: 'Write a brief naming the systems involved.' },
    professional: { scenario: "You describe a flow between 'our tools' without naming which ones, so it cannot be built.", task: 'Write a brief that names each app in the chain.' },
  },
  // L3 — the steps
  l3: {
    student: { scenario: "Your one-line ask actually hides three actions, and lumped together they are ambiguous.", task: 'Write a brief that lays out the steps in order.' },
    everyday: { scenario: "'Handle my bills' is really save-then-log-then-remind, but as one phrase it is unclear.", task: 'Write a brief that breaks the chore into ordered steps.' },
    professional: { scenario: "A signup should do several things in sequence, but you describe it as one vague action.", task: 'Write a brief that sequences each step unambiguously.' },
  },
  // L4 — the conditions
  l4: {
    student: { scenario: "Your reminder fires on every assignment, including ones already done, because there is no filter.", task: 'Write a brief that adds the condition for when it should run.' },
    everyday: { scenario: "Every tiny payment gets logged and the sheet fills with noise, because nothing filters the small ones.", task: 'Write a brief that adds a filter so only what matters gets through.' },
    professional: { scenario: "The team gets pinged for every order, big or small, drowning the real ones.", task: 'Write a brief with conditions that keep only the important events.' },
  },
  // L5 — the output
  l5: {
    student: { scenario: "Your workflow does the work but never delivers anything you can see, so it feels like nothing happened.", task: 'Write a brief that says what the final output is and where it goes.' },
    everyday: { scenario: "The automation logs data but you never told it to notify you, so you never know it ran.", task: 'Write a brief that defines a clear output and destination.' },
    professional: { scenario: "The flow processes events but the result lands nowhere useful to the team.", task: 'Write a brief that names the deliverable and where it should be posted.' },
  },
  // L6 — the automation pattern
  l6: {
    student: { scenario: "You are not sure whether you want something scheduled or event-based, so the whole shape stays fuzzy.", task: 'Write a brief that frames whether it is scheduled or event-triggered.' },
    everyday: { scenario: "A daily digest and a per-event alert are very different, and yours does not say which.", task: 'Write a brief that names the automation pattern you want.' },
    professional: { scenario: "The flow could be a webhook, a schedule, or a poll, and the brief leaves it open.", task: 'Write a brief that frames the triggering pattern clearly.' },
  },
  // L7 — iterate
  l7: {
    student: { scenario: "Your reminder works but fires way too often, and you need to dial it back without rebuilding it.", task: 'Write a follow-up that adjusts how often the workflow runs.' },
    everyday: { scenario: "The flow is logging the same payment twice and you need to add a de-duplication rule.", task: 'Write a follow-up that adds a check to prevent duplicates.' },
    professional: { scenario: "The alerts are too noisy and you need to tighten the condition, not rebuild the flow.", task: 'Write a follow-up that narrows the trigger condition.' },
  },
  // L8 — scope
  l8: {
    student: { scenario: "Your brief sprawls across many ideas; you want one tight workflow said in a single line.", task: 'Write one lean brief: trigger, action, and a condition.' },
    everyday: { scenario: "You are describing the automation on your phone between customers and it has to be short but complete.", task: 'Write one compact brief with trigger, action, and filter.' },
    professional: { scenario: "One clean scoped workflow beats a tangle of half-described ones.", task: 'Write one economical brief: trigger, steps, condition, output.' },
  },
}