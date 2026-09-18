# Pattern family: decide

## 01 目次／中扉
- use_when: 枚数が多く、論点や章構造の現在地を明示したい。
- proof_mechanism: 読み手に資料構造と進行位置を示す。
- invariants: 飾りの表紙より機能を優先。章名と現在地を明確にする。

## 02 エグゼクティブサマリ
- use_when: 経営会議冒頭で、何を決めるかを先に予告する。
- proof_mechanism: 論点・求める決定・主要根拠・参照ページを一表で接続する。
- invariants: 論点3〜6個。Decision IDを付与。

## 03 クロージング決定
- use_when: 最終ページで会議の決定を回収する。
- proof_mechanism: 決定事項、直近スケジュール、判断基準を同一ページで確定する。
- invariants: Summaryと同じDecision ID。資料内で最も重いページ。

## 04 個票カタログ
- use_when: 同種対象を反復し、差分だけを浮かせたい。
- proof_mechanism: 同一レイアウトで比較ノイズを減らす。
- invariants: 項目位置・尺度・強調方法を全個票で固定。

## 05 KPIレーン付き時系列
- use_when: 時系列結果と管理指標の動きを同時に判断したい。
- proof_mechanism: 同じ時間軸を縦貫させ、結果と管理KPIの対応を示す。
- invariants: グラフ下にKPIレーン。同じ列位置で時間を揃える。

## 06 バブル優先度マップ
- use_when: 複数施策の優先順位を自社コントロール性・効果発現速度・年効果で決める。
- required_data: 自社決定で進む割合、満額効果までの年数、年効果、外部前提有無。
- proof_mechanism: 左上を優先ゾーンとして、実行可能性と効果速度を同時比較する。
- invariants: 縦=自社決定で進む割合、横=満額効果までの年数、円面積=年効果、塗り=自社完結、白抜き=外部前提。
