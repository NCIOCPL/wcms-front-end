// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Add to NCI namespace
    if (!$.NCI) {
        $.NCI = {};
    }

    // Define new plugin constructor
    $.NCI.scroll_to = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // plugin initializer
        base.scroll = function () {
            // extend options
            base.options = $.extend({},$.NCI.scroll_to.defaultOptions, options);

            /* PLUGIN LOGIC GOES HERE */
            var anchor = base.options.anchor || base.$el.attr("href"), // scroll to target can be an option or an href attribute
                $anchor = $(anchor),
                headerHeight = $(base.options.header).outerHeight(),
                width = window.innerWidth || $(window).width(),
                isSection = anchor.match(/^#section\//i),
                scrollY = window.scrollY || window.pageYOffset,
                willFreeze = base.options.willFreeze,
                fuzz = base.options.fuzz,
                anchorTop = ($anchor.length > 0) ? $anchor.offset().top : 0,
                hasPreviousState = (base.options.event === "load") && ((scrollY < anchorTop - headerHeight - fuzz) || (scrollY > anchorTop + fuzz/2)) && (scrollY !== 0)
            ;

            // remove initial hash
            // if(anchor.indexOf('#') === 0) {
            //     anchor = anchor.substring(1, anchor.length);
            // }

            //TODO: previous state not reliable on mobile since accordions are always collapsed on load
            // if the anchor is a PDQ section and we're >=desktop
            if(width > NCI.Breakpoints.large && isSection) {
                scrollY = 0;
                willFreeze = false;
            } else if(hasPreviousState) {
                // returning true does not prevent standard anchors from working on page load
                return;
            } else {
                scrollY = anchorTop - headerHeight;
            }

            // freeze headroom
            if(willFreeze) {
                $('.headroom-area').addClass('frozen');
            }

            // unfreeze headroom
            if(willFreeze) {
                setTimeout(function() {
                    $('[tabindex="1"]').focus();
                    window.scrollTo(0, scrollY);
                    setTimeout(function() {
                        $('.headroom-area').removeClass('frozen');

                    }, 150);
                }, 150);
            }
        };

        // Trigger the scroll
        base.scroll();
    };

    // plugin defaults
    $.NCI.scroll_to.defaultOptions = {
        anchor: null,
        event: 'click',
        header: '.fixedtotop',
        willFreeze: true,
        fuzz: 45
    };

    // Add plugin to jQuery namespace
    $.fn.NCI_scroll_to = function( options ) {
        return this.each(function () {
            (new $.NCI.scroll_to(this,options));
        });
    };
}));