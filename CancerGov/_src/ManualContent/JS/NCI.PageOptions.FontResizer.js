NCI.PageOptions.FontResizer = {
    selector: ".po-font-resize a",
    $content: $(),
    originalSize: 0,
    currentSize: 0,
    multiplier: 1.2,
    init: function() {
        this.originalSize = parseFloat($("body").css("font-size"), 10);
        $(this.selector).click(this.click);
        this.$content = $(".resize-content");
    },
    click: function(e) {
        var self = NCI.PageOptions.FontResizer; // this is the target in click events.
        e.preventDefault(); // no event bubbling.
        self.setCurrentFontSize();
        var newSize = self.currentSize * self.multiplier;
        newSize = newSize > 30 ? self.originalSize : newSize;
        $content.css("font-size", newSize + "px");
        if (typeof equalHeights === typeof Function.prototype) {
            equalHeights();
        }
        return false; //technically unnecessary to return false.
    },
    setCurrentFontSize: function() {
        $content = $(".resize-content");
        this.currentSize = parseFloat($content.css("font-size"), 10);
    }
};

