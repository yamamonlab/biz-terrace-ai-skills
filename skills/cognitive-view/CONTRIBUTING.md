# Contributing

Thank you for improving Cognitive View.

## Change types

### Contract fixes

Clarifications, contradiction removal, typo fixes, accessibility fixes, and deterministic validation improvements can usually be reviewed as ordinary pull requests.

### Behavior changes

Changes that affect routing, evidence handling, information retention, diagram selection, UNDERSTAND/DECIDE boundaries, or output structure should include:

1. the behavior being changed;
2. the failure mode the change addresses;
3. one or more representative inputs;
4. expected behavior after the change;
5. whether model-output evaluation was performed.

Do not mark a change **EVALUATED** unless a model-output comparison was actually run. The procedure, the pass conditions, and the reporting format are in `references/eval-protocol.md`.

### Removing or relaxing a rule

`references/foundations.md` records which rules rest on published findings about how people read, and which are operational judgement. Remove operational rules first. To remove or weaken a rule backed by a principle, include the A/B comparison described in `references/eval-protocol.md` §5 showing that comprehension does not degrade without it.

## Pull request rules

- Keep `main` releasable.
- Prefer small, reviewable changes.
- Run `node skills/cognitive-view/scripts/validate.mjs` from the repository root before opening a PR.
- Do not add external runtime dependencies unless the capability cannot reasonably remain self-contained.
- Do not add sample-specific rules to the core contract merely to improve one fixture.
- Do not weaken information-retention or source-grounding rules to make outputs look cleaner.
- Preserve attribution for material derived from third-party projects.

## Examples and fixtures

Examples should be fictional or explicitly redistributable. Do not commit confidential, personal, customer, or employer data.

A behavior change should be tested against multiple genres when practical, not only the input that motivated the change.

## Releases

See `RELEASING.md`.
