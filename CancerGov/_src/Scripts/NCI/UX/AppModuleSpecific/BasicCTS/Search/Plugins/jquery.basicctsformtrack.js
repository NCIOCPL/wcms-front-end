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

    $.widget( "NCI.basicctsformtrack", {
        options: {
            formName:'',
            propertyName: "value",
            isDisplayed: false,
            isStarted: false,
            isComplete: false,
            canAbandon: false,
            lastFieldTouched: ''
        },
        trackingConfig: {
            formVar: 'eVar47',
            formProp: 'prop74',
            formErrorProp: 'prop75',
            display: 'event37',
            start: 'event38',
            complete: 'event39',
            abandon: 'event40',
            error: 'event40'
        },
        _create: function(){
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
                    self.options.lastFieldTouched = this.id;

                    // set isStarted to true on a successful change
                    if (!self.options.isStarted) {
                        self.options.isStarted = true;
                        self.options.canAbandon = true;

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
                this.options.isDisplayed = true;

                this.adobeCall('display');
            }
        },

        /**
         * Send a call to Adobe Servers
         * @param  {[type]} action The event to capture, 'abandon', 'error'
         * @return {[type]}        [description]
         */
        adobeCall: function(action) {
            s.linkTrackVars = 'events,' + this.trackingConfig.formProp + ',' + this.trackingConfig.formVar;
            s.events = s.linkTrackEvents = this.trackingConfig[action];
            s[this.trackingConfig.formProp] = this._formName + '|' + action;
            s[this.trackingConfig.formVar] = this._formName;
            s[this.trackingConfig.formErrorProp] = '';

            if (action === 'abandon') {
                s[this.trackingConfig.formProp] += '|' + this.options.lastFieldTouched;
            }

            if (action === 'error') {
                s.linkTrackVars += ',' + this.trackingConfig.formErrorProp;

                // after concat
                s[this.trackingConfig.formErrorProp] = this.errorMessages;
            }

            var trackString = 'formAnalysis|' + s[this.trackingConfig.formProp];

            s.tl(true, 'o', trackString);
        },
        /**
         * Track that the form will be submitted, and everything should
         * be successful.
         * @return {[type]} [description]
         */
        completed: function() {
            // set canAbandon to false to prevent abandon call
            this.options.canAbandon = false;
            this.options.isComplete = true;

            this.adobeCall('complete');
        },
        /**
         * Track that the form has been abandoned.
         * @return {[type]} [description]
         */
        trackFormAbandonment: function() {
            // if form is started and can be abandoned, track it
            if (this.options.isStarted && this.options.canAbandon) {
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
}));