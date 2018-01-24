define(function(require) {
	var $ = require('jquery');
	require('StyleSheets/AppModuleSpecific/cts/index.scss')
	require('StyleSheets/vendor/select2/core.scss')

	$(document).ready(function($){
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('BasicCTS/Results/Enhancements/Print').init();
		require('BasicCTSCommon/Enhancements/ctsCommonAnalytics').init();
		require('BasicCTS/Results/Enhancements/ctsResultsAnalytics').init();
		require('BasicCTS/Results/Enhancements/criteriaToggle').init();
	});
});
