define(function(require) {

    /*
     This module can be imported using a require statement
     var myModule = require('Modules/module-prototype-template');

     It must be initialized using the 'new' keyword since it uses a constructor.
     The constructor allows for multiple instance of the same module without creating a new
     copy of the module for each instance, using less memory

     var thisModuleInstance = new myModule({setting1:'hello world'});
     var otherModuleInstance = new myModule({setting1:'hello mars'});

     Public methods are now available to execute
     thisModuleInstance.publicVar; => 'example'
     thisModuleInstance.init(); => executes initialize method
     */

    // Add dependencies for this module
    var $ = require('jquery');

    // Module variables
    var publicVar = 'example',
        _privateVar = 'example',
        _initialized = false;

    // Module Constructor
    var myModule = function(settings) {
        this.defaultOptions = {
            setting1: 'Hello'
        };
        this.publicVar = 'example';
    };

    // Module methods
    myModule.prototype = function() {
        var initialize = function(settings) {
            // extend defaults with settings
            this.options = $.extend({}, this.defaultOptions, settings);
        };

        var publicFunction = function(){
            // this function will be publicly available
        };

        var _privateFunction = function(){
            // this function will be private
        };

        return {
            init: initialize,
            publicFunc: publicFunction
        }

    };


});