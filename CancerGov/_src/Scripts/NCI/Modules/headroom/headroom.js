define(function (require) {
	require('./headroom-patch');
	// we still need the jQuery wrapper
	require('headroom.js/dist/jQuery.headroom.min');
	require('jquery/scrollToFixed');

    var _initialized = false;

	function _initialize() {
        /*** BEGIN Headroom initializer
		 * (use this if we do the scroll off/on for the blue bar)
		 ***/

		// initialize scrollToFixed plugin
		var headerHeight = $('.fixedtotop').outerHeight();
		$('.fixedtotop').scrollToFixed({
			spacerClass: 'fixedtotop-spacer',
			fixed: function () {
				$('.fixedtotop-spacer').height(headerHeight);
			}
		});

		$('.headroom-area').headroom({
			offset: 205,
			classes: {
				initial: "slide",
				pinned: "slide--reset",
				unpinned: "slide--up"
			}
		});


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