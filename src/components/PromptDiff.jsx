// src/components/PromptDiff.jsx
// v2-4b — Word-level before/after diff, hand-rolled LCS. No diff library
// (tripwire). Input sizes are tiny (audition prompts cap at 1000 chars),
// so the O(n·m) table is nothing.
//
// Rendering philosophy: two panes, not one merged stream — learners read
// "what I wrote then" and "what I write now" as separate artifacts, with
// removals struck in the left pane and additions lit amber in the right.
// Side by side ≥sm, stacked on mobile.

function tokenize(text) {
  return (text ?? '').trim().split(/\s+/).filter(Boolean)
}

/** Classic LCS walk → per-side token ops. */
function diffWords(before, after) {
  const a = tokenize(before)
  const b = tokenize(after)
  const m = a.length
  const n = b.length

  // LCS length table
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] =
        a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  // Walk: build both panes' token lists
  const beforeTokens = [] // { word, removed }
  const afterTokens = []  // { word, added }
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      beforeTokens.push({ word: a[i], removed: false })
      afterTokens.push({ word: b[j], added: false })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      beforeTokens.push({ word: a[i], removed: true })
      i++
    } else {
      afterTokens.push({ word: b[j], added: true })
      j++
    }
  }
  while (i < m) beforeTokens.push({ word: a[i++], removed: true })
  while (j < n) afterTokens.push({ word: b[j++], added: true })

  return { beforeTokens, afterTokens }
}

function Pane({ label, tokens, empty, highlightClass, mutedWhenChanged }) {
  return (
    <div className="min-w-0 flex-1 space-y-1.5">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        {label}
      </p>
      <p className="rounded-lg border border-line bg-raised p-3 font-mono text-sm leading-relaxed">
        {tokens.length === 0 ? (
          <span className="text-faint">{empty}</span>
        ) : (
          tokens.map((t, idx) => (
            <span
              key={idx}
              className={
                (t.removed || t.added ? highlightClass : mutedWhenChanged) +
                ' inline'
              }
            >
              {t.word}
              {idx < tokens.length - 1 ? ' ' : ''}
            </span>
          ))
        )}
      </p>
    </div>
  )
}

export default function PromptDiff({ before, after }) {
  const { beforeTokens, afterTokens } = diffWords(before, after)

  return (
    <div className="flex flex-col gap-3 text-left sm:flex-row">
      <Pane
        label="then · the audition"
        tokens={beforeTokens}
        empty="(you submitted blank — brave)"
        highlightClass="text-faint line-through decoration-over/60"
        mutedWhenChanged="text-muted"
      />
      <Pane
        label="now · the callback"
        tokens={afterTokens}
        empty="(blank)"
        highlightClass="rounded-sm bg-cue/15 px-0.5 text-cue"
        mutedWhenChanged="text-ink"
      />
    </div>
  )
}