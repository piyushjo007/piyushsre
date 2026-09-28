# The City That Never Sleeps

An interactive, static portfolio for Piyush Joshi. The illustrated city turns infrastructure concepts into four explorable districts. Its traffic and incident controls use fictional sample conditions; no production data is connected.

## Preview

From the project root:

```sh
python3 -m http.server 8765 --directory sre-city
```

Open `http://localhost:8765/` in a browser. Test each view with the navigation or these routes:

1. `/#city` — animated city, traffic slider, incident control
2. `/#platform` — Compute Quarter
3. `/#edge` — Edge Exchange
4. `/#data` — Data Vault
5. `/#operations` — Control Tower
6. `/#about` — profile and career

## Personalize later

Edit `content.js` to revise career text, district descriptions, tools, and contact links. Empty contact links remain hidden. The app has no build step or required JavaScript dependencies. Fonts are requested from Google Fonts; local fallbacks keep the site usable offline.

## Privacy and accuracy

The city, metrics, queues, and incidents are illustrative. Review all employer and career language before publishing, especially details related to current work. Do not add internal topology, sensitive incident facts, or private metrics to a public portfolio.
