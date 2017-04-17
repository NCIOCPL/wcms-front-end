define(function(require) {
    var $ = require('jquery');
    var config = require('Modules/NCI.config');

    var defaultOptions = {
        html: '<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>',
        sel: ".toggle"
    };

    var lang = $('html').attr('lang') || 'en'; // set the language

    function createFor($target) {


        var $btn = $('<button class="toggle" aria-expanded="false" type="button"><span class="hidden">'+ config.lang[lang].false +'</span></button>');
        $btn.appendTo($target);

        // return the new button item, making it chainable for attaching events
        return $target.children($btn);
    }

    function clickMega(e) {

        var $this = $(this),
            li = $this.closest(".has-children"), // parent LI of the clicked button
            ul = li.children("ul"), // UL menu item we are hiding / showing
            lvl = 0;

        if (li.hasClass("lvl-1") || li.hasClass("level-1")) {
            lvl = 2;
        }
        if (li.hasClass("lvl-2") || li.hasClass("level-2")) {
            lvl = 3;
        }


        if ($this.attr('aria-expanded') == 'true') { // CLOSING
            $this
                .attr('aria-expanded', 'false').children('span').text(config.lang.Expand[lang])
                .parent().find('[aria-expanded=true]')
                .attr('aria-expanded', 'false').children('span').text(config.lang.Expand[lang]);
            ul.slideUp("slow");
        } else { // EXPANDING
            // collapse all the expanded siblings
            var siblings = li.siblings(".has-children");
            var sib_btns = siblings.children(".nav-item-title button[aria-expanded='true']");
            var sib_uls = siblings.children("ul");

            sib_btns.attr('aria-expanded', 'false').children('span').text(config.lang.Expand[lang]);
            sib_uls.slideUp("slow");

            // expand the one we clicked
            $this.attr('aria-expanded', 'true').children('span').text(config.lang.Collapse[lang]);
            // the various level <li>s themselves are hidden with CSS...
            li.find(".lvl-" + lvl + ", .level-" + lvl).show();
            ul.slideDown("slow");
        }
    }

    function clickSection(e) {
        var windowWidth = window.innerWidth || $(window).width();

        var $this = $(this),
            li = $this.closest(".has-children"), // parent LI of the clicked button
            ul = li.children("ul"), // UL menu item we are hiding / showing
            lvl = 0;

        if (li.hasClass("lvl-1") || li.hasClass("level-1")) { lvl = 2; }
        if (li.hasClass("lvl-2") || li.hasClass("level-2")) { lvl = 3; }

        switch($this.attr(aria)) {
            case yes: // CLOSING
                $this
                    .attr(aria,no).children('span').text(t._innerText[t.lang][no]).parent()
                    .find(expanded)
                    .attr(aria,no).children('span').text(t._innerText[t.lang][no]);
                ul.slideUp('slow', Function.prototype); // Function.prototype allows us to supply a function param without creating a new one.
                break;
            case no: // EXPANDING
                // collapse all the expanded siblings
                var siblings = li.siblings(".has-children");
                var sib_titles = siblings.children("div");
                var sib_btns = sib_titles.children("button[aria-expanded='true']");
                var sib_uls = siblings.children("ul");

                // close any open siblings and their children
                sib_btns.attr(aria, no).children('span').text(t._innerText[t.lang][no]);
                if(windowWidth <= 1024) {
                    sib_uls.slideUp('slow', Function.prototype);
                } else {
                    sib_uls.not('.section-nav .contains-current > ul').slideUp('slow', Function.prototype);
                    sib_uls.filter('.section-nav .contains-current > ul').css('display', 'none');
                }

                // expand the one we clicked
                $this.attr(aria, yes).children('span').text(t._innerText[t.lang][yes]);
                ul.slideDown('slow', Function.prototype);
                break;
        }
    }

    return toggle;
});