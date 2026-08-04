// src/screens/Landing.jsx
// The front door. Opens at the URL before the app, introduces Cue (the theatre
// "prompter" whose whole job is giving the right cue), a little on prompting
// itself, a quote, and an "about" — then a button into the course. Its own
// light/dark toggle so a first-time visitor can set the mood before entering.
// Uses the app's CSS variables, so theming is automatic. Zero-friction is
// preserved: this shows once (landingSeen flag), and returning visitors skip it.

import { useProgress } from '../hooks/useProgress'

// Theatre masks — the comedy/tragedy pair, the universal sign of the stage.
// Matches Cue's avatar/motif world and actually reads at small sizes.
function StageMark() {
  return (
    <svg viewBox="0 0 96 64" className="h-16 w-auto" role="img" aria-label="Theatre masks">
      {/* comedy mask (left) */}
      <path d="M10 14 Q10 8 18 8 L36 8 Q42 8 42 16 L42 34 Q42 52 26 52 Q10 52 10 34 Z"
        fill="var(--color-cue)" stroke="var(--color-stage)" stroke-width="2" />
      <path d="M18 24 Q21 21 25 24 M31 24 Q34 21 37 24"
        stroke="var(--color-stage)" stroke-width="2.4" fill="none" stroke-linecap="round" />
      <path d="M17 36 Q26 46 35 36 Q26 40 17 36 Z" fill="var(--color-stage)" />
      {/* tragedy mask (right) */}
      <path d="M54 14 Q54 8 62 8 L80 8 Q86 8 86 16 L86 34 Q86 52 70 52 Q54 52 54 34 Z"
        fill="var(--color-cue-bright)" stroke="var(--color-stage)" stroke-width="2" />
      <path d="M61 26 L67 26 M73 26 L79 26"
        stroke="var(--color-stage)" stroke-width="2.4" stroke-linecap="round" />
      <path d="M63 42 Q70 36 77 42 Q70 40 63 42 Z" fill="var(--color-stage)" />
    </svg>
  )
}

