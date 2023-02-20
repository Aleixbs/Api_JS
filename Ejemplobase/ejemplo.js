// Llamamos a la api de Javascript con el requiere que pide un array y una función con los elementos del array
// require([elementos de dojo y esri], function(elementos de dojo y esri){})
require(

    ["esri/map", 
    'dojo/on',
    'dojo/dom', 
    'esri/geometry/Point',
    "dojo/domReady!"],

    function(Map, on, dom, Point){
        // Añadimos un mapa en el id indicado y con las características indicadas new Map('iddiv',{características})
        var myMap = new Map('divMap', {
            basemap : 'hybrid', 
            center : [-3,40],
            scale: 30000
            // zoom: 13, 
        });

        // Selección del botón
        var boton = dom.byId('boton'); // == document.getElementById

        // Agregamos el evento al que debe reaccionar
        on(boton,'click',goTo); // == boton.addEventListener('click', goTo)

        // Escribimos al función que hará el botón al reaccionar
        function goTo(){
            var punto = new Point(-70,-33)
            myMap.centerAt(punto) // == myMap.centerAndZoom(punto,13)
        };

        // Un evento propio del mapa myMap.on('evento a reaccionar', function())
        myMap.on('extent-change', showExtent)

        // Función que ejecutará el evento
        function showExtent(){

            // Con getZoom() obtenemos el nivel de zoom actual del mapa
            var zoom = myMap.getZoom();  // == myMap.zoom-end()

            // Capturamos el elemento div en el cuál queremos añadirle el texto
            var divResultado = document.getElementById('texto');  // == dom.byId('texto')

            // Añadimos el texto deseado que se irá actualizando en este caso el nivel de zoom que se incidirá en el mapa
            divResultado.innerHTML = zoom


         // En principio este código tendria que funcionar si el id esta formateado en el css (probar a ver)

            // var elementoTexto = document.createElement('div'); 
            // elementoTexto.id = 'texto'
            // elementoTexto.style.zIndex = 2;
            // elementoTexto.style.positon = absolute;
            
            // var texto = document.createTextNode(zoom);

            // elementoTexto.appendChild(texto); 
            // document.body.appendChild(elementoTexto);
            


        }
    }

);
