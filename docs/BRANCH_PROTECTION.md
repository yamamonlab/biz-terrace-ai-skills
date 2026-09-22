# Branch protection / ruleset (main)

This repository is the public canonical source for `skills/cognitive-view/`.
The settings below are **not** expressible as files — an org/repo admin applies
them in GitHub Settings → Rules → Rulesets (or Settings → Branches).

Target: `main` (default branch).

| # | Setting | Value |
|---|---------|-------|
| 1 | Require a pull request before merging | on (1 approval, or 0 for solo maintenance) |
| 2 | Require status checks to pass | on |
| 3 | Required check | `Validate Cognitive View / contract` |
| 4 | Require branches to be up to date before merging | on |
| 5 | Block force pushes | on |
| 6 | Restrict deletions | on |

## Why

`cognitive-view` is pinned by downstream consumers (`community-labs` events,
`yamamon-lab` internal runtime mirror) by commit SHA and tag. A force push or a
branch deletion would invalidate those pins silently; a merge that skips the
contract check would publish a skill that has not been validated.

## Release flow

```text
feature branch → PR → Validate Cognitive View → main
  → tag cognitive-view-vX.Y.Z
  → Release Cognitive View workflow publishes the Release
  → event / yamamon-lab pin the tag or SHA
```

Tagging requires push access to `refs/tags/*`. Once the tag is pushed, the
`Release Cognitive View` workflow validates that ref and publishes the Release
from `skills/cognitive-view/RELEASE_NOTES/<tag>.md`. It can also be run from
`workflow_dispatch` with an existing tag name, for tags created in the UI.
