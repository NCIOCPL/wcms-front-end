define(function(require) {
    var $ = require('jquery');
    //document ready
    $(function() {
        var page = $("body.pdqcancerinfosummary");

        if(page[0]) {
            var target = $('h1');
            var content = $('.pdq-hp-patient-toggle');
            target.after(content);
        }
    });
});
