<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Flowchart（流れ図）

## 使う条件

- 塊の関係が **依存・因果** で、連鎖が3ステップ以上、または循環・分岐がある。
- 2ステップ以内（A だから B）なら図にせず断定文1文で書く。
- 手順に複数の主体が関わり「誰がやるか」が主題なら `type-process.md`。
- イベントで状態が移ることが主題なら `type-state.md`。

## レイアウト規則

- **形が種別を持つ。** 楕円（`rx=20`）＝始点/終点、角丸矩形（`rx=6`）＝ステップ、菱形＝分岐（出口3つまで）、塗り円（`r=4`）＝合流点。
- 流れは左→右または上→下のどちらかに統一する。混ぜない。
- 分岐から出る矢印は **すべてラベルを付ける**。「はい/いいえ」が自明でも書く。
- accent は「最も重要な分岐」または「破綻している経路」の **どちらか1本** に当てる。両方に当てない。
- 循環（先頭へ戻る）がある時は、戻り矢印を本線の外側（下または上）へ逃がして交差を避ける。
- node ≤9 / edge ≤12。

## Anti-pattern

- 塗り色で種別を示す（形がその役目を持つ）。
- 分岐から出口が4つ以上（入れ子の分岐へ分解する）。
- ラベルのない分岐（何が条件か分からない図は流れ図ではない）。
- 矢印が3本以上交差する（配置をやり直す）。
- 循環を一方向の直線に伸ばして「最後にまた最初へ」と注釈で済ませる。

## テンプレート（循環する連鎖・自己完結）

```html
<figure>
<svg viewBox="0 0 860 200" role="img" aria-label="出力が長すぎることから始まり利用時間が減らない循環">
  <title>トライアル離脱の連鎖</title>
  <desc>出力が長い、読まない、元資料を開き直す、時間が減らない、の4段が循環する。</desc>
  <g font-family="sans-serif" font-size="13" text-anchor="middle" fill="#2d3142">
    <rect x="16" y="40" width="168" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="100" y="71">出力が長すぎる</text>

    <path d="M188 66 H224" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M224 66 l-8 -4 v8 z" fill="#4f5d75"/>

    <rect x="228" y="40" width="168" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="312" y="71">読まない</text>

    <path d="M400 66 H436" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M436 66 l-8 -4 v8 z" fill="#4f5d75"/>

    <rect x="440" y="40" width="168" height="52" rx="6" fill="none" stroke="#2d3142" stroke-width="1"/>
    <text x="524" y="71">元資料を開き直す</text>

    <path d="M612 66 H648" stroke="#4f5d75" stroke-width="1" fill="none"/>
    <path d="M648 66 l-8 -4 v8 z" fill="#4f5d75"/>

    <rect x="652" y="40" width="192" height="52" rx="6"
          fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.2"/>
    <text x="748" y="71">時間が減らない</text>

    <path d="M748 92 V148 H100 V96" stroke="#eb6c36" stroke-width="1" fill="none"/>
    <path d="M100 96 l-4 8 h8 z" fill="#eb6c36"/>
    <text x="424" y="166" font-size="11" fill="#4f5d75">使わなくなる（3日で利用9割減）</text>
  </g>
</svg>
<figcaption>離脱は単発の不満ではなく、先頭へ戻る循環になっている。</figcaption>
</figure>
```

node 4 / edge 4 / focal 1。ステップを足す時は `168+60` ピッチで右へ伸ばし、`viewBox` の幅を同じだけ広げる。
