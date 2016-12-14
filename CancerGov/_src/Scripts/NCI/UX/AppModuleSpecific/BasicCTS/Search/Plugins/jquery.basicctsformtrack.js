(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery", "Patches/AdobeAnalytics"], factory);
    } else {
        // Browser globals
        factory(jQuery, {
          getInstance: function() {
              return window.s;
          }
        });
    }
}(function ($, sInstance) {

    "use strict";

    //Use the s object returned by our wrapper for getting to
    //window.s.

    $.widget( "NCI.basicctsformtrack", {
        options: {
            formName:'',
            propertyName: "value" //Where is this used?
        },
        state: {
          isDisplayed: false,
          isStarted: false,
          isComplete: false,
          canAbandon: false,
          lastFieldTouched: ''
        },
        trackingConfig: {
            formVar: 47,
            formProp: 74,
            formErrorProp: 75,
            display: 37,
            start: 38,
            complete: 39,
            abandon: 40,
            error: 41,
			keywordMatch: 46
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
                $input.on('change keyup paste', function() {
                    self.state.lastFieldTouched = this.id;

                    // set isStarted to true on a successful change
                    if (!self.state.isStarted) {
                        self.state.isStarted = true;
                        self.state.canAbandon = true;

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
                this.state.isDisplayed = true;

                this.adobeCall('display');
            }
        },

        /**
         * Send a call to Adobe Servers
         * @param  {[type]} action The event to capture, 'abandon', 'error'
         * @return {[type]}        [description]
         */
        adobeCall: function(action, args) {

            if(typeof(NCIAnalytics) !== 'undefined') {
                var formPropHolder = this.options.formName + '|' + action;
                var trackString = 'formAnalysis|' + formPropHolder;
                var clickParams = new NCIAnalytics.ClickParams(true, 'nciglobal', 'o', trackString);

                var props = {};
                var evars = {};
                var events = [];

                events.push(this.trackingConfig[action]);

                props[this.trackingConfig.formProp] = formPropHolder;

                //s.linkTrackVars = 'events,' + this.trackingConfig.formProp + ',' + this.trackingConfig.formVar;
                //s.events = s.linkTrackEvents = this.trackingConfig[action];

                props[this.trackingConfig.formProp] = this.options.formName + '|' + action;
                evars[this.trackingConfig.formVar] = this.options.formName;
                //props[this.trackingConfig.formErrorProp] = '';

                if (action === 'abandon') {
                    props[this.trackingConfig.formProp] += '|' + this.state.lastFieldTouched;
                }

                if (action === 'error') {
                    //s.linkTrackVars += ',' + this.trackingConfig.formErrorProp;
                    // after concat
                    props[this.trackingConfig.formErrorProp] = args;
                }

                if (action === 'complete') {
                    if (args) {
                        events.push(this.trackingConfig["keywordMatch"]);
                    }
                }

                clickParams.Props = props;
                clickParams.Evars = evars;
                clickParams.Events = events;
                clickParams.LogToOmniture();
            }
        },
        /**
         * Track that the form will be submitted, and everything should
         * be successful.
         * @return {[type]} [description]
         */
        completed: function(hasKeywordMatch) {
            // set canAbandon to false to prevent abandon call
            this.state.canAbandon = false;
            this.state.isComplete = true;

            this.adobeCall('complete', hasKeywordMatch);
        },

        /**
         * Track that the form has been abandoned.
         * @return {[type]} [description]
         */
        trackFormAbandonment: function() {

            // if form is started and can be abandoned, track it
            if (this.state.isStarted && this.state.canAbandon) {
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
            var joinedErrorMessages = messageArray.join('~');

            this.adobeCall('error', joinedErrorMessages);
        }

    });
}));
