// all this file really does is accordions, and should be renamed or moved into all.js [Wade, 01/15/2015]

var accordionize = function() {
	/* determine window width */
	var width = window.innerWidth || $(window).width();

	var targets = {
		//'selector' : 'header'
		'.accordion' : 'h2',
		'#nvcgRelatedResourcesArea' : 'h6',
		'#cgvCitationSl' : 'h6'
	};
	var targetsSelector = Object.keys(targets).join(', ');
	var targetsBuiltAccordion = [],
	    targetsHeader = [],
	    accordion;

	for(var target in targets) {
		if(targets.hasOwnProperty(target)) {
			targetsBuiltAccordion.push(target + '.ui-accordion');
			targetsHeader.push(target + ' ' + targets[target]);
		}
	}
	var targetsBuiltAccordionSelector = targetsBuiltAccordion.join(', ');
	var targetsHeaderSelector = targetsHeader.join(', ');

	/* If the width is less than or equal to 1024px (small/medium screens)
	 * AND if the accordion(s) isn't (aren't) already built */
	if (width <= 1024 && $(targetsBuiltAccordionSelector).length === 0) {
		// verify that the accordion will build correctly
		$('.accordion h2').each(function() {
			if($(this).nextAll().length > 1) {
				$(this).nextUntil('h2').wrapAll('<div class="clearfix"></div>');
			}
		});

		for(accordion in targets) {
			if(targets.hasOwnProperty(accordion)) {
				NCI.doAccordion(accordion, {'header': targets[accordion]});
			}
		}

		/* else, the window must be large */
	} else if(width >= 1025) {
		for(accordion in targets) {
			if(targets.hasOwnProperty(accordion)) {
				NCI.undoAccordion(accordion, {'header': targets[accordion]});
			}
		}
	}
};

/* on window load AND resize */
$(document).on('ready', function() {
	accordionize();
});
$(window).on('resize', function() {
	accordionize();
});
