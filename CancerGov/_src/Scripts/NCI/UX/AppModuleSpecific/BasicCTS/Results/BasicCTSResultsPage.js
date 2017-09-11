define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){
		require('BasicCTSCommon/Enhancements/FeedbackForm').init();
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('BasicCTS/Results/Enhancements/Print').init();
		require('BasicCTSCommon/Enhancements/ctsCommonAnalytics').init();
		require('BasicCTS/Results/Enhancements/ctsResultsAnalytics').init();
		require('BasicCTS/Results/Enhancements/criteriaToggle').init();
	});
});
