# 図の文法（SVG）

`FLOW` `DEPEND` `TIMELINE` と、出来事を重ねた `LINE`、2時点の `BAR` は、**PCで読む前提で SVG で描く**。この文書はその描き方の決まりと、そのまま座標を写して使える見本。忠実さの規則（SKILL.md）はここでも全部効く。見本の `{{…}}` は形だけで、言葉を中身に使わない。

## 1. 画面と寸法

- 図は `FIG` で包み、本文の列（680px）より広い **図の列（最大 880px）** に置く。`viewBox` の幅は **880**、高さは中身に合わせる（目安 200〜420）
- `<svg viewBox="0 0 880 {{高さ}}" width="100%" role="img" aria-label="{{図の1文}}">`。幅が狭い画面では縮小表示になるだけでよい（横スクロールさせない）
- 座標はすべて **8の倍数**（線の太さの調整で ±0.5 は可）。箱の間隔は 32 以上、箱と図の端は 24 以上あける
- 図の要素は **箱9個・線12本まで**。超えるなら図を2枚に分けるか、本文と表に戻す

## 2. 文字

| 用途 | 大きさ | 色 | 備考 |
|---|---|---|---|
| 箱の名前 | 15 | `#1a1c20`、太さ 600 | 1行14字まで。超えたら `<tspan x=".." dy="20">` で改行、3行まで |
| 箱の補足（原文の位置づけ・時点） | 12 | `#6f7582` | 1行18字まで |
| 線のラベル | 12 | `#454a54` | 白の下敷き（下の §4） |
| 列の見出し（例: まだ確かめられていないこと） | 12、字間 `.08em` | `#6f7582`、太さ 700 | 箱の列の上に1つ |

**箱の幅は文字数から決める:** 全角1字 = 文字の大きさ、半角1字 = その0.55倍。`幅 = 最長の行の字幅 + 左右の余白 32`、8の倍数に切り上げ。文字が箱からはみ出したら **箱を広げるか改行する**。文字を縮めない。文字は箱の中央（`text-anchor="middle"`）。

## 3. 箱の種類（意味で選ぶ。飾りで選ばない）

| 意味 | 形 | 線 | 塗り |
|---|---|---|---|
| 原文が事実として書いている出来事・状態 | 角丸の四角 `rx="6"` | `#9aa3b2` 1 | `#fff` |
| その図の中心（1つだけ） | 同じ | `#1d5fbf` 1.5 | `#dce8fa` |
| 結果・困っている状態 | 同じ | `#a85a0a` 1.2 | `#fdf6ec` |
| 未確認・予定・効果未確認の対策 | 同じ | `#6f7582` 1、`stroke-dasharray="4 3"` | `#fff` |
| 原因の起点（原文が「原因」と呼ぶもの） | 左端に幅4の色帯 | 同じ | `#fff` |
| 合流点 | 塗った円 `r="5"` | — | `#454a54` |
| 判断待ち（原文が「〜かどうか」と書く） | ひし形（出口3本まで、出口ごとにラベル） | `#6f7582` 1 | `#fff` |

強調色（`#1d5fbf`）は **1つの図で1か所（箱1つ、または線1本）** まで。

## 4. 線

- **直角に曲がる線だけ**（`path d="M x y H x V y H x"`）。斜めの線・曲線は使わない。曲がり角は2つまで
- 太さ 1.2、色 `#6f7582`。矢印は `<defs>` の `marker` を1つ定義して使い回す
- 実線 = 原文が書いているつながり、破線 `4 3` = 原文が「効果は未確認」「予定」とするつながり。**原文にないつながりは引かない**
- 線は箱の辺の中央から出して、辺の中央に入れる。線が箱を横切らない。線どうしが交差するなら配置を変える
- 線のラベルは、線の曲がっていない区間の中央に置き、下に白の四角（文字幅＋8、高さ18）を敷いて線を隠す
- **描く順番:** 領域の網掛け → 線 → ラベルの下敷き → 箱 → 文字（後に書いたものが上に来る）

```html
<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#6f7582"/></marker></defs>
```
（1ページに複数の図がある時は、`id` を図ごとに変える: `ah1` `ah2` …）

## 5. 凡例と注記

