// Additional full-screen scenes. Loaded after scenes.js. Uses its helpers (text, intro, fixation, ctx, CX, CY, T0, INTRO, READY, rng).
const S = window.sceneList;
const rect = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
const disc = (x, y, r, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
const stroke = (pts, c, w) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); };
const SUB = '#8fb0c9', LIGHT = '#f2f2f2';
const card = (title, lines) => (t) => { if (t < INTRO) intro(title, lines)(); };
const withCard = (title, lines, body) => (t) => {
  if (t < INTRO) return intro(title, lines)();
  if (t < T0) return fixation();
  return body(t - T0);
};

// Brown–Peterson (course example F Z L and 45): letters, number, 3 s count-back interval, recall.
S['brown-peterson'] = { duration: T0 + 8000, events: [READY], draw: withCard('Brown–Peterson task',
  ['Three letters are shown, then a number.', 'Count backwards aloud for three seconds, then recall the letters.'], (s) => {
    if (s < 1000) text('F   Z   L', CX, CY, 96);
    else if (s < 2000) text('45', CX, CY, 96);
    else if (s < 5000) text('Count backwards aloud', CX, CY, 30, SUB, '500');
    else text('Recall the three letters', CX, CY, 36, SUB, '500');
  }) };

// Wason (1960) 2-4-6: start triple, then participant proposals; experimenter feedback is spoken ("yes" / "no").
S['wason'] = { duration: T0 + 11000,
  events: [READY, { t: T0 + 2500, file: 'out-v2/wason-yes.aiff' }, { t: T0 + 6500, file: 'out-v2/wason-no.aiff' }, { t: T0 + 9500, file: 'out-v2/wason-yes.aiff' }],
  draw: withCard('Wason · 2–4–6 rule discovery',
    ['The experimenter says 2, 4, 6 fits a rule.', 'Propose new triples; the answer tells you whether each fits the rule.'], (s) => {
    text('Given: 2   4   6', CX, 160, 40, LIGHT, '600');
    if (s < 2000) text('Your triple: 4   6   8', CX, CY, 48);
    else if (s < 6000) text('Fits the rule', CX, CY, 40, SUB, '600');
    else if (s < 9000) text('Your triple: 1   3   5', CX, CY, 48);
    else text('Does not fit the rule', CX, CY, 40, SUB, '600');
  }) };



// Candle problem: candle, matches, tacks, box. Solution: tack the box to the wall and stand the candle on it.
const CW_ON = () => window.WHITE_THEME === true;
const CANDLE_WAX = () => CW_ON() ? '#f6e7b4' : '#020c2f';
const CANDLE_FLAME = () => CW_ON() ? '#ff9800' : '#004cff';
const CANDLE_WALL = () => CW_ON() ? '#8d7b6a' : '#7d6a58';
const CANDLE_BOX = () => CW_ON() ? '#b8895a' : '#b8895a';
S['candle'] = { duration: T0 + 12000, events: [READY], draw: withCard('Duncker · Candle problem',
  ['Attach a candle to a wall so it does not drip wax on the table.', 'Materials: a candle, matches, tacks and a box.'], (s) => {
    const boxX = s < 6000 ? CX - 250 : CX + 120, boxY = s < 6000 ? CY + 110 : CY - 40;
    rect(boxX, boxY, 140, 90, CANDLE_BOX());
    if (s < 6000) { rect(CX + 70, CY - 180, 14, 300, CANDLE_WALL()); text('Wall', CX + 200, CY - 200, 24, SUB, '500'); }
    else { rect(CX + 70, CY - 180, 14, 300, CANDLE_WALL()); disc(CX + 178, boxY - 6, 4, '#bdbdbd'); }
    if (s < 6000) { rect(CX - 330, CY + 110, 20, 90, CANDLE_WAX()); disc(CX - 320, CY + 100, 10, CANDLE_FLAME()); text('Candle', CX - 320, CY + 230, 24, SUB, '500'); }
    else { rect(CX + 178 - 10, boxY - 80, 20, 80, CANDLE_WAX()); disc(CX + 178, boxY - 88, 10, CANDLE_FLAME()); }
    if (s < 1000) text('Materials on the table', CX, 110, 26, SUB, '500');
    else if (s >= 6000) text('Solution: tack the box to the wall and stand the candle on it', CX, 110, 26, SUB, '500');
  }) };


