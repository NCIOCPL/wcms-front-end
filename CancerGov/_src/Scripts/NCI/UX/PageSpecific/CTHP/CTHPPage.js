define(function(require) {
	require('CTHP/Enhancements/cthp_cards');
	require('Common/Enhancements/equal_heights');

    /* Hack to identify CTHP audience (HP/patient) for styling purposes */
	require('Patches/Hotfixes/OCEPROJECT-3953');
});
