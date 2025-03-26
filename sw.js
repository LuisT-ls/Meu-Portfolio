/**
 * Service Worker para o portfólio
 * Gerencia cache e funcionamento offline
 */

const CACHE_NAME = 'portfolio-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/js/app.js'
]

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Erro ao cache recursos:', error)
        return self.skipWaiting()
      })
  )
})

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Removendo cache antigo:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Estratégia de cache: Network First, fallback para cache
self.addEventListener('fetch', event => {
  // Ignorar requisições para analytics e APIs
  if (
    event.request.url.includes('googletagmanager.com') ||
    event.request.url.includes('firebase') ||
    event.request.url.includes('gstatic.com') ||
    event.request.url.includes('emailjs')
  ) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone da resposta
        const responseToCache = response.clone()

        // Armazena no cache
        caches
          .open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache)
          })
          .catch(err => console.log('Erro ao armazenar em cache:', err))

        return response
      })
      .catch(() => {
        // Se falhar, tenta buscar do cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Se não encontrou no cache, retorna uma página offline simples para requests HTML
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html')
          }

          // Para outros tipos de recursos, retorna uma resposta vazia
          return new Response('', {
            status: 408,
            statusText: 'Request timed out.'
          })
        })
      })
  )
})
