define(function(require) {
    var $ = require('jquery');
    require('jquery-ui');

    /***
    * Main function
    */
    function _initialize() {
        
        // If this view page has the "rl=" param set, keep that param in place if we switch the location list view.
        // This will keep the "back to search results" text on the page.
        var params = window.location.search;
        if(params.indexOf('&rl=') > -1)
        {
            $selector = $('#filterable-trialslist .right.location-link a, #proximity-trialslist .right.location-link a');
            $href = $selector.attr('href');
            if($href.indexOf('#') > -1) {
                $href = $href.replace('#','&rl=1#');
                $selector.attr('href', $href);
            }
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
