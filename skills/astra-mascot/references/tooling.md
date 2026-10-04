# Optional pixel-art tooling

The Astra Skill is tool-agnostic. Do not make a specific editor a hard requirement.

## LibreSprite

LibreSprite is a free/open-source pixel-art and animation editor (GPL-2.0) and supports layers, frames, animation preview, sprite-sheet export, and batch-style export options. It is a good optional choice when a human wants to hand-author or polish Astra frames.

Use it for:
- onion-skin frame cleanup
- per-frame pixel edits
- tagged animation states
- sprite-sheet export

Do not vendor LibreSprite into this Skill.

## Aseprite

Aseprite's CLI can export sprite sheets and JSON metadata. It is useful in environments where it is already licensed/installed.

Use it as an optional production tool, not as an installation assumption.

## Pillow

Pillow is suitable for deterministic post-processing:
- nearest-neighbor scaling
- cell cropping
- atlas composition
- PNG/WebP conversion
- alpha/geometry validation

The canonical rule is: **visual generation/editing may be creative; geometry and packaging must be deterministic.**