- 破線・色帯・ひし形を使った図は、図の下に `p.legend` で凡例を1行（HTML側。SVG内に書かない）
- 図全体に掛かる但し書き（「分けて測れていない」など原文の言葉）は、SVGの下端に 12px・`#454a54` で1行書くか、`p.brace` を使う
- 読み取りの1文（`fig-r`）は、原文の言葉の範囲で。図の形から原文にない結論（「最大の原因」など）を読ませない

## 6. 見本: 合流する流れ図（FLOW）

独立した原因が、それぞれ原文の書く経路を通って1つの結果に至る。左→右。段数は原因ごとに違ってよい。対策は効く段の真上に破線で。

```html
<svg viewBox="0 0 880 328" width="100%" role="img" aria-label="{{図の1文}}">
  <defs><marker id="ah1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#6f7582"/></marker></defs>
  <g fill="none" stroke="#6f7582" stroke-width="1.2">
    <path d="M200 152 H240" marker-end="url(#ah1)"/><path d="M416 152 H456" marker-end="url(#ah1)"/>
    <path d="M632 152 H672 V195"/><path d="M200 248 H672 V205"/>
    <path d="M677 200 H704" marker-end="url(#ah1)"/>
    <path d="M328 80 V120" stroke-dasharray="4 3" marker-end="url(#ah1)"/>
  </g>
  <circle cx="672" cy="200" r="5" fill="#454a54"/>
  <g font-size="15" font-weight="600" fill="#1a1c20" text-anchor="middle">
    <rect x="240" y="24" width="176" height="56" rx="6" fill="#fff" stroke="#6f7582" stroke-dasharray="4 3"/>
    <text x="328" y="48">{{対策}}</text><text x="328" y="68" font-size="12" font-weight="400" fill="#6f7582">{{時点}}・効果: {{原文の言い方}}</text>
    <rect x="24" y="120" width="176" height="64" rx="6" fill="#fff" stroke="#9aa3b2"/><rect x="24" y="120" width="4" height="64" fill="#1d5fbf"/>
    <text x="112" y="148">{{原因1}}</text><text x="112" y="168" font-size="12" font-weight="400" fill="#6f7582">{{時点・場所}}</text>
    <rect x="240" y="120" width="176" height="64" rx="6" fill="#fff" stroke="#9aa3b2"/><text x="328" y="157">{{原文が書く途中の段}}</text>
    <rect x="456" y="120" width="176" height="64" rx="6" fill="#fff" stroke="#9aa3b2"/><text x="544" y="157">{{その次の段}}</text>
    <rect x="24" y="216" width="176" height="64" rx="6" fill="#fff" stroke="#9aa3b2"/><rect x="24" y="216" width="4" height="64" fill="#1d5fbf"/>
    <text x="112" y="244">{{原因2}}</text><text x="112" y="264" font-size="12" font-weight="400" fill="#6f7582">{{時点・場所}}</text>
    <rect x="704" y="160" width="152" height="80" rx="6" fill="#fdf6ec" stroke="#a85a0a" stroke-width="1.2"/><text x="780" y="205">{{結果}}</text>
  </g>
  <text x="24" y="312" font-size="12" fill="#454a54">{{図全体の但し書き。原文の言葉}}</text>
</svg>
```

- 原因が **並んでいるだけ** なら合流点まで直接つなぐ（途中の段を作らない）
- 対策は、原文が「〜に効く」と言っている段の **真上** に破線の箱で置き、破線の矢印をその段に向ける（原因の行を横切らないため）
- 対策が無い図では、上の対策の行（y=24〜80）を消し、全体を 96 上へ詰めて高さを 232 にする（空白を残さない）
- 原文が段の順序を書いていない時は、流れ図にしない（本文で並べる）

## 7. 見本: 依存図（DEPEND）

左の列に未確定の前提（破線）、右に待っている判断。前提から判断への線は、原文がつながりを書いたものだけ。1本に強調色を使うなら、原文が「最初に」「まず」と書く前提から。

