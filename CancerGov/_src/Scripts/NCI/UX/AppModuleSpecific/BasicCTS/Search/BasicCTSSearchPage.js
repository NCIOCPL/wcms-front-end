define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){		
		require('BasicCTSSearch/Enhancements/BasicCTSSearchFormSetup').init();
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
	});
});