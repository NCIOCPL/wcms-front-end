define(function(require) {
	require('Common/Enhancements/sharecomponent');
	require('Common/Enhancements/clinicalTrialsDelighter');
	$(function() {
		require('Common/Enhancements/analytics.After').init();
	});
});
