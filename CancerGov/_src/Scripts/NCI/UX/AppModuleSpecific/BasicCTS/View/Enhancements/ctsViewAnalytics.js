define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
    /* Snippet to track clicks on accordion controls */
		$('.accordion-controls').on('click.analytics', function (e) {
			var $this = $(this);
      NCIAnalytics.AccordionClick($this, 'control id', '', '', 'click all control' );
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
