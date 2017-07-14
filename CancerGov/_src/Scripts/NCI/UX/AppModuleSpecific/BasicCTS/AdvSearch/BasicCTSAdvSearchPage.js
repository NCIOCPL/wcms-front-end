define(function(require) {
	var $ = require('jquery');
	require('Plugins/jquery.nci.equal_heights');

	$(document).ready(function($){
		require('BasicCTSAdvSearch/Enhancements/BasicCTSAdvSearchFormSetup').init();
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm').init();
		$('[data-match-height]').NCI_equal_heights();
	});
});
