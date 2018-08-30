/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'v1';

self.addEventListener('activate', e => {

  console.log("running activate")

  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(
            names
            .filter(name => name !== CACHE_VERSION)
            .map(cache => caches.delete(cache))
        ))
      .catch(err => {
        console.log("oops??")
        throw err;
      })
  );

});

self.addEventListener('fetch', e => {
  e.repondWith(
    caches.open(CACHE_VERSION)
      .then(cache => {
        console.log(`found ${  cache}`)
        return cache.match(e.request)
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
          });
      })
      .catch(err => {
        throw err;
      })
  );
});