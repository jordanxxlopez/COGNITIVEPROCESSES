// Lecture 9 (Working Memory) stimuli. White background, dark ink, full screen 1280x720.
const W9 = 1280, H9 = 720, C9X = W9 / 2, C9Y = H9 / 2;
const GREY9 = '#9aa5ae', ACC9 = '#1e5a8a';
const INK9 = '#1d2328', SOFT = '#4a5560', ACC = '#1e5a8a', RED = '#d32f2f', BLUE = '#1565c0', GREY = '#9aa5ae';
const fill9 = (c, x, y, w, h) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
const txt9 = (s, x, y, px, c = INK9, w = '600') => { ctx.font = `${w} ${px}px "Helvetica Neue",Arial,sans-serif`; ctx.fillStyle = c; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); };
const dot9 = (x, y, r, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
const card9 = (title, lines) => () => {
  txt9(title, C9X, 170, 44, ACC, '700'); lines.forEach((s, i) => txt9(s, C9X, 300 + i * 56, 30, SOFT, '500')); };
const fix9 = () => txt9('+', C9X, C9Y, 72, INK9, '400');
const I9 = 4000, F9 = 5000; // title card 0-4 s, fixation 4-5 s, stimulus from 5 s
const READY9 = { t: F9 - 300, hz: 1000, dur: 0.15 };
const WHITE_DRAW = (draw) => (t) => { if (t < I9) return draw.intro(); if (t < F9) return fix9(); return draw.body(t - F9); };
const seq9 = (scenes) => Object.assign(window.sceneList, scenes);
window.renderScene = (id, ms) => { const s = window.sceneList[id]; ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W9, H9); s.draw(ms); return s.duration; };

// Conrad (1964): similar-sounding versus dissimilar-sounding letter lists, six letters every 750 ms.
const CONRAD = { similar: ['B', 'C', 'G', 'P', 'T', 'D'], dissimilar: ['F', 'H', 'K', 'Q', 'R', 'W'] };
const conradScene = (kind) => ({ duration: F9 + 2250 + 6 * 750 + 2000, events: [READY9], draw: WHITE_DRAW({
  intro: card9(`Conrad (1964) · ${kind === 'similar' ? 'Similar-sounding' : 'Dissimilar-sounding'} letters`,
    ['Six letters appear one after another, each for a short time.', 'Write them down in the order you saw them.']),
  body: (s) => { if (s < 2250) { const k = Math.floor(s / 750); if (k < 3) dot9(C9X - 120 + k * 120, C9Y, 7, INK9); }
    else if (s < 2250 + 6 * 750) txt9(CONRAD[kind][Math.floor((s - 2250) / 750)], C9X, C9Y, 110);
    else txt9('Write the letters in order', C9X, C9Y, 34, SOFT, '500'); } }) });

// Word length: five short words or five long words, one word per second, then recall.
const WORDS = { short: ['cat', 'pen', 'sun', 'hat', 'cup'], long: ['university', 'opportunity', 'establishment', 'international', 'circumstance'] };
const wordScene = (kind) => ({ duration: F9 + 5000 + 3000, events: [READY9], draw: WHITE_DRAW({
  intro: card9(`Word length · ${kind === 'short' ? 'Short' : 'Long'} words`,
    ['Five words appear one after another.', 'Then recall as many as you can, in any order.']),
  body: (s) => { if (s < 5000) txt9(WORDS[kind][Math.floor(s / 1000)], C9X, C9Y, 80); else txt9('Recall the words', C9X, C9Y, 34, SOFT, '500'); } }) });

