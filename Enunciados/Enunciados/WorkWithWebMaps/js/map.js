var mapMain;
var legendLayers = [];
var webmapId = '7d987ba67f4640f0869acb82ba064228';

require([
  "esri/dijit/BasemapGallery",
  "esri/dijit/Legend",
  "esri/arcgis/utils",
  "dojo/parser",
  "dojo/domReady!",
  ], function (
    BasemapGallery,
    Legend,
    arcgisUtils,
    parser) {

    parser.parse();

    var webmap = arcgisUtils
    .createMap( webmapId,'cpCenter')
    .then(function(response){

      console.log(response)

      // Título
      document.getElementById('title').innerHTML = response.itemInfo.item.title // == dom.byId('title).innerHTML = response.itemInfo.item.title

      // Leyenda

      // legendLayers = arcgisUtils.getLegendLayers(response)
      console.log('capas',legendLayers)

      var leyenda = new Legend({
        map : response.map, 
        // layerInfos: legendLayers
      }, 'divLegend')

      leyenda.startup()
      
      //Basemap Gallery

      var mapaBase = new BasemapGallery({
        map : response.map
      }, 'basemapGallery')

      mapaBase.startup()
      

    });


    
});