// Luchins (1942): set 1 needs B − A − 2C = 100; set 2 has a simpler A − C = 20.
S['water-jugs'] = { duration: T0 + 16000, events: [READY], draw: withCard('Luchins (1942) · Water-jug mental set',
  ['Jug A holds 21, jug B holds 127, jug C holds 3. Get exactly 100.', 'Then a second set: A 23, B 49, C 3. Get exactly 20.'], (s) => {
    const jug = (x, cap, fill, label) => { rect(x, CY - 120, 90, 180, '#263238'); const h = 180 * fill / cap; rect(x, CY + 60 - h, 90, h, '#4fc3f7'); text(label + ' ' + fill, x + 45, CY + 110, 24, LIGHT, '600'); };
    const stage = s < 6000 ? 1 : 2;
    if (stage === 1) {
      const B = s < 1000 ? 127 : s < 2000 ? 106 : s < 3000 ? 106 : s < 4000 ? 103 : 100;
      const A = s < 2000 ? 0 : s < 2500 ? 21 : 0;
      const C = s < 3000 ? 0 : s < 4000 ? 3 : 0;
      jug(CX - 300, 21, A, 'A'); jug(CX - 80, 127, B, 'B'); jug(CX + 140, 3, C, 'C');
      text('Fill B. Pour B into A, empty A. Pour B into C twice: 127 − 21 − 6 = 100', CX, 110, 24, SUB, '500');
    } else {
      const A = s < 1000 ? 23 : 20, C = s < 1000 ? 0 : 3;
      jug(CX - 150, 23, A, 'A'); jug(CX + 50, 3, C, 'C');
      text('Simpler route: fill A, pour into C: 23 − 3 = 20', CX, 110, 26, SUB, '500');
    }
  }) };

// Tower of Hanoi, three disks: a valid seven-move solution.
S['hanoi'] = { duration: T0 + 16000, events: [READY], draw: withCard('Tower of Hanoi · Three disks',
  ['Move all three disks to the right peg.', 'Only the top disk moves, and no larger disk goes on a smaller one.'], (s) => {
    const moves = [[0,2],[0,1],[2,1],[0,2],[1,0],[1,2],[0,2]];
    const pegs = [[], [], []]; for (let d = 3; d >= 1; d--) pegs[0].push(d);
    const k = Math.min(moves.length, Math.floor(Math.max(0, s - 1000) / 1300));
    for (let i = 0; i < k; i++) { const [a, b] = moves[i]; pegs[b].push(pegs[a].pop()); }
    const baseY = CY + 140, px = [CX - 300, CX, CX + 300];
    px.forEach(x => rect(x - 5, CY - 150, 10, 290, '#78909c'));
    rect(CX - 420, baseY, 840, 14, '#546e7a');
    pegs.forEach((p, i) => p.forEach((d, j) => rect(px[i] - d * 40, baseY - (j + 1) * 34, d * 80, 30, ['#e53935', '#43a047', '#1e88e5'][d - 1])));
    text('Move ' + k + ' of 7', CX, 110, 28, SUB, '500');
  }) };


// Jellybeans (Denes-Raj & Epstein): bowl A has 1 red in 10; bowl B has 7 red in 100. Same top edge, labels clear of beads.
S['jellybeans'] = { duration: T0 + 9000, events: [READY], draw: withCard('Denes-Raj & Epstein · Jellybean choice',
  ['Bowl A: 1 red bean in 10. Bowl B: 7 red beans in 100.', 'Pick a bowl. A red bean wins one dollar.'], (s) => {
    const bowl = (x0, n, reds, cols, label) => {
      const sp = 30, top = CY - 190;
      for (let i = 0; i < n; i++) disc(x0 + (i % cols) * sp - (cols - 1) * sp / 2, top + Math.floor(i / cols) * sp, 9, i < reds ? '#e53935' : '#cfc7b8');
      text(label, x0, CY + 170, 30, SUB, '600');
    };
    bowl(CX - 260, 10, 1, 5, 'Bowl A');
    bowl(CX + 260, 100, 7, 10, 'Bowl B');
  }) };

