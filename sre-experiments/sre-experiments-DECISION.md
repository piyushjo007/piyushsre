# SRE Experiments — Technical Decisions

## 2026-09-26 — Five independent static experiences

### Decision

Implement the five requested themes as separate HTML entry points in `sre-experiments/`, with shared `content.js`, `app.js`, and `styles.css` plus an index page.

### Reason

The user wants to test each theme one by one and provide personal content later. Separate entry points make direct testing simple. Shared data and rendering logic keep career text consistent while each route has its own visual language and interaction.

### Alternatives considered

- A framework and build pipeline would add setup and hosting work for these self-contained experiences. Browser-native HTML, CSS, and JavaScript cover the requested behavior.
- A single route-driven page would make individual page testing less direct.
- Live telemetry would misrepresent the user's real systems and could expose operational information. All scenarios are visibly labeled fictional.

### Tradeoffs / implications

The shared `app.js` contains five small interaction controllers selected by `body[data-scene]`. This keeps hosting simple but means each page loads code for the other scenes. The X-ray has a pointer lens plus a keyboard-accessible full reveal button. The recovery page learns only within the open page session; it stores no data or identifiers. Optional Google Fonts have system fallbacks.

### Affected areas

- `index.html`, `incident.html`, `xray.html`, `terminal.html`, `weather.html`, `recover.html`
- `content.js`, `app.js`, `styles.css`, `README.md`

## 2026-09-28 — Repository move and displayed name

### Decision

Move this static component into the `piyushsre` repository without changing its routing or interaction model. Align displayed name and local terminal prompt with the spelling on the new repository homepage.

### Reason

The homepage links to this component and must be able to resolve it under the same GitHub Pages project path. Consistent name spelling avoids a visible contradiction across pages.

### Tradeoffs / implications

Only local files and visible copy changed. No new dependency, network call, or production data was introduced.

### Affected areas

- HTML entry points, `app.js` and `content.js` where they contained the old spelling
- `README.md`, `sre-experiments-DECISION.md`, `sre-experiments-FLOW.md`
