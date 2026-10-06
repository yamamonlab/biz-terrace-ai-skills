# biz-terrace-ai-skills — Repository Agent Contract

Public distribution repository for standalone Biz-Terrace.ai AI Skills. This contract is self-contained; never depend on private yamamon-lab instructions or paths.

- A distributed Skill directory is a complete package. Preserve its `SKILL.md`, required references/resources, provenance, license, and public-safe examples; do not publish only a root file when its workflow needs bundled references.
- Keep Skill descriptions short and action-specific. Put workflow detail in the Skill body and load references progressively at the step that needs them.
- Do not embed API keys, private prompts, private source material, internal absolute paths, author-only runtime state, or assumptions that a particular model/tool is installed.
- Internal/private capabilities must be removed or generalized before distribution; `PROVENANCE.json` and `MAINTAINING.md` define distribution/maintenance evidence where applicable.
- When changing a Skill, verify referenced files resolve and test the relevant positive/near-miss behavior available in this public repo. Do not claim image/PPTX/web research execution if the consumer runtime was not actually available.
- Respect third-party trademarks/assets and the repository license boundaries. Publication to external catalogs/services is a separate operation.
