/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {

    var BriteJS = require("imports-loader?define=>false!brite");

    //Require Template
    var template = require('../templates/feedback_form.form.hbs');

    BriteJS.registerView("feedback_form.form", {
        create: function(data) {
            return template(data);
        },
        init: function(data, config) {
            //Do stuff.
        },
        events: {
            "click; #cts-feedback-submit" : function(event) {
                event.preventDefault();
                event.stopPropagation();

                var view = this;

                //Get message & validate
                var $message = this.$el.find('#cts-feedback-message');

                if (!_validateNotNull($message.val())) {
                    $message.data('error-message',"Please enter a message");
                    _toggleError(false,$message);
                } else if (!_validateBadChars($message.val())) {
                    $message.data('error-message',"Message contains unsafe characters");
                    _toggleError(false,$message);
                }else {
                    _toggleError(true,$message);

                    //Raise event on view
                    view.$el.trigger("FEEDBACK_SUBMITTED", $message.val());
                }

                return false;
            },
            "click; #cts-feedback-cancel" : function(event) {
                event.preventDefault();
                event.stopPropagation();

                var view = this;

                view.$el.trigger("FEEDBACK_CANCELLED");
            }
        }
    });

    function _validateNotNull(val){
		return val.length !== 0;
	}

    function _validateBadChars(val){
        return true;
    }

  	function _toggleError(valid,el,skipTrue){

		if(valid && !skipTrue){
			el.removeClass("error");
			el.prev('.error-msg').css('visibility','hidden');
		}
		if(!valid){
			el.addClass("error");
			if(el.prev('.error-msg')[0]){
				el.prev('.error-msg').css('visibility','visible');
			} else {
				el.before('<div class="error-msg">' + el.data("error-message") + '</div>');
                _sendErrorAnalytics();
				//TODO: Log Error Message Here.  It would be nice to have an instance of
				//this...
			}
		}
	}

	// Track error event on the Feedback Form
    function _sendErrorAnalytics() {
        var analyticsProp5 = 'cts_feedback - error';
        if(!!NCIAnalytics && !!NCIAnalytics.FeedbackFormClick) {
            NCIAnalytics.FeedbackFormClick(this, analyticsProp5);
        }
    }

});
