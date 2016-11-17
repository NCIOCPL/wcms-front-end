// HEREMaps.js to display Cancer Center locations in the US
// --------------------------------------------------------
var dada, maps;


// -------------------------------------------------------
// -------------------------------------------------------
function initMaps() {
    // maps is used for the function showNewBounds()
    maps = new Array();

    // Initialize the platform object:
    // app_id/app_code are username/password
    var platform = new H.service.Platform({
      'app_id': 'LwhO0PgtFaQWvmSKfagq',
      'app_code': '5AywnMXHSs-Tv2qqtFcx7g',
      'useHTTPS': true
    });

    // Obtain the default map types from the platform object
    var layers = platform.createDefaultLayers();

    // find all data-map-kml class elements, and load the kml string from
    // each.
    $("[data-map-id]").each(function (index) {
        // this refers to each map-classed element
        // pull the kml path from the element and initialize map
        var mapId = $(this).data("map-id");
        //var kmlPath = $(this).data("map-kml");
        //initMap(this, mapId, kmlPath);
        initMap(this, mapId, layers);
    });
}


// -------------------------------------------------------
// -------------------------------------------------------
function initMap( dada, mapId, layers ) {
    // Instantiate (and display) the initial map object showing
    // the entire US
    // --------------------------------------------------------
    var map = new H.Map(
    document.getElementById('mapContainer'),
    layers.normal.map,
    {
      zoom: 3,
      center: { lng: -113.029722, lat: 34.461944 }
    });

    // Retain the map display
    maps[mapId] = map;

    // Enable the event system on the map instance:
    // i.e. zoom in/out, drag, etc.
    var mapEvents = new H.mapevents.MapEvents(map);

    // Add event listener:
    map.addEventListener('tap', function(evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer.type); 
    });

    // Instantiate the default behavior, providing the mapEvents object:
    var behavior = new H.mapevents.Behavior(mapEvents);

    // Adding slider, scale, etc.
    var ui = H.ui.UI.createDefault(map, layers);
    // console.log(map);
    var zoom = ui.getControl('zoom');
    var scale = ui.getControl('scalebar');
    var view = ui.getControl('mapsettings');
    view.setAlignment('top-right');

    // Read the CC location data from the dynamicly build KML file
    // Note: I'm hard-coding the path here.  The earlier version of this 
    //       code was reading the path from the data-map-kml attribute of the 
    //       'mapcontainer' DIV.  
    //       Modify initMaps() if that's preferred
    // ----------------------------------------------------------------------
    var kmlPath = '/publishedcontent/kml/research/nci-role' +
                  '/cancer-centers/find/ccrollup.kml'
    var reader = new H.data.kml.Reader(kmlPath);

    // Parse the document
    reader.parse();

    // We need to wait for the file to be read entirely.  It is read
    // asynchronically.  Once it's read we're adding the markers
    // -------------------------------------------------------------
    reader.addEventListener('statechange', function() {
        // Wait till the KML document is fully loaded and parsed
        if (this.getState() === H.data.AbstractReader.State.READY) {
	    var parsedObjects = reader.getParsedObjects();
	    // Create  a group from our objects to easily zoom to them

            // Add markers for CancerCenters showing their address and institution
            // Clicking on a marker opens an infobubble which holds HTML content 
            // related  to the marker.
            // @param  {H.Map} map      A HERE Map instance within the application
            // -------------------------------------------------------------------
	    var group = new H.map.Group();

	    map.addObject(group);

            // add 'tap' event listener, that opens info bubble, to the group
	    group.addEventListener('tap', function (evt) {

            // event target is the marker itself, group is a parent event
            // target for all objects that it contains
            var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
                // read custom data
                content: evt.target.getData()
            });
            // show info bubble
            ui.addBubble(bubble);
        }, false);

        // Setting our CC markers
	var iconPath  = '/PublishedContent/Images/images/';
        var ccMarker  = iconPath + 'cancercenter_icon.png';
        var ccIcon    = new H.map.Icon(ccMarker);
        var cccMarker = iconPath + 'comprehensivecancercenter_icon.png';
        var cccIcon   = new H.map.Icon(cccMarker);
        var rccMarker = iconPath + 'researchcancercenter_icon.png';
        var rccIcon   = new H.map.Icon(rccMarker);

        var arrayLength = parsedObjects.length;
        var ccType = '';
        // console.log(parsedObjects[1]);

        // Displaying all CC's based on the location provided in the
        // KML data file
        for (var i = 0; i < arrayLength; i++) {
            var myLat  = parsedObjects[i].bb.lat;
            var myLng  = parsedObjects[i].bb.lng;
            var ccType = parsedObjects[i].cj.kmlNode.childNodes[3].textContent;

            // Setting the marker icon based on the styleUrl text-content
            if ( ccType === '#cancerCenter' ) {
                var icon = ccIcon;
            }
            else if ( ccType === '#comprehensiveCancerCenter' ) {
                var icon = cccIcon;
            }
            else {
                var icon = rccIcon;
            }

            var html = parsedObjects[i].cj.description;
            addMarkerToGroup(group, { lat: myLat, lng: myLng }, icon, 
                             html);
        }

        // Set the view point by state or area
        //var north =  35.
        //var east  = -84.51
        //var south =  30.13
        //var west  = -88.28

        //var bbox = new H.geo.Rect(north, west, south, east);
        //map.setViewBounds(bbox);
     };
  });


}


// -------------------------------------------------------
// -------------------------------------------------------
function showNewBounds(mapId, north, east, south, west) {
    // If a region has been selected move map to bounds(region)
    // --------------------------------------------------------
    var map = maps[mapId];
    if (map) {
        var bbox = new H.geo.Rect(north, west, south, east);
        map.setViewBounds(bbox);
    }
}


// -------------------------------------------------------
// -------------------------------------------------------
function addMarkerToGroup(group, coordinate, icon, html) {
    /**
     * Creates a new marker and adds it to a group
     * @param {H.map.Group} group       The group holding the new marker
     * @param {H.geo.Point} coordinate  The location of the marker
     * @param {String} html             Data associated with the marker
     */
    var marker = new H.map.Marker(coordinate, { icon: icon });
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
}


// Start the JS execution after the page is ready
// ----------------------------------------------
$( document ).ready(function (){
    initMaps();
    console.log('Done with Map');
});

