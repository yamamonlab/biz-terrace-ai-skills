# Theme｜Forest Green Executive Briefing

## Scope
経営層向け調査ブリーフィング用の**theme tokens / stylistic profile**。
デザイン思想は `DESIGN.md`、配置実装は `references/04-render-rules.md` を正本とする。
ユーザーが別ブランドを指定した場合は未指定部分だけ補う。

## Palette
- Primary: `#0C3B2E`
- Secondary dark: `#1F7A5C`
- Secondary light: `#9DC3B2`
- Tint: `#F0F5F2`
- Accent / warning only: `#B45309`
- Background: white
- Neutral: gray scale

多色使いを避け、アンバーは警告・重点対象だけに使う。

## Surface tokens
- Shadow: none
- Gradient: none
- Decorative rounded card: none by default
- Divider: whitespace / hairline

## Header tokens
- 左上：番号chip + 英文kickerを使用可
- 右上：案件で必要な場合のみ `CONFIDENTIAL`
- analytical pageの主タイトル：head message
- lead文：必要なら1〜2行
- head下：極細hairline使用可
- 同roleページで座標を固定

セリフ体タイトルはユーザー/ブランドが明示した場合のみ。既定は可読性を優先する。

## Footer tokens
- 左：`Source: 組織名, レポート名, 年`
- 推計値あり：`†：推計値を含む`
- 右：文書名 + page number
- 同roleページで座標を固定

## Table tokens
三線表を基本とする。
- Header: PrimaryまたはSecondary dark + white text
- Horizontal rule: hairline
- Vertical rule / outer border: none
- Number: right aligned
- Row label: semibold/bold
- Highlight row: Tintを限定使用

## Chart tokens
- Vertical grid: none by default
- Horizontal grid: minimal / very light
- Series: Primary shades + neutral gray
- Legend: small; direct label preferred
- Gap: 必要に応じてdouble-arrow bracket + `○○pt`
- Actual: solid
- Forecast: dashed
- Forecast period: direct label/caption

## Local annotation token
headを証明する局所判断を1 chartあたり1つまで使用可。
独立So What帯にはしない。

## Density profile
- analytical pages: compact evidence layout
- cover/divider: high whitespace
- closing: decision-first;必要な証拠だけ残す
