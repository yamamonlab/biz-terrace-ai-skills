# DeckSpec Schema v1.2

DeckSpecは全工程の唯一の正本。各工程は既存情報を消さずに追記・更新する。

## Top level

```yaml
deck:
  spec_version: "1.2"
  state: RAW
  mode: source_based            # source_based | research_briefing

  objective:
    background: null
    theme: null
    audience: executive
    decision_goal: null
    key_questions: []
    slide_count: null
    output_mode: design

  research:
    required: false
    status: not_started         # not_started | collecting | complete | not_applicable
    questions: []
    source_policy: primary_first

  template:
    id: null
    application: adaptive       # adaptive | strict_user_request | none
    skipped_roles: []
    notes: []

  brand:
    primary_color: null
    font_family: null
    source: user_or_default

  design:
    system: uchita_consulting_design
    system_version: "1.0"
    theme_profile: null         # forest_green_briefing | custom | null
    user_constraints: []        # explicit user design requirements
    semantic_encoding:
      actual: solid
      forecast: dashed
      planned: outline
      completed: filled
      estimate_marker: "†"
    global_geometry:
      grid_columns: 12
      fixed_head_area: true
      fixed_footer_area: true
    exceptions: []

  governing_message: null
  decisions: []
  evidence: []
  slides: []

  qa:
    status: not_run
    issues: []
```

`brand` は具体的なブランド値、`design` は意味・theme・geometry方針を保持する。v1.1の `brand.theme_profile` はlegacy aliasであり、v1.2では `design.theme_profile` を正本とする。

## State enum
- RAW
- EVIDENCE_READY
- MESSAGE_READY
- STORY_READY
- VISUAL_READY
- RENDERED
- QA_PASSED

## Evidence

```yaml
- id: E001
  content: "..."
  type: fact | metric | opinion | hypothesis | decision | constraint | unknown
  status: confirmed | unverified | contradicted | unknown

  source:
    label: "会議メモ / 月次実績 / 公開レポート等"
    location: null
    organization: null
    title: null
    year: null
    publication_date: null
    url: null
    source_tier: null
    page_or_section: null
    accessed_at: null
    comparability_note: null

  numeric:
    value: null
    display: null
    unit: null
    period: null
    calculation_basis: null
    is_estimate: false
    estimate_method: null
    estimate_marker: null
    series_kind: null           # actual | forecast | target | estimate

  case_study:
    verification: null

  usable_as: proof | context | hypothesis_only | not_usable
```

Rules:
- 数字を含む `metric` は `source.label` / `source.organization` / `numeric.calculation_basis` のいずれかが必要。
- `numeric.is_estimate=true` なら `numeric.estimate_method` または `numeric.calculation_basis` が必要で、表示時は `†` を付ける。
- `series_kind=forecast` は実績と視覚的に区別する。
- 未確認の発言を `proof` にしない。
- 同一内容の重複Evidenceは統合し、出所だけ複数保持してよい。
- 外部調査由来は可能な限り organization / title / year または publication_date を保持する。

## Research questions

```yaml
research:
  required: true
  status: complete
  questions:
    - id: RQ01
      question: "導入率はどこまで進んでいるか"
      decision_relevance: "投資タイミング判断"
      status: answered          # open | answered | insufficient
      evidence_ids: [E001, E002]
```

## Decisions

```yaml
- id: D1
  question: "何を決めるか"
  required_decision: "承認 / 選択 / 見送り / 追加検証等"
  decision_criteria:
    - "..."
  status: open | proposed | decided
  related_slides: [S01]
```

## Design

### user_constraints
ユーザー明示のデザイン要件を自由文ではなく構造化して残す。

```yaml
design:
  user_constraints:
    - id: UC01
      scope: deck                # deck | role:analysis | S03 etc.
      property: primary_color
      value: "#0C3B2E"
      source: user
      hard: true
```

### semantic_encoding
色・線種等の具体表現が変わっても、意味区別を維持するための正本。

```yaml
semantic_encoding:
  actual: solid
  forecast: dashed
  planned: outline
  completed: filled
  estimate_marker: "†"
```

`actual` と `forecast` が同じ表現になる場合、別の視覚手掛かりを `render.design_contract.semantic_redundancy` に追加する。

### exceptions
Design Systemを意図的に外す場合に使用。

