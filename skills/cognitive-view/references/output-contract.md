# Output Contract — Cognitive View の HTML 骨格

単一 HTML、inline CSS、外部読み込みなし、`<script>` なし。`file://` で開いて完全動作する。
デザインの基本原則: **「読む（Reading）」ではなく「見る（Seeing）」**。役員・リーダーが一瞬で全体像と判断事項を把握できる、白背景ベースの洗練されたエグゼクティブ・ブリーフィングを出力する。

## 各層の上限と構成

| 層 | 要素 | 上限とルール |
|---|---|---|
| **5秒層** | 見出し | 短い1文。**主題と現在の状態（結論）の2要素**を含む。ページ内で最大サイズ。狭い画面では折り返す |
| **5秒層** | エグゼクティブ・メトリクス | 原文に重要数値があれば2〜4枚、最大4枚。金額・件数・期限の単位と条件を保持。数値がない入力では状態を短文で示し、枚数合わせの指標を作らない |
| **30〜90秒層** | Diagram（図解） | 条件を満たす図は**主役**。内包するDiagram Grammarと3文テストに従い1〜3枚。図が不適切なら表・リストへ置き換える |
| **30〜90秒層** | 構造ブロック | 比較マトリクス表、要対応事項（アラート枠）、因果・手順（箇条書き） |
| **詳細層** | `<details>` | 原文引用と経緯の細部のみ。既定は全て閉じる |
| 全体 | ファイルサイズ | 目安 1MB 以下（外部画像は使わずインラインSVGで描画） |

**重要なデザイン規約（認知負荷の徹底低減）**:
- **白背景のビジネス仕様**: ダークモード強制を禁止。清潔感のある白・淡いグレー（`#f8fafc`）と洗練されたスレートグレー文字色で統一する。
- **インラインバッジの全廃**: 全行に `[事実]` `[推測]` `[未確認]` といった楕円バッジを貼ることを禁止（視覚的ノイズになり認知負荷を跳ね上げるため）。事実とリスク・推測の区別は、**「セクションの構造（確定事項 / 懸念事項）」「表のステータス」「注意喚起ボックス」**で自然に表現する。
- **「根拠」リンクの撤去**: 1文ごとの `<a class="src">根拠</a>` リンクを全廃。原文引用は末尾の折りたたみ（`<details>`）に整理する。

## 共通の CSS

