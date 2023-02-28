
require ([
    "esri/map",
    "esri/layers/FeatureLayer",

    "esri/renderers/UniqueValueRenderer",
    "esri/Color",
    "esri/symbols/SimpleLineSymbol",

    "esri/dijit/Legend",


    "dojo/domReady!"

    ], function(
        Map,
        FeatureLayer, 

        UniqueValueRenderer, 
        Color, 
        SimpleLineSymbol, 

        Legend
    ){

    //crear el mapa 

    var map = new Map("map", {
        basemap: "dark-gray", 
        center: [0,40], 
        zoom: 11
    })

    //cargar la capa de carreteras  

    var servicioCarreterasurl = 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Red_de_carreteras_en_Espa%c3%b1a/FeatureServer/0'

    var carreteras = new FeatureLayer(servicioCarreterasurl, {
        mode: FeatureLayer.MODE_AUTO, 
        outFields:["claseD"]
    })

    //Declarar cómo se creará el símbolo

    function createSymbol(color,width){
        return new SimpleLineSymbol()  
        .setColor(new Color(color))
        .setWidth(width)
    }; 
  
    //Hacer un render con los distintos campos  

    var renderizador = new UniqueValueRenderer( createSymbol("#d9d9d9",1), "claseD")
    
    //Marcar los valores únicos 

    renderizador.addValue("Autopista",createSymbol('#ffff02',4)); 
    renderizador.addValue("Carretera convencional", createSymbol('#ffff',2))
    renderizador.addValue("Camino", createSymbol('#ff0000',1))
    renderizador.addValue("Urbano", createSymbol('#ffff00',1))
    renderizador.addValue("Autovía", createSymbol('#ffff00',4))
    renderizador.addValue("Carretera multicarril", createSymbol('#ffff00',1))
    renderizador.addValue("Carril bici", createSymbol('#ffff00',0.5))
    renderizador.addValue("Senda", createSymbol('#ffff00',0.5))

    //Añadir el renderizador a la capa 

    carreteras.setRenderer(renderizador)

    //Añadir la capa al mapa

    map.addLayer(carreteras)

    //Añadir la leyenda 

    var leyenda = new Legend({
        map: map,
        layerInfos: [{ 
            layer: carreteras,
            title: "Tipos de Carretera"
        }
      ]}, 'legend')

    leyenda.startup()

});