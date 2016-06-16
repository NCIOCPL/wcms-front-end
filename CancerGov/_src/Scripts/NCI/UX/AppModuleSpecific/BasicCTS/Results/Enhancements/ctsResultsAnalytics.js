define(function(require) {
	var $ = require('jquery');

	function _trackSearchFields($locationsContainer) {	
		//Fetch 
		var count = '';
		var allParams = '';
		$('#cgvBody')
			.find('span[data-basiccts-searchparam]')
			.each(function(index, element) {
				$el = $(element);
				$val = $el.attr('data-basiccts-searchparam');
				if($val == 'n')
					count = $el.text();
				else
					allParams += ($el.text() + '|'); 
			});
		s.events='event2'; // Internal search event
		s.prop10=count; // # of results
		s.eVar11=s.prop11='clinicaltrials_basic'; // Search type
		s.eVar22=s.prop22=allParams; // Search criteria
		s.t();	
	}

	
	/***
	* Main function
	*/
	function _initialize() {
		
		/* Track clicks of individual results */
		$('.clinical-trial-individual-result').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
					rank = $this.index('.clinical-trial-individual-result a');
					NCIAnalytics.CTSResultsClick($this, rank);
			});
		});	
		_trackSearchFields();
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
