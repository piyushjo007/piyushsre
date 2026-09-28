# Reliability After Dark

Five standalone interactive portfolio pages for Piyush Joshi, plus an index to explore them. Every incident, service, metric, log, weather condition, and recovery sequence is fictional. Career wording is based on the profile supplied for this project.

## Test one page at a time

Open `index.html` directly in a browser, or start a local server from the project root:

```sh
/opt/homebrew/bin/python3 -m http.server 8766 --directory sre-experiments
```

Then visit `http://localhost:8766/` and open each page from the index:

1. `incident.html` — open evidence cards and select a mitigation.
2. `xray.html` — move the lens, switch among metrics/traces/logs, and use the full reveal button.
3. `terminal.html` — try `help`, `whoami`, `ls`, `career`, `skills`, and `cat /platform` (or `/edge`, `/data`, `/operations`).
4. `weather.html` — switch between clear skies, latency fog, traffic heatwave, and error storm.
5. `recover.html` — inject a fault, advance the runbook to recovery, and inject the same fault again to see the retained guardrail.

Each page is a separate HTML file and can be opened directly. `content.js` holds the career copy and index labels for later editing. The site has no build step or required JavaScript packages. Google Fonts are optional; local font fallbacks remain usable offline.

Before publishing, review all career wording and add only information you are comfortable making public. The pages contain no production telemetry or internal topology.
