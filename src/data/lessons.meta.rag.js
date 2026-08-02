// src/data/lessons.meta.rag.js
// v6 — RAG / CONTEXT DESIGN curriculum. The same 8-lesson arc, taught for
// designing the context you feed an AI — the core skill behind retrieval and
// long-context prompting. Concept + takeaway + bad->good pair each. The thread:
// good answers come from good context, and the skill is curation — include what
// helps, cut what distracts. AI-assisted drafting, hand-curated.
// Weights: l1 task, l2 sources, l3 noise-cut, l4 structure, l5 on-target,
// l6 lens, l7 iterate, l8 right-amount.

export const LESSON_META_RAG = [
  {
    id: 'l1', order: 1, title: 'Frame the Task',
    concept:
      'Context without a task is just a pile of text. Before pasting anything, say what the AI should DO with it — summarize, compare, extract, answer. The task turns raw material into a question.',
    takeaway: 'Say what the AI should DO with the context — a task, not just a paste.',
    example: { bad: '[pastes notes] thoughts?', good: 'Using the notes below, make a 5-point revision summary of the water cycle in simple language' },
    tokenBudget: null,
  },
  {
    id: 'l2', order: 2, title: 'Give the Sources',
    concept:
      'The AI cannot read your mind or your files. If you reference "the reading" or "the data", you have to actually include it. The context you paste IS what it reasons over — nothing else exists to it.',
    takeaway: 'Include the actual material — the AI only knows what you give it.',
    example: { bad: 'summarize the article I mentioned', good: 'Summarize this article: "Rainfall rose 8% this monsoon, easing the water shortage in three districts..."' },
    tokenBudget: null,
  },
  {
    id: 'l3', order: 3, title: 'Cut the Noise',
    concept:
      'More context is not better context. Irrelevant material distracts the AI and buries your question. Say what to focus on and what to ignore, so the signal is not lost in the noise.',
    takeaway: 'Tell the AI what to focus on and what to ignore — trim the irrelevant.',
    example: { bad: '[pastes whole chapter] explain photosynthesis', good: 'From the chapter below, use only the section on photosynthesis and ignore the rest; explain it in three points' },
    tokenBudget: null,
  },
  {
    id: 'l4', order: 4, title: 'Structure the Context',
    concept:
      'When you paste several things at once, the AI can blur them together. Label and separate your inputs — sources, goals, constraints — so it knows which is which and does not mix them up.',
    takeaway: 'Label and separate your inputs so the AI does not blend them.',
    example: { bad: '[two sources pasted back to back] compare these', good: 'Source A: "cells have a nucleus". Source B: "plants also have chloroplasts". Compare what each says.' },
    tokenBudget: null,
  },
  {
    id: 'l5', order: 5, title: 'Stay On-Target',
    concept:
      'Including everything is not the same as including the right thing. Give the AI the material relevant to your question, not your entire folder — relevance beats volume every time.',
    takeaway: 'Include only the material relevant to your question — relevance over volume.',
    example: { bad: '[pastes all semester notes] whats the third law of motion', good: 'Regarding Newtons laws, use only the section on the third law; give one everyday example' },
    tokenBudget: null,
  },
  {
    id: 'l6', order: 6, title: 'Set the Lens',
    concept:
      'Who the AI "is" while reading your context shapes what it notices. A patient tutor, a careful accountant, a risk-spotting reviewer — the role directs how the same material gets read.',
    takeaway: 'Frame a lens for the context — the role shapes what the AI notices in it.',
    example: { bad: 'look at these receipts', good: 'As a careful accountant, review the receipts below and flag anything unusual or duplicated' },
    tokenBudget: null,
  },
  {
    id: 'l7', order: 7, title: 'Iterate the Context',
    concept:
      'When the answer is off, the fix is often the context, not the question. Swap in the right source, add the missing detail, or remove the stale one — then run it again.',
    takeaway: 'When an answer is wrong, fix the CONTEXT — swap, add, or trim a source.',
    example: { bad: 'no thats wrong, try again', good: 'That used the wrong section; use the second paragraph instead and here is the missing figure: revenue was 6L. Redo the summary.' },
    tokenBudget: null,
  },
  {
    id: 'l8', order: 8, title: 'The Right Amount',
    concept:
      'A senior context prompt is complete but lean: the few facts that decide the answer, not a data dump. Everything extra is something the AI must sift — give it the sweet spot.',
    takeaway: 'Give enough context to answer and no more — the sweet spot, not a dump.',
    example: { bad: '[pastes entire textbook page]', good: 'Only this: force = mass x acceleration. Give one real-life example a beginner would understand.' },
    tokenBudget: 70,
  },
]