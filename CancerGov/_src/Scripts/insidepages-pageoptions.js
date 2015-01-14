$(document).ready(function(){
//Font resizer
	var originalFontSize = $("body").css('font-size');
	$(".cycle-font").click(function(){
		var currentFontSizeM = $(".main-content").css('font-size');
		var currentFontSizeNumM = parseFloat(currentFontSizeM, 10);
		if (currentFontSizeNumM < 30 ) {
			var newFontSizeM = currentFontSizeNumM*1.2;
			$(".main-content").css('font-size', newFontSizeM);
		} else {
			$(".main-content").css('font-size', originalFontSize);
		}
	equalHeights();
	return false;
	});
});
