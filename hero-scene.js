(() => {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('hero-canvas');
  const image = document.querySelector('.hero-image');
  const status = document.getElementById('scene-status');
  const motionButton = document.getElementById('scene-motion');
  if (!hero || !canvas || !image || !status || !motionButton) return;

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const modes = {
    flow: 'Signals moving through the system',
    xray: 'Inspecting the layers beneath the surface',
    failover: 'Primary path interrupted · traffic rerouted'
  };
  const mainPath = [[260, 663], [530, 662], [837, 642], [1020, 634], [1162, 629], [1222, 618], [1258, 580], [1258, 500], [1297, 462], [1297, 340], [1330, 310], [1330, 185]];
  const alternatePath = [[260, 663], [530, 662], [837, 642], [1020, 634], [1125, 605], [1165, 552], [1165, 380], [1210, 350], [1210, 205], [1330, 185]];
  const racks = [[1190, 168], [1275, 212], [1390, 192], [1460, 235], [1175, 290], [1250, 325], [1410, 354], [1480, 402], [1180, 457], [1380, 510], [1465, 535], [1215, 570], [1340, 590], [1470, 610]];
  const state = { mode: 'flow', playing: !reduceMotion.matches, visible: true, frame: 0, time: 0, last: 0, width: 0, height: 0, scale: 1, offsetX: 0, offsetY: 0 };
  const mint = [172, 250, 211];
  const amber = [255, 177, 116];

  function color(rgb, alpha) { return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`; }
  function point(source) { return [state.offsetX + source[0] * state.scale, state.offsetY + source[1] * state.scale]; }
  function drawPath(points, rgb, alpha, width, glow = 0) {
    context.beginPath();
    points.forEach((source, index) => {
      const [x, y] = point(source);
      if (index) context.lineTo(x, y); else context.moveTo(x, y);
    });
    context.strokeStyle = color(rgb, alpha);
    context.lineWidth = width * state.scale;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowColor = color(rgb, Math.min(alpha, .65));
    context.shadowBlur = glow * state.scale;
    context.stroke();
    context.shadowBlur = 0;
  }
  function along(points, amount) {
    const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    const total = lengths.reduce((sum, length) => sum + length, 0);
    let distance = (((amount % 1) + 1) % 1) * total;
    for (let i = 0; i < lengths.length; i++) {
      if (distance <= lengths[i]) {
        const ratio = distance / lengths[i];
        return [points[i][0] + (points[i + 1][0] - points[i][0]) * ratio, points[i][1] + (points[i + 1][1] - points[i][1]) * ratio];
      }
      distance -= lengths[i];
    }
    return points[points.length - 1];
  }
  function light(source, radius, rgb, alpha) {
    const [x, y] = point(source);
    const r = Math.max(1, radius * state.scale);
    const glow = context.createRadialGradient(x, y, 0, x, y, r * 7);
    glow.addColorStop(0, color(rgb, alpha));
    glow.addColorStop(.18, color(rgb, alpha * .5));
    glow.addColorStop(1, color(rgb, 0));
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, r * 7, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = color(rgb, alpha);
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  }
  function pulse(points, progress, rgb, alpha = 1) {
    for (let tail = 10; tail >= 0; tail--) {
      const p = along(points, progress - tail * .0032);
      light(p, tail ? Math.max(.9, 3.3 - tail * .23) : 4.2, rgb, alpha * (1 - tail / 12));
    }
  }
  function drawRacks(time, active) {
    racks.forEach((rack, index) => {
      const phase = Math.sin(time * 2.4 + index * 1.7);
      const alpha = active ? .23 + Math.max(0, phase) * .6 : .08 + Math.max(0, phase) * .2;
      light(rack, index % 4 === 0 ? 2.4 : 1.4, mint, alpha);
    });
  }
  function drawScan(time) {
    const scanY = 610 - ((time * 55) % 510);
    const [left, y] = point([1140, scanY]);
    const [right] = point([1515, scanY]);
    const gradient = context.createLinearGradient(left, y, right, y);
    gradient.addColorStop(0, color(mint, 0));
    gradient.addColorStop(.25, color(mint, .6));
    gradient.addColorStop(.7, color(mint, .75));
    gradient.addColorStop(1, color(mint, 0));
    context.fillStyle = gradient;
    context.shadowColor = color(mint, .9);
    context.shadowBlur = 22 * state.scale;
    context.fillRect(left, y, right - left, Math.max(2, 3 * state.scale));
    context.shadowBlur = 0;
    for (let x = 1170; x <= 1480; x += 42) {
      const near = Math.abs(x - (1260 + Math.sin(time) * 100));
      light([x, scanY - 23 - near * .05], 1.7, mint, .35);
    }
  }
  function draw(time) {
    context.clearRect(0, 0, state.width, state.height);
    const mode = state.mode;
    const failover = mode === 'failover';
    const xray = mode === 'xray';
    const primary = failover ? amber : mint;
    drawPath(mainPath, primary, failover ? .34 : .3, 1.1, 8);
    drawPath(mainPath, primary, failover ? .36 : .35, .5);
    if (failover) {
      drawPath(alternatePath, mint, .52, 1.5, 12);
      light([1125, 605], 6, amber, .86);
      for (let i = 0; i < 4; i++) pulse(alternatePath, time * .14 + i * .25, mint, .85);
    } else {
      for (let i = 0; i < 5; i++) pulse(mainPath, time * (xray ? .075 : .11) + i * .2, mint, xray ? .65 : .98);
    }
    drawRacks(time, xray);
    if (xray) {
      drawScan(time);
      for (let i = 0; i < 9; i++) {
        const y = 150 + i * 52;
        drawPath([[1165, y], [1490, y]], mint, .1, .6);
      }
    }
    // The lake echoes the signal without becoming a second focal point.
    for (let i = 0; i < 5; i++) {
      const shimmer = Math.sin(time * .9 + i * 1.35) * 11;
      drawPath([[1020 + i * 54, 729 + i * 16], [1085 + i * 69 + shimmer, 729 + i * 16]], mint, .07 + (i % 2) * .03, .8, 7);
    }
  }
  function resize() {
    const rect = hero.getBoundingClientRect();
    state.width = Math.max(1, rect.width);
    state.height = Math.max(1, rect.height);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * dpr);
    canvas.height = Math.round(state.height * dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.scale = Math.max(state.width / 1672, state.height / 941);
    const objectPosition = getComputedStyle(image).objectPosition.split(' ');
    const positionFraction = value => value === 'center' ? .5 : value === 'right' || value === 'bottom' ? 1 : value === 'left' || value === 'top' ? 0 : parseFloat(value) / 100;
    const horizontal = positionFraction(objectPosition[0]);
    const vertical = positionFraction(objectPosition[1]);
    state.offsetX = (state.width - 1672 * state.scale) * horizontal;
    state.offsetY = (state.height - 941 * state.scale) * vertical;
    draw(state.time);
  }
  function shouldRun() { return state.playing && state.visible && !document.hidden; }
  function frame(now) {
    state.frame = 0;
    if (!shouldRun()) return;
    if (now - state.last >= 32) {
      state.time += Math.min((now - (state.last || now)) / 1000, .08);
      state.last = now;
      draw(state.time);
    }
    state.frame = requestAnimationFrame(frame);
  }
  function syncMotion() {
    motionButton.textContent = state.playing ? 'PAUSE' : 'PLAY';
    motionButton.setAttribute('aria-label', state.playing ? 'Pause scene animation' : 'Play scene animation');
    motionButton.setAttribute('aria-pressed', String(state.playing));
    hero.classList.toggle('scene-paused', !state.playing);
    if (shouldRun() && !state.frame) { state.last = 0; state.frame = requestAnimationFrame(frame); }
    if (!shouldRun() && state.frame) { cancelAnimationFrame(state.frame); state.frame = 0; state.last = 0; }
    if (!state.frame) draw(state.time);
  }
  document.querySelectorAll('.scene-controls [data-scene]').forEach(button => {
    button.addEventListener('click', () => {
      state.mode = button.dataset.scene;
      hero.dataset.scene = state.mode;
      status.textContent = modes[state.mode];
      document.querySelectorAll('.scene-controls [data-scene]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      draw(state.time);
    });
  });
  motionButton.addEventListener('click', () => { state.playing = !state.playing; syncMotion(); });
  reduceMotion.addEventListener?.('change', event => { state.playing = !event.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; syncMotion(); }, { threshold: .01 }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else addEventListener('resize', resize);
  resize();
  syncMotion();
})();
