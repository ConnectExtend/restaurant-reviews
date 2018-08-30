/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {

  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(
            names
              .filter(name => name !== CACHE_VERSION)
              .map(cache => caches.delete(cache))
      ))
      .catch(err => {
        throw err;
      })
  );

});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE_VERSION)
      .then(cache => cache.match(e.request)
          .then(match => {

            if (match) {
              return match;
            }

            return fetch(e.request).then(response => {
              cache.put(e.request, response.clone());
              return response;
            });

          })
          .catch(err => {
            throw err;
          }))
      .catch(err => {
        throw err;
      })
  );
});