// Full-screen 2D stimuli, 1280x720. Times in ms. events = audio cues [{t,hz,dur}] (sine tones).
const W = 1280, H = 720, CX = W / 2, CY = H / 2;
const canvas = document.getElementById('c'); const ctx = canvas.getContext('2d');
const rng = (seed) => () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
function text(s, x, y, px, c = '#f2f2f2', w = '700') {
  ctx.font = `${w} ${px}px "Helvetica Neue",Arial,sans-serif`; ctx.fillStyle = c;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y);
}
function intro(title, lines) { return () => {
  text(title, CX, 170, 44, '#8fb0c9'); lines.forEach((s, i) => text(s, CX, 300 + i * 56, 32, '#e6e6e6', '500'));
}; }
function fixation() { text('+', CX, CY, 72, '#f2f2f2', '400'); }
function grid(letters, cols, rows, dx, dy, px) {
  const x0 = CX - (cols - 1) * dx / 2, y0 = CY - (rows - 1) * dy / 2;
  letters.forEach((s, i) => text(s, x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy, px));
}
const LET = ['F','K','M','R','T','B','J','L','D','P','V','C'];
const INTRO = 4000, T0 = 5000; // intro card 0-4 s, fixation 4-5 s, stimulus from 5 s
const READY = { t: T0 - 300, hz: 1000, dur: 0.15 };
const ARRAY = (t, s) => { if (s < 50) grid(LET, 4, 3, 230, 170, 120); };
const scenes = {
  'sperling-whole': { duration: T0 + 6000, events: [READY], draw: (t) => {
    if (t < INTRO) return intro('Sperling (1960) · Whole report', ['Letters flash for 50 ms.', 'Then report every letter you remember.'])();
    if (t < T0) return fixation();
    const s = t - T0; ARRAY(t, s);
    if (s > 1000) text('Report all the letters you remember', CX, CY + 300, 30, '#8fb0c9');
  }},
  'sperling-partial': { duration: T0 + 6000, events: [READY, { t: T0 + 50, hz: 650, dur: 0.5 }], draw: (t) => {
    if (t < INTRO) return intro('Sperling (1960) · Immediate partial report', ['Letters flash for 50 ms.', 'A tone then tells you which row to report.'])();
    if (t < T0) return fixation();
    ARRAY(t, t - T0);
  }},
  'sperling-delayed': { duration: T0 + 7000, events: [READY, { t: T0 + 1050, hz: 650, dur: 0.5 }], draw: (t) => {
    if (t < INTRO) return intro('Sperling (1960) · Delayed partial report', ['Letters flash for 50 ms.', 'A one-second blank, then a tone names the row.'])();
    if (t < T0) return fixation();
    ARRAY(t, t - T0);
  }},
  ...Object.fromEntries([4, 6].map(n => [`change-${n}`, { duration: T0 + 3000,
    events: [READY, { t: T0, hz: 1200, dur: 0.02 }, { t: T0 + 1000, hz: 1200, dur: 0.02 }],
    draw: (t) => {
      if (t < INTRO) return intro(`Change detection · ${n} squares`, ['Coloured squares flash briefly.', 'Say whether one square changed colour when the test appears.'])();
      if (t < T0) return fixation();
      const s = t - T0; const r = rng(7 * n + 3);
      const cols = ['#e53935','#1e88e5','#43a047','#fdd835','#8e24aa','#fb8c00','#00acc1'];
      const slots = [[-260,-120],[0,-120],[260,-120],[-260,120],[0,120],[260,120]].slice(0, n);
      const base = slots.map(() => cols[Math.floor(r() * cols.length)]);
      const alt = cols[(cols.indexOf(base[0]) + 2) % cols.length];
      const draw = (cs) => slots.forEach(([x, y], i) => { ctx.fillStyle = cs[i]; ctx.fillRect(CX + x - 60, CY + y - 60, 120, 120); });
      if (s < 100) draw(base);
      else if (s >= 1000) draw(base.map((c, i) => (i === 0 ? alt : c)));
    } }])),
  'search-feature': { duration: T0 + 7000, events: [READY], draw: (t) => {
    if (t < INTRO) return intro('Visual search · Feature target', ['Find the red vertical bar.', 'Respond when you find it.'])();
    if (t < T0) return fixation();
    for (let i = 0; i < 48; i++) { const x = CX - 420 + (i % 8) * 120, y = CY - 200 + Math.floor(i / 8) * 90;
      ctx.fillStyle = i === 27 ? '#e53935' : '#1e88e5'; ctx.fillRect(x - 4, y - 26, 8, 52); }
  }},
  'search-conjunction': { duration: T0 + 7000, events: [READY], draw: (t) => {
    if (t < INTRO) return intro('Visual search · Conjunction target', ['Find the red vertical bar.', 'Red horizontal and blue vertical bars are distractors.'])();
    if (t < T0) return fixation();
    for (let i = 0; i < 48; i++) { const x = CX - 420 + (i % 8) * 120, y = CY - 200 + Math.floor(i / 8) * 90;
      const target = i === 27; const red = target || i % 2 === 0; const vertical = target || i % 2 === 1;
      ctx.fillStyle = red ? '#e53935' : '#1e88e5';
      if (vertical) ctx.fillRect(x - 4, y - 26, 8, 52); else ctx.fillRect(x - 26, y - 4, 52, 8); }
  }},
  // Metcalfe & Wiebe (1987): three-move worked solution. Title at top, puzzle centred below it.
  'triangle': { duration: T0 + 12000, events: [READY, { t: T0 + 2000, hz: 800, dur: 0.06 }, { t: T0 + 4000, hz: 800, dur: 0.06 }, { t: T0 + 6000, hz: 800, dur: 0.06 }], draw: (t) => {
    if (t < INTRO) return intro('Metcalfe & Wiebe (1987) · Triangle problem', ['Ten dots form a point-up triangle.', 'Move three dots to make the triangle point down.'])();
    if (t < T0) return fixation();
    const s = t - T0;
    const sx = 80, sy = 70, ox = CX, oy = 300;
    const P = (x, y) => [ox + x * sx * 2, oy + y * sy];
    const start = [[0,0],[-0.5,1],[0.5,1],[-1,2],[0,2],[1,2],[-1.5,3],[-0.5,3],[0.5,3],[1.5,3]];
    const moves = [
      { from: [0,0], to: [0,4], t0: 2000, t1: 3000 },
      { from: [-1.5,3], to: [-1.5,1], t0: 4000, t1: 5000 },
      { from: [1.5,3], to: [1.5,1], t0: 6000, t1: 7000 },
    ];
    const ease = (u) => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
    const pos = start.map(p => p.slice());
    moves.forEach(m => { const u = ease((s - m.t0) / (m.t1 - m.t0)); const i = pos.findIndex(p => p[0] === m.from[0] && p[1] === m.from[1]);
      if (i >= 0 && s >= m.t0) pos[i] = [m.from[0] + (m.to[0] - m.from[0]) * u, m.from[1] + (m.to[1] - m.from[1]) * u]; });
    pos.forEach(([x, y]) => { const [px, py] = P(x, y); ctx.fillStyle = '#e8e8e8'; ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.fill(); });
    text(s < 8000 ? 'Move three dots to make the triangle point down' : 'Worked solution: three dots moved', CX, 90, 30, '#8fb0c9');
  }},
};
window.sceneList = scenes;
window.renderScene = (id, ms) => { const s = scenes[id]; ctx.fillStyle = '#0b0b0c'; ctx.fillRect(0, 0, W, H); s.draw(ms); return s.duration; };
window.sceneReady = true;
