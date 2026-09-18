# DESIGN.md — Uchita Consulting Slides Design System

## Purpose
このファイルは、このSkillが生成するスライドの**不変のデザイン思想と視覚文法の正本**である。

スライドは「装飾されたプレゼン」ではなく、**意思決定を最短距離で支援する視覚的論証**として設計する。

デザインの優先順位：
1. 論証の明瞭さ
2. 情報階層
3. 比較可能性
4. 視線誘導
5. 可読性
6. 美観

美観のために1〜5を犠牲にしない。

## When to load
- Message / Storyline 完成前には読み込まない。
- Visual工程で `visual_intent` を確定した後、pattern familyを選ぶ前に読む。
- Render工程では再参照し、具体的な描画は `references/04-render-rules.md` に従う。

この順序により、デザインが主張や論理を先回りして決めないようにする。

## Design layers
デザインを5層に分ける。

1. **Semantic invariants** — 意味を守る不変原則。このファイルで定義する。
2. **Pattern invariants** — 選択した48型固有の構図・線種・比較方法。
3. **User constraints** — ユーザーが明示したブランド・色・書体・レイアウト要件。
4. **Theme profile** — `references/themes/*.md` の案件向けスキン。
5. **Defaults** — `references/brand-defaults.md` の既定値。

競合時：
- 事実・比較可能性・証拠対応などSemantic invariantは、装飾上の指定より優先する。
- ユーザー指定は、Semantic invariantを壊さない範囲でtheme/defaultより優先する。
- 選択したpatternを使う限り、そのpattern invariantを守る。守れない場合はpattern選定へ戻る。
- themeは未指定部分だけを補う。
- defaultは最後のfallback。

## Core principles

### 1. Message dominance
分析ページで最も強い情報はhead message。
- 図、写真、KPI、章ラベルがheadより先に主張してはいけない。
- titleとheadを分ける場合も、headを意味上・視覚上の主役にする。
- cover / dividerは例外。

### 2. Evidence alignment
headの各主張節と、それを証明する本体要素の対応を視覚的に追えるようにする。
- 近接
- 同列/同行
- 番号
- 接続線
- 共通の強調
のいずれかを使う。

### 3. Position has meaning
位置は装飾ではなく意味を持つ。
- 同じ意味の列・時点・工程・プレイヤーは同じ位置に置く。
- Before/Afterでは消える要素を詰めず、同位置に残像として示す。
- ページ間で同じ役割を持つ領域は可能な限り固定する。

### 4. Comparison requires common scales
比較は共通の物差しで行う。
- 軸、単位、期間、基準線、箱の高さ等を揃える。
- 見た目だけで差を誇張しない。
- 軸切断やスケール変更が判断を歪める場合は使わない。

### 5. Restrained emphasis
強調は判断に必要な箇所だけに使う。
- 原則として1ページの主要強調は1〜2箇所。
- すべてを色付け・太字化しない。
- 強調対象は `render.design_contract.emphasis_targets` に記録できる。

### 6. No decorative UI
意味を持たない装飾を避ける。
- 影、グラデーション、3D、装飾目的の丸角カードを基本的に使わない。
- 意味のないアイコン、写真、イラストを追加しない。
- 区切りは余白、細線、文字サイズ差、整列で作る。

ユーザーが装飾を明示した場合も、情報階層を壊さない範囲に限定する。

### 7. Density by page role
情報密度はページ役割で変える。
- `analysis / summary / recommendation / decision`：証拠密度を高くしてよい。
- `cover / divider / closing`：余白を使い、呼吸させる。
- 高密度でも、すべての要素が同じheadの証明に寄与すること。

### 8. Annotation over legend hunting
重要な意味は図の近くに置く。
- キー値
- 終点
- 乖離
- 閾値
- 現在地
- 実績/予測境界
を必要に応じて直接注記する。

読者に「凡例→図→本文」を往復させない。

### 9. Stable geometry
資料全体で固定すべき領域を固定する。
- head area
- body grid
- footer
- source note
- page number
- 共通軸・時間軸

