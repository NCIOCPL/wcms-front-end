define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		var micrositeId = $('header #nvcgSlSiteBanner').html();

		/* Set styles for OCNR microsite only
		* This checks for a specific logo name in order to fire off the microsite-specific Javascript
		* and styling. This may not be the best way to do it, but it's safer than trying to
		* match a pattern in the URL. 
		* Ideally, we can put a unique id or class name in the header Raw HTML and kick off the Javascript
		* based on that.
		*/
		if(micrositeId) {
			if(micrositeId.indexOf('ocnr-logo') > -1) {

				//Add the 'micro-a' class to selected elements 
				$('#nvcgSlUtilityBar').addClass('micro-a'); // Utility nav
				$('.language-bar').addClass('micro-a'); // Language bar (for mobile)
				$('.feature-primary-title').addClass('micro-a'); // Feature card title (for mobile)
				$('.row.guide-card').addClass('micro-a'); // Guide card row

				/** TODO: Remove these hacks once permanent fixes are in place */
				// Do not show the delighter
				$('#delighter-homePage').css('display','none'); 
				// Do not show the CancerGov 'Home' link in the breadcrumb
				// Permanent fix will be in CDE code
				if($('.breadcrumbs li a').first().attr('href') == '/') {
					$('.breadcrumbs li').first().remove();
				} /** End hacks */
			}
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
