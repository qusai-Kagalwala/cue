// src/data/modelGuide.js
// The curated model guide for the Prompt-Drafting Studio. YOU maintain this —
// it's data, not an AI call, so it never drifts out of date behind an old
// model cutoff. When a new model lands or a recommendation changes, edit this
// one file.
//
// Per stage: the models worth knowing, when each shines, and one concrete
// "how to prompt it well" tip. Keep entries short and honest — this is
// orientation, not a full review.
//
// Last reviewed: update this date whenever you revise the list.
export const MODEL_GUIDE_REVIEWED = '2026-07'

export const MODEL_GUIDE = {
  text: {
    blurb: 'General writing, reasoning, and chat.',
    models: [
      {
        name: 'Claude',
        best: 'Long-form writing, careful reasoning, following detailed instructions.',
        tip: 'Give it a role and constraints up front; it rewards structure and explicit tone.',
      },
      {
        name: 'ChatGPT (GPT)',
        best: 'Broad general tasks, brainstorming, quick drafts.',
        tip: 'Ask for a format ("a table", "5 bullets under 12 words") to get tidy output.',
      },
      {
        name: 'Gemini',
        best: 'Tasks that lean on up-to-date info or Google integration.',
        tip: 'Be explicit about recency ("as of this year") when the answer can go stale.',
      },
    ],
  },
  image: {
    blurb: 'Still images, art, photos, illustration.',
    models: [
      {
        name: 'Midjourney',
        best: 'Stylised, artistic, striking visuals.',
        tip: 'Lead with subject, then style, lighting, and composition; use --ar for aspect ratio.',
      },
      {
        name: 'DALL·E',
        best: 'Following a specific described scene faithfully.',
        tip: 'Describe the scene in plain sentences; it handles literal instructions well.',
      },
      {
        name: 'Flux / Imagen',
        best: 'Photorealism and accurate text-in-image.',
        tip: 'Name the camera, lens, and lighting for photo-real results.',
      },
    ],
  },
  video: {
    blurb: 'Short clips, motion, animation.',
    models: [
      {
        name: 'Veo',
        best: 'Coherent, higher-fidelity short clips.',
        tip: 'Describe the shot AND the motion — camera move, subject action, pacing.',
      },
      {
        name: 'Runway',
        best: 'Creative control, image-to-video, editing.',
        tip: 'Start from a strong first frame, then describe how it should move.',
      },
      {
        name: 'Kling',
        best: 'Realistic motion and longer sequences.',
        tip: 'Keep one clear action per prompt; over-stuffed motion gets muddy.',
      },
    ],
  },
  audio: {
    blurb: 'Music, voice, sound.',
    models: [
      {
        name: 'Suno',
        best: 'Full songs with vocals from a description.',
        tip: 'Specify genre, mood, tempo, and instruments; put lyrics in their own field.',
      },
      {
        name: 'Udio',
        best: 'High-fidelity music, fine stylistic control.',
        tip: 'Layer tags (genre + era + mood) rather than one vague label.',
      },
      {
        name: 'ElevenLabs',
        best: 'Realistic speech and voice-overs.',
        tip: 'Describe delivery — pace, emotion, pauses — not just the words.',
      },
    ],
  },
  code: {
    blurb: 'Code generation, debugging, refactoring.',
    models: [
      {
        name: 'Claude',
        best: 'Larger changes, reasoning about a codebase, careful refactors.',
        tip: 'Give the signature, constraints, and an example input/output.',
      },
      {
        name: 'GitHub Copilot',
        best: 'In-editor completion and small functions.',
        tip: 'Write a clear comment describing intent right above where you want code.',
      },
      {
        name: 'ChatGPT (GPT)',
        best: 'Explaining errors, quick scripts, one-off snippets.',
        tip: 'Paste the exact error and the relevant code; state language and version.',
      },
    ],
  },
  agent: {
    blurb: 'Briefing an autonomous coding agent that edits real files.',
    models: [
      {
        name: 'Claude Code',
        best: 'Multi-file changes, reasoning across a codebase, careful agentic edits.',
        tip: 'State the files, firm guardrails (what not to touch), and when to stop and ask.',
      },
      {
        name: 'Cursor',
        best: 'In-editor agentic edits with the repo as live context.',
        tip: 'Point it at the exact files; give acceptance criteria, not just a goal.',
      },
      {
        name: 'GitHub Copilot (agent)',
        best: 'Scoped tasks and PRs inside a known repo.',
        tip: 'Keep one task per brief; name the output shape — a diff, tests, a PR.',
      },
    ],
  },
}

/** Guide for a stage, defensively falling back to text. */
export function guideFor(stageId) {
  return MODEL_GUIDE[stageId] ?? MODEL_GUIDE.text
}