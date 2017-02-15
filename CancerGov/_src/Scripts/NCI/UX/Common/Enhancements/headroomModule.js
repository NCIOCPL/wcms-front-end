define(function (require) {
    var jQuery = require('jquery');
    require('jquery/headroom');

    var _initialized = false;

	function _initialize() {
        /*** BEGIN Headroom initializer
		 * (use this if we do the scroll off/on for the blue bar)
		 ***/
		(function($) {
			$('.headroom-area').headroom({
				offset: 205,
				classes: {
					initial: "slide",
					pinned: "slide--reset",
					unpinned: "slide--up"
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
	/*** END Headroom initializer ***/
});