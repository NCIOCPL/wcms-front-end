define(function(require) {
	var $ = require('jquery');
	require('Common/Enhancements/equal_heights');
	require('Common/Enhancements/sharecomponent');
	require('Common/Enhancements/clinicalTrialsDelighter');
	$(function() {
		require('Common/Enhancements/analytics.After').init();
	});
});
