# Codex-compatible target

This is an interoperability target for a separate Astra pet build. It is **not** the default Astra scene-loop format.

Based on the publicly documented OpenAI Hatch Pet contract:

- atlas: 1536×1872
- columns: 8
- rows: 9
- cell: 192×208
- background: transparent
- unused cells: fully transparent

Rows:
1. idle — 6 used frames
2. running-right — 8
3. running-left — 8
4. waving — 4
5. jumping — 5
6. failed — 8
7. waiting — 6
8. running — 6; means active work, not locomotion
9. review — 6

For exact durations and up-to-date rules, prefer the installed/current `hatch-pet` contract when available.

## Astra-specific rule

Unlike scene loops, the strict pet atlas should keep the canonical base outfit and props stable across rows unless the renderer contract explicitly permits changes. Do not turn each row into a different “scene costume”.

## Validation

Do not call the file Codex-compatible until:
- exact dimensions/cell count pass
- used/unused cells match the row contract
- unused cells are alpha=0
- contact-sheet review passes
- motion preview passes
- Astra identity remains stable