```css
:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  --primary: #2563eb;
  --primary-bg: #eff6ff;
  --success: #16a34a;
  --success-bg: #f0fdf4;
  --warning: #d97706;
  --warning-bg: #fffbeb;
  --danger: #dc2626;
  --danger-bg: #fef2f2;
}

* { box-sizing: border-box; }
html { overflow-wrap: anywhere; }
body {
  margin: 0; padding: 32px 20px; background: var(--bg); color: var(--text-primary);
  font: 16px/1.65 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans JP", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.wrap { max-width: 960px; min-width: 0; margin: 0 auto; }

/* ヘッダー */
h1 { font-size: 1.5rem; font-weight: 700; line-height: 1.35; margin: 0 0 8px; color: var(--text-primary); }
.note { font-size: 0.95rem; color: var(--text-secondary); margin: 0 0 24px; line-height: 1.5; }

/* セクション見出し */
h2 { font-size: 1.15rem; font-weight: 700; margin: 32px 0 16px; color: var(--text-primary); }

/* 5秒層: エグゼクティブ・メトリクスカード */
.cards { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom: 24px; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
.card-label { font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; }
.card-val { font-size: 1.35rem; font-weight: 800; color: var(--text-primary); line-height: 1.2; margin-bottom: 4px; }
.card-desc { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

/* 注意喚起（アラート枠） */
.alert-box { background: var(--warning-bg); border: 1px solid #fef3c7; border-left: 4px solid var(--warning); border-radius: 6px; padding: 14px 16px; margin: 20px 0; }
.alert-title { font-weight: 700; font-size: 0.92rem; color: #92400e; margin: 0 0 6px; }
.alert-list { margin: 0; padding-left: 18px; font-size: 0.86rem; color: #78350f; }

/* Diagram / SVG */
figure { margin: 16px 0 24px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
figure svg { width: 100%; height: auto; display: block; }
figcaption { color: var(--text-muted); font-size: 0.85rem; margin-top: 10px; text-align: center; }

/* テーブル */
.scroll-x { overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); margin-bottom: 24px; }
table { border-collapse: collapse; width: 100%; min-width: 500px; font-size: 0.88rem; text-align: left; }
th { background: #f1f5f9; color: var(--text-secondary); font-weight: 600; padding: 10px 14px; border-bottom: 1px solid var(--border); }
td { padding: 12px 14px; border-bottom: 1px solid var(--border-light); vertical-align: top; color: var(--text-primary); }
.st { white-space: nowrap; font-weight: 700; }   /* ステータス記号と語を折り返しで分断しない */
.num { white-space: nowrap; }   /* 数値と単位を折り返しで分断しない（「720万」と「円」が別行に落ちる） */

/* Sparkbar: 表の数値列に大小を重ねる。表は行列位置をエンコードするが大小はエンコードしない */
.sb { margin-top: 6px; height: 6px; background: var(--border-light); border-radius: 2px; overflow: hidden; }
.sb > i { display: block; height: 100%; background: var(--text-muted); }
.sb.is-focus > i { background: var(--primary); }
.sb.is-none { border: 1px dashed var(--border); background: transparent; }
tr:last-child td { border-bottom: none; }

/* 詳細折りたたみ */
details { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; margin-bottom: 10px; }
summary { padding: 12px 16px; font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; }
details > div { padding: 14px 16px; font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; border-top: 1px solid var(--border-light); background: #fafbfc; }

/* 狭幅: 比較表を行ごとのカードへ落とす。横スクロールで読ませない */
@media (max-width: 600px) {
  table { min-width: 0; }
  thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  tr { display: block; border-bottom: 1px solid var(--border); padding: 8px 0; }
  tr:last-child { border-bottom: none; }
  td { display: grid; grid-template-columns: 7.5em 1fr; gap: 10px; border-bottom: none; padding: 6px 14px; }
  td::before { content: attr(data-label); font-weight: 600; color: var(--text-secondary); }
}

/* 印刷: 詳細層を開いて出す。閉じたまま印刷すると情報が落ちる */
@media print {
  body { background: #ffffff; padding: 0; }
  ::details-content { content-visibility: visible; }
  details { break-inside: avoid; border-color: var(--border); }
  figure, .card, tr { break-inside: avoid; }
  .scroll-x { overflow-x: visible; }
}
```

## 全体骨格

```html
<div class="wrap">
  <!-- 5秒層: 主題・現状・エグゼクティブメトリクス -->
  <h1>{{ 主題 — 現在の状態 }}</h1>
  <p class="note">{{ 資料全体の要約・背景を1〜2文で端的に説明 }}</p>

  <!-- 原文に重要数値がある場合のみ。数値がなければこの .cards ブロック自体を出さない -->
  <div class="cards">
    <div class="card">
      <div class="card-label">{{ 原文にある指標名 }}</div>
      <div class="card-val">{{ 原文の数値・単位 }}</div>
      <p class="card-desc">{{ 原文の条件・時点。見込みなら発言者も併記 }}</p>
    </div>
    <!-- 重要数値が複数ある場合のみ2〜4枚、最大4枚 -->
  </div>

  <!-- 30〜90秒層: Visual Router が図を選び、3文テストを通る場合のみ配置 -->
  <h2>{{ 問い1: 今何が起きていて、構造はどうなっているか }}</h2>
  <figure>
    <!-- インラインSVG: 2x2象限図、因果フロー、タイムライン、プロセス図など -->
    <svg viewBox="0 0 ..." role="img" aria-label="{{ この図が示すこと }}">
      <title>{{ 図タイトル }}</title>
      <desc>{{ 一文説明 }}</desc>
      ...
    </svg>
    <figcaption>{{ 図が示す核心的な示唆・構造 }}</figcaption>
  </figure>

  <!-- 30〜90秒層: 2つ以上の対象に比較関係がある場合のみ、比較マトリクス・ステータス表 -->
  <div class="scroll-x">
    <table>
      <thead>
        <tr><th>{{ 項目 }}</th><th>{{ 状態 / ステータス }}</th><th>{{ 影響 / 示唆 }}</th></tr>
      </thead>
      <tbody>
        <!-- 各 td に data-label で列名を持たせる（狭幅でヘッダーを隠すため） -->
        <tr><td data-label="{{ 項目 }}">...</td><td data-label="{{ 状態 / ステータス }}">...</td><td data-label="{{ 影響 / 示唆 }}">...</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 原文に未決事項・リスク・次期アクションがある場合のみ、アラート枠で明確化 -->
  <div class="alert-box">
    <div class="alert-title">未決事項・原文にある対応</div>
    <ul class="alert-list">
      <li><strong>{{ 期限/担当 }}</strong>: {{ 具体的な対応内容と必要な確認事項 }}</li>
    </ul>
  </div>

  <!-- 詳細層: 原文と経緯の細部（既定は全て閉じる） -->
  <h2>原文と経緯の細部</h2>
  <details id="d1"><summary>{{ 中身が分かる見出し }}</summary><div>{{ 原文引用・詳細ログ }}</div></details>
</div>
```

