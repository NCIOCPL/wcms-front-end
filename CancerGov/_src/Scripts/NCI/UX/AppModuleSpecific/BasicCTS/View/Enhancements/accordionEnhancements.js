define(function(require) {
    var $ = require('jquery');
    require('jquery-ui');

	var urlParams;
	(window.onpopstate = function () {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);

		urlParams = {};
		while (match = search.exec(query))
		   urlParams[decode(match[1])] = decode(match[2]);
	})();

    function addControls($accordions){

        $accordions.each(function(i,e){
            var $this = $(this);

            var open = $('<a href="#" class="open-all"><span class="icon-expand"></span><span class="text">Open All</span></a>');
            var close = $('<a href="#" class="close-all"><span class="icon-collapse"></span><span class="text">Close All</span></a>');
            var controls = $('<div class="accordion-controls"></div>');

            var toggleAccordion = function(state){
                $this.find('section > h2 ').each(function(i,el){
                    var toggle = state !== 'open';
                    if($(this).is('.ui-state-active') === toggle) {
                        $this.accordion('option','active',i);
                    }
                });
            };

            open.click(function(e){
                e.preventDefault();
                toggleAccordion('open');
            });

            close.click(function(e){
                e.preventDefault();
                toggleAccordion('close');
            });

            controls.append(open).append(close);

            $this.before(controls);

        });

    }


    /**
     * Initialize this enhancement; Assume it is called from dom ready.
     * @return {[type]} Initialize Object
     */
    function _initialize() {

        var $accordion = $(".accordion");

        //activate the first section
        $accordion.accordion('option','active',0);
		
		// if showing all locations, expand accordion
		if(urlParams['all'] != null) {
			// find the section containing location information withing the accordion
			var locationIndex = $accordion.find("section#trial-location").index();
			
            // if the index is greater than -1, expand that accordion section.
			if(locationIndex >= 0) {
                $accordion.accordion('option', 'active', locationIndex);
			}
		}

        addControls($accordion);

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