// Articulatory suppression: the same word list, with and without a spoken distractor cue shown beside it.
const SUP = ['table', 'river', 'window', 'garden', 'pencil'];
const supScene = (on) => ({ duration: F9 + 5000 + 2500, events: [READY9], draw: WHITE_DRAW({
  intro: card9(`Articulatory suppression · ${on ? 'with' : 'without'} repeating aloud`,
    on ? ['Repeat "the the the" aloud while the words appear.', 'Then recall the words.'] : ['Five words appear one after another.', 'Then recall the words.']),
  body: (s) => { if (on) txt9('Say "the the the" aloud', C9X, 90, 30, RED, '600');
    if (s < 5000) txt9(SUP[Math.floor(s / 1000)], C9X, C9Y, 80); else txt9('Recall the words', C9X, C9Y, 34, SOFT, '500'); } }) });

// Brooks (1968) sentence task: judge each word as noun or not; answer by pointing at Yes/No or by speaking.
const SENT = ['The', 'dog', 'ran', 'over', 'the', 'hill'];
const NOUN = [false, true, false, false, false, true];
const brooksSent = (mode) => ({ duration: F9 + 8000, events: [READY9], draw: WHITE_DRAW({
  intro: card9(`Brooks (1968) · Sentence task, ${mode === 'point' ? 'pointing' : 'speaking'} answers`,
    ['Read the sentence and judge each word.', mode === 'point' ? 'Point to Yes or No for each word.' : 'Say Yes or No aloud for each word.']),
  body: (s) => {
    txt9('The dog ran over the hill', C9X, 110, 34, SOFT, '500');
    const k = Math.min(SENT.length - 1, Math.floor(Math.max(0, s - 1000) / 1000));
    if (s < 1000) return;
    txt9(SENT[k], C9X, 230, 72, INK9);
    const yx = C9X - 120, nx = C9X + 120, y = 380;
    if (mode === 'point') {
      ctx.strokeStyle = GREY9; ctx.lineWidth = 3;
      ctx.strokeRect(yx - 80, y - 36, 160, 72); ctx.strokeRect(nx - 80, y - 36, 160, 72);
      txt9('Yes', yx, y, 30, INK9, '600'); txt9('No', nx, y, 30, INK9, '600');
      const target = NOUN[k] ? yx : nx; const p = ((s - 1000) % 1000) / 1000;
      const u = Math.min(1, Math.max(0, (p - 0.2) / 0.5)); // pointer travels from the word to the box between 20% and 70% of the word time
      const px = C9X + (target - C9X) * u, py = 300 + (y - 36 - 300) * u;
      if (p >= 0.7) { ctx.fillStyle = 'rgba(30,90,138,0.18)'; ctx.fillRect(target - 80, y - 36, 160, 72); }
      dot9(px, py, 12, ACC9);
    } else {
      txt9('Say "Yes" or "No" aloud', C9X, y, 32, SOFT, '500');
    }
  } }) });

// Brooks (1968) F task (white version): memorize the block F, walk its outline, answer each corner.
const FC9 = [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[0,2],[1,2],[2,2],[0,3],[0,4]];
const WALK9 = [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[2,2],[1,2],[1,3],[0,3],[0,4]];
const brooksF = () => ({ duration: F9 + 10000, events: [READY9], draw: WHITE_DRAW({
  intro: card9('Brooks (1968) · Remembering the F', ['Memorize the block letter F.', 'Then walk its outline in your mind and answer for each corner.']),
  body: (s) => { const cs = 56, ox = C9X - 2.5 * cs, oy = C9Y - 2.5 * cs - 10;
    if (s < 3500) { FC9.forEach(([i, j]) => fill9(INK9, ox + i * cs, oy + j * cs, cs - 4, cs - 4)); txt9('Memorize the F', C9X, oy + 5 * cs + 40, 26, SOFT, '500'); }
    else if (s < 4000) txt9('Now the response sheet', C9X, C9Y, 30, SOFT, '500');
    else { for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { ctx.strokeStyle = GREY; ctx.lineWidth = 2; ctx.strokeRect(ox + i * cs, oy + j * cs, cs - 4, cs - 4); }
      const k = Math.min(WALK9.length - 1, Math.floor((s - 4000) / 600));
      WALK9.slice(0, k + 1).forEach(([i, j], n) => dot9(ox + i * cs + (cs - 4) / 2, oy + j * cs + (cs - 4) / 2, 9, n === k ? RED : 'rgba(211,47,47,0.35)'));
      txt9('Walk the outline and answer for each corner', C9X, oy + 5 * cs + 40, 26, SOFT, '500'); } } }) });