// Two-string problem (Maier 1931): strings 260 px apart, 320 px long. Pliers tied to the right string swing toward the held left string.
S['two-strings'] = { duration: T0 + 12000, events: [READY, { t: T0 + 6000, hz: 300, dur: 0.05 }], draw: withCard('Maier (1931) · Two-string problem',
  ['Two strings hang from the ceiling, too far apart to hold both at once.', 'Use the objects provided to bring the strings together.'], (s) => {
    const top = CY - 200, len = 320, left = CX - 130, right = CX + 130;
    stroke([[left, top], [left, top + len]], '#cfd8dc', 4);
    stroke([[right, top], [right, top + len]], '#cfd8dc', 4);
    const u = s < 6000 ? 0 : Math.min(1, (s - 6000) / 2000);
    const a = 0.95 * u; // pendulum angle; at 0.95 rad the pliers reach the held string
    const ex = right - Math.sin(a) * len, ey = top + Math.cos(a) * len;
    if (u > 0) stroke([[right, top], [ex, ey]], '#cfd8dc', 3);
    disc(u > 0 ? ex : right, u > 0 ? ey : top + len, 16, '#90a4ae');
    text('Pliers', CX + 230, CY + 130, 22, SUB, '500');
    text(s < 6000 ? 'Hold one string, reach the other' : 'The pliers swing to the held string', CX, 110, 26, SUB, '500');
  }) };

// Chain problem (Metcalfe & Wiebe): four three-link chains. Open one chain's links, then close them to join the rest into one loop.
const ringAt = (x, y, open) => { ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 7; ctx.beginPath();
  if (open) ctx.ellipse(x, y - 14, 26, 40, 0, 0.9, Math.PI * 2 - 0.9); else ctx.ellipse(x, y, 26, 40, 0, 0, Math.PI * 2);
  ctx.stroke(); };
S['chain'] = { duration: T0 + 11000, events: [READY], draw: withCard('Metcalfe & Wiebe (1987) · Chain problem',
  ['Four chains of three links each.', 'Join them into one closed loop for 15 cents. Opening a link costs 2 cents; closing one costs 3 cents.'], (s) => {
    const xs = [CX - 330, CX - 110, CX + 110, CX + 330];
    if (s < 4000) {
      xs.forEach(x => [0, 1, 2].forEach(i => ringAt(x - 46 + i * 46, CY + 40, false)));
    } else if (s < 8000) {
      xs.forEach((x, c) => [0, 1, 2].forEach(i => ringAt(x - 46 + i * 46, CY + 40, c === 0)));
      text('Open the three links of the first chain (6 cents)', CX, CY + 170, 26, SUB, '500');
    } else {
      // closed loop of 12 links around an ellipse
      for (let i = 0; i < 12; i++) { const th = i / 12 * Math.PI * 2; ringAt(CX + 380 * Math.cos(th), CY + 140 * Math.sin(th) * 0.9 - 10, false); }
      text('One closed loop of 12 links: 15 cents', CX, CY, 28, SUB, '600');
    }
  }) };

// Mutilated checkerboard: 8x8 minus two opposite corners of the same colour. Removed squares marked with an X.
S['checkerboard'] = { duration: T0 + 12000, events: [READY], draw: withCard('Mutilated checkerboard',
  ['Remove two opposite corners, which are the same colour.', 'Can 31 dominoes, each covering two adjacent squares, cover the remaining 62 squares?'], (s) => {
    const cs = 56, ox = CX - 4 * cs, oy = CY - 4 * cs + 20;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const removed = s >= 3000 && ((r === 0 && c === 0) || (r === 7 && c === 7));
      rect(ox + c * cs, oy + r * cs, cs, cs, (r + c) % 2 ? '#37474f' : '#b0bec5');
      if (removed) { rect(ox + c * cs, oy + r * cs, cs, cs, '#0b0b0c'); text('×', ox + c * cs + cs / 2, oy + r * cs + cs / 2, 40, '#e53935', '700'); }
    }
    text(s < 3000 ? '8 × 8 board' : 'Two opposite corners removed', CX, 60, 28, SUB, '500');
  }) };

