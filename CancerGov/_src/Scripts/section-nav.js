$(document).ready(function() {
	var sectionNav = '.section-nav';
	var sectionNavButton = '#section-menu-button';
	
	var $sectionNav = $(sectionNav);
	var $sectionNavButton = $(sectionNavButton);
	
	// section menu functionality
	var functionSectionNav = function() {
		$(sectionNav + ' div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
			$(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
			$(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
		});

		// enable the button to show
		$sectionNavButton.addClass('show-for-medium-down');
		// add margin to prevent the button from overlaying the page header
		$('.contentzone').addClass('has-section-nav');

		// Add toggle functionality
		$(sectionNav + ' .toggle').click(function(event) {
			var $li = $(this).closest('li');
			// If the toggle is open, do this
			if ($(this).attr('aria-expanded') === 'true' ) {
				$li.find('button[aria-expanded=true]').closest('li').children('ul').slideToggle('slow', function() {
					//Animation complete
				});
				$li.find('.toggle').attr('aria-expanded','false');
				// Stop processing
				return;
			}

			// If the toggle is closed, do this
			if ($(this).attr('aria-expanded') === 'false' ) {
				// close any open siblings and their children...
				$li.siblings().children('div').children('button[aria-expanded=true]').closest('li').children('ul').slideToggle('slow', function() {
					//Animation complete
				});
				// ...and add proper ARIA to indicate those siblings and children are closed
				$li.siblings().children('div').children('button').attr('aria-expanded','false');
				// slide open list of nav elements for selected button
				$li.children('ul').slideToggle( 'slow', function() {
					// Animation complete.
				});
				// add ARIA to indicate this section has been opened
				$(this).attr('aria-expanded','true');
				return;
			}
		});

		var clickSectionButton = function() {
			// slide up section nav
			$sectionNav.slideToggle(200, function() {
				// remove open class from button
				$sectionNavButton.toggleClass('open', $(this).is(':visible'));
				$sectionNav.toggleClass('open', $(this).is(':visible'));
				if($(sectionNav).is(':visible')) {
					/* section nav is OPEN */
					// append overlay div to content area for grey page overlay
					$('#content').append('<div id='overlay'></div>');
					// enable clicking outside the section-menu to close
					$('#overlay').click(clickSectionButton);
				} else {
					/* section nav is CLOSED */
					// remove grey overlay div
					$('#overlay').remove();
				}
			});
		};

		$sectionNavButton.click(function(e) {
			e.preventDefault();
			clickSectionButton();
		});
	};

	styleSectionNav();
	functionSectionNav();


	/* showing/hiding the section navigation when switching between desktop and mobile */
	var curWidth = window.innerWidth || $(window).width(),
	oldWidth = curWidth;

	$(window).resize(function() {
		curWidth = window.innerWidth || $(window).width();
		if(oldWidth > 1024 && curWidth <= 1024) {
			/* if we've gone from desktop to mobile */
			// hide the setion navigation
			$sectionNav.hide();
		} else if (oldWidth <= 1024 && curWidth > 1024) {
			/* if we're at a desktop resolution */
			// remove the overlay
			$('#overlay').remove();
			// show the section navigation
			$sectionNav.show();
			// remove some mobile-only classes
			$sectionNav.removeClass('open');
			$sectioNavButton.removeClass('open');
		}
		oldWidth = curWidth;
	}).trigger('resize');
});
