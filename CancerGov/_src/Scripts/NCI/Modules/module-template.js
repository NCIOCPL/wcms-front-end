define(function(require) {

    /**
    This module can be imported using a require statement
     var myModule = require('Modules/module-template');
     myModule.publicVar; => 'example'
     myModule.init(); => executes initialize method

     For multiple instances of this module it must be assigned to a new variable
     var myOtherModule = require('Modules/module-template');
     myOtherModule.publicVar; => 'example'
     myOtherModule.init(); => executes initialize method
     */

    // Add dependencies for this module
    var $ = require('jquery');

    // Module variables
    var publicVar = 'example',
        _privateVar = 'example',
        _initialized = false;


    // Intended as a public function
    var initialize = function(settings) {
        // this function will be publicly available
    };

    //Intended as a private function
    var _private = function () {
        //do something scoped to this module's closure
    };

    /**
     * Exposed functions and variables of this module.
     */
    return {
        publicVar: publicVar,
        init: function (settings) {
            if (!_initialized) {
                _initialize(settings);
            }
        }
    };
    
});