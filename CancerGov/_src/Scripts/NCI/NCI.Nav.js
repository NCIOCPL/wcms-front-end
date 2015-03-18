NCI.Nav = {
	openClass: "openNav",
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
		// we'll need to initialize on document.ready() in all.js

		// init our jquery object references
		n.$mobile = $(n.mobile);
		n.$mega = $(n.mega);
		n.$openPanelBtn = $("."+n.openPanelClass);
		n.$openPanelBtn.click(n.toggleMobileMenu);
		n.$hasChildren = $(n.hasChildren);

		// wire up our resize function
		$(window).on('load resize', n.resize);

		// wire up the "close button" (anything that's outside the mobile menu)
		$("#content, header, footer, .headroom-area").click(n.close);

		// wire up the scroll event for the mobile menu positioning
		$(window).scroll(function(e){
			if(NCI.Nav.isOpen()){
				NCI.Nav.$mega.offset({
					"top": $(".fixedtotop").offset().top,
					"left": "0px"
				});
			}
		});

		// insert the +/- buttons into the menu
		var btn = n.toggle.html; 
		n.$mega.find(".has-children > div")
			.append(btn)
		// wire up +/- button click events
			.find(".toggle").click(n.toggleClick);

		// expand all children of the current page or contains-current
		n.$mega.find(".current-page > div > .toggle, .contains-current > div > .toggle")
			.attr("aria-expanded","true");

	},
	isOpen: function () { return $("html").hasClass(NCI.Nav.openClass); },
	open: function () {
		var n = NCI.Nav;
		if (!n.isOpen()) {
			$("html").addClass(NCI.Nav.openClass);
			NCI.Nav.$mobile.attr('aria-hidden', 'false');
			$('.fixedtotop.scroll-to-fixed-fixed').css('left', "80%");
			$("."+NCI.Nav.openClass+" "+NCI.Nav.mega).offset({
				"top": $(".fixedtotop").offset().top, 
				"left": "0px"
			});

			// Enable swiping to close
			$("#page").swipe({
				swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
					this.close()
				}.bind(n),
				threshold: 10 // default is 75 (for 75px)
			});
		}
	},
	close: function() {
		var n = NCI.Nav;
		if (n.isOpen()) {
			$("html").removeClass(n.openClass);
			$('.fixedtotop.scroll-to-fixed-fixed').css('left', "0px");
			n.$mobile.attr('aria-hidden', 'true');

			// We do a timeout here, because we have no way of knowing when
			// the CSS animation of the menu is done. We have to remove the
			// style in case the browser is made to be dekstop width, at which
			// point the applied style would affect the mega menu display
			setTimeout(function() { 
				this.$mega.removeAttr("style"); 
			}.bind(n), 1000);

			// Disable swiping to close
			$("#page").swipe("destroy");
		}
	},
	toggleMobileMenu: function() {
		var n = NCI.Nav;
		if (n.isOpen()) { n.close(); } 
		else { n.open(); }
	},
	toggle: {
		html: '<button aria-expanded="false" class="toggle" type="button"><span class="hidden">Open child elements</span></button>',
		populate: function(el) {
		},
		click: function(e) {
		},
		expand: function(el) {
		},
		close: function(el) {
		},
	},
	toggleClick: function(e) {
		// Business Logic:
		// * there is no active state, and no highlight state anymore. Current Page is highlighted always
		// * Cannot collapse the current page.
		e.stopPropagation();
		var $this = $(this),
			yes = 'true',
			no = 'false',
			aria = "aria-expanded",
			item = ".mobile-item",
			expanded = "["+aria+"='"+yes+"']",
			closed = "["+aria+"='"+no+"']",
			li = $this.closest(".has-children"),
			isExpanded = $this.attr(aria);

		switch (isExpanded) {
			case yes: // CLOSING
				li.find(expanded).attr(aria, no); // set the button state 
				// hide the child menu-item of the parent li of the button we clicked
				li.children(".menu-item").slideToggle("slow",Function.prototype);
				break;
			case no: // EXPANDING
				// First we need to close all the expanded things
				$("#mega-nav "+expanded).attr(aria, no)
					.closest(".has-children").children(item).slideToggle("slow", Function.prototype);
				// Open the menu-item that is the child of the li that is the parent of the clicked button
				$this.attr(aria, yes); // set the button state
				li.find(".mobile-item li").show();
				
				break;
			default:
				return e;
		}
		/*
		if (aria_expanded == 'true' ) {
			closest.find("button[aria-expanded='true']").closest("li").children("ul").slideToggle("slow", function() {
				//Animation complete
			});
			closest.find(".toggle").attr('aria-expanded','false');
			// Stop processing
			return;
		}
		else if (aria_expanded == 'false' ) { // If the toggle is closed, do this
			// close any open siblings and their children...
			closest.siblings().children("div").children("button[aria-expanded='true']").closest("li").children("ul").slideToggle( "slow", function() {
				//Animation complete
			});
			// ...and add proper ARIA to indicate those siblings and children are closed
			closest.siblings().children("div").children("button").attr('aria-expanded','false');
			// slide open list of nav elements for selected button
			closest.children("ul").slideToggle( "slow", function() {
				// Animation complete.
			});
			// add ARIA to indicate this section has been opened
			t.attr('aria-expanded','true');
			return;
		}
		*/

	},
	resize: function() {
		if (NCI.Nav.isOpen()) {
			//NCI.Nav.$mobile.css('height', $(window).height());
		}
	}
};
