<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Tree（階層・分解）

## 使う条件

- 塊が **親子の包含・分解** を持つ（論点の内訳、構成要素、未確定事項の展開）。
- 相互に参照し合う網構造には使わない（それは階層ではない）。
- 深さは **root + 3段まで**、1段あたりの幅は **5まで**。超えたら分割するか箇条書きへ落とす。

## レイアウト規則

- root を上、子を下へ展開（または root を左、子を右）。
- node は小さなラベル付き矩形（`rx=6`）。幅は **2種類まで**に揃える。高さ 40〜52px。
- **接続線は直角（エルボー）。斜線を使わない。** 親から短い縦線 → 兄弟を結ぶ水平バス → 各子へ短い縦線。
- 接続線を先に描き、その上に node を描く（線が node を横切って見えない）。
- accent は **root か1つの葉のどちらか**。両方に当てない。
- 段を飛ばさない（親から孫へ直接つながない）。

## Anti-pattern

- 斜めの接続線。
- 5段以上の深さを1枚に収める。
- node の幅がばらばら。
- root と葉の両方に accent。
- 単なる列挙を階層に見せる（並列なら箇条書き）。

## テンプレート（root + 3子・自己完結）

```html
<figure>
<svg viewBox="0 0 860 260" role="img" aria-label="判断できない理由が未確定な前提3件に分解される">
  <title>判断できない理由の分解</title>
  <desc>判断できない状態は、想定人数の定義、データ保管場所、構築期間の3件の未確定に分解される。想定人数は費用比較そのものを崩す。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <path d="M430 92 V124 M150 124 H710 M150 124 V152 M430 124 V152 M710 124 V152"
          stroke="#4f5d75" stroke-width="1" fill="none"/>

    <rect x="330" y="40" width="200" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="430" y="66" text-anchor="middle">判断できない</text>
    <text x="430" y="82" text-anchor="middle" font-size="10" fill="#5f6b80">次々回目標・延期の可能性</text>

    <rect x="50" y="152" width="200" height="52" rx="6"
          fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.2"/>
    <text x="150" y="178" text-anchor="middle" fill="#eb6c36">想定人数の定義</text>
    <text x="150" y="194" text-anchor="middle" font-size="10" fill="#5f6b80">費用比較そのものが崩れる</text>

    <rect x="330" y="152" width="200" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="0.8"/>
    <text x="430" y="178" text-anchor="middle">データ保管場所</text>
    <text x="430" y="194" text-anchor="middle" font-size="10" fill="#5f6b80">口頭説明のみが根拠</text>

    <rect x="610" y="152" width="200" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="0.8"/>
    <text x="710" y="178" text-anchor="middle">構築期間3か月</text>
    <text x="710" y="194" text-anchor="middle" font-size="10" fill="#5f6b80">他社事例1件のみ</text>
  </g>
</svg>
<figcaption>3件は並列だが、1件だけが比較の土台そのものを壊す。</figcaption>
</figure>
```

node 4 / 深さ2 / focal 1。子を足す時は水平バスを伸ばし、`200+80` ピッチで並べる。
