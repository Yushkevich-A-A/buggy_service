const version = 'v2';

const cacheName = `app = ${version}`;

const files = [
  './',
  './index.html',
  './index.bundle.js',
  './main.css',
  './patternbg.png',
];

async function putFilesToCache(data) {
  const cache = await caches.open(cacheName);
  await cache.addAll(data);
}

async function removeOldCache(retain) {
  console.log('удаление');
  const keys = await caches.keys();
  return Promise.all(
    keys.filter((key) => !retain.includes(key))
      .map((key) => caches.delete(key)),
  );
}

self.addEventListener('install', (event) => {
  console.log('установлен');
  event.waitUntil((async () => {
    await putFilesToCache(files);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  console.log('активирован');
  event.waitUntil((async () => {
    await removeOldCache([cacheName]);
    await clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(event.request);
  })());
});
