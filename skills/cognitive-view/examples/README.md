# Examples

Fictional inputs for trying Cognitive View without exposing real business data.

| File | What it exercises |
|---|---|
| `sample-document.md` | A stalled evaluation: candidates compared, a disagreement, unverified assumptions, a trial, open homework. Few numbers |
| `sample-operations-report.md` | A monthly operations report: a six-month series, a per-site comparison with a missing value, a stated causal chain and two parallel causes, a disagreement, open items with and without an owner |

## By role (`by-role/`)

Longer, deliberately messy fictional documents (about 5,000–6,500 characters each), one per job type. Try the one closest to your own work: you can judge from experience whether the result reads correctly. All organisations, products and people are invented.

| File | Role | What it exercises |
|---|---|---|
| `by-role/01-se-incident.md` | Engineering | An incident write-up with pasted chat and alert fragments, out-of-order events, two retracted guesses, three countermeasures without an owner |
| `by-role/02-sales-handover.md` | Sales | A handover note from a departing rep: four customers, hearsay mixed with facts, amounts and dates that change midway, quoted e-mails |
| `by-role/03-planning-deep-research.md` | Planning | An AI-generated research report: long preambles, unsourced claims, the same conclusion restated, hedges mixed with guesses |
| `by-role/04-backoffice-policy.md` | Back office | A policy revision with a Q&A: old and new clauses quoted together, exceptions added later, an answer that is reversed, an FAQ that contradicts the text |
| `by-role/05-manager-monthly.md` | Management | A monthly report thread: figures that differ between body, postscript and replies, risks buried at the end, requests from several people |

These are longer than `sample-document.md`; a free-tier chat AI may hit its input limit.

Suggested request:

```text
この資料を、短時間で全体像を把握できる Cognitive View にしてください。HTMLで出力してください。
```

Examples are inputs, not rules. Nothing in `SKILL.md` or `references/` may use their wording, numbers or names.
