$(document).ready(function() {
	var $sectionNav = $('#section-nav');

	var styleSectionNav = function() {
		// style the parents
		var currentPage = $('.current-page');
		var nextParent = currentPage.parent('li').parent('ul');
		while(!nextParent.is('#section-nav') && nextParent.length > 0) {
			// expand the parent
			nextParent.parent('li').children('div').children('.toggle').attr('aria-expanded','true');
			// go to the next parent in the list
			nextParent = nextParent.parent('li').parent('ul');
		}
		$('#section-nav li > div > .toggle[aria-expanded="false"]').parent('div').parent('li').children('ul').hide();

		$('#section-nav div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
			$(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
			$(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
		});

		// enable the button to show
		$(document).ready(function() {
			// make the section menu button show ONLY for medium down when we're building a section nav
			// (otherwise it's hidden entirely)
			$('#section-menu-button').addClass('show-for-medium-down');
			// add margin to prevent the button from overlaying the page header
			$('.contentzone').addClass('has-section-nav');
		});
	};

	// section menu functionality
	var functionSectionNav = function() {
		// Add toggle functionality
		$('.section-nav .toggle').click(function(event) {
			// If the toggle is open, do this
			if ($(this).attr('aria-expanded') == 'true' ) {
				$(this).closest("li").find("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
					//Animation complete
				});
				$(this).closest("li").find(".toggle").attr('aria-expanded','false');
				// add highlight back to parent
				$(this).closest("li").removeClass("highlight");
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
				$(this).closest("ul").children("li").removeClass("highlight");
				// add highlight class to this item
				$(this).closest("li").addClass("highlight");
				return;
			}
		});

		var clickSectionButton = function() {
			// slide up section nav
			$('#section-nav').slideToggle(200, function() {
				// remove open class from button
				$('#section-menu-button').toggleClass('open', $(this).is(':visible'));
				$('#section-nav').toggleClass('open', $(this).is(':visible'));
				if($('#section-nav').is(':visible')) {
					/* section nav is OPEN */
					// append overlay div to content area for grey page overlay
					$("#content").append("<div id='overlay'></div>");
					// enable clicking outside the section-menu to close
					$('#overlay').click(clickSectionButton);
				} else {
					/* section nav is CLOSED */
					// remove grey overlay div
					$("#overlay").remove();
				}
			});
		};

		$('#section-menu-button').click(function(e) {
			e.preventDefault();
			clickSectionButton();
		});
	};

	styleSectionNav();
	functionSectionNav();
});

/* showing/hiding the section navigation when switching between desktop and mobile */
$(document).ready(function() {
	var curWidth = window.innerWidth || $(window).width(),
	oldWidth = curWidth;

	$(window).resize(function() {
		curWidth = window.innerWidth || $(window).width();
		if(oldWidth > 1024 && curWidth <= 1024) {
			/* if we've gone from desktop to mobile */
			// hide the setion navigation
			$('#section-nav').hide();
		} else if (oldWidth <= 1024 && curWidth > 1024) {
			/* if we're at a desktop resolution */
			// remove the overlay
			$("#overlay").remove();
			// show the section navigation
			$('#section-nav').show();
			// remove some mobile-only classes
			$('#section-nav').removeClass('open');
			$('#section-menu-button').removeClass('open');
		}
		oldWidth = curWidth;
	}).trigger('resize');
});
