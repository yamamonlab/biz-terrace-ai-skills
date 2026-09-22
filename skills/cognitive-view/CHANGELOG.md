# Changelog

All notable changes to Cognitive View will be documented here.

The Skill uses semantic versioning with `cognitive-view-vX.Y.Z` Git tags as the version source of truth.

## Unreleased

### Added

- `references/foundations.md` — maps each rule to the principle it rests on (Shneiderman's information-seeking mantra, Sweller's intrinsic/extraneous load, Mayer's coherence / signaling / spatial-contiguity principles), with the rationale for the diagram complexity budget and the order in which rules may be removed.
- `references/eval-protocol.md` — a comprehension-reach test that measures what the rubric cannot: whether a reader actually gets there fast. Defines the VALIDATED / EVALUATED boundary and the A/B procedure required before removing a principle-backed rule.
- `references/genre-map.md` — input genre to question-heading mapping, so the default headings are no longer assumed to fit every document. Raises the information-preservation target to 98% for policy and procedure documents.
- `references/decide-contract.md` — the previously undefined `DECIDE` mode now has a skeleton, an explicit list of what must not be added (scores, confidence values, invented options), and its own scoring axis.
- `references/chart/` — charts are now routed and gated separately from diagrams: `grammar.md` (numeric test, chart complexity budget, how to draw missing and uncertain values), `type-sparkbar.md`, `type-line.md`, `type-part.md`, `type-range.md`. The Skill had seven relational diagram types and a single bar type, and the three-sentence test — calibrated for "this structure is hard to describe" — rejected every chart, because a comparison of three numbers is always describable in one sentence. Measured consequence: 7.2M yen and 1,100 yen sat in adjacent table cells at the same type size with nothing encoding the three-order-of-magnitude gap.
- Sparkbars on numeric table columns. A table encodes which object and which axis by row and column position; it does not encode magnitude. The bar sits under the value rather than replacing it, scales from the column maximum at a zero baseline, and renders a missing value as a dashed empty track rather than a zero-width bar.
- `references/representation-budget.md` — the budget written before any HTML: device rhythm (no two identical devices in a row), a **floor** for visual encoding (cards / tables / diagrams / alerts must cover 30% of related chunks), and the pre-registered prose that the three-sentence test is actually measured against. Until now the Skill only had ceilings, so an output made entirely of boxed bullet lists scored full marks.
- Visual-encoding rate as a third primary metric, plus rubric axes 8 (visual encoding) and 9 (rhythm). Lists are non-prose but encode only order, so representation-conversion rate alone cannot see a page that has degraded into boxed text.
- A fixed status-symbol vocabulary (● confirmed / ▲ concern / ■ unverified / ○ not started / × rejected) with one meaning per shape, and a no-wrap rule so a symbol is never split from its word.
- Metric-card ordering rule: cards are ordered by what the comprehension goal needs, not by the source order.
- A render-and-look self-review step before output, since axes 8 and 9 cannot be judged from markup.
- Print and narrow-width rules in the output contract: `@media print` reveals the detail layer via `::details-content`, and comparison tables fall back to per-row cards below 600px instead of scrolling horizontally.
- OSS repository documentation and deterministic validation scaffolding.
- Explicit release distinction between VALIDATED and EVALUATED, now defined operationally in `references/eval-protocol.md`.

### Changed

- `SKILL.md` no longer restates the rubric's pass conditions and 7 axes. Scoring lives in `references/quality-rubric.md` only; the Skill keeps the immediate-fail gates and a self-check that points at the rubric.
- Charts are exempt from the three-sentence test and the node/edge budget; they use the numeric test (three or more values in one unit, a gap in magnitude or a trend/composition/range that matters, and a bearing on the comprehension goal) with their own budget (series ≤3, categories ≤8, accent ≤1, legends allowed).
- Rubric axis 5 now scores diagrams and charts separately, and scores 1 or below when a numeric column carries no sparkbar, or 0 when a missing value is drawn as zero.
- Pass condition is now: information retention 95%+, representation conversion 80%+, **visual encoding 30%+**, 9 axes 15/18+, zero immediate fails. Two immediate fails were added: degradation into boxed text (three or more related chunks with no visual device) and shipping a diagram without its pre-registered prose.
- The DECIDE axis is renumbered 10 to make room for axes 8 and 9.
- Metric card labels use `--text-secondary` at 0.85rem (previously the smallest, lightest text on the page sat in the 5-second layer).

### Notes

Collapsed detail content is not printed on browsers released before `::details-content` shipped (2025-09), and find-in-page auto-expansion of `<details>` is Chromium-specific. Both limits are now stated in the output contract rather than assumed away.

The first public-canonical release is planned as `cognitive-view-v1.0.0` in `yamamonlab/biz-terrace-ai-skills`. The initial implementation history remains private; this public repository becomes canonical from that release onward.
