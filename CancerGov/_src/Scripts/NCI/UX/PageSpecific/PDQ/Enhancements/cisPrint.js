define(function(require) {
    var $ = require('jquery');
  
    /***
    * Main function
    */
    function _initialize() {

        // On initialize or resize event, call function to set add print class to element.
        var $allSections = $('.accordion section.show, .accordion section.hide');
        _setPrintClass($allSections);

        $(window).resize(function() {
            _setPrintClass($allSections);
        });
    }

    /** 
    * If the screen size is tablet or smaller, add the mobile print class. This class displays all sections, regardless of 'show' or 'hide' class. 
    * This is used for displaying all sections when printing from a small screen.
    * @param (object) $selector - jQuery selector
    */
    function _setPrintClass($selector) {
        if(window.innerWidth < 1025) {
            $selector.addClass('cis-mobile-print');
        } 
        else {
            $selector.removeClass('cis-mobile-print');
        }
    }
    
    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var initialized = false;

    /**
     * Exposed functions available to this module.
     */
    return {
        init: function() {
            if (initialized) {
                return;
            }

            _initialize();

            initialized = true;
        }
    };
});
