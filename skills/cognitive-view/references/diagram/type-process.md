<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Process（主体つき手順）

## 使う条件

- 手順が順に進み、かつ **誰がやるか** が主題の一部である（引き継ぎ・責任分界が論点）。
- 主体が1つしかない、または主体が論点でないなら `type-flowchart.md`。
- 主体は **2〜4レーン**、工程は **3〜6ステップ**。超えたら表へ落とす。

## レイアウト規則

- レーン（主体）を水平帯として上下に積み、左端の列にレーン名を置く。
- 工程は左→右。各セルに入るのは1つの作業だけ。
- 引き継ぎは矢印で示す。**レーンをまたぐ矢印だけ**を描き、同一レーン内の連続は矢印を省いてよい。
- 空セルは何も描かない。枠だけ並べて埋めない。
- 担当が未決の工程は破線枠にし、レーン名を置かず「未決」とラベルする。
- accent は「止まっている工程」または「最重要の引き継ぎ」の1つだけ。
- node ≤9 / edge ≤12。

## Anti-pattern

- レーンの責任主体が曖昧なまま使う（誰の帯か分からないなら流れ図でよい）。
- 全セルを埋めて格子にする（空白も情報）。
- 繰り返す工程を一方向に伸ばす（循環は流れ図へ）。
- レーン名を色だけで区別する（必ず文字で置く）。

## テンプレート（3レーン × 3工程・自己完結）

```html
<figure>
<svg viewBox="0 0 860 260" role="img" aria-label="法務・情報システム部・担当未決の3主体にまたがる宿題の引き継ぎ">
  <title>次回までの宿題と担当</title>
  <desc>法務が契約書を確認し、情報システム部が想定人数の定義を統一する。出力ルールの担当は未決で止まっている。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <line x1="132" y1="32" x2="132" y2="236" stroke="rgba(45,49,66,0.20)" stroke-width="1"/>
    <line x1="16" y1="100" x2="844" y2="100" stroke="rgba(45,49,66,0.12)" stroke-width="0.8"/>
    <line x1="16" y1="168" x2="844" y2="168" stroke="rgba(45,49,66,0.12)" stroke-width="0.8"/>

    <text x="24" y="70" font-size="11" fill="#4f5d75">法務</text>
    <text x="24" y="138" font-size="11" fill="#4f5d75">情報システム部</text>
    <text x="24" y="206" font-size="11" fill="#4f5d75">担当未決</text>

    <text x="220" y="26" font-size="10" fill="#5f6b80" text-anchor="middle">1 確認</text>
    <text x="448" y="26" font-size="10" fill="#5f6b80" text-anchor="middle">2 統一</text>
    <text x="676" y="26" font-size="10" fill="#5f6b80" text-anchor="middle">3 決定</text>

    <rect x="140" y="44" width="160" height="44" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="220" y="71" text-anchor="middle">契約書の文面確認</text>

    <rect x="368" y="112" width="160" height="44" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="448" y="139" text-anchor="middle">想定人数の定義</text>

    <rect x="596" y="180" width="160" height="44" rx="6"
          fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.2" stroke-dasharray="5 4"/>
    <text x="676" y="207" text-anchor="middle" fill="#eb6c36">出力ルール</text>

    <path d="M300 66 H340 V134 H364" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M364 134 l-8 -4 v8 z" fill="#4f5d75"/>
    <path d="M528 134 H568 V202 H592" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M592 202 l-8 -4 v8 z" fill="#4f5d75"/>
  </g>
</svg>
<figcaption>3件目だけ担当が決まっておらず、引き継ぎ先が存在しない。</figcaption>
</figure>
```

レーン 3 / node 3 / edge 2 / focal 1。レーンを足す時は高さ 68px 刻みで下へ伸ばし、`viewBox` の高さを同じだけ広げる。
