// write the mobile menu
$(document).ready(function() {
    var $mobileNav = $('#mega-nav > .nav-menu');

    // Global mobile nav functionality
    var styleMobileNav = function() {
        $('#mega-nav li li div > .toggle[aria-expanded="false"]').parent('div').parent('li').children('ul').hide();
        // highlight active items
        $("#mega-nav li li > div > .toggle[aria-expanded='true']").closest("li").addClass("highlight");
        $('#mega-nav .nav-menu > li').addClass("highlight");

        $('#mega-nav div > a').on('mousedown mouseup mouseleave touchstart touchend touchcancel', function(e) {
            $(this).toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
            $(this).parent('div').toggleClass('active', e.type === 'mousedown' || e.type === 'touchstart');
        });
    };

    var functionMobileNav = function() {
        // Add toggle functionality
        $('#mega-nav .toggle').click(function(event) {
            event.stopPropagation();
            var t = $(this);
            var closest = t.closest("li");
            var aria_expanded = t.attr('aria-expanded');
            // If the toggle is open, do this
            if (aria_expanded == 'true' ) {
                closest.find("button[aria-expanded='true']").closest("li").children("ul").slideToggle("slow", function() {
                    //Animation complete
                });
                closest.find(".toggle").attr('aria-expanded','false');
                // remove highlight class
                closest.removeClass("highlight");
                // add highlight back to parent
                closest.parent('ul').parent('li').addClass('highlight');
                // Stop processing
                return;
            }
            else if (aria_expanded == 'false' ) { // If the toggle is closed, do this
                // close any open siblings and their children...
                closest.siblings().children("div").children("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
                    //Animation complete
                });
                // ...and add proper ARIA to indicate those siblings and children are closed
                closest.siblings().children("div").children("button").attr('aria-expanded','false');
                // slide open list of nav elements for selected button
                closest.children("ul").slideToggle( "slow", function() {
                    // Animation complete.
                });
                // add ARIA to indicate this section has been opened
                t.attr('aria-expanded','true');
                // remove highlight class from any other items
                t.closest("#mega-nav").find("li").removeClass("highlight");
                // add highlight class to this item
                closest.addClass("highlight");
                return;
            }
        });
    };

    styleMobileNav();
    functionMobileNav();
});
