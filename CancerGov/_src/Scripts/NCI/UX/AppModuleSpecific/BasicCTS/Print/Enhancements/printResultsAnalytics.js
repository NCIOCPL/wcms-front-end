define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		var printPageID = getPrintID;

		// Loop through all the "Check for Update" buttons and assign them unique IDs.
		var counter = 1;
		$('.CheckForUpdatesButton').each(function(){
			$(this).attr('id', counter);
			counter ++;
		});
		
		$('#printPage').click(function(e){
			var $this = $(this);
			NCIAnalytics.CTSPrintResults_TopLinkClick($this, 'Print Page', printPageID);
		});

		$('#ctl10_EmailResults').click(function(e){
			var $this = $(this);
			NCIAnalytics.CTSPrintResults_TopLinkClick($this, 'Email', printPageID);
		});

		$('#newSearch').click(function(e){
			var $this = $(this);
			NCIAnalytics.CTSPrintResults_TopLinkClick($this, 'New Search', printPageID);
		});

		$('.CheckForUpdatesButton').click(function(e){
			var $this = $(this);
			NCIAnalytics.CTSPrintResults_VewUpdatesLinkClick($this, printPageID);
		});		

	}

	function getPrintID(){
		var url = window.location.href;
		var regex = new RegExp("[?&]" + "PrintID" + "(=([^&#]*)|&|#|$)"),
        var results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
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
