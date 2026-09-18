---
name: japanese-pptx-skills
description: Turn transcripts, meeting notes, analyses, or research themes into decision-oriented executive slides. Enforces Evidence → Message → Storyline → Visual → Render → QA, separates thinking from design, uses progressive disclosure for 48 visual patterns/templates/themes, and preserves traceability from every claim and number to source or assumption.
---

# Japanese PPTX Skills — うちた式コンサルスライドメーカー

## Purpose
経営会議で「読んで終わり」ではなく「決めて終わり」になる資料を設計する。

図やデザインから作り始めない。必ず次の状態遷移を守る。

`RAW → EVIDENCE_READY → MESSAGE_READY → STORY_READY → VISUAL_READY → RENDERED → QA_PASSED`

1枚物では `STORY_READY` を省略してよい。

## Architecture
このSkillは5層で運用する。

1. **Thinking System** — `SKILL.md`：何を、どの順番で考えるか
2. **Design System** — `DESIGN.md`：何を良いスライドデザインとするか
3. **State** — `DeckSpec`：全工程のSingle Source of Truth
4. **Knowledge** — `references/`：Evidence、Message、Storyline、48型、Template、Theme等
5. **Tests** — `scripts/` + `references/05-qa.md`：LLM QAと機械QA

原則：ThinkingとDesignを混ぜない。Message / Storylineが固まる前にデザインを先回りさせない。

## Non-negotiables
- 素材・公開ソースにない事実、数字、因果、固有名詞を補完しない。
- 不明な数値は `xx`、確認不能な事実は `[未確認]`、推論は `[仮説]` と明示する。
- 推計値は確定値と混ぜず `†` を付け、試算前提または推計方法を保持する。
- 表紙・中扉を除き、各ページは1メッセージ。分析ページのheadは主語・述語・判断語を持つ完全文にする。
- 示唆はheadに置く。図表下の独立したSo What帯は使わない。
- ただし図内には乖離、閾値、終点、現在地、局所判断など、headを証明する注記を直接置いてよい。
- headの各主張節はEvidence IDと本体要素に追跡可能にする。
- 数字には出所または試算前提を持たせる。
- 同じ数値を表とグラフで再入力しない。共通Evidence / data bindingを正本として再利用する。
- Rendererは意味を変更しない。head、数字、型の変更が必要なら前工程へ戻る。
- Designは論証を強化するために使い、論証の代わりにしない。
- Quality Gateを通る前に次工程へ進まない。

## Inputs
分かる範囲だけ使う。空欄は許容する。

- `background`: 誰に見せ、何を決めさせたいか
- `theme`: 調査起点の場合のテーマ
- `audience`: executive / practitioner / general
- `key_questions`: 特に重視する論点
- `slide_count`: 1 または概数
- `output_mode`: design / html / pptx（A/B/Cも同義）
- `brand`: ブランド色・フォント等
- `design_constraints`: 明示的なデザイン要件
- `materials`: 文字起こし、会議メモ、表、分析、既存資料など
- `research_request`: 公開調査・公式統計・具体事例の収集が必要か
- `template_preference`: 指定テンプレートがある場合
- `reference_examples`: 61枚見本等がある場合のみ

入力不足を埋めるために事実を捏造しない。作業継続可能なら `unknown` のまま進める。

## Single Source of Truth
全工程で `DeckSpec` を唯一の正本として更新する。自由文の中間成果物を別管理しない。

最初に `references/schemas.md` を読み、DeckSpecの必須フィールド・状態・design contractを理解する。

## Progressive disclosure policy
必要な段階までreferenceを読まない。

- RAW → Evidence referenceだけ
- EVIDENCE_READY → Message reference
- MESSAGE_READY → Storyline reference
- STORY_READY → Visual router
- `visual_intent`確定後 → `DESIGN.md` + 該当pattern familyのみ
- VISUAL_READY → Render rules + user/theme/default tokens
- QA → QA reference / scripts

48型、11枚template、themeを一度に読み込まない。

## Mode routing
通常は `source_based`。次のいずれかなら `research_briefing` を使う。
- ユーザーが調査、公開統計、外部事例、最新データの収集を明示している。
- テーマだけが与えられ、経営層向けブリーフィングを求めている。
- 与えられた素材だけでは主要主張の根拠が不足し、外部公開情報で補強することが依頼範囲に含まれる。

`research_briefing` では工程0開始時に `references/00b-research-mode.md` を読む。ユーザーが外部調査を禁止している場合は使わない。

経営層向け調査ブリーフィングで、11枚前後または「標準構成」が求められる場合のみ `references/templates/executive-briefing-11.md` を読む。templateはstoryline仮説であり、Evidence / Message / Storylineを上書きしない。

## Workflow

### 0. Evidence
状態が `RAW` のときのみ実行する。

1. `references/00-evidence.md` を読む。
2. `research_briefing` の場合は `references/00b-research-mode.md` も読む。
3. 素材と調査結果を fact / metric / opinion / hypothesis / decision / constraint / unknown に分解する。
4. Evidence IDを付与し、数字の出所・単位・期間・試算前提・推計フラグを保持する。
5. Gate 0を実行する。
6. 合格したら `EVIDENCE_READY`。

### 1. Message
状態が `EVIDENCE_READY` のとき実行する。

1. `references/01-head-message.md` を読む。
2. 各ページが答える問い、判断、根拠を決める。
3. 図・template・themeを考える前にheadを書く。
4. 各節とEvidence IDの対応 `proof_requirements` を作る。
5. Gate 1を実行する。
6. 合格したら `MESSAGE_READY`。

### 2. Storyline
複数枚で、状態が `MESSAGE_READY` のとき実行する。

