# Releasing Cognitive View

This Skill lives in the `biz-terrace-ai-skills` monorepo. Tags prefixed with `cognitive-view-` are the only semantic version source of truth for Cognitive View.

## Release states

- **VALIDATED** — deterministic repository checks pass.
- **EVALUATED** — representative model-output comparisons have also been performed and recorded.

A release must be VALIDATED. EVALUATED is strongly recommended for minor and major releases, but the two states must never be conflated.

## Versioning

Use semantic versioning:

- **PATCH** — contradiction fixes, wording clarifications, accessibility fixes, validator fixes, or equivalent behavior-preserving corrections.
- **MINOR** — backward-compatible new capability, renderer support, diagram type, or evaluation coverage.
- **MAJOR** — intentional breaking changes to output contracts, mode semantics, evidence semantics, or routing boundaries.

## Release procedure

1. Merge changes to `main` through a pull request.
2. Confirm `node skills/cognitive-view/scripts/validate.mjs` passes in CI.
3. For behavior changes, run representative model-output evaluation and record the result.
4. Update `CHANGELOG.md`.
5. Create an annotated release tag such as `cognitive-view-v1.0.0`.
6. Publish release notes that distinguish deterministic validation from model evaluation.
7. Downstream consumers should pin a tag or commit rather than following `main` in production or event materials.

## Event usage

Events and workshops should reference an immutable `cognitive-view-vX.Y.Z` tag or commit SHA, not `main`. This keeps slides, expected outputs, and participant instructions reproducible even while development continues.
