# SRE City — Technical Decisions

## 2026-09-26 — Standalone static portfolio

### Decision

Build the city as a self-contained static site in `sre-city/`, using HTML, CSS, inline SVG, and browser JavaScript. Keep portfolio text in `content.js`.

### Reason

The user wants to test every page and provide more content later. A static site opens locally, hosts easily, and makes personal copy easy to replace without introducing a framework or build pipeline. The existing `sre-universe/` is a separate unfinished concept, so this site has its own directory.

### Alternatives considered

- A React or WebGL application would increase setup and hosting complexity for this first version. Native SVG provides a responsive, accessible illustration with moving traffic.
- Live telemetry would imply access to production data and is unnecessary for an illustrative portfolio. Simulated conditions are explicitly labeled.

### Tradeoffs / implications

Hash routes make district pages directly testable on simple static hosting, though URLs use `#`. The SVG scene is illustrative rather than a real topology. Google Fonts are optional; CSS fallbacks render offline. Career copy is grounded in the supplied profile, while incident scenarios remain fictional.

### Affected areas

- `index.html`, `content.js`, `app.js`, `styles.css`, `favicon.svg`, `README.md`

## 2026-09-28 — Repository move and displayed name

### Decision

Move this static component into the `piyushsre` repository without changing its routing or interaction model. Align displayed name and local terminal prompt with the spelling on the new repository homepage.

### Reason

The homepage links to this component and must be able to resolve it under the same GitHub Pages project path. Consistent name spelling avoids a visible contradiction across pages.

### Tradeoffs / implications

Only local files and visible copy changed. No new dependency, network call, or production data was introduced.

### Affected areas

- HTML entry points, `app.js` and `content.js` where they contained the old spelling
- `README.md`, `sre-city-DECISION.md`, `sre-city-FLOW.md`
