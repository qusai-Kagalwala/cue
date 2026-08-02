// src/data/scenarios.rag.guided.js
// v6 — RAG / CONTEXT DESIGN guided tier: 8×3. Skeleton carries context-design
// structure (frame the task → give sources → cut noise → structure → stay
// on-target → right amount). Teaches WHAT context to feed an AI so it answers
// well. Any sane fill yields a decent context prompt. AI-assisted,
// hand-curated. Indian-everyday framing where natural.

export const GUIDED_RAG = {
  // L1 — frame the task: say what the AI should DO with the context.
  l1: {
    student: { scenario: "Pasting your notes with no instruction leaves the AI guessing what you want from them.", task: 'Fill in what it should do with the notes.',
      skeleton: [{ text: 'Using the notes below, ' }, { blank: 'the task', hint: 'make a 5-point revision summary' }, { text: ' for ' }, { blank: 'the topic', hint: 'the chapter on photosynthesis' }, { text: '. ' }, { blank: 'a detail', hint: 'keep it in simple language' }, { text: '.' }] },
    everyday: { scenario: "You paste a long WhatsApp thread but never say what you need out of it.", task: 'Fill in the task.',
      skeleton: [{ text: 'From the chat below, ' }, { blank: 'the task', hint: 'list who is bringing what to the party' }, { text: '. ' }, { blank: 'a detail', hint: 'ignore the small talk' }, { text: '.' }] },
    professional: { scenario: "You drop in a report and expect insight, but the AI needs the question first.", task: 'Fill in the framing.',
      skeleton: [{ text: 'Based on the report below, ' }, { blank: 'the task', hint: 'identify the top 3 risks' }, { text: ' and ' }, { blank: 'the output', hint: 'rank them by impact' }, { text: '.' }] },
  },
  // L2 — give the sources: include the actual material.
  l2: {
    student: { scenario: "You ask about 'the reading' but never paste it — the AI has nothing to work from.", task: 'Fill in the source.',
      skeleton: [{ text: 'Here is the source text: ' }, { blank: 'the material', hint: '"The mitochondria is the powerhouse of the cell…"' }, { text: '. Now ' }, { blank: 'the task', hint: 'explain it to a 10-year-old' }, { text: '.' }] },
    everyday: { scenario: "You want help replying to an email but don't include the email.", task: 'Fill in the material to work from.',
      skeleton: [{ text: 'Here is the email I got: ' }, { blank: 'the email', hint: '"Can you send the invoice by Friday?"' }, { text: '. Help me ' }, { blank: 'the task', hint: 'write a polite reply asking for more time' }, { text: '.' }] },
    professional: { scenario: "You reference 'the data' but paste none of it.", task: 'Fill in the source data.',
      skeleton: [{ text: 'Here is the data: ' }, { blank: 'the data', hint: 'Q1 ₹4L, Q2 ₹6L, Q3 ₹5L' }, { text: '. ' }, { blank: 'the task', hint: 'describe the trend in one line' }, { text: '.' }] },
  },
  // L3 — cut the noise: say what to ignore/focus on.
  l3: {
    student: { scenario: "Your pasted chapter has ten topics but you only need one.", task: 'Fill in what to focus on.',
      skeleton: [{ text: 'From the chapter below, ' }, { blank: 'focus', hint: 'use only the part about the water cycle' }, { text: ' and ' }, { blank: 'ignore', hint: 'ignore the rest' }, { text: '. ' }, { blank: 'task', hint: 'make three flashcards' }, { text: '.' }] },
    everyday: { scenario: "The forwarded message is full of jokes and one useful address.", task: 'Fill in the noise to cut.',
      skeleton: [{ text: 'From this message, ' }, { blank: 'extract', hint: 'pull out only the address' }, { text: ', ' }, { blank: 'ignore', hint: 'ignore all the jokes and forwards' }, { text: '.' }] },
    professional: { scenario: "The transcript has an hour of talk and one decision.", task: 'Fill in the focus.',
      skeleton: [{ text: 'In the transcript below, ' }, { blank: 'focus', hint: 'find only the final decision' }, { text: ', ' }, { blank: 'exclude', hint: 'skip the debate and side topics' }, { text: '. ' }, { blank: 'output', hint: 'state it in one sentence' }, { text: '.' }] },
  },
  // L4 — structure the context: sections, labels, order.
  l4: {
    student: { scenario: "Two pasted sources blur together and the AI mixes them up.", task: 'Fill in the structure.',
      skeleton: [{ text: 'Notes A: ' }, { blank: 'source A', hint: '"cells have a nucleus"' }, { text: '. Notes B: ' }, { blank: 'source B', hint: '"plants have chloroplasts"' }, { text: '. ' }, { blank: 'task', hint: 'compare the two' }, { text: '.' }] },
    everyday: { scenario: "You paste a recipe and a shopping list jumbled together.", task: 'Fill in the labels.',
      skeleton: [{ text: 'Recipe: ' }, { blank: 'the recipe', hint: '"boil rice, add dal"' }, { text: '. Have at home: ' }, { blank: 'inventory', hint: 'rice, onions' }, { text: '. ' }, { blank: 'task', hint: 'tell me what to buy' }, { text: '.' }] },
    professional: { scenario: "Multiple inputs need clear separation so nothing bleeds.", task: 'Fill in the sections.',
      skeleton: [{ text: 'Context:\n- Goal: ' }, { blank: 'goal', hint: 'cut costs 10%' }, { text: '\n- Constraint: ' }, { blank: 'constraint', hint: 'no layoffs' }, { text: '\nQuestion: ' }, { blank: 'question', hint: 'where can we save?' }, { text: '' }] },
  },
  // L5 — stay on-target: only relevant material.
  l5: {
    student: { scenario: "You paste your whole semester's notes to ask one question.", task: 'Fill in the on-target slice.',
      skeleton: [{ text: 'I only need ' }, { blank: 'the relevant part', hint: 'the section on Newton\u2019s laws' }, { text: ', specifically ' }, { blank: 'the exact topic', hint: 'the third law' }, { text: '. ' }, { blank: 'task', hint: 'give me one everyday example' }, { text: '.' }] },
    everyday: { scenario: "You dump a year of bank texts to ask about one month.", task: 'Fill in what\u2019s relevant.',
      skeleton: [{ text: 'From these, use ' }, { blank: 'the relevant part', hint: 'only the June transactions' }, { text: ' about ' }, { blank: 'the topic', hint: 'grocery spending' }, { text: '. ' }, { blank: 'task', hint: 'total it up' }, { text: '.' }] },
    professional: { scenario: "The doc is 40 pages; your question touches two of them.", task: 'Fill in the targeted context.',
      skeleton: [{ text: 'Regarding ' }, { blank: 'the exact topic', hint: 'the refund policy' }, { text: ', use ' }, { blank: 'the relevant section', hint: 'only section 4' }, { text: '. ' }, { blank: 'task', hint: 'summarize the customer\u2019s rights' }, { text: '.' }] },
  },
  // L6 — the framing / role for the context.
  l6: {
    student: { scenario: "The same notes explained by a strict examiner vs a friendly tutor read very differently.", task: 'Fill in the lens.',
      skeleton: [{ text: 'Act as ' }, { blank: 'the role', hint: 'a patient tutor' }, { text: ' and, using the notes below, ' }, { blank: 'task', hint: 'explain the tricky parts simply' }, { text: '.' }] },
    everyday: { scenario: "Who the AI 'is' shapes how it uses your context.", task: 'Fill in the persona.',
      skeleton: [{ text: 'As ' }, { blank: 'the role', hint: 'a careful accountant' }, { text: ', from the receipts below, ' }, { blank: 'task', hint: 'flag anything unusual' }, { text: '.' }] },
    professional: { scenario: "Set the expert lens so it reads the context the right way.", task: 'Fill in the expertise.',
      skeleton: [{ text: 'As ' }, { blank: 'the role', hint: 'a legal reviewer' }, { text: ', using the contract clause below, ' }, { blank: 'task', hint: 'point out any risk to us' }, { text: '.' }] },
  },
  // L7 — iterate: refine what context you gave.
  l7: {
    student: { scenario: "The answer was off because you gave the wrong section — fix the context.", task: 'Fill in the correction.',
      skeleton: [{ text: 'That used the wrong part. ' }, { blank: 'the fix', hint: 'use the second paragraph instead' }, { text: ', and ' }, { blank: 'add', hint: 'also here is the diagram caption' }, { text: '. Redo the summary.' }] },
    everyday: { scenario: "It missed a detail because you left it out — add it.", task: 'Fill in the missing context.',
      skeleton: [{ text: 'Good, but I forgot to include ' }, { blank: 'the missing bit', hint: 'the delivery date was moved to Monday' }, { text: '. ' }, { blank: 'the ask', hint: 'update the reply with that' }, { text: '.' }] },
    professional: { scenario: "The AI over-weighted an irrelevant source — trim it.", task: 'Fill in the trim.',
      skeleton: [{ text: 'Ignore ' }, { blank: 'the noise', hint: 'the outdated 2019 figures' }, { text: ' and rely only on ' }, { blank: 'the good source', hint: 'the latest quarter' }, { text: '. Redo the analysis.' }] },
  },
  // L8 — right amount: enough context, not a dump.
  l8: {
    student: { scenario: "You paste the whole textbook when three lines would do.", task: 'Fill in the lean context.',
      skeleton: [{ text: 'Just this: ' }, { blank: 'the essential source', hint: '"force = mass × acceleration"' }, { text: '. ' }, { blank: 'task', hint: 'give one real-life example' }, { text: '.' }] },
    everyday: { scenario: "One tight message beats forwarding the entire thread.", task: 'Fill in the compact context.',
      skeleton: [{ text: 'The key line is: ' }, { blank: 'the one line', hint: '"meeting moved to 4pm"' }, { text: '. ' }, { blank: 'task', hint: 'draft a one-line confirmation' }, { text: '.' }] },
    professional: { scenario: "Give the model the two figures that matter, not the whole spreadsheet.", task: 'Fill in the minimal context.',
      skeleton: [{ text: 'Only these: ' }, { blank: 'the key facts', hint: 'revenue ₹6L, cost ₹4L' }, { text: '. ' }, { blank: 'task', hint: 'state the margin' }, { text: '.' }] },
  },
}