require ([
    "esri/map",

    "esri/tasks/GeometryService",
    "esri/tasks/BufferParameters",
    "esri/SpatialReference",
    
    "esri/graphic",
    "esri/toolbars/draw",

    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",

    "dojo/domReady!"
    ], function(
        Map, 

        GeometryService,
        BufferParameters, 
        SpatialReference,

        Graphic, 
        Draw,

        SimpleMarkerSymbol, 
        SimpleLineSymbol, 
        SimpleFillSymbol, 
        Color
    ){

    //Crear un nuevo mapa
    var map = new Map('map', {
        basemap: 'streets-vector' ,
        center: [-3.6,40.3] ,
        zoom: 10
    })

    //Creamos un botón para iniciar la edición
    var boton = document.getElementById('boton')

    boton.addEventListener('click', newDraw)

    //Crear la herramienta de dibujo de polilineas en la capa grafica del mapa
    var drawingTool = new Draw(map, {})

    function newDraw(){

        map.graphics.clear()

        drawingTool.activate(Draw.POLYLINE)
    }

    //Recojemos el evento que crea la polilínea y la añadimos al mapa

    drawingTool.on('draw-complete', addToMap) // Draw-complete es el evento de finishDrawing

    // Creamos una función que pinte el punto en el mapa

    function addToMap(event){

        drawingTool.finishDrawing(); // Se necesita instanciar un finishDrawing para polyline, polygon, etc. 
        drawingTool.deactivate(); // Desactivamos la capacidad de editar puntos

        var lineSymbol = new SimpleLineSymbol();
        lineSymbol.setColor(new Color([255,0,0,1]));
        
        var capaEditable = new Graphic(event.geometry,lineSymbol);
        map.graphics.add(capaEditable);

        addBuffer(event)
    }  
        // servicioGeometria.on('buffer-complete',addBuffer)
    
    //Instanciar el nuevo servicio de geometria 
    var servicioGeometria = new GeometryService('https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Utilities/Geometry/GeometryServer')

    //Creamos una función que añadirá el buffer en el mapa a paritr de la geometría de la polilínea
    function addBuffer(event){

        //Instanciamos los parametros del buffer
        var params = new BufferParameters()
        params.bufferSpatialReference = map.spatialReference;  // new SpatialReference({wkid: 102100});
        params.unionResults = true; 
        params.unit = GeometryService.UNIT_KILOMETER; 
        params.distances = [5];
        params.outSpatialReference = map.spatialReference;
        params.geometries = [event.geometry];  //El servicio necesita especificados los geometries (falta saber donde instanciarlos para luego pintarlos (mirar documentación de geometryservice.buffer))

        //Creamos el servicio de geometría del buffer
        servicioGeometria.buffer(params,showbuffer)

    }

    //Ejecutar el buffer una vez haya creado la polilinea
    function showbuffer(resultadobuffer){

        console.log(resultadobuffer)
 
        //Instanciamos la simbología del buffer
        var outline = new SimpleLineSymbol();
        outline.setColor(new Color([0, 0, 0, 0]));

        var bufferSymbol = new SimpleFillSymbol();
        bufferSymbol.setColor(new Color([255, 127, 127, 0.50]));
        bufferSymbol.setOutline(outline); 

        var buffer =  new Graphic(resultadobuffer[0], bufferSymbol) //El evento de resultados buffer en la posición [0] contiene un array de objetos, estas son las geometrias que necesitamos para pintar el resultado
        map.graphics.add(buffer)   
            
    };

       
    

})