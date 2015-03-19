NCI.Buttons.toggle = {

html: '<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>',
sel: ".toggle",

click: function(e) {
    e.stopPropagation();

    var yes = 'true', // init true / false values
        no = 'false',
        aria = "aria-expanded", // the aria term we're after
        expanded = "["+aria+"='"+yes+"']", // selector for expanded items
        $this = $(this),
        li = $this.closest(".has-children"), // parent LI of the clicked button
        ul = li.children("ul"), // UL menu item we are hiding / showing
        lvl = 0;

    if (li.hasClass("lvl-1") || li.hasClass("level-1")) { lvl = 2; }
    if (li.hasClass("lvl-2") || li.hasClass("level-2")) { lvl = 3; }
    
    switch($this.attr(aria)) {
        case yes: // CLOSING
            $this.attr(aria,no).find(expanded).attr(aria,no);
            break;
        case no: // EXPANDING
            $this.attr(aria,yes);
            // close all the expanded things
            $("#mega-nav "+expanded).attr(aria, no)
                .parents(".contains-current, .current-page").find("["+aria+"]").attr(aria,yes);
            // the various level <li>s themselves are hidden with CSS...
            li.find(".lvl-"+lvl+", .level-"+lvl).show()
            break;
    }

    ul.slideToggle("slow", Function.prototype); // Function.prototype allows us to supply a function param without creating a new one.
};

