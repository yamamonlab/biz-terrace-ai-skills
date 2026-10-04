# Astra Animation Contract

## Scene-loop target

- cell: 192×208
- transparent
- first frame is useful by itself
- 4–12 authored frames for final animation
- 6–12fps-equivalent timing
- small, stepped pixel motion
- props may vary by scene

Stable IDs:
`01-basic`, `02-glasses`, `03-beret`, `04-work`, `05-idea`, `06-coffee`, `07-meeting`, `08-present`, `09-outing`, `10-sleep`.

A v0.1 implementation may use one static 5×2 atlas plus CSS motion profiles. When frame-authored animation is added, keep IDs and cell geometry stable.

## Presentation target

- export first frame
- transparent PNG
- 4× output: 768×832
- nearest-neighbor only

## Motion semantics

| Scene | Motion |
|---|---|
| basic | breath / blink / antenna sway |
| glasses | page/eye focus, tiny head movement |
| beret | greeting / conversational lean |
| work | forward lean / typing rhythm |
| idea | short jump / orb brightness |
| coffee | cup-to-mouth gesture / relaxed settle |
| meeting | alternating nod / conversational rhythm |
| present | pointer gesture / stance shift |
| outing | compact walk cycle / bag lag |
| sleep | slow breathing |

## Reduced motion

Website usage must provide a static first frame under `prefers-reduced-motion: reduce`.
