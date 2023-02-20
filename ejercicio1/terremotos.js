require([
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/geometry/Extent",
        "esri/SpatialReference",
        "esri/dijit/HomeButton",
        "esri/dijit/BasemapToggle",
        "esri/dijit/OverviewMap",
        "esri/dijit/Legend",
        "esri/dijit/Scalebar",
        "dojo/domReady!" 
    ],
    function(Map, 
        
        FeatureLayer, DinamicLayer, 
        Extent, SpatialReference, 
        HomeButton,  BasemapToggle, OverviewMap, Legend, Scalebar){

                var myMap = new Map('divMap', {
                        basemap:'satellite', 
                        extent: new Extent(-105,25.53,-100.20, 60.3,
                                new SpatialReference({wkid:4326}))
                });     
        
                var usa = new DinamicLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer', {
                        opacity:0.4
                }); 
        
                var terremotos = new FeatureLayer('https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0');

                terremotos.setDefinitionExpression('MAGNITUDE > 2') ;
                
                myMap.addLayers([usa,terremotos]);  

                var homeButton = new HomeButton({
                        map: myMap
                },      'homeDiv');

                homeButton.startup();

                var basemapToggle = new BasemapToggle({
                        basemap : 'dark-gray', 
                        map: myMap,     
                        visible: true
                },      'toggleDiv');

                basemapToggle.startup();

                var overView = new OverviewMap({
                        map: myMap,
                        // baseLayer: basemap,
                        attachTo: "bottom-left" , 
                        visible:true

                },     ); 

                overView.startup();

                var legend = new Legend({
                        map:myMap, 
                        title: 'Leyenda', 
                        // layerInfos : hideLayers([1])

                },      'maplegendDiv')

                function displayLegend(){

        
                        legend.startup();
        
                }
    
                
                myMap.on('layers-add-result', displayLegend)

                var scalebar = new Scalebar({
                        map: myMap, 
                        scalebarUnit: 'metric'
                },      'overviewDiv')

                scalebar.startup();
        }
)