import './headroom-patch';
// we still need the jQuery wrapper
import 'headroom.js/dist/jQuery.headroom.min';
import 'jquery/scrollToFixed';

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
}

/**
 * Exposed functions of this module.
 */
let _initialized = false;
export default function() {
	if (_initialized) {
		return;
	}

	_initialized = true;
	_initialize();
}
/*** END Headroom initializer ***/
