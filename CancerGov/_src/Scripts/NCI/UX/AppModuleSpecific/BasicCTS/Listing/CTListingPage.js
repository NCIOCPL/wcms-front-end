define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){
		require('BasicCTSCommon/Enhancements/ctsCommonAnalytics').init();
		require('BasicCTS/Listing/Enhancements/ctListingAnalytics').init();
	});
});