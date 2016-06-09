/*
 This is a jQuery plug-in for turning links to audio files into a hidden jPlayer player.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery", "Patches/AdobeAnalytics"], factory);
    } else {
        // Browser globals
        factory(jQuery, window.s);
    }
}(function ($, s) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "basicctsformtrack",

        trackingConfig = {
            formVar: 'eVar47',
            formProp: 'prop74',
            formErrorProp: 'prop75',
            display: 'event37',
            start: 'event38',
            complete: 'event39',
            abandon: 'event40',
            error: 'event40'
        },

        defaults = {
            propertyName: "value",
            isDisplayed: false,
            isStarted: false,
            isComplete: false,
            canAbandon: false,
            lastFieldTouched: ''
        };

    // The actual plugin constructor
    function Plugin ( element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;  //Why are defaults to options being used to hold state?
        this._name = pluginName;

        //This is the name of the form we will send to Adobe
        this._formName = options.formName || '';

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            this._bindInputsOnChange();
            this._bindOnBeforeUnloadTrackingEvents();
            this._trackFormDisplayed();            
        },
        _bindInputsOnChange : function() {
            var self = this;
            var inputs = $(this.element).find(":input");

            inputs.each(function() {
                var $input = $(this);

                // whenever input value changes do something with input id
                // could change event - change method too
                $input.on('change', function() {
                    self._defaults.lastFieldTouched = this.id;

                    // set isStarted to true on a successful change
                    if (!self._defaults.isStarted) {
                        self._defaults.isStarted = true;
                        self._defaults.canAbandon = true;

                        self.adobeCall('start');
                    }
                });
            });

        },
        _bindOnBeforeUnloadTrackingEvents : function() {
            var self = this;

            $(window).on('beforeunload', function() {
                self.trackFormAbandonment();
            });
        },
        _trackFormDisplayed : function() {
            if (typeof $(this.element) === 'object') {
                this._defaults.isDisplayed = true;

                this.adobeCall('display');
            }
        },

        /**
         * Send a call to Adobe Servers
         * @param  {[type]} action The event to capture, 'abandon', 'error'
         * @return {[type]}        [description]
         */
        adobeCall: function(action) {
            s.linkTrackVars = 'events,' + trackingConfig.formProp + ',' + trackingConfig.formVar;                
            s.events = s.linkTrackEvents = trackingConfig[action];
            s[trackingConfig.formProp] = this._formName + '|' + action;
            s[trackingConfig.formVar] = this._formName;
            s[trackingConfig.formErrorProp] = '';

            if (action === 'abandon') {
                s[trackingConfig.formProp] += '|' + this._defaults.lastFieldTouched;
            }

            if (action === 'error') {
                s.linkTrackVars += ',' + trackingConfig.formErrorProp;

                // after concat
                s[trackingConfig.formErrorProp] = this.errorMessages;
            }

            var trackString = 'formAnalysis|' + s[trackingConfig.formProp];

            s.tl(true, 'o', trackString);
        },
        /**
         * Track that the form will be submitted, and everything should
         * be successful.
         * @return {[type]} [description]
         */
        completed: function() {
            // set canAbandon to false to prevent abandon call
            this._defaults.canAbandon = false;
            this._defaults.isComplete = true;

            this.adobeCall('complete');
        },

        /**
         * Track that the form has been abandoned.
         * @return {[type]} [description]
         */
        trackFormAbandonment: function() {
            // if form is started and can be abandoned, track it
            if (this._defaults.isStarted && this._defaults.canAbandon) {
                this.adobeCall('abandon');  
            }
        },

        /**
         * Pushes Error Messages to Analytics
         * @param  {[type]} errorMessages Array of objects that each contain field, message
         * @return {[type]}               [description]
         */
        errors: function(errorMessages) {
            // build concatenated string of error messages (field|message~field|message)
            var messageArray  = [];
            for(var i = 0, max = errorMessages.length; i < max; i++) {
              messageArray.push(errorMessages[i].field + '|' + errorMessages[i].message);
            }
            //Why store the error messages if we are doing the call.
            //we should pass them into the call.  Do we reference them later?
            this.errorMessages = messageArray.join('~');
            this.adobeCall('error');
        }


    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {

        // Handle normal plugin initialization
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options) );
            }
        });
    };

}));