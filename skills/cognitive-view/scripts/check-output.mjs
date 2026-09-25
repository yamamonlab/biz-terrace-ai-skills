#!/usr/bin/env node
// Cognitive View の出力HTMLを原文と照合する。外部依存なし。
// 使い方: node scripts/check-output.mjs <output.html> <source.md|txt> [--json]
// 終了コード: 0 = エラーなし（警告はあり得る）/ 1 = エラーあり / 2 = 引数不正
import fs from 'node:fs';

const [, , htmlPath, srcPath, flag] = process.argv;
if (!htmlPath || !srcPath) {
  console.error('usage: node scripts/check-output.mjs <output.html> <source> [--json]');
  process.exit(2);
}
const html = fs.readFileSync(htmlPath, 'utf8');
const source = fs.readFileSync(srcPath, 'utf8');

const errors = [];
const warnings = [];
const info = {};

const zen = (s) => s.replace(/[０-９．，]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const squash = (s) => zen(s).replace(/[\s「」『』"“”]/g, '');

// ---- 1. 単一・自己完結 ----
const lower = html.toLowerCase();
for (const bad of ['<script', '<link rel="stylesheet"', "<link rel='stylesheet'", '@import', 'url(http', 'src="http', "src='http", '<iframe']) {
  if (lower.includes(bad)) errors.push(`外部依存・禁止要素: ${bad}`);
}
if (!/^\s*(<!doctype html>\s*)?<html[\s>]/i.test(html) || !/<\/html>\s*$/i.test(html)) errors.push('HTMLが完結していない（<html>〜</html> でない。途中で切れた可能性）');

const leftover = html.match(/\{\{[^}]{0,40}\}\}/);
if (leftover) errors.push(`部品の仮置きが残っている: ${leftover[0]}`);

// ---- 2. 見出し ----
const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
if (!h1) errors.push('h1 がない');
else {
  info.h1 = stripTags(h1).trim();
  if (!/[—–―-]|：|:/.test(info.h1)) warnings.push(`h1 が「主題 — 状態」の形か確認: ${info.h1}`);
}

// ---- 3. 詳細層 ----
const details = html.match(/<details[^>]*>/gi) || [];
if (details.length === 0) errors.push('<details> がない（詳細層・事実台帳が無い）');
if (details.some((d) => /\sopen[\s>=]/i.test(d))) errors.push('<details> が既定で開いている');

// ---- 4. 事実台帳と引用 ----
const ledgerBlock = (html.match(/<details[^>]*class="[^"]*ledger[^"]*"[^>]*>[\s\S]*?<\/details>/i) || [])[0];
const ledgerIds = new Set();
if (!ledgerBlock) errors.push('事実台帳（<details class="ledger">）がない');
else {
  const rows = ledgerBlock.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  let quoted = 0;
  const missingQuotes = [];
  for (const row of rows) {
    const id = (row.match(/id="([^"]+)"/) || [])[1] || (stripTags((row.match(/<th[^>]*>([\s\S]*?)<\/th>/i) || [])[1] || '').trim());
    if (id) ledgerIds.add(id.trim());
    const q = (row.match(/<td[^>]*class="[^"]*\bq\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i) || [])[1];
    if (!q) continue;
    quoted++;
    const parts = stripTags(q).split(/…|\.\.\.|〜|」\s*「|」\s*、\s*「/).map(squash).filter((p) => p.length >= 4);
    const src = squash(source);
    if (parts.length && !parts.every((p) => src.includes(p))) missingQuotes.push(`${id}: ${stripTags(q).trim().slice(0, 50)}`);
  }
  info.ledgerRows = rows.length;
  info.ledgerQuoted = quoted;
  if (rows.length === 0) errors.push('事実台帳が空');
  if (quoted < rows.length) warnings.push(`引用欄（td.q）の無い台帳行: ${rows.length - quoted}`);
  for (const m of missingQuotes) errors.push(`台帳の引用が原文に無い（言い換え・創作の疑い）: ${m}`);
}

// ---- 5. 画面上の数値が原文にあるか ----
const body = html
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<span class="no">[\s\S]*?<\/span>/gi, ' ')
  .replace(/<text[^>]*class="tick"[^>]*>[\s\S]*?<\/text>/gi, ' ')
  .replace(/<details[^>]*class="[^"]*ledger[^"]*"[^>]*>[\s\S]*?<\/details>/i, ' ')
  .replace(/<svg[\s\S]*?<\/svg>/gi, (svg) => (svg.match(/<text[^>]*>[\s\S]*?<\/text>/gi) || []).join(' '));
