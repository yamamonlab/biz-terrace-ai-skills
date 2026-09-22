# Changelog

All notable changes to Cognitive View will be documented here.

The Skill uses semantic versioning with `cognitive-view-vX.Y.Z` Git tags as the version source of truth.

## Unreleased

### Added

- `references/foundations.md` — maps each rule to the principle it rests on (Shneiderman's information-seeking mantra, Sweller's intrinsic/extraneous load, Mayer's coherence / signaling / spatial-contiguity principles), with the rationale for the diagram complexity budget and the order in which rules may be removed.
- `references/eval-protocol.md` — a comprehension-reach test that measures what the rubric cannot: whether a reader actually gets there fast. Defines the VALIDATED / EVALUATED boundary and the A/B procedure required before removing a principle-backed rule.
- `references/genre-map.md` — input genre to question-heading mapping, so the default headings are no longer assumed to fit every document. Raises the information-preservation target to 98% for policy and procedure documents.
- `references/decide-contract.md` — the previously undefined `DECIDE` mode now has a skeleton, an explicit list of what must not be added (scores, confidence values, invented options), and its own scoring axis.
- Print and narrow-width rules in the output contract: `@media print` reveals the detail layer via `::details-content`, and comparison tables fall back to per-row cards below 600px instead of scrolling horizontally.
- OSS repository documentation and deterministic validation scaffolding.
- Explicit release distinction between VALIDATED and EVALUATED, now defined operationally in `references/eval-protocol.md`.

### Changed

- `SKILL.md` no longer restates the rubric's pass conditions and 7 axes. Scoring lives in `references/quality-rubric.md` only; the Skill keeps the immediate-fail gates and a self-check that points at the rubric.
- Metric card labels use `--text-secondary` at 0.85rem (previously the smallest, lightest text on the page sat in the 5-second layer).

### Notes

Collapsed detail content is not printed on browsers released before `::details-content` shipped (2025-09), and find-in-page auto-expansion of `<details>` is Chromium-specific. Both limits are now stated in the output contract rather than assumed away.

The first public-canonical release is planned as `cognitive-view-v1.0.0` in `yamamonlab/biz-terrace-ai-skills`. The initial implementation history remains private; this public repository becomes canonical from that release onward.
