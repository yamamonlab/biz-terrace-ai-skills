# Foundations — 各ルールが何に基づいているか

- [なぜこのファイルがあるか](#なぜこのファイルがあるか)
- [1. 設計の中心命題](#1-設計の中心命題)
- [2. ルール → 原理 → 出典](#2-ルール--原理--出典)
- [3. 複雑度予算の根拠](#3-複雑度予算の根拠)
- [4. 削ってよいルールの順序](#4-削ってよいルールの順序)
- [5. 出典](#5-出典)

## なぜこのファイルがあるか

本 Skill のルールには、既存研究に対応するものと、運用の都合で置いたものが混在している。区別がないと、モデルの進化に合わせてルールを削る時に、**根拠のあるルールから先に消える**事故が起きる。

このファイルは採点にも出力にも影響しない。**ルールを変更・削除する時だけ読む。**

## 1. 設計の中心命題

> **情報は削らない。削るのは「文章として読ませる量」だけ。**

これは認知負荷理論（Sweller）の用語で次のように書ける。

| 負荷の種類 | 中身 | 本 Skill の扱い |
|---|---|---|
| **intrinsic（内在的）** | 題材そのものが持つ難しさ。要素間の相互作用（element interactivity）の量 | **保つ。** これを削ることが「情報を削る」に等しい |
| **extraneous（外在的）** | 提示方法に由来し、理解に寄与しない処理 | **削る。** 散文で読ませる形式、全行バッジ、1文ごとのリンクはここ |
| **germane（学習的）** | 理解の構築そのものに使われる処理 | extraneous を削った分、ここへ回す |

**「要約して短くする」は intrinsic を削る操作なので、本 Skill の仕事ではない。** 表現変換は extraneous だけを削る操作であり、だからこそ情報保持率 95% と両立する。`references/quality-rubric.md` が主指標を2本立てているのは、この区別を採点に落とすため。

## 2. ルール → 原理 → 出典

| 本 Skill のルール | 対応する原理 | 出典 |
|---|---|---|
| 5秒 / 30〜90秒 / 詳細 の3層。詳細は既定で閉じる | **Visual Information Seeking Mantra** — overview first, zoom and filter, details-on-demand | Shneiderman 1996 [S] |
| 5秒層だけで comprehension_goal に到達できること | 同上（overview は全体の物語を語り、細部に入らない） | Shneiderman 1996 [S] |
| 情報は削らず、読ませる量だけ削る | intrinsic / extraneous load の分離 | Sweller ほか [C] |
| 全行インラインバッジ（`[事実]` `[推測]`）の禁止 | **coherence 原理** — 余計な素材を除くほど理解が深まる（23/23 の実験で支持、効果量中央値 0.86） | Mayer [M] |
| 1文ごとの「根拠」リンクを置かず、セクション単位へ集約 | **coherence + redundancy 原理** — 同じ情報の重複提示は、短く・要点に限り・対象の近くにある時だけ有効 | Mayer [M] |
| 問い見出し、ステータス列、アラート枠で区別する | **signaling 原理** — 本質的な箇所を目立たせると extraneous 処理が減り、余った容量が理解に回る | Mayer [M] |
| §4.5 図を背骨にする時、テキストを図の注釈として置き、並列に置かない | **split-attention 効果 / spatial contiguity 原理** — 2つの情報源を往復させると負荷が上がる | Mayer [M] |
| 矛盾を「食い違い」ブロック1つへ集約し、塊の中で重複記述しない | 同上（探索の往復を作らない） | Mayer [M] |
| 形が種別を持ち、色では示さない（`references/diagram/grammar.md`） | 色は印刷・色覚条件で落ちる情報チャネル。二重符号化で冗長性を持たせる | 運用判断 |
| 3文テスト（散文で2文で書ける内容を図にしない） | 図は面積と読解コストを要求するので、intrinsic に見合う時だけ使う | 運用判断（3節参照） |

## 3. 複雑度予算の根拠

`node ≤ 9 / edge ≤ 12 / focal accent ≤ 2` は経験則だが、任意の数字ではない。

- **node ≤ 9** — 1枚の図を「一度に見て分かる」状態に保つための上限。ワーキングメモリで同時に扱える要素数には厳しい制約があり、要素が増えるほど element interactivity が二次的に増える。9 は運用で「凡例なしに読める」限界として置いている
- **edge ≤ 12** — node 9 に対して、全結合（36本）のおよそ1/3。これを超えると、読者は図を追うのではなく辿ることになり、散文より遅くなる
- **focal accent ≤ 2** — signaling は「一部だけ」目立つ時に効く。全要素が強調された図は、強調がない図と情報量が等しい

**この3つは可変。** 変えるなら、変えた後も「その図を散文で書くより速いか」が成り立つかで判定する。速さの測り方は `references/eval-protocol.md`。

## 4. 削ってよいルールの順序

引き算の運用をする時は、この順で候補にする。

1. **運用判断のみのルール** — 上表で出典が「運用判断」のもの。モデルが放っておいてもできるようになったら削る
2. **原理に紐づくが、閾値だけのもの** — 複雑度予算の数値、カード枚数の上限。閾値を動かすのであって、ルール自体は残す
3. **原理そのもの** — coherence / signaling / split-attention / 3層構造。**これらはモデルの性能とは無関係に、人間の読み手側の制約**なので、モデルが賢くなっても消えない

3 を削る提案が来たら、`references/eval-protocol.md` の比較実験で「削っても理解速度が落ちない」ことを示すまで採用しない。

## 5. 出典

- **[S]** Ben Shneiderman, *The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations*, IEEE VL 1996. https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf
- **[M]** Richard E. Mayer, *Principles for Reducing Extraneous Processing in Multimedia Learning: Coherence, Signaling, Redundancy, Spatial Contiguity, and Temporal Contiguity Principles*, The Cambridge Handbook of Multimedia Learning. https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E
- **[C]** John Sweller, *Element Interactivity and Intrinsic, Extraneous, and Germane Cognitive Load*, Educational Psychology Review 22, 2010. https://link.springer.com/article/10.1007/s10648-010-9128-5
