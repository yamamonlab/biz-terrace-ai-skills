---
name: astra-mascot
description: "Biz-Terrace.ai の公式ピクセルマスコット Astra（アストラ）を新規作画・差分作成・アニメーション化・spritesheet化・Web/資料向けに書き出す時に使う。Astra以外の一般的なマスコット、ロゴ、人物イラストには使わない。"
---

# Astra Mascot Production

Biz-Terrace.ai の Astra を、ブランド同一性を崩さずに制作・更新します。

> **Character sentence:** 会社を越えて知恵を拾い、仕事に持ち帰る、小さな同僚。

このSkillは、キャラクターの「かわいさ」を毎回ゼロから発明するのではなく、**canonical master → state generation → deterministic assembly → QA** の順で再現性を保ちます。

## 最初に読むもの

1. [Identity Contract](references/identity-contract.md)
2. 出力がアニメーションなら [Animation Contract](references/animation-contract.md)
3. 生成後は [QA Checklist](references/qa-checklist.md)
4. Codex互換petを作る場合だけ [Codex Target](references/codex-target.md)

利用環境に Biz-Terrace.ai のcanonical asset repoが見える場合は、同repoの `biz-terrace-ai/06_community_system/astra/CHARACTER.md` と `ANIMATION.md` を最優先します。公開Skill内のreferenceはportable copyです。

## 入力

最低限いずれか:
- canonical Astra master / 承認済みAstra画像
- canonical asset repoへのアクセス
- 既存Astra asset pack

追加で:
- 欲しいscene/state
- 用途（Web / slide / SNS / Codex pet）
- サイズ、背景、ループの有無
- 既存素材を置換するか、派生版として追加するか

既存画像やrepoから読める情報は再質問しません。

## 1. Canonical Gate

最初にAstraの正本を特定します。

固定要素:
- 暖かいアイボリー〜グレージュの丸い一体型ボディ
- ごく小さい黒い目と口
- 淡いピンクの頬
- 1本の柔らかいアンテナ + knowledge orb
- 1.2〜1.4頭身程度
- business casual
- pixel art
- 人間でもSFロボットでもない

canonical画像がある場合、それを**見た目のsource of truth**として使います。テキストだけで別デザインへ再解釈しません。

canonical画像がない場合は、先に1枚のmasterを作ります。正面、全身、透明または単純背景、余分な文字やシーン小物なし。masterの承認前に大量のstateへ展開しません。

## 2. Scene / State Gate

### Scene-loop track

公式HP・SNS・イベント・資料向け。状態固有のpropsを使えます。

標準scene:
- basic
- glasses / read
- beret / community
- work
- idea / celebrate
- coffee
- meeting / talk
- present
- outing / walk
- sleep

1 scene = 1 message。小物を盛りすぎません。

### Presentation track

sceneのfirst frameから高解像度透過PNGを作ります。pixel artはnearest-neighborで拡大し、補間でぼかしません。

### Codex-compatible pet track

Codex互換を明示された場合だけ使います。scene-loop assetを流用して「互換」と呼びません。

利用環境に OpenAI の `hatch-pet` Skill があれば、**固定atlasの組み立て・検証という専門部分はそちらのcontractを参考または委譲**し、Astra側ではcanonical master、identity notes、state intentを供給します。

利用できない場合は [Codex Target](references/codex-target.md) の公開contractを満たすよう独立して構成します。

## 3. Grounded Production

stateごとにcanonical masterを必ず参照します。

守ること:
- 顔位置・目の間隔・body ratioを維持
- antennaの根元位置を維持
- knowledge orbは意味に応じて色・明度を変えてよい
- 服装やpropsはsceneの意味に必要なものだけ
- 同じstate内でoutline thicknessを変えない
- 背景、文字、UIパネル、説明ラベルは生成しない
- 生成モデルにspritesheet全体を一発で描かせない

複数frameは「同じAstraの連続状態」として作り、frameごとに別キャラクターへ見えるdriftを許しません。

## 4. Deterministic Assembly

AI生成はキャラクターframeまで。atlas layout、cell placement、unused cell transparency、file naming、manifest生成はスクリプト等のdeterministic処理で行います。

scene-loop推奨:
- base cell: 192×208
- static atlas: 5 columns × 2 rows
- transparent
- first frame単体で成立

WebではCSS motionだけで成立する軽量版を最初に使ってよいです。本格的なframe animationへ更新する場合も同じcellとscene IDを維持します。

## 5. Motion

Astraは「ぬるぬる」より「ちょこちょこ」。

- idle: 1〜2px breathing / blink / antenna sway
- work: 前傾 + 手元の短い反復
- talk: 小さな頷き
- present: 指し棒・身体の向き
- walk: 小さな足の交互運動
- celebrate: 4〜6px程度のjump
- sleep: 低速呼吸

常時大きく揺らさず、コンテンツの邪魔をしないこと。

## 6. QA Gate

[QA Checklist](references/qa-checklist.md)を通すまで完成扱いしません。

最低限:
- identity driftなし
- 192×208でも顔が読める
- transparent haloなし
- frame size poppingなし
- baselineが意図せず上下しない
- reduced-motion用first frameあり
- manifestと実ファイルのgeometry一致
- Codex-compatibleを名乗る場合はstrict atlas geometryも一致

失敗した軸だけ直します。全体再生成を繰り返してデザインを漂流させません。

## 7. Gitへの保存

canonical asset repoへ保存するとき:
- source / contract / dist / scripts / examplesを分離
- 新しいassetで既存版を黙って上書きしない
- versionとmanifestを更新
- PNG/WebP程度では原則Git LFS不要
- Aseprite/PSD/動画等が大きくなったらLFSを再検討
- 公開repoへの同期は、公開可否とライセンスが決まってから行う

## 完了報告

次を短く報告します。
- canonicalにした画像/版
- 追加・更新したscene
- static / animated / presentation / Codex のどこまで完了したか
- QA結果
- Git branch / PR
- 未完了の点（特にframe-authored animationやstrict Codex atlas）
