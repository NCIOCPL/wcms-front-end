define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		
		/* Track clicks of individual results */
		$('.clinical-trial-individual-result').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
					rank = $this.index('.clinical-trial-individual-result a');
					console.log("clicked link. rank=" + rank);
					NCIAnalytics.CTSResultsClick($this, rank);
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
