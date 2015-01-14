NCI = {
	/*======================================================================================================
	 * function linkToEmpty
	 *
	 *  will display an alert if a user clicks on a page that hasn't been created,
	 *  and focus the user onto the search box
	 *
	 * trigger: onclick events (hardcoded in the mega menu)
	 * returns: null
	 * paramenters:
	 *  event[]    (event)    The click event triggering this script
	 *
	 * TODO: remove this script after the usability prototype (it probably won't be useful in Devon Rex)
	 *====================================================================================================*/
	linkToEmpty: function(event) {
		event.preventDefault();
		event.stopPropagation();

		var lang = document.documentElement.lang;
		var alertText = {
			'en': "The page you have requested does not yet exist on the prototype.",
			'es': "La página que ha solicitado no existe todavía en el prototipo. (to be translated)"
		};
		alert(alertText[lang] || alertText['en']);
		document.getElementById('swKeyword').focus();
	},

	/*======================================================================================================
	 * function scrollTo
	 *
	 *  will scroll to an anchor almost anyhwere on the page WITHOUT causing the navbar to lay over the anchor
	 *
	 * returns: null
	 * parameters:
	 *  anchor[]    (string)(jQuery selector)    Selector of the anchor to be scrolled to.
	 *
	 * TODO: move JS from inside "js/pdq-linking.js" to here
	 * TODO: make this script freeze Headroom?
	 * TODO: make this script work for mobile accordions
	 * TODO: make this script work for PDQ deeplinks
	 *====================================================================================================*/
	scrollTo: function(anchor) {
		if(anchor.indexOf("#") < 0) {
			anchor = "#" + anchor;
		}
		// get the anchor's jQuery element
		var $anchor = $(anchor);
		// get the sticky nav jQuery element
		var $header = $('.fixedtotop');
		// get the sticky nav's height
		var headerHeight = $header.outerHeight();

		window.scrollTo(0, $anchor.offset().top - headerHeight);
	},

	/*======================================================================================================
	 * function buildTOC
	 *
	 *  will build the TOC for nearly any page. Just feed it the proper elements and it will build links to IDs and grab their contents.
	 *
	 * returns: null
	 * parameters:
	 *  toc_selector[".on-this-page"]     (string)(jQuery selector)    Selector of the div or aside to hold the Table of Contents.
	 *                                                                 This will also probably be linked to the styling. Should contain a <ul>.
	 *  content_selector["#accordion"]    (string)(jQuery selector)    Selector of content sections Container.
	 *  section_selector["section"]       (string)(jQuery selector)    Selector of the section elements, relative to content_selector.
	 *  title_selector["h2"]              (string)(jQuery selector)    Selector of the title of each section, relative to section.
	 *  list_type["ul"]                   (string)(jQuery selector)    Selector that identifies the list, relative to the toc_selector.
	 *
	 * Tips: It may be possible to overload the selectors with any valid jQuery selector.
	 *====================================================================================================*/
	buildTOC: function (toc_selector, content_selector, section_selector, title_selector, list_type) {
		var toc = (toc_selector || ".on-this-page"),
			content = (content_selector || "#accordion"),
			section = (section_selector || "section"),
			h_tag = (title_selector || "h2"),
			lt = (list_type || "ul"),
			sections = $(content + " " + section),
			$toc_ul = $(toc + " ul").empty(); // simultaneously clear the TOC

		for (i = 0; i < sections.length; i++) { // iterate through the section tags
			var s = sections[i]; // shorthand for the current section element
			var $s = $(s); // jQuery object shorthand
			if (s.id) { // Make sure we have an ID...
				var s_name = $s.children("h2").html(); // we don't need this unless we're making an <LI>
				$toc_ul.append("<li><a href='#" + s.id + "'>" + s_name + "</a></li>");
			}
		}
	}
};
