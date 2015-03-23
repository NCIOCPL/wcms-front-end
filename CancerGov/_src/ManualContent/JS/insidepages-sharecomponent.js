$(".shareComponent").click(function () {
	$(this).find(".shareWindow").toggleClass("hide");
	$(this).find(".shareBtn").toggleClass("shareBtnOpen");
});

// Run the script to dynamically generate an "On This Page" block at the top of the page if it's specified the HTML
// TODO: move this to a different location when cleaning up the JavaScript for a future release.
NCI.buildOTP();