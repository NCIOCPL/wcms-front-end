define(function(require) {
    var $ = require('jquery');
    
    /**
    * Main function
    */
    function _initialize() {

        // Create regex to replace forward slashes in path name
        var path = location.pathname;
        var fs = /\//g;
        path = path.replace(fs, '');
        
        // Check if this is the Spanish home page. If so, add the "spanish-home" class to the body.
        if(path == 'espanol') {
            $('.ncilandingpage').addClass('espanol-home');
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
