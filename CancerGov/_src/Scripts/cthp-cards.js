jQuery(document).ready(function(jQuery) {
	/*** BEGIN CTHP Page Options
	 * Place mobile page options below the h1.
	 ***/
	(function($) {
		if($('h1').length > 0) {
			// if there is an h1, we are not on the home page
			$('h1').after(
				$(document.createElement('div'))
				.addClass('page-options')
				.prepend(
					$('.page-options > ul').clone()
				)
			);
		}
	})(jQuery);
	/*** END CTHP Page Options ***/
	
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
});
