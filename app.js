(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const layers = {
    platform: {
      kicker: 'PLATFORM RELIABILITY',
      title: 'Know where workloads can fail.',
      body: 'I work across managed and on-prem Kubernetes, bare metal, KubeVirt, and GitOps. Placement, policy, and delivery decisions shape how a platform behaves under pressure.',
      tech: 'Kubernetes / KubeVirt / FluxCD'
    },
    traffic: {
      kicker: 'EDGE AND TRAFFIC',
      title: 'Trace the path users actually take.',
      body: 'From DNS steering to ingress and security controls, I focus on getting requests to healthy capacity with predictable fallbacks and low latency.',
      tech: 'DNS / Traefik / Calico / WAF'
    },
    data: {
      kicker: 'DATA RELIABILITY',
      title: 'Treat recovery as part of performance.',
      body: 'PostgreSQL and Oracle work taught me to watch baselines, tune bottlenecks, and prove backup and restore assumptions before an incident tests them.',
      tech: 'PostgreSQL / Oracle / Replication / RTO-RPO'
    },
    recovery: {
      kicker: 'OPERATIONAL PRACTICE',
      title: 'Make the next incident easier.',
      body: 'I use SLIs, SLOs, focused alerts, incident response, postmortems, and automation to turn recurring operational pain into systemic improvement.',
      tech: 'SLOs / Incident response / Observability / Terraform'
    }
  };

  try {
    const saved = localStorage.getItem('sre-portrait-theme');
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  } catch { /* Storage may be unavailable on local file previews. */ }

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function updateThemeButton() {
    const next = currentTheme() === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
    themeButton.textContent = next;
    themeButton.setAttribute('aria-label', `Switch to ${next.toLowerCase()}`);
  }
  themeButton.addEventListener('click', () => {
    root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('sre-portrait-theme', root.dataset.theme); } catch { /* Optional preference only. */ }
    updateThemeButton();
  });
  if (matchMedia('(prefers-color-scheme: light)').addEventListener) {
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', updateThemeButton);
  }
  updateThemeButton();

  const image = document.getElementById('xray-photo');
  image.addEventListener('pointermove', event => {
    const bounds = image.getBoundingClientRect();
    image.style.setProperty('--lens-x', `${event.clientX - bounds.left}px`);
    image.style.setProperty('--lens-y', `${event.clientY - bounds.top}px`);
  });
  image.addEventListener('pointerenter', () => image.classList.add('lens-active'));
  image.addEventListener('pointerleave', () => image.classList.remove('lens-active'));
  document.querySelectorAll('[data-layer]').forEach(button => {
    button.addEventListener('click', () => {
      const layer = layers[button.dataset.layer];
      document.querySelectorAll('[data-layer]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('layer-kicker').textContent = layer.kicker;
      document.getElementById('layer-title').textContent = layer.title;
      document.getElementById('layer-body').textContent = layer.body;
      document.getElementById('layer-tech').textContent = layer.tech;
    });
  });
  const lensToggle = document.getElementById('lens-toggle');
  lensToggle.addEventListener('click', () => {
    const open = image.classList.toggle('lens-open');
    lensToggle.setAttribute('aria-pressed', String(open));
    lensToggle.textContent = open ? 'Release the X-ray' : 'Hold the X-ray open';
  });

  const lab = document.getElementById('lab-shell');
  const scenarios = {
    healthy: {
      state: 'ALL PATHS NOMINAL', kicker: 'BASELINE / HEALTHY',
      title: 'The path is only as strong as its next dependency.',
      body: 'I map the user journey, select useful SLIs, and make each handoff observable before an incident starts.',
      action: 'Define signals at every boundary', fallback: 'Standby capacity ready',
      nodes: ['ROUTING', 'PASSING', 'SERVING', 'CURRENT']
    },
    edge: {
      state: 'EDGE PRESSURE / CONTAINED', kicker: 'SCENARIO / EDGE SURGE',
      title: 'Absorb the surge before it reaches the cluster.',
      body: 'Traffic steering, rate limits, WAF controls, and ingress signals help protect healthy capacity while preserving the user path.',
      action: 'Shape traffic, then check user-facing latency', fallback: 'Traffic steered to healthy capacity',
      nodes: ['STEERING', 'LIMITING', 'PROTECTED', 'CURRENT']
    },
    cluster: {
      state: 'NODE LOSS / WORKLOADS MOVING', kicker: 'SCENARIO / NODE LOSS',
      title: 'A node can disappear without taking the service with it.',
      body: 'Topology spread, anti-affinity, disruption budgets, and capacity headroom make rescheduling a planned behavior.',
      action: 'Check placement, readiness, and remaining headroom', fallback: 'Workloads reschedule across fault domains',
      nodes: ['ROUTING', 'PASSING', 'RESCHEDULING', 'CURRENT']
    },
    data: {
      state: 'REPLICA LAG / RECOVERY CHECK', kicker: 'SCENARIO / REPLICA LAG',
      title: 'A green database is not proof that data is safe.',
      body: 'Replication lag, query behavior, backup integrity, and tested restore paths tell a more useful story than availability alone.',
      action: 'Verify lag, recovery point, and restore path', fallback: 'Known recovery objectives guide the response',
      nodes: ['ROUTING', 'PASSING', 'SERVING', 'LAGGING']
    }
  };
  document.querySelectorAll('.lab-scenarios [data-fault]').forEach(button => {
    button.addEventListener('click', () => {
      const scenario = scenarios[button.dataset.fault];
      lab.dataset.fault = button.dataset.fault;
      document.querySelectorAll('.lab-scenarios [data-fault]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('lab-state').textContent = scenario.state;
      document.getElementById('lab-kicker').textContent = scenario.kicker;
      document.getElementById('lab-readout-title').textContent = scenario.title;
      document.getElementById('lab-readout-body').textContent = scenario.body;
      document.querySelector('#lab-action b').textContent = scenario.action;
      document.getElementById('lab-fallback').textContent = scenario.fallback;
      document.querySelectorAll('.lab-node-status').forEach((item, index) => { item.textContent = scenario.nodes[index]; });
    });
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      lab.classList.toggle('lab-in-view', entries[0].isIntersecting);
    }, { threshold: 0.05 }).observe(lab);
  } else {
    lab.classList.add('lab-in-view');
  }

  const deliveryStages = {
    define: { kicker: '01 / SOURCE OF TRUTH', symbol: '{ }', title: 'Make intent reviewable.', body: 'A change starts as a versioned, peer-reviewed definition. Clear ownership and small diffs make the desired state understandable before it reaches production.', tech: 'Git · CI/CD · IaC review' },
    provision: { kicker: '02 / INFRASTRUCTURE AS CODE', symbol: 'HCL', title: 'Provision predictably.', body: 'Terraform modules, state discipline, and configuration management turn cloud and cluster prerequisites into repeatable work.', tech: 'Terraform · Ansible · AWS · Azure' },
    reconcile: { kicker: '03 / GITOPS CONTROL LOOP', symbol: '↻', title: 'Let desired state converge.', body: 'FluxCD and ArgoCD keep deployment intent in Git and surface drift. Helm packages workload configuration so a cluster change has a readable path.', tech: 'FluxCD · ArgoCD · Helm · Kubernetes' },
    release: { kicker: '04 / PROGRESSIVE DELIVERY', symbol: '↗', title: 'Expose risk gradually.', body: 'Canary and blue/green routing make a release observable before it reaches everyone. Readiness, ingress controls, and rollback paths bound the impact.', tech: 'Traefik · Canary · Blue/green · cert-manager' },
    observe: { kicker: '05 / USER-FACING SIGNALS', symbol: '◉', title: 'Judge the change by its users.', body: 'SLIs, SLOs, error budgets, and saturation signals show whether the system still meets its promise. Alerts should point to action.', tech: 'Prometheus · Grafana · VictoriaMetrics · SLOs' },
    recover: { kicker: '06 / REVERSIBLE OPERATIONS', symbol: '↶', title: 'Practice the way back.', body: 'A rollback, a traffic fallback, or a tested restore needs a known owner and a verified path. Incident reviews turn that learning into the next safer release.', tech: 'Rollback · Runbooks · Restore tests · Postmortems' }
  };
  const deliveryScreen = document.querySelector('.delivery-screen');
  document.querySelectorAll('[data-delivery]').forEach(button => {
    button.addEventListener('click', () => {
      const stage = deliveryStages[button.dataset.delivery];
      deliveryScreen.dataset.stage = button.dataset.delivery;
      document.querySelectorAll('[data-delivery]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('delivery-kicker').textContent = stage.kicker;
      document.getElementById('delivery-symbol').textContent = stage.symbol;
      document.getElementById('delivery-stage-title').textContent = stage.title;
      document.getElementById('delivery-stage-body').textContent = stage.body;
      document.getElementById('delivery-technology').textContent = stage.tech;
    });
  });

  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const commands = {
    help: 'Commands: whoami, career, platform, devops, edge, data, slo, incident, recovery, reliability, certifications, help, clear',
    whoami: 'Piyush Joshi. Senior Platform, Site Reliability, and DevOps Engineer with 12+ years across cloud, edge, Kubernetes, and data systems.',
    career: 'Current: NVIDIA - Kubernetes, bare metal, KubeVirt, FluxCD. Previous: Akamai - edge platforms and AKS reliability. AWS, 2019 to 2021 - cloud infrastructure and Terraform.',
    platform: 'Kubernetes, AKS, on-prem clusters, bare metal, KubeVirt, FluxCD, ArgoCD, Helm, Calico, Kyverno, and workload resilience.',
    devops: 'Versioned infrastructure with Terraform and Ansible; GitOps with FluxCD and ArgoCD; Helm-based workloads; CI/CD and progressive delivery with canary or blue/green routing.',
    edge: 'DNS-based traffic steering, global traffic management, Traefik ingress, TLS automation, rate limiting, WAF, and edge security collaboration.',
    data: 'PostgreSQL and Oracle reliability: tuning, replication, backup and restore, tested recovery objectives, plus Kafka and CDC patterns.',
    slo: 'Start with a user-visible SLI, define the reliability target, watch the error budget, and alert on symptoms that need action.',
    incident: 'Establish impact and a timeline, contain the blast radius, communicate clearly, then use the postmortem to remove recurring failure modes.',
    recovery: 'Practice the way back: reversible rollouts, known fallback routes, backup validation, restore tests, and explicit RTO and RPO.',
    reliability: 'SLI and SLO design, error budgets, incident response, postmortems, capacity planning, observability, runbooks, and automation.',
    certifications: 'HashiCorp Certified: Terraform Associate. AWS Certified Solutions Architect.'
  };
  function appendLine(value, className) {
    const line = document.createElement('p');
    line.className = className;
    line.textContent = value;
    terminalOutput.append(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  function runCommand(raw) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') { terminalOutput.replaceChildren(); return; }
    appendLine(`piyush@systems:~$ ${raw.trim().slice(0, 100)}`, 'prompt');
    appendLine(commands[command] ?? 'Unknown command. Type help to see what is available.', commands[command] ? 'response' : 'error');
  }
  document.getElementById('terminal-form').addEventListener('submit', event => {
    event.preventDefault();
    runCommand(terminalInput.value);
    terminalInput.value = '';
    terminalInput.focus();
  });
  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => {
      runCommand(button.dataset.command);
      terminalInput.focus();
    });
  });

  const revealItems = document.querySelectorAll('.reveal-on-view');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();
