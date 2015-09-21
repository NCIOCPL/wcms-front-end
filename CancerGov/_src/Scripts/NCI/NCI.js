var NCI = NCI || { // << this format enforces a Singleton pattern
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
	 *  anchor[]    (string || DOM element)    ID selector of the anchor to be scrolled to, or the element itself
	 *
	 *====================================================================================================*/
	scrollTo: function(anchor, eventType) {
		// ensure the anchor is a string OR an element
		if(!(typeof anchor === "string" || // string
			(typeof anchor === "object" && anchor !== null && anchor.nodeType === 1 && typeof anchor.nodeName === "string") // DOM element
		)) {
			// unknown anchor
			return;
		}

		var width = window.innerWidth || $(window).width(),
			isSection = false,
			fuzz = 50;

		// we need to sanitize the string iff the anchor parameter is actually a string
		if(typeof anchor === "string") {
			// remove initial hash
			if(anchor.indexOf('#') === 0) {
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
				scrollY = window.scrollY,
				willFreeze = true,
				anchorTop = ($anchor.length > 0) ? $anchor.offset().top : 0,
				hasPreviousState = (eventType === "load") && ((scrollY < anchorTop - fuzz) || (anchorTop < scrollY)) && (scrollY !== 0);

			// if the anchor is a PDQ section and we're >=desktop
			if(width > NCI.Breakpoints.large && isSection) {
				scrollY = 0;
				willFreeze = false;
			} else if(hasPreviousState) {
				return;
			} else {
				scrollY = anchorTop - headerHeight;
			}

			// freeze headroom
			if(willFreeze) {
				$('.headroom-area').addClass('frozen');
			}

			window.scrollTo(0, scrollY);

			// unfreeze headroom
			if(willFreeze) {
				setTimeout(function() {
					$('.headroom-area').removeClass('frozen');
				}, 50);
			}
			$accordion.off('accordionactivate.NCI.scrollTo');
		}

		if($accordion.length > 0) {
			$accordion.on('accordionactivate.NCI.scrollTo', function(e) { doTheScroll(); });
			if(!$accordionPanel.hasClass('accordion-content-active')) {
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
	buildOTP: function() {
		var options = {
				titleText: {
					en: "On This Page",
					es: "En Este Página"
				},
				class: "on-this-page",
				placement: {
					insert: 'prependTo',
					to: '[data-otp-selector]'
				},
				ignore: {
					heading: ['h6'],
					node: ['aside']
				},
				maxLevel: 2
			},

			$nav = $('<nav>').addClass(options.class).attr('role', "navigation")
				.append($('<h6>').text(options.titleText[NCI.page.lang || 'en'])),
			articleRoot = NCI.page.outline.sections[0];

		$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

		$nav[options.placement.insert](options.placement.to);

		return $nav;
	},

	/*======================================================================================================
	* function doAccordion
	*
	*  will generate an accordion using jQuery UI
	*
	* returns: null
	* parameters:
	*  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
	*  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
	*
	*====================================================================================================*/
	doAccordion: function(target, opts) {
		var $target = $(target);
		var defaultOptions = {
			heightStyle: "content",
			header: "h2",
			collapsible: true,
			active: false,
			/* override default functionality of accordion that only allows for a single pane to be open
			 * original source: http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once */
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
					currContent.slideUp(function() {
						$target.trigger('accordionactivate', ui);
					});
				} else {
					currContent.slideDown(function() {
						$target.trigger('accordionactivate', ui);
					});
				}

				return false; // Cancels the default action
			},
			icons: {
				"header": "toggle",
				"activeHeader": "toggle"
			}
		};
		var options = $.extend({}, defaultOptions, opts);

		if($target.length > 0) {
			$target.accordion(options);
		}
	},

	/*======================================================================================================
	* function undoAccordion
	*
	*  will destroy an accordion using jQuery UI
	*
	* returns: null
	* parameters:
	*  target[]    (string)(jQuery selector)    Selector of the div to be accordionized.
	*  opts{}      (object)                     Options to pass to jQuery UI's accordion function.
	*
	*====================================================================================================*/
	undoAccordion: function(target) {
		var $target = $(target);
		if($target.length > 0) {
			/* destroy the accordion if it's already been initialized */
			$(target).each(function() {
				if (typeof $(this).data("ui-accordion") !== "undefined") {
					$(this).accordion("destroy");
					if (typeof equalHeights === "function") {
						// if we're on homepage, landing page, or CTHP
						equalHeights();
					}
				}
			});
		}
	},

	/*======================================================================================================
	* function undoAccordion
	*
	*  will generate all possible accordions on the page
	*
	* returns: null
	* parameters: null
	*
	*====================================================================================================*/
	makeAllAccordions: function() {
		var targets = {
			//'selector' : 'header'
			'.accordion' : 'h2:not([data-display-excludedevice~="mobile"] h2)',
			'#nvcgRelatedResourcesArea' : 'h6',
			'#cgvCitationSl' : 'h6',
			'.cthp-content' : 'h3'
		};
		var targetsSelector = Object.keys(targets).join(', ');
		var targetsBuiltAccordion = [],
				targetsHeader = [],
				accordion;

		for(var target in targets) {
			if(targets.hasOwnProperty(target)) {
				targetsBuiltAccordion.push(target + '.ui-accordion');
				targetsHeader.push(target + ' ' + targets[target]);
			}
		}
		var targetsBuiltAccordionSelector = targetsBuiltAccordion.join(', ');
		var targetsHeaderSelector = targetsHeader.join(', ');

		function accordionize() {
			/* determine window width */
			var width = window.innerWidth || $(window).width(),
				accordion;

			/* If the width is less than or equal to 640px (small screens)
			 * AND if the accordion(s) isn't (aren't) already built */
			if (width <= NCI.Breakpoints.medium && $(targetsBuiltAccordionSelector).length === 0) {
				// verify that the accordion will build correctly
				$(targetsHeaderSelector).each(function() {
					var $this = $(this);
					if($this.nextAll().length > 1 || $this.next().is('ul, ol')) {
						$this.nextUntil($(targetsHeaderSelector)).wrapAll('<div class="clearfix"></div>');
					}
				});

				for(accordion in targets) {
					if(targets.hasOwnProperty(accordion)) {
						NCI.doAccordion(accordion, {'header': targets[accordion]});
					}
				}

				// after all accordions have been built, add appropriate odd/even classes to the accordion headers
				var builtAccordionHeaders = $('.ui-accordion-header');
				for(var i = 1; i <= builtAccordionHeaders.length; i++) {
					if(i % 2 === 0) {
						builtAccordionHeaders.get(i-1).className += ' ' + 'even';
					} else {
						builtAccordionHeaders.get(i-1).className += ' ' + 'odd';
					}
				}

				/* else, the window must be large */
			} else if(width > NCI.Breakpoints.medium) {
				for(accordion in targets) {
					if(targets.hasOwnProperty(accordion)) {
						NCI.undoAccordion(accordion, {'header': targets[accordion]});
					}
				}
			}
		}

		$(window).on('resize', function() {
			accordionize();
		});

		accordionize();
	},

	/*======================================================================================================
	* function doAutocomplete
	*
	*  will generate an autocomplete box for an <input type="text"> element, using jQuery UI
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
	doAutocomplete: function(target, src, contains, queryParam, queryString, opts) {
		var appendTo = null,
			$target = $(target);
		if(target !== "#swKeyword") {
			appendTo = $target.parent();
		}
		var queryParameter = queryParam || "term",
			regexIsContains = contains || false,
			defaultOptions = {
				appendTo: appendTo,
				// Set AJAX service source
				source: (function() {
					var xhr;

					return function( request, response ) {
						var dataQuery = $.extend({}, queryString || {});
						var term = request.term;
						dataQuery[queryParameter] = term;

						if (xhr && xhr.abort) {
							xhr.abort();
						}
						if (typeof src === 'string') {
							xhr = $.ajax({
								url: src,
								data: dataQuery,
								dataType: 'json',
							});
						} else {
							xhr = src.call(this, term)
								.done(function(data) {
									return data.result;
								});
						}

						$.when(xhr)
							.done(function(data) {
								if(data.result) {
									response(data.result);
								} else {
									response(data);
								}
							})
							.fail(function() {
								response([]);
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
			.data('ui-autocomplete')._renderItem = function(ul, item) {
				//Escape bad characters
				var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, '\$&');
				var regexBold = new RegExp();

				if (regexIsContains) {
					// highlight autocomplete item if it appears anywhere
					regexBold = new RegExp('(' + lterm + ')', 'i');
				} else {
					// highlight autocomplete item if it appears at the beginning
					regexBold = new RegExp('(^' + lterm + '|\\s+' + lterm + ')', 'i');
				}
				var word = (item.item || item.term).replace(regexBold, "<strong>$&</strong>");

				return $("<li></li>")
					.data('ui-autocomplete-item', item)
					.append(word)
					.appendTo(ul);
			};

		return $target;
	},

	page: {},

	window: {}
};
