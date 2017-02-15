define(function(require) {
	require('Common/Enhancements/carousel');
	require('Common/Enhancements/clinicalTrialsDelighter');
    require('Plugins/jquery.nci.equal_heights');

    $(function() {
        require('Home/Enhancements/espanolHome').init();

        $('[data-match-height]').NCI_equal_heights();
    });
});
