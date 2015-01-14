//wraps pairs of cards in div
$(document).ready(function(){
	var lis = $(".cthpCard");
	for(var i = 0; i < lis.length; i+=2) {
		lis.slice(i, i+2).wrapAll("<div class='row' data-match-height></div>");
	}
});
