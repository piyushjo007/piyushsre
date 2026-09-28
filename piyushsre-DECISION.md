# piyushsre technical decisions

## 2026-09-28 - Make the SRE portrait the repository entry point

### Decision

Use the former `sre-portrait/` application as root `index.html`, with its scripts, styles, images, and favicon beside it. Move the previous repository homepage into `dark-matter/` and embed it as a lazy, sandboxed iframe subsection with a full-page link. Keep `sre-experiments/` and `sre-city/` in this repository because the homepage links to them.

### Reason

The user requested one publishable repository containing the new homepage and related files, while retaining the old homepage underneath it. A nested document isolates the old site's global Tailwind and CDN scripts from the portrait's native CSS and JavaScript. Keeping all internal links inside the repository makes the project-site path work under GitHub Pages.

### Alternatives considered

- Inlining the old HTML into the new page would mix incompatible global CSS and scripts and duplicate document landmarks.
- Replacing the old page entirely would discard the user's prior design.
- Leaving experiment links pointed outside the repository would break them after deployment.

### Tradeoffs and implications

The archive loads remote assets when visited, while the current homepage remains dependency-free. The archive source had a missing `skills.js` and stopped mid-contact section; a local skills file and closing markup make the preserved page usable. The iframe is lazy and allows scripts but not same-origin access. This operation changes local files on a `codex/` branch only; it does not push or publish them.

### Affected areas

- `index.html`, `styles.css`, `app.js`, `hero-scene.js`, `favicon.svg`, `assets/`
- `dark-matter/index.html`, `dark-matter/skills.js`
- `sre-experiments/`, `sre-city/`
- `README.md`, `docs/`, `piyushsre-DECISION.md`, `piyushsre-FLOW.md`
