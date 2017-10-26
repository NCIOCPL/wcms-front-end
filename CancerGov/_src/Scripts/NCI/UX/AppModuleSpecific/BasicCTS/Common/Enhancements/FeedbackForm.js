define(function(require){
    require('spin.js/jquery.spin');
    var FeedbackFormComponent = require('BasicCTSCommon/Components/feedback_form/feedback_form.component');



    function _openFeedbackForm($delighterControl) {

        $dialog = FeedbackFormComponent.show({
            MailRecipientKey: 'CTSFeedbackRecipient'
        });
    }   

    // Initialization for this enhancement.
	function _initialize() {
        $delighterContainer = $(".delighter-rail");
        if ($delighterContainer) {


            var $feedbackDelighter = $("<div></div>", {
	            class: "delighter cts-feedback"
            }).on('click', function(){
                _openFeedbackForm($feedbackDelighter);
				_openFeedbackFormFormAnalytics();
                return false;
            }).appendTo($delighterContainer)
            .append(
	            $("<a></a>", {
		            href: "#"
	            }).html(
                    '<h4>Send us your feedback</h4>' +
                    '<p>Help us improve our clinical trials search.</p>'
                )
            );

            $delighterContainer.find(".view-delighter-share").remove().appendTo($delighterContainer);
        }
    }
    
    // Initialize Feedback Form analytics tracking upon opening of the form
	// Tracked events are passed to FeedbackFormClick() in NCIAnalyticsFunctions.js
	//  - Track clicks on the Right Rail to open the feedback form
    function _openFeedbackFormFormAnalytics(){
        if(!!NCIAnalytics && !!NCIAnalytics.FeedbackFormClick) {
            NCIAnalytics.FeedbackFormClick(this, 'rrail_send us your feedback');
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

