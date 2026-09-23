# Cognitive View

Cognitive View is an open, text-based Skill that turns long documents — meeting notes, reports, long AI outputs — into a single self-contained HTML page a person can understand quickly, **without dropping information**.

> Reduce what has to be read, not what is known.

## How it works

1. **Fact ledger** — every fact in the source is listed with its type and a verbatim quote, before any HTML is written.
2. **Routing** — facts are grouped and each group gets the representation its relationship calls for, in a fixed order: charts for quantities, a timeline for dates, a table for comparisons, a flow for causality the source actually states, a side-by-side block for disagreements, an open-items block for what is unresolved.
3. **Three layers** — a 5-second layer (subject, state, source numbers), a structure layer headed by the reader's questions, and a collapsed detail layer that holds the ledger.
4. **Traceability** — every visible element carries the ledger ids it rests on, so a reader (or a script) can check it against the source.

Animation is used only to show order, trend or stated causality: CSS only, plays once, and off for people who ask for reduced motion.

The first rule outranks everything else: **nothing that is not in the source** — no arithmetic, no unit changes, no unstated owners, dates, causes or judgements.

## Files

- `SKILL.md` — the procedure.
- `references/components.md` — HTML building blocks as `{{…}}` skeletons.
- `scripts/check-output.mjs` — checks a generated HTML file against its source.
- `scripts/validate.mjs` — checks the Skill's own files.
- `examples/` — fictional inputs.
- `docs/` — design rationale and evaluation protocol (not needed at runtime).

## Using it

**Tools that read folders** (Claude Code, Codex, repository-connected assistants): give them this directory.

**Chat assistants** (ChatGPT, Gemini, Copilot, Claude): give them two raw file links — `SKILL.md` and `references/components.md` — plus the document.

```text
この資料を、短時間で全体像を把握できる Cognitive View にしてください。HTMLで出力してください。
```

If you can run Node, check the result:

```bash
node skills/cognitive-view/scripts/check-output.mjs output.html source.md
```

## Validation and evaluation

`node skills/cognitive-view/scripts/validate.mjs` checks the Skill files; passing it makes a commit **VALIDATED**. A change is **EVALUATED** only after the model-output comparison in `docs/eval-protocol.md` — including weak models — has actually been run.

## Versioning

Git tags prefixed with `cognitive-view-` are the source of version truth. `v2.0.0` replaced the v1 contract; see `CHANGELOG.md`.

## License

MIT. Some design conventions in `references/components.md` descend from Cathryn Lavery's `diagram-design` (MIT). See `THIRD_PARTY_NOTICES.md`.

## 日本語

長い資料を、情報を削らずに「見れば全体像がつかめる」単一HTMLへ変換する Skill です。最初に原文の事実台帳を作り、表・グラフ・タイムライン・流れ図へ振り分け、画面の全要素を原文の一節へ辿れるようにします。**原文にないものは足しません**（計算・単位の変更・書かれていない担当や因果や評価をしない）。

チャットAIでは `SKILL.md` と `references/components.md` の2本のリンクと資料を渡してください。
