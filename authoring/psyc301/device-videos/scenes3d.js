// 3D full-screen scenes (Three.js). renderScene3d(id, ms) sets the frame at time ms.
import * as THREE from 'three';
const W = 1280, H = 720, T0 = 5000, INTRO = 4000;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1); renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#ffffff');
const cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 200);
scene.add(new THREE.HemisphereLight('#ffffff', '#222730', 1.6));
const key = new THREE.DirectionalLight('#ffffff', 2.0); key.position.set(4, 8, 6); key.castShadow = true; scene.add(key);
const fill = new THREE.DirectionalLight('#9ec5e8', 0.6); fill.position.set(-6, 2, -4); scene.add(fill);
const metal = () => new THREE.MeshStandardMaterial({ color: '#b8c2cc', metalness: 0.85, roughness: 0.3 });
const linkGeom = new THREE.TorusGeometry(0.5, 0.11, 18, 48);
const openGeom = (arc) => new THREE.TorusGeometry(0.5, 0.11, 18, 48, arc);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#eef1f4', roughness: 1 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -1.6; floor.receiveShadow = true; scene.add(floor);
const txt = document.getElementById('t');
const ease = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const isLinkClosed = (m) => m.userData.closed;
// A chain of three links laid along x; link i has its hole-axis along z (flat on the table)
function makeChain(x0, y0) {
  const g = new THREE.Group();
  const links = [];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(linkGeom, metal()); m.castShadow = true;
    m.position.set(x0 + i * 0.78, y0, 0); m.rotation.x = i % 2 ? Math.PI / 2 : 0; m.rotation.y = 0;
    m.userData.closed = true; g.add(m); links.push(m);
  }
  scene.add(g); return { g, links, x0 };
}
const chains = [];
for (let c = 0; c < 4; c++) chains.push(makeChain(-4.8 + c * 3.2, 0));
// Open-link mesh for chain 0: replace its three closed links with open arcs (gap of 0.7 rad) that rotate apart.
const openLinks = chains[0].links.map((m, i) => { scene.remove(m); const o = new THREE.Mesh(openGeom(Math.PI * 2 - 0.7), metal()); o.castShadow = true; o.position.copy(m.position); o.rotation.copy(m.rotation); o.rotation.z = 0; scene.add(o); return o; });
// closed loop of 12 links around a circle in the x-z plane (tangential hole axis alternates)
const closedCopies = openLinks.map((o, i) => { const m = new THREE.Mesh(linkGeom, metal()); m.castShadow = true; m.visible = false; scene.add(m); return m; });
const loop = []; const loopG = new THREE.Group(); loopG.scale.setScalar(1.6); scene.add(loopG);
const PITCH = 0.78, R = 12 * PITCH / (2 * Math.PI);
for (let i = 0; i < 12; i++) {
  const th = i / 12 * Math.PI * 2;
  const m = new THREE.Mesh(linkGeom, metal()); m.castShadow = true;
  m.position.set(R * Math.cos(th), 0, R * Math.sin(th));
  // hole axis alternates between the tangent and the radial direction so neighbouring links interlock
  const r = new THREE.Vector3(Math.cos(th), 0, Math.sin(th)), t = new THREE.Vector3(-Math.sin(th), 0, Math.cos(th));
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), i % 2 ? r : t);
  m.visible = false; loopG.add(m); loop.push(m);
}
const setCam = (t) => { const a = 0.15 * Math.sin(t / 2000); cam.position.set(Math.sin(a) * 2, 8.5, 11); cam.lookAt(0.8, -0.5, 0); };
const stages = [
  { until: 4000, text: 'Four chains of three links each' },
  { until: 8000, text: 'Open the three links of one chain (3 × 2 cents)' },
  { until: 11000, text: 'Use the open links to join the other three chains (3 × 3 cents)' },
  { until: 99999, text: 'One closed loop of 12 links: 15 cents' },
];
const RNG = (s) => () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
window.sceneReady3d = true;
window.scene3d = {
  duration: T0 + 16000,
  render(ms) {
    const s = Math.max(0, ms - T0); // stimulus time
    const stage = stages.find(x => s < x.until) || stages[stages.length - 1];
    if (ms < INTRO) txt.innerHTML = '<div style="font-size:40px">Metcalfe &amp; Wiebe (1987) · Chain problem</div><div style="font-size:28px;color:#e6e6e6;font-weight:500;margin-top:40px;line-height:1.6">Four chains of three links each.<br>Join them into one closed loop for 15 cents.<br>Opening a link costs 2 cents; closing one costs 3 cents.</div>';
    else txt.textContent = ms < T0 ? '' : stage.text;
    // Stage 2: opening links of chain 0 (rotate each open link on its own axis)
    chains[0].links.forEach((m, i) => { m.visible = !(s >= 4000); });
    openLinks.forEach((o, i) => {
      const u = ease((s - 4000) / 1200);
      o.visible = s >= 4000 && s < 8000 + 900;
      if (s >= 4000) { o.rotation.z = u * (i % 2 ? 0.0 : 0.0); }
    });
    // Stage 3: open links thread into chains 1..3 (move each open link to one chain's end, then close it)
    const moving = s >= 8000;
    if (moving) {
      const u = ease((s - 8000) / 2400);
      openLinks.forEach((o, i) => {
        const target = chains[i + 1];
        const endX = target.links[2].position.x + 0.78;
        o.position.x = o.position.x + (endX - o.position.x) * u;
        o.position.y = o.position.y + (0 - o.position.y) * u;
        o.rotation.y = 0; o.rotation.x = Math.PI / 2 * u * 0; // stays threaded
        const cc = closedCopies[i]; cc.position.copy(o.position); cc.rotation.copy(o.rotation);
        const closing = s >= 10000;
        o.visible = !closing && s >= 4000 && s < 11000; cc.visible = closing && s < 11000;
      });
    }
    // Stage 4: closed loop of 12 links
    const loopOn = s >= 11000;
    chains.forEach((c, ci) => c.g.visible = !loopOn);
    if (loopOn) { loop.forEach(m => m.visible = true); openLinks.forEach(o => o.visible = false); closedCopies.forEach(m => m.visible = false); loopG.rotation.y = (s - 11000) / 3000; }
    setCam(ms);
    renderer.render(scene, cam);
  },
};
const out2d = document.createElement('canvas'); out2d.width = W; out2d.height = H; const o2 = out2d.getContext('2d');
function drawText(lines, y0, px, color, weight) { o2.fillStyle = color; o2.font = `${weight} ${px}px "Helvetica Neue",Arial,sans-serif`; o2.textAlign = 'center'; o2.textBaseline = 'middle'; lines.forEach((l, i) => o2.fillText(l.t, W / 2, y0 + i * l.gap)); }
window.renderFrame3d = (ms) => {
  window.scene3d.render(ms);
  o2.fillStyle = '#ffffff'; o2.fillRect(0, 0, W, H);
  o2.drawImage(renderer.domElement, 0, 0, W, H);
  if (ms < INTRO) {
    drawText([{ t: 'Metcalfe & Wiebe (1987) · Chain problem', gap: 0 }], 150, 40, '#1e5a8a', '700');
    drawText([{ t: 'Four chains of three links each.', gap: 0 }, { t: 'Join them into one closed loop for 15 cents.', gap: 0 }, { t: 'Opening a link costs 2 cents; closing one costs 3 cents.', gap: 0 }], 300, 28, '#1d2328', '500');
  } else if (ms >= T0) {
    const s = ms - T0; const stage = s < 4000 ? 'Four chains of three links each' : s < 8000 ? 'Open the three links of one chain (3 × 2 cents)' : s < 11000 ? 'Use the open links to join the other three chains (3 × 3 cents)' : 'One closed loop of 12 links: 15 cents';
    drawText([{ t: stage, gap: 0 }], 60, 30, '#1e5a8a', '600');
  }
  return out2d.toDataURL('image/png');
};
window.renderScene3d = (id, ms) => { window.scene3d.render(ms); return window.scene3d.duration; };
