define(function(require) {
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
    var $ = require('jquery');
    $(function() {
        /*** Begin 2-high resizing ***/
        $(window).on('resize load', function() {
            var diff = "";
            var expander = "<div class='doublehigh-expand'></div>";

            // reset expand class class if it exists
            $( ".doublehigh-expand" ).remove();    
        
            // get visible heights of the cards and calulte the difference
            leftHeight = $('.cthp-intro-multimedia').height() - 15;
            rh1 = $('.cthpCard').eq(0).height() - 15;
            rh2 = $('.cthpCard').eq(1).height() - 15;
            rightHeight = rh1 + rh2;
            diff = Math.abs(leftHeight - rightHeight);
            
            // append the expander class to the shorter of the elements
            if(leftHeight > rightHeight) {
                $('.cthpCard .cardBody').eq(1).append(expander);
                $('.doublehigh-expand').css('height', (diff + 20) + 'px');
            }
            if(leftHeight < rightHeight) {
                $('.cthp-intro-multimedia div').append(expander);
                $('.doublehigh-expand').css('height', (diff - 20) + 'px');
            }
        });
        /*** End 2-high resizing ***/
    });
});