## 塊ごとの表現ブロック

### 1. エグゼクティブ・メトリクス（5秒層）
読者が「数字・規模・進捗」を一瞬で把握するためのカード。
```html
<div class="cards">
  <div class="card">
    <div class="card-label">{{ 原文にある指標名 }}</div>
    <div class="card-val">{{ 原文の数値・単位 }}</div>
    <p class="card-desc">{{ 原文の条件・時点。見込みなら「○○氏見込み」のように帰属を併記 }}</p>
  </div>
</div>
```

### 2. 決定的な Diagram（30〜90秒層）
文章で読むと複雑な「力学・時系列・構造」を視覚化する。
- **2×2 象限マップ（Quadrant）**: 原文に定義された2軸で位置づけを示す。`UNDERSTAND` では原文にないスコア、確度、優先度を作らない。
- **因果・停滞フロー（Flowchart）**: なぜ遅延しているか、どこで詰まっているかのボトルネックを示す。
- **プロセス・タイムライン（Timeline / Process）**: 今どこにいて、次がいつかを示す。

インライン SVG で描画し、外部読み込みや JS を一切使わない。

### 3. 比較マトリクス表（30〜90秒層）
2つ以上の対象や案件の比較。バッジの乱用は避け、表のヘッダー・列（ステータス列等）で明確に整理する。
```html
<div class="scroll-x">
  <table>
    <thead>
      <tr><th>対象</th><th>ステータス</th><th>重要数値</th><th>ボトルネック / 次のアクション</th></tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="対象"><strong>案件A</strong></td>
        <td data-label="ステータス"><span style="color:var(--success);font-weight:700;">● 最終調整</span></td>
        <td data-label="重要数値">1,500万円</td>
        <td data-label="次のアクション">法務確認待ち（9/25予定）</td>
      </tr>
      <tr>
        <td data-label="対象"><strong>案件B</strong></td>
        <td data-label="ステータス"><span style="color:var(--warning);font-weight:700;">▲ 停滞中</span></td>
        <td data-label="重要数値">800万円</td>
        <td data-label="次のアクション">先方決裁者不在（次回アポ未定）</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4. 懸念・注意喚起（アラートボックス）
読者が最も見落としてはいけないリスク・未解決事項は、薄い黄・赤背景の専用アラート枠で際立たせる。
```html
<div class="alert-box">
  <div class="alert-title">⚠️ 注意すべきリスク・未決事項</div>
  <ul class="alert-list">
    <li><strong>案件X</strong>: 競合がコンペ参入。9月末までに機能要件回答が必須。</li>
  </ul>
</div>
```

### 5. 原文と経緯の細部（詳細層）
背景の長い議事録やログ、逐語引用は `<details>` に格納する。
```html
<details id="d1">
  <summary>引き継ぎメモ原文（営業部 鈴木）</summary>
  <div>
    （原文のテキストをそのまま保管）
  </div>
</details>
```

## 根拠の集約

各主張の原文対応は残し、本文セクション単位でまとめる。末尾の `<details>` の見出しに対応セクション名と原文位置（節名・行番号・時刻）を示す。必要ならセクション末尾に1つだけ「原文と注記」リンクを置く。全行リンクは不要で、根拠の省略とは区別する。

閉じた `<details>` 内へのアンカージャンプで自動展開されるとは仮定しない。リンク先の表示された見出しから、利用者が明示的に開ける形にする。

```html
<p><a href="#source-section-a">原文と注記：案件比較</a></p>
<!-- ページ末尾 -->
<h3 id="source-section-a">案件比較の原文と注記</h3>
<details><summary>会議メモ「案件状況」第2〜4段落</summary>
  <div>原文の引用、数値の条件、推測の帰属</div>
