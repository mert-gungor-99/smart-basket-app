// v3 - GH Pages için SPA fallback
const CACHE = 'smart-basket-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

// Network-first for navigation with offline fallback to index.html (SPA)
self.addEventListener('fetch', e => {
  const req = e.request;

  // Navigation requests (avoid GH Pages 404 in PWA)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Static assets: cache-first
  if (req.method === 'GET' && (req.url.includes('icons/') || req.url.endsWith('manifest.json'))) {
    e.respondWith(
      caches.match(req).then(res => res || fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return r;
      }))
    );
  }
});
