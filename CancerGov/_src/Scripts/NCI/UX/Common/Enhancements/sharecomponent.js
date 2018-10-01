import $ from 'jquery';

$(".shareComponent").click(function () {
	$(this).find(".shareWindow").toggleClass("hide");
	$(this).find(".shareBtn").toggleClass("shareBtnOpen");
});
