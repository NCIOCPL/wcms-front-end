define(function(require) {
	var $ = require('jquery');
	require('PDQ/pdqcis');
	$(function() {
		require('Common/Enhancements/analytics.After').init();
	});
});
