require([
  "esri/map",
  "esri/dijit/Directions",
  "dojo/parser", 
  "dojo/domReady!"

], function (
  Map,
  Directions,
  parser
  ) {

  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  //Smooth zooming and centering
  esriConfig.defaults.map.panDuration = 2500; // default panDuration: 350
  esriConfig.defaults.map.panRate = 1; // default panRate: 25
  esriConfig.defaults.map.zoomDuration = 2500; // default zoomDuration: 500
  esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25

  
  //Cargar el Mapa
  var myMap = new Map("cpCenter", {
    basemap: "hybrid",
    center: [-120.435, 46.159], // lon, lat
    zoom: 6})

  

  //Cargar el servicio de rutas que usaremos 
  var enrouting = 'http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World'

  //Configurar Widget de direcciones
  var directionOutput = new Directions({
    map : myMap, 
    centerAtSegmentStart: true, 
    routeTaskUrl: enrouting
  }, 'divDirections');

  directionOutput.startup()

});
