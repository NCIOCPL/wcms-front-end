define(function(require) {
   /* Logic for displaying either the body field or alternate text, depending on number of trials shown.
    * This uses the "listing-show-trials" and "listing-no-trials" selectors. If "listing-no-trials" is found on the page, hide elements wrapped in "listing-show-trials".
    */
    var $ = require('jquery');
    var bodyFieldWrapper = $.find('#listing-show-trials');
    var noTrialsWrapper = $.find('#listing-no-trials');
    if(noTrialsWrapper.length > 0 && bodyFieldWrapper.length > 0) {
        $('#listing-show-trials').css('display','none');
    }    

});
