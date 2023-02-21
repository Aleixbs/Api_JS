require ([
    'esri/map',
    'esri/arcgis/utils',
    'dojo/domReady!'
    ],
    function(
        Map,
        arcgisUtils){


        var webMap = 'ef90fd0f75bd47a29697acc3e91df3b5'
        var myMap = arcgisUtils.createMap(webMap,'divMap', {
            mapOptions: {
                // slider:true
            }, 
        }).then(function(response){
            alert('funciona')
        var legend =  arcgisUtils.getLegendLayers(response);
        
        }, 
        );
        
        






    } 
)