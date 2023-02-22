require([
  "esri/map",
  "dojo/dom",
  "dojo/on",
  "esri/tasks/locator",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/Color",
  "esri/graphic",
  "dojo/parser",
  "dojo/domReady!",
], function (
  Map,
  dom,
  on,
  Locator,
  SimpleMarkerSymbol,
  Color,
  Graphic,
  parser
) {
  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();
  // 1. Crear mapa y centrarlo at -117.19, 34.05
  var map = new Map("cpCenter", {
    basemap: "osm",
    center: [-117.19, 34.05],
    zoom: 5,
  });
  // 2. Controlar cuándo el usuario clicka sobre el botón
  // btnLocate
  var btn = dom.byId("btnLocate");
  btn.addEventListener("click", buscaDireccion); // Evento - opt1
  // on(btn, 'click', buscaDireccion); // Evento opt2
  // 4. Instanciar y cargar el servicio (Locator)
  var locator = new Locator(
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
  );
  function buscaDireccion() {
    // 3. Guardar en una variable lo que ha introducido la usuaria
    var direccion = dom.byId("taAddress").value;
    console.log("buscaDireccion", direccion);
    // 5. Montar parámetros para enviar al servicio
    var params = {
      address: { SingleLine: direccion },
      outFields: ["Loc_name"], // ["*"]
    };

    // 6. Ejecutar llamada al servicio de geocodificacion
    locator.addressToLocations(params);
  }
  // 7. Cuando se ha completado la petición se ejecuta mostrarResultados
  locator.on("address-to-locations-complete", mostrarResultados);
  function mostrarResultados(results) {
    // 8. mostrarResultados devuelve los resultados
    console.log("Geocodificación completada", results);
    // Coordenadas del punto devuelto (nos quedamos con el primer candidatos)
    var punto = results.addresses[0].location;
    console.log("punto", punto);
    // Definir simbología - arcgis playground js 3
    var marker = new SimpleMarkerSymbol();
    marker.setColor(new Color([230, 0, 169, 1]));
    // Montar el gráfico: simbología y localización
    var grafico = new Graphic(punto, marker);
    // Añadirlo a la capa gráfica que trae el propio mapa
    map.graphics.add(grafico);
  }
});
