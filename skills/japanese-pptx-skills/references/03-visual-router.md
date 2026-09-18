# 工程3｜Visual Router

## Goal
グラフ種類から選ばず、「何を証明したいか」から型を選ぶ。

## Step 1: intent classification
ヘッドの主要動詞と証明構造から1つ選ぶ。

- `decide`: 優先順位、選択、全体運用、意思決定を求める
- `decompose`: 合計、差、寄与、歩留まり、式、待ち時間等を分解する
- `compare`: 同じ物差しで対象・制度・フロー・構造を比べる
- `change`: Before/After、前提変更、構成の組み替えを見せる
- `relationship`: 2つ以上の変数、位置、構成比、相関、軌跡、判断条件を見せる
- `timeline`: 時間、工程、フェーズ、会議体、業務フローを見せる
- `structure`: レイヤー、バリューチェーン、組織、全体と拡大、関係者を地図化する

## Step 2: load Design System
Intentを決めた後に `DESIGN.md` を読む。Message / Storyline確定前には読まない。

ここでは色や装飾を選ぶのではなく、比較可能性、proof alignment、位置の意味、強調制約等のSemantic invariantを理解する。

## Step 3: progressive disclosure
該当familyだけ読む。48型一覧を一度に比較しない。

## Step 4: candidate shortlist
候補は最大3型。各候補について次を比較する。
- use_when と今回の問いが一致するか
- required_data が揃っているか
- proof_mechanism がヘッドの各節を証明できるか
- layout_invariants を守れるか
- avoid_when に該当しないか

## Step 5: select one
`selected_pattern`、`selection_reason`、`rejected[]` を保存する。

## Step 6: define direct callouts
図表が「読まないと分からない」状態を避けるため、必要な場合だけ `visual.callouts` を定義する。

優先対象：
- `key_value`: 判断に効く代表値
- `endpoint`: 終点・目標値
- `gap`: 対象間の乖離。必要なら両矢印ブラケット + `○○pt`
- `threshold`: 判断境界
- `forecast_boundary`: 実績と予測の境界
- `local_judgment`: headの一節を図内で局所化する短い注記

`local_judgment` は独立した新主張にしない。必ず proof_requirement に紐づける。図表下の独立 So What 帯は作らない。

## Step 7: define page design contract
型が決まった後、page roleに応じて `render.design_contract` を設定する。
- density: analytical | breathing
- primary_focus
- emphasis_targets: 原則1〜2個
- comparison_scale_group: 比較軸共有が必要な場合
- geometry_key: 同roleページの固定geometry識別子
- semantic_redundancy: 色以外の意味手掛かりが必要な場合

デザインのためにbody elementを増やさない。design contractは既存proofを読みやすくするための契約である。

## Step 8: examples
見本が添付されている場合のみ、型決定後に該当見本を見る。見本から借りるのは構図、配置、線種、強調の置き方。数値・文言は素材からのみ取る。

## Simple-page fallback
48型に該当しない単純ページだけ直接選ぶ。
- 数量差 → 棒
- 推移 → 折れ線
- 増減 → 滝
- 歩留まり → ファネル
- 2量の積 → 面積図
- 相関 → 散布
- 密度 → ヒートマップ
- 量と内訳の推移 → 積み上げエリア
- 流れの配分 → サンキー

円グラフは原則使わない。例外は5項目以下で過半判定が目的の場合のみ。

## Actual / forecast
実績と予測を同じ図に置く場合：
- `visual.forecast_present=true`
- 実績と予測の線種・塗りを分ける
- 予測開始点または予測区間を図内に明示する

## Data binding
チャート・表・KPIボックスの値は Evidence を正本として参照する。同一指標を複数要素で使う場合、共通 `data_bindings` を使う。

## Gate 3
BLOCKER:
- 型がヘッドの主要主張を証明できない
- 型に必要なデータを捏造している

ERROR:
- intent 未設定
- 型選択理由がない
- proof_requirements と body_elements の対応がない
- 予測を含むのに実績/予測の区別方法が未定義
- v1.2で `render.design_contract` が未設定

WARN:
- より単純な型で同じ証明ができる
- 見栄えだけで型を選んでいる
- 重要な乖離/閾値が図内に示されず、読者計算を要求している
- emphasis targetが3個以上
- page roleとdensityが不整合

Gate 3通過後：`VISUAL_READY`