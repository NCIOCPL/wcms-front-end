jQuery(document).ready(function(jQuery) {
	/*** BEGIN CTHP Cards
	 * Wrap pairs of cards in a row.
	 ***/
	(function($) {
		var lis = $(".cthpCard");
		for(var i = 0; i < lis.length; i+=2) {
			lis.slice(i, i+2).wrapAll("<div class='row' data-match-height></div>");
		}
	})(jQuery);
	/*** END CTHP Cards ***/
	
	/*** BEGIN CTHP Cards Accordionizer
	 * Make the CTHP page an accordion below desktop size
	 ***/
	(function($) {
		var accordionContainer = '#nvcgSlCTHPCards';
		var header = 'h3';

		var accordionize = function() {
			var width = window.innerWidth || $(window).width();
			/* If the width is less than or equal to 1024px (small/medium screens)
			 * AND if the accordion(s) isn't (aren't) already built */
			if (width <= 1024 && $(targetsBuiltAccordionSelector).length === 0) {
				NCI.doAccordion(accordionContainer, {'header': header});
			} else if(width >= 1025) {
				NCI.undoAccordion(accordionContainer, {'header': header});
			}
		};

		/* on window load AND resize */
		$(document).on('ready', function() {
			accordionize();
		});
		$(window).on('resize', function() {
			accordionize();
		});
	})(jQuery);
	/*** END CTHP Cards Accordionizer ***/
});
