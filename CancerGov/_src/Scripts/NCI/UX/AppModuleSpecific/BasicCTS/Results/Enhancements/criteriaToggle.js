define(function(require) {
    require('jquery');

	function _initialize() {
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
        $(function() {
          $('.ctscb').click(function() {
            $(this).toggleClass('show');
          })
        });
    }

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
