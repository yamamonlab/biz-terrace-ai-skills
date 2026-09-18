# Changelog

## 1.2
- Added root `DESIGN.md` as the canonical Design System.
- Reorganized the package into Thinking / Design / State / Knowledge / Tests layers.
- Added progressive design disclosure: Design System loads only after visual intent is fixed.
- Added DeckSpec `design` state and slide-level `render.design_contract`.
- Separated semantic design invariants from theme tokens and render implementation.
- Moved `theme_profile` canonical location from `brand` to `design` while retaining v1.1 compatibility.
- Added design QA for density, emphasis, geometry, semantic redundancy, and documented exceptions.
- Updated Visual Router, Render Rules, defaults, themes, samples, and validator for DeckSpec v1.2.

## 1.1
- Added `research_briefing` mode and source hierarchy.
- Added adaptive `executive_briefing_11` template.
- Added `forest_green_briefing` theme.
- Extended DeckSpec with research/template/theme/source metadata, estimate flags, callouts, forecast encoding, source notes, and data bindings.
- Added estimate disclaimer, external source note, forecast encoding, and bridge arithmetic checks to `validate_spec.py`.
- Clarified that cover/divider are analytical-head exceptions.
- Clarified that local chart judgment annotations are allowed, while standalone So What bands remain prohibited.

## 1.0
- Initial Evidence → Message → Storyline → Visual → Render → QA workflow.
- Added 48 visual patterns with progressive disclosure.