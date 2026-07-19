#!/usr/bin/env python3
"""
scripts/calibrate.py — Cue rubric calibration (v2-17a). OFFLINE tool.

Fits the six rubric dimensions against REAL Gemini scores and proposes
new LESSON_WEIGHTS constants for src/lib/rubric.js.

DATA SOURCES (in order of value):
  1. The prompt library inside your export (prompt + real score + lesson)
     — note: ≥58 scores only, so the sample skews high; the script says so.
  2. attempts entries that carry a `prompt` field (the logger rider ships
     with this ticket — history grows calibratable from today).
  3. Optional extra_pairs.csv beside this script:
         lessonId,score,prompt
     Collect low/mid scores here during testing to balance source 1.

USAGE:
  python scripts/calibrate.py cue-progress-2026-XX-XX.json

OUTPUT:
  - proposed LESSON_WEIGHTS printed as a paste-ready JS block
  - docs/calibration-findings.md written beside the export

Pure stdlib. The regression is ridge via normal equations — six features,
tiny n, nothing fancier is honest.
"""

import csv
import json
import math
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

# ---------------------------------------------------------------- detectors
# Faithful ports of src/lib/rubric.js. ONE divergence, documented: the
# specificity detector's scenario-keyword overlap needs the lesson text,
# which exports don't carry — so specificity here = digits + named things
# only. Findings note the limitation.

ROLE = re.compile(
    r"\b(act as|you are|you're a|as an? (expert|teacher|doctor|examiner|chef|coach|"
    r"physiotherapist|engineer|lawyer|consultant|professional)|imagine you('re| are)|"
    r"pretend (to be|you)|role of)\b", re.I)

CONSTRAINT = re.compile(
    r"\b(under|at most|no more than|maximum|max|limit(ed)? to|within|only|exactly|"
    r"at least|avoid|don't|do not|never|must(n't| not)?|without|"
    r"no ([a-z]+ing|jargon|emojis?))\b|\b\d+\s?(words?|lines?|points?|steps?|minutes?|"
    r"days?|km|kilometres?|rupees?|tokens?|₹)", re.I)

FORMAT = re.compile(
    r"\b(list|bullet(s| points)?|table|columns?|steps?|numbered|flashcards?|q&a|format|"
    r"template|one[- ]lin(e|er)|paragraphs?|summar(y|ise|ize)|email|subject line|"
    r"headings?|for example|e\.g\.|like this|such as)\b"
    r'|["\u201c\'\u2018][^"\u201d\'\u2019]{8,}["\u201d\'\u2019]', re.I)


def clamp01(n): return min(1.0, max(0.0, n))


def detect(prompt: str) -> dict:
    p = prompt.strip()
    sentences = [s for s in re.split(r"[.!?]+", p) if len(s.strip()) > 12]
    context = clamp01(
        (0.35 if re.search(r"\b(my|our|i am|i'm|i have|we are|we're)\b", p, re.I) else 0)
        + (0.25 if re.search(r"\d", p) else 0)
        + clamp01(len(sentences) / 3) * 0.4)
    constraints = clamp01(len(CONSTRAINT.findall(p)) / 2)
    spec = clamp01(
        (0.2 if re.search(r"\d", p) else 0)
        + (0.2 if re.search(r"\b[A-Z][a-z]{3,}", p[1:]) else 0)
        + 0.3)  # flat stand-in for the overlap term (see findings)
    chars = len(p)
    length = 0.1 if chars < 25 else 1.0 if chars <= 500 else clamp01(1 - (chars - 500) / 1000)
    return {
        "role": 1.0 if ROLE.search(p) else 0.0,
        "context": context,
        "constraints": constraints,
        "format": 1.0 if FORMAT.search(p) else 0.0,
        "specificity": spec,
        "length": length,
    }


DIMS = ["role", "context", "constraints", "format", "specificity", "length"]

CURRENT = {  # today's shipped weights — the blend anchor
    "l1": {"role": .05, "context": .15, "constraints": .10, "format": .05, "specificity": .45, "length": .20},
    "l2": {"role": .05, "context": .45, "constraints": .10, "format": .05, "specificity": .20, "length": .15},
    "l3": {"role": .05, "context": .10, "constraints": .10, "format": .45, "specificity": .15, "length": .15},
    "l4": {"role": .05, "context": .10, "constraints": .45, "format": .10, "specificity": .15, "length": .15},
    "l5": {"role": .05, "context": .10, "constraints": .10, "format": .40, "specificity": .20, "length": .15},
    "l6": {"role": .45, "context": .15, "constraints": .10, "format": .05, "specificity": .10, "length": .15},
    "l7": {"role": .05, "context": .15, "constraints": .35, "format": .10, "specificity": .20, "length": .15},
    "l8": {"role": .05, "context": .10, "constraints": .15, "format": .05, "specificity": .20, "length": .45},
}


# ------------------------------------------------------------- tiny algebra
def ridge_fit(X, y, lam=0.5):
    """Ridge regression via normal equations. X: n×k, y: n. Returns k weights."""
    k = len(X[0])
    XtX = [[sum(X[r][i] * X[r][j] for r in range(len(X))) + (lam if i == j else 0)
            for j in range(k)] for i in range(k)]
    Xty = [sum(X[r][i] * y[r] for r in range(len(X))) for i in range(k)]
    # Gaussian elimination
    M = [row[:] + [Xty[i]] for i, row in enumerate(XtX)]
    for col in range(k):
        piv = max(range(col, k), key=lambda r: abs(M[r][col]))
        M[col], M[piv] = M[piv], M[col]
        if abs(M[col][col]) < 1e-12:
            return None
        for r in range(k):
            if r != col:
                f = M[r][col] / M[col][col]
                M[r] = [a - f * b for a, b in zip(M[r], M[col])]
    return [M[i][k] / M[i][i] for i in range(k)]


