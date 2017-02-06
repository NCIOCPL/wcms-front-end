define(function (require) {
	var NCIAutocomplete = require('Common/Enhancements/NCI.Autocomplete');

	var NCI = {

		/*======================================================================================================
		 * function scrollTo
		 *
		 *  will scroll to an anchor almost anyhwere on the page WITHOUT causing the navbar to lay over the anchor
		 *
		 * returns: null
		 * parameters:
		 *  anchor[]    (string || DOM element)    ID selector of the anchor to be scrolled to, or the element itself
		 *
		 *====================================================================================================*/
		scrollTo: function (anchor, eventType) {
			var $ = require('jquery');

			// ensure the anchor is a string OR an element
			if (!(typeof anchor === "string" || // string
				(typeof anchor === "object" && anchor !== null && anchor.nodeType === 1 && typeof anchor.nodeName === "string") // DOM element
			)) {
				// unknown anchor
				return;
			}

			var width = window.innerWidth || $(window).width(),
				isSection = false,
				fuzz = 45;

			// we need to sanitize the string iff the anchor parameter is actually a string
			if (typeof anchor === "string") {
				// remove initial hash
				if (anchor.indexOf('#') === 0) {
					anchor = anchor.substring(1, anchor.length);
				}
				isSection = anchor.match(/^section\//i);
				anchor = '#' + anchor.replace(/^.+\//, '').replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, '\\$1');
			}

			var $anchor = $(anchor),
				$accordionPanel = (isSection) ? $anchor.children('.ui-accordion-content') : $anchor.closest('.ui-accordion-content'),
				$accordion = $accordionPanel.closest('.ui-accordion'),
				accordionIndex = ($accordion.length > 0) ? $accordion.data('ui-accordion').headers.index($accordionPanel.prev('.ui-accordion-header')) : undefined;

			function doTheScroll() {
				var headerHeight = $('.fixedtotop').outerHeight(),
					scrollY = window.scrollY || window.pageYOffset,
					willFreeze = true,
					anchorTop = ($anchor.length > 0) ? $anchor.offset().top : 0,
					hasPreviousState = (eventType === "load") && ((scrollY < anchorTop - headerHeight - fuzz) || (scrollY > anchorTop + fuzz / 2)) && (scrollY !== 0)
					;

				//TODO: previous state not reliable on mobile since accordions are always collapsed on load
				// if the anchor is a PDQ section and we're >=desktop
				if (width > NCI.Breakpoints.large && isSection) {
					scrollY = 0;
					willFreeze = false;
				} else if (hasPreviousState) {
					// returning true does not prevent standard anchors from working on page load
					return;
				} else {
					scrollY = anchorTop - headerHeight;
				}

				// freeze headroom
				if (willFreeze) {
					$('.headroom-area').addClass('frozen');
				}

				// unfreeze headroom
				if (willFreeze) {
					setTimeout(function () {
						$('[tabindex="1"]').focus();
						window.scrollTo(0, scrollY);
						setTimeout(function () {
							$('.headroom-area').removeClass('frozen');

						}, 150);
					}, 150);
				}
				$accordion.off('accordionactivate.NCI.scrollTo');
			}

			if ($accordion.length > 0) {
				$accordion.on('accordionactivate.NCI.scrollTo', function (e) { doTheScroll(); });
				if (!$accordionPanel.hasClass('accordion-content-active')) {
					$accordion.accordion('option', 'active', accordionIndex);
				} else {
					doTheScroll();
				}
			} else {
				doTheScroll();
			}
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
			var $ = require('jquery');

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
		},

		/*======================================================================================================
		 * function buildOTP
		 *
		 * This function can be used to create an "On This Page" section on any content with a raw HTML or Ephox
		 * body field.
		 *
		 * Returns: the built "On This Page" block
		 * Parameters: null
		 *
		 *====================================================================================================*/
		buildOTP: function () {
			var $ = require('jquery');

			var options = {
				titleText: {
					en: "On This Page",
					es: "En Esta Página"
				},
				class: "on-this-page hide-otp-on-collapse",
				placement: {
					insert: 'prependTo',
					to: '[data-otp-selector]'
				},
				ignore: {
					heading: ['h6', '.ignore-this h2', '.callout-box h3', '.callout-box-full h3', '.callout-box-left h3', '.callout-box-right h3', '.card-thumbnail h3', '.feature-card h3'],
					node: ['aside']
				},
				maxLevel: $('[data-otp-depth]')[0] ? $('[data-otp-depth]').data('otp-depth') : 1
			},

				$nav = $('<nav>').addClass(options.class).attr('role', "navigation")
					.append($('<h6>').text(options.titleText[NCI.page.lang || 'en'])),
				articleRoot = $('article').data('nci-outline').sections[0]
				;

			$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

			$nav[options.placement.insert](options.placement.to);

			return $nav;
		},

		/*======================================================================================================
		* function doAutocomplete
		*
		*  will generate an autocomplete box for an <input type="text"> element, using jQuery UI
		* 
		*  DEPRECATED!  Please change code to use NCI.Autocomplete.doAutocomplete.
		*
		* returns: null
		* parameters:
		*  !target[]            (string)(jQuery selector)    Specific(!) selector of the input to be autocompleted.
		*  !src[]               (string || function)         URL (string) or function returning a Promise of the autocomplete service.
		*  contains[false]      (boolean)                    Boolean variable describing whether the autocomplete is for "starts with" (false) or "contains" (true).
		*  queryParam["term"]   (string)                     Primary search querystring parameter.
		*  queryString{}        (object)                     Additional parts of the querystring to pass to the autocomplete service.
		*  opts{}               (object)                     Other options to pass to jQuery UI's autocomplete function.
		*
		*====================================================================================================*/
		doAutocomplete: function (target, src, contains, queryParam, queryString, opts) {
			NCIAutocomplete.doAutocomplete(target, src, contains, queryParam, queryString, opts);
		},

		Breakpoints: require('Common/Enhancements/NCI.breakpoints'),

		Buttons: require('Common/Enhancements/NCI.Buttons'),

		Nav: require('Common/Enhancements/NCI.Nav'),

		PageOptions: require('Common/Enhancements/NCI.PageOptions'),

		Search: require('Common/Enhancements/NCI.Search'),

		dictionary: require('Data/DictionaryService'),

		page: require('Common/Enhancements/NCI.page'),

		window: {}
	};

	window.NCI = NCI;

	return NCI;
});
