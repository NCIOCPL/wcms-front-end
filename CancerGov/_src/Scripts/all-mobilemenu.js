// write the mobile menu
$(document).ready(function() {
	var $mobileNav = $('#mobile-nav > .nav-menu');

	// Global mobile nav functionality
	var styleMobileNav = function() {
		$('#mobile-nav li li div > .toggle[aria-expanded="false"]').parent('div').parent('li').children('ul').hide();
		// highlight active items
		$("#mobile-nav li li > div > .toggle[aria-expanded='true']").closest("li").addClass("highlight");
		$('#mobile-nav .nav-menu > li').addClass("highlight");

		$('#mobile-nav div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
			$(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
			$(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
		});
	};

	var functionMobileNav = function() {
		// Add toggle functionality
		$('#mobile-nav .toggle').click(function(event) {
			event.stopPropagation();
			// If the toggle is open, do this
			if ($(this).attr('aria-expanded') == 'true' ) {
				$(this).closest("li").find("button[aria-expanded='true']").closest("li").children("ul").slideToggle("slow", function() {
					//Animation complete
				});
				$(this).closest("li").find(".toggle").attr('aria-expanded','false');
				// remove highlight class
				$(this).closest("li").removeClass("highlight");
				// add highlight back to parent
				$(this).closest('li').parent('ul').parent('li').addClass('highlight');
				// Stop processing
				return;
			}

			// If the toggle is closed, do this
			if ($(this).attr('aria-expanded') == 'false' ) {
				// close any open siblings and their children...
				$(this).closest("li").siblings().children("div").children("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
					//Animation complete
				});
				// ...and add proper ARIA to indicate those siblings and children are closed
				$(this).closest("li").siblings().children("div").children("button").attr('aria-expanded','false');
				// slide open list of nav elements for selected button
				$(this).closest("li").children("ul").slideToggle( "slow", function() {
					// Animation complete.
				});
				// add ARIA to indicate this section has been opened
				$(this).attr('aria-expanded','true');
				// remove highlight class from any other items
				$(this).closest("#mobile-nav").find("li").removeClass("highlight");
				// add highlight class to this item
				$(this).closest("li").addClass("highlight");
				return;
			}
		});
	};

	styleMobileNav();
	functionMobileNav();
});
