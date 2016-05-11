define(function(require) {
    var $ = require('jquery');

    /***
    * This snippet will align the bottoms of the overview section and the second guide/feature/multimedia card 
    * on Cancer Type Home Pages. As of the Griffin release, the overview section is being moved to the left card 
    * column and should match the height of the first two slotted CTHP cards. If the Overview section is taller 
    * than the first two CTHP cards, the bottom of the second following CTHP will be expanded card to match. 
    * If the combined height of the first two cards is taller than the Overview section, the bottom of the Overview 
    * section will be expanded to match.
    * This will be done by creating a dummy class that will be appended to the correct element and resized 
    * based on the screen size. 
    **/
    function _initialize() {
        $(window).on('resize load', function() {
            var diff = "";
            var expander = "<div class='doublehigh-expand'></div>";

            // reset expand class class if it exists
            $( ".doublehigh-expand" ).remove();    
        
            // get visible heights of the cards and calulte the difference
            leftHeight = $('.cthp-intro-multimedia').height() - 15;
            rh0 = $('.cthpCard').eq(0).height();
            rh1 = $('.cthpCard').eq(1).height();
            rightHeight = rh0 + rh1 - 30; 
            diff = Math.abs(leftHeight - rightHeight);
            
            // append the expander class to the shorter of the elements
            if(leftHeight > rightHeight) {
                // Expand the second card if it exists. If not, expand the first card.
                if(rh1 > 0) {
                    $('.cthpCard .cardBody').eq(1).append(expander);
                }
                else if(rh0 > 0) {
                    $('.cthpCard .equalheight').eq(0).css('height','');
                    $('.cthpCard .cardBody').eq(0).append(expander);
                }
                $('.doublehigh-expand').css('height', (diff + 20) + 'px');
            }
            else if(leftHeight < rightHeight) {
                $('.cthp-intro-multimedia').append(expander);
                $('.doublehigh-expand').css('height', (diff - 20) + 'px');
            }
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