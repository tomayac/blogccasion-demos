const VERSION = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
    .then((cache) => {
      return cache.addAll([
        './',
        'index.html',
        'script.js',
        'style.css',
        'manifest.webmanifest'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  event.respondWith(
    caches.open(VERSION)
    .then((cache) => {
      return cache.match(request)
      .then((cacheResponse) => {
        const fetchPromise = fetch(request)
        .then((networkResponse) => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
        return cacheResponse || fetchPromise;
      });
    })
  );
});
