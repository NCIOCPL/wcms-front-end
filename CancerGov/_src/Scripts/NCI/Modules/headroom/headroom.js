define(function (require) {
	require('./headroom-patch');
	// Headroom is loaded via CDN but we still need the jQuery wrapper
	require('headroom.js/dist/jQuery.headroom.min');

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
	};
	/*** END Headroom initializer ***/
});