```yaml
exceptions:
  - scope: S05
    rule: restrained_emphasis
    reason: "4リスクの同時比較が意思決定に必要"
    approved_by: user_request | design_reason
```

## Slide

```yaml
- id: S01
  no: 1
  role: cover | summary | context | analysis | recommendation | decision | closing | divider
  template_role: null

  question: "このページは何の問いに答えるか"
  judgment: "一言の答え"
  supporting_evidence: [E001]
  research_question_ids: []

  head:
    text: "..."
    sentence_pattern: causal | conditional | contrast | origin | evaluation | proposal | other
    claim_strength: strong | moderate | hypothesis | insufficient
    line_preference: one

  proof_requirements:
    - id: P01
      clause: "ヘッドの一節"
      evidence_ids: [E001]
      body_element_ids: []

  storyline:
    parent_claim: null
    aggregation_to_parent: null
    relation_to_previous: therefore | because | however | parallel | opening | closing
    slice_axis: null
    decision_ids: [D1]

  visual:
    intent: null
    candidates: []
    selected_pattern: null
    selection_reason: null
    rejected: []
    callouts: []
    forecast_present: false
    forecast_encoding: null
    body_elements: []

  source_note:
    evidence_ids: []
    display_text: null
    estimate_disclaimer: false

  render:
    status: not_rendered
    page_size: null
    design_contract:
      density: analytical       # analytical | breathing
      primary_focus: head       # head | title | decision | visual
      emphasis_targets: []      # body/callout IDs, target 1-2
      comparison_scale_group: null
      geometry_key: analytical_default
      semantic_redundancy: []
      notes: []
    notes: []
```

Cover / dividerは分析headの構造例外。その他のページは `head.text` を必須とする。

### Page-role default contract
- cover → density=breathing, primary_focus=title
- divider → density=breathing, primary_focus=title
- summary → density=analytical, primary_focus=head
- context → density=analytical, primary_focus=head
- analysis → density=analytical, primary_focus=head
- recommendation → density=analytical, primary_focus=head
- decision → density=analytical, primary_focus=headまたはdecision
- closing → density=breathingを既定とするが、最重量decision closureならanalyticalも可

## Visual callout

```yaml
- id: C01
  kind: key_value | endpoint | gap | threshold | local_judgment | forecast_boundary
  text: "格差 18pt"
  proof_requirement_ids: [P01]
  evidence_ids: [E001]
  target_body_element_id: B01
```

`local_judgment` は新規主張を追加せず、既存headの一節を図内で局所化する。

## Visual body element

```yaml
- id: B01
  type: chart | table | diagram | text | decision_box | annotation
  purpose: "どの主張節をどう証明するか"
  evidence_ids: [E001]
  proof_requirement_ids: [P01]
  data_bindings:
    - label: "2026"
      evidence_id: E001
      field: numeric.value
  spec: {}
```

数値は `data_bindings` でEvidenceを参照することを優先し、表とグラフに同じ値を手入力しない。

### Bridge spec convention

```yaml
spec:
  chart_kind: bridge
  bridge:
    start: 100
    contributions: [20, -5, 10]
    end: 125
    tolerance: 0.0001
```

### Forecast spec convention

```yaml
visual:
  forecast_present: true
  forecast_encoding:
    actual: solid
    forecast: dashed
    boundary_label: "Forecast"
```

## QA issue

```yaml
- code: H03
  severity: BLOCKER | ERROR | WARN
  stage: evidence | message | storyline | visual | render | qa
  slide_id: S03
  message: "..."
  remediation: "..."
```

## Traceability invariants
完成時：
- 各 `proof_requirements[].evidence_ids` は存在するEvidenceを参照する。
- 各 `proof_requirements[].body_element_ids` は同一slide内のbody elementを1つ以上参照する。
- `data_bindings[].evidence_id` は存在するEvidenceを参照する。
- 推計Evidenceを使うページは `source_note.estimate_disclaimer=true`。
- 同じ数値を複数表示する場合は同じEvidence IDを参照する。
- v1.2の `VISUAL_READY` 以降では `deck.design.system` と各slideの `render.design_contract` を保持する。
- `emphasis_targets` は存在するbody element / calloutを参照することを推奨する。
- Design System例外は `design.exceptions[]` に理由付きで記録する。