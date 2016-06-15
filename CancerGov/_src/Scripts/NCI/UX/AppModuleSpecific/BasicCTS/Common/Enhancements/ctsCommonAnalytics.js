define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		/* Track right rail links */
		var pageName = document.location.hostname + document.location.pathname;
		var identifier = '';		
		$('a .delighter.cts-which').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_which trials are right for you';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		$('a .delighter.cts-what').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_what are cancer clinical trials';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		$('a .delighter.cts-next-step').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_how to find a cancer treatment trial';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
	}

	/**
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();

			initialized = true;
		}
	};
});
