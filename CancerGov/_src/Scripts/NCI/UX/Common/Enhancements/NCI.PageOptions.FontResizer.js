define(function(require) {
    var initialized = false,
        $ = require('jquery');

    var FontResizer = {
        selector: ".po-font-resize a",
        $content: $(),
        originalSize: 0,
        currentSize: 0,
        multiplier: 1.2,
        init: function() {
            this.originalSize = parseFloat($("body").css("font-size"), 10);
            this.$content = $(".resize-content");
            $(this.selector).click(this.click);
            initialized = true;
        },
        click: function(e) {
            e.preventDefault(); // no event bubbling.
            var self = FontResizer; // this is the target in click events.
            self.currentSize = parseFloat(self.$content.css("font-size"), 10);
            var newSize = self.currentSize * self.multiplier;
            newSize = newSize > 30 ? self.originalSize : newSize;
            self.$content.css("font-size", newSize + "px");
            //TODO: trigger a font-resize event for subscribers such as equalHeights
            // if (typeof equalHeights === typeof Function.prototype) {
            //     equalHeights();
            // }
        }
    };

    /* Exposes functions from this module which are available from the outside. */
    return {
        init: function() {
            if (!initialized) {
                _initialize();
            }
        }
    };
});