<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# State（状態遷移）

## 使う条件

- 対象が **有限個の状態** を取り、**イベント** で状態間を移る（検討ステータス、承認フロー、接続状態、ジョブの進行）。
- 状態ではなく作業の順序が主題なら `type-flowchart.md`。
- 状態 ≤6、遷移 ≤12。遷移が状態数の2倍を超えるなら、実は2つの状態機械である。

## レイアウト規則

- 状態は角丸矩形（`rx=8`）。開始は塗り円（`r=6`）、終了は二重円（外 `r=8` 枠 + 内 `r=5` 塗り）。
- 遷移の矢印には **必ず何で移るか** を書く（`イベント [条件]` の形）。無ラベルの矢印を残さない。
- 支配的な流れ方向（左→右または上→下）に沿って並べ、交差する前に配置をやり直す。
- 自己ループは状態の上へ弧を描く。
- 「どの状態からでも起きる」遷移は全状態から線を引かず、注釈1行（`* → 差し戻し`）で書く。
- accent は読者に気づかせたい1状態（多くは詰まっている状態か完了状態）。

## Anti-pattern

- 無ラベルの遷移（何が引き金かを示すのが本来の目的）。
- 状態と作業手順を同じ図に混ぜる。
- 全状態から1つの状態へ線を引いて蜘蛛の巣にする。
- 状態を色で区別して形を揃える（形と位置で区別する）。

## テンプレート（4状態・自己完結）

```html
<figure>
<svg viewBox="0 0 860 200" role="img" aria-label="検討状態が比較中から停止中へ移り、前提確定でのみ判断可能へ進む">
  <title>検討の状態遷移</title>
  <desc>比較中から、前提未確定の発覚で停止中へ移る。停止中からは前提3件の確定でのみ判断可能へ進み、確定しない限り延期へ戻る。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <circle cx="28" cy="80" r="6" fill="#2d3142"/>
    <path d="M38 80 H72" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M72 80 l-8 -4 v8 z" fill="#4f5d75"/>

    <rect x="76" y="56" width="148" height="48" rx="8" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="150" y="85" text-anchor="middle">比較中</text>

    <path d="M224 80 H300" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M300 80 l-8 -4 v8 z" fill="#4f5d75"/>
    <text x="262" y="70" text-anchor="middle" font-size="10" fill="#4f5d75">前提未確定の発覚</text>

    <rect x="304" y="56" width="148" height="48" rx="8"
          fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.2"/>
    <text x="378" y="85" text-anchor="middle" fill="#eb6c36">停止中</text>

    <path d="M452 80 H528" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M528 80 l-8 -4 v8 z" fill="#4f5d75"/>
    <text x="490" y="70" text-anchor="middle" font-size="10" fill="#4f5d75">前提3件が確定</text>

    <rect x="532" y="56" width="148" height="48" rx="8" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="606" y="85" text-anchor="middle">判断可能</text>

    <path d="M680 80 H740" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M740 80 l-8 -4 v8 z" fill="#4f5d75"/>
    <circle cx="756" cy="80" r="8" fill="none" stroke="#2d3142" stroke-width="1"/>
    <circle cx="756" cy="80" r="5" fill="#2d3142"/>

    <path d="M378 104 V148 H150 V108" stroke="#4f5d75" stroke-width="1" fill="none" stroke-dasharray="5 4"/>
    <path d="M150 108 l-4 8 h8 z" fill="#4f5d75"/>
    <text x="264" y="166" text-anchor="middle" font-size="10" fill="#4f5d75">確定しない [次々回へ延期]</text>
  </g>
</svg>
<figcaption>停止中から先へ進む条件は前提3件の確定だけで、他の経路はない。</figcaption>
</figure>
```

状態 3 + 始終点 2 / 遷移 4 / focal 1。状態を足す時は `148+80` ピッチで右へ伸ばす。