```html
<svg viewBox="0 0 880 272" width="100%" role="img" aria-label="{{図の1文}}">
  <defs><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#6f7582"/></marker></defs>
  <g font-size="12" font-weight="700" fill="#6f7582" letter-spacing=".08em"><text x="24" y="24">まだ確かめられていないこと</text><text x="584" y="24">それを待っている判断</text></g>
  <g fill="none" stroke="#6f7582" stroke-width="1.2" marker-end="url(#ah2)">
    <path d="M344 72 H464 V120 H584"/><path d="M344 136 H584"/><path d="M344 200 H464 V152 H584"/>
  </g>
  <g font-size="15" font-weight="600" fill="#1a1c20" text-anchor="middle">
    <rect x="24" y="40" width="320" height="64" rx="6" fill="#fff" stroke="#6f7582" stroke-dasharray="4 3"/>
    <text x="184" y="68">{{前提1}}</text><text x="184" y="88" font-size="12" font-weight="400" fill="#6f7582">根拠: {{原文の言い方}}</text>
    <rect x="24" y="104" width="320" height="64" rx="6" fill="#fff" stroke="#6f7582" stroke-dasharray="4 3"/><text x="184" y="141">{{前提2}}</text>
    <rect x="24" y="168" width="320" height="64" rx="6" fill="#fff" stroke="#6f7582" stroke-dasharray="4 3"/><text x="184" y="205">{{前提3}}</text>
    <rect x="584" y="96" width="272" height="80" rx="6" fill="#fdf6ec" stroke="#a85a0a" stroke-width="1.2"/>
    <text x="720" y="132">{{判断}}</text><text x="720" y="154" font-size="12" font-weight="400" fill="#6f7582">{{原文にある見通し}}</text>
  </g>
</svg>
```

前提どうしの間は 0 にして縦に積むと、線の出口が揃って読みやすい（上の見本は箱の高さ 64・間隔 0）。前提が4〜5つなら高さを足す。

## 8. 見本: 時系列（TIMELINE）

横一列。時点は **原文の言い方のまま**（「7月」「次回」）。等間隔で置く（原文に日付の間隔が無いのに、間隔で長さを表さない）。今の時点を強調色、予定は破線の円と破線の軸。

```html
<svg viewBox="0 0 880 176" width="100%" role="img" aria-label="{{図の1文}}">
  <path d="M40 64 H616" stroke="#9aa3b2" stroke-width="2"/><path d="M616 64 H840" stroke="#9aa3b2" stroke-width="2" stroke-dasharray="4 3"/>
  <g font-size="15" font-weight="700" fill="#1a1c20" text-anchor="middle">
    <circle cx="88" cy="64" r="7" fill="#fff" stroke="#6f7582" stroke-width="2"/><text x="88" y="40">{{時点1}}</text>
    <circle cx="264" cy="64" r="7" fill="#fff" stroke="#6f7582" stroke-width="2"/><text x="264" y="40">{{時点2}}</text>
    <circle cx="440" cy="64" r="7" fill="#fff" stroke="#6f7582" stroke-width="2"/><text x="440" y="40">{{時点3}}</text>
    <circle cx="616" cy="64" r="8" fill="#1d5fbf"/><text x="616" y="40" fill="#1d5fbf">{{今回}}</text>
    <circle cx="792" cy="64" r="7" fill="#fff" stroke="#6f7582" stroke-width="2" stroke-dasharray="3 3"/><text x="792" y="40" fill="#6f7582">{{原文にある予定}}</text>
  </g>
  <g font-size="13" fill="#454a54" text-anchor="middle">
    <text x="88" y="96">{{出来事1行目}}</text><text x="88" y="116">{{2行目}}</text>
    <text x="264" y="96">{{出来事}}</text><text x="440" y="96">{{出来事}}</text>
    <text x="616" y="96">{{現在の状態}}</text><text x="792" y="96">{{内容・条件}}</text>
    <text x="264" y="140" font-size="12" fill="#6f7582">{{誰が（原文にある時だけ）}}</text>
  </g>
</svg>
```

点は5つまで（間隔 176）。6つ以上なら間隔を 136 に詰め、出来事の文字を1行12字にする。

## 9. 見本: 出来事を重ねた折れ線（LINE）

`components.md` の LINE を幅 880 に広げた形。描画領域は x=72〜840、y=80〜280。上の y=16〜64 は出来事ラベルの帯（2段）。

