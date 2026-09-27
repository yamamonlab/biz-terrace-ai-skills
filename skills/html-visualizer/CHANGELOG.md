# Changelog

All notable changes to HTML Visualizer (formerly Cognitive View) will be documented here.

The Skill uses semantic versioning with `html-visualizer-vX.Y.Z` Git tags (`cognitive-view-vX.Y.Z` before the rename) as the version source of truth. Release notes for tagged versions are in `RELEASE_NOTES/`.

## Unreleased — intended as `html-visualizer-v2.0.0` (breaking)

Status: see the bottom of this entry (VALIDATED / EVALUATED).

### Changed (overview board, 2026-09-27)

- **The first screen shows the whole picture.** The three-sentence key points (`POINTS`) are replaced by `BOARD`: columns "known / not yet known / next", filled by ledger type rather than by the model's judgement. `check-output.mjs` errors when the "known" column holds only unconfirmed, undecided or disputed facts, and warns when there is no board.
- **Less repetition.** Body prose no longer restates what a table or figure shows; open items live only in one table at the end (`OPEN` is now a table).
- **PC-first layout.** Chapter index on the left, tables and figures 960px, body 760px, all on one left edge. Mobile-only CSS is dropped except the table fallback.
- **Ledger.** The heading column is kept to 15 characters and the quote cell holds only source text. The ledger is written last.
- **Tables.** Columns follow what the source states; empty cells are "記載なし", never filled by arithmetic or guesswork. `CARD` is removed.
- `check-output.mjs` decodes numeric character references before checking numbers (they were reported as numbers not in the source).
- `validate.mjs`: components budget 30KB → 31KB for `BOARD` and the `OPEN` table.
- Evaluation: `docs/eval-2026-09-27.md` (VALIDATED + limited EVALUATED). First-screen answers 11 → 13 of 18, page height median 5,670 → 4,442px, no regression for mid/strong models; weak-model fabrication remains in both versions.

### Changed (name only, 2026-09-27)

- Renamed from **Cognitive View** (`skills/cognitive-view/`) to **HTML Visualizer** (`skills/html-visualizer/`). The Skill's contract, references, scripts and examples are unchanged; only names, paths and workflow names moved. Pinned links to `cognitive-view-v1.0.0` or to commits up to `8e8d001` keep working at the old path.

### Added (examples only, 2026-09-26)

- `examples/by-role/`: five longer fictional inputs, one per job type (engineering, sales, planning, back office, management), so participants can try the Skill on a document close to their own work. Inputs only; no change to `SKILL.md` or `references/`. `scripts/validate.mjs` now also checks that their proper nouns never appear in the runtime files.

### Why this is a rewrite

On 2026-09-23 the released contract (`78ce777`) was run the way event participants would run it — nine generations across three model strengths and two load paths, against criteria registered before generation. Layout held in every run. Fidelity did not: outputs from weaker models added a computed amount that the source never states, relabelled a per-user monthly fee as yearly, invented a year and an owner, and one mid-strength run copied "the four steps form a loop" verbatim from a diagram template whose worked example used the same fictional company as the sample input. The strongest model produced no such errors. See `docs/design.md`.

v2 therefore reorganises the Skill around fidelity first and presentation second.

### Changed

- **A fact ledger is now the first step.** Before any HTML, every fact in the source is listed with a type and a verbatim quote. Every visible element carries `data-f` pointing at ledger ids, and the ledger ships at the end of the output as the detail layer's evidence. Pasting the whole source into `<details>` is no longer the detail layer.
- **Six concrete prohibitions** replace the general "do not add information": no arithmetic, no unit changes, no unstated owners/dates/years, no unstated causality or loops (parallel reasons stay parallel), no unstated evaluative words, no dropping who said what.
- **One routing table with an explicit order** (quantity → time → comparison → stated causality → disagreement → open items → list → sentence) replaces the router, representation budget, chart grammar and diagram grammar, which disagreed with each other.
- **Components contain only `{{…}}` skeletons.** No component carries domain content, so there is nothing to copy.
- **Timeline, flow and bar charts are HTML/CSS**, so they wrap on narrow screens instead of shrinking SVG text to ~4px at 360px. SVG remains for line charts.
- **Animation** is allowed for sequence, trend and stated causality only: CSS only, plays once, total ≤3s, and defined inside `prefers-reduced-motion: no-preference` so the static final state is what print, previews and reduced-motion users see.
- The reply is one HTML code block with at most two lines around it. Self-scores, briefs and ledgers are not printed in the chat reply, which kept outputs from being truncated on free tiers.
- Runtime files are two: `SKILL.md` and `references/components.md` (about a ninth of the previous runtime size).

