define(function (require) {

    // Require modules Here
    var $ = require("jquery");

    //Include BriteJS for templating
    // brite.js AMD loader is broken. Forcing commonJS loader here by setting define to false
    var BriteJS = require("imports-loader?define=>false!brite");

    //Include the view for brite.
    require("./views/feedback_form.main.view.js");

    //Track actions on the Feedback Form:
    // - User presses ESC
    // - User clicks cancel button
    // - User Submits form
    // - User get server error on form submission
    // - User Clicks close button on thank you screen
    //Tracked events are passed to FeedbackFormClick() in NCIAnalyticsFunctions.js

    function _sendAnalytics(prop,searchType) {
        var analyticsProp5 = 'cts_' + searchType + '_feedback - ';
        analyticsProp5 += prop;
        if(!!NCIAnalytics && !!NCIAnalytics.FeedbackFormClick) {
            NCIAnalytics.FeedbackFormClick(this, analyticsProp5);
        }
    }

    function _create(options){

            // Create selectors that will determine prop value strings
            var searchType = '';
            var $basicSelector = $('#form--cts-basic');
            var $advSelector = $('#form--cts-advanced');

            // Look for the ID on the form element and set the prop5 value accordingly            
            if($basicSelector.length > 0) {
                searchType = 'basic';
            } else if($advSelector.length > 0) {
                searchType = 'advanced';
            }
            
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
                        _sendAnalytics("submit",searchType);
                        callback(false);
                    }).error(function(err) {
                        //TODO: ANALYTICS
                        _sendAnalytics("server_error",searchType);
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

                    var analyticsProp5 = 'cts_' + searchType + '_feedback - ';
                    if (!closure_reason) {
                        _sendAnalytics("esc_close",searchType);
                    } else {
                        _sendAnalytics(closure_reason,searchType);
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