def normalize_weights(raw):
    """Clip negatives, floor at 0.05, renormalize to sum 1 (rubric contract)."""
    clipped = [max(0.0, w) for w in raw]
    if sum(clipped) == 0:
        return None
    floored = [max(0.05, w / sum(clipped)) for w in clipped]
    total = sum(floored)
    return [round(w / total, 2) for w in floored]


# ------------------------------------------------------------------- main
def main():
    if len(sys.argv) < 2:
        sys.exit("usage: python scripts/calibrate.py <cue-progress-export.json>")
    export_path = Path(sys.argv[1])
    export = json.loads(export_path.read_text(encoding="utf-8"))
    data = export.get("data", {})

    pairs = []  # (lessonId, prompt, real_score)
    for e in data.get("library", []):
        if e.get("prompt") and isinstance(e.get("score"), (int, float)):
            pairs.append((e.get("lessonId", "?"), e["prompt"], e["score"]))
    for a in data.get("attempts", []):
        if a.get("prompt") and a.get("engine") != "heuristic" \
                and isinstance(a.get("score"), (int, float)):
            pairs.append((a.get("lessonId", "?"), a["prompt"], a["score"]))
    extra = Path(__file__).parent / "extra_pairs.csv"
    if extra.exists():
        with extra.open(encoding="utf-8") as f:
            for row in csv.DictReader(f):
                if row.get("prompt") and row.get("score"):
                    pairs.append((row.get("lessonId", "?"), row["prompt"], float(row["score"])))

    # de-dupe on prompt text
    seen, unique = set(), []
    for p in pairs:
        if p[1] not in seen:
            seen.add(p[1])
            unique.append(p)
    pairs = [p for p in unique if p[0] in CURRENT or p[0] == "encore"]

    n = len(pairs)
    print(f"— calibration input: {n} prompt/score pairs")
    if n < 15:
        print("✗ Not enough pairs for ANY honest fit (need ≥15 global).")
        print("  Keep the current weights. Grow data via the logger rider,")
        print("  the library, and extra_pairs.csv, then rerun.")
        sys.exit(0)

    X = [[detect(p)[d] for d in DIMS] for (_, p, _) in pairs]
    y = [(s - 15) / 60 for (_, _, s) in pairs]  # map score → rubric's 0..1 scale

    global_raw = ridge_fit(X, y)
    global_w = normalize_weights(global_raw) if global_raw else None
    if not global_w:
        sys.exit("✗ Regression degenerate (constant features?). Keep current weights.")

    by_lesson = defaultdict(list)
    for i, (lid, _, _) in enumerate(pairs):
        by_lesson[lid].append(i)

    proposed, notes = {}, []
    for lid in CURRENT:
        idx = by_lesson.get(lid, [])
        if len(idx) >= 8:
            fit = ridge_fit([X[i] for i in idx], [y[i] for i in idx], lam=1.0)
            w = normalize_weights(fit) if fit else None
            if w:
                # blend per-lesson fit with current by sample confidence
                conf = min(1.0, len(idx) / 25)
                blended = [round(conf * w[j] + (1 - conf) * CURRENT[lid][DIMS[j]], 2)
                           for j in range(6)]
                proposed[lid] = normalize_weights(blended)
                notes.append(f"{lid}: per-lesson fit, n={len(idx)}, confidence {conf:.0%}")
                continue
        # not enough lesson data → nudge current 25% toward the global fit
        blended = [round(0.75 * CURRENT[lid][DIMS[j]] + 0.25 * global_w[j], 2)
                   for j in range(6)]
        proposed[lid] = normalize_weights(blended)
        notes.append(f"{lid}: global nudge (n={len(by_lesson.get(lid, []))} — below 8)")

    # ---- outputs ----
    js = "const LESSON_WEIGHTS = {\n"
    for lid, w in proposed.items():
        entries = ", ".join(f"{d}: {w[j]:.2f}" for j, d in enumerate(DIMS))
        js += f"  {lid}: {{ {entries} }},\n"
    js += "}"
    print("\n— paste-ready for src/lib/rubric.js (v2-17b):\n")
    print(js)

    findings = Path("docs/calibration-findings.md")
    findings.parent.mkdir(exist_ok=True)
    findings.write_text(
        f"""# Calibration Findings — {date.today().isoformat()}

- Input: {n} unique prompt/score pairs (library + prompt-bearing attempts + extra_pairs.csv)
- Global fit (ridge, λ=0.5), per-lesson fits where n≥8, confidence-blended with shipped weights
- Per-lesson: {'; '.join(notes)}
- KNOWN LIMITS: library pairs skew ≥58 (survivor bias); specificity detector
  runs WITHOUT scenario-keyword overlap offline (flat stand-in) — treat its
  fitted weight with suspicion; n this small proposes NUDGES, not truths.

## Proposed weights
```js
{js}
```
""", encoding="utf-8")
    print(f"\n— findings written: {findings}")


if __name__ == "__main__":
    main()