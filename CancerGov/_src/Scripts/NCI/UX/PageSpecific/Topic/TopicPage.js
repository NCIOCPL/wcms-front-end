define(function(require) {
	var $ = require('jquery');
	require('Plugins/jquery.nci.equal_heights');
	require('Common/Enhancements/sharecomponent');
	require('Common/Enhancements/clinicalTrialsDelighter');
	$(function() {
		require('Common/Enhancements/analytics.After').init();

		$('[data-match-height]').NCI_equal_heights();
	});
});
