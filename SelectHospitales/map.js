var map;

require([
  "esri/map", 
  "esri/layers/FeatureLayer", 

  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",

  "esri/graphic",
  "esri/Color",

  "esri/tasks/query",
  "dojo/domReady!"
], function(
  Map, 
  FeatureLayer, 

  SimpleLineSymbol,
  SimpleMarkerSymbol, 

  Graphic, 
  Color,

  Query
) {
    // Crear mapa
  map = new Map("map", {
    basemap: "streets-vector",
    center: [-3, 40],
    zoom: 5,
  });

  // Cargar capa 
  var hospitalesFL = new FeatureLayer('https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer/0')

  map.addLayer(hospitalesFL)

  // Capturar input Select
  function getValue(){
    var select = document.getElementById('seleccion').value; 
    console.log(select)
  }
  

  select.addEventListener('change', getValue)

    var consulta = new Query(); 
    consulta.where = "CODPROV = "+ valor; 



  hospitalesFL.selectFeatures(consulta);

  // Ejecutar query
  function selectHospitales(valor){
    console.log(valor)
    
    console.log(consulta)
  
    
     // Display según query 

    var marker = new SimpleMarkerSymbol(); 
    marker.setStyle(SimpleMarkerSymbol.STYLE_X);

    hospitalesFL.setSelectionSymbol(marker); 
  } 
  
  //Ejecución

   
  


  // https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer  
});