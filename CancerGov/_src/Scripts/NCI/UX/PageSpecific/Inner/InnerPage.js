define(function(require) {
	require('Common/Enhancements/sharecomponent');
	require('Inner/Enhancements/showHideListingBodyField');
	$(function() {
		require('Common/Enhancements/clinicalTrialsDelighter');
		require('Common/Enhancements/analytics.After').init();
	});
});
