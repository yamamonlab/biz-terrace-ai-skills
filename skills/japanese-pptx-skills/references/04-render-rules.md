# 工程4｜Render Rules

## Role
このファイルは `DESIGN.md` の原則を**具体的な描画仕様へ落とす実装層**である。

Renderer は確定済みの意味を描画する。次は禁止。
- ヘッドの意味変更
- 数値の補完・丸めによる意味変更
- selected_pattern の独断変更
- Evidenceにない注釈の追加
- theme都合でproof mappingを崩すこと

変更が必要なら該当工程へ戻す。

## Design resolution order
Render開始時に次の順で仕様を解決する。
1. `DESIGN.md` のSemantic invariants
2. 選択patternのlayout invariants
3. `deck.design.user_constraints`
4. `deck.design.theme_profile` のtheme reference
5. `references/brand-defaults.md`

ユーザー指定がSemantic invariantを直接壊す場合は、その意味要件を満たす代替表現を選ぶ。例：forecastを実線にする指定がある場合、線種以外の塗り/ラベル/区間背景等でactualと区別する。

## Geometry
### Global frame
- ページサイズをDeckSpecで固定する。
- head area / body area / source/footer areaを分離する。
- 同じpage roleでは主要座標を固定する。
- 12-column gridを既定とし、themeまたはuser constraintで変更してよい。
- 余白はコンテンツ不足を隠す装飾ではなく、情報群の分離に使う。

### Head area
- 分析ページのheadは最上段。
- まず1行を優先し、必要時のみ文節で2行。
- head領域を本文要素で侵食しない。
- title / kicker / chapter labelがあってもheadより視覚的に強くしない。
- cover / dividerは例外。

### Footer area
- source note、document name、page number等は本文と干渉しない固定領域に置く。
- 外部ソースがあるページではSourceを本文要素から分離しても追跡可能にする。

## Proof layout
`proof_requirements` の各節について、対応する `body_elements` を追えること。
- 近接
- 同列/同行
- 番号
- 接続線
- 一貫した強調
のいずれかを使う。

Rendererは `proof_requirements[].body_element_ids` を変更しない。

## Page density implementation
`render.design_contract.density` を使う。
- `analytical`: body areaの証拠占有率を高くしてよい。装飾余白を増やしすぎない。
- `breathing`: 要素数を絞り、余白を積極的に使う。

高密度でも、同じheadを証明しない要素は削除する。

## Axes and scales
- 比較ページでは同じ物差しを守る。
- 同一比較群は `comparison_scale_group` を共有できる。
- 軸切断やスケール差が判断を歪める場合は禁止。
- 予測・実績、確定・仮説、計画・完了は視覚的に区別する。

## Lines
意味を持つ線種は資料内で一貫させる。
型に固有ルールがある場合は型を優先する。

## Color
- `deck.design.semantic_encoding` とtheme/user constraintsを使って意味を固定する。
- 色だけに意味を依存しない。
- emphasis target以外を強調色で塗らない。
- warning色を通常のカテゴリ分けに流用しない。

## Emphasis
- `render.design_contract.emphasis_targets` は原則1〜2個。
- targetはheadの判断に直接寄与する要素に限定。
- emphasis対象が3個以上必要なら、情報構造またはpage splitを再検討する。

## Charts
- デフォルト装飾を削る。
- 不要なグリッド線、枠、3D表現を使わない。
- 凡例より直接ラベルが読みやすい場合は直接ラベルを優先。
- キー値・終点・乖離・閾値・予測境界は `visual.callouts` に従い図上に直接置く。
- 読者に暗算させる重要差分は直接値を示す。

## Local judgment annotation
図内に短い局所判断を置ける。ただし：
- 1チャート原則1つまで
- headの一節を言い換える範囲
- Evidence / proof_requirement に紐づく
- 図表下の独立So What帯にはしない

## Tables
- 数値は右寄せ、ラベルは左寄せを基本。
- 不要な縦罫線・外枠を避ける。
- 同じ数値をチャートと表で使う場合は共通 data binding から描画する。
- 桁数、単位、%/pt表記を列内で統一する。

## Numbers and sources
- 単位、期間、対象範囲を図表内または注記で確認可能にする。
- 出所または試算前提をsource/footer/data noteに保持する。
- 外部調査ページは表示用source noteに原則 `組織名 + レポート名 + 年` を含める。
- 推計値が1つでもあるページは `†：推計値を含む` を表示する。
- 根拠なしの数値は `xx` のまま。

## Actual vs forecast
- 既定はactual=solid、forecast=dashed。
- 予測開始点または予測区間をcaption/図内labelで明示する。
- 公開予測と自前推計を混同しない。
- user constraintで線種を変える場合も、最低2つの視覚手掛かりでactual/forecastを区別する。

## Decision box
決定を求めるページのみ下部または主視線内に配置する。
1行または短いdecision blockとし、本文と競合しない。

## Output adapters
### design
位置、型、証明要素、強調、callout、データ要件、source note、design contractをテキストで明示する。

### html
- 固定スライド比率を使う。
- スライド内部は固定geometryを優先する。
- 印刷/スクリーンショットでも構図が変わらないようにする。
- web UI風の不要なカード化を避ける。

### pptx
- 編集可能なネイティブ要素を優先。
- 表・図形・テキストを画像化しない。参照画像等のみ例外。
- 描画後に寸法、overflow、重なり、slide boundsを検査する。
- 同じroleのhead/footer geometryを可能な限り固定する。

## Gate 4
BLOCKER:
- 描画がheadの意味を変えている
- 本体がproof_requirementsを証明できない
- 表とグラフで同じ指標の数値が矛盾している
- 比較スケールが不正で結論を歪める

ERROR:
- 主要要素がslide bounds外
- 読めない重なり
- 推計値の注記がない
- 実績/予測の意味区別がない
- source/footerが本文と衝突している

WARN:
- emphasis targetが多すぎる
- 情報密度がroleと合っていない
- 視線順が不明瞭
- 重要な乖離を読者に暗算させている
- geometryが同roleページ間で不必要に揺れている

Gate 4通過後：`RENDERED`