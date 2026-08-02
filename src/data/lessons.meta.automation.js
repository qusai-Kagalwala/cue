// src/data/lessons.meta.automation.js
// v6 — AUTOMATION / WORKFLOW BRIEF curriculum. The same 8-lesson arc, taught
// for describing a workflow well enough to hand to n8n, Zapier, Make, or an AI
// that builds it. Concept + takeaway + bad->good pair each. The thread:
// automation is decomposition and clarity — a good brief can be built from the
// description alone, with no guessing. Teaches describing, never running.
// AI-assisted drafting, hand-curated. Weights: l1 trigger, l2 systems,
// l3 steps, l4 conditions, l5 output, l6 pattern, l7 iterate, l8 scope.

export const LESSON_META_AUTOMATION = [
  {
    id: 'l1', order: 1, title: 'Name the Trigger',
    concept:
      'Every automation starts from an event. Before anything else, say what sets it off — a new email, a payment, a time of day. Without a trigger there is nothing for the workflow to hook onto.',
    takeaway: 'Start with the trigger — the event that sets the workflow off.',
    example: { bad: 'help me keep track of payments', good: 'When a customer pays on UPI, log the payment to a Google Sheet' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Name the Systems',
    concept:
      'A workflow connects apps. Name the source and the destination — the portal, the sheet, the chat app — so the tool knows exactly what to wire together. Vague "somewhere" cannot be built.',
    takeaway: 'Name the apps involved — the source and the destination.',
    example: { bad: 'move my grades somewhere useful', good: 'When a new grade appears in the college portal, add a row to my Google Sheet' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Lay Out the Steps',
    concept:
      'A one-line ask often hides several actions. Spell them out in order — first this, then that — so the workflow is unambiguous and nothing is left to guess.',
    takeaway: 'Break the workflow into ordered steps — first, then, finally.',
    example: { bad: 'handle new signups', good: 'On a new signup, first add them to the mailing list, then send a welcome email, finally log it in the CRM' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Set the Conditions',
    concept:
      'Not every event should fire the flow. Add the filters — only if, unless, over a threshold — so the automation runs on what matters and ignores the rest.',
    takeaway: 'Add conditions so the flow runs only when it should.',
    example: { bad: 'log every payment', good: 'Log the payment, but only if it is over 500 rupees; otherwise ignore it' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Define the Output',
    concept:
      'A workflow that does work but delivers nothing feels broken. Say what the final result is and where it goes — a message to WhatsApp, a row in a sheet, an alert in a channel.',
    takeaway: 'Define the output — what the flow produces, and where it lands.',
    example: { bad: 'do something with the order', good: 'When the order is processed, post a formatted alert to the #sales Slack channel' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Frame the Pattern',
    concept:
      'Scheduled and event-based automations have very different shapes. Frame which one you want — a daily digest, a per-event reaction, a webhook — so the whole design follows from it.',
    takeaway: 'Frame the pattern — scheduled, event-based, or webhook-triggered.',
    example: { bad: 'send me my tasks', good: 'Set up a daily scheduled workflow that emails me my tasks for the day at 8am' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Iterate the Flow',
    concept:
      'The first version rarely behaves perfectly — it fires too often, logs duplicates, or alerts on noise. Refine one rule at a time rather than rebuilding the whole thing.',
    takeaway: 'Refine one rule at a time — frequency, a filter, a de-dupe check.',
    example: { bad: 'it is too noisy, fix it', good: 'It logs the same payment twice; add a check to skip if the transaction ID already exists' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'Scope It Tight',
    concept:
      'A senior brief is one clean workflow said in a single line: trigger, action, condition, output. No tangle, no sprawl — just enough that it could be built exactly as written.',
    takeaway: 'Say one scoped workflow tightly — trigger, action, condition, output.',
    example: { bad: 'a big automation that does everything for my shop', good: 'On a UPI payment over 100 rupees, log it to the sheet and send a WhatsApp receipt' },
    tokenBudget: 60,
  },
]