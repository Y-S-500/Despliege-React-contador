// if ("serviceWorker" in navigator) {
//     console.log("si hay acseso al service worker");
    
// }

// if (navigator.serviceWorker) {
//     console.log("si hay acseso al service wprker segunda option");
    
// }


if (navigator.serviceWorker) {
    console.log("oooo");
    navigator.serviceWorker.register("./serviceWorker.js")
    // nos permite gistrar un service worker para trabajar
    // se puede encontrar asi ("./serviceWorker.js") o ("./sw.js")
}
