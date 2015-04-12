NCI.PageOptions = {
    init: function() {
        // This function runs on doc ready
        // Use this to do any setup that requires the page elements to have been loaded.
        this.FontResizer.init();
        this.Print.init();
    },
    Print: {
        init: function() {
            $(".po-print a").click(this.click);
        },
        click: function(e) {
            e.preventDefault();
            window.print();
        },
    },

};
