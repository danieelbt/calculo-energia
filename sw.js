self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        "/calculo-energia/index.html",
        "/calculo-energia/style.css",
        "/calculo-energia/script.js",
        "/calculo-energia/manifest.json",
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
