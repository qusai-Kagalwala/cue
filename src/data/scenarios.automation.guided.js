// src/data/scenarios.automation.guided.js
// v6 — AUTOMATION / WORKFLOW BRIEF guided tier: 8x3. Skeleton carries
// workflow-brief structure (trigger -> systems -> steps -> conditions ->
// output -> scope). Teaches describing a workflow to hand to n8n/Zapier/Make
// or an AI. Any sane fill yields a decent brief. AI-assisted, hand-curated.
// Indian-everyday framing where natural.

export const GUIDED_AUTOMATION = {
  // L1 — the trigger: what starts the workflow.
  l1: {
    student: { scenario: "A workflow needs a starting event, not just a wish. Say what kicks it off.", task: 'Fill in the trigger.',
      skeleton: [{ text: 'When ' }, { blank: 'the trigger', hint: 'a new assignment is posted on the portal' }, { text: ', ' }, { blank: 'the action', hint: 'add it to my to-do list' }, { text: '.' }] },
    everyday: { scenario: "Your shop reminder needs an event to fire on.", task: 'Fill in what starts it.',
      skeleton: [{ text: 'Every ' }, { blank: 'the trigger', hint: 'morning at 9am' }, { text: ', ' }, { blank: 'the action', hint: 'send me the list of pending payments' }, { text: '.' }] },
    professional: { scenario: "Automations start from a concrete event — name it.", task: 'Fill in the trigger.',
      skeleton: [{ text: 'When ' }, { blank: 'the trigger', hint: 'a customer submits the contact form' }, { text: ', ' }, { blank: 'the action', hint: 'create a lead in the CRM' }, { text: '.' }] },
  },
  // L2 — the systems: which apps/data are involved.
  l2: {
    student: { scenario: "The tool needs to know which apps to connect.", task: 'Fill in the systems.',
      skeleton: [{ text: 'When a new grade appears in ' }, { blank: 'source app', hint: 'the college portal' }, { text: ', add a row to ' }, { blank: 'destination app', hint: 'my Google Sheet' }, { text: '.' }] },
    everyday: { scenario: "Name the apps so the flow can be built.", task: 'Fill in the apps.',
      skeleton: [{ text: 'When I get a payment on ' }, { blank: 'source', hint: 'UPI' }, { text: ', log it in ' }, { blank: 'destination', hint: 'a Google Sheet' }, { text: '.' }] },
    professional: { scenario: "Specify each system in the chain.", task: 'Fill in the systems.',
      skeleton: [{ text: 'When an order comes in on ' }, { blank: 'source system', hint: 'Shopify' }, { text: ', notify the team in ' }, { blank: 'destination system', hint: 'Slack' }, { text: '.' }] },
  },
  // L3 — the steps, in order.
  l3: {
    student: { scenario: "One-line asks hide multiple steps — spell them out in order.", task: 'Fill in the ordered steps.',
      skeleton: [{ text: 'When a deadline is near, first ' }, { blank: 'step 1', hint: 'email me a reminder' }, { text: ', then ' }, { blank: 'step 2', hint: 'add it to my calendar' }, { text: '.' }] },
    everyday: { scenario: "Break the chore into clear steps.", task: 'Fill in the steps.',
      skeleton: [{ text: 'When a bill arrives, first ' }, { blank: 'step 1', hint: 'save the PDF to Drive' }, { text: ', then ' }, { blank: 'step 2', hint: 'add the amount to my expense sheet' }, { text: '.' }] },
    professional: { scenario: "Sequence the actions unambiguously.", task: 'Fill in the ordered steps.',
      skeleton: [{ text: 'On a new signup, first ' }, { blank: 'step 1', hint: 'add them to the mailing list' }, { text: ', then ' }, { blank: 'step 2', hint: 'send a welcome email' }, { text: ', finally ' }, { blank: 'step 3', hint: 'log it in the CRM' }, { text: '.' }] },
  },
  // L4 — the conditions / filters.
  l4: {
    student: { scenario: "Not every event should fire the flow — add the rule.", task: 'Fill in the condition.',
      skeleton: [{ text: 'Add the assignment to my list, but only if ' }, { blank: 'the condition', hint: 'it is due within 7 days' }, { text: '.' }] },
    everyday: { scenario: "Filter out the events you do not care about.", task: 'Fill in the filter.',
      skeleton: [{ text: 'Log the payment, but only if ' }, { blank: 'the condition', hint: 'it is over 500 rupees' }, { text: ', otherwise ' }, { blank: 'the else', hint: 'ignore it' }, { text: '.' }] },
    professional: { scenario: "Add the branch logic that keeps it clean.", task: 'Fill in the conditions.',
      skeleton: [{ text: 'Notify the team only if ' }, { blank: 'condition 1', hint: 'the order is over 5000 rupees' }, { text: ' and ' }, { blank: 'condition 2', hint: 'it is a first-time customer' }, { text: '.' }] },
  },
  // L5 — the output / final action / destination.
  l5: {
    student: { scenario: "Say exactly what the workflow should produce and where.", task: 'Fill in the output.',
      skeleton: [{ text: 'At the end, ' }, { blank: 'the output', hint: 'send me a summary message' }, { text: ' to ' }, { blank: 'the destination', hint: 'my WhatsApp' }, { text: '.' }] },
    everyday: { scenario: "Name the final result and where it lands.", task: 'Fill in the output.',
      skeleton: [{ text: 'Finally, ' }, { blank: 'the output', hint: 'add a row with date and amount' }, { text: ' in ' }, { blank: 'the destination', hint: 'the June sheet' }, { text: '.' }] },
    professional: { scenario: "Define the deliverable and destination precisely.", task: 'Fill in the output.',
      skeleton: [{ text: 'The result should be ' }, { blank: 'the output', hint: 'a formatted alert' }, { text: ' posted to ' }, { blank: 'the destination', hint: 'the #sales Slack channel' }, { text: '.' }] },
  },
  // L6 — the trigger framing / what kind of automation.
  l6: {
    student: { scenario: "Framing whether it is scheduled or event-based sets the whole shape.", task: 'Fill in the kind.',
      skeleton: [{ text: 'Set up a ' }, { blank: 'kind', hint: 'daily scheduled' }, { text: ' workflow that ' }, { blank: 'the job', hint: 'emails me my tasks for the day' }, { text: '.' }] },
    everyday: { scenario: "Say what type of automation this is.", task: 'Fill in the type.',
      skeleton: [{ text: 'I want an ' }, { blank: 'type', hint: 'event-based' }, { text: ' workflow: ' }, { blank: 'the job', hint: 'whenever a customer pays, thank them' }, { text: '.' }] },
    professional: { scenario: "Frame the automation pattern clearly.", task: 'Fill in the pattern.',
      skeleton: [{ text: 'Build a ' }, { blank: 'pattern', hint: 'webhook-triggered' }, { text: ' flow that ' }, { blank: 'the job', hint: 'routes new leads by region' }, { text: '.' }] },
  },
  // L7 — iterate: refine the workflow.
  l7: {
    student: { scenario: "The flow fired too often — add a limit.", task: 'Fill in the refinement.',
      skeleton: [{ text: 'Good, but it reminds me too much. Change it to ' }, { blank: 'the fix', hint: 'remind me only once, the day before' }, { text: '.' }] },
    everyday: { scenario: "It logged duplicates — fix the rule.", task: 'Fill in the correction.',
      skeleton: [{ text: 'It is logging the same payment twice. Add a check to ' }, { blank: 'the fix', hint: 'skip if the transaction ID already exists' }, { text: '.' }] },
    professional: { scenario: "The flow notified on noise — tighten the filter.", task: 'Fill in the tightened rule.',
      skeleton: [{ text: 'Too many alerts. Only notify when ' }, { blank: 'the tighter condition', hint: 'the order is over 10000 rupees' }, { text: '.' }] },
  },
  // L8 — scope: one clean workflow, briefly.
  l8: {
    student: { scenario: "Say the whole workflow in one tight line.", task: 'Fill in the compact brief.',
      skeleton: [{ text: 'When ' }, { blank: 'trigger', hint: 'a new assignment posts' }, { text: ', ' }, { blank: 'action', hint: 'add it to my calendar' }, { text: ' if ' }, { blank: 'condition', hint: 'it is graded' }, { text: '.' }] },
    everyday: { scenario: "One line: trigger, action, condition.", task: 'Fill in the lean brief.',
      skeleton: [{ text: 'On a ' }, { blank: 'trigger', hint: 'UPI payment' }, { text: ', ' }, { blank: 'action', hint: 'log it and send a receipt' }, { text: ' if ' }, { blank: 'condition', hint: 'over 100 rupees' }, { text: '.' }] },
    professional: { scenario: "A complete, scoped brief in one sentence.", task: 'Fill in the economical brief.',
      skeleton: [{ text: 'When ' }, { blank: 'trigger', hint: 'a form is submitted' }, { text: ', ' }, { blank: 'steps', hint: 'create a CRM lead and Slack the team' }, { text: ', only if ' }, { blank: 'condition', hint: 'it is a business email' }, { text: '.' }] },
  },
}