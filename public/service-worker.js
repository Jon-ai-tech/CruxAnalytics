// Business Case Analyzer Pro - Service Worker
// Version 1.0.0

const CACHE_NAME = 'bca-pro-v1';
const RUNTIME_CACHE = 'bca-pro-runtime';

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
  console.log('[Service Worker] Installing...');
  
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
  console.log('[Service Worker] Activating...');
  
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

  // Estrategia: Cache First para assets estáticos
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Estrategia: Network First para HTML y datos dinámicos
  if (
    request.destination === 'document' ||
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
    console.log('[Service Worker] Cache hit:', request.url);
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
  // Aquí se podría implementar sincronización con servidor
  // Por ahora, solo log
}

console.log('[Service Worker] Loaded successfully');
