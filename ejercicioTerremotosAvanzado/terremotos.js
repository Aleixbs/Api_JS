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
        var terremotosLayer = new FeatureLayer(urlQuakesFeatureLayer, {
                outFields:["*"]  //Instancias el número de campos que los resultados van a devolver
        })
      
        myMap.addLayers([mapServerLayers, terremotosLayer])
      
        //  Wire the draw tool initialization function
        var drawingTool = new Draw(myMap, { })
      
        function iniciarDraw(){
                myMap.graphics.remove(capaEditable) // Limpieza de la capa gráfica del mapa
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
      
        // Extraer datos de los terremotos

        terremotosLayer.on('selection-complete', getQuakeData); //Con la funcion instanciada de esta manera se le dice que recoja del evento anterior por lo tanto en este caso si que obtendríamos los features seleccionados 

        function getQuakeData(resultados){

                var listaTerremotos = resultados.features;   // los resultados son los elementos seleccionados por el evento de seleccion
                console.log(listaTerremotos)

                var listaHtml = document.getElementById('listaTerremotos'); 
                listaHtml.innerHTML = '';


                listaTerremotos.forEach(function(element){

                        var magnitud = element.attributes.MAGNITUDE
                        var terremoto = element.attributes.FID

                        var elementLi = document.createElement('li');
                        elementLi.innerHTML = `Terremoto ${terremoto} de magnitud ${magnitud}`;

               
                     
                        listaHtml.appendChild(elementLi);
                });
              
        }
      
         
      
      
        //Select Features 
      
        //Cambiar las simbología
      });
      


//       require([
//         "esri/map",
//         "esri/layers/FeatureLayer",
//         "esri/layers/ArcGISDynamicMapServiceLayer",
//         "esri/geometry/Extent",
//         "esri/SpatialReference",
//         "esri/dijit/HomeButton",
//         "esri/dijit/BasemapToggle",
//         "esri/dijit/OverviewMap",
//         "esri/dijit/Legend",
//         "esri/dijit/Scalebar",
//         "dojo/domReady!" 
//     ],
//     function(
//         Map,        
//         FeatureLayer, 
//         DinamicLayer, 
//         Extent, 
//         SpatialReference, 
//         HomeButton,  
//         BasemapToggle, 
//         OverviewMap, 
//         Legend, 
//         Scalebar){

//                 var myMap = new Map('divMap', {
//                         basemap:'satellite', 
//                         extent: new Extent(-105,25.53,-100.20, 60.3,
//                                 new SpatialReference({wkid:4326}))
//                 });     
        
//                 var usa = new DinamicLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer', {
//                         opacity:0.4
//                 }); 
        
//                 var terremotos = new FeatureLayer('https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0');

//                 terremotos.setDefinitionExpression('MAGNITUDE > 2') ;
                
//                 myMap.addLayers([usa,terremotos]);  

//                 var homeButton = new HomeButton({
//                         map: myMap
//                 },      'homeDiv');

//                 homeButton.startup();

//                 var basemapToggle = new BasemapToggle({
//                         basemap : 'dark-gray', 
//                         map: myMap,     
//                         visible: true
//                 },      'toggleDiv');

//                 basemapToggle.startup();

//                 var overView = new OverviewMap({
//                         map: myMap,
//                         // baseLayer: basemap,
//                         attachTo: "bottom-left" , 
//                         visible:true

//                 },     ); 

//                 overView.startup();

//                 var legend = new Legend({
//                         map:myMap, 
//                         title: 'Leyenda', 
//                         // layerInfos : hideLayers([1])

//                 },      'maplegendDiv')

//                 function displayLegend(){

        
//                         legend.startup();
        
//                 }
    
                
//                 myMap.on('layers-add-result', displayLegend)

//                 var scalebar = new Scalebar({
//                         map: myMap, 
//                         scalebarUnit: 'metric'
//                 },      'overviewDiv')

//                 scalebar.startup();





//         }
// )
