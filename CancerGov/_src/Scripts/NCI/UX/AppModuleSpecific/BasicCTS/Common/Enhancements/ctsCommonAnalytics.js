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
			indentifier = 'rrail_which trials are right for you|' + pageName;
			NCIAnalytics.SimpleCTSLink($this, identifier);
		});
		$('a .delighter.cts-what').on('click.analytics', function (e) {
			var $this = $(this);
			indentifier = 'rrail_what are cancer clinical trials|' + pageName;
			NCIAnalytics.SimpleCTSLink($this, identifier);
		});
		$('a .delighter.cts-next-step').on('click.analytics', function (e) {
			var $this = $(this);
			indentifier = 'rrail_how to find a cancer treatment trial|' + pageName;
			NCIAnalytics.SimpleCTSLink($this, identifier);
		});
		
		/* Track print & email clicks*/
		$('.po-email').on('click.analytics', 'a', function (e) {
			var $this = $(this);
			indentifier = 'clinical trial_email|' + pageName;
			NCIAnalytics.SimpleCTSLink($this, identifier);
		});
		$('.po-print').on('click.analytics', 'a', function (e) {
			var $this = $(this);
			indentifier = 'clinical trial_print|' + pageName;
			NCIAnalytics.SimpleCTSLink($this, identifier);
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
