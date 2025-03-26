/**
 * Service Worker para o portfólio
 * Gerencia cache e funcionamento offline
 */

const CACHE_NAME = 'portfolio-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/js/app.js',
  '/js/modules/ThemeManager.js',
  '/js/modules/Navigation.js',
  '/js/modules/AnimationManager.js',
  '/js/modules/SkillsManager.js',
  '/js/modules/StatsCounter.js',
  '/js/modules/ContactForm.js',
  '/js/modules/NotificationManager.js',
  '/js/modules/BackToTop.js',
  '/assets/img/Logo/image.png',
  '/assets/img/web_development_maintenance_construction_teamwork_icon_192840.webp',
  '/fonts/main-font.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2'
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

// Estratégia de cache: Cache First, fallback para rede
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
    caches.match(event.request).then(response => {
      // Cache hit - retorna resposta do cache
      if (response) {
        return response
      }

      // Clone da requisição
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then(response => {
          // Verifica se resposta é válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          // Clone da resposta para cache
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(error => {
          console.log('Erro na requisição:', error)
          // Pode adicionar uma página offline aqui
        })
    })
  )
})
