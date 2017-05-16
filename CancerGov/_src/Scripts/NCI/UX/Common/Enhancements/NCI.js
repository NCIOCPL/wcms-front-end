define(function (require) {
	var NCI = {

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

		Breakpoints: require('Modules/NCI.config'),

		Buttons: require('Common/Enhancements/NCI.Buttons'),

		Nav: require('Common/Enhancements/NCI.Nav'),

		PageOptions: require('Common/Enhancements/NCI.PageOptions'),

		Search: require('Common/Enhancements/NCI.Search'),

		dictionary: require('Data/DictionaryService'),

		page: require('Common/Enhancements/NCI.page'),

		// doAutocomplete is used in backend JavaScript placed on the dictionary terms page "/publications/dictionaries/cancer-terms"
		doAutocomplete: require('Modules/autocomplete/autocomplete').doAutocomplete,

		window: {}
	};

	window.NCI = NCI;

	return NCI;
});