// Stroop (1935): name the ink colour, ignore the word. Congruent list then incongruent list.
const INK = { RED: '#e53935', BLUE: '#1e88e5', GREEN: '#43a047', YELLOW: '#fdd835' };
const wordList = (items) => items.forEach(([w, c], i) => text(w, CX, CY - 165 + i * 110, 56, INK[c], '700'));
S['stroop'] = { duration: T0 + 10000, events: [READY], draw: withCard('Stroop (1935) · Ink-colour naming',
  ['Say the ink colour of each word aloud, not the word itself.', 'Read down each list as quickly as you can.'], (s) => {
    const cong = [['RED','RED'],['BLUE','BLUE'],['GREEN','GREEN'],['YELLOW','YELLOW']];
    const incong = [['RED','BLUE'],['BLUE','GREEN'],['GREEN','YELLOW'],['YELLOW','RED']];
    if (s < 5000) { text('Matching list', CX, 120, 26, SUB, '500'); wordList(cong); }
    else { text('Mismatched list', CX, 120, 26, SUB, '500'); wordList(incong); }
  }) };

// Lexical decision: is the letter string a word? Real word, then pronounceable nonword.
S['lexical'] = { duration: T0 + 6000, events: [READY], draw: withCard('Lexical decision · Word or nonword',
  ['A letter string appears. Decide whether it is a real English word.'], (s) => {
    if (s < 1000) text('TABLE', CX, CY, 72);
    else if (s < 3000) text('Word or nonword?', CX, CY, 34, SUB, '500');
    else if (s < 4000) text('BLANE', CX, CY, 72);
    else text('Word or nonword?', CX, CY, 34, SUB, '500');
  }) };

// Müller-Lyer: equal shafts with opposing fins, then the shafts alone.
S['muller'] = { duration: T0 + 8000, events: [READY], draw: withCard('Müller-Lyer · Equal shafts',
  ['Which line is longer? Look at both shafts.'], (s) => {
    const x1 = CX - 240, x2 = CX + 240, y1 = CY - 40, y2 = CY + 40, L = 300;
    const shaft = (xa, y, dir) => stroke([[xa, y], [xa + dir * L, y]], LIGHT, 5);
    const fins = (xa, y, dir) => { stroke([[xa, y], [xa + dir * 40, y - 40]], LIGHT, 5); stroke([[xa, y], [xa + dir * 40, y + 40]], LIGHT, 5); };
    if (s < 4000) {
      stroke([[x1 - L / 2, y1], [x1 + L / 2, y1]], LIGHT, 5); fins(x1 - L / 2, y1, 1); fins(x1 + L / 2, y1, -1);
      stroke([[x2 - L / 2, y2], [x2 + L / 2, y2]], LIGHT, 5); fins(x2 - L / 2, y2, -1); fins(x2 + L / 2, y2, 1);
    } else {
      stroke([[x1 - L / 2, y1], [x1 + L / 2, y1]], LIGHT, 5);
      stroke([[x2 - L / 2, y2], [x2 + L / 2, y2]], LIGHT, 5);
      text('Both shafts are the same length', CX, CY + 160, 28, SUB, '500');
    }
  }) };

// Gestalt similarity: the same dots, first uniform, then grouped into alternating columns by colour.
S['similarity'] = { duration: T0 + 8000, events: [READY], draw: withCard('Gestalt · Similarity grouping',
  ['The dot positions never change. Only the colours change.'], (s) => {
    const cols = 12, rows = 10, sp = 42, x0 = CX - (cols - 1) * sp / 2, y0 = CY - (rows - 1) * sp / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const alt = s >= 4000 && c % 2 === 0;
      disc(x0 + c * sp, y0 + r * sp, 10, alt ? '#e53935' : '#90a4ae');
    }
    text(s < 4000 ? 'Uniform colours' : 'Columns of similar colour group together', CX, 80, 26, SUB, '500');
  }) };

// Apparent motion: two stationary discs alternate with brief gaps; no dot travels.
S['apparent'] = { duration: T0 + 8000, events: [READY], draw: withCard('Apparent motion · Alternating lights',
  ['Two discs flash one after the other. Nothing moves between them.'], (s) => {
    const period = 250, phase = Math.floor(s / period) % 2, on = (s % period) < 180;
    if (on) disc(phase ? CX + 260 : CX - 260, CY, 60, '#fdd835');
  }) };

