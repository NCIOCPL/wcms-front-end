/*** BEGIN deeplinking fix
 * This script fixes the scroll position for deeplinking.
 ***/
define(function(require) {
	var initialized = false,
		$ = require('jquery'),
		browserDetect = require('./browserDetect');

	require('Plugins/jquery.nci.scroll_to');

	function _initialize() {
		// console.log("You are using: " + browserDetect.getBrowser() + " with version: " + browserDetect.getVersion());

		$(window).on('load.deeplink hashchange.deeplink', function(event) {
			event.preventDefault();

			// IE has the issue where anchor links and previous scroll states are not scrolled to until after the load event has completed
			// the doScroll method needs to be delayed until after the initial page scroll event so that the scrollTop position can be calculated properly within doScroll
			// also, the initial page scroll (downward) causes headroom to collapse down to it's smallest state so we want to freeze it before the initial scroll
			if(browserDetect.getBrowser() == "Explorer" && event.type === "load"){
				$('.headroom-area').addClass('frozen');
				$(window).on("scroll.pageLoad",function(e){
					$('.headroom-area').removeClass('frozen');
					_doScroll(e);
					$(window).off("scroll.pageLoad");
				});
			} else {
				_doScroll(event);
			}
		});

		// $(window).on("pdqinpagenav",function(e){
		// 	$(window).trigger("hashchange.deeplink");
		// });


		//redundant check to see if anchor is same as current hash
		//if it is the same then trigger doScroll since a hashchange will not be triggered
		$("#content").on('click.deeplink',"a[href*=\\#]",function(e) {
			var anchor = this.attributes.href.value;
			if(anchor === location.hash){
				e.preventDefault();
				_doScroll(e);
			}
		});

		initialized = true;
	}

	function _doScroll(event){
		if(location.hash !== '') {

            var isSection = location.hash.match(/^#section\//i),
                anchor = ('#' + location.hash.replace(/^.+\//, '').replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1')).replace('#\\', ''),
                $anchor = $(anchor),
                $accordionPanel = (isSection) ? $anchor.children('.ui-accordion-content') : $anchor.closest('.ui-accordion-content'),
                $accordion = $accordionPanel.closest('.ui-accordion'),
                accordionIndex = ($accordion.length > 0) ? $accordion.data('ui-accordion').headers.index($accordionPanel.prev('.ui-accordion-header')) : undefined,
                scroll = function (el) {
                    $(window).NCI_scroll_to({
                    	isSection: isSection,
                        anchor: el,
                        event: event.type
                    });
                }
			;

			if($accordion.length > 0) {
				// subscribe to accordion activate events to trigger scroll
				$accordion.on('accordionactivate', function(e) { scroll(anchor); });

				// check if the target panel is active. Yes, scroll to it : No, trigger it and callback will scroll
				if(!$accordionPanel.hasClass('accordion-content-active')) {
					$accordion.accordion('option', 'active', accordionIndex);
				} else {
					scroll(anchor);
				}
			} else {
				scroll(anchor);
			}

		}
	}
    
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if (!initialized) {
				_initialize();
			}
		}
	};
});
/*** END deeplinking fix ***/