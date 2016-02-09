define(function(require) {
	require('CTHP/Enhancements/cthp_cards');
	require('Common/Enhancements/equal_heights');
    var myUrl = window.location.href;

    /* Need to identify HP/patient cards to style patient card differently */
    /* Using the current page's URL since there is no other mechanism      */
    /* available to identify the audience.                                 */
    /* This hack should be removed when an audience meta tag has been      */
    /* provided                                                            */
    /* ------------------------------------------------------------------- */
    if (myUrl.search("/types/") > 0 || myUrl.search("/tipos/") > 0) {
       if (myUrl.search("/hp") == -1 && myUrl.search("/pro") == -1) {
        $('div.cthp-content').addClass('cthp-patient-content');
       }
    }
});
