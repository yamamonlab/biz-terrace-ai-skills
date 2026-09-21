# 公開Skillの保守

このリポジトリは Biz-Terrace.ai で共有する公開Skillの保守場所です。

Skillごとに `PROVENANCE.json` で正本の所在を宣言します。すべてのSkillを同じ方式で管理しません。

## 2つの運用モード

### Public canonical

`"canonical": true` のSkillは、この公開リポジトリが正本です。

- 変更はこのリポジトリのPRで行います。
- private repository側に必要な場合は、公開タグまたはcommit SHAから同期します。
- イベント・教材・production consumerは `main` ではなくtagまたはSHAをpinします。
- Cognitive View はこのモードで運用します。

### Public distribution / mirror

`"canonical": false` のSkillは、別の正本から公開可能な範囲を同期します。

- 元の正本コミットを `PROVENANCE.json` に記録します。
- private repositoryのGit履歴、認証情報、内部runtime設定は公開しません。
- 公開だけのREADME・導入案内はこのリポジトリで管理できます。
- 既存の Japanese PPTX Skills / event thumbnail Skill は、移行するまでこのモードを維持します。

## Cognitive View の更新

1. `skills/cognitive-view/` を編集するbranchを作ります。
2. `node skills/cognitive-view/scripts/validate.mjs` を実行します。
3. Behavior変更では、複数ジャンルの代表入力でモデル出力を比較します。
4. deterministic checksだけなら **VALIDATED**、モデル出力比較まで行った場合だけ **EVALUATED** と記録します。
5. PRをmainへmergeします。
6. リリース時は `cognitive-view-vX.Y.Z` tagを付けます。
7. consumer側はtagまたはmerge commit SHAへ更新します。

## 公開前チェック

- 相対リンクが存在する
- `SKILL.md` 単体ではなく必要なreferencesを含む
- APIキー・認証情報・個人情報・非公開業務データがない
- third-party noticeとlicenseが保全されている
- サンプル固有のルールをcore contractへ混ぜていない
- UNDERSTAND / DECIDE の境界を弱めていない

## 提案の取り込み

公開canonical SkillへのIssue/PRは、このリポジトリで直接レビューします。mirror Skillへの共通手法の提案は、まずそのSkillの正本へ反映するかを判断してから公開版へ同期します。
