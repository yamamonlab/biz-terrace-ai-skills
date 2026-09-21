<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Quadrant（2軸配置）

## 使う条件

- 対象を **独立した2軸** の上に置くと、位置そのものが主張になる（コスト×リスク、確度×影響）。
- 軸が3つ以上なら表へ落とす。Quadrant は2軸専用。
- 軸に根拠がない分類（なんとなくの2×2）には使わない。**軸の根拠を原文から引けない時は使わない。**
- 項目 ≤9。

## レイアウト規則

- 2×2。中央を通る十字の軸線（`stroke-width="1"`）。
- **軸ラベルは矢印の先端の外側に1語ずつ。** 軸線の上に置かない。中点にも置かない。`↑` `→` などの記号を文字列に混ぜない。10px、大文字またはカナ、字間を空ける。
- 項目は小さな塗り円（`r=4`）＋ラベル。ラベルは円から 8〜10px 離し、軸線をまたがせない。
- 軸線の真上に項目を置かない（どの象限か判別できない）。
- accent は1項目だけ。
- 象限を4色で塗り分けない。位置とラベルで足りる。

## Anti-pattern

- 4象限を別々の色で塗る（色ノイズが位置の情報を弱める）。
- 軸名がない、または「高い/低い」しか書いていない。
- 項目が軸線上に乗っている。
- 原文に根拠のない位置づけを断定として置く（推測なら図の中でも「推測」と書く）。

## テンプレート（3項目・自己完結）

```html
<figure>
<svg viewBox="0 0 700 420" role="img" aria-label="候補3社を初年度費用とデータ外部保管の2軸で配置">
  <title>候補3社の位置づけ</title>
  <desc>横軸は初年度費用、縦軸はデータの外部保管。コンパス社は費用が高いが外部保管なし、アルファ社は費用が高く外部保管あり、ブリッジ社は費用が安く国内保管。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <line x1="350" y1="56" x2="350" y2="360" stroke="#2d3142" stroke-width="1"/>
    <line x1="60" y1="208" x2="644" y2="208" stroke="#2d3142" stroke-width="1"/>
    <path d="M350 56 l-5 9 h10 z" fill="#2d3142"/>
    <path d="M644 208 l-9 -5 v10 z" fill="#2d3142"/>

    <text x="350" y="40" text-anchor="middle" font-size="10" fill="#4f5d75" letter-spacing="2">外部保管あり</text>
    <text x="350" y="384" text-anchor="middle" font-size="10" fill="#4f5d75" letter-spacing="2">社内のみ</text>
    <text x="656" y="212" text-anchor="start" font-size="10" fill="#4f5d75" letter-spacing="2">初年度費用 高</text>
    <text x="48" y="212" text-anchor="end" font-size="10" fill="#4f5d75" letter-spacing="2">初年度費用 低</text>

    <circle cx="492" cy="120" r="4" fill="#4f5d75"/>
    <text x="492" y="104" text-anchor="middle">アルファ社</text>
    <text x="492" y="140" text-anchor="middle" font-size="10" fill="#5f6b80">年720万円 / 法務が指摘</text>

    <circle cx="196" cy="140" r="4" fill="#4f5d75"/>
    <text x="196" y="124" text-anchor="middle">ブリッジ社</text>
    <text x="196" y="160" text-anchor="middle" font-size="10" fill="#5f6b80">月1,100円 / 国内（未確認）</text>

    <circle cx="540" cy="296" r="4" fill="#eb6c36"/>
    <text x="540" y="280" text-anchor="middle" fill="#eb6c36">コンパス社</text>
    <text x="540" y="316" text-anchor="middle" font-size="10" fill="#5f6b80">初年度最高 / 2年目以降最安</text>
  </g>
</svg>
<figcaption>費用と保管場所はトレードオフになっており、1社だけが両立していない。</figcaption>
</figure>
```

項目 3 / focal 1。項目を足す時は同じ半径の円で置き、ラベルの衝突が起きるなら項目を減らす（縮小しない）。
