var mapMain;

require([
        "esri/map",

        "esri/graphic",
        "esri/toolbars/draw",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/Color",

        "esri/tasks/Geoprocessor",
        "esri/tasks/FeatureSet",
        "esri/tasks/LinearUnit",

        "dojo/on",
        "dojo/parser",

        "dojo/domReady!"

    ], function (
        Map,

        Graphic,
        Draw,
        SimpleMarkerSymbol,
        SimpleFillSymbol,
        Color,

        Geoprocessor,
        FeatureSet,
        LinearUnit,

        on,
        parser
        ){

        // Parse DOM nodes decorated with the data-dojo-type attribute
        parser.parse();


        // Create the map
        mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 12
            });

        //Pintar un punto (crear la capacidad de hacer un draw en la capa grafica del mapa (map graphics layer))

        var drawingTool = new Draw(mapMain, {})

        function newDraw(){

            mapMain.graphics.clear()

            drawingTool.activate(Draw.POINT)
        }

        //Creamos un botón para iniciar la edición
        var boton = document.getElementById('boton')

        boton.addEventListener('click', newDraw) // mapMain.on('load',newDraw)

        


        //Crear una función que pinte el punto en una capa grafica
        var capaEditable;
        function addToMap(event){

            drawingTool.deactivate(); 

            var pointSymbol = new SimpleMarkerSymbol();
            pointSymbol.setColor(new Color([255,255,0,0.25]));
    
            capaEditable = new Graphic(event.geometry,pointSymbol);
            mapMain.graphics.add(capaEditable); 

            addViewshed(capaEditable)
        }
      
        //Recojer el evento de pintar un punto y ejecutamos la función de añadirlo al mapaa
        drawingTool.on('draw-end', addToMap) 
        

        //Lanzar la petición al servicio de geoprocesamiento viewshed
        viewshedUrl = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Elevation/ESRI_Elevation_World/GPServer/Viewshed'

        
        //Creamos la función que añadirá el viewshed al mapa
        function addViewshed(mapFeatures){

            var viewshedGP = new Geoprocessor(viewshedUrl)
                viewshedGP.outputSpatialReference = mapMain.spatialReference
            
            var puntos = []
            puntos.push(mapFeatures);

            var puntosObservador = new FeatureSet()
            puntosObservador.features = puntos; 

            var distanciaObservador = new LinearUnit(); 
            distanciaObservador.distance = 5;
            distanciaObservador.units = "esriKilometers";

            var params = {
                "Input_Observation_Point": puntosObservador, 
                "Viewshed_Distance": distanciaObservador }

            viewshedGP.execute(params,drawViewshed);   
            
        }

        

        //Devolver la petición de servicio de geoprocesamiento y creamos la simbología que será representada en el mapa
        function drawViewshed(results, messages){

            var polySymbol = new SimpleFillSymbol();
            polySymbol.setColor(new Color([255, 127, 0, 0.7]));

            var resultFeatures = results[0].value.features;
            console.log(resultFeatures)

            resultFeatures.forEach(feature => {
                feature.setSymbol(polySymbol);
                mapMain.graphics.add(feature);
            });

        }
            
           
});
           
