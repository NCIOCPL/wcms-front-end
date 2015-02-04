jQuery(document).ready(function(jQuery) {
    /*** BEGIN scrollToFixed init ***/
    (function($) {
        $('.fixedtotop').scrollToFixed();
    })(jQuery);
    /*** END scrollToFixed init ***/

    /*** BEGIN Mega Menu init
     *** (initialize a selector as an accessibleMegaMenu)
     ***/
    (function($) {
        $("#mega-nav").accessibleMegaMenu({
            /* prefix for generated unique id attributes, which are
             * required to indicate aria-owns, aria-controls and aria-labelledby
             */
            uuidPrefix: "accessible-megamenu",

            /* css class used to define the megamenu styling */
            menuClass: "nav-menu",

            /* css class for a top-level navigation item in the megamenu */
            topNavItemClass: "nav-item",

            /* css class for a megamenu panel */
            panelClass: "sub-nav-mega",

            /* css class for a group of items within a megamenu panel */
            panelGroupClass: "sub-nav-group",

            /* css class for the hover state */
            hoverClass: "hover",

            /* css class for the focus state */
            focusClass: "focus",

            /* css class for the open state */
            openClass: "open"
        });

        // Determine the height of the viewport on page load and whenever the viewport changes sizes.
        // If the viewport is under a certain height, add a class to the mega menu (to limit its height).
        var viewportHeight = function() {
            // Get the height of the viewport
            var height = $(window).height();

            // add class to mega menu if less than specified height.
            if (height < 800) {
                $('.sub-nav-mega').addClass("mega-menu-scroll");
            }
            // otherwise remove the class
            else {
                $('.sub-nav-mega').removeClass("mega-menu-scroll");
            }
        }
        // page load
        $(document).ready(viewportHeight);
        // viewport size changes
        $(window).resize(viewportHeight);
    })(jQuery);
    /*** END Mega Menu init ***/

    /*** BEGIN dictionary toggle ***/
    (function($) {
        var dictionaryToggle = function() {
            $("#utility-dropdown").slideToggle(0, function () {
                $("#utility-dictionary").toggleClass('active');
            });
        }
    })(jQuery);
    /*** END dictionary togle ***/

    /*** BEGIN back-to-top ***/
    (function($) {
        // set the pixel value (from the top of the page) of where the arrow should begin to appear
        var offset = 600;
        // set the duration of the fade in effect of the back to top arrow and text
        var duration = 500;
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }
        });

        $('.back-to-top').click(function (e) {
            e.preventDefault();
            // freeze Headroom
            $('.headroom-area').addClass('frozen');
            // animate to top
            $('html, body').animate({
                scrollTop: 0
            }, 400, function () {
                // animation complete; unfreeze Headroom
                $('.headroom-area').removeClass('frozen');
            });
        });
    })(jQuery);
    /*** END back-to-top ***/

    /*** BEGIN mobile nav ("off-canvas flyout functionality") ***/
    (function($) {
        // set the height of the mobile nav to the window height
        $(window).on('load resize', function() {
            $('#mobile-nav').css('height', $(window).height());
        });

        function openNav() {
            $("html").addClass("openNav");
            $("#mobile-nav").attr('aria-hidden', 'false');
            $('.fixedtotop.scroll-to-fixed-fixed').css('left', "80%");

            // Enable swiping to close
            $("#page").swipe({
                swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
                    closeNav();
                },
                threshold: 10 // default is 75 (for 75px)
            });
        }

        function closeNav() {
            $("html").removeClass("openNav");
            $("#mobile-nav").attr('aria-hidden', 'true');
            $('.fixedtotop.scroll-to-fixed-fixed').css('left', "0px");

            // Disable swiping to close
            $("#page").swipe("destroy");
        }

        $(".open-panel").click(function () {
            if ($('html').hasClass('openNav')) {
                // if the mobile menu is open, we want to close it
                closeNav();
            } else {
                // if the mobile menu is closed, we want to open it
                openNav();
            }
        });

        $("#content, header, footer, .headroom-area").click(function (e) {
            if ($('html').hasClass('openNav')) {
                // if the mobile menu is open, we want to close it
                closeNav();
            }
        });
    })(jQuery);
    /*** END mobile nav ***/

    /*** BEGIN Headroom initializer
     * (use this if we do the scroll off/on for the blue bar)
     ***/
    (function($) {
        $('.headroom-area').headroom({
            tolerance: 0,
            offset: 205,
            classes: {
                initial: "slide",
                pinned: "slide--reset",
                unpinned: "slide--up"
            }
        });
    })(jQuery);
    /*** END Headroom initializer ***/

    /*** BEGIN Page Options
     * This functions the font resizer.
     ***/
    (function($) {
        /* font resizer */
       
	   var originalFontSize = $("body").css('font-size');//find the body's original size
        
		$(".po-font-resize").click(function(){ //click font resizer button
            var currentFontSizeM = $(".resize-content").css('font-size');  //returns 16px, 19px, 23px, 28px, 34px
			var currentFontSizeNumM = parseFloat(currentFontSizeM, 10); //returns 16, 19, 23, 28, 34
			if (currentFontSizeNumM < 30 ) {
                var newFontSizeM = currentFontSizeNumM*1.2;
                $(".resize-content").css('font-size', newFontSizeM);
            } else {
                $(".resize-content").css('font-size', originalFontSize);
            }
            equalHeights();
            return false;
        });
    })(jQuery);
    /*** END Page Options **/

    /*** BEGIN table toggling
     * This allows for toggling between tables.
     * An example can be seen on grants-research-funding.shtml,
     * as of the first commit with this code.
     ***/
    (function($) {
        // for each toggleable section...
        $('[data-toggletables-section]').each(function () {
            // dynamically apply the tablenumber data attribute, hide the caption if needed, and hide the other tables
            $(this).children('table').each(function (i) {
                // hide the captions if needed (specified by 'data-hidden-on-js' on the <caption> element)
                $(this).children('caption[data-hidden-on-js]').addClass('hidden');
                // apply the data-table-filternum attribute to ALL tables
                $(this).attr('data-toggletables-tablenumber', i);
                if (i === 0) {
                    // show the tables that are first (default is already shown, but this makes it explicit)
                    $(this).addClass('show');
                } else {
                    // hide the tables that aren't first
                    $(this).addClass('hide');
                }
            });

            // make the first filter link active
            $(this).find('dl > dd').first().addClass('active');

            // bind the filter links
            $(this).find('dl > dd').on('click', function () {
                // get jQuery object of this term
                var $this = $(this);
                // get the index of this term (0-base!)
                var index = $this.index() - 1;

                // get the parent (list of filters), to activate later
                var $filterList = $this.parent('dl');
                // get the table that's been selected, to show later
                var $selectedTable = $this.closest('[data-toggletables-section]').children('[data-toggletables-tablenumber=' + index + ']');

                // show the selected table
                $selectedTable.removeClass('hide').addClass('show');
                // hide the other tables
                $selectedTable.siblings('table').removeClass('show').addClass('hide');

                // remove the active class from the other filter terms
                $this.siblings('dd').removeClass('active');
                // add the active class to the selected filter term
                $this.addClass('active');
            });
        });
    })(jQuery);
    /*** END table toggling ***/

    /*** BEGIN video embedding
     * This enables the embedding of YouTube videos and playlists as iframes.
     ***/
    (function($) {
        $('.flex-video').each(function() {
            var $this = $(this);
            var lang = $('html').attr('lang') || 'en';

            var videoSrc = '//www.youtube-nocookie.com/embed/',
                videoLinkSrc = 'https://www.youtube.com/',
                videoId = '',
                videoTitle = '',
                videoOptions = '?rel=0',
                videoType = '';

            if($this.hasClass('playlist')) {
                videoType = 'playlist';
                videoTitle = $this.attr('data-playlist-title');
                videoId = 'videoseries';
                videoOptions = videoOptions +
                    '&list=' + $this.attr('data-playlist-id');
                videoLinkSrc = videoLinkSrc + 'playlist?list=' + videoId;
            } else {
                videoType = 'video';
                videoTitle = $this.attr('data-video-title');
                videoId = $this.attr('data-video-id');
                videoOptions = videoOptions +
                    '';
                videoLinkSrc = videoLinkSrc + 'watch?v=' + videoId;
            }
            videoSrc = videoSrc + videoId + videoOptions;
            var videoText = {
                video: {
                    en: 'Youtube embedded video: ' + videoLinkSrc,
                    es: 'Video insertado desde YouTube: ' + videoLinkSrc
                },
                playlist: {
                    en: 'Youtube embedded video playlist: ' + videoLinkSrc,
                    es: 'Lista de reproducci&oacute;n insertada desde YouTube: ' + videoLinkSrc
                }
            };
            $this.append(
                $(document.createElement('iframe'))
                    .attr('width', '560')
                    .attr('height', '315')
                    .attr('src', videoSrc)
                    .attr('frameborder', '0')
                    .attr('allowFullScreen', '')
                    .attr('title', videoTitle)
                    .attr('alt', videoTitle)
                    .text(videoText[videoType][lang])
            );
        });
    })(jQuery);
    /*** END video embedding ***/
});