安定したgeometryは、ページ間比較と高速スキャンを助ける。

### 10. Executive scanability
分析ページは5秒で次が認識できる状態を目標とする。
1. 何を言っているか
2. 何が根拠か
3. どこを見るべきか
4. 必要なら何を決めるか

### 11. Semantic redundancy
意味を色だけに依存させない。
- actual / forecast → 線種 + ラベル
- selected / unselected → 塗り + 枠/ラベル
- risk → 色 + 記号/文言
のように、最低2つの手掛かりを持たせる。

### 12. Editorial consistency
表記ルールを資料全体で統一する。
- 単位
- 桁数
- 符号
- % / pt
- 実績/予測
- 年月形式
- Source表記
- 注記記号

デザイン上の一貫性だけでなく、読み方の一貫性を守る。

## Visual hierarchy
原則として次の順に視線が流れるようにする。

`Head → Primary proof → Key callout → Supporting proof → Source / footnote`

ただし選択pattern固有の視線順がある場合はpattern invariantを優先する。

## Typography principles
- 書体は案件内で統一する。
- 文字サイズ差は情報階層のために使う。
- 小さな文字で情報量問題を解決しない。削除・統合・ページ分割を先に検討する。
- 数字・単位・注記のベースラインを揃える。
- headは1行優先、必要時のみ2行。

具体的なfont family / size / line heightはthemeまたはrender adapterで決める。

## Color principles
- 少色を基本とする。
- 主色は「重要だから」ではなく「何を意味するか」を決めて使う。
- neutralは比較対象・過去・非重点等に使う。
- warning/accentは限定的に使う。
- theme固有の色コードはこのファイルに置かない。

## Table principles
- 表は読み物ではなく比較装置として設計する。
- 比較軸を列または行に固定する。
- 数値は原則右寄せ、ラベルは左寄せ。
- 不要な縦罫線・外枠を使わない。
- 重要セルだけを限定的に強調する。

## Chart principles
- default decorationを除去する。
- データインクより装飾が勝たない。
- 凡例探索より直接ラベルを優先する。
- 読者に暗算させる重要差分は直接表示する。
- 実績、予測、目標、推計を視覚的に混同させない。

## Diagram principles
- 矢印は「流れ・因果・受け渡し」があるときだけ使う。
- 線種に意味を持たせたら資料内で固定する。
- ボックス数を増やして網羅感を演出しない。
- 配置方向は時間・工程・階層など意味軸に従う。

## Page-role design contract
推奨値：

| role | density | primary focus | whitespace |
|---|---|---|---|
| cover | breathing | title / motif | high |
| divider | breathing | section transition | high |
| summary | analytical | head + decision/evidence | medium |
| context | analytical | head + framing evidence | medium |
| analysis | analytical | head + proof | low-medium |
| recommendation | analytical | head + choice logic | medium |
| decision | analytical | head + decision box | medium |
| closing | breathing | decision closure / next action | high |

`closing` が最重量の意思決定ページである場合、証拠密度は高くてよいが、視線の主役は決定事項にする。

## Exceptions
このDesign Systemを意図的に外す場合は、DeckSpecの `design.exceptions[]` に記録する。

```yaml
design:
  exceptions:
    - scope: S05
      rule: restrained_emphasis
      reason: "4リスクを同時に比較する必要があるため"
      approved_by: user_request
```

「見栄えのため」は例外理由にしない。

## Anti-patterns
- headと図が別のことを言う
- すべての要素が同じ強さ
- 色数でカテゴリを増やす
- 小さい文字で詰め込む
- 軸・単位・期間がページ内で混在
- 箱を並べただけの“カードUI”
- 図表下の独立So What帯
- 凡例を読まないと主要差分が分からない
- 画像化された表・チャートをPPTXに貼るだけ

## Handoff to rendering
DESIGN.mdは「何を良いデザインとするか」を定義する。
具体的な座標、margin、grid、線幅、adapter実装は `references/04-render-rules.md` が担う。
色・書体の具体値は user constraints → selected theme → brand defaults の順に解決する。