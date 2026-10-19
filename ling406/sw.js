const CACHE='ling406-forest-v3';
const SHELL=['./','index.html','style.css?v=ling406-forest-v3','data.js?v=ling406-v1','quiz-engine.js?v=ling406-v1','app.js?v=ling406-v1'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return res;}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match(new URL('./',self.location).href):Response.error()))));});
