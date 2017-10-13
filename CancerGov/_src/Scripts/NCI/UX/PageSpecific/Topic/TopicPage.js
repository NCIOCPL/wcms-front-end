define(function(require) {
	var $ = require('jquery');
	require('Plugins/jquery.nci.equal_heights');
	require('Common/Enhancements/sharecomponent');
	$(function() {
		require('Common/Enhancements/clinicalTrialsDelighter').init();
		$('[data-match-height]').NCI_equal_heights();
		require('Common/Enhancements/analytics.After').init();
	});
});
