# fixtures — 照合スクリプトの検査用

`scripts/validate.mjs` が `check-output.mjs` の効き目を確かめるためだけに使う。**出力の見本ではない。** Skill を実行する時にこのフォルダを読まない・真似しない。

- `source.md` — 検査用の架空の原文
- `good.html` — 合格すべき出力（`check-output.mjs` が終了コード0）
- `bad.html` — 不合格になるべき出力（計算した値・無い年号・言い換えた引用・無限ループのアニメーション）
