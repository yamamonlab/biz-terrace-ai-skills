# 公開Skillの保守

このリポジトリは Biz-Terrace.ai で共有する公開Skillの保守場所です。

Skillごとに `PROVENANCE.json` で正本の所在を宣言します。すべてのSkillを同じ方式で管理しません。

## 2つの運用モード

### Public canonical

`"canonical": true` のSkillは、この公開リポジトリが正本です。

- 変更はこのリポジトリのPRで行います。
- private repository側に必要な場合は、公開タグまたはcommit SHAから同期します。
- イベント・教材・production consumerは `main` ではなくtagまたはSHAをpinします。
- HTML Visualizer は 2026-09-29 に単体のリポジトリ `yamamonlab/html-visualizer` へ移しました。今後の変更はそちらで行います。

### Public distribution / mirror

`"canonical": false` のSkillは、別の正本から公開可能な範囲を同期します。

- 元の正本コミットを `PROVENANCE.json` に記録します。
- private repositoryのGit履歴、認証情報、内部runtime設定は公開しません。
- 公開だけのREADME・導入案内はこのリポジトリで管理できます。
- 既存の Japanese PPTX Skills / event thumbnail Skill は、移行するまでこのモードを維持します。

## HTML Visualizer の更新

`yamamonlab/html-visualizer` で行います（`RELEASING.md` を参照）。このリポジトリの `skills/html-visualizer/` には移転の案内だけを置きます。

## 公開前チェック

- 相対リンクが存在する
- `SKILL.md` 単体ではなく必要なreferencesを含む
- APIキー・認証情報・個人情報・非公開業務データがない
- third-party noticeとlicenseが保全されている
- サンプル固有のルールをcore contractへ混ぜていない
- UNDERSTAND / DECIDE の境界を弱めていない

## 提案の取り込み

公開canonical SkillへのIssue/PRは、このリポジトリで直接レビューします。mirror Skillへの共通手法の提案は、まずそのSkillの正本へ反映するかを判断してから公開版へ同期します。
