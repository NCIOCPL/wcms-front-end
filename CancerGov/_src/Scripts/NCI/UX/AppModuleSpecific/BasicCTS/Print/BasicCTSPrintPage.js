define(function(require) {
	var $ = require('jquery');
	require('./BasicCTSPrintPage.scss');

	$(document).ready(function($){
		require('UX/AppModuleSpecific/BasicCTS/Print/Enhancements/printResultsAnalytics').init();
	});
});
