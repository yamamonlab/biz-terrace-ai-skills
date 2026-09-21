# Cognitive View

Cognitive View is an open, text-based Skill for transforming long reports, meeting notes, and AI outputs from **reading-heavy documents** into a **progressively disclosed briefing** that can be understood quickly without discarding the underlying information.

> Goal: reduce the amount that must be read, not the amount of information retained.

## What it does

Cognitive View reorganizes source material into three layers:

1. **5-second layer** — subject, current state, and source-backed metrics when they exist.
2. **30–90-second layer** — tables, diagrams, lists, and unresolved items chosen from the relationships in the source.
3. **Detail layer** — source quotations and historical detail in collapsed `<details>`.

The default mode is **UNDERSTAND**: it does not invent recommendations, priorities, metrics, or decisions that are absent from the source.

## Repository layout

- `SKILL.md` — primary behavior contract.
- `references/output-contract.md` — HTML rendering contract.
- `references/quality-rubric.md` — evaluation criteria.
- `references/capability-spec.md` — capability boundaries and success metrics.
- `references/diagram/` — self-contained diagram grammar and SVG templates.
- `examples/` — fictional inputs for trying the Skill.
- `scripts/validate.mjs` — deterministic contract checks.
- Repository-level `.github/workflows/validate-cognitive-view.yml` — CI validation for this Skill.

## Using the Skill

Use the `skills/cognitive-view/` directory as a whole when your AI environment can read repository files or uploaded directories. `SKILL.md` intentionally references files under `references/`, so copying only `SKILL.md` into an environment that cannot access those files is incomplete.

A minimal request is:

```text
この資料を、短時間で全体像を把握できる Cognitive View にしてください。HTMLで出力してください。
```

Try it with `examples/sample-document.md`.

## Design principles

- Keep source information; reduce prose-reading cost.
- Never fabricate KPI cards to fill a layout.
- Use diagrams only when the relationship warrants them.
- Keep fact / inference / unresolved status distinguishable without badge spam.
- Aggregate evidence at section level instead of adding a source link to every sentence.
- Keep generated HTML self-contained: no scripts, remote fonts, CDNs, or external assets.
- In UNDERSTAND mode, do not add recommendations or priorities that the source did not contain.

## Validation and evaluation

Run:

```bash
node scripts/validate.mjs
```

A commit that passes deterministic checks is **VALIDATED**. Model-output comparison is a separate, non-deterministic activity and should be recorded as **EVALUATED** only when it has actually been performed.

See `RELEASING.md` for release policy.

## Versioning

Git tags prefixed with `cognitive-view-` are the source of version truth. The Skill file does not carry an independent semantic version.

- `cognitive-view-v1.0.1`: contract bug fixes and clarifications
- `cognitive-view-v1.1.0`: backward-compatible capability additions
- `cognitive-view-v2.0.0`: intentionally breaking output or behavior contracts

## License

Cognitive View is released under the repository's MIT License and the copy included in this Skill directory. Parts of `references/diagram/` are derived from Cathryn Lavery's `diagram-design`, also MIT licensed. See `THIRD_PARTY_NOTICES.md`.

## 日本語

Cognitive View は、長い資料を「読まないと分からない状態」から「見れば全体像がつかめる状態」へ変換するためのオープンな Skill です。情報を削る要約ではなく、情報を保持しながら表・図・箇条書き・段階的開示へ再構成します。

このリポジトリ全体を1つの Skill として扱ってください。特に `SKILL.md` は `references/` を参照するため、参照ファイルへアクセスできない環境では `SKILL.md` だけの貼り付けでは完全な実行になりません。
