# 工程2｜論理を組む

## Goal
ページを並べるのではなく、ガバニングメッセージの下に各ページの主張を論証として配置する。

## Governing message
資料全体の結論を1つ立てる。各ページはその結論の根拠、含意、提言、意思決定のいずれかとして明示的にぶら下がる。

## Slide ledger
次の項目をDeckSpecから表示できる状態にする。

| No | ヘッド | 文型 | 上位への集約 | 直前からの接続 | 本体の型 | 論点 |
|---|---|---|---|---|---|---|

## Vertical logic
ヘッドだけを縦に通読し、隣接ページが次のいずれかで自然につながるか検証する。
- だから / therefore
- なぜなら / because
- しかし / however
- 並列 / parallel

関係を `relation_to_previous` に保存する。

## Horizontal logic
同階層の並びは切り口を1つにする。`slice_axis` を1語または短句で言える状態にする。粒度を揃える。

## Decisions
- 資料全体で3〜6個を目安。
- 冒頭サマリで Decision ID、求める決定、主要根拠、参照ページを予告する。
- 最終ページで同じ Decision ID を回収する。
- 最終ページは決定事項、直近日程、判断基準を載せた最重量ページにする。

## Time allocation principle
複数枚資料では、制作判断の大半を Message と Storyline に使う。Visual を先に作り込まない。

## One-page exception
1枚物ではこの工程を省略可能。ただし `decision_ids` と `proof_requirements` は保持する。

## Gate 2
BLOCKER:
- governing_message と主要ページが論理的につながらない
- 重要な意思決定が本文にあるのにDecision IDがない

ERROR:
- 同階層の切り口が混在
- 前後関係が説明不能
- Summary と Closing の Decision ID が不一致

WARN:
- 同じ内容を繰り返すページがある
- 結論が終盤まで出てこない
- Closing が単なるまとめになっている

Gate 2通過後：`STORY_READY`
