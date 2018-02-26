define(function(require) {
	require('StyleSheets/AppModuleSpecific/cts/index.scss')
	require('StyleSheets/vendor/select2/core.scss')	
	var $ = require('jquery');

	$(document).ready(function($){
		require('BasicCTSView/Enhancements/LocationFilter').init();
		require('BasicCTSView/Enhancements/accordionEnhancements').init();
		require('BasicCTSView/Enhancements/ctsViewAnalytics').init();
		require('BasicCTSCommon/Enhancements/Delighters').init();
		require('BasicCTSCommon/Enhancements/ctsCommonAnalytics').init();
		require('BasicCTS/Results/Enhancements/criteriaToggle').init();

		// print button functionality
		// NOTE: if this functionality needs to be extended further, PLEASE pull out into a new enhancement!
		$(".cts-share a.print").click( function(e) {
			e.preventDefault();
			window.print();
		} );
	});
});
