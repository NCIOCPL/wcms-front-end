/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {

    var BriteJS = require("imports-loader?define=>false!brite");

    //Require Template
    var template = require('../templates/feedback_form.completed.hbs');

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