<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Bar（量の比較）

## 使う条件

- **3つ以上の値**があり、その **大小の差そのもの** が主張になる（費用、人数、期間）。
- 値が2つなら文1文（「Aは Bの2.2倍」）。
- 単位が揃っていない値を1つの図に混ぜない（金額と人数を同じ軸に置かない）。
- 棒は **4〜8本**。超えたらまとめるか2枚に分ける。

## レイアウト規則

- 縦棒が既定。カテゴリ名が長い、または8本を超えるなら横棒。
- **y 軸は必ず 0 から始める。** 途中から始めると大小の差が歪む。
- 棒幅は間隔より広くする（間隔が棒より広いと比較しにくい）。
- 値ラベルは各棒の上に 10px で置く。軸を読ませない。
- accent は1本だけ。他は `muted` の薄い塗り。
- 横のグリッド線は極薄（`rgba(45,49,66,0.08)`）で 3〜5本。ベースラインだけ濃くする。
- 推定値・未確認の値は破線枠にし、ラベルに「未確認」と書く。

## Anti-pattern

- y 軸を途中から始める。
- 8本を超える棒を詰め込む。
- 2本以上に accent を当てる。
- 影・立体・グラデーション。
- カテゴリ名を45度以上傾ける（横棒にするか名前を短くする）。

## テンプレート（3カテゴリ・自己完結）

```html
<figure>
<svg viewBox="0 0 700 340" role="img" aria-label="候補3社の初年度費用の比較">
  <title>初年度費用の比較</title>
  <desc>アルファ社は年720万円。ブリッジ社は同人数換算で年330万円。コンパス社は初年度が最も高いが、金額は原文に記載がなく未確認。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <line x1="88" y1="72" x2="652" y2="72" stroke="rgba(45,49,66,0.08)" stroke-width="0.8"/>
    <line x1="88" y1="144" x2="652" y2="144" stroke="rgba(45,49,66,0.08)" stroke-width="0.8"/>
    <line x1="88" y1="216" x2="652" y2="216" stroke="rgba(45,49,66,0.08)" stroke-width="0.8"/>
    <line x1="88" y1="272" x2="652" y2="272" stroke="rgba(45,49,66,0.25)" stroke-width="1"/>
    <line x1="88" y1="56" x2="88" y2="272" stroke="rgba(45,49,66,0.25)" stroke-width="1"/>

    <text x="78" y="76" text-anchor="end" font-size="10" fill="#5f6b80">800</text>
    <text x="78" y="148" text-anchor="end" font-size="10" fill="#5f6b80">600</text>
    <text x="78" y="220" text-anchor="end" font-size="10" fill="#5f6b80">200</text>
    <text x="78" y="276" text-anchor="end" font-size="10" fill="#5f6b80">0</text>

    <rect x="128" y="113" width="112" height="159" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.2"/>
    <text x="184" y="105" text-anchor="middle" font-size="10" fill="#eb6c36">720万円</text>
    <text x="184" y="292" text-anchor="middle">アルファ社</text>

    <rect x="312" y="199" width="112" height="73" fill="rgba(79,93,117,0.15)" stroke="#4f5d75" stroke-width="1"/>
    <text x="368" y="191" text-anchor="middle" font-size="10" fill="#4f5d75">330万円</text>
    <text x="368" y="292" text-anchor="middle">ブリッジ社</text>

    <rect x="496" y="88" width="112" height="184" fill="none" stroke="#8a2f2f" stroke-width="1" stroke-dasharray="5 4"/>
    <text x="552" y="80" text-anchor="middle" font-size="10" fill="#8a2f2f">未確認</text>
    <text x="552" y="292" text-anchor="middle">コンパス社</text>
    <text x="552" y="308" text-anchor="middle" font-size="10" fill="#5f6b80">金額の記載なし</text>
  </g>
</svg>
<figcaption>初年度の順位は付くが、1社は金額そのものが原文にない。</figcaption>
</figure>
```

棒 3 / focal 1 / 未確認 1。棒を足す時は `112+72` ピッチで右へ伸ばし、`viewBox` の幅を広げる。高さは `(値 / 軸上限) × 216` で求める。
