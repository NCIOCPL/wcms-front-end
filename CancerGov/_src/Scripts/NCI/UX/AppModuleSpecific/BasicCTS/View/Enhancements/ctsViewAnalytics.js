define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
	/* Snippet to track clicks on accordion controls */
		$('.accordion-controls').on('click.analytics', 'a', function (e) {
			var $this = $(this);
			id = 'clinical trial';
			action = $this.attr('class');
			NCIAnalytics.AccordionClick($this, id, action);
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
