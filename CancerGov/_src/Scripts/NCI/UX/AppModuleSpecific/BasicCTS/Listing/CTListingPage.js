define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
		require('UX/AppModuleSpecific/BasicCTS/Listing/Enhancements/ctListingAnalytics').init();
	});
});