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

Do not mark a change **EVALUATED** unless a model-output comparison was actually run. The procedure, the pass conditions, and the reporting format are in `docs/eval-protocol.md`. Evaluations must include a weak model; fidelity failures appear there first.

### Adding or removing a rule

`docs/design.md` records why each part of the contract exists and the failures it answers. Add a rule only for a failure that was actually observed. To remove or weaken a fidelity rule, run the comparison in `docs/eval-protocol.md` and show that fabrication does not increase.

## Pull request rules

- Keep `main` releasable.
- Prefer small, reviewable changes.
- Run `node skills/cognitive-view/scripts/validate.mjs` from the repository root before opening a PR.
- Do not add external runtime dependencies unless the capability cannot reasonably remain self-contained.
- Do not add sample-specific rules to the core contract merely to improve one fixture.
- Never put example content (names, numbers, sentences) into `references/components.md` or `SKILL.md`; models copy it.
- Do not weaken information-retention or source-grounding rules to make outputs look cleaner.
- Preserve attribution for material derived from third-party projects.

## Examples and fixtures

Examples should be fictional or explicitly redistributable. Do not commit confidential, personal, customer, or employer data.

A behavior change should be tested against multiple genres when practical, not only the input that motivated the change.

## Releases

See `RELEASING.md`.
