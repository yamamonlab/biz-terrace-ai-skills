import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const required = [
  'SKILL.md',
  'README.md',
  'LICENSE',
  'PROVENANCE.json',
  'THIRD_PARTY_NOTICES.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'RELEASING.md',
  'CHANGELOG.md',
  'references/capability-spec.md',
  'references/output-contract.md',
  'references/quality-rubric.md',
  'references/foundations.md',
  'references/genre-map.md',
  'references/decide-contract.md',
  'references/eval-protocol.md',
  'references/representation-budget.md',
  'references/diagram/grammar.md',
  'references/diagram/type-bar.md',
  'references/diagram/type-flowchart.md',
  'references/diagram/type-process.md',
  'references/diagram/type-quadrant.md',
  'references/diagram/type-state.md',
  'references/diagram/type-timeline.md',
  'references/diagram/type-tree.md',
];

const errors = [];

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    errors.push(`missing required file: ${rel}`);
    return '';
  }
  return fs.readFileSync(p, 'utf8');
}

for (const rel of required) read(rel);

const skill = read('SKILL.md');
const output = read('references/output-contract.md');
const grammar = read('references/diagram/grammar.md');
const rubric = read('references/quality-rubric.md');
const foundations = read('references/foundations.md');
const decide = read('references/decide-contract.md');
const budget = read('references/representation-budget.md');

const mustContain = [
  [skill, '原文に重要数値があれば2〜4枚、最大4枚', 'SKILL metric cards must remain conditional'],
  [skill, '1文ごとの「根拠」リンクは置かない', 'SKILL evidence links must remain section-level'],
  [skill, 'UNDERSTAND', 'SKILL must define UNDERSTAND mode'],
  [output, '数値がなければこの .cards ブロック自体を出さない', 'output skeleton must allow zero metric cards'],
  [output, 'role="img"', 'output skeleton SVG must carry an image role'],
  [output, '<title>{{ 図タイトル }}</title>', 'output skeleton SVG must include title'],
  [output, '<desc>{{ 一文説明 }}</desc>', 'output skeleton SVG must include description'],
  [grammar, 'var(--text-primary)', 'diagram grammar must use current HTML tokens'],
  [rubric, '情報保持率 95% 以上', 'rubric must retain information-preservation gate'],
  [output, '@media print', 'output contract must keep the print rule that reveals the detail layer'],
  [output, '::details-content', 'print rule must reveal collapsed detail content'],
  [output, 'data-label', 'comparison tables must carry column labels for the narrow-width fallback'],
  [output, '@media (max-width: 600px)', 'output contract must keep the narrow-width table fallback'],
  [foundations, 'intrinsic', 'foundations must keep the intrinsic/extraneous load distinction'],
  [foundations, 'Shneiderman1996eyes.pdf', 'foundations must cite the information-seeking mantra source'],
  [decide, '原文にないスコア・点数・重み付け', 'DECIDE contract must forbid invented scores'],
  [rubric, '視覚エンコーディング率', 'rubric must keep the visual-encoding primary metric'],
  [budget, '視覚エンコーディングではない', 'budget must state why lists are not visual encoding'],
  [budget, 'prose_sentences', 'budget must require the pre-registered prose for each diagram'],
  [skill, 'Representation Budget', 'SKILL must run the budget before writing HTML'],
  [output, '同じ記号を違う意味に使わない', 'output contract must fix the status-symbol vocabulary'],
];

for (const [text, needle, message] of mustContain) {
  if (!text.includes(needle)) errors.push(`${message}: missing "${needle}"`);
}

const mustNotContain = [
  [skill, 'promotion_status: lab-original', 'retired promotion status reintroduced'],
  [skill, '5秒層のカードは3枚まで', 'obsolete three-card limit reintroduced'],
  [skill, '各主張から原文の該当箇所へ辿れるようにする', 'per-claim evidence-link contract reintroduced'],
  [output, '当月目標達成ラインに到達見込み', 'ungrounded forecast example reintroduced'],
  [grammar, 'var(--ink)', 'obsolete diagram CSS token reintroduced'],
  [skill, '情報保持率 95% 以上 かつ 表現変換率 80% 以上', 'rubric pass conditions must not be duplicated in SKILL.md'],
];

for (const [text, needle, message] of mustNotContain) {
  if (text.includes(needle)) errors.push(`${message}: found "${needle}"`);
}

const localRefPattern = /`(references\/[A-Za-z0-9_./*-]+\.md)`/g;
for (const source of [skill, output, grammar, rubric, foundations, decide, budget, read('references/genre-map.md'), read('references/eval-protocol.md'), read('README.md')]) {
  for (const match of source.matchAll(localRefPattern)) {
    const rel = match[1];
    if (rel.includes('*')) continue;
    if (!fs.existsSync(path.join(root, rel))) {
      errors.push(`broken local reference: ${rel}`);
    }
  }
}

if (!read('THIRD_PARTY_NOTICES.md').includes('Copyright (c) 2025 Cathryn Lavery')) {
  errors.push('third-party MIT copyright notice is missing');
}

const provenance = read('PROVENANCE.json');
if (!provenance.includes('"canonical": true')) {
  errors.push('PROVENANCE.json must declare cognitive-view as public canonical');
}

if (errors.length) {
  console.error('Cognitive View validation FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Cognitive View validation PASS');
console.log(`Checked ${required.length} required files and core contract invariants.`);
