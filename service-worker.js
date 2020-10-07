const CACHE_NAME = "submissionpwa1"
var urlToCache = [
    "/",
    "nav.html",
    "index.html",
    "manifest.json",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/portfolio.html",
    "/pages/whyus.html",
    "/css/style.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/assets/icon.png",
    "/assets/background1.jpg",
    "/assets/background2.jpg",
    "/assets/background3.jpg",
    "/assets/gallery1.jpg",
    "/assets/gallery2.jpg",
    "/assets/gallery3.jpg",
    "/assets/gallery4.jpg",
    "/assets/gallery5.jpg",
    "/assets/gallery6.jpg",
    "/assets/gallery7.jpg",
    "/assets/gallery8.jpg",
    "/assets/gallery9.jpg",
    "/assets/gallery10.jpg",
    "/assets/gallery11.jpg",
    "/assets/gallery12.jpg",
]

self.addEventListener("install",function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener("fetch",function(event){
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response){
            if(response){
                console.log('SW : Gunakan aset dari cache ',response.url);
                return response;
            }

            console.log("SW : Memuat aset dari Server:", event.request.url);
            return fetch(event.request)
        })
    )
})

self.addEventListener("activate",function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("SW: Cache ",cacheName," dihapus");
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})