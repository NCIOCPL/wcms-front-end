define(function(require) {
	require('Common/Enhancements/sharecomponent');
	require('Inner/Enhancements/clinicalTrialsDelighter');
	$(function() {
		require('Common/Enhancements/analytics.After').init();
	});
});
