const CACHE='sectorzero-companion-public-v04-3';
const ASSETS=['./','./index.html','./styles.css','./mobile.css','./companion-core.js','./idle-ascent.js','./app.js','./seed.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  // Release-tagged network requests avoid stale browser/CDN/previous-worker assets.
  // Store responses under canonical keys so ordinary offline launches still match.
  const cache=await caches.open(CACHE);
  try{for(const asset of ASSETS){const key=new URL(asset,self.registration.scope),request=new URL(key);request.searchParams.set('sz_release',CACHE);const response=await fetch(new Request(request,{cache:'reload'}));if(!response.ok)throw Error('Unable to cache '+asset);await cache.put(key.href,response)}}
  catch(error){await caches.delete(CACHE);throw error}
  // Wait for old clients to close. No forced reload or skipWaiting.
})()));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('sectorzero-companion-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request)).then(cached=>cached||fetch(event.request)))});
