import $ from 'jquery';

function _initialize() {
    $('.ctscb').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
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
 * Exposed functions available to this module.
 */
let initialized = false;
export default {
	init: function() {
		if (initialized) {
			return;
		}
		
		initialized = true;
		_initialize();
	}
}
