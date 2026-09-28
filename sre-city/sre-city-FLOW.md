# SRE City — Execution Flow

## Entry point

`index.html` loads `content.js` and then `app.js`. `content.js` sets `window.CITY_CONTENT`. The immediately invoked function in `app.js` reads that content and calls `render(false)`.

## Current runtime sequence

1. `app.js` reads `location.hash` in `render()`.
2. `render()` selects `cityPage()`, `detailPage(district)`, or `aboutPage()` and writes markup into `#app`.
3. `nav()` and `footer()` frame every route. The city route uses `cityArt()` and `building()` to create the SVG map; `districtLinks()` creates the district links.
4. On the city route, `bindCity()` attaches the range input and incident/reset buttons. The range input updates queue text, queue bar width, and animation speed. The incident button advances through fictional scenarios, then calls `render(false)` to display the affected district and incident message. Reset restores default traffic and operational state.
5. `updateClock()` displays the viewer's local time on the city route. The clock interval is cleared when leaving that route.
6. A `hashchange` listener calls `render()` for direct page navigation and scrolls to the top or district list.

## Call relationships

```text
index.html → content.js → window.CITY_CONTENT
index.html → app.js → render()
render() → cityPage() → cityArt() → building()
render() → detailPage(district) | aboutPage()
render() → bindCity() → input/click handlers → render(false)
hashchange → render()
```

## 2026-09-26 AI changes

- Added the complete `sre-city/` component and its static assets.
- Added four district routes, the About route, city controls, fictional incident scenarios, responsive styling, and accessibility labels.
- Added no runtime dependencies or external APIs. The optional font request is the only network asset.
- The new component has no pre-existing runtime flow; the sequence above is its initial implementation.

## 2026-09-28 repository move

- Moved the component to a subdirectory of the `piyushsre` repository, reachable from the root portfolio.
- Updated displayed name and terminal prompt text to match the homepage.
- Execution-flow impact: none. Entry points, event handlers, and state transitions are unchanged.
