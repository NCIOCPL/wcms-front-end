define(function(require) {
	var $ = require('jquery');

	$(document).ready(function() {
		/*** BEGIN CTHP Cards
		 * Wrap pairs of cards in a row.
		 ***/
		var lis = $(".cthpCard");
		for(var i = 0; i < lis.length; i+=2) {
			lis.slice(i, i+2).wrapAll("<div class='row' data-match-height></div>");
		}
		/*** END CTHP Cards ***/
	});
});
