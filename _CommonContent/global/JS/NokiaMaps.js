var mapContainer, map;

function initMap( kmlPath ) {
nokia.Settings.set("appId", "LwhO0PgtFaQWvmSKfagq");
nokia.Settings.set("authenticationToken", "5AywnMXHSs-Tv2qqtFcx7g");

// Get the DOM node to which we will append the map
mapContainer = document.getElementById("mapContainer");
// Create a map inside the map container DOM node
map = new nokia.maps.map.Display(mapContainer, {
    components: [
        // we add the behavior component to allow panning / zooming of the map
        new nokia.maps.map.component.Behavior(),
        new nokia.maps.map.component.InfoBubbles(),
        // Creates UI to easily switch between street map satellite and terrain mapview modes
        new nokia.maps.map.component.TypeSelector()
    ]
});
var kml = new nokia.maps.kml.Manager(),
    // Binding of DOM elements to several variables so we can install event handlers.
    container,
    resultSet,
    boundingBox,
    // We define a callback function for parsing kml file,
    // and then push the parsing result to map display
    onParsed = function (kmlManager) {
        // KML file was successfully loaded
        if (kmlManager.state == "finished") {
            // KML file was successfully parsed
            resultSet = new nokia.maps.kml.component.KMLResultSet(kmlManager, map);
            resultSet.addObserver("state", function (resultSet) {
                if (resultSet.state == "finished") {
                    // Retrieve map objects container from KML resultSet
                    container = resultSet.container.objects.get(0);

                    boundingBox = container.getBoundingBox();
                    // Here we check whether we have valid bounding box or no. 
                    // In case if KML document does not contain any supported displayable element, bounding box will be a null, 
                    // therefore it will not be possible to zoom to the not existing object. 
                    if (boundingBox) {
                        // Switch the viewport of the map to show all KML map objects within the container
                        map.zoomTo(boundingBox);
                    }
                }
            });
            // Add the container to the map's object collection so they will be rendered onto the map.
            map.objects.add(resultSet.create());
        }
    };

// Add an observer to kml manager
kml.addObserver("state", onParsed);
kml.parseKML(kmlPath);
}