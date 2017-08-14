//
define(function(require) {
    require('jquery');

    $(".clinicaltrials-results-criteria-display").hide();
    $('.ctscb').click(function(){
        var link = $(this);
        $('.clinicaltrials-results-criteria-display').slideToggle('fast', function() {
            if ($(this).is(":visible")) {
                 link.text('Hide Search Criteria');
            } else {
                 link.text('Show Search Criteria');
            }
        });

    });

/**
 * Identifies if this enhancement has been initialized or not.
 * @type {Boolean}
 */
var initialized = false;

/**
 * Exposed functions available to this module.
 */
return {
    init: function() {
        if (initialized) {
            return;
        }

        _initialize();
        initialized = true;
    }
};
});
