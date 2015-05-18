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
	scrollTo: function(anchor) {
		// ensure the anchor is a string OR an element
		if(!(typeof anchor === "string" || // string
			(typeof anchor === "object" && anchor !== null && anchor.nodeType === 1 && typeof anchor.nodeName === "string") // DOM element
		)) {
			//console.error('Unknown anchor:', anchor);
			return;
		}

		var width = window.innerWidth || $(window).width(),
			isSection = false;

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
			accordionIndex;

		if($accordion.length > 0) {
			accordionIndex = $accordion.data('ui-accordion').headers.index($accordionPanel.prev('.ui-accordion-header'));
		}

		function doTheScroll() {
			// get the sticky nav jQuery element
			var headerHeight = $('.fixedtotop').outerHeight(),
				anchorTop = window.scrollY + headerHeight,
				willFreeze = true;

			// PDQ CIS
			if(width > NCI.Breakpoints.large && isSection) {
				anchorTop = 0;
				willFreeze = false;
			} else {
				if($anchor.length > 0) {
					anchorTop = $anchor.offset().top;
				}
			}

			if(willFreeze) {
				$('.headroom-area').addClass('frozen');
			}
			window.scrollTo(0, anchorTop - headerHeight);
			if(willFreeze) {
				setTimeout(function() {
					$('.headroom-area').removeClass('frozen');
				}, 50);
			}
			$accordion.off('accordionactivate');
		}

		if($accordion.length > 0) {
			$accordion.on('accordionactivate', function(e) { doTheScroll(); });
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
	 * Returns: null
	 * Parameters:
	 *   target[]    (string)(jQuery selector)    Selector that identifies element used to create the "on this page" block
	 *====================================================================================================*/
	buildOTP: function (target) {
		// Get items inside div where id="cgvBody" and "data-otp-selector" attribute is not false.
		var $otp = $("#cgvBody [data-otp-selector]");
		$otpItems = $otp.find($otp.attr('data-otp-selector') || 'h2').not('[data-otp="false"]');

		// Create 'On This Page' element
		if($otpItems.length > 0) {
			var otpTitle;
			if ($("html").attr("lang") === "es") {
				otpTitle = "En Este Página";
			} else {
				otpTitle = "On This Page";
			}
			var otp = $("<nav>").addClass("on-this-page");
			otp.append($("<h6>").text(otpTitle));

			// Create a list out of the items found by $otpItems
			var otpList = $("<ul>");
			var otpItem;
			for (var i = 0; i < $otpItems.length; i++) {
				otpItem = $otpItems[i]; // Get each item found by $otpItems
				// Add each to the OTP list; use header text for link text; link to the ID of the target header or parent
				$("<li>").append($("<a>").attr("href", "#" + (otpItem.id || otpItem.parentElement.id)).text(otpItem.textContent.trim())).appendTo(otpList);
			}
			otpList.appendTo(otp); // Add list to 'On This Page' nav element
			otp.prependTo("#cgvBody > .slot-item:first"); // Add nav element inside "cgvBody" div
		}
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
			'.accordion' : 'h2',
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
			if (width <= 640 && $(targetsBuiltAccordionSelector).length === 0) {
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
			} else if(width > 640) {
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
	*  !url[]               (string)                     URL of the autocomplete service.
	*  contains[false]      (boolean)                    Boolean variable describing whether the autocomplete is for "starts with" (false) or "contains" (true).
	*  queryParam["term"]   (string)                     Primary search querystring parameter.
	*  queryString{}        (object)                     Additional parts of the querystring to pass to the autocomplete service.
	*  opts{}               (object)                     Other options to pass to jQuery UI's autocomplete function.
	*
	*====================================================================================================*/
	doAutocomplete: function(target, url, contains, queryParam, queryString, opts) {
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
				var word = item.item.replace(regexBold, "<strong>$&</strong>");

				return $("<li></li>")
					.data('ui-autocomplete-item', item)
					.append(word)
					.appendTo(ul);
			};

		return $target;
	}
};
