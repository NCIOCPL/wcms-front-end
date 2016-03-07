define(function(require) {
    var $ = require('jquery');

/* ------------------------------------------------------------------------ */
/* We need to identify the audience (i.e. HP/patient) for the CTHP cards to */
/* style patient cards differently from HP cards.  An audience identifier   */
/* does not exists currently and we'll have to use the pages URL instead.   */
/* The URL ends in '/hp' (English) or '/pro' (Spanish) for health           */
/* professional content, so we're using this URL to create a new class      */
/* in order to properly style the patient cards.                            */
/*                                                                          */
/* This hack should be removed when an audience meta tag has been provided  */
/* We will then create the class cthp-patient-content based on that meta    */
/* tag.                                                                     */
/* ------------------------------------------------------------------------ */
    var myUrl = window.location.href;

    if (myUrl.search("/types/") > 0 || myUrl.search("/tipos/") > 0) {

       /* Note:  Prostate includes 'pro' */
       var re_en = /hp\b/;
       var re_es = /pro\b/;
       if (myUrl.search(re_en) == -1 && myUrl.search(re_es) == -1) {
        $('div.cthp-content').addClass('cthp-patient-content');
       }
    }
});