const visible = zen(stripTags(body));
const norm = (n) => n.replace(/,/g, '');
const srcNums = new Set((zen(source).match(/\d[\d,]*(?:\.\d+)?/g) || []).map(norm));
const seen = new Map();
for (const m of visible.matchAll(/(?<![A-Za-z#])\d[\d,]*(?:\.\d+)?/g)) {
  const n = norm(m[0]);
  if (n === '0' || /^0\d$/.test(m[0]) || srcNums.has(n) || /^F\d+$/.test(visible.slice(Math.max(0, m.index - 1), m.index + m[0].length))) continue;
  // 原文の位置を指す番号（第4段落・3行目）は数値の主張ではない
  if (/^\s*(段落|行目|ページ|頁)/.test(visible.slice(m.index + m[0].length, m.index + m[0].length + 4))) continue;
  if (!seen.has(n)) seen.set(n, visible.slice(Math.max(0, m.index - 16), m.index + m[0].length + 16).trim());
}
for (const [n, ctx] of seen) errors.push(`原文に無い数値: ${n} … 「${ctx}」`);

// ---- 6. 年号 ----
if (!/(19|20)\d\d\s*年/.test(zen(source))) {
  const y = visible.match(/(19|20)\d\d\s*年/);
  if (y) errors.push(`原文に無い年号: ${y[0]}`);
}

// ---- 7. 評価語（原文に無いもの）----
for (const w of ['推奨', 'おすすめ', '最有力', '第一候補', '優先順位', '最安', '最も安', '失敗', '成功', '本質', '悪循環', '循環', 'トレードオフ']) {
  if (visible.includes(w) && !source.includes(w) && !/推奨・優先順位|推奨や優先順位|推奨は付け/.test(visible.slice(Math.max(0, visible.indexOf(w) - 6), visible.indexOf(w) + 12))) {
    const i = visible.indexOf(w);
    warnings.push(`原文に無い評価語: ${w} … 「${visible.slice(Math.max(0, i - 16), i + 20)}」`);
  }
}

// ---- 7b. 書き手の推測・計算した差（原文に無いもの）----
for (const w of ['倍増', '倍に', '半減', '急増', '急減', '激増', '激減']) {
  const i = visible.indexOf(w);
  if (i >= 0 && !source.includes(w)) errors.push(`計算した倍率の言い方（原文に無い）: 「${visible.slice(Math.max(0, i - 20), i + 10)}」`);
}
for (const w of ['考えられ', 'と思われ', 'だろう', '可能性があ', 'を招いて', 'に違いない', 'と推測']) {
  const i = visible.indexOf(w);
  if (i >= 0 && !source.includes(w)) errors.push(`地の文の推測（原文に無い）: 「${visible.slice(Math.max(0, i - 24), i + 12)}」`);
}
for (const m of visible.matchAll(/(約|およそ)?\s*\d+(?:\.\d+)?\s*(ポイント|倍|か月間|ヶ月間)/g)) {
  if (!zen(source).includes(m[0].replace(/\s/g, ''))) errors.push(`計算した差・倍率・期間の疑い（原文に無い表現）: 「${m[0].trim()}」`);
}

// ---- 8. 台帳番号の付与 ----
const refs = [...html.matchAll(/data-f="([^"]*)"/g)].flatMap((m) => m[1].split(/[\s,]+/).filter(Boolean));
info.dataFRefs = refs.length;
if (refs.length === 0) warnings.push('data-f（根拠の台帳番号）が1つも無い');
const dangling = [...new Set(refs.filter((r) => ledgerIds.size && !ledgerIds.has(r)))];
if (dangling.length) warnings.push(`台帳に無い番号を参照: ${dangling.slice(0, 8).join(' ')}`);
if (ledgerIds.size) {
  const used = new Set(refs);
  const unused = [...ledgerIds].filter((id) => !used.has(id));
  info.ledgerCoverage = `${ledgerIds.size - unused.length}/${ledgerIds.size}`;
  if (unused.length / ledgerIds.size > 0.1) errors.push(`画面に出ていない台帳の事実が1割を超える: ${unused.join(' ')}`);
}

// ---- 9. アニメーション ----
const css = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join('\n');
if (/\binfinite\b/.test(css)) errors.push('アニメーションが無限ループ（infinite）');
// @media ブロックを括弧の対応で取り除く（中に @keyframes が入れ子でもよい）
const stripAt = (text, head) => {
  let out = '', i = 0;
  while (i < text.length) {
    const m = head.exec(text.slice(i));
    if (!m) { out += text.slice(i); break; }
    const start = i + m.index;
    out += text.slice(i, start);
    let j = text.indexOf('{', start), depth = 0;
    for (; j < text.length; j++) { if (text[j] === '{') depth++; else if (text[j] === '}' && --depth === 0) break; }
    i = j + 1;
  }
  return out;
};
const outside = stripAt(stripAt(css, /@media\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)/), /@media\s*print\b/);
if (/(^|[;{\s])animation(-name)?\s*:/.test(outside)) {
  errors.push('アニメーションが prefers-reduced-motion: no-preference の外にある');
}

// ---- 10. 本文（記事として文章が残っているか）----
{
  const mainHtml = body.replace(/<details[\s\S]*?<\/details>/gi, ' ');
  const isProse = (tag) => !/class="[^"]*(note|fig-r|src|kicker|points)/.test(tag);
  const paras = [...mainHtml.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi)].filter((m) => isProse(m[0].slice(0, 80)));
  const proseChars = paras.map((m) => stripTags(m[2]).trim()).filter((t) => t.length >= 40).join('').length;
  const allChars = stripTags(mainHtml).replace(/\s/g, '').length || 1;
  info.proseShare = `${Math.round((proseChars / allChars) * 100)}%`;
  const sections = mainHtml.split(/<h2[\s>]/i).slice(1);
  const empty = sections.map((sec, i) => ({ i: i + 1, n: [...sec.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/gi)].filter((m) => isProse(m[0].slice(0, 80)) && stripTags(m[2]).trim().length >= 40).length }))
    .filter((x) => x.n === 0 && !/class="[^"]*\bopen\b/.test(sections[x.i - 1]));
  info.sections = sections.length;
  if (sections.length && empty.length) errors.push(`本文の段落が無い章（図表・箇条書きだけの章）: ${empty.map((x) => x.i).join(', ')}番目`);
  if ((html.match(/<main[\s>]/gi) || []).length > 1) warnings.push('<main> が複数ある。図は1つの main の中で section の外に置く');
  if (sections.length > 6) warnings.push(`章（h2）が${sections.length}本。4〜6本に収め、近い論点は1章にまとめる`);
  const conflicts = [...mainHtml.matchAll(/<div class="[^"]*\bconflict\b[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi)].map((m) => stripTags(m[0]));
  for (const c of conflicts) if (/訂正|言い直|正しくは/.test(c)) warnings.push(`対立ブロックに言い直し（訂正）が入っている疑い: 「${c.trim().slice(0, 40)}」`);
  if (proseChars / allChars < 0.3) warnings.push(`本文の割合が低い（${info.proseShare}）。ダッシュボード寄りになっていないか`);
}

// ---- 結果 ----
const result = { ok: errors.length === 0, errors, warnings, info };
if (flag === '--json') console.log(JSON.stringify(result, null, 2));
else {
  console.log(result.ok ? 'Cognitive View output check: PASS' : 'Cognitive View output check: FAIL');
  for (const e of errors) console.log(`  ERROR  ${e}`);
  for (const w of warnings) console.log(`  WARN   ${w}`);
  for (const [k, v] of Object.entries(info)) console.log(`  info   ${k}: ${v}`);
}
process.exit(errors.length ? 1 : 0);
