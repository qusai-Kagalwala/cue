export default function TokensDemo() {
  const swatches = [
    ['stage', 'bg-stage'], ['surface', 'bg-surface'], ['raised', 'bg-raised'],
    ['line', 'bg-line'], ['cue', 'bg-cue'], ['cue-dim', 'bg-cue-dim'],
    ['over', 'bg-over'], ['good', 'bg-good'],
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-10 lg:px-0">

      {/* Type roles */}
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted">Type</p>
        <h1 className="font-display text-3xl font-bold text-cue lg:text-4xl">
          Cue
        </h1>
        <p className="text-muted">Your cue to ask better.</p>
        <p className="max-w-[65ch]">
          Space Grotesk carries all UI text. It should feel crisp at 375px
          and comfortable at 1440px without ever needing bold for emphasis.
        </p>
        <p className="font-mono text-sm text-muted">
          jetbrains mono — prompt textarea &amp; token counter · 42 tokens
        </p>
      </section>

      {/* Palette */}
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted">Palette</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {swatches.map(([name, cls]) => (
            <div key={name} className="space-y-1">
              <div className={`h-12 rounded-md border border-line ${cls}`} />
              <p className="font-mono text-[10px] text-muted">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Controls */}
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted">Controls</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-lg bg-cue px-5 py-2.5 font-medium text-stage transition-colors hover:bg-cue-bright">
            Submit prompt
          </button>
          <button className="rounded-lg border border-line bg-surface px-5 py-2.5 text-muted transition-colors hover:bg-raised hover:text-ink">
            Skip
          </button>
          <span className="rounded-full border border-cue-dim px-3 py-1 font-mono text-xs text-cue">
            ⚡ 3 day streak
          </span>
        </div>
      </section>

      {/* Input — the heart of the app */}
      <section className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-muted">Prompt input</p>
        <textarea
          rows={4}
          placeholder="Type your prompt…"
          className="w-full resize-none rounded-xl border border-line bg-raised p-4 font-mono text-sm leading-relaxed placeholder:text-faint focus:border-cue-dim"
        />
        <div className="flex justify-between font-mono text-xs">
          <span className="text-muted">est. tokens</span>
          <span className="text-cue">18 / 40</span>
        </div>
      </section>

    </div>
  )
}