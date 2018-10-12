define(function (require) {

	var $ = require('jquery');

	var _initialized = false;

	function _initialize() {			
		$('select:not([multiple]):not(.no-auto-jqueryui)').each(function () {
			var $this = $(this);

			$this.selectmenu({
				change: function (event, ui) {
					// This calls the parent change event, e.g. so that .NET dropdowns can autopostback
					ui.item.element.change();
				},
				width: $this.hasClass('fullwidth') ? '100%' : null
			}).selectmenu('menuWidget').addClass('scrollable-y');
		});
	}

	/**
	 * Exposed functions of this module.
	 */
	return {
		init: function () {
			if (!_initialized) {
				_initialize();
			}
		}
	};

});
