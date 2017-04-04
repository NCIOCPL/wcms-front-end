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
		$('.clinical-trial-individual-result').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
					rank = $this.index('.clinical-trial-individual-result a') + 1;
					rank += ('|page ' + pn);
					NCIAnalytics.CTSResultsClick($this, rank);
			});
		});
		
		/* Track clicks of print selected buttons */
		$('.printSelected').on('click', function(event) {
			var $this = $(this);
			var checkedTrials = JSON.parse(sessionStorage.getItem('totalChecked')) || [];
			var totalChecked = checkedTrials.length;
			if(totalChecked > 0) {
				var checkedPages = JSON.parse(sessionStorage.getItem('checkedPages')) || [];
				var hasSelectAll = sessionStorage.getItem('hasSelectAll');
				
				var location;
				if ($this.parents().hasClass('cts-results-top-control')) {
					location = "top";
				}
				else if ($this.parents().hasClass('cts-results-top-control')) {
					location = "lower";
				}

				var selectAllText = "noselectall";
				if (hasSelectAll == "true") {
					selectAllText = "selectall";
				}
				
				NCIAnalytics.CTSResultsPrintSelectedClick($this, location, selectAllText, totalChecked, checkedPages);
			}
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