```html
<svg viewBox="0 0 880 328" width="100%" role="img" aria-label="{{推移を1文で}}">
  <rect x="{{期間の開始x}}" y="72" width="{{幅}}" height="208" fill="#1d5fbf" opacity=".06"/>
  <text x="{{開始x+8}}" y="32" font-size="13" fill="#454a54">{{期間の出来事}}</text>
  <path d="M{{x}} 56 V280" stroke="#6f7582" stroke-dasharray="4 4"/><text x="{{x+8}}" y="56" font-size="13" fill="#454a54">{{時点の出来事}}</text>
  <path d="M72 280 H840" stroke="#9aa3b2"/><text x="64" y="284" font-size="13" text-anchor="end" fill="#6f7582" class="tick">0</text>
  <polyline class="draw" pathLength="1" fill="none" stroke="#1d5fbf" stroke-width="2.5" points="{{確定値の点}}"/>
  <polyline fill="none" stroke="#1d5fbf" stroke-width="2.5" stroke-dasharray="6 5" points="{{最後の確定点 速報の点}}"/>
  <circle cx="{{x}}" cy="{{y}}" r="4.5" fill="#1d5fbf"/><text x="{{x}}" y="{{y-12}}" font-size="15" font-weight="700" text-anchor="middle" fill="#1a1c20">{{値}}</text>
  <circle cx="{{速報x}}" cy="{{速報y}}" r="4.5" fill="#fff" stroke="#1d5fbf" stroke-width="2"/><text x="{{速報x}}" y="{{速報y-12}}" font-size="15" font-weight="700" text-anchor="middle" fill="#1a1c20">{{値}}（{{原文の言い方: 速報など}}）</text>
  <text x="{{x}}" y="304" font-size="14" text-anchor="middle" fill="#454a54">{{時点}}</text>
</svg>
```

点の間隔は 768 ÷（点の数−1）。y は `280 − 値 ÷ 軸の最大 × 200`（軸の最大は、最大値より少し上の切りのよい値）。この計算は座標にだけ使い、画面の文字にしない。

## 10. 見本: 2時点の比較（BAR）

`components.md` の棒＋◆ の SVG 版。項目名の列 184、棒の領域 x=208〜584（棒の長さ = 値 ÷ 軸の最大 × 376）、値の列 x=608〜（「前 → 後」が収まる幅）。

```html
<svg viewBox="0 0 880 208" width="100%" role="img" aria-label="{{図の1文}}">
  <g font-size="15" font-weight="600" fill="#1a1c20">
    <text x="24" y="52">{{項目1}}</text><text x="24" y="70" font-size="12" font-weight="400" fill="#6f7582">{{補足の値}}</text>
    <rect x="208" y="40" width="{{前の値の幅}}" height="20" rx="3" fill="#1d5fbf"/>
    <path d="M{{後のx}} 42 l8 8 l-8 8 l-8 -8z" fill="#1a1c20"/>
    <text x="608" y="56" font-variant-numeric="tabular-nums">{{前の値}} → {{後の値}}</text>
    <text x="24" y="116">{{項目2}}</text>
    <rect x="208" y="104" width="{{幅}}" height="20" rx="3" fill="#8fb0e3"/><path d="M{{後のx}} 106 l8 8 l-8 8 l-8 -8z" fill="#1a1c20"/>
    <text x="608" y="120">{{前の値}} → {{後の値}}</text>
    <text x="24" y="180">{{項目3}}</text>
    <rect x="208" y="168" width="{{幅}}" height="20" rx="3" fill="#8fb0e3"/>
    <text x="608" y="184">{{前の値}} → <tspan fill="#6f7582" font-weight="400">{{後の時点}} 記載なし</tspan></text>
  </g>
  <path d="M208 24 V192" stroke="#9aa3b2"/>
</svg>
```

強調色の棒は1本（原文が焦点にしている項目）。他は `#8fb0e3`。

## 11. 出す前の確認（図ごと）

1. 文字が箱・図の外にはみ出していない（字数 × 大きさ ≦ 箱の幅 − 32）
2. 線が箱を横切らず、線どうしが交差していない。すべて直角
3. 強調色は1か所。破線は「未確認・予定・速報」だけ
4. **ラベルを全部隠しても、形・線・位置で関係が読めるか。** 読めないなら図にしない
5. 原文にないつながり・順序・大小を、線や位置で言っていない
