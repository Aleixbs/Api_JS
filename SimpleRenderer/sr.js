require ([
    "esri/map",

    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",

    "esri/renderers/SimpleRenderer", 
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",

    "esri/dijit/PopupTemplate",

    "esri/layers/LayerDrawingOptions",

    "esri/dijit/Legend",

    "dojo/domReady!"

    ], function(

        Map, 

        FeatureLayer, 
        ArcGISDynamicMapServiceLayer, 

        SimpleRenderer, 
        SimpleMarkerSymbol, 
        SimpleLineSymbol, 
        Color, 

        PopupTemplate,

        LayerDrawingOptions,

        Legend

    ){

    // Creamos un mapa
        var map = new Map("map", {
            basemap: 'satellite', 
            center: [-117.19, 34.05], 
            zoom: 6
        })
    
        
    // Añadimos el popup que hará un display de la información de cada terremoto

        var popup = new PopupTemplate({
            title: "Magnitud del Terremoto: {MAGNITUDE}", 
            description: "<b>Localización:</b> <br> {PLACE}", 
            fieldInfos: [{
                fieldName: "",
                format: {places: '', }
            }
            ]
        })
        

    // Cargamos las capas de Usa(webmap) y capa de terremotos

        var usaUrl = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'
        var terremotosUrl = 'https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0'

        var usaFL = new ArcGISDynamicMapServiceLayer(usaUrl,{opacity: 0.8})
        usaFL.setVisibleLayers([0, 1, 2]);

        var terremotosFL = new FeatureLayer(terremotosUrl, {
            outFields: ["MAGNITUDE","PLACE"], 
            infoTemplate: popup
        })

    // Creamos la función por la cuál se establecerán los parámetros condicionales para su visualización
    
        function createSymbol(){
            var line = new SimpleLineSymbol().setStyle(SimpleLineSymbol.STYLE_NULL);
            return new SimpleMarkerSymbol().setColor(new Color([255, 0, 0, 0.25])).setOutline(line)
        }

    // Generamos un renderer que pintará el tamaño de los terremotos según su magnitud

        var terremotosRnd = new SimpleRenderer(createSymbol());
        
        terremotosRnd.setVisualVariables([{
            type: "sizeInfo",
            field: "MAGNITUDE",
            minSize: 5,
            maxSize: 50,
            minDataValue: 0.50,
            maxDataValue: 4.48
          }]);

    // Añadimos el renderer a la capa de terremotos

        terremotosFL.setRenderer(terremotosRnd, "MAGNITUDE");


    //Creamos un listener para el botón on click para ejecutar el renderizado de los estados


    // Generamos un renderer que establecerá un estilo distinto a los estados en función de la población 


    // Añadimos el renderer a la capa de los estados
        

    // Añadimos las capas al mapa 

        map.addLayers([usaFL, terremotosFL])

    // Añadimos una leyenda 

        var leyenda = new Legend({
            map: map,
            layerInfos: [{ 
                layer: terremotosFL,
                title: "Magnitud del Terremoto", 
            }
        ]}, 'legend')

        leyenda.startup()

});