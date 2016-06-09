define(function(require) {

	var $ = require('jquery');



	$(document).ready(function($){
		require('BasicCTSView/Enhancements/LocationFilter').init();
	});

});