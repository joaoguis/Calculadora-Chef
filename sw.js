const V='cc-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./index.html','./logo.png']).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url),own=u.origin===location.origin,font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname),img=/supabase\.co$/.test(u.hostname)&&u.pathname.indexOf('/storage/v1/object/public/')===0;
  if(!(own||font||img))return;
  e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:own}).then(m=>m||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
