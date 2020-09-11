let CACHE_NAME = "weather-web-app";
// let filesToCache = [
//   // "public/images",
//     "resources/css/app.css",
//     "resources/js/app.js",
//     "environment.php",
//     "index.php",
// ];

// Function calls
install();
activate();
cacheFetchRequest();

/******
 * opens the cache filename for this app if exists
 * caches the app files and installs the service worker.
 */
function install(){
    self.addEventListener("install", (event) => { 
        console.log("Service Worker: Installed");
        // event.waitUntil(
        //     caches.open(CACHE_NAME).then((cache) => {
        //         console.log("Opened cache");
        //         cache.addAll(filesToCache);
        //     })
        //     .then(() => self.skipWaiting())
        // );
    });
}

/********
 * activating the service worker.
 * clearing of the old caches.
 */
function activate(){
    self.addEventListener("activate", (event) => {
        console.log("Service Worker: Activated")
        // event.waitUntil(
        //     caches.keys()
        //         .then(CACHE_NAME => {
        //             Promise.all(
        //                 CACHE_NAME.map(cache => {
        //                     if (cache != CACHE_NAME){
        //                         console.log("Service Worker: Clearing old Cache");
        //                         caches.delete(cache);
        //                     }
        //                 })
        //             )
        //         })
        // );
    });
}

/*****
 * service worker fetch function.
 * add responses to cache
 */
function cacheFetchRequest(){
    self.addEventListener('fetch', event => {
        event.respondWith(
            fetch(event.request)
            .then(res => {
                const resClone = res.clone();

                caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, resClone);
                    })
                return res
            })
            .catch(err => caches.match(event.request).then(res => res))
        );
    });
}

