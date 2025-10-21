// sw.js
const CACHE_NAME = 'smart-basket-v1';
const ASSETS = [
  '/',           // Vercel/Netlify için kökten servis
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // Sadece GET isteklerini cache’le
  if (request.method !== 'GET') return;

  // Basit cache-first
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        const copy = res.clone();
        // Sadece aynı origin ve başarıyla dönenları cache’e yaz
        if (request.url.startsWith(self.location.origin) && res.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return res;
      }).catch(() => {
        // İsteğe bağlı: offline fallback burada verilebilir
        return caches.match('/index.html');
      });
    })
  );
});
