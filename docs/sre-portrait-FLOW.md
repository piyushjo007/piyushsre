# SRE Portrait execution flow

## Entry point

`index.html` loads the page structure, local WebP assets, `styles.css`, and deferred `app.js` and `hero-scene.js`. No build step or remote API is required.

## Runtime sequence

1. Browser renders the hero and page sections from `index.html`. CSS variables in `styles.css` select dark or light tokens from system preference unless a manual theme exists.
2. `app.js` reads an optional `sre-portrait-theme` value from local storage. The theme button updates `document.documentElement.dataset.theme`, its accessible label, and the saved preference.
3. Pointer movement on `#xray-photo` updates CSS lens coordinates. Pointer enter and leave control the circular reveal. The `#lens-toggle` button exposes the whole image layer without pointer input.
4. Layer buttons read the fixed `layers` object in `app.js`, update the heading and description through `textContent`, and update `aria-pressed`.
5. Terminal command buttons and `#terminal-form` call `runCommand()`. The fixed `commands` object supplies responses, and `appendLine()` adds text-only output to the live region. `clear` empties the output.
6. `IntersectionObserver` adds `.is-visible` to sections as they enter view. Reduced-motion users and browsers without the observer receive visible content immediately.
7. Links in the experiment section navigate to existing sibling components `sre-experiments/` and `sre-city/`.
8. `hero-scene.js` sizes the transparent canvas to the hero, maps source-image coordinates through the current cover crop, and draws the selected Flow, X-Ray, or Failover scene. Its animation loop runs only when motion is enabled, the hero is visible, and the document is visible. Scene buttons update `aria-pressed` and the live status text; Pause and Play control the loop.
9. The Reliability Lab buttons select a fixed conceptual scenario in `app.js`. The handler updates `#lab-shell[data-fault]`, node status text, the fallback description, and an `aria-live` readout. A separate `IntersectionObserver` runs the CSS route pulse only while the lab is visible.
10. The delivery stage buttons read the fixed `deliveryStages` object in `app.js`. The handler updates `#delivery-kicker`, `#delivery-symbol`, `#delivery-stage-title`, `#delivery-stage-body`, and `#delivery-technology` through `textContent`, sets `data-stage` for the orbit accent, and updates `aria-pressed`.
11. The static engineering stack and certifications render directly from `index.html`. CSS animates orbit rings only after the existing reveal observer marks the delivery console visible, and the reduced-motion rule disables their motion.
12. The earlier interface subsection renders a lazy iframe pointed at `dark-matter/index.html`. Its sandbox allows scripts, while isolating its historical CSS and scripts from the portrait. A separate anchor opens the full archived page.

## Call relationships

```text
index.html -> styles.css + local WebP assets
index.html -> app.js -> theme button handler -> root data-theme
                   -> layer button handler -> layer content text
                   -> lens event handlers -> CSS lens variables
                   -> terminal form/buttons -> runCommand() -> appendLine()
                   -> IntersectionObserver -> .is-visible
                   -> lab scenario buttons -> lab state + readout + node statuses
                   -> delivery stage buttons -> deliveryStages -> stage text + data-stage + aria-pressed
index.html -> hero-scene.js -> ResizeObserver -> canvas size and image mapping
                            -> scene mode buttons -> state.mode -> canvas drawing + live status
                            -> pause, visibility, and reduced-motion checks -> animation loop
index.html -> dark-matter/index.html iframe -> dark-matter/skills.js -> historical skills grid
index.html -> sre-experiments/xray.html, sre-experiments/incident.html, sre-city/index.html
```

## 2026-09-26 AI changes

- Created the `sre-portrait/` component, three generated image compositions with four optimized WebP files, page markup, CSS, JavaScript, favicon, and project documentation.
- Added dark and light theme behavior, X-ray lens and layer controls, a functional terminal, and scroll reveal with reduced-motion support.
- Added no JavaScript packages, backend requests, or production telemetry.
- This is the component's initial runtime flow; there was no pre-existing flow to replace.

## 2026-09-26 animation update

- Added the aligned Canvas 2D signal simulation and scene mode controls to the hero.
- Added visibility and reduced-motion handling, plus responsive controls and atmospheric CSS motion.
- Kept the generated hero asset and static hosting model; no packages or live data sources were added.

## 2026-09-27 SRE expansion

- Added the four-stage request-path lab with three failure scenarios and a healthy baseline.
- Added a four-part operating playbook, a visual experiment gallery, and more specific career and terminal material from the supplied profile.
- Retained the same one-page routes, existing navigation anchors, and local-only runtime.

## 2026-09-27 DevOps reference integration

- Modified `index.html`, `styles.css`, and `app.js` with the six-stage delivery protocol, responsive mission-control visual, engineering stack, certifications, updated career and terminal copy, and corrected visible name.
- Updated `README.md` with the new test path. No dependency or backend changes were made.
- New runtime flow: delivery buttons map a stage key to `deliveryStages`, update the conceptual readout and `aria-pressed`, and CSS changes the core accent for release and recovery. Existing hero, lab, layer, and terminal flows remain active.

## 2026-09-28 repository move

- Moved the portrait entry point and its styles, scripts, assets, and documentation to the `piyushsre` repository.
- Added `dark-matter/index.html` and `dark-matter/skills.js` to preserve and complete the previous homepage.
- Moved the linked `sre-experiments/` and `sre-city/` sites into the repository and rewrote portrait links to their new sibling paths.
- Runtime flow adds a lazy archived-site iframe and updates experiment navigation destinations. The portrait's interactive state logic remains unchanged.
