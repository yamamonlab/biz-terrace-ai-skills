# Components — HTMLの部品集

`SKILL.md` の手順4で使う。**ここにあるのは形だけ。** `{{…}}` を事実台帳の内容で埋める。見本の言葉・数値を中身に使わない。部品にない装飾（影・グラデーション・アイコン・絵文字）を足さない。

部品一覧: `PAGE` `POINTS` `QUOTE` `NOTE` `FIG` `BIG` `CARD` `TABLE` `SPARK` `BAR` `LINE` `TIMELINE` `FLOW` `DEPEND` `CONFLICT` `OPEN` `LEDGER` `ANIMATION`

---

## PAGE — 記事の骨格と文字組み

これをそのまま土台にする。白地・黒文字、アクセントは `--accent` の1色だけ。CSSは削ってよいが、`@media` の3つ（狭い画面・印刷・動きを減らす設定）は消さない。本文の列は読みやすい幅（1行およそ36〜40字）に絞り、図表だけ少し広げる。

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{主題}}</title>
<style>
:root{--bg:#fff;--ink:#1a1c20;--sub:#454a54;--mute:#6f7582;--line:#e3e6eb;--soft:#f5f6f8;--accent:#1d5fbf;--tint:#dce8fa;--warn:#a85a0a;--warnbg:#fdf6ec;--bad:#b42318;--ok:#1f7a4d;--bar:#8fb0e3;--none:#c9ced8;--card:#fff}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.95 "Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP","Yu Gothic",system-ui,sans-serif;letter-spacing:.02em;-webkit-font-smoothing:antialiased}
main{max-width:928px;margin:0 auto;padding:48px 24px 80px}
.col{max-width:680px;margin:0 auto}
.kicker{font-size:.78rem;font-weight:700;letter-spacing:.12em;color:var(--accent);margin:0 0 10px}
h1{font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",serif;font-size:1.8rem;line-height:1.45;margin:0 0 18px;letter-spacing:.01em}
.lede{font-size:1.06rem;color:var(--sub);margin:0 0 26px}
h2{font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",serif;font-size:1.35rem;line-height:1.5;margin:60px 0 18px;display:flex;gap:.6em;align-items:baseline}
h2 .no{font-size:.9rem;font-weight:800;color:var(--accent);font-variant-numeric:tabular-nums}
h3{font-size:1.05rem;margin:28px 0 8px}
p{margin:0 0 1.3em}
b{font-weight:700}
b.n{font-variant-numeric:tabular-nums;white-space:nowrap}
mark{background:linear-gradient(transparent 58%,var(--tint) 58%);color:inherit;padding:0 .1em}
.box{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:16px}
.src{font-size:.78rem;color:var(--mute)}
.num{font-variant-numeric:tabular-nums;white-space:nowrap}
.st{font-weight:700;overflow-wrap:anywhere}
.st-ok{color:var(--ok)}.st-warn{color:var(--warn)}.st-open{color:var(--bad)}.st-todo{color:var(--mute)}
details{margin:12px 0;border:1px solid var(--line);border-radius:8px}
summary{cursor:pointer;padding:12px 16px;font-weight:700;color:var(--sub);font-size:.92rem}
details>div{padding:4px 16px 14px;border-top:1px solid var(--line)}
@media (max-width:600px){
  body{font-size:16px;line-height:1.9}
  main{padding:24px 16px 48px}
  h1{font-size:1.4rem}
  h2{font-size:1.15rem;margin-top:44px}
  table.cmp thead{display:none}
  table.cmp,table.cmp tbody,table.cmp tr,table.cmp td{display:block;width:100%}
  table.cmp tr{border:1px solid var(--line);border-radius:8px;margin:0 0 10px;padding:6px 10px}
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
  <header class="col">
    <p class="kicker">{{資料の種類（例の形: 会議メモの解説）}}</p>
    <h1 data-f="{{F}}">{{主題}} — {{現在の状態}}</h1>
    <p class="lede" data-f="{{F}}">{{3〜4文。原文の言葉で}}</p>
    <!-- POINTS -->
  </header>
  <section class="col">
    <h2><span class="no">01</span>{{読者の問い、またはその答えの1文}}</h2>
    <p data-f="{{F}}">{{段落。1論点・2〜4文}}</p>
    <p data-f="{{F}}">{{段落}}</p>
  </section>
  <!-- 図表は FIG で包み、本文の列の外（少し広い幅）に置いてよい -->
  <section class="col"><!-- 次の章 --></section>
  <section class="col"><!-- OPEN と LEDGER --></section>
</main>
</body>
</html>
```

見出し（`h1` `h2`）は明朝、本文はゴシック。

**線と色の約束（全部の図で同じにする）:**

| 見た目 | 意味 |
|---|---|
| 実線・塗り | 原文が事実として書いている |
| 破線・白抜き | 未確認・速報・予定・効果が確かめられていない |
| 強調色（`--accent`） | その図の中心の1か所だけ |

破線を使った図には、図の下に凡例を1行（`p.legend`）付ける。

**図を置く前の確認（図ごとに頭の中で）:** この図で伝える1文は何か／どの関係（数量・時間・比較・因果・対立・未確定）を形にするか／ラベルを隠しても、線・位置・大きさで関係が読めるか（読めないなら、図ではなく本文か表にする）。隣り合う図が同じ形の繰り返しになっていないか。

文字組みの使い分け（これ以外の装飾は足さない）:

| 何に | どうする |
|---|---|
| 段落の結論の句 | `<b>`（1段落に1か所まで） |
| 章で一番読んでほしい1文 | `<mark>`（1章に1か所まで） |
| 数値 | `<b class="n">{{値と単位}}</b>` |
| 補足・根拠の弱さ | `NOTE` |
| 誰かの発言 | `QUOTE`（本文で先に「誰が」を書く） |

---

## POINTS — この記事の要点（冒頭）

3つ。各1文で、本文のどの章に対応するかが分かるように書く。原文にない結論を書かない。

```html
<aside class="points" data-f="{{F}}">
  <p class="points-h">この記事の要点</p>
  <ol>
    <li data-f="{{F}}">{{要点1。1文}}</li>
    <li data-f="{{F}}">{{要点2}}</li>
    <li data-f="{{F}}">{{要点3}}</li>
  </ol>
</aside>
```
```css
.points{background:var(--soft);border-left:4px solid var(--accent);border-radius:0 8px 8px 0;padding:14px 18px;margin:0 0 8px}
.points-h{font-size:.8rem;font-weight:800;color:var(--accent);letter-spacing:.08em;margin:0 0 6px}
.points ol{margin:0;padding-left:1.4em}
.points li{margin:4px 0;line-height:1.75}
.points li::marker{color:var(--accent);font-weight:800}
```

---

## QUOTE — 発言の引用

原文にある発言だけ。言い換えない。誰の発言かを必ず書く。

```html
<blockquote class="quote" data-f="{{F}}">
  <p>「{{原文の言葉そのまま}}」</p>
  <cite>{{発言した主体}}</cite>
</blockquote>
```
```css
.quote{margin:8px 0 22px;padding:4px 0 4px 18px;border-left:3px solid var(--accent)}
.quote p{margin:0;font-size:1.02rem}
.quote cite{display:block;font-style:normal;font-size:.82rem;color:var(--mute);margin-top:4px}
```

---

## NOTE — 注記

本文の流れを止めたくない補足（根拠の強さ、定義、例外）。

```html
<p class="note" data-f="{{F}}"><span>注</span>{{補足。原文の範囲で}}</p>
```
```css
.note{font-size:.88rem;line-height:1.8;color:var(--sub);background:var(--soft);border-radius:6px;padding:10px 14px}
.note span{font-weight:800;color:var(--accent);margin-right:.6em}
```

---

## FIG — 図表の枠

図表（`TABLE` `BAR` `LINE` `TIMELINE` `FLOW` `DEPEND` `CONFLICT`）は、この枠で包む。**PCで読む前提**なので、図の枠は本文の列（680px）の外に出し、`main` の幅（最大880px）いっぱいに置く（`<figure class="fig">` を `section.col` の外、`main` の直下に置く。`main` はページに1つのまま分けない）。上に「何の図か」、下に「この図から読み取れること」を1文。読み取りは原文の範囲で書く。

```html
<figure class="fig" data-f="{{F}}">
  <figcaption class="fig-t">{{何の図か（単位）}}</figcaption>
  <!-- ここに図表の部品 -->
  <p class="fig-r">{{この図から読み取れること。1文}}</p>
</figure>
```
```css
.fig{margin:36px 0 40px}
.fig svg{display:block;width:100%;height:auto;font-family:inherit}
.fig-t{font-size:.9rem;font-weight:700;margin:0 0 10px}
.fig-t::before{content:"";display:inline-block;width:.6em;height:.6em;background:var(--accent);margin-right:.5em;border-radius:2px}
.fig-r{font-size:.9rem;color:var(--sub);margin:10px 0 0}
```

---

## CARD — 数値カード（5秒層）

原文にある数値だけ。数値が無い資料ではカードを作らない（言葉をカードに入れない）。最大3枚。数値が記事の中心にある資料で、冒頭の要点の下に置く（無くてもよい）。

**カードの値は、原文に書かれた1つの値を、原文の表記のまま写す。**
- 「9割」は「9割」。「90%」に直さない。「およそ」「約」「速報値」も値と一緒に残す
- 複数の値を足して1枚にしない（内訳が3つあれば、内訳のまま書く。合計を作らない）
- 差・前月比・ポイント差を作らない。2つの値を並べたい時は、カードを2枚にするか `BAR` を使う

```html
<div class="cards">
  <div class="card" data-f="{{F}}">
    <div class="card-k">{{何の値か}}</div>
    <div class="card-v num">{{原文どおりの値}}<small>{{単位だけ。6字まで}}</small></div>
    <div class="card-n">{{条件・いつ・誰の値か。原文の範囲で}}</div>
  </div>
</div>
```
```css
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin:0 0 8px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px}
.card-k{font-size:.85rem;color:var(--sub)}
.card-v{font-size:1.45rem;font-weight:800}
.card-v small{font-size:.8rem;font-weight:600;color:var(--sub);margin-left:4px;white-space:normal}
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

状態記号（この5つだけ使う。記号と言葉を必ず両方書く）:

| 記号 | 使う時 |
|---|---|
| `● 確定` | 原文が決まったと書いている |
| `◐ 対応中` | 担当か期限が原文に書かれ、まだ終わっていない |
| `▲ 懸念` | 原文が問題・リスクとして挙げている |
| `■ 未確認` | 事実がまだ確かめられていない、報告が届いていない |
| `○ 未決` | 決まっていない、結論が出ていない、担当が決まっていない |

`<span class="st">` の中は **記号と上の表の語だけ**（例の形: `■ 未確認`）。説明は span の外に書く。記号と語の間は `&nbsp;` でつなぐ

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

**2時点を1つの図で比べる時**（SVG版は `references/diagrams.md` §10）（例の形: 前の時点を棒、後の時点を◆）: 同じ単位の値が項目ごとに2つある時だけ。凡例を図の下に1行。後の時点が原文に無い項目は ◆ を置かず、「{{時点}} 記載なし」と書く。項目の補足（件数など、原文にある値）は項目名の下に小さく書く。

```html
<div class="bar-row"><span class="bar-k">{{項目}}<small>{{補足の値}}</small></span><span class="bar-t"><i style="--w:{{前の%}}%"></i><em class="mk" style="--x:{{後の%}}%" title="{{後の時点}}"></em></span><span class="bar-v num">{{前の値}} → {{後の値}}</span></div>
<p class="legend"><span class="lg-bar"></span>{{前の時点}}　<span class="lg-mk">◆</span>{{後の時点}}</p>
```
```css
.bar-k small{display:block;font-size:.72rem;color:var(--mute);font-weight:400}
.bar-t{position:relative}
.bar-t .mk{position:absolute;left:var(--x);top:50%;width:11px;height:11px;background:var(--ink);transform:translate(-50%,-50%) rotate(45deg)}
.legend{font-size:.78rem;color:var(--mute);margin:8px 0 0}
.lg-bar{display:inline-block;width:18px;height:8px;background:var(--bar);margin-right:4px;vertical-align:middle}
.lg-mk{margin-right:4px;color:var(--ink)}
```

---

## LINE — 折れ線（推移）

出来事を重ねる時は `references/diagrams.md` §9 の幅880版を使う。

**同じ単位の値が時点に沿って4つ以上** ある時。系列は3本まで。原文が「速報」「見込み」とする値は、その点までの線を点線（`stroke-dasharray="6 5"`）にし、値の横に「速報」などと原文の言葉を書く。軸は0から。各点に値を直接書く。`viewBox` の幅は600、文字は14以上（縮んでも読めるように）。点の座標は自分で比率計算してよいが、計算した値を画面の文字にしない。

```html
<figure class="box" data-f="{{F}}">
  <figcaption>{{何の推移か（単位）}}</figcaption>
  <svg class="line" viewBox="0 0 600 280" role="img" aria-label="{{推移を1文で}}">
    <!-- 描画領域は y=64〜240。上の y=14〜52 は出来事のラベル専用の帯（点や値ラベルを置かない） -->
    <line x1="48" y1="240" x2="580" y2="240" stroke="#9aa3b2"/>
    <text x="40" y="244" font-size="14" text-anchor="end" fill="#6b7385">0</text>
    <polyline class="draw" fill="none" stroke="#2a5bd7" stroke-width="3" points="{{x1,y1 x2,y2 …}}" pathLength="1"/>
    <circle cx="{{x1}}" cy="{{y1}}" r="4" fill="#2a5bd7"/>
    <text x="{{x1}}" y="{{y1-10}}" font-size="14" text-anchor="middle" fill="#1d2330">{{値}}</text>
    <text x="{{x1}}" y="264" font-size="14" text-anchor="middle" fill="#4a5263">{{時点}}</text>
  </svg>
</figure>
```

**出来事を推移に重ねる（推移と原因を1枚で読ませる）:** 原文が **時点を書いている** 出来事だけ。期間なら薄い網掛け、時点なら縦の破線と短いラベル（10字以内、原文の言葉）。3つまで。**ラベルは上の帯（y=14〜52）に2段まで置き、点の値ラベルと重ねない。** 帯に収まらない時は、出来事の数を減らすか `TIMELINE` を別に作る。出来事と推移の因果を、線の形で言い切らない（「移行後に上がった」は描けるが「移行のせいで上がった」は原文にある時だけ本文で書く）。この形を使ったら、同じ出来事で別に `TIMELINE` を作らない。

```html
    <rect x="{{開始x}}" y="56" width="{{幅}}" height="184" fill="#1d5fbf" opacity=".06"/>
    <text x="{{開始x+6}}" y="26" font-size="13" fill="#454a54">{{期間の出来事}}</text>
    <line x1="{{x}}" y1="44" x2="{{x}}" y2="240" stroke="#6f7582" stroke-dasharray="4 4"/>
    <text x="{{x+6}}" y="46" font-size="13" fill="#454a54">{{時点の出来事}}</text>
```

目盛り線を引く時は、目盛りの数字に `class="tick"` を付ける（照合で目盛りは数値の主張として扱わない）。

---

## TIMELINE — 時系列

**既定は `references/diagrams.md` §8 の SVG。** 下のHTML版は、出来事の文が長く SVG に収まらない時だけ使う。時点が3つ以上の時。各点は「時点・出来事・誰が」。**原文にない年号・日付を足さない。** 未来の予定は `.future`（点線）で、原文に書かれている時だけ。

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

**既定は `references/diagrams.md` §6 の SVG**（直角の線・合流点・対策の破線）。下のHTML版は段が1列に並ぶだけの単純な連鎖の時に使ってよい。

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

**合流（独立した原因が、それぞれの経路を通って1つの結果に至る時）:** `.fork` の各段に小さな連鎖を入れる。原因ごとの段数が違ってよい。

```html
<div class="fork">
  <div class="chain"><span class="tag">{{原因1}}</span><div class="node">{{段}}</div><div class="arrow" aria-hidden="true"></div><div class="node">{{段}}</div></div>
  <div class="chain"><span class="tag">{{原因2}}</span><div class="node">{{段}}</div></div>
</div>
```

**対策・介入（原文に書かれた手当て）:** 効く相手の段のすぐ下に破線の枠で置き、効果が原文で確認されていなければそう書く。
```html
<div class="node act">{{対策。原文の言葉}}<span class="src">{{時点}}・{{効果: 原文の言い方（例: 確認されていない）}}</span></div>
```

**括弧の注記（図全体に掛かる但し書き）:** 原文が「分けて測れていない」「比較できない」などと言っている時。
```html
<p class="brace">{{但し書き。原文の言葉}}</p>
```
```css
.chain{display:flex;align-items:center;gap:0;flex-wrap:wrap}
.chain .tag{flex:0 0 100%;font-size:.72rem;color:var(--mute);margin-bottom:2px}
.node.act{border-style:dashed;background:var(--card);font-size:.84rem}
@media (max-width:600px){.chain{flex-direction:column;flex-wrap:nowrap;align-items:stretch}.chain .tag{flex:none}.chain .arrow{align-self:center;width:2px;height:22px}}
.brace{font-size:.82rem;color:var(--sub);border-left:2px solid var(--mute);padding-left:10px;margin:10px 0 0}
```

---

## DEPEND — 依存図（何が決まれば何が動くか）

**既定は `references/diagrams.md` §7 の SVG。**

原文が「〜が確認できないと〜が決まらない」「前提が違うと〜が崩れる」と **つながりを書いている** 未確定の前提がある時。左に未確定の前提（破線）、右にそれを待っている判断。原文に書かれていないつながりは引かない。前提と判断は各5つまで。

```html
<div class="dep" data-f="{{F}}">
  <div class="dep-col">
    <p class="dep-h">まだ確かめられていないこと</p>
    <div class="node open-n">{{前提1}}<span class="src">根拠: {{原文の言い方（例: 口頭説明のみ）}}</span></div>
    <div class="node open-n">{{前提2}}</div>
  </div>
  <div class="arrow" aria-hidden="true"></div>
  <div class="dep-col">
    <p class="dep-h">それを待っている判断</p>
    <div class="node end">{{判断}}<span class="src">{{原文にある見通し（例: 次々回が目標）}}</span></div>
  </div>
</div>
```
```css
.dep{display:flex;align-items:center;gap:0}
.dep-col{flex:1;display:grid;gap:8px}
.dep-h{font-size:.75rem;font-weight:700;color:var(--mute);margin:0}
.node.open-n{border-style:dashed}
@media (max-width:600px){.dep{flex-direction:column;align-items:stretch}.dep .arrow{align-self:center;width:2px;height:22px}}
```

---

## BIG — 息継ぎ（数値か引用を1つだけ大きく）

図表が続いた後や章の切れ目に、原文の数値1つ（または短い引用1つ）と1文だけを置いて、読む速さに緩急をつける。記事全体で1〜2か所まで。

```html
<div class="big" data-f="{{F}}"><b class="big-v">{{原文どおりの値と単位}}</b><p>{{その値が何かを1文。原文の範囲で}}</p></div>
```
```css
.big{margin:36px 0;padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-align:center}
.big-v{display:block;font-size:2.2rem;line-height:1.3;color:var(--accent);font-variant-numeric:tabular-nums}
.big p{margin:6px 0 0;color:var(--sub);font-size:.95rem}
```

---

## CONFLICT — 立場の対立

別の人・別の資料で意見が割れ、原文で決着していない時（説明会の前半と後半、本文と追伸のような同じ話し手・同じ資料の言い直しは使わず、本文に今有効な方を書いて「〜を訂正」と添える）。左右に並べ、**誰の意見か** と **決着の状態** を書く。どちらが正しいかは書かない。

```html
<div class="box conflict" data-f="{{F}}">
  <div class="cf-q">{{論点}}</div>
  <div class="cf-sides">
    <div><b>{{立場Aの主体}}</b><p>「{{原文の言葉}}」</p></div>
    <div><b>{{立場Bの主体}}</b><p>「{{原文の言葉}}」</p></div>
  </div>
  <p class="cf-state"><span class="st st-todo">○&nbsp;未決</span> {{決着の状態を原文の言葉で}}</p>
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

1行に「何が」「状態」「決まると何に効くか（原文にある範囲）」「担当・期限」。

**担当欄の既定値は「記載なし」。** 原文が「〇〇が△△する」「〇〇による△△」と主語を書いている時だけ、その〇〇を書く。関係しそうな部署を推測して入れない（「A・B（要調整）」のような書き方も推測にあたる）。

```html
<ul class="open" data-f="{{F}}">
  <li><span class="st st-open">■ 未確認</span> <b>{{何が}}</b> — {{根拠の強さ（例: 口頭のみ）}}<span class="src">決まると: {{原文にある影響}} / 担当: {{原文どおり or 記載なし}}</span></li>
  <li><span class="st st-todo">○ 未決</span> <b>{{何が}}</b><span class="src">担当: {{未定 or 記載なし}}</span></li>
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
