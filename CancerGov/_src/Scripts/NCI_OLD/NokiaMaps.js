var mapContainer, maps, kmlManager;
//Frank is cool!

function initMaps() {
	maps = new Array();

	// the app id and code are set according to the key names current as of Here maps 2.5.3
	nokia.Settings.set("app_id", "LwhO0PgtFaQWvmSKfagq");
	nokia.Settings.set("app_code", "5AywnMXHSs-Tv2qqtFcx7g");
    nokia.Settings.set("secureConnection","force");
	
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
    // initialize the InfoBubble setting to align above the related placemark
	var infoBubbles = new nokia.maps.map.component.InfoBubbles();
	infoBubbles.options.set("defaultYAlignment", infoBubbles.ALIGNMENT_ABOVE);


	// Create a map inside the map container DOM node
	var map = new nokia.maps.map.Display(mapContainer, {
		// set the default center and zoom level so the map does begin fully zoomed-out
		center: [34.461944, -113.029722],
		zoomLevel: 3,
		components: [
			// we add the behavior component to allow panning / zooming of the map
			new nokia.maps.map.component.Behavior(),
			infoBubbles,
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

				// adjust the Marker hotspot so the icon is not placed in the middle of our coordinate
				var hotSpot = { x: null, y: "0", xunits: null, yunits: "pixels" };
				kmlManager.kmlDocument.styleContainer.styles.cancerCenter.iconStyle.hotSpot = hotSpot;
				kmlManager.kmlDocument.styleContainer.styles.comprehensiveCancerCenter.iconStyle.hotSpot = hotSpot;
				kmlManager.kmlDocument.styleContainer.styles.researchCancerCenter.iconStyle.hotSpot = hotSpot;

				resultSet = new nokia.maps.kml.component.KMLResultSet(kmlManager.kmlDocument, map);
				resultSet.addObserver("state", function (resultSet) {
					if (resultSet.state == "finished") {
						// Retrieve map objects container from KML resultSet
						container = resultSet.container;

						var TOUCH = nokia.maps.dom.Page.browser.touch,
						CLICK = TOUCH ? "tap" : "click";

						/* Instead of adding an event listener to every marker we are going
						 * to use event delegation. We install one event handler on the
						 * container that contains all of the objects.
						 */

						container.addListener(CLICK, function (evt) {
							var object = evt.target;

							// Check if the object on which the event was triggered is a marker
							if (object instanceof nokia.maps.map.Marker) {
								var openBubbleHandles = infoBubbles.openBubbleHandles;
								
								var display = container.getDisplay();
							
								// retrieve the first info bubble and reposition the map if necessary
								if(openBubbleHandles.getLength() > 0)
								{
								    // get the Bubble object and the related jQuery item
									var bubbleObj = openBubbleHandles.get(0);
									var bubbleNode = bubbleObj.node;
									var jqBubble = $(bubbleNode);
									
									// retrieve the height and width, and pixel location on map
									var bubbleWidth = jqBubble.outerWidth();
									var bubbleHeight = jqBubble.outerHeight();
									var bubbleCoord = bubbleObj.coordinate;
									var bubblePoint = display.geoToPixel(bubbleCoord);
									
									// calc bounding box (add extra to upper-right to clear various map buttons)
									var leftX = bubblePoint.x;
									var bottomY = bubblePoint.y;
									var rightX = leftX + bubbleWidth + 40;
									var topY = bottomY - bubbleHeight - 50;
									
									// if the bubble is off the upper-right corner
									if(rightX > display.width && topY < 0)
									{
										// pan in both axes
										display.pan(display.width, 0, rightX, topY);
									}
									// else if just off the top edge...
									else if(topY < 0)
									{
										// pan vertically
										display.pan(0, 0, 0, topY);
									}
									// else if off the right-hand edge...
									else if(rightX > display.width)
									{
										// pan horizontally
										display.pan(display.width, 0, rightX, 0);
									}
								}
							}
						});
						
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