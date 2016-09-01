/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {

    var BriteJS = require("brite");

    //Require Template
    var template = require('hbs!UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/templates/feedback_form.completed');

    BriteJS.registerView("feedback_form.completed", {
        create: function(data) {
            return template(data);
        },
        init: function(data, config) {
            //Do stuff.
        },
        events: {            
            "click; #cts-feedback-close" : function(event) {
                event.preventDefault();
                event.stopPropagation();

                var view = this;
 
                view.$el.trigger("FEEDBACK_ENDCLOSE");
            }
        }
    });

});