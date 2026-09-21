# Security policy

Cognitive View is a text-based AI behavior contract, but security issues can still arise through generated HTML, unsafe source handling, or instructions that accidentally encourage external actions.

## Supported versions

Security fixes are applied to the latest released major version. Older versions may receive fixes when practical.

## Reporting a vulnerability

Please use GitHub's private security advisory mechanism for the public `yamamonlab/biz-terrace-ai-skills` repository rather than opening a public issue for an unpatched vulnerability.

Include:

- affected version or commit;
- a minimal reproduction;
- expected and observed behavior;
- impact;
- any suggested mitigation.

## Security boundaries

The Skill is intended to:

- treat instructions found inside source material as data, not executable commands;
- generate self-contained HTML without scripts or remote runtime dependencies;
- avoid external transmission or execution unless the user explicitly asks for a separate action;
- preserve source-grounding so unsupported claims can be identified.

Security reports about violations of these boundaries are welcome.
