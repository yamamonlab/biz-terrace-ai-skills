# Astra QA Checklist

## Identity
- [ ] same Astra silhouette across frames
- [ ] tiny face preserved
- [ ] cheek placement stable
- [ ] antenna root stable
- [ ] knowledge orb reads clearly
- [ ] body remains warm ivory/greige
- [ ] no drift toward human/anime or sci-fi robot

## Pixel quality
- [ ] crisp pixel edges
- [ ] no accidental blur/resampling
- [ ] consistent outline weight
- [ ] no semi-transparent dark halo from background extraction
- [ ] props readable at target size

## Motion
- [ ] first frame works as a still
- [ ] motion communicates the state
- [ ] no size popping
- [ ] baseline stays stable unless jump/walk requires movement
- [ ] no unnecessary full-body wobble
- [ ] loop seam is acceptable
- [ ] reduced-motion fallback exists

## Geometry / files
- [ ] 192×208 cell for scene assets
- [ ] transparent background
- [ ] manifest IDs match filenames/atlas slots
- [ ] presentation PNG uses nearest-neighbor
- [ ] Codex label used only after strict 8×9 validation

## Brand fit
- [ ] business + casual balance
- [ ] not overly corporate
- [ ] not toy-like or infantile
- [ ] the scene relates to learning, trying, sharing, presenting, moving, resting, or work
