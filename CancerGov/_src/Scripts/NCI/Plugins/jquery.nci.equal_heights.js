

// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

// BEGIN Module Wrapper
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery','jquery/throttledebounce'], factory);
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
            factory(jQuery,require('jquery/throttledebounce'));

            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery,jQuery.throttle);
    }
}(function ($) {
    //require('jquery/throttledebounce');

    // BEGIN plugin script

    // Add to NCI namespace
    if (!$.NCI) {
        $.NCI = {};
    }

    // Define new plugin constructor
    $.NCI.equal_heights = function ( el, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // plugin initializer
        base.init = function () {

            // extend options
            base.options = $.extend({},$.NCI.equal_heights.defaultOptions, options);

            // get the '.equalheight' items to equalize them
            var items = base.$el.find('.equalheight');
            if(items.length === 0) return;

            // get the top-offset of the first item, to check for stacking
            var firstTopOffset = items.first().offset().top,
                isStacked = false;

            items.height('inherit');

            /* iterate through the items to:
             * 1) check if they're stacked, and
             * 2) get the heights of the elements
             */

            // get all element heights
            var heights = items.map(function() {
                var el = $(this);
                if (el.offset().top !== firstTopOffset) {
                    isStacked = true;
                    return;
                }
                return el.height();
            });

            // if they are stacked, we don't need to worry about making them the same height
            if (isStacked) return;

            // get the maximum height (from the previously-calculated heights)
            var maxHeight = Math.max.apply(null, heights);

            // call that function for every 'item' in the 'items' array
            base.setHeight(items, maxHeight, 40);


            // one time event binding
            if(!base.$el.data( "NCI.equal_heights")){
                $(window).on('load resize', $.throttle(300,function(){
                    base.init();
                }));

                // Add a reverse reference to the DOM object
                base.$el.data( "NCI.equal_heights" , base );
            }
        };

        // private method
        base.setHeight = function(item, height, maxWidth){
            // get the width of the whole row
            var rowWidth = base.$el.width();
            if((rowWidth - item.width()) > maxWidth) {
                item.height(height);
            }
        };

        // Run initializer
        base.init();
    };

    // plugin defaults
    $.NCI.equal_heights.defaultOptions = {

    };

    // Add plugin to jQuery namespace
    $.fn.NCI_equal_heights = function( options ) {
        return this.each(function () {
            (new $.NCI.equal_heights(this,options));
        });
    };


}));