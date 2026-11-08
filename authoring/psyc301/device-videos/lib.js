// Stage: a realistic CRT-style monitor in 3D; the screen face is a 2D canvas redrawn each frame.
import * as THREE from 'three';
const W = 960, H = 600;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1); renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#1a1c20');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 100); cam.position.set(0, 0.9, 13.5); cam.lookAt(0, -0.3, 0);
scene.add(new THREE.HemisphereLight('#ffffff', '#303540', 1.1));
const key = new THREE.DirectionalLight('#ffffff', 1.4); key.position.set(-3, 4, 6); key.castShadow = true; scene.add(key);
// Desk surface
const desk = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshStandardMaterial({ color: '#2a2e35', roughness: 0.9 }));
desk.rotation.x = -Math.PI / 2; desk.position.y = -2.2; desk.receiveShadow = true; scene.add(desk);
// Monitor body (beige CRT-like housing with rounded bezel)
const shell = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.9, 2.2), new THREE.MeshStandardMaterial({ color: '#c9c3b2', roughness: 0.55 }));
shell.position.set(0, 0.1, -1.2); shell.castShadow = true; scene.add(shell);
const bezel = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 4.2), new THREE.MeshStandardMaterial({ color: '#16181b', roughness: 0.4 }));
bezel.position.set(0, 0.1, 0.0); scene.add(bezel);
// Screen face: canvas texture
const sc = document.createElement('canvas'); sc.width = 1024; sc.height = 768;
const ctx = sc.getContext('2d');
const tex = new THREE.CanvasTexture(sc); tex.colorSpace = THREE.SRGBColorSpace;
const face = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 3.75), new THREE.MeshBasicMaterial({ map: tex }));
face.position.set(0, 0.1, 0.02); scene.add(face);
// Stand
const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.2, 0.5, 32), new THREE.MeshStandardMaterial({ color: '#b8b19f', roughness: 0.6 }));
stand.position.set(0, -2.45 + 0.25, -1.2); stand.castShadow = true; scene.add(stand);
const neck = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.8), new THREE.MeshStandardMaterial({ color: '#c9c3b2' }));
neck.position.set(0, -1.8, -1.2); scene.add(neck);

window.stage = {
  W, H, ctx, sc,
  // draw(ctx, t, api) paints the screen for time t (ms) into a 1024x768 canvas.
  renderAt(draw, t) {
    ctx.save(); ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, sc.width, sc.height); ctx.restore();
    draw(ctx, t, sc.width, sc.height);
    tex.needsUpdate = true; renderer.render(scene, cam);
  },
};
window.stageReady = true;
