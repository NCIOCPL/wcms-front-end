define(function(require) {
	var $ = require('jquery');
	require('PDQ/pdqcis');
	$(document).ready(function($) {
		require('PDQ/Enhancements/pdqAnalytics').init();
	});
});
