# Cue — Decision Log
One line per architectural decision, written when made. Feeds the SRS.

- v1.0: docs deferred to final phase; this log is the mitigation.
- v2-1: canvas uses system fonts only — deterministic render over webfont prettiness; redraw kept but disabled (placebo buttons get greyed, not shipped live).
- v2-2b: pasted review content fenced + declared data-not-instructions; system channel outranks; injection attempts judged as material.
- v2-2c: review has no heuristic fallback — no honest offline verdict exists for a pair; failed reviews refund quota.
- v2-3a: existing saves see the Opening Act once (merge-over-defaults) — new content gets one showing.
- v2-3c: audition caps at Lead; skip stores nothing — absence means Understudy.- v7-1: the tenth stage (Reading / `comprehend`) flips the app's direction — reading AI output, not writing prompts; shipped as content pack + one rubric, zero screen changes, honouring the stage architecture.
- v7-2: the AI's answer is shown on screen (the "AI replied" block) for the Reading stage — the learner reacts to a real response rather than reconstructing what the AI said; guided skeletons scaffold the reaction, not the answer.
- v7-3: the "AI detection" idea was declined as a standalone stage — reliable detection isn't teachable and breeds false confidence; folded into the Reading finale ("Read the Medium") as media *verification* (check source, calibrate trust), not detection.
- v7-4: TOTAL_LESSONS stays 8 per stage — media verification became l8 rather than a 9th lesson, avoiding a global XP/certificate desync.
- v7-5: DP avatars redrawn from flat icons into 12 SVG *characters* (Wizard, Jester, Knight…); same function names kept so wiring is unchanged.
- v7-6: per-stage background motifs made theme-aware (darker ink on light mode) with an on/off toggle; doodles default on.
- v8-1: a landing page added as the front door (shows once via `landingSeen`), preserving zero-friction for return visitors; its theme toggle bypasses the Level-3 light-mode gate since a preview shouldn't be locked.