1. `references/02-storyline.md` を読む。
2. 必要条件を満たす場合のみ `references/templates/executive-briefing-11.md` を補助参照する。
3. governing messageを1つ立てる。
4. 論点・意思決定を3〜6個に整理する。
5. page ledgerを作り、縦・横の論理を検証する。
6. templateを使う場合も、不要ページは削除・統合し、必要ページは追加してよい。
7. Gate 2を実行する。
8. 合格したら `STORY_READY`。

1枚物はGate 1通過後にVisualへ進める。

### 3. Visual
状態が `STORY_READY`、または1枚物で `MESSAGE_READY` のとき実行する。

1. `references/03-visual-router.md` を読む。
2. headの主要動詞とproof structureから `visual_intent` を1つ選ぶ：
   - decide
   - decompose
   - compare
   - change
   - relationship
   - timeline
   - structure
3. `visual_intent` 確定後に初めて `DESIGN.md` を読む。
4. **48型を全部読まない。** 該当するpattern familyだけ読む。
5. 候補を最大3型に絞り、proof mechanism、required data、pattern invariantsを比較する。
6. 1型を選び、採用理由と不採用理由をDeckSpecに記録する。
7. 見本が提供されている場合のみ、型選定後に該当見本を参照する。
8. キー値・終点・乖離・閾値・実績/予測境界など、図内calloutを定義する。
9. page roleに応じた `render.design_contract` を設定する。
10. Gate 3を実行する。
11. 合格したら `VISUAL_READY`。

Intentと参照先：
- decide → `references/patterns/decide.md`
- decompose → `references/patterns/decompose.md`
- compare → `references/patterns/compare.md`
- change → `references/patterns/change.md`
- relationship → `references/patterns/relationship.md`
- timeline → `references/patterns/timeline.md`
- structure → `references/patterns/structure.md`

### 4. Render
`output_mode` が html または pptx で、状態が `VISUAL_READY` のとき実行する。

1. `DESIGN.md` を再参照する。
2. `references/04-render-rules.md` を読む。
3. `deck.design.user_constraints` を適用する。
4. `deck.design.theme_profile` がある場合のみ該当 `references/themes/*.md` を読む。
5. theme/user指定で埋まらない具体値のみ `references/brand-defaults.md` で補う。
6. 確定したVisualSpecとdesign contractを忠実に描画する。
7. 意味・数字・論理・型は変更しない。
8. Gate 4を実行する。
9. 合格したら `RENDERED`。

`output_mode=design` の場合は実ファイルRenderを行わず、VisualSpec + design contractまでを出力する。

### 5. QA
`output_mode=design` ではVisualSpec / design contractに対して、html/pptxでは描画後成果物に対して実行する。

1. `references/05-qa.md` を読む。
2. LLM検査と機械検査を分ける。
3. BLOCKER / ERROR / WARNを記録する。
4. 推計表記、実績/予測区別、ブリッジ検算、表/グラフ整合、出典、Design System適合も検査する。
5. BLOCKERまたはERRORがあれば該当工程へ戻して修正する。
6. 合格したら `QA_PASSED`。

## Design resolution
Designの責務は次の通り。

- `DESIGN.md`: 不変の意味原則・視覚文法
- selected pattern: 型固有のlayout invariant
- `deck.design.user_constraints`: ユーザー明示要件
- `references/themes/*.md`: 案件向けtheme token
- `references/brand-defaults.md`: fallback token
- `references/04-render-rules.md`: 描画実装

Design上の例外は `deck.design.exceptions[]` に理由とscopeを記録する。

## Output Routing
- `design`: DeckSpecのstoryline / slide ledger / VisualSpec / design contract / 未確認事項 / QA結果を返す。
- `html`: HTML成果物 + DeckSpec要約 + QA結果を返す。
- `pptx`: 編集可能PPTX + DeckSpec要約 + QA結果を返す。

## Decision-first deck rules
複数枚の意思決定資料では次を守る。
- 冒頭summaryで論点・求める決定・主要根拠・参照ページを予告する。
- 論点は資料全体で3〜6個。
- 最終ページは同じDecision IDを回収し、決定事項・直近日程・判断基準を載せる。
- 最終ページを最も重い意思決定ページにする。

調査ブリーフィングでは、外部環境の説明だけで終えず、最後に「自社として何を決めるか / 何を始めるか」に接続する。

## Priority when rules conflict
全体優先順位：
1. 事実の正確性と非捏造
2. 意思決定への寄与
3. headと証拠の論証一致
4. 資料全体の論理整合性
5. データの追跡可能性と検算可能性
6. Design SystemのSemantic invariants
7. selected patternのlayout invariants
8. ユーザー明示のデザイン要件
9. theme / brand defaultの形式規則
10. 美観

## Completion criteria
次をすべて満たしたときのみ完成とみなす。
- headだけを縦読みして結論と論点を再構成できる。
- すべての分析headが判断語を持ち、逆テストを通る。
- すべての実質数値に出所または試算前提がある。
- 推計値は `†` と推計注記で識別できる。
- headの各節を証明する本体要素を指させる。
- 同じ数値を使う表とグラフが共通Evidence / data bindingを参照している。
- 実績と予測が視覚的に区別され、予測区間が明示されている。
- ブリッジ型は起点＋寄与＝終点が検算一致する。
- Decision IDがSummaryとClosingで一致する。
- page roleに対応するdesign contractがあり、主要強調が過剰でない。
- 色だけに意味を依存していない。
- 同roleページのgeometryが不必要に揺れていない。
- 描画後のoverflow、範囲外配置、重大な重なりがない。