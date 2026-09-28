# SRE Portrait technical decisions

## 2026-09-26 - A flagship portfolio built around real career facts

### Decision

Create a new standalone static site in `sre-portrait/` instead of modifying `sre-city/` or `sre-experiments/`. Use semantic HTML, native CSS, and small browser JavaScript interactions.

### Reason

The user requested a site that defines them while combining X-ray, terminal, and dream themes. A new flagship page lets the earlier experiences remain available for separate testing. This brief is a personal portfolio rather than an enterprise product surface, so no official product design system is applicable. The selected design language is cinematic editorial with one mineral-green accent and a consistent sharp-corner shape system.

### Design settings

- `DESIGN_VARIANCE: 8`: asymmetric media and text compositions make the portfolio memorable.
- `MOTION_INTENSITY: 6`: entry, reveal, and lens motion support the narrative and state changes. Reduced-motion users receive a static layout.
- `VISUAL_DENSITY: 4`: career details remain easy for recruiters and technical peers to scan.

### Alternatives considered

- React, Tailwind, and a build pipeline were not selected because the component is a small static portfolio with local interactions and must be simple to preview and host. The workspace has no existing frontend package to reuse.
- Live telemetry and inferred achievements were not selected because the supplied profile does not provide public operational metrics or production data.
- A portrait photograph was not fabricated. Three conceptual infrastructure images were generated to support the visual brief without implying they depict the user's employer or systems.

### Tradeoffs and implications

The terminal is a real interactive widget with a fixed command set, not a system shell. Theme preference is local to the browser. Links to earlier experiments expect all project directories to be hosted together. The generated images were converted to small WebP assets, including a responsive X-ray variant. Optional contact details remain absent until supplied.

### Affected files

- `index.html`, `styles.css`, `app.js`, `favicon.svg`
- `assets/hero.webp`, `assets/xray.webp`, `assets/xray-small.webp`, `assets/dream.webp`
- `README.md`, `sre-portrait-DECISION.md`, `sre-portrait-FLOW.md`

## 2026-09-26 - Turn the hero image into an interactive scene

### Decision

Keep the original conceptual server image and add an aligned, transparent Canvas 2D layer. The scene draws signal pulses, rack lights, a scan beam, and a rerouted path. Visitors can choose Flow, X-Ray, or Failover and pause or play motion.

### Reason

The original hero was visually strong but static. Native canvas can make the depicted system feel alive while preserving the chosen art direction and static hosting. The overlay uses the image's source coordinates and follows its cover crop at each viewport size.

### Tradeoffs and implications

The paths are a conceptual simulation, not live production telemetry. Animation runs only while the hero is in view and the tab is visible, with a 30 fps target and a 2x pixel ratio cap. Reduced-motion preference starts the scene paused; Play remains available by choice. The source image remains visible when Canvas 2D is unavailable.

### Affected files

- `index.html`, `styles.css`, `hero-scene.js`, `README.md`
- `sre-portrait-DECISION.md`, `sre-portrait-FLOW.md`

## 2026-09-27 - Expand the portfolio into an SRE story

### Decision

Keep the existing site, hero image, X-ray lens, and terminal. Add a hands-on request-path lab and an editorial operating playbook. Turn the experiment links into a visual project gallery. Strengthen career and terminal copy with details from the supplied professional profile. Keep the one-page route and primary navigation intact.

### Reference reading

- [GMX Digital](https://gmxdigital.com/en/) influenced cinematic scale and scene-based progression.
- [AI Garage](https://bryangarage.dev/) influenced the idea of a compact, usable interactive engineering tool inside a personal portfolio.
- [Sibal Design's project presentation](https://www.sibaldesign.com/projects/webdesign) influenced case-like specificity and direct description of tools and work.
- The supplied `gravity-design.de` URL could not be loaded, so no unverified detail from that site is claimed or copied.

### Reason

The prior page had strong atmosphere but left too much of the engineer's actual SRE work implicit. The lab makes traffic, platform, and data dependencies visible through an accessible, conceptual simulation. The playbook exposes the operational practice behind the visuals: user-focused signals, fault isolation, proven recovery, and learning from incidents.

### Tradeoffs and implications

The scenarios model concepts, not real infrastructure state or performance metrics. They intentionally avoid invented incident results, percentages, and confidential production topology. Each mode updates plain text as well as visual state so the interaction works for keyboard and assistive-technology users. The site stays dependency-free and static-hostable.

### Affected files

- `index.html`, `styles.css`, `app.js`, `README.md`
- `sre-portrait-DECISION.md`, `sre-portrait-FLOW.md`

## 2026-09-27 - Mix the existing portfolio with the DevOps reference

### Decision

Add a six-stage interactive delivery protocol and a readable engineering stack to the existing portrait. Use a restrained cyan and violet mission-control treatment for the new protocol while retaining the site's cinematic mineral palette. Expand career and terminal copy from the supplied profile, add the two listed certifications, and use the name spelling in the user's reference site.

### Reason

The user's other local page centers on cyber visuals, a tools grid, certifications, and a terminal. The portrait already has a stronger image-led X-ray and terminal experience, but its DevOps delivery process was underspecified. The added stage model shows how Terraform, GitOps, progressive delivery, observability, and recovery connect rather than presenting disconnected tool names.

### Alternatives considered

- Copying the older page's Tailwind, Three.js, FontAwesome, starfield, and percentage meters was rejected to preserve static hosting, performance, and consistent visual language. The reference HTML also ends mid-section, so it is not a safe implementation source.
- Live deployment or telemetry data was rejected because no public endpoint or permission was supplied. The interaction uses fixed, clearly labeled conceptual content.

### Tradeoffs and implications

The delivery stage buttons are local state only and update accessible text. The orbit is a CSS illustration and stops with reduced-motion preference. No packages, remote requests, invented operational results, or production topology were introduced. The certifications and technical details come from the supplied professional profile. The user's name was aligned with the spelling in their existing portfolio.

### Affected files

- `index.html`, `styles.css`, `app.js`, `README.md`
- `sre-portrait-DECISION.md`, `sre-portrait-FLOW.md`

## 2026-09-28 - Make the portrait the repository homepage

### Decision

Move the portrait files into the `piyushsre` repository root. Preserve the former homepage under `dark-matter/` and present it in an iframe subsection plus a full-page link. Move the linked SRE city and experiments into repository subdirectories so their routes still resolve when hosted as one GitHub Pages project.

### Reason

The repository root is the publishable entry point. A nested archive keeps the old design available without mixing its global Tailwind styles and scripts into the portrait's own document. Root-relative sibling paths are rewritten to match the new layout.

### Tradeoffs and implications

The archive loads its historical CDN dependencies when viewed and is sandboxed inside the portrait iframe. The original archive was truncated and referenced a missing `skills.js`, so a local skills list and closing markup are added to make it browseable. The new homepage remains dependency-free; the iframe uses lazy loading. No GitHub push or deployment is part of the local move.

### Affected areas

- `index.html`, `styles.css`, `dark-matter/index.html`, `dark-matter/skills.js`
- `sre-experiments/`, `sre-city/`, `README.md`
