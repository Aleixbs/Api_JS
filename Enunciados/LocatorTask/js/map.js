require([
  "esri/map",
  "esri/tasks/locator",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "esri/graphic",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "dojo/on",
  "dojo/dom",
  "dojo/parser",
  "dojo/domReady!",
], function (
  Map,
  Locator,
  SimpleMarkerSymbol,
  Color,
  Graphic,
  TextSymbol,
  Font,
  on,
  dom,
  parser
) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();


  //Smooth zooming and centering
  esriConfig.defaults.map.panDuration = 2500; // default panDuration: 350
  esriConfig.defaults.map.panRate = 1; // default panRate: 25
  esriConfig.defaults.map.zoomDuration = 2500; // default zoomDuration: 500
  esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25

  // Map centered at -117.19, 34.05
  var myMap = new Map("cpCenter", {
    basemap: "osm",
    center: [-117.19, 34.05], // lon, lat
    zoom: 6,
  });

  // Instanciar y cargar el servicio
  var locator = new Locator(
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  );

  // Construir la Tarea propia con el geocodificador de ArcGIS
  var boton = document.getElementById("btnLocate");
  var textareaInput = dom.byId("taAddress");
  


  boton.addEventListener("click", findlocation); // === on(boton,'click',findlocation)

  function findlocation() {
    var direccionInput = textareaInput.value;
    console.log(direccionInput);
    var params = {
      address: { SingleLine: direccionInput },
      outFields: ["*"],
    };
    locator.addressToLocations(params);
  }

  // Ejecutar llamada al geocoder

  // Cuando se ha completado la función anterior
  locator.on("address-to-locations-complete", showlocation);

  function showlocation(results) {
    console.log("results", results);

    var punto = results.addresses[0].location;
    console.log('punto',punto);

    var marker = new SimpleMarkerSymbol();
    marker.setColor(new Color([255, 0, 0, 1]));
    console.log('marker',marker);

    var grafico = new Graphic(punto, marker);

    myMap.graphics.add(grafico);

    // Añadir texto al punto

    var font = new Font("20px");

    var direccionTxt = results.addresses[0].address;
    var texto = new TextSymbol(direccionTxt, font);
    texto.setOffset(0, 10);

    var grafictxt = new Graphic(punto, texto);

    myMap.graphics.add(grafictxt);

    myMap.centerAndZoom(punto,12)
  }

  // Mostrar los elementos al mapa con el método address-to-locations-complete que controla el evento de adresstolocation

  // var searchWidget = new Search({},'button')

  // var find = new FindTask('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');

  // console.log(find)
  // var params = new FindParameters(myMap);
  // console.log(params)
  // console.log(params.layerIds = [2])

  //   searchWidget.startup()
});
