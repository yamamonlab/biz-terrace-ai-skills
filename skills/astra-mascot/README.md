# Astra Mascot Skill

Biz-Terrace.ai の公式ピクセルマスコット **Astra（アストラ）** を、同じキャラクターとして一貫して制作・展開するためのSkillです。

対象:
- 公式HPの常駐キャラ
- イベントページのscene loop
- スライド / PDF / SNS向け透過PNG
- pixel animation / spritesheet
- Codex互換pet atlas（明示された場合）

このSkillは一般的なマスコット生成Skillではありません。Astraのcanonical identityを守ることに特化しています。

## 基本原則

**canonical master → state → deterministic assembly → QA**

生成AIに毎回「Astraっぽいもの」を描かせるのではなく、承認済みmasterを参照して状態だけを変えます。

## 正本

キャラクターassetの正本は private `community-labs/biz-terrace-ai/06_community_system/astra/`。この公開Skillは制作手順の正本です。
