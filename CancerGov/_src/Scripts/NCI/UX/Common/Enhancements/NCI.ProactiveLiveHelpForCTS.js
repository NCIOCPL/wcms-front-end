define(function(require){
	CTS_URLS = ["/grants-training/grants-process/mechanisms/grants"];

	var $ = require('jquery');

	// Set up the "Do you want help?" popup.
	function _initialize() {
		setTimeout(_doSomeStuff, 10000);
	}

	function _doSomeStuff() {
		alert("Hello World.");
	}

	/* Flag for telling whether this enhancement has been initialized. */
	var initialized = false;

	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			if(CTS_URLS.find(function(url){return url === location.pathname.toLowerCase();})) {
				_initialize();

				initialized = true;
			}
		}
	};
});
