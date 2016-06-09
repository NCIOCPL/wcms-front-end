define(function(require) {
    var $ = require('jquery');
    require('jquery-ui');



    function addControls($accordions){

        $accordions.each(function(i,e){
            var $this = $(this);

            var controls = '<div class="accordion-controls"><a href="#" class="open-all"><span class="icon-expand"></span><span class="text">Open All</span></a><a href="#" class="close-all"><span class="icon-collapse"></span><span class="text">Close All</span></a></div>';

            $this.before(controls);
        });

    }


    /**
     * Initialize this enhancement; Assume it is called from dom ready.
     * @return {[type]} Initialize Object
     */
    function _initialize() {

        var $accordion = $(".accordion");

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