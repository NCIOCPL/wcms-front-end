/*!
 * jQuery UI Widget-factory plugin for autosuggest text boxes that allow a user to type
 * ahead, and select a single item from a list of items.
 * Author: @bryanp
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui", 'UX/Common/Plugins/Widgets/jquery.ui.highlighterautocomplete'], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    console.log($);
    console.log($.ui.highlighterautocomplete);
    return $.widget("nci.ctsautoselect", $.ui.highlighterautocomplete, {

        options: {
            //source: false, //String or Promise
            //queryParam: false,
            //buttonText: 'Clear Selection'
        },

       source: function(request,response) {
           console.log(request);
       }
    });

})); 