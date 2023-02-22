require([
    "esri/map",
    "esri/arcgis/utils",
    "esri/dijit/Search",
    "dojo/parser", 
    "dojo/domReady!"
    ], 
    function (Map,arcgisUtils,Search,parser) {
        // Parse DOM nodes decorated with the data-dojo-type attribute
        parser.parse();


        // var myMap = arcgisUtils.createMap('7d987ba67f4640f0869acb82ba064228','cpCenter')

            //Creamos el mapa sobre el que se generara la  búsqueda
        var myMap = new Map("cpCenter", {
            basemap: "hybrid",
            center: [-120.435, 46.159], // lon, lat
            zoom: 6})
        
            // Creamos un widget de búsqueda asociado al mapa
        var searchWidget = new Search({
            map : myMap,
            allPlaceholder: '120 W Yakima Ave, Yakima', 
            maxSuggestions : 4, 
            minCharacters: 4
        },'divSearch'); 

        searchWidget.startup();
    }
);
