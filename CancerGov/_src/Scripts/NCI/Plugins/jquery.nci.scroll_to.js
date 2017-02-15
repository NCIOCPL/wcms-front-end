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
        base.init = function () {
            // extend options
            base.options = $.extend({},$.NCI.scroll_to.defaultOptions, options);

            /* PLUGIN LOGIC GOES HERE */
            var anchor = base.options.target || base.$el.attr("href"), // scroll to target can be an option or an href attribute
                width = window.innerWidth || $(window).width(),
                isSection = false,
                fuzz = 45
            ;

            // remove initial hash
            if(anchor.indexOf('#') === 0) {
                anchor = anchor.substring(1, anchor.length);
            }
            isSection = anchor.match(/^section\//i);
            anchor = '#' + anchor.replace(/^.+\//, '').replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1');

            var $anchor = $(anchor),
                $accordionPanel = (isSection) ? $anchor.children('.ui-accordion-content') : $anchor.closest('.ui-accordion-content'),
                $accordion = $accordionPanel.closest('.ui-accordion'),
                accordionIndex = ($accordion.length > 0) ? $accordion.data('ui-accordion').headers.index($accordionPanel.prev('.ui-accordion-header')) : undefined;

            if($accordion.length > 0) {
                $accordion.on('accordionactivate.NCI.scrollTo', function(e) { doTheScroll(); });
                if(!$accordionPanel.hasClass('accordion-content-active')) {
                    $accordion.accordion('option', 'active', accordionIndex);
                } else {
                    base.doTheScroll();
                }
            } else {
                base.doTheScroll();
            }
        };

        base.doTheScroll = function() {
            var headerHeight = $('.fixedtotop').outerHeight(),
                scrollY = window.scrollY || window.pageYOffset,
                willFreeze = true,
                anchorTop = ($anchor.length > 0) ? $anchor.offset().top : 0,
                hasPreviousState = (eventType === "load") && ((scrollY < anchorTop - headerHeight - fuzz) || (scrollY > anchorTop + fuzz/2)) && (scrollY !== 0)
                ;

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
            $accordion.off('accordionactivate.NCI.scrollTo');
        };

        // Run initializer
        base.init();
    };

    // plugin defaults
    $.NCI.scroll_to.defaultOptions = {
        target: null
    };

    // Add plugin to jQuery namespace
    $.fn.NCI_scroll_to = function( options ) {
        return this.each(function () {
            (new $.NCI.scroll_to(this,options));
        });
    };
}));