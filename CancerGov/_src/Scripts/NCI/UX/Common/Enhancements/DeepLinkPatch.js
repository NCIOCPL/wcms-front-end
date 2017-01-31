/*** BEGIN deeplinking fix
 * This script fixes the scroll position for deeplinking.
 ***/
define(function(require) {
	var jQuery = require('jquery');
	var browserDetect = require('Common/Enhancements/browserDetect');
	var initialized = false;

	function _initialize() {
		// initialize browser detection
		// MOVED TO Common/Enhancements/browserDetect.js
		browserDetect.init();
		// console.log("You are using: " + browserDetect.getBrowser() + " with version: " + browserDetect.getVersion());

		var doScroll = function(event) {
				if(location.hash !== '') {
						NCI.scrollTo(location.hash, event.type);
				}
				//else if ($(".summary-sections .ui-accordion")[0]){
				//	window.scrollTo(0, 0);
				//}
		};

		$(window).on('load hashchange', function(event) {

			// IE has the issue where anchor links and previous scroll states are not scrolled to until after the load event has completed
			// the doScroll method needs to be delayed until after the initial page scroll event so that the scrollTop position can be calculated properly within doScroll
			// also, the initial page scroll (downward) causes headroom to collapse down to it's smallest state so we want to freeze it before the initial scroll
			if(browserDetect.getBrowser() == "Explorer" && event.type === "load"){
				$('.headroom-area').addClass('frozen');
				$(window).on("scroll.pageLoad",function(e){
					//console.log("page scrolled!");
					$('.headroom-area').removeClass('frozen');
					doScroll(e);
					$(window).off("scroll.pageLoad");
				});
			} else {
				doScroll(event);
			}
		});


		//redundant check to see if anchor is same as current hash
		//if it is the same then trigger doScroll since a hashchange will not be triggered
		$("a[href*=#]").click(function(e) {
			var anchor = this.attributes.href.value;
			if(anchor === location.hash){
				doScroll(e);
			}
		});
		initialized = true;
	}
    
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			_initialize();

			initialized = true;
		}
	};
});
/*** END deeplinking fix ***/