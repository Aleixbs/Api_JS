require([
  "esri/map",
  "esri/arcgis/utils",
  "esri/dijit/Search",
  "esri/tasks/FindTask",
  "esri/tasks/FindParameters",
  "dojo/parser", 
  "dojo/domReady!"],
  function (
    Map,
    arcgisUtils,
    Search,
    FindTask, 
    FindParameters,
    parser) {
    // Parse DOM nodes decorated with the data-dojo-type attribute
    parser.parse();

    // Map centered at -117.19, 34.05
    var myMap = new Map('cpCenter', {
      basemap: 'hybrid', 
      center: [-117.19, 34.05], // lon, lat
      zoom: 6})

    

    // Construir el Search Widget
    // var searchWidget = new Search({},'button')  
    
    var find = new FindTask('https://geocode.arcgis.com/arcgis/rest/services/world/GeocodeServer');
    console.log(find)
    var params = new FindParameters(myMap); 
    console.log(params)
    console.log(params.layerIds = [2])

      searchWidget.startup()
  }
);
