var mapContainer, maps, kmlManager;

function initMaps() {
	maps = new Array();

	// the app id and code are set according to the key names current as of Here maps 2.5.3
	nokia.Settings.set("app_id", "LwhO0PgtFaQWvmSKfagq");
	nokia.Settings.set("app_code", "5AywnMXHSs-Tv2qqtFcx7g");
	
	// create the kml manager once, rather than once for each map
	kmlManager = new nokia.maps.kml.Manager();

	// find all data-map-kml class elements, and load the kml string from each.
	$("[data-map-id]").each(function (index) {
		// this refers to each map-classed element
		// pull the kml path from the element and initialize map
		var mapId = $(this).data("map-id");
		var kmlPath = $(this).data("map-kml");
		initMap(this, mapId, kmlPath);
	});
}

function initMap( mapContainer, mapId, kmlPath ) {
	// Create a map inside the map container DOM node
	var map = new nokia.maps.map.Display(mapContainer, {
		// set the default center and zoom level so the map does begin fully zoomed-out
		center: [34.461944, -113.029722],
		zoomLevel: 3,
		components: [
			// we add the behavior component to allow panning / zooming of the map
			new nokia.maps.map.component.Behavior(),
			new nokia.maps.map.component.InfoBubbles(),
			// Creates UI to easily switch between street map satellite and terrain mapview modes
			new nokia.maps.map.component.TypeSelector(),
			// shows a +/- bar for zooming the map
			new nokia.maps.map.component.ZoomBar()
		]
	});
	
	// retain the map display
	maps[mapId] = map;

	// add a listener to remove the HERE logo from the map on display
	map.addListener("displayready", function() {
		$("div.nm_crimg").remove();
	});

	// Binding of DOM elements to several variables so we can install event handlers.
	var container,
		resultSet,
		boundingBox,
		// We define a callback function for parsing kml file,
		// and then push the parsing result to map display
		onParsed = function (kmlManager) {
			// KML file was successfully loaded
			if (kmlManager.state == "finished") {
				// KML file was successfully parsed
				resultSet = new nokia.maps.kml.component.KMLResultSet(kmlManager.kmlDocument, map);
				resultSet.addObserver("state", function (resultSet) {
					if (resultSet.state == "finished") {
						// Retrieve map objects container from KML resultSet
						boundingBox = resultSet.container.getBoundingBox();
						
						// Here we check whether we have valid bounding box or no. 
						// In case if KML document does not contain any supported displayable element, bounding box will be a null, 
						// therefore it will not be possible to zoom to the not existing object. 
						if (boundingBox) {
							// Switch the viewport of the map to show all KML map objects within the container
							resultSet.container.getDisplay().zoomTo(boundingBox);
						}
					}
				});
				// Add the container to the map's object collection so they will be rendered onto the map.
				map.objects.add(resultSet.create());
			}
		};

	// Add an observer to kml manager
	kmlManager.addObserver("state", onParsed);
	// now that the observer is ready, instruct the manager to load the KML
	kmlManager.parseKML(kmlPath);
}

// move map to bounds(region)
function showNewBounds(mapId, north, east, south, west) {
	var map = maps[mapId];
	if(map) {
		var se = new nokia.maps.geo.Coordinate(south, east);
		var nw = new nokia.maps.geo.Coordinate(north, west);
		var bb = new nokia.maps.geo.BoundingBox(nw, se);
		map.zoomTo(bb);
	}
}

$( document ).ready(function (){
	initMaps();
});