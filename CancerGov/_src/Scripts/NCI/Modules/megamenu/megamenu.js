import 'jquery/megamenu';

function _initialize() {
	/*** BEGIN Mega Menu init
	 *** (initialize a selector as an accessibleMegaMenu)
		***/
	(function($) {

		var megaNav = $("#mega-nav");

		megaNav.accessibleMegaMenu({
			/* prefix for generated unique id attributes, which are
				* required to indicate aria-owns, aria-controls and aria-labelledby
				*/
			uuidPrefix: "accessible-megamenu",

			/* css class used to define the megamenu styling */
			menuClass: "nav-menu",

			/* css class for a top-level navigation item in the megamenu */
			topNavItemClass: "nav-item",

			/* css class for a megamenu panel */
			panelClass: "sub-nav-mega",

			/* css class for a group of items within a megamenu panel */
			panelGroupClass: "sub-nav-group",

			/* css class for the hover state */
			hoverClass: "hover",

			/* css class for the focus state */
			focusClass: "focus",

			/* css class for the open state */
			openClass: "open"
		});

		megaNav.find(".sub-nav-group-wrapper").bind("mouseleave",function(e){
			if($(e.relatedTarget).is('.sub-nav-mega')){
				$(this).closest(".nav-menu").trigger("mouseout");
			}
		}).each(function(){
			var $this = $(this);
			if ($this.outerHeight() > 300) {
				$this.parent().addClass("mega-menu-scroll");
			}
		});

		//megamenu animations for IE9 which does not support CSS3 transitions
		if($('html').is(".no-csstransitions")) {
			//capture initial menu height, save it as a data attribute, then set height to 0
			megaNav.find(".sub-nav-mega").each(function () {
				var subNav = $(this);
				subNav.data("initHeight", subNav[0].scrollHeight).height(0);
			});

			megaNav.on("mouseenter", "li.nav-item", function () {
				var subNav = $(this).find(".sub-nav-mega");
				var height = subNav.data("initHeight");
				subNav.stop(true, true).delay(500).animate({opacity: 1, height: height}, 500);

			}).on("mouseleave", "li.nav-item", function () {
				var subNav = $(this).find(".sub-nav-mega");
				subNav.stop(true, true).delay(100).animate({opacity: 0, height: 0}, 250);
			});
		}

		/* Note: this causes menu to overflow on large screens since mega menu is confined to a max-height of 300px; scroll should always be auto
		// Determine the height of the viewport on page load and whenever the viewport changes sizes.
		// If the viewport is under a certain height, add a class to the mega menu (to limit its height).
		var viewportHeight = function() {
			// Get the height of the viewport
			var height = $(window).height();

			// add class to mega menu if less than specified height.
			if (height < 800) {
				$('.sub-nav-mega').addClass("mega-menu-scroll");
			}
			// otherwise remove the class
			else {
				$('.sub-nav-mega').removeClass("mega-menu-scroll");
			}
		};

		// page load
		$(document).ready(viewportHeight);
		// viewport size changes
		$(window).resize(viewportHeight);
		*/
		
	})(jQuery);

	// create a class for mega menu items that have no actual content, so we can unformat them
	jQuery(document).ready(function() {
		$(".sub-nav-mega").each(function(){
			if (!$(this).text().trim().length) {
				$(this).addClass("empty-mega");
			}
		})
	});
}

/**
 * Exposed functions of this module.
 */
let _initialized = false;
export default function() {
	if (!_initialized) {
		_initialized = true;
		_initialize();
	}
}
/*** END Mega Menu init ***/
