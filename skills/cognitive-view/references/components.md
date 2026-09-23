# Components — HTMLの部品集

`SKILL.md` の手順4で使う。**ここにあるのは形だけ。** `{{…}}` を事実台帳の内容で埋める。見本の言葉・数値を中身に使わない。部品にない装飾（影・グラデーション・アイコン・絵文字）を足さない。

部品一覧: `PAGE` `CARD` `TABLE` `SPARK` `BAR` `LINE` `TIMELINE` `FLOW` `CONFLICT` `OPEN` `LEDGER` `ANIMATION`

---

## PAGE — ページ骨格と共通CSS

これをそのまま土台にする。CSSは削ってよいが、`@media` の3つ（狭い画面・印刷・動きを減らす設定）は消さない。

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{主題}}</title>
<style>
:root{--bg:#f7f8fa;--card:#fff;--ink:#1d2330;--sub:#4a5263;--mute:#6b7385;--line:#dfe3ea;--accent:#2a5bd7;--warn:#b45309;--warnbg:#fff7ed;--bad:#b42318;--ok:#1f7a4d;--bar:#8aa4e6;--none:#c9ced8}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.7 system-ui,-apple-system,"Segoe UI","Hiragino Sans","Noto Sans JP",sans-serif}
main{max-width:980px;margin:0 auto;padding:28px 18px 56px}
h1{font-size:1.5rem;line-height:1.4;margin:0 0 8px}
.lede{color:var(--sub);margin:0 0 20px}
h2{font-size:1.15rem;margin:36px 0 12px;padding-top:12px;border-top:1px solid var(--line)}
h3{font-size:1rem;margin:20px 0 8px}
.box{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px}
.src{font-size:.78rem;color:var(--mute)}
.num{font-variant-numeric:tabular-nums;white-space:nowrap}
.st{font-weight:700;overflow-wrap:anywhere}
.st-ok{color:var(--ok)}.st-warn{color:var(--warn)}.st-open{color:var(--bad)}.st-todo{color:var(--mute)}
details{margin:10px 0;background:var(--card);border:1px solid var(--line);border-radius:10px}
summary{cursor:pointer;padding:12px 16px;font-weight:700;color:var(--sub)}
details>div{padding:4px 16px 14px;border-top:1px solid var(--line)}
@media (max-width:600px){
  main{padding:18px 12px 40px}
  table.cmp thead{display:none}
  table.cmp,table.cmp tbody,table.cmp tr,table.cmp td{display:block;width:100%}
  table.cmp tr{border:1px solid var(--line);border-radius:10px;margin:0 0 10px;padding:6px 10px;background:var(--card)}
  table.cmp td{border:0;padding:4px 0}
  table.cmp td::before{content:attr(data-label);display:block;font-size:.75rem;color:var(--mute)}
}
@media print{
  details{border:0}
  details::details-content{content-visibility:visible}
  summary{list-style:none}
  *{animation:none!important}
}
</style>
</head>
<body>
<main>
  <h1 data-f="{{F}}">{{主題}} — {{現在の状態}}</h1>
  <p class="lede" data-f="{{F}}">{{2文以内。原文の言葉で}}</p>
  <!-- CARD ×0〜4 -->
  <h2>{{読者の問い1への答え}}</h2>
  <!-- 手順2で選んだ部品 -->
  <h2>{{読者の問い2への答え}}</h2>
  <!-- … -->
  <!-- LEDGER（最後） -->
</main>
</body>
</html>
```

---

## CARD — 数値カード（5秒層）

原文にある数値だけ。数値が無い資料ではカードを作らない（言葉をカードに入れない）。最大4枚。

**カードの値は、原文に書かれた1つの値を、原文の表記のまま写す。**
- 「9割」は「9割」。「90%」に直さない。「およそ」「約」「速報値」も値と一緒に残す
- 複数の値を足して1枚にしない（内訳が3つあれば、内訳のまま書く。合計を作らない）
- 差・前月比・ポイント差を作らない。2つの値を並べたい時は、カードを2枚にするか `BAR` を使う

```html
<div class="cards">
  <div class="card" data-f="{{F}}">
    <div class="card-k">{{何の値か}}</div>
    <div class="card-v num">{{原文どおりの値}}<small>{{単位・条件}}</small></div>
    <div class="card-n">{{いつ・誰の値か。原文の範囲で}}</div>
  </div>
</div>
```
```css
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin:0 0 8px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px}
.card-k{font-size:.85rem;color:var(--sub)}
.card-v{font-size:1.45rem;font-weight:800}
.card-v small{font-size:.8rem;font-weight:600;color:var(--sub);margin-left:4px}
.card-n{font-size:.82rem;color:var(--mute)}
```

---

## TABLE — 比較表

行 = 対象、列 = 観点。**全ての `<td>` に `data-label`（列名）を付ける**（狭い画面でカード表示に切り替わる）。セルは短く（目安30字以内）。長い説明は表の下に1文で。原文に記載が無いセルは空欄にせず「記載なし」と書く。

```html
<div class="box" style="padding:0;overflow:hidden">
<table class="cmp">
  <thead><tr><th>{{対象}}</th><th>{{観点A}}</th><th>{{観点B}}</th><th>{{状態}}</th></tr></thead>
  <tbody>
    <tr data-f="{{F}}">
      <td data-label="{{対象}}"><b>{{対象1}}</b></td>
      <td data-label="{{観点A}}">{{値と単位}}</td>
      <td data-label="{{観点B}}">{{短い記述}}</td>
      <td data-label="{{状態}}"><span class="st st-warn">▲ {{懸念の中身}}</span></td>
    </tr>
    <tr data-f="{{F}}">
      <td data-label="{{対象}}"><b>{{対象2}}</b></td>
      <td data-label="{{観点A}}"><span class="none">記載なし</span></td>
      <td data-label="{{観点B}}">{{短い記述}}</td>
      <td data-label="{{状態}}"><span class="st st-open">■ 未確認</span></td>
    </tr>
  </tbody>
