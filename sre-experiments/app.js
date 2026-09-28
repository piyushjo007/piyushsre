(() => {
  const C = window.RELIABILITY_CONTENT;
  const app = document.getElementById('app');
  const scene = document.body.dataset.scene;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const file = name => name === 'index' ? 'index.html' : `${name}.html`;

  function shell(active) {
    return `<header class="site-head"><a class="site-logo" href="index.html" aria-label="Reliability After Dark home"><span class="logo-glyph">P<span>.</span>J</span><span class="logo-text">PIYUSH JOSHI<small>RELIABILITY AFTER DARK</small></span></a><nav class="main-nav" aria-label="Experiences"><a href="index.html" ${active === 'index' ? 'aria-current="page"' : ''}>All experiments</a><span class="nav-divider">/</span><a href="${file(active)}" ${active !== 'index' ? 'aria-current="page"' : ''}>${active === 'index' ? 'Choose a page' : esc(C.experiments.find(x => x.file === file(active))?.name || '')}</a></nav><span class="head-status"><i></i> FICTIONAL SIMULATION</span></header>`;
  }
  function footer() { return `<footer class="site-foot"><span>© ${new Date().getFullYear()} ${esc(C.name)}</span><span>${esc(C.disclaimer)}</span><a href="index.html">ALL EXPERIMENTS ↗</a></footer>`; }
  function pageIntro(number, eyebrow, title, text) { return `<div class="page-intro"><div class="page-index">EXPERIMENT ${number} / ${eyebrow}</div><h1>${title}</h1><p>${text}</p></div>`; }

  function indexPage() {
    return `${shell('index')}<main id="main" class="index-main"><section class="index-hero"><div class="index-star" aria-hidden="true">✳</div><div class="index-eyebrow">FIVE INTERACTIVE FIELD NOTES / ONE ENGINEER</div><h1>Reliability<br><em>after dark.</em></h1><p>A portfolio you can investigate, uncover, command, forecast, and break. Every experiment shows a different way to think about keeping systems alive.</p><div class="index-person"><span class="person-avatar">PJ</span><div><strong>${esc(C.name)}</strong><small>${esc(C.role)}</small></div></div></section><section class="index-list" aria-label="Interactive pages">${C.experiments.map(x => `<a class="index-row" href="${x.file}"><span class="row-number">${x.number}</span><span class="row-symbol" aria-hidden="true">${x.symbol}</span><span class="row-copy"><small>${esc(x.tag)}</small><strong>${esc(x.name)}</strong><span>${esc(x.description)}</span></span><span class="row-arrow" aria-hidden="true">↗</span></a>`).join('')}</section><p class="index-note">${esc(C.disclaimer)} Personal details come from the profile supplied for this portfolio.</p></main>${footer()}`;
  }

  const clues = [
    {id:'latency',label:'01 / USER IMPACT',title:'Checkout latency',metric:'P95 +420%',body:'Users can load the storefront, but checkout requests are waiting at the edge. The increase began at 02:14.'},
    {id:'change',label:'02 / CHANGE LOG',title:'Routing policy',metric:'02:11 DEPLOY',body:'A new edge routing policy was enabled three minutes before user impact. The application deploy history is quiet.'},
    {id:'health',label:'03 / DEPENDENCIES',title:'Origin health',metric:'HEALTHY',body:'Compute and database health are steady. The queue grows before requests reach the origin.'}
  ];
  function incidentPage() {
    return `${shell('incident')}<main id="main" class="incident-main"><div class="incident-banner"><span class="alert-led"></span> SEV 2 / FICTIONAL INCIDENT <span>02:18 UTC</span></div>${pageIntro('01','INCIDENT RESPONSE','The internet<br><em>is on fire.</em>','The homepage opens mid-incident. Investigate the signals, make a call, and discover the engineer behind the response.')}<div class="incident-layout"><section class="war-room"><div class="window-head"><span><i></i><i></i><i></i></span> INCIDENT ROOM / EDGE-17 <b>LIVE SIMULATION</b></div><div class="incident-map"><div class="map-grid"></div><div class="map-flow"><span>VISITORS</span><b class="flow-line warning"></b><span class="bad-node">EDGE</span><b class="flow-line"></b><span>PLATFORM</span><b class="flow-line"></b><span>DATA</span></div><div class="map-message">REQUESTS WAITING AT THE EDGE <span>●</span></div></div><div class="timeline"><span>02:11 <b>POLICY ENABLED</b></span><span>02:14 <b>LATENCY RISES</b></span><span>02:18 <b>YOU ARRIVE</b></span></div></section><aside class="incident-side"><div class="panel-heading"><span>YOUR OBJECTIVE</span><strong>Find the first bad boundary.</strong><p>Open the three evidence cards. Then decide what to do before more users are affected.</p></div><div id="clue-list" class="clue-list">${clues.map(x => `<button class="clue" type="button" data-clue="${x.id}" aria-expanded="false"><span>${x.label}</span><strong>${x.title}</strong><b>+</b><p hidden>${x.body}</p><small hidden>${x.metric}</small></button>`).join('')}</div><div class="incident-progress" id="incident-progress">0 / 3 signals inspected</div></aside></div><section class="decision-room"><div><span class="section-label">THE DECISION</span><h2>What would you do first?</h2><p>Choose a mitigation. You can inspect more evidence or change your answer.</p></div><div class="decision-actions"><button type="button" data-choice="rollback">Roll back edge policy <span>↗</span></button><button type="button" data-choice="database">Restart the database <span>↗</span></button><button type="button" data-choice="compute">Scale compute <span>↗</span></button></div><div id="decision-result" class="decision-result" role="status" aria-live="polite"><span>Awaiting decision</span><p>The strongest response starts with evidence about user impact and recent change.</p></div></section><section class="reveal" id="engineer-reveal"><span class="section-label">THE ENGINEER BEHIND THE RESPONSE</span><h2>Calm is a systems skill.</h2><p>${esc(C.name)} works across edge routing, Kubernetes platforms, databases, SLOs, and incident response. ${esc(C.summary)}</p><div class="reveal-tags"><span>EDGE ROUTING</span><span>INCIDENT RESPONSE</span><span>SLOS</span><span>POSTMORTEMS</span></div><a href="index.html">Explore another experiment ↗</a></section></main>${footer()}`;
  }

  const layers = {
    metrics:{title:'The numbers beneath the surface',type:'METRICS',signal:'P95 LATENCY',value:'1.8s',trend:'+420%',explanation:'The page looks normal, but checkout tail latency has climbed. Averages hide the long wait some users experience.',rows:['request_rate  1,420 / min','error_rate    0.8%','queue_depth   842']},
    traces:{title:'Follow one slow request',type:'DISTRIBUTED TRACE',signal:'SLOWEST SPAN',value:'edge → origin',trend:'1.4s',explanation:'The trace shows most of the delay before the request reaches the application. The dependency boundary narrows the search.',rows:['client → edge       1,410 ms','edge → app            92 ms','app → database        18 ms']},
    logs:{title:'A message in the noise',type:'CORRELATED LOGS',signal:'ROUTING EVENT',value:'retry loop',trend:'02:14',explanation:'A correlated routing log points to a retry loop. Logs become useful when tied to the request and time window.',rows:['02:14:08  route=primary','02:14:09  upstream timeout','02:14:09  retry=3']}
  };
  function xrayPage() {
    return `${shell('xray')}<main id="main" class="xray-main">${pageIntro('02','OBSERVABILITY','Everything looks<br><em>fine. Look closer.</em>','Move the lens over the product. Beneath the polished surface are the signals an SRE uses to find the real story.')}<div class="xray-controls"><span>CHOOSE A SIGNAL</span><div role="group" aria-label="Telemetry layer"><button type="button" data-layer="metrics" aria-pressed="true">01 Metrics</button><button type="button" data-layer="traces" aria-pressed="false">02 Traces</button><button type="button" data-layer="logs" aria-pressed="false">03 Logs</button></div><button id="reveal-toggle" type="button" aria-pressed="false">Reveal full layer ↗</button></div><section class="xray-frame" id="xray-frame" aria-label="Interactive X-ray of a fictional commerce site"><div class="product-surface"><div class="product-nav"><b>north<span>star</span></b><span>Shop / Journal / About</span><span class="product-cart">BAG (1)</span></div><div class="product-main"><div class="product-image"><div class="product-orb"></div><span>FORM / FUNCTION / EVERY DAY</span></div><div class="product-copy"><small>THE NEW COLLECTION / 001</small><h2>Made for<br>the journey.</h2><p>Considered essentials for wherever the day takes you.</p><div class="product-price">THE EVERYDAY BAG <span>$89</span></div><button type="button" disabled aria-label="Demo checkout button, not available">CHECK OUT ↗</button><div class="product-rating">★★★★★ <span>Everything appears normal.</span></div></div></div><div class="product-bottom">BEAUTIFUL INTERFACES CAN HIDE UNHEALTHY SYSTEMS.</div></div><div class="xray-under" id="xray-under"><div class="xray-under-head"><span>OBSERVABILITY / <b id="layer-type">METRICS</b></span><span>TRACE ID: DEMO-0214</span></div><div class="xray-scan"><div class="scan-rings"></div><div class="scan-core"><small id="layer-signal">P95 LATENCY</small><strong id="layer-value">1.8s</strong><span id="layer-trend">+420%</span></div></div><div class="xray-under-foot"><span id="layer-row-1">request_rate 1,420 / min</span><span id="layer-row-2">error_rate 0.8%</span><span id="layer-row-3">queue_depth 842</span></div></div><div class="lens-ring" aria-hidden="true"></div></section><div class="xray-explainer"><span class="section-label">WHAT THE LENS FOUND</span><div><h2 id="layer-title">The numbers beneath the surface</h2><p id="layer-explanation">The page looks normal, but checkout tail latency has climbed. Averages hide the long wait some users experience.</p></div><div class="xray-credit"><strong>${esc(C.name)}</strong><span>SLIS / SLOS / OBSERVABILITY / INCIDENT RESPONSE</span></div></div></main>${footer()}`;
  }

  function terminalPage() {
    return `${shell('terminal')}<main id="main" class="terminal-main"><div class="terminal-top"><span>ARCHIVE NODE / 2042.09</span><span>AN ALTERNATE TIMELINE FOR A REAL CAREER</span></div><section class="terminal-shell"><div class="terminal-title"><span class="terminal-dots"><i></i><i></i><i></i></span><span>piyush@reliability: ~</span><span>● CONNECTED</span></div><div class="terminal-body"><div class="terminal-aside"><div class="terminal-symbol">>_</div><span>THE ARCHIVE</span><h1>A terminal from<br>another timeline.</h1><p>There are no buttons for a life in systems. Explore the files. Ask the machine.</p><div class="terminal-quick"><span>TRY A COMMAND</span><button type="button" data-command="help">help</button><button type="button" data-command="whoami">whoami</button><button type="button" data-command="ls">ls</button><button type="button" data-command="career">career</button><button type="button" data-command="skills">skills</button></div></div><div class="terminal-console"><div class="terminal-output" id="terminal-output" aria-live="polite" aria-label="Terminal output"><div class="terminal-line muted">Reliability Archive OS v0.9 — fictional interface, real career facts.</div><div class="terminal-line muted">Type <b>help</b> or choose a command to begin.</div></div><form id="terminal-form" autocomplete="off"><label for="terminal-input">piyush@archive:~$</label><input id="terminal-input" name="command" aria-label="Terminal command" spellcheck="false" autocapitalize="off" autocomplete="off"><button type="submit" aria-label="Run command">↵</button></form></div></div></section><div class="terminal-bottom"><span>AVAILABLE PATHS: /career /platform /edge /data /operations</span><span>${esc(C.disclaimer)}</span></div></main>${footer()}`;
  }

  const forecasts = [
    {id:'clear',icon:'☀',name:'Clear skies',badge:'STEADY',tone:'clear',temp:'99.95%',metric:'Service availability',description:'The service is meeting its objective. A calm period is a chance to test assumptions before they are tested for you.',signals:['SLO within target','Queue stable','No user-impacting alerts'],action:'Run a small recovery exercise; verify the runbook and backup path while capacity is available.',skill:'SLO design · recovery testing'},
    {id:'fog',icon:'◌',name:'Latency fog',badge:'WATCH',tone:'fog',temp:'820 ms',metric:'P95 response time',description:'Users can still complete requests, but tail latency is rising. The first warning is often subtle.',signals:['P95 trending upward','Database I/O nearing baseline','Error rate still low'],action:'Compare traces and saturation signals. Investigate the slow boundary before errors appear.',skill:'Performance baselines · observability'},
    {id:'heat',icon:'≋',name:'Traffic heatwave',badge:'CAPACITY',tone:'heat',temp:'2.4×',metric:'Normal request rate',description:'Demand has surged across the edge. Queues and rate limits now matter as much as raw compute.',signals:['Burst traffic at ingress','Queue depth increasing','Autoscaling lag'],action:'Protect the service with rate limits and capacity controls; confirm traffic is reaching healthy regions.',skill:'Edge routing · capacity planning'},
    {id:'storm',icon:'⚡',name:'Error storm',badge:'INCIDENT',tone:'storm',temp:'8.2%',metric:'Failed requests',description:'User impact is visible. This is the time to establish incident roles, mitigate, and communicate clearly.',signals:['Error budget burning','Checkout failures','New routing change'],action:'Declare an incident, assess the recent change, choose a reversible mitigation, and keep stakeholders informed.',skill:'Incident response · error budgets'}
  ];
  function weatherPage() {
    return `${shell('weather')}<main id="main" class="weather-main"><div class="weather-top"><span>RELIABILITY MET OFFICE</span><span>ISSUED FOR A FICTIONAL SERVICE</span></div>${pageIntro('04','CONDITIONS & RESPONSE','The reliability<br><em>weather report.</em>','A service has weather. Select a forecast to see what the signals mean and how I would respond.')}<div class="forecast-layout"><section class="forecast-screen tone-clear" id="forecast-screen"><div class="forecast-sky"><div class="weather-sun"></div><div class="weather-cloud cloud-one"></div><div class="weather-cloud cloud-two"></div><div class="weather-rain"></div><span class="sky-caption">SYSTEM CONDITIONS / SIMULATED</span></div><div class="forecast-current"><div><span class="forecast-label">CURRENT CONDITION</span><h2 id="forecast-name">Clear skies</h2><p id="forecast-description">The service is meeting its objective. A calm period is a chance to test assumptions before they are tested for you.</p></div><div class="forecast-big"><strong id="forecast-value">99.95%</strong><span id="forecast-metric">Service availability</span></div></div></section><aside class="forecast-sidebar"><div class="forecast-sidebar-head">SELECT CONDITIONS <span>↘</span></div><div class="weather-options">${forecasts.map((w,i) => `<button type="button" class="weather-option ${i===0?'selected':''}" data-forecast="${w.id}" aria-pressed="${i===0}"><span class="weather-icon">${w.icon}</span><span><strong>${w.name}</strong><small>${w.badge}</small></span><b>↗</b></button>`).join('')}</div></aside></div><section class="weather-analysis"><div><span class="section-label">SIGNALS ON THE RADAR</span><ul id="weather-signals">${forecasts[0].signals.map(s=>`<li>${s}</li>`).join('')}</ul></div><div><span class="section-label">RECOMMENDED RESPONSE</span><h2 id="weather-action">${forecasts[0].action}</h2><p id="weather-skill">${forecasts[0].skill}</p></div></section><div class="weather-signature">FIELD NOTES BY <strong>${esc(C.name)}</strong> <span>${esc(C.role)}</span></div></main>${footer()}`;
  }

  const faults = [
    {id:'node',name:'Lose a compute node',icon:'▥',symptom:'One node disappears while workloads are serving traffic.',stages:[['DETECT','Node health fails; workload placement and user-impact indicators are checked.'],['CONTAIN','Traffic stays on healthy replicas while scheduling avoids the unavailable node.'],['RECOVER','Workloads resettle across fault domains and capacity is verified.']],learning:'Kubernetes placement, topology spread, and disruption budgets make recovery less fragile.',skill:'Kubernetes · bare metal · resilience'},
    {id:'edge',name:'Break an edge route',icon:'↗',symptom:'A routing rule sends a share of requests to an unhealthy upstream.',stages:[['DETECT','Latency and errors rise at the edge before the application sees the requests.'],['CONTAIN','The bad route is withdrawn and traffic falls back to a healthy path.'],['RECOVER','Signals return to baseline; the rule and rollout guardrail are reviewed.']],learning:'Traffic steering needs health checks, canaries, and a reversible path.',skill:'Edge routing · canaries · incident response'},
    {id:'data',name:'Slow the data layer',icon:'▤',symptom:'A database saturation spike makes requests pile up.',stages:[['DETECT','P95 latency and I/O saturation move beyond their baselines.'],['CONTAIN','Pressure is reduced through workload isolation and controlled demand.'],['RECOVER','Queries and indexes are tuned; recovery readiness is rechecked.']],learning:'Database reliability depends on performance baselines and tested recovery.',skill:'PostgreSQL · Oracle · performance'}
  ];
  function recoverPage() {
    return `${shell('recover')}<main id="main" class="recover-main">${pageIntro('05','RESILIENCE ENGINEERING','Go ahead.<br><em>Break this system.</em>','Choose a fault. The fictional service will detect it, contain it, and recover—one step at a time. Repeat a learned fault to see the fallback improve.')}<div class="recover-workbench"><aside class="fault-menu"><span class="section-label">CHOOSE A FAILURE</span>${faults.map((f,i)=>`<button type="button" data-fault="${f.id}" class="fault-option ${i===0?'selected':''}" aria-pressed="${i===0}"><span>${f.icon}</span><strong>${f.name}</strong><b>↗</b></button>`).join('')}<p>These are teaching scenarios, not controls for any real service.</p></aside><section class="service-sim"><div class="sim-head"><span>DEMO SERVICE / RESILIENCE LAB</span><span id="sim-state" class="state-healthy">● HEALTHY</span></div><div class="service-path"><div class="service-node">CLIENTS<small>REQUESTS</small></div><div class="service-line"></div><div class="service-node" id="fault-node">PLATFORM<small>ACTIVE</small></div><div class="service-line"></div><div class="service-node">DATA<small>READY</small></div></div><div class="sim-reading"><div><small>REQUEST SUCCESS</small><strong id="success-rate">99.9%</strong></div><div><small>ACTIVE FAULT</small><strong id="active-fault">NONE</strong></div><div><small>RECOVERY STAGE</small><strong id="recovery-stage">READY</strong></div></div><div class="learning-strip" role="status" aria-live="polite">RETAINED UPGRADES <strong id="upgrade-count">0 / 3</strong><span id="upgrade-names">Complete a recovery to add a guardrail.</span></div><div class="sim-actions"><button id="inject-button" type="button">INJECT SELECTED FAULT ↗</button><button id="advance-button" type="button" disabled>RUN NEXT STEP →</button><button id="reset-button" type="button">RESET RUN</button></div></section></div><div class="recovery-log"><div><span class="section-label">LIVE RUNBOOK</span><h2 id="runbook-heading">Waiting for a fault.</h2><p id="runbook-detail">Select a failure and inject it to walk through the response.</p></div><ol id="recovery-steps"><li>Detect the impact</li><li>Contain the fault</li><li>Verify recovery</li></ol></div><section class="recovery-lesson" id="recovery-lesson"><span class="section-label">THE ENGINEERING BEHIND THE RECOVERY</span><h2>Resilience is designed before the fault.</h2><p id="recovery-learning">${esc(faults[0].learning)}</p><small id="recovery-skill">${esc(faults[0].skill)}</small><div class="recovery-person">${esc(C.name)} / ${esc(C.role)}</div></section></main>${footer()}`;
  }

  const pages = {index:indexPage,incident:incidentPage,xray:xrayPage,terminal:terminalPage,weather:weatherPage,recover:recoverPage};
  app.innerHTML = (pages[scene] || pages.index)();

  if(scene==='incident'){
    const seen = new Set();
    document.querySelectorAll('[data-clue]').forEach(button => button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('p').hidden = open;
      button.querySelector('small').hidden = open;
      button.querySelector('b').textContent = open ? '+' : '−';
      seen.add(button.dataset.clue);
      document.getElementById('incident-progress').textContent = `${seen.size} / 3 signals inspected`;
    }));
    document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-choice]').forEach(b => b.classList.toggle('chosen', b===button));
      const correct = button.dataset.choice === 'rollback';
      const result = document.getElementById('decision-result');
      result.className = `decision-result ${correct?'correct':'retry'}`;
      result.querySelector('span').textContent = correct ? 'MITIGATION SELECTED / ROLLBACK' : 'CHECK THE EVIDENCE AGAIN';
      result.querySelector('p').textContent = correct ? 'The recent edge change matches the timing and the affected boundary. Roll it back, watch user impact, then investigate the rule.' : 'The origin signals are healthy. Revisit the timeline and the point where requests begin waiting.';
      document.getElementById('engineer-reveal').classList.toggle('visible', correct);
    }));
  }

  if(scene==='xray'){
    const frame = document.getElementById('xray-frame');
    frame.addEventListener('pointermove', e => {
      const box=frame.getBoundingClientRect();
      frame.style.setProperty('--lens-x',`${e.clientX-box.left}px`);
      frame.style.setProperty('--lens-y',`${e.clientY-box.top}px`);
    });
    frame.addEventListener('pointerenter',()=>frame.classList.add('lens-active'));
    frame.addEventListener('pointerleave',()=>frame.classList.remove('lens-active'));
    document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{
      document.querySelectorAll('[data-layer]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const item=layers[button.dataset.layer];
      document.getElementById('layer-type').textContent=item.type;
      document.getElementById('layer-signal').textContent=item.signal;
      document.getElementById('layer-value').textContent=item.value;
      document.getElementById('layer-trend').textContent=item.trend;
      document.getElementById('layer-title').textContent=item.title;
      document.getElementById('layer-explanation').textContent=item.explanation;
      item.rows.forEach((row,i)=>document.getElementById(`layer-row-${i+1}`).textContent=row);
    }));
    document.getElementById('reveal-toggle').addEventListener('click',e=>{
      const on=frame.classList.toggle('reveal-all');
      e.currentTarget.setAttribute('aria-pressed',String(on));
      e.currentTarget.textContent=on?'Hide full layer ↗':'Reveal full layer ↗';
    });
  }

  if(scene==='terminal'){
    const output=document.getElementById('terminal-output');
    const input=document.getElementById('terminal-input');
    const archive={
      '/career':`${C.current}\n${C.previous}`,
      '/platform':'Kubernetes · AKS · bare metal · KubeVirt · FluxCD · ArgoCD · Calico · Terraform',
      '/edge':'DNS-based traffic steering · global traffic management · Traefik · TLS · WAF · rate limiting',
      '/data':'PostgreSQL · Oracle · performance tuning · replication · backup/restore · Kafka CDC',
      '/operations':'SLIs/SLOs · error budgets · incident response · postmortems · capacity planning · observability'
    };
    function line(text,kind=''){const el=document.createElement('div');el.className=`terminal-line ${kind}`;el.textContent=text;output.append(el);output.scrollTop=output.scrollHeight;}
    function run(raw){const command=raw.trim().toLowerCase();if(!command)return;line(`piyush@archive:~$ ${raw}`,'prompt-line');if(command==='clear'){output.innerHTML='';return}
      const responses={help:'Commands: help, whoami, ls, career, skills, cat /career, cat /platform, cat /edge, cat /data, cat /operations, clear',whoami:`${C.name} — ${C.role}\n${C.summary}`,ls:Object.keys(archive).join('   '),career:archive['/career'],skills:C.skills.join(' · ')};
      if(command.startsWith('cat '))line(archive[command.slice(4)]||'File not found. Try ls to see available paths.','response');
      else line(responses[command]||'Command not found. Type help to list available commands.','response');
    }
    document.getElementById('terminal-form').addEventListener('submit',e=>{e.preventDefault();run(input.value);input.value='';input.focus()});
    document.querySelectorAll('[data-command]').forEach(button=>button.addEventListener('click',()=>{run(button.dataset.command);input.focus()}));
  }

  if(scene==='weather'){
    document.querySelectorAll('[data-forecast]').forEach(button=>button.addEventListener('click',()=>{
      const w=forecasts.find(item=>item.id===button.dataset.forecast);
      document.querySelectorAll('[data-forecast]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});
      document.getElementById('forecast-screen').className=`forecast-screen tone-${w.tone}`;
      document.getElementById('forecast-name').textContent=w.name;
      document.getElementById('forecast-description').textContent=w.description;
      document.getElementById('forecast-value').textContent=w.temp;
      document.getElementById('forecast-metric').textContent=w.metric;
      document.getElementById('weather-signals').replaceChildren(...w.signals.map(s=>{const li=document.createElement('li');li.textContent=s;return li}));
      document.getElementById('weather-action').textContent=w.action;
      document.getElementById('weather-skill').textContent=w.skill;
    }));
  }

  if(scene==='recover'){
    let selected=faults[0],stage=-2,knownFault=false;
    const learned=new Set();
    function display(){
      if(stage===2)learned.add(selected.id);
      const live=stage>=-1;
      const done=stage===2;
      document.getElementById('sim-state').textContent=!live?'● HEALTHY':done?'● RECOVERED':'● DEGRADED';
      document.getElementById('sim-state').className=!live?'state-healthy':done?'state-recovered':'state-degraded';
      document.getElementById('success-rate').textContent=!live?'99.9%':done?'99.9%':stage===-1?'82.4%':stage===0?'88.1%':'96.7%';
      document.getElementById('active-fault').textContent=!live?'NONE':done?'CONTAINED':selected.id.toUpperCase();
      document.getElementById('recovery-stage').textContent=!live?'READY':stage===-1?'IMPACT':selected.stages[stage][0];
      document.getElementById('fault-node').classList.toggle('node-failed',live&&!done);
      const heading=document.getElementById('runbook-heading'),detail=document.getElementById('runbook-detail');
      heading.textContent=!live?'Waiting for a fault.':knownFault&&stage===1?'Known fault / fallback engaged':stage===-1?'Fault injected: '+selected.name: selected.stages[stage][0]+' / '+(done?'service stable':'response in progress');
      detail.textContent=!live?'Select a failure and inject it to walk through the response.':knownFault&&stage===1?'A retained guardrail recognized this failure and contained it before the full response sequence was needed.':stage===-1?selected.symptom:selected.stages[stage][1];
      document.querySelectorAll('#recovery-steps li').forEach((li,i)=>li.classList.toggle('step-done',i<=stage));
      document.getElementById('upgrade-count').textContent=`${learned.size} / ${faults.length}`;
      document.getElementById('upgrade-names').textContent=learned.size?faults.filter(f=>learned.has(f.id)).map(f=>f.name).join(' · '):'Complete a recovery to add a guardrail.';
      document.getElementById('advance-button').disabled=!live||done;
      document.getElementById('inject-button').disabled=live&&!done;
      document.getElementById('recovery-lesson').classList.toggle('lesson-active',done);
    }
    document.querySelectorAll('[data-fault]').forEach(button=>button.addEventListener('click',()=>{
      selected=faults.find(f=>f.id===button.dataset.fault);stage=-2;knownFault=false;
      document.querySelectorAll('[data-fault]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});
      document.getElementById('recovery-learning').textContent=selected.learning;
      document.getElementById('recovery-skill').textContent=selected.skill;
      display();
    }));
    document.getElementById('inject-button').addEventListener('click',()=>{knownFault=learned.has(selected.id);stage=knownFault?1:-1;display()});
    document.getElementById('advance-button').addEventListener('click',()=>{if(stage<2)stage++;display()});
    document.getElementById('reset-button').addEventListener('click',()=>{stage=-2;knownFault=false;display()});
    display();
  }
})();
