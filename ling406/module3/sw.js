const CACHE = 'ling406-module3-3';
const SHELL = ['../module-navigation.js?v=modules-2', './', 'index.html', 'data.js?v=module3-1', 'app.js?v=module1-available-1',
  '../quiz-engine.js', '../style.css?v=ling406-transcripts-v3',
  '../transcripts-v5.css?v=ling406-transcripts-v5',
  '../../studio-gradients.css?v=studio-gradients-1',
  '../../reader-timer.js', '../../reader-timer.css?v=reader-timer-1',
  '../../course-switcher.js', '../../course-switcher.css?v=course-switcher-1'];
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && response.status === 200 && !event.request.headers.has('range')) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {}));
    }
    return response;
  }).catch(async () => {
    const cache = await caches.open(CACHE);
    return await cache.match(event.request) ||
      (event.request.mode === 'navigate' ? await cache.match('./') : null) || Response.error();
  }));
});
// Only this module's cache is used. Other courses' offline content is untouched.
