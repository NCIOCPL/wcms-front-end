/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {    
    var BriteJS = require("brite");
    require('Spinner');

    //Require Template
    var template = require('hbs!UX/AppModuleSpecific/BasicCTS/Common/Components/feedback_form/templates/feedback_form.pending');


    BriteJS.registerView("feedback_form.pending", {
        create: function(data) {
            return template(data);
        },
        init: function(data, config) {
            //Do stuff.
        },
        postDisplay: function(){
            var view = this;
            view.$el.find('.spinwrap').spin();            
        }
    });

});