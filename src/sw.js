// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           return true;
//         }).map(function(cacheName) {
//           console.log("deleting cache "+ cacheName);
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('vulgus-spa').then((cache) => cache.addAll([
      // '/testRepository/',
      // '/testRepository/index.html',
      // '/testRepository/index.js',
      // '/testRepository/vulgusSPA.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  console.log('service worker activate')
})