</details>
```

完了・未着手などの進捗と、事実・推測・未確認などの確からしさは別の軸。状態列だけで区別できなければ、セルや注記に「未確認」「担当者の見込み」等を明記する。撤回された値や原文の意見も、訂正・発言者を併記して残す。意見は出力自身の推奨として採用しない。

比較以外の情報をテンプレートの表へ押し込まない。食い違いは本文中の1ブロックへ集約し、主張A／主張B／出どころ／原文にある確認手段を対置する。

## 表のセル予算

**1セル30字以内。** 超える内容は、列を分けるか、詳細層へ送るか、セル内を短い箇条書きにする。

**30字超のセルが表全体の10%を超えたら、その表は構造装置（Tier B）に数えない。** 行列位置でエンコードしているのではなく、グリッドに散文を入れているだけなので、`references/representation-budget.md` の下限の分子から外す。

実測された失敗: 44セル中、30字超が5セル（11.4%）、最大46字。「法務より『契約書の雛形を扱う部署では使えない』」のような1文まるごとのセルが混ざると、視線が行列ではなく文を追い始める。

- 見出し行のラベルは短く（「制約・指摘」より「制約」）
- 長い引用は詳細層へ送り、セルには結論だけを置く
- どうしても長い時は列を分ける（「機能」と「制約」を1列に混ぜない）

## 表の数値列には sparkbar を重ねる

**表は「どの対象のどの軸か」を行列位置でエンコードするが、値の大小はエンコードしない。** 実測された失敗: 「年およそ720万円」と「1,100円」が同じ文字サイズで並び、桁が3つ違うことが読み取れなかった。

同じ単位の数値列が2つ以上並ぶなら、セル内に sparkbar を置く。規則は `references/chart/type-sparkbar.md`。

- バーは**数値の下**。数値を消さない（正確な値と概観の両方を残す）
- 幅は**列内の最大値を100%**として比例。**0 起点**
- accent は列内で1本だけ
- **欠測は破線の空トラック**にし、「原文に記述なし」と書く。**0 幅のバーにしない**（「無料」と誤読される）

```html
<td data-label="月額">
  <span class="num">2,400円</span>
  <div class="sb is-focus" role="img" aria-label="月額 2,400円。この列の最大値"><i style="width:100%"></i></div>
</td>
<td data-label="月額">
  <span class="num">原文に記述なし</span>
  <div class="sb is-none" role="img" aria-label="原文に記述なし"></div>