</table>
</div>
```
```css
table.cmp{width:100%;border-collapse:collapse;font-size:.92rem}
table.cmp th,table.cmp td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid var(--line)}
table.cmp th{background:#eef1f6;color:var(--sub);font-size:.85rem}
.none{color:var(--mute);font-style:italic}
```

状態記号（この5つだけ使う。記号と言葉を必ず両方書く）: `● 確定` `▲ 懸念` `■ 未確認` `○ 未着手` `× 却下`。「未決」「未定」は `■ 未確認` ではなく `○ 未着手` を使う。

`<span class="st">` の中は **記号と2〜4字の語だけ**（例の形: `■ 未確認`）。説明は span の外に書く。記号と語の間は `&nbsp;` でつなぐ

---

## SPARK — 表の中の小さな棒

比較表の数値列に、**同じ単位の値が2つ以上** ある時だけ。幅は最大値に対する比率（%）で、自分で計算した数値は画面に出さない（幅にだけ使う）。値が「記載なし」の行は棒を描かない。

```html
<td data-label="{{観点}}"><span class="num">{{値と単位}}</span><span class="spark"><i style="--w:{{最大値に対する%}}%"></i></span></td>
```
```css
.spark{display:block;height:6px;background:#eef1f6;border-radius:3px;margin-top:4px;max-width:160px}
.spark i{display:block;height:100%;width:var(--w);background:var(--bar);border-radius:3px;transform-origin:left}
```

---

## BAR — 棒グラフ（横棒）

**同じ単位** の値が3つ以上で、大小が論点の時。軸は0から。値ラベルを棒の横に直接書く。強調色（`--accent`）は1本まで。原文に値が無い項目は、破線の枠と「記載なし」で示す（0として描かない）。カテゴリは8本まで。

```html
<figure class="box bar" data-f="{{F}}">
  <figcaption>{{何の値の比較か（単位）}}</figcaption>
  <div class="bar-row"><span class="bar-k">{{項目1}}</span><span class="bar-t"><i style="--w:{{%}}%"></i></span><span class="bar-v num">{{値}}</span></div>
  <div class="bar-row"><span class="bar-k">{{項目2}}</span><span class="bar-t"><i class="hi" style="--w:{{%}}%"></i></span><span class="bar-v num">{{値}}</span></div>
  <div class="bar-row"><span class="bar-k">{{項目3}}</span><span class="bar-t"><i class="is-none"></i></span><span class="bar-v none">記載なし</span></div>
  <p class="src">{{出典の言い方。原文のどこか}}</p>
</figure>
```
```css
.bar-row{display:grid;grid-template-columns:minmax(80px,9em) 1fr auto;gap:10px;align-items:center;margin:8px 0}
.bar-k{font-size:.9rem}
.bar-t{height:14px;background:#eef1f6;border-radius:4px}
.bar-t i{display:block;height:100%;width:var(--w);background:var(--bar);border-radius:4px;transform-origin:left}
.bar-t i.hi{background:var(--accent)}
.bar-t i.is-none{width:100%;background:none;border:1.5px dashed var(--none)}
.bar-v{font-size:.9rem;font-weight:700}
```

---

## LINE — 折れ線（推移）

**同じ単位の値が時点に沿って4つ以上** ある時。系列は3本まで。軸は0から。各点に値を直接書く。`viewBox` の幅は600、文字は14以上（縮んでも読めるように）。点の座標は自分で比率計算してよいが、計算した値を画面の文字にしない。

```html
<figure class="box" data-f="{{F}}">
  <figcaption>{{何の推移か（単位）}}</figcaption>
  <svg class="line" viewBox="0 0 600 260" role="img" aria-label="{{推移を1文で}}">
    <line x1="48" y1="220" x2="580" y2="220" stroke="#9aa3b2"/>
    <text x="40" y="224" font-size="14" text-anchor="end" fill="#6b7385">0</text>
    <polyline class="draw" fill="none" stroke="#2a5bd7" stroke-width="3" points="{{x1,y1 x2,y2 …}}" pathLength="1"/>
    <circle cx="{{x1}}" cy="{{y1}}" r="4" fill="#2a5bd7"/>
    <text x="{{x1}}" y="{{y1-10}}" font-size="14" text-anchor="middle" fill="#1d2330">{{値}}</text>
    <text x="{{x1}}" y="244" font-size="14" text-anchor="middle" fill="#4a5263">{{時点}}</text>
  </svg>
</figure>
```

---

## TIMELINE — 時系列

時点が3つ以上の時。HTMLで組むので狭い画面では縦に並ぶ。各点は「時点・出来事・誰が」。**原文にない年号・日付を足さない。** 未来の予定は `.future`（点線）で、原文に書かれている時だけ。

```html
<ol class="tl" data-f="{{F}}">
  <li><b class="tl-when">{{時点1}}</b><span class="tl-what">{{出来事}}</span></li>
  <li><b class="tl-when">{{時点2}}</b><span class="tl-what">{{出来事}}</span></li>
  <li class="now"><b class="tl-when">{{今回}}</b><span class="tl-what">{{現在の状態}}</span></li>
  <li class="future"><b class="tl-when">{{原文にある予定}}</b><span class="tl-what">{{内容・条件}}</span></li>
</ol>
```
```css
.tl{list-style:none;margin:0;padding:0;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:12px;position:relative}
.tl::before{content:"";position:absolute;left:0;right:0;top:9px;height:2px;background:var(--line)}
.tl li{position:relative;padding-top:26px}
.tl li::before{content:"";position:absolute;top:3px;left:0;width:14px;height:14px;border-radius:50%;background:var(--card);border:3px solid var(--bar)}
.tl li.now::before{border-color:var(--accent);background:var(--accent)}
.tl li.future::before{border-style:dashed;border-color:var(--mute)}
.tl-when{display:block;font-size:.9rem}
.tl-what{display:block;font-size:.88rem;color:var(--sub)}
@media (max-width:600px){
  .tl{grid-auto-flow:row}
  .tl::before{left:6px;right:auto;top:0;bottom:0;width:2px;height:auto}
  .tl li{padding:0 0 0 28px}
  .tl li::before{top:5px}
}
```

---

## FLOW — 流れ図（因果・手順）

**原文が書いている** つながりだけを矢印にする。原文が理由を並べている時は、1本の連鎖にせず **分岐** で描く（`.fork`）。原文が「戻る」と言っていない限り、最後から最初へ戻る矢印を描かない。段は9つまで。

一直線:
```html
<div class="flow" data-f="{{F}}">
  <div class="node">{{段1}}</div><div class="arrow" aria-hidden="true"></div>
  <div class="node">{{段2}}</div><div class="arrow" aria-hidden="true"></div>
  <div class="node end">{{結果}}</div>
</div>
```
分岐（原因が並列の時）:
```html
<div class="flow" data-f="{{F}}">
  <div class="node">{{起点}}</div><div class="arrow" aria-hidden="true"></div>
  <div class="fork">
    <div class="node">{{理由A}}<span class="src">{{原文での位置づけ（例: 最も多い）}}</span></div>
    <div class="node">{{理由B}}<span class="src">{{原文での位置づけ}}</span></div>
  </div>
  <div class="arrow" aria-hidden="true"></div>
  <div class="node end">{{結果}}</div>
</div>
```
```css
.flow{display:flex;align-items:stretch;gap:0;flex-wrap:nowrap}
.node{flex:1;min-width:0;background:var(--card);border:1.5px solid var(--line);border-radius:10px;padding:10px 12px;font-size:.9rem}
.node .src{display:block}
.node.end{border-color:var(--warn);background:var(--warnbg)}
.fork{flex:1.2;display:grid;gap:8px}
.arrow{flex:0 0 28px;align-self:center;height:2px;background:var(--mute);position:relative}
.arrow::after{content:"";position:absolute;right:-1px;top:-5px;border:6px solid transparent;border-left:8px solid var(--mute)}
@media (max-width:600px){
  .flow{flex-direction:column}
  .arrow{flex:0 0 22px;width:2px;height:22px;align-self:center}
  .arrow::after{right:-5px;top:auto;bottom:-6px;border:6px solid transparent;border-top:8px solid var(--mute)}
}
```

---

## CONFLICT — 立場の対立

同じ論点で意見が割れている時。左右に並べ、**誰の意見か** と **決着の状態** を書く。どちらが正しいかは書かない。

```html
<div class="box conflict" data-f="{{F}}">
  <div class="cf-q">{{論点}}</div>
  <div class="cf-sides">
    <div><b>{{立場Aの主体}}</b><p>「{{原文の言葉}}」</p></div>
    <div><b>{{立場Bの主体}}</b><p>「{{原文の言葉}}」</p></div>
  </div>
  <p class="cf-state"><span class="st st-open">■ {{決着の状態（原文の言葉）}}</span></p>
</div>
```
```css
.cf-q{font-weight:700;margin-bottom:8px}
.cf-sides{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cf-sides>div{border-left:4px solid var(--line);padding:4px 10px}
.cf-sides p{margin:4px 0 0}
@media (max-width:600px){.cf-sides{grid-template-columns:1fr}}
```

---

## OPEN — 未解決（未確認・未決・宿題）

1行に「何が」「状態」「決まると何に効くか（原文にある範囲）」「担当・期限（原文にある時だけ。無ければ『記載なし』）」。

```html
<ul class="open" data-f="{{F}}">
  <li><span class="st st-open">■ 未確認</span> <b>{{何が}}</b> — {{根拠の強さ（例: 口頭のみ）}}<span class="src">決まると: {{原文にある影響}} / 担当: {{原文どおり or 記載なし}}</span></li>
  <li><span class="st st-todo">○ 未着手</span> <b>{{何が}}</b><span class="src">担当: {{未定 or 記載なし}}</span></li>
</ul>
```
```css
.open{list-style:none;margin:0;padding:0}
.open li{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;margin:0 0 8px}
.open .src{display:block}
```

---

## LEDGER — 事実台帳（最後に置く）

手順1の台帳をそのまま載せる。引用欄は **原文をそのまま**（言い換えない）。

```html
<details class="ledger">
  <summary>原文との対応（事実台帳 {{件数}}件）</summary>
  <div>
    <table class="lg">
      <tr id="{{F1}}"><th>{{F1}}</th><td>{{種類}}</td><td>{{内容}}</td><td class="q">「{{原文そのまま}}」</td></tr>
    </table>
  </div>
</details>
```
```css
table.lg{width:100%;border-collapse:collapse;font-size:.82rem}
table.lg th,table.lg td{text-align:left;vertical-align:top;padding:6px 8px;border-bottom:1px solid var(--line)}
table.lg .q{color:var(--mute)}
@media (max-width:600px){table.lg td:nth-child(2){display:none}}
```

---

## ANIMATION — 動き（任意）

動きは **順序・推移・因果を見せる時だけ** 使う。見出し・本文・表・カードは動かさない。

決まり:
- CSSだけ（`<script>` を使わない）。**1回だけ**再生する（`infinite` 禁止）
- 1要素0.6秒以内、全体で3秒以内に終える
- **必ず `@media (prefers-reduced-motion: no-preference)` の中に書く。** 外側では静止した最終状態が見えていること（動きを減らす設定・印刷・プレビュー環境で情報が消えない）
- 最終状態は、動かない時とまったく同じ

使ってよい動き:
```css
@media (prefers-reduced-motion:no-preference){
  /* タイムライン・流れ図: 左（上）から順に現れる */
  .tl li,.flow>.node,.flow>.fork,.flow>.arrow{animation:cv-in .45s ease-out both}
  .tl li:nth-child(2),.flow>:nth-child(2){animation-delay:.15s}
  .tl li:nth-child(3),.flow>:nth-child(3){animation-delay:.3s}
  .tl li:nth-child(4),.flow>:nth-child(4){animation-delay:.45s}
  .tl li:nth-child(5),.flow>:nth-child(5){animation-delay:.6s}
  .tl li:nth-child(n+6),.flow>:nth-child(n+6){animation-delay:.75s}
  /* 棒: 0から伸びる */
  .bar-t i,.spark i{animation:cv-grow .6s ease-out both}
  /* 折れ線: 線を引く */
  svg .draw{stroke-dasharray:1;animation:cv-draw 1.2s ease-out both}
}
@keyframes cv-in{from{opacity:0;transform:translateY(6px)}}
@keyframes cv-grow{from{transform:scaleX(0)}}
@keyframes cv-draw{from{stroke-dashoffset:1}}
```
