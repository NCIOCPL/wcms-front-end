/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {

    var BriteJS = require("brite");

    //Require Template
    var template = require('hbs!UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/templates/feedback_form.main');

    //Require Child Views
    var formView = require("UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/views/feedback_form.form.view");
    var pendingView = require("UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/views/feedback_form.pending.view");
    var completedView = require("UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/views/feedback_form.completed.view");
 
    var submitCallback = false;
    var closeCallback = false;

    BriteJS.registerView("feedback_form.main", {emptyParent:true}, {
        create: function(data) {
            //I am going to misuse the data object here to 
            //hold callbacks for submitting the feedback and
            //cancelling the form.

            submitCallback = data.submitCallback;
            closeCallback = data.closeCallback;

            return template({});
        },
        //Handle events from sub elements (like submit feedback)
        events: {
            "FEEDBACK_SUBMITTED": function(event, args) {

                //Show the pending view.
                var view = this;                
                var targetEl = view.$el.find('.contents').bEmpty();
                brite.display('feedback_form.pending', targetEl);

                //Submit Data
                submitCallback(args, function() {

                    //NOTE: We don't care if there was an error or not
                    //that is for the backlog

                    //When it is done, show thank you
                    var targetEl2 = view.$el.find('.contents').bEmpty();
                    var thankYouPromise = brite.display('feedback_form.completed', targetEl2);
                });
            }, 
            "FEEDBACK_CANCELLED": function(event, args) {
                closeCallback("dismiss");
            },
            "FEEDBACK_ENDCLOSE": function(event, args) {
                closeCallback("thank_close");
            }

        },        
        postDisplay: function(){
            //Load the form on initial request
            var view = this;
            var target = view.$el.find('.contents').bEmpty();
            brite.display("feedback_form.form", target);
        }
    });

}); 