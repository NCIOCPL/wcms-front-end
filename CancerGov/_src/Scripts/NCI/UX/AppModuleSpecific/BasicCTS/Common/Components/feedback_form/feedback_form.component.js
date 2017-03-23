define(function (require) {

    // Require modules Here
    var $ = require("jquery");

    //Include BriteJS for templating
    var BriteJS = require("brite");

    //Include the view for brite.
    var mainView = require("UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/views/feedback_form.main.view");

    //Track actions on the Feedback Form:
    // - User presses ESC
    // - User clicks cancel button
    // - User Submits form
    // - User get server error on form submission
    // - User Clicks close button on thank you screen
    //Tracked events are passed to FeedbackFormClick() in NCIAnalyticsFunctions.js
    function _sendAnalytics(prop) {
        var analyticsProp5 = "cts_basic_feedback - ";
        analyticsProp5 += prop;
        if(!!NCIAnalytics && !!NCIAnalytics.FeedbackFormClick) {
            NCIAnalytics.FeedbackFormClick(this, analyticsProp5);
        }
    }

    function _create(options){

            //Create Holder for App
            var $content_elem = $("<div></div>");

            //Var used to track the reason the dialog was
            //closed.
            var closure_reason = false;

            // Display Initial View
            BriteJS.display("feedback_form.main", $content_elem, {
                submitCallback: function(content, callback) {
                    //Return promise?
                    $.ajax({
                        type: "POST",
                        url: '/Feedback.Service',
                        data: JSON.stringify({
                            Message: content,
                            URL: window.location.pathname + window.location.search,
                            MailRecipientKey: options.MailRecipientKey
                        }),
                        dataType : 'json',
                        contentType: 'application/json; charset=utf-8',
                        encode: true
                    }).done(function(data) {
                        _sendAnalytics("submit");
                        callback(false);
                    }).error(function(err) {
                        //TODO: ANALYTICS
                        _sendAnalytics("server_error");
                        callback(err);
                    })
                }, 
                closeCallback: function(reason) {

                    //Set the closure reason so we can
                    //access it in the dialog close event.
                    closure_reason = reason;

                    //regardless of the reason, we need to close
                    //the dialog.  The reason will be used for 
                    //analytics
                    $content_elem.dialog("close");
                }
            });

            // Create dialog on initial content element
            var dialog = $content_elem.dialog({
                dialogClass: 'cts-feedback-dialog',
                title: 'Send us your feedback',
                autoOpen: false,
                modal: true,
                resizable: false,
                draggable: false,            
                width: '600px',
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                create: function(evt, ui) {
                    $(evt.target).parent().find('ui-dialog-titlebar').hide();                
                },
                close: function(evt, ui) {
                    //TODO: RAISE ANALYTICS EVENT

                    var analyticsProp5 = "cts_basic_feedback - ";
                    if (!closure_reason) {
                        _sendAnalytics("esc_close");
                    } else {
                        _sendAnalytics(closure_reason);
                    }

                    $content_elem.dialog("destroy");
                }
            });

            //Close at tablet, recenter on resize.
            $(window).resize(function() {
                var curWidth = window.innerWidth || $(window).width();

                if (curWidth < 1024) {
                    dialog.dialog("close");
                } else {
                    dialog.dialog(
                        "option",
                        "position",
                        {
                            my: "center",
                            at: "center",
                            of: window
                        }
                    )
                }
            });

            $content_elem.dialog("open");
 
            return $content_elem;
        }

    return {        
        show: function(options) {
            _create({
                MailRecipientKey: 'CTSFeedbackRecipient'
            });
        }         
    }

});