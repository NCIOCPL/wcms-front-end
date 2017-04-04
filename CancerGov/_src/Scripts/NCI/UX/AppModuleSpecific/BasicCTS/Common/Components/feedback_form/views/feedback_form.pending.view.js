/**
 * BriteJS View for displaying Feedback Form
 */
define(function (require) {    
    var BriteJS = require("imports-loader?define=>false!brite");
    require('spin.js/jquery.spin');

    //Require Template
    var template = require('../templates/feedback_form.pending.hbs');


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