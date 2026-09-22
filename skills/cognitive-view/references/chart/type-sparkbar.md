# Sparkbar（表の数値列に重ねるインラインバー）

## 使う条件

- 比較表に **同じ単位の数値列** があり、値が **2つ以上** 並ぶ
- その列の **大小が論点** になっている（費用、人数、期間）
- 表を捨てずに大小をエンコードしたい時。**独立したチャートを足すより優先する**

表の行列位置は「どの対象のどの軸か」をエンコードするが、**大小はエンコードしない**。桁が3つ違う金額が同じ文字サイズで並ぶのは、この欠落による。sparkbar はその1点だけを埋める。

## レイアウト規則

- バーはセルの**数値の下**に置く。数値の代わりにしない（読み取りと概観の両方を残す）
- 幅は **列内の最大値を 100%** として比例させる。**0 起点**
- 高さ 6px、角丸なし、背景トラックを薄く敷く
- accent は列内で **1本だけ**（最大値、または論点の値）
- **欠測は破線の空トラック**にして「原文に記述なし」と書く。0 幅のバーにしない
- 狭幅（カード落ち）でもバーを残す。幅は `100%` 基準なので崩れない

## Anti-pattern

- 数値を消してバーだけにする（正確な値が読めなくなる）
- 単位の違う列（金額と人数）に同じスケールを当てる
- 最大値を100%にせず、任意の上限で切る
- 欠測を 0 幅で描く（「無料」と誤読される）

## CSS

```css
.sb { margin-top: 6px; height: 6px; background: var(--border-light); border-radius: 2px; overflow: hidden; }
.sb > i { display: block; height: 100%; background: var(--text-muted); }
.sb.is-focus > i { background: var(--primary); }
.sb.is-none { border: 1px dashed var(--border); background: transparent; }
```

## テンプレート

```html
<td data-label="月額">
  2,400円
  <div class="sb is-focus" role="img" aria-label="月額 2,400円。この列の最大値"><i style="width:100%"></i></div>
</td>
<td data-label="月額">
  1,100円
  <div class="sb" role="img" aria-label="月額 1,100円。最大値の約46パーセント"><i style="width:46%"></i></div>
</td>
<td data-label="月額">
  原文に記述なし
  <div class="sb is-none" role="img" aria-label="原文に記述なし"></div>
</td>
```

`aria-label` に値と比率を書く。バーは視覚チャネルの追加であって、値の置き換えではない。
