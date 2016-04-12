define(function(require) {
	var $ = require('jquery');

	function _initialize() {
		// Track clicks on "On This Page" links
		$('.on-this-page').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var pageTitle = $('h1 span').first().text();
				var linkText = $this.text();	
				NCIAnalytics.OnThisPageClick($this, pageTitle, linkText);
			});
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