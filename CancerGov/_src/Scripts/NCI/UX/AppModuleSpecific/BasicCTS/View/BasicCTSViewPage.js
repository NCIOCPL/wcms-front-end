define(function(require) {

	var $ = require('jquery');



	$(document).ready(function($){
		require('BasicCTSView/Enhancements/LocationFilter').init();
		require('BasicCTSView/Enhancements/accordionEnhancements').init();
		require('BasicCTSView/Enhancements/ctsViewAnalytics').init();
	});

});
