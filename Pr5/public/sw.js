
self.addEventListener("install", event => { console.log("Service Workers installing... ", event);
event.waitUntil(
    caches.open("static").then(cache => { console.log("Servise Workers Precache...", cache); cache.add("/src/js/app.js");
    })
    );
    
});

self.addEventListener("activate", event => { console.log("Activating Service Workers ", event); return self.clients.claim()
});

self.addEventListener("fetch", event => { console.log("Fetching something... ", event); event.respondWith(fetch(event.request))
event.respondWith( caches.match(event.request).then(response => { if (response) {
    return response;
    } else {
    return fetch(event.request);
    }
    })
    );
    
});
