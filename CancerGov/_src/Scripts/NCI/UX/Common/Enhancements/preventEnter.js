define(function(require) {
    var jQuery = require('jquery');
 
    function _initialize() {
            jQuery('[data-prevent-enter="true"]').submit( filterSubmit ); 
    }
    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var _initialized = false;
 
    function filterSubmit (event) { 
        if(!jQuery( document.activeElement ).is('[data-prevent-enter="false"]')) { 
            event.preventDefault(); 
        } 
    } 
 
    /**
     * Exposed functions of this module.
     */
    return {
        init: function() {
            if (_initialized) {
                return;
            }
            _initialize();
         
            _initialized = true;
        }
    }
 
});
