# Production Brief

選択された案を生成とQAが共有する制作契約です。未確認の値は空欄・nullにし、推測で埋めません。

```yaml
selected_concept: A
selection_source: user # user | delegated-recommendation
communication_goal: ""
event_value:
  purpose: ""
  timely_reason: ""
  business_value: ""
  audience: ""
listing_title: "" # 掲載用の題名。参照用で、画像には載せない
headline_source: user # user | listing-title | approved-proposal
exact_text:
  headline: ""
  subline: ""
  tag: ""
  event_name: ""
  datetime: ""
  venue: ""
  format: ""
  organizer: ""
display_constraints:
  min_display_width_px: null # 掲載面の最小表示幅（CSS px）。分かる場合だけ入れる。nullならQAは120として扱う
  list_treatment: "" # 例: 一覧で彩度を落とす
  square_required: false
series:
  past_families: [] # シリーズの過去回の系統
  family: "" # 今回の系統と選んだ理由
lettering_grammar:
  semantic_anchor: ""
  transformations: []
  integration_points: []
layout_density: medium
composition:
  primary_ratio: "16:9"
  headline_zone: ""
  metadata_zone: ""
  safe_margin: ""
  square_recomposition: ""
palette:
  background: ""
  primary_text: ""
  accent: []
  reason: ""
texture: none
reference_layers:
  provided: false
  intent: null # method-only | visual-style | layout-only
  adopt: []
  reject: []
exclusions: []
generation_handoff:
  tool: null # 利用者が使用を許可した機能。未選択ならnull
  additional_text: forbidden
  unapproved_logos: forbidden
```

## 制作上の確認

- 画像の見出し（`exact_text.headline`）は掲載用の題名（`listing_title`）と別の値を取れます。見出しを提案して承認を受けた場合は`headline_source: approved-proposal`とします。承認された見出しは言い換えず、日時・場所・形式は確定情報だけ載せます。
- 見出しは既製の書体を置くのではなく、字そのものを手で組みます。
- 文字表現は「意味→視覚的な動作→字に融合する箇所」を1〜3個に絞ります。フォント指定だけでは不十分です。
- 参照の制作思想と外観を分け、元イベントのコピーや固有モチーフを持ち込みません。
- 1:1は別レイアウトです。16:9の中央cropで代替しません。
- 生成機能がない場合もこのBriefと生成用プロンプトを納品できます。その場合、画像未生成と明記します。

## 成果物記録（sidecar）

```yaml
manifest_version: 1
event_slug: example-workshop
destination: luma
concept_options: [] # 提示案のID、名前、発想レンズ、順位
selected_concept: A
selection_source: user
production_brief: {} # 上記の確定内容を保持
variants:
  - id: landscape
    requested_aspect: "16:9"
    actual_width: null
    actual_height: null
    path: null # 利用者の保存先または取得リンク
    version: v01
    source_png: null
    sha256: null
    status: not_generated # not_generated | generated
qa:
  status: not_checked # not_checked | pass | revise | reject
  checks:
    exact_copy: not_checked
    text_as_art: not_checked
    readability: not_checked
    aspect_ratio: not_checked
    square_recomposition: not_applicable
    artifact_integrity: not_checked
  limitations: []
```

パスは利用者の環境で決めます。秘密情報を含めず、生成画像やイベントの非公開資料をこの公開リポジトリへ保存しません。既存版を上書きしません。

ローカル画像を取得できる場合はSHA-256と実寸を検証します。取得できない場合はnullと理由を残し、未検証をpassにしません。総合passは必要な確認がすべて済んだ場合だけです。公開可否の最終判断は利用者が行います。