export default function Landing({ onEnter }) {
  const { theme, setTheme } = useProgress()
  const isLight = theme === 'light'
  // light is normally a Level-3 unlock; on the landing we let anyone preview it
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light', true)

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-stage text-ink">
      {/* ambient stage glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cue/10 blur-[100px]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cue/5 blur-[90px]" />
      </div>

      {/* top bar: wordmark + theme toggle */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl font-semibold text-cue">Cue</span>
        <button
          onClick={toggleTheme}
          className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-cue-dim hover:text-cue"
          aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        >
          {isLight ? '☾ dark' : '☀ light'}
        </button>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-3xl px-6 pb-8 pt-10 text-center sm:pt-16">
        <div className="mb-6 flex justify-center">
          <StageMark />
        </div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-faint">
          a stage for talking to AI
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-7xl">
          Your cue to<br />
          <span className="text-cue">ask better.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          In the theatre, the <em>cue</em> is the prompter's whisper — the words
          that pull the right performance out of an actor. Talking to AI is the
          same craft. Cue teaches it, one line at a time.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <button
            onClick={onEnter}
            className="group rounded-xl bg-cue px-8 py-3.5 font-display text-base font-semibold text-stage shadow-lg shadow-cue/20 transition-transform hover:scale-[1.03] active:scale-[0.99]"
          >
            Take the stage
            <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <span className="font-mono text-xs text-faint">
            no signup · start writing in seconds
          </span>
        </div>
      </section>

      {/* ---------- WHY PROMPTING ---------- */}
      <section className="mx-auto mt-8 max-w-3xl px-6">
        <div className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cue">
            why this matters
          </p>
          <p className="text-lg leading-relaxed text-ink">
            AI does what you ask — not what you meant. The difference between a
            vague request and a clear one is the difference between a shrug and
            exactly what you needed. That gap is a skill, and like any skill, it
            can be practised.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The word <span className="text-ink">prompt</span> comes from the
            Latin <em>promptus</em> — “brought forth, ready.” A good prompt
            brings the answer forth. Cue is where you learn to make one ready.
          </p>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="mx-auto my-14 max-w-2xl px-6 text-center">
        <blockquote className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
          “The right word may be effective, but no word was ever as effective as
          a rightly timed pause.”
        </blockquote>
        <cite className="mt-4 block font-mono text-xs uppercase tracking-widest not-italic text-faint">
          — Mark Twain
        </cite>
      </section>

      {/* ---------- THE MOMENT (AI literacy) ---------- */}
      <section className="mx-auto max-w-3xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cue">
          the moment we're in
        </p>
        <h2 className="font-display text-3xl font-semibold">
          Everyone can use AI. Few use it well.
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          In a couple of years, AI went from a novelty to something people lean
          on for work, study, and daily life. But the tools arrived faster than
          the skill of using them. Most people type a vague line, get a vague
          answer, and conclude the AI “isn't that smart.” The truth is closer to
          home: a model can only be as clear as the request it's given.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          And it cuts both ways. As AI answers get more fluent and confident,
          telling a <span className="text-ink">good</span> answer from a
          convincing-but-wrong one becomes its own skill — one that matters more,
          not less, as the models improve. Asking well and reading well are the
          two halves of AI literacy. Cue teaches both.
        </p>
      </section>

      {/* ---------- ABOUT CUE ---------- */}
      <section className="mx-auto max-w-3xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cue">
          about Cue
        </p>
        <h2 className="font-display text-3xl font-semibold">
          Ten stages, from asking to reading
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          You write prompts for everyday scenarios and get scored with real
          feedback — Cue coaches you to ask better, it never answers for you.
          The path runs in three acts:
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-line bg-surface/50 p-5">
            <h3 className="font-display font-semibold text-ink">Everyday craft</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Text, image, video, and audio — the prompting most people do first.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-5">
            <h3 className="font-display font-semibold text-ink">Directing AI</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Briefing coding agents, designing context, describing automations,
              and writing the standing rules that govern an assistant.
            </p>
          </div>
          <div className="rounded-xl border border-cue-dim bg-cue/5 p-5">
            <h3 className="font-display font-semibold text-cue">
              The capstone — reading the AI
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              The final act flips the craft around: not making AI understand
              you, but understanding <em>it</em> — verifying, correcting, and
              staying clear-eyed about AI-made photos, video, and code.
            </p>
          </div>
        </div>

        <p className="mt-8 leading-relaxed text-muted">
          It runs entirely in your browser — no account, nothing to install,
          your work stays on your device. Free to use, and yours to keep.
        </p>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cue">
          how it works
        </p>
        <h2 className="font-display text-3xl font-semibold">
          Write, get scored, ask better
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface/50 p-5">
            <p className="font-display text-2xl text-cue">1</p>
            <h3 className="mt-2 font-display font-semibold text-ink">A real scenario</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              You're handed an everyday situation and asked to prompt for it —
              no blank page, no jargon.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-5">
            <p className="font-display text-2xl text-cue">2</p>
            <h3 className="mt-2 font-display font-semibold text-ink">Honest feedback</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Your prompt is scored across six things that make prompts work,
              with the one change that would help most.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-5">
            <p className="font-display text-2xl text-cue">3</p>
            <h3 className="mt-2 font-display font-semibold text-ink">You improve</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Try again, climb the ranks, and carry the habit into your own
              real conversations with AI.
            </p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-muted">
          Every lesson comes in three levels of help — fully guided, lightly
          assisted, or on your own — so a first-timer and a power user both find
          the right footing. Cue coaches; it never writes the prompt for you.
        </p>
      </section>

      {/* ---------- WHO IT'S FOR ---------- */}
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cue">
          who it's for
        </p>
        <h2 className="font-display text-3xl font-semibold">
          Built for everyone who talks to AI
        </h2>
        <div className="mt-6 space-y-3">
          <p className="leading-relaxed text-muted">
            <span className="text-ink">Students</span> — get clearer help with
            study, writing, and research instead of generic answers.
          </p>
          <p className="leading-relaxed text-muted">
            <span className="text-ink">Everyday users</span> — from drafting a
            message to sorting out a bill, ask in a way that actually gets it done.
          </p>
          <p className="leading-relaxed text-muted">
            <span className="text-ink">Professionals</span> — brief coding
            agents, design context, and write system instructions with real craft.
          </p>
        </div>
        <p className="mt-6 leading-relaxed text-faint">
          The lessons are set in everyday life — bills, forms, messages, budgets —
          so the skill transfers straight to the things you actually do.
        </p>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          The stage is set.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your first lesson is one tap away. No sign-up, no waiting.
        </p>
        <button
          onClick={onEnter}
          className="group mt-7 rounded-xl bg-cue px-8 py-3.5 font-display text-base font-semibold text-stage shadow-lg shadow-cue/20 transition-transform hover:scale-[1.03] active:scale-[0.99]"
        >
          Begin
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
        </button>
      </section>

      {/* footer */}
      <footer className="border-t border-line/60 py-8 text-center">
        <p className="font-mono text-xs text-faint">
          Cue · your cue to ask better · built by Qusai Kagalwala
        </p>
      </footer>
    </div>
  )
}