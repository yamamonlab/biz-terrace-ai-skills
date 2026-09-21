# Capability Specification — cognitive-view

## Capability Hypothesis

長文を「読まないと分からない状態」から「見れば全体像がつかめる状態」へ変換する。情報を保持したまま、白背景のメトリクス・図解・表と3層の progressive disclosure で読む負担を減らす。

## Contract

```yaml
capability: cognitive-view
user_intent: "長い AI 出力・調査レポート・社内資料の全体像を短時間で把握したい"
inputs:
  - "長文テキスト（AI 出力 / レポート / 会議記録 / 社内資料）— 信頼レベルは source_trust で記録"
  - "comprehension_goal（明示されない場合は推定し、冒頭で確認する）"
  - "mode: UNDERSTAND（既定）| DECIDE（明示要求時のみ）"
outputs:
  - "単一 HTML（inline CSS、外部読み込み・script なし、3層構成）"
  - "Comprehension Brief（監査可能な設計記録）"
  - "quality-rubric 自己採点"
boundaries:
  owns:
    - "何を理解させるか、何を初期表示に出すか、何を畳むか、何を図にするか"
    - "図の描画文法・複雑度予算・型別テンプレート（references/diagram/ に内包。自己完結）"
    - "事実 / 推測 / 未確認 の区別と提示"
    - "3層の情報量上限"
  excludes:
    - "確立した図解型の単図・複数図そのものの納品 → diagram-design 系の手法"
    - "原文の流れを保ったlong-form explainer / document explainer"
    - "長尺音声・動画の省略なしsource / transcript explainer"
    - "会話内だけの軽量なvisualization"
    - "開発/agent operator 向けの運用ダッシュボード"
primary_archetype: transformation
fragility: medium
risk_tier: basic
tools:
  - none（読み書きのみ。外部取得を伴う場合は入力側スキルが担当）
risks:
  - "要約で意味が反転する（原文にない断定を作る）"
  - "図を増やすこと自体が目的化し、散文より遅くなる"
  - "UNDERSTAND で推奨まで踏み込み、判断を先取りする"
  - "未確認・矛盾箇所を省いて見た目を整え、欠落を隠す"
  - "外部読み込みが混入し file:// で壊れる"
baseline: pre-public-canonical executive contract
success_metrics:
  trigger:
    positives:
      - "この Deep Research 結果の全体像を先に掴みたい"
      - "長い議事録を見れば分かる形にして"
    near_misses:
      - "この長文を原文順のまま読みやすくして（→ long-form / document explainer）"
      - "この YouTube を省略せず解説して（→ source / transcript explainer）"
      - "この構成図を1枚描いて（→ diagram-design 系の手法）"
  task: "情報保持率95%以上、表現変換率80%以上、quality-rubric 12/14以上、FAIL gateゼロ。白背景、カード最大4枚、全行バッジ・全行根拠リンクなし"
  efficiency: "入力1本あたり単一 HTML 1ファイル。中間成果物を増やさない"
self_contained: true   # diagram-design 非依存。図まで本 Skill 単体で完結する
assumptions:
  - "既定 Renderer は HTML だが、上流（Brief〜Visual Router）は Renderer 非依存である"
  - "references/diagram/ は diagram-design (MIT) からの部分複製。upstream 追従はしない固定コピーとして扱う"
  - "同一環境に diagram-design があっても参照しない（参照先の二重化を避ける）"
  - "初期実装は yamamonlab/yamamon-lab で開発し、cognitive-view-v1.0.0 から yamamonlab/biz-terrace-ai-skills/skills/cognitive-view を公開正本とする"
  - "イベント・教材・内部runtimeは公開tagまたはcommit SHAを固定して利用する"
```
