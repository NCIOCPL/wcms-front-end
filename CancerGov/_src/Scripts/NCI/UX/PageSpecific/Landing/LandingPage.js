define(function(require) {
	require('Modules/carousel/carousel');

	$(function() {
		require('Common/Enhancements/clinicalTrialsDelighter').init();
	});
});