### Added

- `scripts/check-output.mjs` — checks a generated HTML file against its source: self-containment, completeness, closed details, ledger quotes that must exist verbatim in the source, visible numbers that do not appear in the source, years absent from the source, evaluative words absent from the source, `data-f` coverage, and animation rules. It flags every fabrication found in the 2026-09-23 run.
- `examples/sample-operations-report.md` — a second fictional input from a different domain, with a monthly series, a per-site comparison, a stated causal chain, two parallel causes, a disagreement, an open item with a stated owner and one without, and a missing value.
- `docs/design.md` — why v2 has this shape, with the evidence and the corrected citations (Mayer & Fiorella 2014; the 5-second / 30–90-second timings are this Skill's operating targets, not Shneiderman's).

### Removed

- `references/output-contract.md`, `quality-rubric.md`, `capability-spec.md`, `genre-map.md`, `decide-contract.md`, `representation-budget.md`, `foundations.md`, `references/chart/`, `references/diagram/`. Their surviving rules are in `SKILL.md` or `references/components.md`; the rationale is in `docs/design.md`.
- The three-tier device vocabulary and area-share metrics. They could not be computed in a chat AI and rewarded wrapping lists in cards.

### Moved

- `references/eval-protocol.md` → `docs/eval-protocol.md`, rewritten to measure fidelity first and to require weak models in every evaluation.

### Fixed after the 2026-09-25 role-based dry run

Five fictional role documents (SE incident, sales handover, AI research report, policy revision, monthly report) were rendered at PC width and inspected as images and with a render check. Record: `docs/eval-2026-09-25.md`.

- Timeline points are placed by formula (`x = 88 + i × 704 ÷ (n − 1)`, up to 7 points), with a per-line character limit derived from the spacing. Eyeballed spacing crowded labels at 6+ points.
- Box width counts the 12px sub-label line too; a labelled edge segment must be at least the label width + 32 so the label is not hidden under a box.
- New ledger type `訂正`: a speaker's or document's own restatement is written as the currently valid value with the earlier one noted, not as a `CONFLICT`. `CONFLICT` is for unresolved disagreement between different people or sources.
- Notation variants of the same value (¥5000 / 5,000円) are one fact; differently-united phrasings (14日以内 / 2週間以内) are not converted and are listed as unconfirmed, not as a conflict.
- Chapters (`h2`) are capped at 4–6. Uncapped outputs reached 7–10 chapters and 5,800–8,400px at PC width.
- `CARD` `small` holds the unit only and wraps; conditions go to `card-n`. `FIG` keeps a single `main`.
- `check-output.mjs` warns on more than 6 `h2`, a correction inside `CONFLICT`, and multiple `main` elements.

Result (one run per condition, sonnet): SVG text collisions 2/4 → 0/6, `h2` 7–10 → 5–6. Fidelity errors from `check-output.mjs` appear before and after (3/4 → 5/6) and are not attributed to this change; see the record.

### Status

EVALUATED on 2026-09-23 against the pre-registered protocol, with limits: two inputs, three model strengths used as stand-ins for real chat assistants, one to three runs per condition. Numeric fabrication fell from 3/3 weak-model outputs (v1) to 0/4 (v2.1); mid and strong models produced none. Weak models still occasionally add an owner or an interpretive word (2/4); the last owner-field fix was not re-evaluated. Full record: `docs/eval-2026-09-23.md`.
