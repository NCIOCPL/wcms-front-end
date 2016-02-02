define(function(require) {
	var $ = require('jquery');
	require('jquery/touchswipe');


	var Nav = {
		movingClass: "nav-moving",
		movingTimeout: setTimeout(function() {}),
		openClass: "nav-open",
		openPanelClass: "open-panel",
		mobile: "#mega-nav > .nav-menu",
		/* visible only on mobile, this is the menu bar itself, with hamburger & search buttons */
		mega: "#mega-nav",
		/* Mega Nav is the huge RawHTML content block on desktop, but becomes the menu tree on mobile */
		hasChildren: ".has-children",
		$mobile: $(), // This will hold a ref to the jQuery object, saving us a lookup.
		$mega: $(), // This will hold a ref to the jQuery object, saving us a lookup.
		$openPanelBtn: $(),
		$hasChildren: $(),

		init: function() {
			var n = NCI.Nav;
			// Since we can't guarantee that our doc is ready when this script is loaded,
			// we initialize on document.ready() in all.js

			// init our jquery object references
			n.$mobile = $(n.mobile);
			n.$mega = $(n.mega);
			n.$openPanelBtn = $("." + n.openPanelClass);
			n.$openPanelBtn.click(n.toggleMobileMenu);
			n.$hasChildren = $(n.hasChildren);

			// wire up our resize function
			$(window).on('load resize', n.resize);

			// wire up the "close button" (anything that's outside the mobile menu)
			$("#content, header, footer, .headroom-area").click(n.close);

			// wire up the scroll event for the mobile menu positioning
			$(window).scroll(function(e) {
				if (NCI.Nav.isOpen()) {
					NCI.Nav.$mega.offset({
						"top": $(".fixedtotop").offset().top,
						"left": "0px"
					});
				}
			});

			// insert the +/- buttons into the menu and wire up +/- button click events
			var toggle = NCI.Buttons.toggle;
			toggle.createFor(n.$mega.find(".has-children > div")).on('click', toggle.clickMega);

			// expand all children of the current page or contains-current
			n.$mega.find(".current-page > div > " + toggle.sel + ", .contains-current > div > " + toggle.sel)
				.attr("aria-expanded", "true").children('span').text(toggle._innerText[toggle.lang]['true']);

			n.Section.init();

			var borderedItems = n.$mega.find("[class*=border-container]");
			if(borderedItems.length > 0){
				borderedItems.each(function(i){
					var heights = [],
						$el = $(this),
						siblings = $el.siblings()
					;
					siblings.each(function(j){
						heights.push($(this).outerHeight(true));
					});
					heights.push($el.outerHeight(true));
					$el.height(Math.max.apply(null,heights));
				});
			}
		},
		isOpen: function() {
			return $('html').hasClass(NCI.Nav.openClass);
		},
		open: function() {
			var n = NCI.Nav;
			if (!n.isOpen()) {
				clearTimeout(n.movingTimeout);
				n.$mobile.attr('aria-hidden', 'false');
				$('html').addClass(n.movingClass).addClass(n.openClass);

				n.$mobile.find(':tabbable:first').focus(); // focus the first focusable item in the menu
				n.$mega.offset({
					"top": $(".fixedtotop").offset().top,
					"left": "0px"
				});
				$('.fixedtotop.scroll-to-fixed-fixed').css('left', "80%");
				n.movingTimeout = setTimeout(function() {
					$('html').removeClass(n.movingClass);
				}, 500);

				// Enable swiping to close
				$("#page").swipe({
					swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
						this.close();
					}.bind(n),
					threshold: 10 // default is 75 (for 75px)
				});

				// set tabindex=-1 to items that should be removed from the tab order
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.data('NCI-search-originaltabindex', $el.attr('tabindex') || null);
					$el.prop('tabindex', -1);
				});

				// Enable tabbing out to close
				n.$mega.on('keydown.NCI.Nav', function(event) {
					n.keyDownHandler(event);
				});
			}
		},
		close: function() {
			var n = NCI.Nav;
			if (n.isOpen()) {
				clearTimeout(n.movingTimeout);
				// Disable focusing out to close, before changing the focus
				n.$mega.off('keydown.NCI.Nav');

				n.$mobile.attr('aria-hidden', 'true');
				$('html').addClass(n.movingClass).removeClass(n.openClass);

				// set tabindex back to what it was before opening
				$('.mobile-menu-bar').children().not(n.$openPanelBtn).each(function(i, el) {
					var $el = $(el);
					$el.attr('tabindex', $el.data('NCI-search-originaltabindex'));
				});

				// focus the menu button
				n.$openPanelBtn.focus();
				$('.fixedtotop.scroll-to-fixed-fixed').css('left', "0px");

				// We do a timeout here, because we have no way of knowing when
				// the CSS animation of the menu is done. We have to remove the
				// style in case the browser is made to be dekstop width, at which
				// point the applied style would affect the mega menu display
				n.movingTimeout = setTimeout(function() {
					$('html').removeClass(n.movingClass);
					n.$mega.removeAttr("style");
				}, 500);

				// Disable swiping to close
				$("#page").swipe("destroy");
			}
		},
		keyDownHandler: function(event) {
			var n = NCI.Nav;

			if(event.keyCode === $.ui.keyCode.ESCAPE || (event.keyCode === $.ui.keyCode.TAB && ( // if the user pressed the ESC or TAB key
				(n.$mega.find(':tabbable:first').is(event.target) && event.shiftKey) || // if the user pressed SHIFT-TAB on the first tabbable item
				(n.$mega.find(':tabbable:last').is(event.target) && !event.shiftKey) // if the user press TAB on the last tabbable item
			))) {
				//if(window.scrollX > 0) { window.scrollTo(0, window.scrollY); }
				n.close();

				setTimeout(function() {
					// focus the menu button
					n.$openPanelBtn.focus();
				}, 0);
			}
		},
		toggleMobileMenu: function() {
			var n = NCI.Nav;
			if (n.isOpen()) {
				n.close();
			} else {
				n.open();
			}
		},
		resize: function() {
			if (NCI.Nav.isOpen()) {
				//NCI.Nav.$mobile.css('height', $(window).height());
			}
		},

		Section: require('Common/Enhancements/NCI.Nav.Section')
	};

	return Nav;
});
