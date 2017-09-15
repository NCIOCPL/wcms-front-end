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
    return $.widget("nci.ctsautoselect", $.nci.highlighterautocomplete, {

        options: {
            source: false, //String or Promise
            //queryParam: false,
            //buttonText: 'Clear Selection'
        },

       source: function(request,response) {
           if (this.options.source) {
               this.options.source(request, response);
           }            
       }
    });

})); 