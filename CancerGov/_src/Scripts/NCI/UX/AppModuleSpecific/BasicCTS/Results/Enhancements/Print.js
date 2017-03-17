define(function(require) {
    var $ = require('jquery');
    
	function _initialize() {
		$(".medium-12").addClass("medium-11");
		$(".medium-12").removeClass("medium-12");
		
		$(".clinical-trial-individual-result").each(function(index) {
			$(this).before("<div class=\"medium-1 columns\"><input class=\"checkbox\" id=\"cb" + index + "\" type=\"checkbox\" value=\"cb" + index + "\"></input><label for=\"cb" + index + "\">" + index + "</label></div></div>");
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
