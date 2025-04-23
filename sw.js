const CACHE_NAME = "sweet-art-nana-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/favicon-196.png",
  "/icons/apple-icon-180.png",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;500;600&display=swap",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvaxkDykvGsUiCRydgU4VPqOPq3bb.png",
]

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Fetch event - serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      // Clone the request because it's a one-time use stream
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response because it's a one-time use stream
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          // Don't cache if it's a data URL
          if (!event.request.url.startsWith("data:")) {
            cache.put(event.request, responseToCache)
          }
        })

        return response
      })
    }),
  )
})
