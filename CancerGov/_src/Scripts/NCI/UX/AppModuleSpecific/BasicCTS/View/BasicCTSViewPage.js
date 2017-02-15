define(function(require) {
	var $ = require('jquery');


	$(document).ready(function($){
		require('BasicCTSCommon/Enhancements/FeedbackForm').init();
		require('BasicCTSView/Enhancements/LocationFilter').init();
		require('BasicCTSView/Enhancements/accordionEnhancements').init();
		require('BasicCTSView/Enhancements/ctsViewAnalytics').init();
		require('BasicCTSView/Enhancements/backToSearch').init();
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
		
		// print button functionality
		// NOTE: if this functionality needs to be extended further, PLEASE pull out into a new enhancement!
		$(".cts-share a.print").click( function(e) {
			e.preventDefault();
			window.print();
		} );
	});
});