</td>
```

`aria-label` に値と比率を書く。バーは視覚チャネルの追加であって、値の置き換えではない。

## 状態記号の語彙（固定）

表のステータス列で使う記号は次に固定する。**形が状態の種類を持ち、色は補助**（色は印刷と色覚条件で落ちる）。

| 記号 | 状態 | 色 |
|---|---|---|
| `●` | 確定・完了 | `var(--success)` |
| `▲` | 懸念・停滞・指摘あり | `var(--warning)` |
| `■` | 未確認（根拠が弱い、裏取り前） | `var(--warning)` |
| `○` | 未着手 | `var(--text-muted)` |
| `×` | 不可・却下 | `var(--danger)` |

**同じ記号を違う意味に使わない。** 実測された失敗: `●` を「国内保管だが法務未確認」と「社内サーバー設置で確定」の両方に使い、形が区別を担わなくなった。前者は `■`（未確認）が正しい。

記号だけを置かず、必ず短い語を添える（`● 最終調整` / `■ 国内保管（契約書は法務未確認）`）。

**記号と語を折り返しで分断しない。** ステータス列は幅が狭くなりやすく、`▲` と語が別行に落ちると記号が意味を失う。次を CSS に入れ、ステータスの `<span>` に当てる。

```css
.st { white-space: nowrap; font-weight: 700; }
.num { white-space: nowrap; }
```

数値と単位も同様に分断しない。`<span class="num">年およそ720万円</span>` のように包む。

```html
<td data-label="状態"><span class="st" style="color:var(--warning);">▲ 可否が未決</span></td>
```

## メトリクスカードの並び順

5秒層のカードは **comprehension_goal に効く順** に並べる。原文の登場順でも、数値の大小順でもない。

1. その資料の状態を決めている数値（それが崩れると他が無意味になるもの）
2. 規模・件数
3. 経緯上の数値

実測された失敗: 想定人数の定義ズレ（費用比較そのものを無効化する）が4枚目に置かれ、判断に効かない経緯の数値が先に来た。

## 描画しての自己レビュー

**出力前に1回、実際に描画して見る。** `references/quality-rubric.md` の軸8（視覚エンコーディング）と軸9（リズム）は、マークアップの検査では判定できない。

実行できる環境では次を測る。

- 1024px 幅でのページ全長（`document.documentElement.scrollHeight`）
- **装置ごとの占有面積**（`getBoundingClientRect().height` の合計）と、読む系の面積比
- **30字を超える `<td>` の割合**（表ごと）
- 320 / 768 / 1024 幅での横 overflow の有無
- 5秒層と最初の `<h2>` が 900px 以内に入るか
- 装置の並び（同一装置の連続がないか）

描画できない環境では、装置の並びを上から書き出す作業だけは必ず行う。**「箱組みへの退行」は、並びを書き出すと文字だけで検出できる。**

## 狭幅・印刷・検索の扱い

本 Skill は「情報を削らない」と約束するので、**画面以外の経路でも情報が落ちないこと**まで契約に含める。

### 狭幅（〜600px）

比較表は主力表現なので、狭幅で横スクロールさせない。`@media (max-width: 600px)` で行ごとのカードへ落とす。**このとき各 `<td>` に `data-label` 属性で列名を持たせる**（持たせないと、ヘッダーを隠した時に何の値か分からなくなる）。

```html
<tr>
  <td data-label="対象"><strong>案件A</strong></td>
  <td data-label="ステータス"><span style="color:var(--success);font-weight:700;">● 最終調整</span></td>
  <td data-label="重要数値">1,500万円</td>
  <td data-label="次のアクション">法務確認待ち（9/25予定）</td>
</tr>
```

### 印刷

閉じた `<details>` は印刷に出ない。`<script>` を使わずに開くため、`@media print` で `::details-content { content-visibility: visible; }` を指定する。

**既知の制限**: `::details-content` は 2025年9月以降の主要ブラウザで利用できるが、それ以前のバージョンでは効かず、詳細層が印刷されない。印刷を前提とする用途では、**詳細層に置いてよいのは原文引用と経緯の細部だけ**という規定（畳んでよいものの範囲）を守ることが、そのまま保険になる。

### 検索（Ctrl+F）

Chromium 系は find-in-page で `<details>` を自動展開するが、これは全ブラウザ共通の挙動ではない。**詳細層の中身は検索で必ず見つかる、と仮定しない。** `<summary>` に中身が分かる見出しを置く規定は、この制約への対応でもある。

## 禁止事項

- `<link rel="stylesheet">` / `<script src>` / `<script>` / CSS `@import` / `url(http…)`
- 外部フォント・CDN・外部画像・`fetch()`（単一 HTML・ローカルで完全動作すること）
- 全行に `[事実]` `[推測]` などのインラインバッジを貼り散らかすこと（認知負荷を激増させるため禁止）
- 1文ごとに `<a class="src">根拠</a>` リンクを配置すること（視覚ノイズになるため禁止。原文は末尾 `<details>` に集約）
- CJK を SVG `<path>` でストローク描画すること（必ず `<text>` を使用）
- 詳細層を既定で開いた状態にすること
- 表・図・箇条書きへ変換済みの塊を `<details>` に再収納すること（変換した意味を捨てるため）
- 比較表を狭幅で横スクロールさせたまま出すこと（`data-label` とカード落としの CSS を必ず入れる）
- `@media print` を省くこと（閉じた詳細層が印刷で落ち、「情報を削らない」に反するため）
- 「原文に記述なし」を 0 としてチャートに描くこと（欠測は破線の空スロット）
- 同じ単位の数値列が並ぶ表に、sparkbar もチャートも置かないこと
