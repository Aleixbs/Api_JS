require([
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/graphic",

  "esri/toolbars/draw",
  "esri/symbols/SimpleFillSymbol", 
  "esri/Color",
  'esri/symbols/SimpleMarkerSymbol',

  "esri/tasks/query",

  "dojo/parser",
  'dojo/on', 
  "dojo/domReady!"
], function (
    Map, 
    FeatureLayer,
    ArcGISDynamicMapServiceLayer,
    Graphic,
    Draw,
    SimpleFillSymbol, 
    Color,
    SimpleMarkerSymbol,
    Query,
    parser, 
    on
  ) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  // Crear el mapa
  var myMap = new Map('divMap',{
    basemap: 'satellite', 
    center: [-117.19, 34.05], 
    zoom: 6
  })

  // URL variables
  // http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer
  // https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer

  var urlUsaService = 
    'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'; 
  var urlQuakesFeatureLayer = 
    'https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0';

 

  // Construct the USA layer - Ocultar capa de estados
  var mapServerLayers = new ArcGISDynamicMapServiceLayer(urlUsaService, {
    opacity: 0.5,
  });

  mapServerLayers.setVisibleLayers([0, 1, 2]);

  // Construct the Quakes layer - Mostrar solo los de magnitud mayor de 2
  var terremotosLayer = new FeatureLayer(urlQuakesFeatureLayer, {  })

  myMap.addLayers([mapServerLayers, terremotosLayer])

  //  Wire the draw tool initialization function
  var drawingTool = new Draw(myMap, { })

  function iniciarDraw(){
    drawingTool.activate(Draw.POLYGON)
  }

  // Inicializar la herramienta de dibujo para pintar polígonos
  var boton = document.getElementById('buttonInit')

  on(boton,"click", iniciarDraw)

  // Mostrar el polígono dibujado
  var capaEditable;

  function addToMap(evt){  //Este evt es el resultado de lo que devuelve 'draw-end' se puede acceder mediante sus propiedades   "console.log(evt)"

    drawingTool.deactivate(); 

    var symbol = new SimpleFillSymbol();
    symbol.setColor(new Color([255,255,0,0.25]));
    
    capaEditable = new Graphic(evt.geometry,symbol);
    myMap.graphics.add(capaEditable); 


    selectEarthquakes(evt.geometry);
  }

  // Finalizar la edición
  drawingTool.on('draw-end', addToMap);

  //Instanciar la consulta y su tipo 
  function selectEarthquakes(geometryInput){

    var consulta = new Query();
    consulta.geometry = geometryInput;

    terremotosLayer.selectFeatures(consulta)    

    var marker = new SimpleMarkerSymbol();
    marker.setStyle(SimpleMarkerSymbol.STYLE_DIAMOND);

    terremotosLayer.setSelectionSymbol(marker)
  }

  
  

   


  //Select Features 

  //Cambiar las simbología
});
