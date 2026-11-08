const CACHE = 'moodtracker-v11';
const CACHE_PREFIX = 'moodtracker-';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];
self.addEventListener('install', event => {
  const fresh = FILES.map(file => new Request(file, {cache:'reload'}));
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(fresh)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(caches.match(event.request, {ignoreSearch:true}).then(hit => hit || fetch(event.request)));
});
