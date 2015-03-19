NCI.Nav = {
    openClass: "openNav",
    openPanelClass: "open-panel",
    mobile: "#mega-nav > .nav-menu",
    /* visible only on mobile, this is the menu bar itself, with hamburger & search buttons */
    mega: "#mega-nav",
    /* Mega Nav is the huge RawHTML content block on desktop, but becomes the menu tree on mobile */
    hasChildren: ".has-children",
    $mobile: $(), // This will hold a ref to the jQuery object, saving us a lookup.
    $mega: $(), // This will hold a ref to the jQuery object, saving us a lookup.
    $openPanelBtn: $(),
    $hasChildren: $(),
    init: function() {
        var n = NCI.Nav;
        // Since we can't guarantee that our doc is ready when this script is loaded,
        // we initialize on document.ready() in all.js

        // init our jquery object references
        n.$mobile = $(n.mobile);
        n.$mega = $(n.mega);
        n.$openPanelBtn = $("."+n.openPanelClass);
        n.$openPanelBtn.click(n.toggleMobileMenu);
        n.$hasChildren = $(n.hasChildren);

        // wire up our resize function
        $(window).on('load resize', n.resize);

        // wire up the "close button" (anything that's outside the mobile menu)
        $("#content, header, footer, .headroom-area").click(n.close);

        // wire up the scroll event for the mobile menu positioning
        $(window).scroll(function(e){
            if(NCI.Nav.isOpen()){
                NCI.Nav.$mega.offset({
                    "top": $(".fixedtotop").offset().top,
                    "left": "0px"
                });
            }
        });

        // insert the +/- buttons into the menu and wire up +/- button click events
        var toggle = NCI.Buttons.toggle;
        toggle.createFor(n.$mega.find(".has-children > div"));

        // expand all children of the current page or contains-current
        n.$mega.find(".current-page > div > "+toggle.sel+", .contains-current > div > "+toggle.sel)
            .attr("aria-expanded","true");

    },
    isOpen: function () { return $("html").hasClass(NCI.Nav.openClass); },
    open: function () {
        var n = NCI.Nav;
        if (!n.isOpen()) {
            $("html").addClass(NCI.Nav.openClass);
            NCI.Nav.$mobile.attr('aria-hidden', 'false');
            $('.fixedtotop.scroll-to-fixed-fixed').css('left', "80%");
            $("."+NCI.Nav.openClass+" "+NCI.Nav.mega).offset({
                "top": $(".fixedtotop").offset().top, 
                "left": "0px"
            });

            // Enable swiping to close
            $("#page").swipe({
                swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
                    this.close()
                }.bind(n),
                threshold: 10 // default is 75 (for 75px)
            });
        }
    },
    close: function() {
        var n = NCI.Nav;
        if (n.isOpen()) {
            $("html").removeClass(n.openClass);
            $('.fixedtotop.scroll-to-fixed-fixed').css('left', "0px");
            n.$mobile.attr('aria-hidden', 'true');

            // We do a timeout here, because we have no way of knowing when
            // the CSS animation of the menu is done. We have to remove the
            // style in case the browser is made to be dekstop width, at which
            // point the applied style would affect the mega menu display
            setTimeout(function() { 
                this.$mega.removeAttr("style"); 
            }.bind(n), 1000);

            // Disable swiping to close
            $("#page").swipe("destroy");
        }
    },
    toggleMobileMenu: function() {
        var n = NCI.Nav;
        if (n.isOpen()) { n.close(); } 
        else { n.open(); }
    },
    resize: function() {
        if (NCI.Nav.isOpen()) {
            //NCI.Nav.$mobile.css('height', $(window).height());
        }
    }
};

