# Pattern family: decompose

## 07 滝分解
- use_when: 起点と終点の差を寄与要因で説明する。
- required_data: 起点、寄与、終点を同一単位で持つ。
- proof_mechanism: 起点→各寄与→終点を積み上げ、差分の主因を可視化する。
- invariants: 起点と終点は合計。増分型なら終点は増分合計。受け渡しは破線。右に打ち手表を置ける。

## 08 ファネル
- use_when: 工程ごとの歩留まりと最大離脱点を特定する。
- required_data: 各段階の件数。
- proof_mechanism: 段の幅を件数比例にし、離脱量の大きさを直接見せる。
- invariants: 最大離脱点に打ち手注記。

## 09 バリューチェーン収益図
- use_when: 工程別に収益・利益がどこで生まれるかを分解する。
- proof_mechanism: 工程と収益要素を横位置で厳密に対応させる。
- invariants: 工程の矢羽根とグラフ位置を厳密整列。

## 10 分配カスケード
- use_when: 受取・支払・利益の配分を同一単位で示す。
- proof_mechanism: 共通スケールで金額の流れと取り分を比較する。
- invariants: 自社取り分だけ濃色。

## 11 ロジックツリー
- use_when: 結果を数式・要因へ分解し、末端に具体策を接続する。
- proof_mechanism: 親子関係と演算関係を明示する。
- invariants: 枝に四則演算記号。末端に具体策。右に評価列。

## 12 数式分解
- use_when: KPIや成果を複数項の式として対象別に比較する。
- proof_mechanism: どの項が結果に効くかを同一式で示す。
- invariants: 縦軸を式にし、対象ごとに項の効き方を行頭で言い切る。

## 13 同単位の滞留分解
- use_when: リードタイム等を実働と待ちに分け、滞留の大きさを示す。
- proof_mechanism: 同一スケールの帯で時間構成を直接比較する。
- invariants: 実働と待ちを同単位。待ちが主因なら面積差で示す。

## 46 縦型イシューツリー
- use_when: 問いを下方向に分解し、最重要経路を示す。
- proof_mechanism: 問い→下位論点の階層を一方向で追わせる。
- invariants: 最重要経路のみ太線。
