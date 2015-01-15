// all this file really does is accordions, and should be renamed or moved into all.js [Wade, 01/15/2015]

var doAccordion = function() {
	/* determine window width */
	var width = window.innerWidth || $(window).width();

	/* If the width is less than or equal to 1024px (small/medium screens)
	 * AND if the accordion(s) isn't (aren't) already built */
	if (width <= 1024 && $('.accordion.ui-accordion, #accordion.ui-accordion').length === 0) {
		// verify that the accordion will build correctly
		$('.accordion h2, #accordion h2').each(function() {
			if($(this).nextAll().length > 1) {
				$(this).nextUntil('h2').wrapAll('<div class="clearfix"></div>');
			}
		});

		// actually build the accordion
		$('.accordion, #accordion').accordion({
			heightStyle: "content",
			header: "h2",
			collapsible: true,
			active: false,
			/* override default functionality of accordion that only allows for a single pane to be open
			* source: http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once */
			beforeActivate: function (event, ui) {
				// The accordion believes a panel is being opened
				var currHeader;
				if (ui.newHeader[0]) {
					currHeader = ui.newHeader;
					// The accordion believes a panel is being closed
				} else {
					currHeader = ui.oldHeader;
				}
				var currContent = currHeader.next('.ui-accordion-content');
				// Since we've changed the default behavior, this detects the actual status
				var isPanelSelected = currHeader.attr('aria-selected') == 'true';

				// Toggle the panel's header
				currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

				// Toggle the panel's icon
				currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

				// Toggle the panel's content
				currContent.toggleClass('accordion-content-active', !isPanelSelected);
				if (isPanelSelected) {
					currContent.slideUp();
				} else {
					currContent.slideDown();
				}

				return false; // Cancels the default action
			},
			icons: {
				"header": "ui-icon-circle-plus-right-e",
				"headerSelected": "ui-icon-circle-minus-right-s"
			}
		});

		/* else, the window must be large */
	} else {
		/* destroy the accordion if it's already been initialized */
		$('.accordion, #accordion').each(function() {
			if (typeof $(this).data("ui-accordion") != "undefined") {
				$(this).accordion("destroy");
			}
		});
	}
};

/* on window load AND resize */
$(document).on('ready', function() {
	doAccordion();
});
$(window).on('resize', function() {
	doAccordion();
});
