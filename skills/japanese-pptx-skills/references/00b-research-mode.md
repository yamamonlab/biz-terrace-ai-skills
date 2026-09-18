# Research Mode｜テーマ起点のEvidence収集

## Goal
テーマだけ、または根拠の薄い素材から経営ブリーフィングを作るとき、公開情報を「引用可能な証拠」に変換する。調査自体を目的化せず、意思決定に必要な論点だけを集める。

## Trigger
次のいずれかで使う。
- ユーザーが「調査」「公開データ」「公式統計」「事例収集」を依頼している。
- テーマだけが与えられ、経営層向けブリーフィングを求められている。
- ユーザー素材だけでは主要主張の裏付けが足りず、外部調査が依頼範囲に含まれる。

外部調査を禁止された場合は使わない。

## Research question decomposition
検索前に `research.questions` を作る。原則6〜10問まで。問いは資料の候補ページではなく、意思決定に必要な証拠単位で切る。

代表的な問い：
- 何を指すか。定義・対象範囲は何か。
- 市場・普及・導入状況はどの段階か。
- どのKPIにどの程度の影響が確認されているか。
- 成功するユースケース / 条件は何か。
- 失敗・障壁は何か。
- 運用・組織・ガバナンスに何が必要か。
- 国・業界・規模で差はあるか。
- 規制・標準・主要プレイヤーはどう動いているか。
- 自社が今決めるべきことは何か。

## Source hierarchy
可能な限り上位ソースを優先する。

1. `tier1_primary_official`
   - 政府・規制当局・国際機関の公式統計
   - 企業の有価証券報告書、決算資料、公式開示
   - 法令・規則・標準本文
2. `tier2_primary_research`
   - 査読研究、大学・研究機関
   - 調査会社・業界団体の一次調査
3. `tier3_reputable_secondary`
   - 信頼できる報道、専門メディア、二次分析
4. `tier4_anecdotal`
   - 企業ブログ、ベンダー事例、インタビュー等

主要数値・規制・市場規模は tier1 / tier2 を優先する。tier4 は事例として使えるが、一般化の根拠にしない。

## Source capture
外部ソース由来Evidenceには最低限次を保存する。
- organization
- title
- year または publication_date
- URL / identifier（利用可能な場合）
- source_tier
- accessed_at（必要な場合）
- page / table / section（特定できる場合）

## Recency
変化の速いテーマでは最新性を確認する。ただし「最新だから採用」ではなく、定義・母集団・調査方法を確認する。

複数年を比較するときは、同じ調査系列・同じ口径を優先する。異なる調査をつなぐ場合は `comparability_note` を残す。

## Forecasts and estimates
- 公開予測は「予測」として保持し、実績と混ぜない。
- 自前推計は `numeric.is_estimate=true`、`estimate_method`、`calculation_basis` を必須にする。
- 推計値の表示は `†` を付ける。
- ページ内に推計が1つでもあれば、出典フッターに `†：推計値を含む` を付ける。
- データが取れないという理由だけで数値を捏造しない。必要なら `xx` を残す。

## Case studies
事例は最低限次を区別する。
- independently_verified: 第三者または公的開示で確認
- company_reported: 当該企業の公式発表
- vendor_reported: ベンダーが顧客成果として報告
- anecdotal: 定量検証なし

成果数値を一般化しない。事例は「実現可能性」「実装パターン」の証拠として使い、母集団効果と混同しない。

## Research completion
調査は情報量ではなく `evidence coverage` で終える。
- governing message 候補を支える証拠がある
- 主要Decision / 論点ごとに最低1つの一次または高品質ソースがある
- 反証・例外・不確実性を把握している
- 数字の口径が説明できる

## Gate 0 additions for research mode
BLOCKER:
- 出典が追跡できない数値を公開データとして扱っている
- ベンダー事例を一般的な市場効果として断定している
- 実績と予測を同一系列として無注記で接続している

ERROR:
- 推計値に推計方法または前提がない
- 外部ソースEvidenceに organization / title / year等の識別情報がない

WARN:
- 主要主張が tier3 / tier4 のみに依存する
- 異なる調査口径を比較しているが comparability_note がない
