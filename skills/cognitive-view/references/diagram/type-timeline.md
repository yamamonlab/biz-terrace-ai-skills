<!-- Derived from diagram-design (MIT, origin https://github.com/cathrynlavery/diagram-design) — copied so cognitive-view works standalone. -->

# Timeline

## 使う条件

- 塊の関係が **時系列** で、かつ次のいずれかが意味を持つ。
  - 時点の**間隔**（空いた期間そのものが論点）
  - **並行**（同時に走った別トラックがある）
  - **逆順**（本来の順序と実際が食い違う）
  - **分岐**（ここから先が未確定）
- 時点が3つ以下、または各時点の情報が1つずつなら **日付付き箇条書き**。Timeline 図にしない。

## レイアウト規則

- 水平のヘアライン基準線を中央に引く（`stroke-width="1"`）。
- 事象は基準線上の塗り円（`r=4`）。主要な転換点だけ accent の `r=6`。
- ラベルは基準線の上下に振り分けて衝突を避ける。日付は円の真下に 11px で置く。
- **間隔は正直に刻む。** 等間隔に見せるために実際の間隔を潰さない。空白期間があるならその分だけ空ける。
- 並行トラックは **2本まで**。未確定のまま走ったものは破線（`stroke-dasharray="5 4"`）にし、何が破線かをラベルで書く。
- 未来・未確定の区間は破線で伸ばし、終点に円を置かない。
- node ≤9（事象 + トラック）。

## Anti-pattern

- 間隔が違うのに等間隔で並べる（時間の情報が消える）。
- 単位・年が書いていない（「3月」だけでは何年か分からない）。
- ラベルを上下に振らず重ねる。
- 未確定の予定を確定した事象と同じ実線・同じ円で描く。
- 並行トラックを3本以上重ねる（表へ落とす）。
- 日付ラベルを薄いグレーで置く（`#5f6b80` より薄くしない。11px はコントラスト比 4.5:1 以上が要る — `grammar.md` §5）。

## テンプレート（並行する未確定トラック付き・自己完結）

```html
<figure>
<svg viewBox="0 0 860 220" role="img" aria-label="5月から今回までの経緯と、並行して未確定のまま走った前提">
  <title>検討の経緯と未確定のまま並走した前提</title>
  <desc>5月から今回まで5時点。6月はヒアリングのみで間隔が空く。セキュリティ要件・想定人数・全社方針は5月から今も未確定のまま並走している。</desc>
  <g font-family="sans-serif" font-size="12" fill="#2d3142">
    <line x1="56" y1="88" x2="812" y2="88" stroke="#4f5d75" stroke-width="1"/>

    <circle cx="56" cy="88" r="4" fill="#4f5d75"/>
    <text x="56" y="72" text-anchor="middle">アンケート</text>
    <text x="56" y="108" text-anchor="middle" font-size="11" fill="#5f6b80">5月</text>

    <circle cx="240" cy="88" r="4" fill="#4f5d75"/>
    <text x="240" y="126" text-anchor="middle">ヒアリングのみ</text>
    <text x="240" y="108" text-anchor="middle" font-size="11" fill="#5f6b80">6月</text>

    <circle cx="424" cy="88" r="4" fill="#4f5d75"/>
    <text x="424" y="72" text-anchor="middle">一次選定 3社</text>
    <text x="424" y="108" text-anchor="middle" font-size="11" fill="#5f6b80">7月</text>

    <circle cx="608" cy="88" r="4" fill="#4f5d75"/>
    <text x="608" y="126" text-anchor="middle">部分トライアル</text>
    <text x="608" y="108" text-anchor="middle" font-size="11" fill="#5f6b80">8月</text>

    <circle cx="812" cy="88" r="6" fill="#eb6c36"/>
    <text x="812" y="70" text-anchor="end" fill="#eb6c36">第3回定例</text>
    <text x="812" y="108" text-anchor="end" font-size="11" fill="#5f6b80">今回</text>

    <line x1="56" y1="168" x2="812" y2="168" stroke="#8a2f2f" stroke-width="1" stroke-dasharray="5 4"/>
    <text x="56" y="188" font-size="11" fill="#8a2f2f">未確定のまま並走: セキュリティ要件 / 想定人数の定義 / 全社方針（5月〜現在）</text>
  </g>
</svg>
<figcaption>費用の比較だけが進み、前提3件は一度も確定していない。</figcaption>
</figure>
```

事象 5 / 並行トラック 1 / focal 1。時点を足す時は `x` を実際の間隔に比例させ、`viewBox` の幅を伸ばす。
