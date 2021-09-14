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
  const requesURL = new URL(event.request.url);
  if(!requesURL.pathname.startsWith('/getnews')) {
    // при отсутствии сети берем стартовую разметку
    event.respondWith((async () => {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
    })());
    return;
  }

  // в этом блоке возвращаем результаты запроса или результаты из кеша
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);

    try {
      const response = await fetch(event.request);
      if (response.status !== 200) {
        throw new Error('ошибка сервера');
      }
      event.waitUntil(cache.put(event.request, response.clone()));
      return response;
    } catch (e) {
      console.log(e);
      console.log('проваливаемся в кэш');
      const cachedResponse = await cache.match(event.request)
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    throw new Error('Нет сохранненных данных');
  })())
});

;
