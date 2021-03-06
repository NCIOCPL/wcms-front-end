import $ from 'jquery';
import 'UX/Common/Plugins/Widgets/jquery.ui.imagecarousel'
import AdobeAnalytics from 'Patches/AdobeAnalytics';

function _initialize() {  
    // Get language for previous/next buttons
    var prev = "Previous";
    var next = "Next"; 
    if ($('html').attr("lang") === "es") {
        prev = "Anterior";
        next = "Siguiente";
    }

    // Set pagename variable for analytics function
    var pageName = 'www.cancer.gov/';
    var s = AdobeAnalytics.getSObject();
    if(typeof(s) !== 'undefined') {
        pageName = s.pageName;
    }

    // Iterate over each carousel on the page.
    $('.ic-carousel').each(function(i, el) {
        var $carousel = $(this).imagecarousel({
            // Attach on analytics handlers here
            change: function(event, eventData) {
                // Set variables for analytics function
                var safeTitle = $(this).imagecarousel('getTitle');
                if(safeTitle.length > 50) {
                    safeTitle = safeTitle.substring(0,50);
                }
                if (safeTitle.length == 0) {
                    safeTitle = "none";
                }
                var action = eventData.triggerEvent;
                var direction = eventData.direction;
                var imgNum = eventData.beforeIndex + 1;

                NCIAnalytics.ImageCarouselClickSwipe($(this), safeTitle, action, direction, imgNum, pageName);
            },
            previousText: prev,
            nextText: next
        });

        // check if carousel is inside an accordion, which can cause it's width to be 0 if accordion panel is not visible
        $(window).on('accordionactivate',function(e,ui){
            // on activation of accordion panels, check that the activated panel is the same one the carousel is in
            if($carousel.closest('.ui-accordion-content').is(ui.newPanel)){
                // use setPosition to trigger a redraw so width is not 0
                $carousel.imagecarousel('setPosition');
            }
        });

    });
}

let initialized = false;
export default function() {
    if (initialized) {
        return;
    }

    initialized = true;
    _initialize();
}
