(() => {
  const content = window.CITY_CONTENT;
  const app = document.getElementById('app');
  const incidents = [
    { district: 'edge', title: 'Edge routing degraded', detail: 'Requests are queuing at the Edge Exchange. Follow the route and inspect the fallback.' },
    { district: 'platform', title: 'Compute node unavailable', detail: 'The Compute Quarter is redistributing workloads across healthy capacity.' },
    { district: 'data', title: 'Data service under pressure', detail: 'The Data Vault is showing saturation. Watch the queues and consider recovery paths.' },
    { district: 'operations', title: 'Alert storm in progress', detail: 'The Control Tower is separating user-impacting signals from noise.' }
  ];
  let activeIncident = -1;
  let traffic = 48;
  let clockTimer;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function building(x, y, w, h, d, tone, rows = 3) {
    const front = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: Math.max(2, Math.floor(w / 25)) }, (_, col) =>
        `<rect class="window" x="${x + 12 + col * 22}" y="${y - h + 21 + row * 22}" width="8" height="10" rx="1"/>`
      ).join('')
    ).join('');
    return `<g class="building ${tone}"><polygon class="building-side" points="${x + w},${y - h} ${x + w + d},${y - h - d * .45} ${x + w + d},${y - d * .45} ${x + w},${y}"/><rect class="building-front" x="${x}" y="${y - h}" width="${w}" height="${h}"/><polygon class="building-roof" points="${x},${y - h} ${x + d},${y - h - d * .45} ${x + w + d},${y - h - d * .45} ${x + w},${y - h}"/>${front}</g>`;
  }

  function cityArt() {
    const skyline = [
      building(92, 357, 82, 102, 20, 'teal', 3),
      building(190, 357, 84, 174, 22, 'teal', 6),
      building(294, 357, 72, 132, 20, 'teal', 4),
      building(385, 357, 47, 83, 16, 'teal', 2),
      building(498, 299, 69, 114, 18, 'amber', 4),
      building(581, 299, 88, 191, 24, 'amber', 7),
      building(687, 299, 50, 94, 17, 'amber', 3),
      building(821, 365, 84, 145, 22, 'blue', 5),
      building(922, 365, 92, 205, 25, 'blue', 8),
      building(1031, 365, 66, 113, 18, 'blue', 4),
      building(480, 541, 82, 104, 20, 'violet', 3),
      building(586, 541, 102, 160, 23, 'violet', 5),
      building(715, 541, 68, 93, 18, 'violet', 3)
    ].join('');
    return `<svg class="city-svg" viewBox="0 0 1200 620" role="img" aria-label="Illustrated night city with four infrastructure districts and moving traffic">
      <defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#0b1828"/><stop offset="1" stop-color="#111b29"/></linearGradient><radialGradient id="glow"><stop stop-color="#83eac5" stop-opacity=".13"/><stop offset="1" stop-color="#83eac5" stop-opacity="0"/></radialGradient></defs>
      <rect width="1200" height="620" fill="url(#sky)"/><circle cx="588" cy="325" r="420" fill="url(#glow)"/>
      <g class="stars" fill="#d6e8e8"><circle cx="78" cy="64" r="1"/><circle cx="236" cy="92" r="1.5"/><circle cx="399" cy="51" r="1"/><circle cx="793" cy="62" r="1.3"/><circle cx="1066" cy="93" r="1"/><circle cx="1137" cy="38" r="1.5"/><circle cx="94" cy="172" r="1"/><circle cx="762" cy="137" r="1"/></g>
      <circle class="moon" cx="1077" cy="92" r="27"/>
      <path class="horizon" d="M0 360h1200M0 440h1200M0 565h1200M74 350v270M454 350v270M796 350v270M1138 350v270"/>
      <g class="roads"><path d="M0 396H1200M0 581H1200M453 340V620M799 340V620"/><path class="road-dash" d="M0 396H1200M0 581H1200M453 340V620M799 340V620"/></g>
      <path class="rail" d="M41 445 C215 420 333 455 453 445 S690 417 799 445 S1020 464 1170 427"/>
      <g class="traffic-flow"><circle class="car c1" cx="100" cy="389" r="4"/><circle class="car c2" cx="400" cy="389" r="4"/><circle class="car c3" cx="820" cy="389" r="4"/><circle class="car c4" cx="1020" cy="573" r="4"/><circle class="car c5" cx="600" cy="573" r="4"/><circle class="car c6" cx="200" cy="573" r="4"/></g>
      <g class="city-blocks">${skyline}</g>
      <g class="ground-detail"><rect x="92" y="367" width="340" height="8" rx="4"/><rect x="498" y="309" width="239" height="8" rx="4"/><rect x="821" y="375" width="276" height="8" rx="4"/><rect x="480" y="551" width="303" height="8" rx="4"/></g>
      <g class="city-labels"><text x="97" y="230">01 / COMPUTE</text><text x="510" y="152">02 / EDGE</text><text x="838" y="215">03 / DATA</text><text x="491" y="428">04 / OPERATIONS</text></g>
    </svg>`;
  }

  function nav(current) {
    return `<header class="site-header"><a class="brand" href="#city" aria-label="Piyush Joshi, return to city"><span class="brand-mark">PJ<span class="brand-dot">.</span></span><span class="brand-copy">PIYUSH JOSHI<span>PLATFORM / RELIABILITY</span></span></a><nav class="nav" aria-label="Main navigation"><a href="#city" ${current === 'city' ? 'aria-current="page"' : ''}>The city</a><a href="#about" ${current === 'about' ? 'aria-current="page"' : ''}>About me</a><a href="#districts" ${current === 'districts' ? 'aria-current="page"' : ''}>Explore districts</a></nav><span class="header-status"><i></i> PORTFOLIO SIMULATION</span></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><span>© ${new Date().getFullYear()} ${escapeHTML(content.name)}</span><span>Designed as a fictional, interactive infrastructure city.</span><a href="#city">Return to city ↑</a></footer>`;
  }

  function districtLinks() {
    return content.districts.map(d => `<a class="district-card" href="#${d.id}"><span class="district-number">${d.number} / ${escapeHTML(d.eyebrow)}</span><span class="district-card-title">${escapeHTML(d.title)}</span><span class="district-card-desc">${escapeHTML(d.subtitle)}</span><span class="district-arrow" aria-hidden="true">↗</span></a>`).join('');
  }

  function cityPage() {
    const incident = incidents[activeIncident];
    return `${nav('city')}<main id="main">
      <section class="hero intro-wrap"><div class="eyebrow"><span class="pulse-dot"></span> AN INTERACTIVE SRE PORTFOLIO <span class="eyebrow-rule"></span> ${escapeHTML(content.years)} IN PRODUCTION</div><div class="hero-grid"><div><h1>The city that<br><em>never sleeps<span>.</span></em></h1><p class="hero-lead">${escapeHTML(content.intro)}</p></div><div class="hero-aside"><p>Explore a city built from the systems I work on. Traffic becomes requests. Buildings become platforms. Incidents become decisions.</p><a href="#districts" class="text-link">Explore the districts <span>↗</span></a></div></div></section>
      <section class="city-section" aria-label="Interactive infrastructure city"><div class="city-topline"><div class="city-top-left"><span class="live-pill"><span></span> LIVE MODEL</span><span>FIG. 01 — A CITY OF SYSTEMS</span></div><span id="sim-clock" class="sim-clock"></span></div><div class="city-stage ${incident ? 'has-incident incident-' + incident.district : ''}" style="--traffic-speed:${(9 - traffic * .065).toFixed(2)}s">${cityArt()}<div class="map-pins">${content.districts.map((d, i) => `<a class="map-pin pin-${d.id}" href="#${d.id}" aria-label="Explore ${escapeHTML(d.title)}"><span>${d.number}</span><b>${escapeHTML(d.short)}</b></a>`).join('')}</div><div class="stage-hint">CLICK A DISTRICT TO EXPLORE <span>↗</span></div></div>
      <div class="city-console"><div class="console-heading"><span class="console-kicker">CITY CONTROL / EXPERIMENT 01</span><h2>Change the conditions.</h2><p>Watch how pressure and failure change the city. This is illustrative sample data, not a live production feed.</p></div><div class="console-control"><label for="traffic">Traffic volume <strong id="traffic-value">${traffic}%</strong></label><input id="traffic" type="range" min="0" max="100" value="${traffic}"><div class="range-labels"><span>QUIET</span><span>RUSH HOUR</span></div></div><div class="console-metric"><span>EDGE QUEUE</span><div class="metric-track"><span id="queue-bar" style="width:${Math.max(8, traffic * .76)}%"></span></div><strong id="queue-value">${Math.round(traffic * .76)}%</strong></div><div class="console-actions"><button id="incident-button" type="button" class="button-danger">${incident ? 'NEXT INCIDENT ↗' : 'TRIGGER INCIDENT ↗'}</button><button id="reset-button" type="button" class="button-plain">Reset city</button></div></div>
      <div class="incident-readout" role="status" aria-live="polite"><span class="readout-icon ${incident ? 'active' : ''}">${incident ? '!' : '✓'}</span><div><strong>${incident ? escapeHTML(incident.title) : 'All districts operational'}</strong><p>${incident ? escapeHTML(incident.detail) : 'Try the traffic control or trigger a fictional incident to see the city respond.'}</p></div><span class="readout-state">${incident ? 'INVESTIGATING' : 'NORMAL'}</span></div></section>
      <section class="district-section section-wrap" id="districts"><div class="section-heading"><span class="section-index">02 / THE NEIGHBORHOODS</span><h2>Four districts.<br><em>One connected system.</em></h2><p>Each neighborhood holds a part of my engineering story. Start wherever your curiosity takes you.</p></div><div class="district-grid">${districtLinks()}</div></section>
      <section class="closing section-wrap"><div class="closing-mark">✳</div><div><span class="section-index">THE HUMAN BEHIND THE SYSTEMS</span><h2>Built by someone<br>who stays curious.</h2><p>From databases to edge traffic to Kubernetes, my work is about making complex systems more understandable and dependable.</p><a class="button-primary" href="#about">Meet the engineer <span>↗</span></a></div></section>
      <p class="simulation-note section-wrap">${escapeHTML(content.note)}</p></main>${footer()}`;
  }

  function detailPage(d) {
    return `${nav(d.id)}<main id="main" class="detail-main"><div class="detail-breadcrumb"><a href="#city">THE CITY</a><span>/</span><a href="#districts">DISTRICTS</a><span>/</span><span>${escapeHTML(d.short.toUpperCase())}</span></div><section class="detail-hero district-${d.id}"><div class="detail-hero-copy"><span class="detail-kicker">DISTRICT ${d.number} / ${escapeHTML(d.eyebrow)}</span><h1>${escapeHTML(d.title)}<span>.</span></h1><p>${escapeHTML(d.subtitle)}</p></div><div class="detail-symbol" aria-hidden="true">${{platform:'⌘',edge:'↗',data:'▤',operations:'◎'}[d.id]}</div><div class="detail-gridlines" aria-hidden="true"></div></section><div class="detail-layout"><section class="detail-story"><span class="section-index">THE ROLE OF THIS DISTRICT</span><h2>${escapeHTML(d.description)}</h2><p>${escapeHTML(d.story)}</p><blockquote>“${escapeHTML(d.principle)}”</blockquote></section><aside class="detail-aside"><span class="section-index">SIGNAL TO WATCH</span><strong>${escapeHTML(d.signal)}</strong><p>In this fictional city, the signal represents a real reliability question: can people keep using the service when conditions change?</p></aside></div><section class="detail-practices"><div class="section-heading"><span class="section-index">HOW IT WORKS</span><h2>Inside the district.</h2></div><div class="practice-grid">${d.details.map(([title, body], i) => `<article><span>0${i + 1}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></article>`).join('')}</div></section><section class="toolbelt"><span class="section-index">TOOLS & CONCEPTS</span><div>${d.capabilities.map(skill => `<span>${escapeHTML(skill)}</span>`).join('')}</div></section><nav class="detail-next" aria-label="District navigation"><a href="#city">← BACK TO CITY</a><a href="#${content.districts[(content.districts.findIndex(item => item.id === d.id) + 1) % content.districts.length].id}">NEXT DISTRICT ↗</a></nav></main>${footer()}`;
  }

  function aboutPage() {
    return `${nav('about')}<main id="main" class="about-main"><div class="detail-breadcrumb"><a href="#city">THE CITY</a><span>/</span><span>THE ENGINEER</span></div><section class="about-hero"><span class="section-index">THE PERSON KEEPING THE LIGHTS ON</span><h1>Hi, I'm <em>${escapeHTML(content.name)}.</em></h1><p>${escapeHTML(content.role)} working across cloud, edge, Kubernetes, databases, and production operations.</p><div class="about-stat"><strong>${escapeHTML(content.years)}</strong><span>BUILDING & OPERATING<br>PRODUCTION SYSTEMS</span></div></section><section class="about-body"><div><span class="section-index">MY APPROACH</span><h2>Reliability is a team sport.</h2></div><div><p>My work connects architecture to the reality of running it: sensible failure domains, measurable service objectives, useful alerts, tested recovery, and clear communication when things go wrong.</p><p>I enjoy turning recurring operational pain into automation and building platforms that engineers can understand and trust. I have worked with stakeholders and customers throughout my career to keep technical decisions connected to real needs.</p></div></section><section class="career-section"><div class="section-heading"><span class="section-index">WHERE I'VE WORKED</span><h2>Across the stack.<br><em>Across the years.</em></h2></div><div class="career-list">${content.career.map((job, i) => `<article><span>0${i + 1}</span><h3>${escapeHTML(job.company)}</h3><p>${escapeHTML(job.description)}</p><small>${escapeHTML(job.period)}</small></article>`).join('')}</div></section><section class="about-contact"><span class="section-index">LET'S CONNECT</span><h2>Want to talk systems?</h2><p>Contact links can be added when you're ready to publish them.</p><div class="contact-links">${content.email ? `<a href="mailto:${encodeURIComponent(content.email)}">Email ↗</a>` : ''}${content.linkedin ? `<a href="${escapeHTML(content.linkedin)}" rel="noopener noreferrer">LinkedIn ↗</a>` : ''}${content.github ? `<a href="${escapeHTML(content.github)}" rel="noopener noreferrer">GitHub ↗</a>` : ''}<a href="#city">Explore the city ↗</a></div></section><p class="simulation-note">${escapeHTML(content.note)}</p></main>${footer()}`;
  }

  function updateClock() {
    const clock = document.getElementById('sim-clock');
    if (clock) clock.textContent = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' LOCAL';
  }

  function bindCity() {
    const slider = document.getElementById('traffic');
    slider?.addEventListener('input', () => {
      traffic = Number(slider.value);
      document.getElementById('traffic-value').textContent = traffic + '%';
      document.getElementById('queue-value').textContent = Math.round(traffic * .76) + '%';
      document.getElementById('queue-bar').style.width = Math.max(8, traffic * .76) + '%';
      const stage = document.querySelector('.city-stage');
      stage.style.setProperty('--traffic-speed', (9 - traffic * .065).toFixed(2) + 's');
      stage.classList.toggle('rush-hour', traffic > 75);
    });
    document.getElementById('incident-button')?.addEventListener('click', () => {
      activeIncident = (activeIncident + 1) % incidents.length;
      render(false);
      document.getElementById('incident-button')?.focus();
    });
    document.getElementById('reset-button')?.addEventListener('click', () => {
      activeIncident = -1;
      traffic = 48;
      render(false);
      document.getElementById('reset-button')?.focus();
    });
    updateClock();
    clearInterval(clockTimer);
    clockTimer = setInterval(updateClock, 30000);
  }

  function render(scroll = true) {
    const route = decodeURIComponent(location.hash.slice(1)) || 'city';
    const district = content.districts.find(item => item.id === route);
    app.innerHTML = district ? detailPage(district) : route === 'about' ? aboutPage() : cityPage();
    if (!district && route !== 'about') bindCity();
    else clearInterval(clockTimer);
    if (scroll) {
      if (route === 'districts') document.getElementById('districts')?.scrollIntoView();
      else window.scrollTo(0, 0);
      document.getElementById('main')?.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', () => render());
  render(false);
})();
