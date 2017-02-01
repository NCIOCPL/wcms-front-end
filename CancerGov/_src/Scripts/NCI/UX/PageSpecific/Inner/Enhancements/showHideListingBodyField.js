define(function(require) {
   /* Logic for displaying either the body field or alternate text, depending on number of trials shown.
    * If the "listing-no-trials" ID is present, do not show the bodyfield by default. 
    * BUT -- if the "listing-keep-body" ID is present, keep displaying the bodyfield even if no results.
    */
    var $ = require('jquery');
    var bodyFieldWrapper = $('#cgvBody .first-SI');
    var noTrialsWrapper = $('#listing-no-trials');
    var keepBodyWrapper = $('#listing-keep-body');
    
    if(noTrialsWrapper.length > 0 && bodyFieldWrapper.length > 0) {
        if(keepBodyWrapper.length < 1) {
            $('#cgvBody .first-SI').css('display','none');
        }
    }
});