// Episodic buffer: a meaningful sentence (chunked) versus the same words scrambled; one word per 600 ms.
const SENTENCE = 'the old man slowly crossed the quiet street'.split(' ');
const SCRAM = ['street', 'slowly', 'the', 'quiet', 'man', 'crossed', 'old', 'the'];
const epScene = (kind) => ({ duration: F9 + 8 * 600 + 3000, events: [READY9], draw: WHITE_DRAW({
  intro: card9(`Episodic buffer · ${kind === 'sentence' ? 'Meaningful sentence' : 'Scrambled words'}`,
    ['Words appear one at a time.', 'Then recall them in order.']),
  body: (s) => { const list = kind === 'sentence' ? SENTENCE : SCRAM; const k = Math.floor(s / 600);
    if (k < list.length) txt9(list[k], C9X, C9Y, 70); else txt9('Recall the words in order', C9X, C9Y, 34, SOFT, '500'); } }) });

seq9({
  'L9-conrad-similar': conradScene('similar'), 'L9-conrad-dissimilar': conradScene('dissimilar'),
  'L9-wordlength-short': wordScene('short'), 'L9-wordlength-long': wordScene('long'),
  'L9-suppression-without': supScene(false), 'L9-suppression-with': supScene(true),
  'L9-brooks-sentence-point': brooksSent('point'), 'L9-brooks-sentence-speak': brooksSent('speak'),
  'L9-brooks-F': brooksF(), 'L9-episodic-sentence': epScene('sentence'), 'L9-episodic-scrambled': epScene('scrambled'),
});
window.sceneReady = true;

// Vogel et al. (2005): arrow cues the LEFT side. Relevant = red bars on the cued side only.
// Distractor condition adds blue bars on the uncued (right) side. Test: one cued red bar may change orientation.
const VG = { left: [[330, 250], [330, 380], [330, 510]], right: [[950, 250], [950, 380], [950, 510]] };
const bar9 = (x, y, vertical, c) => { ctx.fillStyle = c; const w = vertical ? 14 : 64, h = vertical ? 64 : 14; ctx.fillRect(x - w / 2, y - h / 2, w, h); };
const vogelScene = (distract) => ({ duration: F9 + 200 + 100 + 900 + 2000 + 1500, events: [READY9, { t: F9 + 200, hz: 1200, dur: 0.02 }, { t: F9 + 200 + 100 + 900, hz: 1200, dur: 0.02 }], draw: WHITE_DRAW({
  intro: card9(`Vogel et al. (2005) · ${distract ? 'With blue distractors' : 'Relevant items only'}`,
    ['An arrow points to one side. Remember the red bars on that side.', distract ? 'Ignore the blue bars on the other side.' : 'There are no distractors in this trial.']),
  body: (s) => {
    if (s < 200) { txt9('←', C9X, C9Y, 110, INK9, '600'); return; }
    if (s < 300) return;
    const orientations = [true, false, true];
    if (s < 400) {  // memory array, 100 ms
      VG.left.forEach(([x, y], i) => bar9(x, y, orientations[i], RED));
      if (distract) VG.right.forEach(([x, y], i) => bar9(x, y, i % 2 === 0, BLUE));
      return; }
    if (s < 1300) return; // retention blank, 900 ms
    // test array, 2 s; the middle cued red bar changes orientation on change trials
    VG.left.forEach(([x, y], i) => bar9(x, y, i === 1 ? !orientations[1] : orientations[i], RED));
    if (distract) VG.right.forEach(([x, y], i) => bar9(x, y, i % 2 === 0, BLUE));
  } }) });
seq9({ 'L9-vogel-relevant': vogelScene(false), 'L9-vogel-distractors': vogelScene(true) });
