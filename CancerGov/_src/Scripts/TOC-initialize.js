// all this file really does is accordions, and should be renamed or moved into all.js [Wade, 01/15/2015]

var accordionize = function() {
	/* determine window width */
	var width = window.innerWidth || $(window).width();

	var targets = '.accordion, #accordion';

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
		NCI.doAccordion(targets);

		/* else, the window must be large */
	} else if(width >= 1025) {
		NCI.undoAccordion(targets);
	}
};

/* on window load AND resize */
$(document).on('ready', function() {
	accordionize();
});
$(window).on('resize', function() {
	accordionize();
});
