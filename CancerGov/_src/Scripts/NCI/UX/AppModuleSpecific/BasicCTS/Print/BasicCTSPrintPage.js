define(function(require) {
	var $ = require('jquery');
	require('StyleSheets/ctsPrintResults.scss');

	$(document).ready(function($){
		require('UX/AppModuleSpecific/BasicCTS/Print/Enhancements/printResultsAnalytics').init();
	});
});
