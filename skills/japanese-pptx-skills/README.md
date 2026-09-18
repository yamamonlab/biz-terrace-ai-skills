# Japanese PPTX Skills v1.2

Biz-Terrace.aiコミュニティ向け公開版。経営会議向け資料を、`Evidence → Message → Storyline → Visual → Render → QA` の順で作るSkillパッケージです。

v1.2では `DESIGN.md` を追加し、**思考・デザイン・状態・知識・テストを分離**しました。

## Architecture

```text
Thinking System  = SKILL.md
Design System    = DESIGN.md
State            = DeckSpec
Knowledge        = references/
Tests            = references/05-qa.md + scripts/
```

狙いは、デザインを先に考えてストーリーを歪めることを防ぎながら、themeが変わっても「うちた式」の論証・比較・視線設計を維持することです。

## v1.2で追加・整理したもの
- **DESIGN.md**：全theme共通のSemantic invariantsと視覚文法
- **Progressive design disclosure**：Storyline完成後、Visual intent確定時に初めてDesign Systemをロード
- **Design contract**：ページ役割ごとにdensity / focus / emphasis / geometry / semantic redundancyを保持
- **Design precedence**：Semantic invariants → pattern invariants → user constraints → theme → defaults
- **Themeの責務縮小**：色・書体・表・chartのtokenだけを持ち、思想を持たせない
- **Render rulesの責務縮小**：DESIGN.mdを具体座標・adapterへ落とす実装層に限定
- **Design QA**：過剰強調、role-density不整合、semantic redundancy、geometry揺れ、例外未記録を検査
- **DeckSpec v1.2**：`deck.design` と `render.design_contract` を追加

v1.1から引き続き：
- Research Briefing Mode
- Adaptive Executive Briefing 11
- 48 visual patternsの段階的開示
- Forest Green Briefing Theme
- Evidence / Source / Estimate discipline
- Data binding / bridge arithmetic / forecast encoding

## Directory

```text
uchita-consulting-slides/
├── SKILL.md                    # Thinking System / workflow
├── DESIGN.md                   # Design System / visual semantics
├── deckspec.schema.json
├── references/
│   ├── 00-evidence.md
│   ├── 00b-research-mode.md
│   ├── 01-head-message.md
│   ├── 02-storyline.md
│   ├── 03-visual-router.md
│   ├── 04-render-rules.md
│   ├── 05-qa.md
│   ├── schemas.md
│   ├── brand-defaults.md
│   ├── patterns/               # 48型 / 7 families
│   ├── templates/
│   │   └── executive-briefing-11.md
│   └── themes/
│       └── forest-green-briefing.md
├── samples/
│   ├── deckspec.example.yaml
│   └── research-briefing.example.yaml
└── scripts/
    ├── validate_spec.py
    ├── measure_text.py
    └── inspect_render.py
```

## Loading sequence
必要なものだけ段階的に読みます。

```text
RAW
  ↓ Evidence references
EVIDENCE_READY
  ↓ Head-message reference
MESSAGE_READY
  ↓ Storyline / optional template
STORY_READY
  ↓ Visual router
visual_intent fixed
  ↓ DESIGN.md + one pattern family
VISUAL_READY
  ↓ Render rules + user constraints + theme/default tokens
RENDERED
  ↓ QA / scripts
QA_PASSED
```

48型、11枚template、theme、Design Systemを最初から全部ロードしません。

## Design System vs Theme
`DESIGN.md` は「どう見えるべきか」ではなく、より正確には**なぜその見せ方にするか**を定義します。

例：
- 比較は共通スケール
- headを視覚上の主役にする
- 強調は1〜2箇所
- 色だけで意味を表さない
- 同roleのgeometryを安定させる

一方、themeは具体tokenだけを定義します。

例：`forest-green-briefing.md`
- Primary `#0C3B2E`
- 三線表
- hairline
- white background
- amber warning

別ブランドに変えても `DESIGN.md` は変えません。

## Mode routing
### source_based
文字起こし、会議メモ、既存分析など、ユーザー素材を主なEvidenceとして使う通常モード。

### research_briefing
- 公開調査・公式統計・外部事例の収集が明示されている
- themeだけから経営層向けbriefingを作る
- 与えられた素材だけでは根拠が不足し、外部調査が依頼範囲に含まれる

Research Modeでも、Evidence化を終える前にheadやchartを固定しません。

## Executive Briefing 11
11枚は固定formatではなく、storyline hypothesisです。Evidence / Message / Storylineに合わせて削除・統合・追加します。

## DeckSpec v1.2 design fields

```yaml
design:
  system: uchita_consulting_design
  system_version: "1.0"
  theme_profile: forest_green_briefing
  user_constraints: []
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
```

各slide：

```yaml
render:
  design_contract:
    density: analytical
    primary_focus: head
    emphasis_targets: [C01]
    comparison_scale_group: null
    geometry_key: analytical_default
    semantic_redundancy: [line_style, boundary_label]
```

## Quick tests

```bash
python scripts/validate_spec.py samples/deckspec.example.yaml
python scripts/validate_spec.py samples/research-briefing.example.yaml
```

## Invocation examples
素材起点：

```text
この打合せメモから、経営会議で投資判断を決める8枚程度の資料を設計して。
出力はC（編集可能pptx）。ブランド指定なし。
```

テーマ起点：

```text
生成AIの業務活用について、経営層向け11枚のブリーフィングを作って。
公開調査・公式統計・具体事例を調べ、フォレストグリーンのテーマでpptxにして。
```

Skill内部ではユーザーに工程操作を要求せず、必要なreferenceだけを段階的に読み込みます。

## Public distribution

- Public name: **Japanese PPTX Skills**
- Community: **Biz-Terrace.ai**
- Repository path: `skills/japanese-pptx-skills/`
- License: repository-level MIT license applies
