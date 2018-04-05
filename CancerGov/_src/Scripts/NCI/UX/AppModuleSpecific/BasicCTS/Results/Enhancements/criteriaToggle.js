define(function(require) {
    require('jquery');

	function _initialize() {
        $('.ctscb').on('click', function(e){
            e.preventDefault();
            var link = $(this);
            link.toggleClass('show');
            link.next().slideToggle('fast', function() {
                if (this.offsetHeight) {
                    link.text('Hide Search Criteria');
                    this.setAttribute('aria-expanded','true');
                } else {
                    link.text('Show Search Criteria');
                    this.setAttribute('aria-expanded','false');
                }
            });

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
