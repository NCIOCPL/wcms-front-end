define(function(require) {
    var $ = require('jquery');
    require('jquery-ui');



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