const V='verdu-v7',F=['./','index.html','manifest.json','icon.svg','config.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
/* Archivos de Firebase (versión fija): primero la copia guardada, así cargan aunque no haya internet y nunca dependen de la red del SW.
   Archivos propios: con internet siempre la versión más nueva; sin internet, la copia guardada. Solo se guardan respuestas correctas. */
self.addEventListener('fetch',e=>{const r0=e.request,u=new URL(r0.url);if(r0.method!='GET')return;
 if(u.hostname=='www.gstatic.com'){e.respondWith(caches.match(r0).then(c=>c||fetch(r0).then(r=>{if(r.ok){const k=r.clone();caches.open(V).then(x=>x.put(r0,k))}return r})));return}
 if(u.origin!=location.origin)return;
 e.respondWith(fetch(r0,{cache:'no-cache'}).then(r=>{if(r.ok){const k=r.clone();caches.open(V).then(x=>x.put(r0,k))}return r}).catch(()=>caches.match(r0,{ignoreSearch:true}).then(r=>r||(r0.mode=='navigate'?caches.match('index.html'):Response.error()))))});
