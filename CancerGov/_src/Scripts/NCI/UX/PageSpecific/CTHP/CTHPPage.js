define(function(require) {
	require('CTHP/Enhancements/cthp_cards');
	require('Plugins/jquery.nci.equal_heights');

	$(function() {
		$('[data-match-height]').NCI_equal_heights();
	});

});