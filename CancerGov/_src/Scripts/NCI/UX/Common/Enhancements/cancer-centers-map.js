define(function (require) {
  // Module Constructor
  var Map = function (target, options) {

    if (typeof window.fetchingMaps == "undefined") {
      window.fetchingMaps = false;
    }

    this.init();

  };

  // Module methods
  Map.prototype = function () {
    var loadMap = function () {

      var dfd = $.Deferred();

      if (typeof L == 'undefined' || !window.fetchingMaps) {
        console.log("loading Map Assets");
        console.time("Maps Load Time");
        window.fetchingMaps = true;
        return $.when(
          $.get('https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'),
          $.getScript('//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js'),
          $.getScript('https://unpkg.com/leaflet@1.3.1/dist/leaflet.js')
        ).done(function (css,omnivore,leaflet) {
          // load css from cache
          $('<link>', {rel:'stylesheet', type:'text/css', 'href':'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'}).prependTo('head');
          console.log("Maps are loaded");
          window.fetchingMaps = false;
          console.timeEnd("Maps Load Time");
          dfd.resolve();
        });
      } else {
        console.log("Maps are loading...");

        function isMapsLoaded() {
          if (typeof L == "undefined" || typeof L == "object" && window.fetchingMaps) {
            setTimeout(function () {
              console.log("Maps are not ready yet...");
              isMapsLoaded();
            }, 100);
          } else {
            console.log("Maps are loaded");
            dfd.resolve();
          }
        }

        isMapsLoaded();

      }

      return dfd.promise();
    };

    var initialize = function () {

      var module = this;

      $.when(loadMap.call(module)).done(function () {
        generateMap.call(module);
      });

    };

    var generateMap = function () {

      // create a new map object
      var map = L.map('map-container').setView([38.8, -95.14], 4);
      this.map = map;

      // load tiles from open street map api
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(mymap);

      // load tiles from mapbox api
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a target="_blank" href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYWxpZnIiLCJhIjoiY2poN29rbDllMDJ2cjJ5bWNvbnUwZWVodyJ9.WsTYlUYI80NkoqUTk5iVGA'
      }).addTo(map);


      // shared pin options
      var markerPin = L.Icon.extend({
        options: {
          iconSize: [19, 32],
          iconAnchor: [9, 32],
          popupAnchor: [1, -20]
        }
      });

      // specific map pins
      const redIcon = new markerPin({ iconUrl: '/PublishedContent/Images/images/cancercenter_icon.png' });
      const blueIcon = new markerPin({ iconUrl: '/PublishedContent/Images/images/comprehensivecancercenter_icon.png' });
      const yellowIcon = new markerPin({ iconUrl: '/PublishedContent/Images/images/researchcancercenter_icon.png' });

      function onEachPlacemark(feature, layer) {
        var popupContent = "";
        var props = feature.properties;
        if (props) {
          // popup content is everything in the Description value
          // ToDo: break up description into more props for more flexible data
          popupContent += props.description;
          layer.bindPopup(popupContent, {
            maxWidth: 400,
            maxHeight: 300
          });
        }
      }

      var pinLayer = L.geoJson(null, {

        style: function (feature) {
          return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachPlacemark,

        pointToLayer: function (feature, latlng) {

          var icon = redIcon;

          // select pin based on type of cancer center
          switch (feature.properties.styleUrl) {
            case '#comprehensiveCancerCenter':
              icon = blueIcon;
              break;
            case '#researchCancerCenter':
              icon = yellowIcon;
              break;
            default:
              icon = redIcon;
          };
          return L.marker(latlng, {
            icon: icon
          })
        }
      }).addTo(map);

      omnivore.kml('/publishedcontent/kml/research/nci-role/cancer-centers/find/ccrollup.kml', null, pinLayer);

      // refresh popup after image has loaded so it can re-calc it's dimensions
      map.on('popupopen', function (e) {
        e.popup._container.querySelector('img').addEventListener("load", function (event) {
          e.popup.update();
        });
      });
    };

    var handleDropdowns = function () {

      var module = this;

      // Each region/state has it's own array of N E S W coordinates for
      // the bounds get other coords from here
      //   http://itouchmap.com/latlong.html or
      //   http://answers.google.com/answers/threadview?id=149284

      var bounds = {
        // bounds for Regions
        "newengland": [[46.5, -68.69755], [41, -72.424979]],
        "midatlantic": [[43.39856, -70.966925], [39.447378, -80.442209]],
        "eastnorthcentral": [[42.578715, -83.107909], [40.275006, -87.93141]],
        "westnorthcentral": [[44.884357, -90.263245], [38.634609, -95.941119]],
        "southatlantic": [[37.5, -78], [29.5, -84]],
        "eastsouthcentral": [[36.66698, -86.205941], [34.032965, -90.542496]],
        "westsouthcentral": [[33.317684, -94.896696], [29.013252, -99.078568]],
        "mountain": [[40, -105], [32, -112]],
        "pacific": [[21.2893, -168.8378], [46.5588, -95.6250]],
        // bounds for States
        "alabama": [[35, -84.51], [30.13, -88.28]],
        "alaska": [[71.50, -130], [54.4, -173]],
        "arizona": [[36.5, -110], [32, -114]],
        "arkansas": [[36.3, -89.41], [33, -94.42]],
        "california": [[41.9, -114.8], [32.5, -124.24]],
        "colorado": [[41, -102], [37, -109]],
        "connecticut": [[42.3, -71.47], [41, -73.44]],
        "delaware": [[39.50, -75.2], [38.27, -75.47]],
        "dc": [[38.995440, -76.910820], [38.792895, -77.119904]],
        "florida": [[30, -79.48], [26, -87.38]],
        "georgia": [[35, -81], [30.31, -85.53]],
        "hawaii": [[22, -154.4], [19, -160]],
        "idaho": [[49, -111], [42, -117]],
        "illinois": [[42.3, -87.3], [38, -91.3]],
        "indiana": [[41.46, -84.49], [37.47, -88.4]],
        "iowa": [[43.3, -89.5], [40.36, -96.31]],
        "kansas": [[40, -94.38], [37, -102.1]],
        "kentucky": [[39.9, -81.58], [36.3, -89.34]],
        "louisiana": [[33, -89], [29, -94]],
        "maine": [[47.28, -66.57], [43.4, -71.7]],
        "maryland": [[39.43, -75.4], [37.53, -79.33]],
        "massachusetts": [[42.53, -69.57], [41.5, -73.3]],
        "michigan": [[44, -83], [41.41, -89]],
        "minnesota": [[49.23, -89.34], [43.34, -97.12]],
        "mississippi": [[35, -88.7], [30.13, -91.41]],
        "missouri": [[40.35, -89.6], [36, -95.42]],
        "montana": [[49, -105], [44.26, -115]],
        "nebraska": [[43, -95.25], [40, -104]],
        "nevada": [[42, -114], [35, -120]],
        "new-hampshire": [[45.18, -70.37], [43, -72.37]],
        "new-jersey": [[41.21, -74], [38.55, -75.35]],
        "new-mexico": [[37, -104], [31.35, -109]],
        "new-york": [[45, -72], [40.29, -78]],
        "north-carolina": [[36.21, -75.3], [34, -84.15]],
        "north-dakota": [[49, -97], [45.55, -104]],
        "ohio": [[41.58, -80.32], [38.27, -84.49]],
        "oklahoma": [[37, -94.29], [33.35, -103]],
        "oregon": [[46.15, -116.45], [42, -124.3]],
        "pennsylvania": [[42, -74.43], [39.43, -80.31]],
        "rhode-island": [[42.1, -71.53], [41.18, -71.8]],
        "south-carolina": [[35.12, -78.3], [32.4, -82]],
        "south-dakota": [[45.56, -98.28], [42.29, -104.3]],
        "tennessee": [[36.41, -81.37], [35, -90.28]],
        "texas": [[35, -95], [26, -104]],
        "utah": [[42, -110], [37, -113]],
        "vermont": [[45, -71.28], [43, -73.26]],
        "virginia": [[39.37, -75.13], [36.31, -83.37]],
        "washington": [[49, -116.57], [45.32, -124.48]],
        "west-virginia": [[40.4, -77.4], [37.1, -82.4]],
        "wisconsin": [[47, -86.49], [43, -92.54]],
        "wyoming": [[45, -104.3], [41, -111.3]]
      };

      $(document).ready(function () {

        // Choose State and Choose Region selectmenu boxes
        const stateSelect = $('#stateSelect');
        const regionSelect = $('#regionSelect');
        $('.dropDownCCDisplay select').on("selectmenuchange", function (event, ui) {
          // reset state when a region has been selected
          if (event.target.id === 'regionSelect') {
            stateSelect.val("").selectmenu("refresh");
          }
          // reset region when a state has been selected
          if (event.target.id === 'stateSelect') {
            regionSelect.val("").selectmenu("refresh");
          }
          // move the map on a valid value selection
          if (ui.item.value) {
            console.log(this.map);
            module.map.fitBounds(bounds[ui.item.value]);
          }
        });
      });
    };

    var listingToggle = function () {
      const AtoZlist_State = `
      <div id="AtoZlistState" class="az-list">
        <ul>
          <li>
            <a href="#Alabama">A</a>
          </li>
          <li>B</li>
          <li>
            <a href="#California">C</a>
          </li>
          <li>
            <a href="#District-of-Columbia">D</a>
          </li>
          <li>E</li>
          <li>
            <a href="#Florida">F</a>
          </li>
          <li>
            <a href="#Georgia">G</a>
          </li>
          <li>
            <a href="#Hawaii">H</a>
          </li>
          <li>
            <a href="#Illinois">I</a>
          </li>
          <li>J</li>
          <li>
            <a href="#Kansas">K</a>
          </li>
          <li>L</li>
          <li>
            <a href="#Maine">M</a>
          </li>
          <li>
            <a href="#Nebraska">N</a>
          </li>
          <li>
            <a href="#Ohio">O</a>
          </li>
          <li>
            <a href="#Pennsylvania">P</a>
          </li>
          <li>Q</li>
          <li>R</li>
          <li>
            <a href="#South-Carolina">S</a>
          </li>
          <li>
            <a href="#Tennessee">T</a>
          </li>
          <li>
            <a href="#Utah">U</a>
          </li>
          <li>
            <a href="#Virginia">V</a>
          </li>
          <li>
            <a href="#Washington">W</a>
          </li>
          <li>X</li>
          <li>Y</li>
          <li id="AtoZlistLast">Z</li>
        </ul>
      </div>`;

      const AtoZlist_Name = `
      <div id="AtoZlistName" class="az-list">
        <ul>
          <li>
            <a href="#A">A</a>
          </li>
          <li>
            <a href="#B">B</a>
          </li>
          <li>
            <a href="#C">C</a>
          </li>
          <li>
            <a href="#D">D</a>
          </li>
          <li>E</li>
          <li>
            <a href="#F">F</a>
          </li>
          <li>
            <a href="#G">G</a>
          </li>
          <li>
            <a href="#H">H</a>
          </li>
          <li>
            <a href="#I">I</a>
          </li>
          <li>
            <a href="#J">J</a>
          </li>
          <li>
            <a href="#K">K</a>
          </li>
          <li>
            <a href="#L">L</a>
          </li>
          <li>
            <a href="#M">M</a>
          </li>
          <li>
            <a href="#N">N</a>
          </li>
          <li>
            <a href="#O">O</a>
          </li>
          <li>
            <a href="#P">P</a>
          </li>
          <li>Q</li>
          <li>
            <a href="#R">R</a>
          </li>
          <li>
            <a href="#S">S</a>
          </li>
          <li>
            <a href="#T">T</a>
          </li>
          <li>
            <a href="#U">U</a>
          </li>
          <li>
            <a href="#V">V</a>
          </li>
          <li>
            <a href="#W">W</a>
          </li>
          <li>X</li>
          <li>
            <a href="#Y">Y</a>
          </li>
          <li>Z</li>
        </ul>
      </div>`;
      $(document).ready(function () {
        const regionListing = $("#institution-listing1");
        const stateListing = $("#institution-listing2");
        const nameListing = $("#institution-listing3");
        const listingWrapper = regionListing.parent();

        listingWrapper.attr("id", "listing-region");
        stateListing.hide().prepend(AtoZlist_State);
        nameListing.hide().prepend(AtoZlist_Name);

        // Region | State | Name radio buttons
        $("#picker input").checkboxradio({
          icon: false
        }).on('change', function (e) {
          // toggle listings on click
          listingWrapper.attr('id', this.value);
        });
      });
    };

    /**
     * Exposed functions of this module.
     */
    return {
      init: initialize,
      bindDropdowns: handleDropdowns,
      listingToggle: listingToggle
    }

  }();

  return Map;
});