// Business Case Analyzer Pro - Service Worker
// Version 2.0.0 - Network First for scripts to ensure fresh deploys

const CACHE_NAME = 'bca-pro-v2';
const RUNTIME_CACHE = 'bca-pro-runtime-v2';

// Assets críticos para precachear
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Instalación: precachear assets críticos
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v2.0.0...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar cachés antiguas
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating v2.0.0...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: estrategia de caché
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que no sean GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar requests a APIs externas (excepto nuestra API)
  if (url.origin !== self.location.origin && !url.pathname.startsWith('/api')) {
    return;
  }

  // Estrategia: Network First para scripts JS (bundle de la app)
  // CRITICAL: Never cache-first JS bundles or updates won't be seen
  if (request.destination === 'script') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Estrategia: Cache First para imágenes y fuentes (no cambian con deploys)
  if (
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Estrategia: Network First para HTML, CSS y datos dinámicos
  if (
    request.destination === 'document' ||
    request.destination === 'style' ||
    url.pathname.startsWith('/api')
  ) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Por defecto: Network First
  event.respondWith(networkFirst(request));
});

// Estrategia Cache First: buscar en caché primero, luego red
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);

    // Retornar página offline si está disponible
    const offlinePage = await cache.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }

    throw error;
  }
}

// Estrategia Network First: intentar red primero, luego caché
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);

    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Si es un documento HTML, retornar página offline
    if (request.destination === 'document') {
      const offlinePage = await caches.open(CACHE_NAME).then(c => c.match('/offline.html'));
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
}

// Manejo de mensajes desde el cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Sincronización en segundo plano (opcional, para futuras mejoras)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-projects') {
    event.waitUntil(syncProjects());
  }
});

async function syncProjects() {
  console.log('[Service Worker] Syncing projects...');
}

console.log('[Service Worker] v2.0.0 loaded successfully');
