importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

// let Workbox handle caching resources
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
  workbox.core.skipWaiting()
  workbox.core.clientsClaim()

  workbox.routing.registerRoute(
    // Cache JS and CSS
    /bundle\.(.+)\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'bundle-cache'
    })
  )

  workbox.routing.registerRoute(
    'https://js.stripe.com/v3/',
    new workbox.strategies.CacheFirst({
      cacheName: 'stripe-lib-cache'
    })
  )

  workbox.routing.registerRoute(
    /https:\/\/maps\.googleapis\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-map-lib-cache'
    })
  )

  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60,
          purgeOnQuotaError: true
        })
      ]
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

// Response from cache
// self.addEventListener('fetch', async event => {
//   const { url } = event.request

//   if (url.startsWith('https://maps.googleapis.com/')) {
//     event.respondWith(
//       caches.open('google-map-api-cache').then(cache => {
//         return cache.match(event.request).then(response => {
//           return (
//             response ||
//             fetch(event.request).then(response => {
//               cache.put(event.request, response.clone())
//               return response
//             })
//           )
//         })
//       })
//     )
//   }
// })

// Push Notification
// self.addEventListener('push', event => {
//   event.waitUntil(
//     self.registration.showNotification('Hello', {
//       body: 'We have received a push message.',
//       icon: 'message.png',
//       tag: 'tag',
//       data: 1234,
//       actions: [
//         { action: 'like', title: 'Like', icon: 'like.png' },
//         { action: 'reply', title: 'Reply', icon: 'reply.png' }
//       ]
//     })
//   )
// })

// self.addEventListener('notificationclick', event => {
//   var messageId = event.notification.data
//   event.notification.close()
//   if (event.action == 'like') {
//     silentlyLikeItem()
//   } else if (event.action == 'reply') {
//     clients.openWindow('/messages?reply=' + messageId)
//   } else {
//     clients.openWindow('/messages?reply=' + messageId)
//   }
// })
