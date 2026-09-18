# 工程0｜Evidence 化

## Goal
素材を「使える証拠」に変換し、発言・推測・事実・数字・外部調査を混同しない。

## Extraction order
1. 決定済事項
2. 定量情報
3. 確認済み事実
4. 制約
5. 意見
6. 仮説
7. 不明・矛盾

## Classification
- `fact`: 素材内または公開一次ソースで事実として確認できる内容
- `metric`: 数値を伴う事実
- `opinion`: 発言者の評価・感想
- `hypothesis`: 未検証の因果や推論
- `decision`: 既に決まっていること
- `constraint`: 期限・予算・制度等の制約
- `unknown`: 判定不能、欠損、矛盾

## Numeric integrity
数字には可能な限り次を持たせる。
- 値
- 単位
- 対象期間
- 出所
- 実績 / 予測 / 目標 / 推計の区別
- 試算なら計算前提と推計方法

素材または公開ソースにない数値を推定する場合は、確定値として扱わない。
- `numeric.is_estimate=true`
- `numeric.estimate_marker="†"`
- `estimate_method` または `calculation_basis` を保存
- 使用ページの source note に `†：推計値を含む`

データが得られない部分は `xx` のままでもよい。欠損を埋めるための捏造は禁止。

## Actual vs forecast
実績と予測を同じ系列で扱う場合でも、Evidence上で `series_kind` を分ける。
- actual
- forecast
- target
- estimate

異なる調査系列を接続する場合は口径差を `comparability_note` に残す。

## Source capture
外部公開情報を使う場合は、可能な限り以下を保存する。
- organization
- title
- year / publication_date
- page / table / section
- URL / identifier
- source tier

Research mode の詳細は `00b-research-mode.md` に従う。

## Case-study discipline
事例の成果は次を区別する。
- independently_verified
- company_reported
- vendor_reported
- anecdotal

ベンダー事例1件を市場全体の効果として一般化しない。

## Data reuse
表・グラフ・KPIボックスで同じ数字を使う場合、同じ Evidence ID / data binding を参照する。表示箇所ごとに値を再入力しない。

## Contradictions
複数素材が矛盾する場合、どちらかを勝手に採用しない。両方をEvidenceとして保持し `contradicted` を付ける。

## Gate 0
BLOCKER:
- 素材・公開ソースにない具体的事実を追加している
- 未確認仮説を confirmed fact としている
- 出所不明の外部数値を公開データとして扱っている

ERROR:
- 実質数値に出所も試算前提もない
- 推計値に推計方法/前提がない
- Evidence ID が重複

WARN:
- 期間、単位、対象範囲が曖昧
- 主要主張が弱い二次/事例ソースのみに依存

Gate 0通過後：`EVIDENCE_READY`
