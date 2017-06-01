define(function(require) {

    var $ = require('jquery');

    var _initialized = false;

    function _initialize() {

    }

    /**
     * Exposed functions of this module.
     */
    return {
        init: function () {
            if (!_initialized) {
                _initialize();
            }
        }
    };
    
});