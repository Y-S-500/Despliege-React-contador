
console.log("registrado");

// para cachear elementos
const CACHE_ELEMENTS = [

    "./", //nuestro sitio web
    "https://unpkg.com/react@18/umd/react.development.js", //es importante que si el sitio web tiene https devemos ponerselo hosi no abra error
    "https://unpkg.com/react-dom@18/umd/react-dom.development.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./componentes/Componentes.js",
    "./index.js",
    "./register.js"
];

const CACHE_NAME ="v3_cache_contador_react";

        // el primer evento del ser worker

// const self = this;
// self es igual o una copia de this
// proseso de instalacion:
self.addEventListener("install", (e)=>{
    // console.log(e);
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            cache.addAll(CACHE_ELEMENTS).then( ()=>{
                self.skipWaiting()
            }).catch(console.log())
        })
    )

})  ;  
    //waitUntil = espera que esto funcione , se ejecute 
                                        /*
                                        el evento install es la primera  parte del ciclo de vida de servise worker
                                        es cuando se registra se instala y al instalarse va  a cachear todas esta informacion 
                                        entonses todo el servidor nos provera esta informacion cargada en el cache y ya no nesesitamos
                                        conectarnos a internet
                                        */


//proceso de activacion:

self.addEventListener("activate", (e)=>{
    const cacheWhiteList= [CACHE_NAME];


    e.waitUntil(
        caches.keys().then((cacheNames)=>{
            console.log(cacheNames);
            return Promise.all(cacheNames.map(cacheName =>{

                return(
                cacheWhiteList.indexOf(cacheName) ===-1 && caches.delete(cacheName)
                /*
                    aca cargamos nuevos y viejos cache y eliminamos los viejos y
                    de jamos los nuevas actualisaciones
                */ 

                )
            }));
        }).then(()=>
            self.clients.claim()
            // sirve para cobrar atraves de nuestro service workep
        )
       
    )

});   
/*
 evento feth: es el que se va a disparar cada ves que abramos el inspeccionador
 va a vuscar una nueva vercion de nuestros archivos
 va a retornar las respuestas que tengan cachadas
 en caso de que tenga cachadas va a ser lan peticion y darnos una nueva cosa
*/

self.addEventListener("fetch", (e)=>{
    console.log("evento feth");

    console.log(e.request);
    e.respondWith(
        caches.match(e.request).then((res)=>{

            if (res){
                return res;
            }
            return  fetch(e.request);
        })
    );
  
});   


//NOTA IMPORTANTE : si en el inspeccionador aparesesn los engranajes es porque el servis worker lo esta serviendo