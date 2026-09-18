# Biz-Terrace.ai Skills

山門 樹が開発し、[Biz-Terrace.ai](https://biz-terrace-ai.pages.dev/library/)で共有する、仕事やコミュニティ運営のためのAI Skillです。

作者の開発環境から、他の人も使える部分を配布用に取り出しています。ハーネス全体や個人の設定をインストールする必要はありません。

## イベントサムネイル設計

[Skillを読む](skills/zg-event-thumbnail-design/SKILL.md)

Luma・connpass・SNSのイベント画像を、内容に合った文字アートとして設計します。最初に方向性を3〜5案比較し、選んだ案を制作指示にまとめてから画像化します。

- 参照画像がなくても、イベントの目的と対象者から始められます。
- 配色だけでなく、伝える価値・構図・文字表現を比較します。
- 未確定の日付や料金は補わず、生成後は文字と実寸比率を確認します。

## Japanese PPTX Skills

[Skillを読む](skills/japanese-pptx-skills/SKILL.md)

文字起こし、会議メモ、既存分析、または調査テーマから、経営会議で「読んで終わり」ではなく「決めて終わり」になる日本語プレゼン資料を設計するSkillです。

- `Evidence → Message → Storyline → Visual → Render → QA` の順で進み、図から作り始めません。
- `DESIGN.md` をDesign Systemの正本にし、48型は意図が決まってから段階的に読み込みます。
- テーマ起点のResearch Briefing Mode、Executive Briefing 11、出典・推計・実績/予測・ブリッジ検算ルールを含みます。
- PPTX/HTML等の実ファイル生成は、利用環境にある対応機能へRender Specを渡して行います。

[Design System](skills/japanese-pptx-skills/DESIGN.md) / [README](skills/japanese-pptx-skills/README.md) / [配布来歴](skills/japanese-pptx-skills/PROVENANCE.json)

## まず試す

Skillと参照ファイルを読めるAIに、次のように依頼してください。

### イベントサムネイル

> `skills/zg-event-thumbnail-design/SKILL.md`と、各段階で指定された参照ファイルを読んでください。オンライン勉強会のサムネイルを作りたいです。正式タイトルは「AIで会議の記録を仕事につなげる」。対象は議事録を担当する人です。日時は未定なので入れません。まず方向性を3案ください。画像生成は案を選んでからにしてください。

### Japanese PPTX Skills

> `skills/japanese-pptx-skills/SKILL.md`を読み、必要になった段階で指定されたreferenceと`DESIGN.md`を読んでください。「AI時代のクリエイティブ」をテーマに、経営層向けの日本語PPTXを設計してください。公開情報の調査も行い、出典・推計を区別し、最後にQAしてください。

ファイルを参照できないチャットでは、Skill本文と必要な参照ファイルを添付してください。Skillを読むだけでアプリへの登録が完了するわけではありません。

## Skillとして登録する

このリポジトリをダウンロードし、使いたいSkillのディレクトリを**フォルダごと**利用環境のSkill配置先へ登録します。各Skillは`SKILL.md`以外のreferenceを段階的に読むため、`SKILL.md`だけを単独コピーしないでください。

- `skills/zg-event-thumbnail-design/`
- `skills/japanese-pptx-skills/`

具体的な配置先や読み込み方法は、使っているアプリの案内に従ってください。同名Skillがすでにある場合は上書きせず、どちらを正本にするか確認してください。

画像生成、PPTX生成、Web調査などの実行機能そのものはSkillへ埋め込んでいません。利用者が使用を許可した環境の機能を使ってください。APIキーや認証情報をこのリポジトリへ保存しないでください。

## 作者と公開範囲

- 作者・保守者: [山門 樹 / yamamonlab](https://github.com/yamamonlab)
- 活用・共有の場: Biz-Terrace.ai
- ライセンス: [MIT](LICENSE)

作者個人の制作手法を共有するもので、所属企業の公式ツールではありません。ライセンスは同梱テキストに適用されます。生成物、参照画像、サービスや企業の商標の権利を一括で許諾するものではありません。

内部版と同じ実行環境・生成結果を保証するものではありません。各Skillの配布範囲と来歴はSkill内の`PROVENANCE.json`またはリポジトリの配布記録を確認してください。更新方法は[MAINTAINING.md](MAINTAINING.md)に記録しています。

改善案や不具合は、このリポジトリのIssuesまたはPull requestsで受け付けます。非公開情報や認証情報は投稿しないでください。
