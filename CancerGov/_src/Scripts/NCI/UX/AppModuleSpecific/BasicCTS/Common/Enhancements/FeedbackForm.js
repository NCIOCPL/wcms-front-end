define(function(require){
    var $ = require('jquery');
    require('jquery-ui');
    require('Spinner');
    var FeedbackFormComponent = require('UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/feedback_form.component');


    function _openFeedbackForm($delighterControl) {

        $dialog = FeedbackFormComponent.show({
            MailRecipientKey: 'CTSFeedbackRecipient'
        });
    }   

    // Initialization for this enhancement.
	function _initialize() {
        $delighterContainer = $(".delighter-rail");
        if ($delighterContainer) {

            var $feedbackDelighter = $("<a></a>", {
                href: "#"
            }).on('click', function(){                
                _openFeedbackForm($feedbackDelighter);                
				_initializeFeedbackFormAnalytics();
                return false;
            }).prependTo($delighterContainer)
            .append(
                $('<div></div>', {
                    class: "delighter cts-feedback"
                }).html(
                    '<h4>Send us your feedback</h4>' +
                    '<p>Help us make clinical trials searching better</p>'    
                )
            ); 
        }
    }
    
    // Initialize Feedback Form analytics tracking upon opening of the form
	// Tracked events are passed to FeedbackFormClick() in NCIAnalyticsFunctions.js
	//  1) Track clicks on the Right Rail to open the feedback form
	//  2) Track "cancel" button click in the form (event is bound to the form's button element containing "Close" as inner text)
	//  3) Track "submit" button click in the form (event is bound to the form's button element with the "submit" class attribute)
	// - TODO: Update jQuery elements as needed once design is finalized
    function _initializeFeedbackFormAnalytics(){
        if(!!NCIAnalytics && !!NCIAnalytics.FeedbackFormClick) {
            // 1) Track feedback form opening on right rail
            NCIAnalytics.FeedbackFormClick(this, 'rrail_send us your feedback');
			
            // 2) Track cancel/close events inside the feedback form
            $(".cts-feedback-dialog button:contains('Close')").each(function(i,el){
                $(el).click(function(e){
                    NCIAnalytics.FeedbackFormClick(this, 'cts_basic_feedback - dismiss');
                });
            });

            // 3) Track submit events inside the feedback form
            $(".cts-feedback-dialog button.submit.button").each(function(i,el){
                $(el).click(function(e){
                    NCIAnalytics.FeedbackFormClick(this, 'cts_basic_feedback - submit');
                });
            });
        }
    }
	
    /* Flag for telling whether this enhancement has been initialized. */
	var _initialized = false;
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(_initialized)
				return;

			_initialize();

			_initialized = true;
		}		
	};

});

