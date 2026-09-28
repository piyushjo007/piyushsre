# Piyush Joshi portfolio

A one-page personal site combining an animated infrastructure scene, an X-ray interaction, an interactive SRE reliability lab, a six-stage DevOps delivery protocol, an engineering stack, a working portfolio terminal, and dreamlike imagery. It is now the homepage of the `piyushsre` repository. The earlier homepage lives in `dark-matter/`, and the linked experiments live in `sre-experiments/` and `sre-city/`. Career text is based on the supplied professional summary. The imagery and lab scenarios are conceptual, and the terminal runs only local commands against fixed text.

## Preview

From the `piyushsre` repository, run:

```sh
python3 -m http.server 8767
```

Open `http://localhost:8767/`. The page also opens directly as a local file, though an HTTP server is preferred for the embedded earlier site.

## Test the experience

1. In the hero, watch the signal travel through the server. Switch between **Flow**, **X-Ray**, and **Failover**, and use **Pause** or **Play** to control the scene.
2. Switch between light and dark modes in the header.
3. In **Approach**, move the pointer over the X-ray image, use **Hold the X-ray open**, and choose Platform, Traffic, Data, or Recovery.
4. In the **Reliability Lab**, switch between Normal traffic, Edge surge, Node loss, and Replica lag. Watch the request path and response guidance change.
5. In **DevOps**, select the six delivery stages from Define through Recover. On narrow screens, swipe the stage selector horizontally.
6. Review the engineering stack and certifications below the delivery protocol.
7. In **Terminal**, try `help`, `whoami`, `career`, `platform`, `devops`, `edge`, `data`, `slo`, `incident`, `recovery`, `reliability`, and `certifications`.
8. Open the three existing experiments near the footer.
9. Explore the preserved Dark Matter Protocol in its embedded subsection or open `dark-matter/index.html` separately.

## Personalize before publishing

- Review the career copy in `index.html` and the terminal responses in `app.js`.
- Replace conceptual lab scenarios with your own public case studies when you can share them.
- Add public contact links when you provide them; no contact details were included in the supplied profile.
- Keep internal topology, operational metrics, and incident details out of the public site.
- The generated images are in `assets/`. The site requires no build step or JavaScript dependencies.

The site respects system light or dark preference until the visitor uses the theme switch. That preference is stored locally when browser storage is available.
The hero animation pauses when out of view or when the tab is hidden. Reduced-motion visitors see a still frame and can choose Play.
