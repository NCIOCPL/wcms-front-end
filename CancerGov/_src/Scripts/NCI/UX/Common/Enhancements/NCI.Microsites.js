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
			
			//Do not show the delighter
			$('#delighter-homePage').css('display','none'); 
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
