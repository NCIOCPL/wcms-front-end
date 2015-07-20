// This file is for the PDQ Cancer Information Summary UX functionality
$(function() {

	var lang = $('html').attr('lang') || 'en';

	//Navigation state variable for handling in page nav events
	var navigationState = "UNINITIALIZED";

	//Helper function to do insternal redirects (i.e. changing a has from an ID to a specific route)
	function internalRedirect(path) {
		if (navigationState !== "UNINITIALIZED") {
			navigationState = "REDIRECT";
		}
		routie(path);
	}

	//Event handler to determine when to fire PDQINPAGENAV event.
	$(window).on("hashchange", function() {
		if (navigationState == "UNINITIALIZED") { //This is the hashchange event after the initial load
			navigationState = "INITIALIZED";
		} else if (navigationState == "REDIRECT") { //This is a hashchange event before a redirect.
			navigationState = "INITIALIZED";
		} else if (navigationState == "IN_SECTION") { //Navigating within and open page
			navigationState = "INITIALIZED";
		} else {
			//The page is initialized, so we are doing an inpage navigation
			$(window).trigger("pdqinpagenav");
		}
	});



	// update item hrefs to include '#link/' at the beginning
	function updateLinkHref(i, el) {
		var $this = $(el);
		$this.attr('href', '#link\/' + $this.attr('href').substr(1));
	}

	// This function selects the first-level elements from the document outline and creates a one-level table of contents
	// It also appends a "View All" link to the end
	// Levels: 2
	function buildTopTOC() {
		var options = {
				i18n: {
					title: {
						en: "Sections",
						es: "Secciones"
					},
					viewAll: {
						en: "View All Sections",
						es: "Ver todas las secciones"
					}
				},
				class: "toptoc no-resize-pdq-section",
				placement: {
					insert: 'insertBefore',
					to: '.summary-sections > section:eq(0)'
				},
				ignore: {
					heading: ['h6', '[do-not-show="toc"]'],
					node: ['aside']
				},
				maxLevel: 1
			},

			$nav = $('<nav>').addClass(options.class).attr('role', "navigation").attr('id', 'pdq-toptoc')
				.append($('<h3>').text(options.i18n.title[NCI.page.lang || 'en'])),
			articleRoot = NCI.page.outline.sections[0];

		$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

		// append "View All" item
		$nav.children('ul').append(
			$('<li class="viewall"><a href="#all"><span>' + (options.i18n.viewAll[NCI.page.lang || 'en']) + '</span></a></li>')
		);

		// update item hrefs, fix slash word-breaking
		$nav.find('a').each(function() {
			var $this = $(this);
			$this.attr('href', '#section\/' + $this.attr('href').substr(1))
				.html($this.html().replace(/([\/\\])/g, '$1&#8203;'));
		});

		$nav[options.placement.insert](options.placement.to);

		return $nav;
	}

	// This function creates the table of contents for the individual sections.
	// Levels 2, 3, 4
	function buildFullTOC() {
		var options = {
				i18n: {
					title: {
						en: "On This Page",
						es: "En Este Página"
					}
				},
				class: "on-this-page",
				placement: {
					insert: 'prependTo',
					to: $('<div id="pdq-toc-article">').insertAfter('#pdq-toptoc')
				},
				ignore: {
					heading: ['h6', '[do-not-show="toc"]'],
					node: ['aside']
				},
				maxLevel: 3
			},

			$nav = $('<nav>').addClass(options.class).attr('role', "navigation")
				.append($('<h6>').text(options.i18n.title[NCI.page.lang || 'en'])),
			articleRoot = NCI.page.outline.sections[0];

		$nav.append(NCI.page.parseOutline(articleRoot, 1, options.maxLevel, options.ignore));

		// update item hrefs
		$nav.find('a').each(updateLinkHref);

		$nav[options.placement.insert](options.placement.to);

		return $nav;
	}

	// This function creates the table of contents for the individual sections.
	// Levels: 3, 4
	function buildSectionTOC() {
		var options = {
				class: "on-this-page",
				placement: {
					insert: 'prependTo',
					to: '.pdq-sections'
				},
				ignore: {
					heading: ['h6', '[do-not-show="toc"]'],
					node: ['aside']
				},
				startLevel: 2,
				maxLevel: 3
			},

			articleRoot = NCI.page.outline.sections[0],
			sectionInsertionPoint,
			$sectionNav,
			sectionRoot;

		for (var i = 0, len = articleRoot.sections.length; i < len; i++) {
			sectionInsertionPoint = options.placement.to + ':eq(' + i + ')';
			newRoot = articleRoot.sections[i];

			// $nav is instantiated inside the loop to avoid changing the previous nav
			var $nav = $('<nav>').addClass(options.class).attr('role', "navigation");

			$nav.append(NCI.page.parseOutline(newRoot, options.startLevel, options.maxLevel, options.ignore));

			// update item hrefs
			$nav.find('a').each(updateLinkHref);

			if($nav.children().length > 0) {
				$nav[options.placement.insert](sectionInsertionPoint);
			}
		}
	}

	// JQuery Function: showSection()
	// This function opens and closes the top-level sections selected
	// on the section nav bar
	// ------------------------------------------------------------------
	// Function formerly known as InThisSummary.js
	// ------------------------------------------------------------------
	$.fn.showSection = function(options) {
		// Adding some default settings
		var settings = $.extend({
			text: "Default Text",
			color: null
		}, options);


		return this.each(function() {
			// hide all sections
			$(".summary-sections > section").addClass("hide");
			// ... and then show the first section of the page
			$(".summary-sections > section:eq( 0 )").removeClass("hide")
				.addClass("show");
			// Also need to "select" the item for CSS to be applied
			$("#pdq-toptoc > ul > li:eq( 0 )").addClass("selected");
		});
	};


	// JQuery Function: previousNext()
	// This function creates the links at the bottom to navigate to the
	// previous/next section
	// ------------------------------------------------------------------
	// Function to create the Previous/Next Navigation
	// ------------------------------------------------------------------
	$.fn.previousNext = function(options) {
		var defaults = {
			footer: "Prev Next"
		};

		//let's extend our plugin with default or user options when defined
		var options = $.extend(defaults, options);

		// Select the language tag to pick the proper text for headings
		// TBD:  Are KeyPoints H3 or H4???
		// ------------------------------------------------------------
		var strPrev = "";
		var strNext = "";
		if ($('meta[name="content-language"]').attr('content') == 'es') {
			strPrev = "Secci&#243;n anterior";
			strNext = "Siguiente secci&#243;n";
		} else {
			strPrev = "Previous section";
			strNext = "Next section";
		};

		// Add the Previous/Next navigation to the bottom of each section
		return this.children("section").each(function() {
			// The link target '#section/_id' triggers routie.js to set the
			// URL for the section properly
			// --------------------------------------------------------------
			var pnDivL = "<div class='row show-for-large-up ";
			pnDivL = pnDivL + "previous-next-links collapse'>";
			var pDivL = "<div class='large-6 columns previous-link'>";
			var pLinkL = "<a href='#section/";
			var pLinkR = "'>&lt; " + strPrev + "</a>";
			var pTitleL = "<br><em>";
			var pTitleR = "</em>";
			var pDivR = "</div>";
			var nDivL = "<div class='large-6 columns next-link'>";
			var nLinkL = "<a href='#section/";
			var nLinkR = "'>" + strNext + " &gt;</a>";
			var nTitleL = "<br><em>";
			var nTitleR = "</em>";
			var nDivR = "</div>";
			var pnDivR = "</div>";

			// Extract the section ID and section title of previous/next section
			// including the section ID will trigger routie.js to open the
			// appropriate section.
			// -----------------------------------------------------------------
			var prevTitle = $(this).prev("section").children("h2").text();
			var prevId = $(this).prev("section").attr("id");
			var nextTitle = $(this).next("section").children("h2").text();
			var nextId = $(this).next("section").attr("id");

			// Concatenate everything and add to the end of the section
			// but only if a previous/next section exists.
			// --------------------------------------------------------
			var pnFooter = ""
			pnFooter = pnFooter + pnDivL + pDivL;
			if (prevId) {
				pnFooter = pnFooter + pLinkL + prevId + pLinkR + pTitleL + prevTitle + pTitleR;
			}
			pnFooter = pnFooter + pDivR + nDivL;
			if (nextId) {
				pnFooter = pnFooter + nLinkL + nextId + nLinkR + nTitleL + nextTitle + nTitleR;
			}
			pnFooter = pnFooter + nDivR + pnDivR;

			// Add the footer to the section
			$(this).append(pnFooter);
		});
	};

	// *** END Functions *** ****************************************

	// Creating the Section Nav in the pdq-toptoc DIV
	// All content within the article tag is used
	// ------------------------------------------------------------
	buildTopTOC()
		// add analytics
		.on('click.NCI.toptoc', 'a', function(e) {
			if ($(this).parent('li').hasClass('viewall')) {
				NCIAnalytics.RightNavLink(this, 'View All Click');
			} else {
				NCIAnalytics.RightNavLink(this, 'Section Nav Click');
			}
		});

	// Preparing the sections with the show/hide attributes
	// ------------------------------------------------------------
	$("#pdq-toptoc ul").showSection({});

	// Creating the previous/next navigation links
	// ------------------------------------------------------------
	$("div.summary-sections").previousNext({
		footer: "Prev/Next"
	});

	// Creating the full-page TOC
	buildFullTOC();

	// Secondly creating all of the section-level TOCs
	// Note: This will only be used for TOC, not if Keypoints exist for the section
	buildSectionTOC();

	// Wrapping the summary sections in a DIV to create the accordion
	// for the mobile layout
	// --------------------------------------------------------------
	$("div.summary-sections").children("section")
		.wrapAll("<div class='accordion'></div>");
	NCI.makeAllAccordions();
	NCI.scrollTo(location.hash);


	// Temporarily reset the URL for the email/facebook/etc. buttons
	// Only attempt the replace if the print button exists on the page
	// ---------------------------------------------------------------
	var urlEmail = $("li.po-email a").attr("href");

	//// Aarti will add a meta-tag to the PP output that could then be
	//// used instead of the urlEmail to test against PP
	//var ppx = $('meta[name="publishpreview"]');
	//console.log(ppx);

	// PublishPreview doesn't include the print/email/etc. buttons
	if (urlEmail) {
		pp = false
	} else {
		pp = "true"
	}
	if (!pp) {
		var newEmailUrl = urlEmail.replace(/docurl=.*&language/i,
			'docurl=#&language');
	}

	// Set the meta-tag for 'og:url' to
	var currentDoc = $('meta[property="og:url"]').attr('content');
	var fullDoc = $('meta[name="page"]').attr('content');
	if (!fullDoc || 0 === fullDoc.length) {
		fullDoc = currentDoc;
	}
	// PublishPreview doesn't include the print/email/etc. buttons
	if (!pp) {
		// Replace absolute to relative links
		fullDoc.replace(/http:\/\/.*\//, '/');
	}
	//var urlFacebook = $("li.po-facebook a").attr("href");
	//var urlTwitter = $("li.po-twitter a").attr("href");
	//var urlGooglePlus = $("li.po-googleplus a").attr("href");
	//var urlPinterest = $("li.po-pinterest a").attr("href");

	//console.log(urlEmail);
	// Don't do this if we don't have the buttons available, i.e.
	// for PublishPreview
	// -------------------------------------------------------------------
	if (!pp) {
		if ($('meta[name="content-language"]').attr('content') == 'en') {
			var thisSection = $('section.show').attr('id');
			var openSections = $('section.show');
			if (openSections.length > 1) {
				newEmailUrl.replace('#', fullDoc +
					'%23section%2fall&language');
				//var newFacebookUrl = urlFacebook.replace('#',
				//                            '%23section%2fall&language');
				//var newTwitterUrl = urlTwitter.replace('#',
				//                            '%23section%2fall&language');
				//var newGooglePlusUrl = urlGooglePlus.replace('&tt=0',
				//                            '%23section%2fall&tt=0');
				//var newPinterestUrl = urlPinterest.replace('#',
				//                            '%23section%2fall&language');
			} else {
				newEmailUrl.replace('#', fullDoc +
					'%23section%2f' + thisSection + '&language');
				//var newFacebookUrl = urlFacebook.replace('#',
				//                     '%23section%2f'+thisSection+'&language');
				//var newTwitterUrl = urlTwitter.replace('#',
				//                     '%23section%2f'+thisSection+'&language');
				//var newGooglePlusUrl = urlGooglePlus.replace('&tt=0',
				//                     '%23section%2f'+thisSection+'&tt=0');
				//var newPinterestUrl = urlPinterest.replace('#',
				//                     '%23section%2f'+thisSection+'&language');
			}
		} else {
			var newEmailUrl = urlEmail.replace('&language', '#email&language');
		}
	}

	// Section to setup re-routing of URLs
	// We are jumping to the specified link and opening the parent section
	// that contains this link.
	// -------------------------------------------------------------------
	routie({
		'all': function() {
			//console.log('all');
			internalRedirect('section/all');
		},
		// Handling of links clicked in the section navigation
		// ---------------------------------------------------
		'section/:sid': function(sid) {
			$(document).scrollTop(0);

			// When we're routing to a new section we're setting the
			// meta-tag for 'og:url' to the current section so that
			// the social media share buttons - retrieving the URL from
			// this tag - will grab and display the correct section
			// instead of displaying the default section One
			// ---------------------------------------------------------
			var currentDoc = $('meta[property="og:url"]').attr('content');
			var fullDoc = $('meta[name="page"]').attr('content');

			// Saving the document URL if it doesn't exist yet this makes
			// it easier to create the new current URL
			// ----------------------------------------------------------
			if (!fullDoc || 0 === fullDoc.length) {
				$("head").append('<meta name="page" content="' + currentDoc + '">');
				fullDoc = currentDoc;
			}

			if (sid == 'all') {
				$("section.hide").removeClass("hide")
					.addClass("show");
				$("#pdq-toptoc li.selected").removeClass("selected");
				$("#pdq-toptoc li.viewall").addClass("selected");

				// Hide all the TOCs (section and doc level)
				$("div nav.on-this-page").addClass("hide");
				// ... and then just show the doc level TOC
				$("#pdq-toc-article nav.on-this-page").removeClass("hide")
					.addClass("show");
				// ... and hide the Previous/Next navigation links
				$("div.next-link").addClass("hide");
				$("div.previous-link").addClass("hide");

				// Finally, set the meta tag used by the AddThis JS to set the
				// proper URL

				$('meta[property="og:url"]').attr('content', fullDoc + '#section/' + 'all');
			} else {
				// Display of SummarySections
				$("section.show").removeClass("show")
					.addClass("hide");
				$("section#" + sid).removeClass("hide")
					.addClass("show");

				// Highlighting of the section nav elements
				var thisSection = $("section.show").children("h2")
					.attr("id");
				$("#pdq-toptoc li.selected").removeClass("selected");
				$("#pdq-toptoc li > span[show=" + thisSection + "]").closest("li")
					.addClass("selected");

				// Show all the TOCs (section and doc level)
				$("div nav.on-this-page").removeClass("hide");
				// ... and then hide just the doc level TOC
				$("#pdq-toc-article nav.on-this-page").removeClass("show")
					.addClass("hide");
				// ... and show the Previous/Next navigation links
				$("div.next-link").removeClass("hide");
				$("div.previous-link").removeClass("hide");

				$('meta[property="og:url"]').attr('content', fullDoc + '#section/' + sid);
			}
		},
		// Handling of links clicked in the 'On this page' navigation or
		// within the document
		// -------------------------------------------------------------
		'link/:rid': function(rid) {
			// Hide all open sections unless we are in the 'View all' section
			if ($("#pdq-toptoc li.viewall").hasClass("selected")) {
				var nothingToDo = 0;
				navigationState = "IN_SECTION";
			} else if ($("#" + rid).closest("section.show").length > 0) {
				//Do nothing here, we are navigating within the open section
				navigationState = "IN_SECTION";
			} else {
				//console.log('link section');
				$(".summary-sections section.show").removeClass("show")
					.addClass("hide");
				// Find parent (top level section) of current element
				$("#" + rid).closest("section.hide").removeClass("hide")
					.addClass("show");
				$("#pdq-toptoc li.selected").removeClass("selected");
				var thisSection = $("section.show").children("h2")
					.attr("id");
				$("#pdq-toptoc li.selected").removeClass("selected");
				$("#pdq-toptoc li > span[show=" + thisSection + "]").closest("li")
					.addClass("selected");
			}

			// ... and set the section navigation properly
			// Lastly move to the target
			$("#" + rid).get(0).scrollIntoView();
			$("[tabindex='1']").removeAttr("tabindex");
			$("#" + rid).attr("tabindex", 1).focus();

		},
		'cit/:cid': function(cid) {
			// Hide all open sections unless we are in the 'View all' section
			if ($("#pdq-toptoc li.viewall").hasClass("selected")) {
				var nothingToDo = 0;
				navigationState = "IN_SECTION";
			} else if ($("li[id='" + cid + "']").closest("section.show").length > 0) {
				//Do nothing here, we are navigating within the open section
				navigationState = "IN_SECTION";
			} else {
				// Hide all open sections
				$(".summary-sections section.show").removeClass("show")
					.addClass("hide");
				// Find parent (top level section) of current element
				$("li[id='" + cid + "']").closest("section.hide").removeClass("hide")
					.addClass("show");
				$("#pdq-toptoc li.selected").removeClass("selected");
				var thisSection = $("section.show").children("h2")
					.attr("id");
				$("#pdq-toptoc li.selected").removeClass("selected");
				$("#pdq-toptoc li > span[show=" + thisSection + "]").closest("li")
					.addClass("selected");
			}
			$("li[id='" + cid + "']")[0].scrollIntoView();
		},

		// Check if the supplied ID exists.  If it doesn't exist open
		// the full document.
		// ----------------------------------------------------------
		':lid': function(lid) {
			// Do not route these
			var doNotRoute = ['print', 'imprimir', 'main'];

			if (doNotRoute.indexOf(lid.toLowerCase()) === -1) {
				if ($('#' + lid).length === 0) {
					internalRedirect('section/all');
				} else {
					if (lid.match(/^section_/)) {
						internalRedirect('cit/' + lid);
					} else {
						internalRedirect('link/' + lid);
					}
				}
			}
		},
		// Handle a normal load (show the first section)
		'': function() {
			// Note: a request for <URL> or <URL># will enter this

			// Redirect for <URL> to the first section
			// NOTE: <URL># should not be interally redirected. Since there's no 'location.hash' in this case, fake it.
			if(location.href.replace(location.protocol + '//' + location.host + location.pathname, '') !== "#") {
				internalRedirect('section/' + document.querySelector('.summary-sections section').id);
			}
		}
	});

});
