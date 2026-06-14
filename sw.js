const CACHE_NAME = 'infodash-cache-v4';
const ASSETS = [
    './',
    './index.html',
    './css/index.css',
    './js/api_v4.js?v=4',
    './js/app_v4.js?v=4',
    './js/metaphysical_hub.js?v=4',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS).catch(err => {
                console.warn('SW cache pre-fill skipped asset:', err);
            });
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // Only cache GET requests and non-API requests
    if (event.request.method !== 'GET' || 
        event.request.url.includes('/api/') || 
        event.request.url.includes('api.opap.gr') || 
        event.request.url.includes('coingecko') || 
        event.request.url.includes('rss2json') ||
        event.request.url.includes('site.api.espn.com') ||
        event.request.url.includes('pamestoixima.gr')) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(() => {
                // Return offline fallback if needed
            });
        })
    );
});
