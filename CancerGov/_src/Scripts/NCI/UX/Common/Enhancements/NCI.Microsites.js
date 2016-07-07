define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		var url = document.URL;

		//Set styles for OCNR microsite only
		if(url.indexOf('/doc/ocnr') > -1) {
			//Add the 'micro-a' class to the utility nav
			$('#nvcgSlUtilityBar').addClass('micro-a');
			$('.language-bar').addClass('micro-a');
			
			//Add the 'micro-a' class to the guide card row
			$('.row.guide-card').addClass('micro-a');

			/** TODO: Remove these hacks once permanent fixes are in place */
			//Do not show the delighter
			$('#delighter-homePage').css('display','none'); 
			// Do not show the CancerGov 'Home' link in the breadcrumb
			// Permanent fix will be in CDE code
			if($('.breadcrumbs li a').first().attr('href') == '/') {
				$('.breadcrumbs li').first().remove();
			}
			/** End hacks */
		}
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
