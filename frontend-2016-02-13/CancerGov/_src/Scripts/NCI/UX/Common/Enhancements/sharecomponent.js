define(function(require) {
	var $ = require('jquery');

	$(".shareComponent").click(function () {
		$(this).find(".shareWindow").toggleClass("hide");
		$(this).find(".shareBtn").toggleClass("shareBtnOpen");
	});
});
