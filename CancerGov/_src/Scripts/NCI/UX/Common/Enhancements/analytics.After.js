define(function(require) {
	var $ = require('jquery');

	/***
	* Snippet to track clicks on "On This Page" links
	*/
	function _initialize() {
		$('.on-this-page').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
				var linkText = $this.text();
				var pageName = window.location.hostname + window.location.pathname;
				NCIAnalytics.OnThisPageClick($this, linkText, pageName);
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
