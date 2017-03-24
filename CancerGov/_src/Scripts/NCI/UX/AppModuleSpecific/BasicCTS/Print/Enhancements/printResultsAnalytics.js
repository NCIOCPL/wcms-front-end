define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		$('#printPage').on('click.analytics', 'a', function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrint($this, 'printPage')
		});

		$('#ctl10_EmailResults').on('click.analytics', 'a', function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrint($this, 'email')
		});

		$('#newSearch').on('click.analytics', 'a', function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrint($this, 'newSearch')
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
