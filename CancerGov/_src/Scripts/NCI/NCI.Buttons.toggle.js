NCI.Buttons.toggle = {

html: '<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>',
sel: ".toggle",
lang: $('html').attr('lang') || 'en', // set the language
_innerText: {
    en: {'true': 'Collapse', 'false': 'Expand'},
    es: {'true': 'Reducir', 'false': 'Ampliar'}
},

createFor: function($target) {
    var t = NCI.Buttons.toggle;

    // create the button itself using jQuery
    var $btn = $('<button>').addClass('toggle')
        .attr({
            'aria-expanded': 'false',
            'type': 'button'
        }).append(
            $('<span>').addClass('hidden')
                .text(t._innerText[t.lang]['false'])
        );
    // bind the click event handler
    $btn.on('click', t.click);

    $btn.appendTo($target);
},

click: function(e) {
    var t = NCI.Buttons.toggle;
    e.stopPropagation();

    var yes = 'true', // init true / false values
        no = 'false',
        sel = t.sel,
        aria = "aria-expanded", // the aria term we're after
        expanded = "["+aria+"='"+yes+"']", // selector for expanded items
        collapsed = "["+aria+"='"+no+"']", // selector for collapsed items
        $this = $(this),
        li = $this.closest(".has-children"), // parent LI of the clicked button
        ul = li.children("ul"), // UL menu item we are hiding / showing
        lvl = 0;

    if (li.hasClass("lvl-1") || li.hasClass("level-1")) { lvl = 2; }
    if (li.hasClass("lvl-2") || li.hasClass("level-2")) { lvl = 3; }

    switch($this.attr(aria)) {
        case yes: // CLOSING
            $this
                .attr(aria,no).children('span').text(t._innerText[t.lang][yes]).parent()
                .find(expanded)
                    .attr(aria,no).children('span').text(t._innerText[t.lang][yes]);
            break;
        case no: // EXPANDING
            // collapse all the expanded siblings
            li.siblings(".has-children").children(".nav-item-title").children("button[aria-expanded='true']")
                .attr(aria, no).children('span').text(t._innerText[t.lang][no])
                .parents(".has-children").children("ul").slideToggle("slow");
            // expand the one we clicked
            $this.attr(aria, yes).children('span').text(t._innerText[t.lang][yes]);
            // the various level <li>s themselves are hidden with CSS... 
            li.find(".lvl-"+lvl+", .level-"+lvl).show();
            // expand current pages and contains current
            $(".contains-current .nav-item-title [" + aria + "='" + no + "'], .current-page .nav-item-title [" + aria + "='" + no + "']")
                .attr(aria, yes).children('span').text(t._innerText[t.lang][yes])
            .closest("has-children").children("ul").slideToggle("slow", Function.prototype);
            break;
    }

    ul.slideToggle("slow", Function.prototype); // Function.prototype allows us to supply a function param without creating a new one.
}
};
