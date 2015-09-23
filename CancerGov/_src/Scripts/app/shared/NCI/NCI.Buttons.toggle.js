define(function(require) {
	var $ = require('jquery');

	var toggle = {
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

			$btn.appendTo($target);
			return $target.children($btn);
		},

		clickMega: function(e) {
			var t = NCI.Buttons.toggle,
				n = NCI.Nav;
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
						.attr(aria,no).children('span').text(t._innerText[t.lang][no]).parent()
						.find(expanded)
							.attr(aria,no).children('span').text(t._innerText[t.lang][no]);
						ul.slideUp("slow", Function.prototype); // Function.prototype allows us to supply a function param without creating a new one.
					break;
				case no: // EXPANDING
					// collapse all the expanded siblings
					var siblings = li.siblings(".has-children");
					var sib_titles = siblings.children(".nav-item-title");
					var sib_btns = sib_titles.children("button[aria-expanded='true']");
					var sib_uls = siblings.children("ul");

					sib_btns.attr(aria, no).children('span').text(t._innerText[t.lang][no]);
					sib_uls.slideUp("slow");

					/* li.siblings(".has-children").children(".nav-item-title").children("button[aria-expanded='true']")
						.attr(aria, no).children('span').text(t._innerText[t.lang][no])
						.closest(".has-children").children("ul").slideToggle("slow");
					*/

					// expand current pages and contains current
					var curr_li = n.$mega.find(".contains-current, .current-page");
					var curr_nit = curr_li.children(".nav-item-title");
					var curr_btn = curr_nit.children("[" + aria + "='" + no + "']");
					curr_btn.attr(aria, yes).children('span').text(t._innerText[t.lang][yes]);
					curr_li.children("ul").slideDown("slow");

					// expand the one we clicked
					$this.attr(aria, yes).children('span').text(t._innerText[t.lang][yes]);
					// the various level <li>s themselves are hidden with CSS...
					li.find(".lvl-" + lvl + ", .level-" + lvl).show();
					ul.slideDown("slow");
					break;
			}
		},

		clickSection: function(e) {
			e.stopPropagation();
			var t = NCI.Buttons.toggle;
			var windowWidth = window.innerWidth || $(window).width();

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
	};

	return toggle;
});
