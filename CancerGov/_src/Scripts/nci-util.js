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
	},

	/*======================================================================================================
	* function doAccordion
	*
	*  will generate an accordion using jQuery UI
	*
	* returns: null
	* paramenters:
	*  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
	*  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
	*
	*====================================================================================================*/
	doAccordion: function(target, opts) {
		var defaultOptions = {
			heightStyle: "content",
			header: "h2",
			collapsible: true,
			active: false,
			/* override default functionality of accordion that only allows for a single pane to be open
			* source: http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once */
			beforeActivate: function (event, ui) {
				var icons = $(this).accordion('option', 'icons');
				// The accordion believes a panel is being opened
				var currHeader;
				if (ui.newHeader[0]) {
					currHeader = ui.newHeader;
					// The accordion believes a panel is being closed
				} else {
					currHeader = ui.oldHeader;
				}
				var currContent = currHeader.next('.ui-accordion-content');
				// Since we've changed the default behavior, this detects the actual status
				var isPanelSelected = currHeader.attr('aria-selected') == 'true';

				// Toggle the panel's header
				currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', (!isPanelSelected).toString()).attr('aria-expanded', (!isPanelSelected).toString());

				// Toggle the panel's icon if the active and inactive icons are different
				if(icons.header !== icons.activeHeader) {
					currHeader.children('.ui-icon').toggleClass(icons.header, isPanelSelected).toggleClass(icons.activeHeader, !isPanelSelected);
				}

				// Toggle the panel's content
				currContent.toggleClass('accordion-content-active', !isPanelSelected);
				if (isPanelSelected) {
					currContent.slideUp();
				} else {
					currContent.slideDown();
				}

				return false; // Cancels the default action
			},
			icons: {
				"header": "toggle",
				"activeHeader": "toggle"
			}
		};
		var options = $.extend({}, defaultOptions, opts || {});

		var $target = $(target);
		if($target.length > 0) {
			$(target).accordion(options);
		}
	},

	/*======================================================================================================
	* function undoAccordion
	*
	*  will destroy an accordion using jQuery UI
	*
	* returns: null
	* paramenters:
	*  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
	*  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
	*
	*====================================================================================================*/
	undoAccordion: function(target) {
		var $target = $(target);
		if($target.length > 0) {
			/* destroy the accordion if it's already been initialized */
			$(target).each(function() {
				if (typeof $(this).data("ui-accordion") != "undefined") {
					$(this).accordion("destroy");
				}
			});
		}
	},

	/*======================================================================================================
	* function doAutocomplete
	*
	*  will generate an autocomplete box for an <input type="text"> element, using jQuery UI
	*
	* returns: null
	* paramenters:
	*  target[]            (string)(jQuery selector)    Specific(!) selector of the input to be autocompleted.
	*  url[]               (string)                     URL of the autocomplete service.
	*  queryParam["term"]  (string)                     Primary search querystring parameter.
	*  queryString{}       (object)                     Additional parts of the querystring to pass to the autocomplete service.
	*  opts{}              (object)                     Other options to pass to jQuery UI's autocomplete function.
	*
	*====================================================================================================*/
	doAutocomplete: function(target, url, queryParam, queryString, opts) {
		var $target = $(target);
		var queryParameter = queryParam || "term";
		var defaultOptions = {
			// Set AJAX service source
			source: (function() {
				var xhr;

				return function( request, response ) {
					var dataQuery = $.extend({}, queryString || {});
					dataQuery[queryParameter] = request.term;

					if ( xhr ) {
						xhr.abort();
					}
					xhr = $.ajax({
						url: url,
						data: dataQuery,
						dataType: "json",
						success: function( data ) {
							response( data );
						},
						error: function() {
							response([]);
						}
					});
				};
			})(),

			// Start autocomplete only after three characters are typed
			minLength: 3,

			focus: function(event, ui) {
				event.preventDefault();
				event.stopPropagation();
				$target.val(ui.item.item);
			},
			select: function(event, ui) {
				event.preventDefault();
				event.stopPropagation();
				$target.val(ui.item.item);
			}
		};

		var options = $.extend({}, defaultOptions, opts || {});

		$target.autocomplete(options)
			.data("ui-autocomplete")._renderItem = function(ul, item) {
				//Escape bad characters
				var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, "\$&");
				var regexBold = new RegExp();

				if (IsContains()) {
					// highlight autocomplete item if it appears anywhere
					regexBold = new RegExp("(" + lterm + "|\s+" + lterm + "i)", "i");
				} else {
					// highlight autocomplete item if it appears at the beginning
					regexBold = new RegExp("(^" + lterm + "|\\s+" + lterm + ")");
				}
				var word = item.item.replace(regexBold, "<strong>$&</strong>");

				return $("<li></li>")
					.data("ui-autocomplete-item", item)
					.append(word)
					.appendTo(ul);
			};
	}
};
