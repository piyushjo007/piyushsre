# Piyush Joshi | Platform, SRE and DevOps

The repository homepage is a static portfolio covering Kubernetes, GitOps, edge traffic, observability, incident response, and recovery. It needs no build step.

## Local preview

From this repository directory:

```sh
python3 -m http.server 8767
```

Open `http://localhost:8767/`.

## Site map

- `/` — current portrait portfolio, animated scene, X-ray, reliability lab, DevOps delivery protocol, engineering stack, and terminal.
- `/dark-matter/` — preserved earlier homepage, also embedded near the bottom of `/`.
- `/sre-experiments/` — interactive reliability experiments.
- `/sre-city/` — infrastructure city experience.
- `/docs/` — portrait implementation notes and prior component documentation.

The old homepage used external Tailwind, Three.js, FontAwesome, Devicon, and Google Fonts assets. The current homepage and the linked experiments use local assets and scripts. The site's scenarios are conceptual; no production data is loaded.

Publishing requires deploying this repository's root as a GitHub Pages project site. The local file move does not publish or push the changes.
