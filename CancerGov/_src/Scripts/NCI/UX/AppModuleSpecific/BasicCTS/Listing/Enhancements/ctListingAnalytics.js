define(function(require) {
    var $ = require('jquery');
	
	/***
	* Main function
	*/
	function _initialize() {
        
		/* Get our page number from the URL, if it exists */	
		var url = document.URL;
		var pn = 1;
		if(url.indexOf('pn=') > -1) {
			var pnq = url.match(/pn=[0-9]*/g); // get the "pn=xx" query value
			pn = pnq[0].replace('pn=',''); // strip out the "pn=" for the page number
			if(pn.length < 1) {
				pn = 1;
			}
		}
        
		/* Track clicks of individual results */
		$('.ct-list-item').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
					rank = $this.index('.ct-list-item a') + 1;
					rank += ('|page ' + pn);
					
					var formName = "clinicaltrials_custom";
					NCIAnalytics.CTSResultsClick($this, rank, formName);
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
