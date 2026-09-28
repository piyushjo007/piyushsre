# piyushsre execution flow

## Entry point

The GitHub Pages project site's root `index.html` loads local `styles.css`, `app.js`, `hero-scene.js`, `favicon.svg`, and `assets/*.webp`. It also links to local `sre-experiments/` and `sre-city/` routes and embeds `dark-matter/index.html` near the footer.

## Execution order

1. The browser renders `index.html` and local assets. `styles.css` applies theme tokens, responsive layout, and reduced-motion rules.
2. `app.js` restores an optional theme preference and binds X-ray, layer, reliability-lab, delivery-stage, terminal, and reveal interactions. The widgets use fixed local data and update DOM text and pressed states.
3. `hero-scene.js` aligns a Canvas 2D overlay with the hero image and runs Flow, X-Ray, or Failover motion while visible and allowed by motion settings.
4. The experiment links navigate to `sre-experiments/xray.html`, `sre-experiments/incident.html`, and `sre-city/index.html`. Those documents load their own local CSS and JavaScript.
5. Near the footer, a lazy, sandboxed iframe loads `dark-matter/index.html`; that archived document loads its historical CDN assets and local `dark-matter/skills.js` to render its equipment grid. Its return link points to `../index.html`.

## Call relationships

```text
index.html -> styles.css + assets/*.webp
index.html -> app.js -> local widget event handlers -> fixed content -> DOM text/state
index.html -> hero-scene.js -> canvas drawing and visibility/motion controls
index.html -> dark-matter/index.html -> dark-matter/skills.js -> skills grid
index.html -> sre-experiments/*.html -> sre-experiments/content.js + app.js
index.html -> sre-city/index.html -> sre-city/content.js + app.js
```

## 2026-09-28 AI changes

- Moved the portrait's files from the personal-project workspace into the repository root, retaining implementation notes under `docs/`.
- Moved the old repository homepage into `dark-matter/`, added the missing skills data, and completed its truncated contact section.
- Moved the two linked experiment applications into repository subdirectories and updated navigation paths.
- Added the archive subsection and its iframe to the new homepage. The portrait's existing widget flow is otherwise unchanged.
- No new package, build process, backend, or production telemetry was added.