// Donders (simple and choice reaction time): one lamp, then one of two lamps. Lamps are drawn; no response is invented.
S['donders'] = { duration: T0 + 10000, events: [READY], draw: withCard('Donders · Simple and choice response',
  ['Simple: respond as soon as the lamp lights.', 'Choice: respond to the lamp that lights, left or right.'], (s) => {
    const left = CX - 220, right = CX + 220;
    disc(left, CY, 50, '#37474f'); disc(right, CY, 50, '#37474f');
    if (s < 3000) disc(CX, CY, 50, '#fdd835');
    else if (s < 6000) { text('Choice trial', CX, 110, 26, SUB, '500'); disc(left, CY, 50, '#fdd835'); }
    else { text('Choice trial', CX, 110, 26, SUB, '500'); disc(right, CY, 50, '#fdd835'); }
  }) };

// Brooks (1968) F task: memorize a block F, then walk its outline in the response phase.
const FCELLS = [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[0,2],[1,2],[2,2],[0,3],[0,4]];
const WALK = [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[2,2],[1,2],[1,3],[0,3],[0,4]];
S['brooks'] = { duration: T0 + 11000, events: [READY], draw: withCard('Brooks (1968) · Remembering the F',
  ['Memorize the block letter F.', 'Then walk its outline in your mind and answer for each corner.'], (s) => {
    const cs = 56, ox = CX - 2.5 * cs, oy = CY - 2.5 * cs;
    if (s < 3500) { FCELLS.forEach(([i, j]) => rect(ox + i * cs, oy + j * cs, cs - 4, cs - 4, LIGHT)); text('Memorize the F', CX, oy + 5 * cs + 40, 26, SUB, '500'); }
    else if (s < 4000) text('Now the response sheet', CX, CY, 30, SUB, '500');
    else {
      for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { ctx.strokeStyle = '#37474f'; ctx.lineWidth = 2; ctx.strokeRect(ox + i * cs, oy + j * cs, cs - 4, cs - 4); }
      const k = Math.min(WALK.length - 1, Math.floor((s - 4000) / 600));
      WALK.slice(0, k + 1).forEach(([i, j], n) => { ctx.fillStyle = n === k ? '#e53935' : 'rgba(229,57,53,0.35)'; ctx.beginPath(); ctx.arc(ox + i * cs + (cs - 4) / 2, oy + j * cs + (cs - 4) / 2, 9, 0, Math.PI * 2); ctx.fill(); });
      text('Walk the outline and answer for each corner', CX, oy + 5 * cs + 40, 26, SUB, '500');
    }
  }) };

// Conrad (1964): three ready spots, then six letters serially every 750 ms, then a written-recall interval.
S['conrad'] = { duration: T0 + 9000, events: [READY], draw: withCard('Conrad (1964) · Visual letter sequence',
  ['Six letters appear one after another.', 'Write down the letters in the order you saw them.'], (s) => {
    const spots = [[CX - 120, CY], [CX, CY], [CX + 120, CY]];
    if (s < 2250) { const k = Math.floor(s / 750); if (k < 3) disc(spots[k][0], spots[k][1], 6, LIGHT); }
    else if (s < 2250 + 6 * 750) { const i = Math.floor((s - 2250) / 750); text(['B', 'C', 'F', 'M', 'P', 'X'][i], CX, CY, 96); }
    else text('Write the letters', CX, CY, 34, SUB, '500');
  }) };

// Vogel et al. (2005): cue 200 ms, memory array 100 ms (red and blue bars), 900 ms retention, 2 s test; attend to red on the cued side.
S['vogel'] = { duration: T0 + 6000, events: [READY], draw: withCard('Vogel et al. (2005) · Ignore blue distractors',
  ['An arrow cues one side. Remember the red bars on that side.', 'Ignore the blue bars.'], (s) => {
    const slots = [[-300, -140], [-300, 0], [-300, 140], [300, -140], [300, 0], [300, 140]];
    const bars = (ori, sides) => slots.forEach(([x, y], i) => {
      const red = i < 3 ? (i !== 1 || true) : false; const isRed = (i % 2 === 0);
      ctx.fillStyle = isRed ? '#e53935' : '#1e88e5';
      const w = ori ? 14 : 60, h = ori ? 60 : 14; ctx.fillRect(CX + x - w / 2, CY + y - h / 2, w, h);
    });
    if (s < 200) text('←', CX, CY, 96, LIGHT);
    else if (s < 300) { /* blank gap */ }
    else if (s < 400) bars(true);
    else if (s < 1300) { }
    else if (s < 3300) bars(false);
  }) };
