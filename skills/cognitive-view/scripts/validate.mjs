// Cognitive View の Skill ファイル自体を検査する。外部依存なし。
// 文字列の有無だけでなく、振る舞い（題材の混入・照合スクリプトの効き目）を確かめる。
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rel = (p) => path.join(root, p);
const errors = [];
const read = (p) => {
  if (!fs.existsSync(rel(p))) { errors.push(`missing required file: ${p}`); return ''; }
  return fs.readFileSync(rel(p), 'utf8');
};

const required = [
  'SKILL.md', 'README.md', 'LICENSE', 'PROVENANCE.json', 'THIRD_PARTY_NOTICES.md', 'CONTRIBUTING.md',
  'SECURITY.md', 'RELEASING.md', 'CHANGELOG.md',
  'references/components.md',
  'scripts/check-output.mjs', 'scripts/fixtures/source.md', 'scripts/fixtures/good.html', 'scripts/fixtures/bad.html',
  'examples/sample-document.md', 'examples/sample-operations-report.md',
  'docs/design.md', 'docs/eval-protocol.md',
];
for (const p of required) read(p);

const skill = read('SKILL.md');
const comp = read('references/components.md');

// 1. 実行時に読むファイルの重さ（チャットAIに渡す2本）
const kb = (s) => Buffer.byteLength(s) / 1024;
if (kb(skill) > 16) errors.push(`SKILL.md is ${kb(skill).toFixed(1)}KB (budget 16KB)`);
if (kb(comp) > 24) errors.push(`components.md is ${kb(comp).toFixed(1)}KB (budget 24KB)`);

// 2. 忠実さの規則が核にある
for (const must of ['原文にないものを足さない', '計算しない', '単位を変えない', '担当・期限・日付・年号', '因果・循環・順序', '推奨・優先順位・評価語', '発言者を消さない', '事実台帳', 'data-f']) {
  if (!skill.includes(must)) errors.push(`SKILL.md lost a fidelity rule marker: ${must}`);
}

// 3. 部品がそろい、アニメーションの決まりが守られている
for (const id of ['PAGE', 'POINTS', 'QUOTE', 'NOTE', 'FIG', 'CARD', 'TABLE', 'SPARK', 'BAR', 'LINE', 'TIMELINE', 'FLOW', 'CONFLICT', 'OPEN', 'LEDGER', 'ANIMATION']) {
  if (!new RegExp(`^## ${id}\\b`, 'm').test(comp)) errors.push(`components.md is missing component ${id}`);
  if (!skill.includes(id) && !['PAGE', 'CARD'].includes(id)) errors.push(`SKILL.md never routes to component ${id}`);
}
if (/\binfinite\b/.test(comp.replace(/`infinite`/g, ''))) errors.push('components.md contains an infinite animation');
if (!/@media \(prefers-reduced-motion:no-preference\)/.test(comp)) errors.push('components.md animations are not gated by prefers-reduced-motion');
if (!/details::details-content\{content-visibility:visible\}/.test(comp)) errors.push('components.md lost the print rule that opens <details>');
if (!/content:attr\(data-label\)/.test(comp)) errors.push('components.md lost the narrow-width table fallback');
if (/<script/i.test(comp.replace(/`[^`\n]*`/g, ""))) errors.push('components.md contains <script>');

// 4. 題材の混入: 例の固有名・数値が、実行時ファイルに入っていない（モデルが写すため）
const examples = ['examples/sample-document.md', 'examples/sample-operations-report.md'].map(read).join('\n');
const runtime = { 'SKILL.md': skill, 'references/components.md': comp };
const properNouns = new Set([
  ...(examples.match(/[ァ-ヶー]{2,}社/g) || []),
  ...(examples.match(/[東西南北][ァ-ヶー一-龥]{0,3}センター/g) || []),
  ...(examples.match(/[一-龥]{2,}部(?=[はがのと、。「])/g) || []).filter((w) => !['全部', '一部', '内部', '外部', '本部', '細部'].includes(w)),
]);
const exampleNums = new Set((examples.match(/\d{1,3}(?:,\d{3})+|\d+\.\d+|\d{3,}/g) || []));
for (const [name, text] of Object.entries(runtime)) {
  for (const w of properNouns) if (text.includes(w)) errors.push(`${name} contains example content (${w}); models copy it`);
  const nums = new Set(text.replace(/<style[\s\S]*?<\/style>/g, '').match(/\d{1,3}(?:,\d{3})+|\d+\.\d+|\d{3,}/g) || []);
  for (const n of exampleNums) if (nums.has(n) && !/^\d{3}$/.test(n)) errors.push(`${name} contains a number from the examples (${n}); models copy it`);
}

// 5. 参照先が実在し、削除したファイルを指していない
const docs = ['SKILL.md', 'README.md', 'CONTRIBUTING.md', 'references/components.md', 'examples/README.md', 'docs/design.md', 'docs/eval-protocol.md', 'scripts/fixtures/README.md'];
const removed = /references\/(output-contract|quality-rubric|capability-spec|genre-map|decide-contract|representation-budget|foundations|eval-protocol|chart\/|diagram\/)/;
for (const d of docs) {
  const t = read(d);
  for (const m of t.matchAll(/`((?:references|scripts|docs|examples)\/[^`\s]+)`/g)) {
    const target = m[1].replace(/[*]$/, '');
    if (!/[*{]/.test(target) && !fs.existsSync(rel(target))) errors.push(`${d} references missing path ${target}`);
  }
  if (removed.test(t)) errors.push(`${d} still points at a removed v1 file: ${t.match(removed)[0]}`);
}

// 6. 照合スクリプトの効き目: 正しい見本は通り、捏造の見本は落ちる
const run = (html) => spawnSync(process.execPath, [rel('scripts/check-output.mjs'), rel(html), rel('scripts/fixtures/source.md'), '--json'], { encoding: 'utf8' });
const good = run('scripts/fixtures/good.html');
if (good.status !== 0) errors.push(`check-output rejects the good fixture: ${good.stdout}`);
const bad = run('scripts/fixtures/bad.html');
if (bad.status !== 1) errors.push('check-output accepts the bad fixture');
else {
  const found = JSON.parse(bad.stdout).errors.join('\n');
  for (const expect of ['原文に無い数値: 5', '原文に無い年号', '台帳の引用が原文に無い', 'infinite', 'prefers-reduced-motion']) {
    if (!found.includes(expect)) errors.push(`check-output no longer detects: ${expect}`);
  }
}

if (errors.length) {
  console.error('Cognitive View validation FAIL');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Cognitive View validation PASS (${required.length} files; runtime ${kb(skill).toFixed(1)}KB + ${kb(comp).toFixed(1)}KB)`);
