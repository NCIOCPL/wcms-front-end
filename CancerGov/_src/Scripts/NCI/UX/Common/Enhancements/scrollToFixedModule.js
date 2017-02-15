define(function(require) {
	var jQuery = require('jquery');
    require('jquery/scrolltofixed');

	var _initialized = false;

    function _initialize() {
        /*** BEGIN scrollToFixed init ***/
		(function($) {
			var headerHeight = $('.fixedtotop').outerHeight();
			$('.fixedtotop').scrollToFixed({
				spacerClass: 'fixedtotop-spacer',
				fixed: function() {
					$('.fixedtotop-spacer').height(headerHeight);
				}
			});
		})(jQuery);
		
		_initialized = true;
	}

	/**
	 * Exposed functions of this module.
	 */
	return {
		init: function () {
			if (_initialized) {
				return;
			}
			_initialize();

			_initialized = true;
		}
	}
	/*** END scrollToFixed init ***/
});