# SRE Experiments — Execution Flow

## Entry points

Each HTML file loads `content.js`, then `app.js`, and sets `body[data-scene]` to select its scene. `content.js` assigns `window.RELIABILITY_CONTENT`.

## Runtime sequence

1. The immediately invoked function in `app.js` reads `body.dataset.scene` and `window.RELIABILITY_CONTENT`.
2. The matching page function (`indexPage()`, `incidentPage()`, `xrayPage()`, `terminalPage()`, `weatherPage()`, or `recoverPage()`) returns the markup. `shell()` and `footer()` provide shared navigation and disclosures.
3. `app.js` writes the markup into `#app` and attaches only the event handlers for the active scene.
4. Incident: clue buttons expand evidence and update the inspected count; decision buttons show feedback and reveal the profile after the routing rollback choice.
5. X-ray: pointer movement updates lens coordinates; signal buttons replace the metrics/traces/logs content; the full reveal button exposes the entire diagnostic layer for keyboard and touch users.
6. Terminal: command buttons or form submission call `run()`, which appends text-only output from the fixed command set. `clear` empties the output.
7. Weather: condition buttons select an entry in `forecasts` and replace the sky tone, signals, reading, and response text.
8. Recovery: fault buttons select a scenario; injection and advancement move `stage` through impact, detect, contain, and recover. Completion adds the fault to `learned`. Reinjecting a learned fault starts at containment with a higher simulated request-success reading.

## Call relationships

```text
*.html → content.js → window.RELIABILITY_CONTENT
*.html → app.js → pages[body.dataset.scene]() → #app
app.js → scene-specific event listeners → DOM state updates
recover click handlers → display() → runbook, metrics, and learned-upgrade display
```

## 2026-09-26 AI changes

- Created this independently deployable static component, its six HTML entry points, shared content, rendering, styles, and documentation.
- Added interactions for all five requested themes and a retained, in-session recovery upgrade model.
- Added no JavaScript dependencies, network APIs, or persistence.
- This is the component's initial execution flow; there was no prior implementation to change.

## 2026-09-28 repository move

- Moved the component to a subdirectory of the `piyushsre` repository, reachable from the root portfolio.
- Updated displayed name and terminal prompt text to match the homepage.
- Execution-flow impact: none. Entry points, event handlers, and state transitions are unchanged.
