define(function(require) {
	var $ = require('jquery');

	$(document).ready(function($){
		require('UX/AppModuleSpecific/BasicCTS/Print/Enhancements/printResultsAnalytics').init();
	});
});