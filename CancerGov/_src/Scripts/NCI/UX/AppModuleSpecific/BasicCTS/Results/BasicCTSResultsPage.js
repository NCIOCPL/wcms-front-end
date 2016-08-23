define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){		
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
		require('UX/AppModuleSpecific/BasicCTS/Results/Enhancements/ctsResultsAnalytics').init();
		require('BasicCTSCommon/Enhancements/FeedbackForm').init();
	});
});