# Pattern family: compare

## 14 軸統一並列
- use_when: 複数の小グラフを同じ尺度で比較する。
- proof_mechanism: 軸差による錯視をなくし、形と水準差だけを比較させる。
- invariants: 最大・最小・目盛を全小グラフで統一。

## 15 共通軸プロセス並列
- use_when: 同じ工程を複数対象で比較する。
- proof_mechanism: 共通プロセスを一度だけ示し、対象差を縦に揃える。
- invariants: 共通プロセスは上に1回。対象を縦積み。

## 16 共通目盛の構造比較
- use_when: 等級・報酬・容量等、同一目盛上の構造を比較する。
- proof_mechanism: 共通目盛に箱の位置・高さを置き、構造差を見せる。
- invariants: 目盛は1本。箱は目盛に正確に配置。

## 17 同型フロー対比
- use_when: 2つの商流・業務・制度フローを同形で比べる。
- proof_mechanism: ノード位置を揃え、経路差だけを浮かす。
- invariants: 左右同型。モノ=実線、金=破線。

## 18 同型組織対比
- use_when: 組織構造や影響範囲を2者比較する。
- proof_mechanism: 同型ツリーで構造差を最小ノイズで見せる。
- invariants: 左右同型。働きかけ範囲は濃淡で表現。

## 19 フォルム対比／リスク評価マップ
- use_when: 同じ2軸上でグループの分布形状やリスクを比較する。
- proof_mechanism: 同一2軸上の塗り分けの形そのものを比較させる。
- invariants: 右に番号対応の方針リスト。

## 45 論証テーブル
- use_when: 複数論点を事実→含意/打ち手の形で圧縮して比較する。
- proof_mechanism: 各セル内でEvidenceとImplicationを直結する。
- invariants: セルは `■事実 → ➢含意・打ち手` の2段。基本形・時間展開・横並び・仮説検証に展開可能。
