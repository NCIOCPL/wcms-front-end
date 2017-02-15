define(function(require) {
    var jQuery = require('jquery');
 
    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var _initialized = false;
		
		/**
		 * Private browser and version members, and the currently found version search sting.
		 * @type {String}
		 */
		 var _browser;
		 var _version;
		 var _versionSearchString;
		 
		/** 
		 * Array of browser identity strings.
		 * @type {Array}
		 */
		var _dataBrowser = [
			{string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
			{string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
			{string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
			{string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
			{string: navigator.userAgent, subString: "Opera", identity: "Opera"},
			{string: navigator.userAgent, subString: "OPR", identity: "Opera"},
			{string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
			{string: navigator.userAgent, subString: "Safari", identity: "Safari"}
		];
		 
		/**
		 * Private initialize function; populates the private browser and version variables.
		 */
		function _initialize() {
			_browser = _searchString(_dataBrowser) || "Other";
			_version = _searchVersion(navigator.userAgent) || _searchVersion(navigator.appVersion) || "Unknown";
		}
		
		/**
		 * Searches the userAgent for instances of browser identifiers, and returns the identity.
		 * @return {String}
		 */
		function _searchString (data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				_versionSearchString = data[i].subString;

				if (dataString.indexOf(_versionSearchString) !== -1) {
					return data[i].identity;
				}
			}
		}
		
		/**
		 * Uses the previously determined version search string to find the browser version.
		 * @return {String}
		 */
		function _searchVersion (dataString) {
			var index = dataString.indexOf(_versionSearchString);
			if (index === -1) {
				return;
			}

			var rv = dataString.indexOf("rv:");
			if (_versionSearchString === "Trident" && rv !== -1) {
				return parseFloat(dataString.substring(rv + 3));
			} else {
				return parseFloat(dataString.substring(index + _versionSearchString.length + 1));
			}
		}
 
    /**
     * Exposed functions of this module.
     */
    return {
			init: function() {
				if (_initialized) {
					return;
				}
				
				_initialize();
		 
				_initialized = true;
			},
			
			getBrowser: function() {
				return _browser;
			},
			
			getVersion: function() {
				return _version;
			}
			
		};
 
});
