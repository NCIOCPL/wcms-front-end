// This file is for the PDQ Cancer Information Summary UX functionality
$(function() {

	//Navigation state variable for handling in page nav events
	var navigationState = "UNINITIALIZED";

	//Helper function to do insternal redirects (i.e. changing a has from an ID to a specific route)
	function internalRedirect(path) {
		if (navigationState != "UNINITIALIZED") {
			navigationState = "REDIRECT"
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



	//(function($) {
	// Add the container DIV to insert the SectionNav list
	// as the first element of the DIV.summary-sections container
	var topTocDiv = "<div id='pdq-toptoc' class='toptoc no-resize-pdq-section'></div>";
	$(".summary-sections > section:eq( 0 )").before(topTocDiv);

	// JQuery Function: topToc()
	// This function selects the H2 elements from the "article" container
	// element and creates a one-level table of content
	// It's also called the "Section Navigation" because it opens the
	// sections to be displayed.
	// ------------------------------------------------------------------
	// Function formerly known as TOPTOC.js
	// ------------------------------------------------------------------
	$.fn.topToc = function(options) {
		//alert("In topToc Start");
		//Our default options
		var defaults = {
			search: "body", //where we will search for titles
			depth: 1, //how many hN should we search
			start: 2, //which hN will be the first (and after it we
			//go just deeper)
			stocTitle: "Contents", //what to display before our box
			listType: "ul", //could be ul or ol
			tocTitleEn: "Sections",
			tocTitleEs: "Secciones",
			beforeText: "", // can add <span class="text-class">
			afterText: "", // can add </span> to match beforeText
			smoothScroll: 0
		};

		//let's extend our plugin with default or user options when defined
		var options = $.extend(defaults, options);

		// Select the language tag to pick the proper text for headings
		// ------------------------------------------------------------
		var strViewAll = "";
		if ($('meta[name="content-language"]').attr('content') == 'es') {
			defaults.stocTitle = "<h3 do-not-show='toc'>" + defaults.tocTitleEs + "</h3>";
			strViewAll = "Ver todas las secciones";
		} else {
			defaults.stocTitle = "<h3 do-not-show='toc'>" + defaults.tocTitleEn + "</h3>";
			strViewAll = "View All Sections";
		};

		return this.each(function() {
			//"cache" our target and search objects
			obj = $(this); //target
			src = $(options.search); //search

			// if container is not found.
			if (!src || 0 === src.length) {
				return;
			}

			//let's declare some variables. We need this var declaration to
			//create them as local variables (not global)
			var appHTML = "",
				tagNumber = 0,
				txt = "",
				id = "",
				beforeTxt = options.beforeText,
				afterTxt = options.afterText,
				previous = options.start,
				start = options.start,
				depth = options.depth,
				i = 0,
				srcTags = "h" + options.start,
				cacheHN = "";
			//    kp = options.kp;

			//// Turn off the KeyPoint header (coming from the TOC box) (VE)
			//if (kp == 1)
			//    options.stocTitle = ""

			//which tags we will search
			while (depth > 1) {
				start++; //we will just get our start level and numbers higher than it
				srcTags = srcTags + ", h" + start;
				depth--; //since went one level up, our depth will go one level down
			}
			// if the target is not found
			var found = src.find(srcTags);
			if (!found || 0 === found.length) {
				return;
			}

			found.each(function() {
				//we will cache our current H element
				cacheHN = $(this);
				//if we are on h1, 2, 3...
				tagNumber = (cacheHN.get(0).tagName).substr(1);

				//sets the needed id to the element
				//if it doesn't have one, of course
				// --------------------------------------------------
				id = cacheHN.attr('id');
				if (id == "" || typeof id === "undefined") {
					id = "stoc_h" + tagNumber + "_" + i;
					cacheHN.attr('id', id);
				}
				//our current text
				txt = cacheHN.text();

				// Suppressing certain sections from TOC
				// The KeyPoint headings are only displayed in the KeyPoint
				// boxes (section level TOC) but not in the document
				// level TOC.  That means we'll have to suppress the KP
				// headings when searching on the body or article level but
				// need to include them at the section level.
				// --------------------------------------------------------
				if (options.search == 'body' || options.search == 'article') {
					var hAttr = cacheHN.attr("type");
				} else {
					var hAttr = '';
				}
				var tocShow = cacheHN.attr("do-not-show");

				// We also suppress headings for Reference sections and the
				// heading for the KP box itself.
				// There are certain headings that should never be included
				// in the TOC, i.e. Key Points, References, Nav Headings.
				// These are identified by a "do-not-show='toc'" attribute.
				// ---------------------------------------------------------
				//if (txt == 'References' || txt == 'Key Points for This Section'
				//                        || hAttr == 'keypoint') {
				//    txt = '';
				// }
				if (txt != 'References' && txt != 'Key Points for This Section' && hAttr != 'keypoint') {

					switch (true) { //with switch(true) we can do
						//comparisons in each case
						case (tagNumber > previous): //it means that we went down
							//one level (e.g. from h2 to h3)
							appHTML = appHTML + "<" + options.listType + "><li>" + beforeTxt + "<a href=\"#" + id + "\">" + txt + "</a>";
							previous = tagNumber;
							break;
						case (tagNumber == previous): //it means that stay on the
							//same level (e.g. h3 and
							//stay on it)
							appHTML = appHTML + "</li><li>" + beforeTxt + "<span tabindex='0' show=\"" + id + "\">" + "<a class=\"pdq-section-link\" onclick=\"NCIAnalytics.RightNavLink(this,'Section Nav Click');\">" + txt.replace(/([\/\\])/g, '$1&#8203;') + "</a>" + "</span>";
							break;
						case (tagNumber < previous): //it means that we went up but
							//we don't know how much levels
							//(e.g. from h3 to h2)
							while (tagNumber != previous) {
								appHTML = appHTML + "</" + options.listType + "></li>";
								previous--;
							}
							appHTML = appHTML + "<li>" + beforeTxt + "<a href=\"#" + id + "\">" + txt + "</a>";
							break;
					}
				}
				i++;
			});
			appHTML = appHTML + "<li class='viewall'>" + "<span tabindex='0'>" + "<a class=\"pdq-section-link\" onclick=\"NCIAnalytics.RightNavLink(this,'View All Click');\">" + strViewAll + "</a>" + "</span>" + "</li>";
			//corrects our last item, because it may have some opened ul's
			while (tagNumber != options.start && tagNumber > 0) {
				appHTML = appHTML + "</" + options.listType + ">";
				tagNumber--;
			}
			//append our html to our object
			appHTML = options.stocTitle + "<" + options.listType + ">" + appHTML + "</" + options.listType + ">";
			obj.append(appHTML); // orig

			//our pretty smooth scrolling here
			// acctually I've just compressed the code so you guys will think that I'm the man . Source: http://css-tricks.com/snippets/jquery/smooth-scrolling/
			//		if (options.smoothScroll == 1) {
			//			$(window).load(function(){
			//				function filterPath(string){return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'')}var locationPath=filterPath(location.pathname);var scrollElem=scrollableElement('html','body');obj.find('a[href*=#]').each(function(){var thisPath=filterPath(this.pathname)||locationPath;if(locationPath==thisPath&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,'')){var $target=$(this.hash),target=this.hash;if(target){var targetOffset=$target.offset().top;$(this).click(function(event){event.preventDefault();$(scrollElem).animate({scrollTop:targetOffset},400,function(){location.hash=target})})}}});function scrollableElement(els){for(var i=0,argLength=arguments.length;i<argLength;i++){var el=arguments[i],$scrollElement=$(el);if($scrollElement.scrollTop()>0){return el}else{$scrollElement.scrollTop(1);var isScrollable=$scrollElement.scrollTop()>0;$scrollElement.scrollTop(0);if(isScrollable){return el}}}return[]}
			//			});
			//		}
		});
		//alert("In topToc End");
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

			// If any of the section Nav items are pressed do the following
			// ------------------------------------------------------------
			$("#pdq-toptoc li").click(function() {
				$(document).scrollTop(0);
				// Do nothing if the highlighted section is pressed again
				if ($(this).hasClass("selected")) {
					x = 'do_nothing';
				} else if ($(this).hasClass("viewall")) {
					routie('section/all');
				} else {
					// Display of SummarySections
					var jumpTo = $(this).find("span")
						.attr("show");
					var secId = $("h2#" + jumpTo).closest("section")
						.attr("id");
					routie('section/' + secId);
				}
			});
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


	// JQuery Function: stoc()
	// This function creates the table of contents for the article and
	// for the individual sections.
	// This is also called the "On-this-page" navigation.
	//
	// Document level TOC also includes a title 'On this page' and all
	// TOCs are wrapped in a <nav> element.
	// The TOC starts on H-level 3 and goes 2 levels deep for sections.
	// The TOC starts on H-level 2 and goes 3 levels deep for the article.
	// ------------------------------------------------------------------
	// Function to create the TOC (Table Of Contents)
	// ------------------------------------------------------------------
	$.fn.stoc = function(options) {
		//console.log("In stoc start");
		//Our default options
		var defaults = {
			search: "body", //where we will search for titles
			depth: 6, //how many hN should we search
			start: 1, //which hN will be the first (and after it we
			//go just deeper)
			stocTitle: "Contents", //what to display before our box
			listType: "ul", //could be ul or ol
			tocTitleEn: "Table of content for this section",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n",
			beforeText: "", // can add <span class="text-class">
			afterText: "", // can add </span> to match beforeText
			smoothScroll: 0

		};


		//let's extend our plugin with default or user options when defined
		var options = $.extend(defaults, options);

		// Select the language tag to pick the proper text for headings
		// TBD:  Are KeyPoints H3 or H4???
		// ------------------------------------------------------------
		if ($('meta[name="content-language"]').attr('content') == 'es')
			defaults.stocTitle = '<h6>' + defaults.tocTitleEs + '</h6>';
		else
			defaults.stocTitle = '<h6>' + defaults.tocTitleEn + '</h6>';

		// If the title string is empty don't put out the H-tages
		if (defaults.stocTitle == '<h6></h6>') {
			defaults.stocTitle = "";
		}

		// Need to identify if this is a HP or patient summary.  If it's a
		// patient summary we'll create KeyPoint boxes.
		// KeyPoint titles are H-tags with a type='keypoint' attribute
		if ($("h3[type='keypoint']").length + $("h4[type='keypoint']").length > 0) {
			var kp = 1;
		} else {
			var kp = 0;
		}


		return this.each(function() {
			//"cache" our target and search objects
			obj = $(this); //target
			src = $(options.search); //search

			// if container is not found.
			if (!src || 0 === src.length) {
				return;
			}

			//let's declare some variables. We need this var declaration to
			//create them as local variables (not global)
			var appHTML = "",
				tagNumber = 0,
				txt = "",
				id = "",
				beforeTxt = options.beforeText,
				afterTxt = options.afterText,
				previous = options.start,
				start = options.start,
				depth = options.depth,
				i = 0,
				srcTags = "h" + options.start,
				cacheHN = "";

			// Turn off the KeyPoint header (coming from the TOC box) (VE)
			if (kp == 1 && options.search != 'article')
				options.stocTitle = "";

			//which tags we will search
			while (depth > 1) {
				start++; //we will just get our start level and numbers higher than it
				srcTags = srcTags + ", h" + start;
				depth--; //since went one level up, our depth will go one level down
			}
			// if the target is not found
			var found = src.find(srcTags);
			if (!found || 0 === found.length) {
				return;
			}

			found.each(function() {
				//we will cache our current H element
				cacheHN = $(this);
				//if we are on h1, 2, 3...
				tagNumber = (cacheHN.get(0).tagName).substr(1);

				//sets the needed id to the element
				//if it doesn't have one, of course
				// --------------------------------------------------
				id = cacheHN.attr('id');
				if (id == "" || typeof id === "undefined") {
					id = "stoc_h" + tagNumber + "_" + i;
					cacheHN.attr('id', id);
				}
				//our current text
				// using html() instead of text() since there could be markup
				txt = cacheHN.html();

				// Suppressing certain headings from TOC
				// The KeyPoint headings are only displayed in the KeyPoint
				// boxes (section level TOC) but not in the document
				// level TOC.  That means we'll have to suppress the KP
				// headings when searching on the body or article level but
				// need to include them at the section level.
				// Note:
				//   The prototype is using a different section-level
				//   structure.  A top-level section acts like an article
				//   and the search needs to be adjusted.
				// --------------------------------------------------------
				if (options.search == 'body' || options.search == 'article') {
					hAttr = cacheHN.attr("type");
				} else {
					hAttr = '';
				}

				// There are certain headings that should never be included
				// in the TOC, i.e. Key Points, References, Nav Headings.
				// These are identified by a "do-not-show='toc'" attribute.
				// ---------------------------------------------------------
				var tocDNS = cacheHN.attr("do-not-show");

				//if (txt != 'References'
				//        && txt.substring(0, 14) != 'Key Points for'
				//        && txt.substring(0, 10) != 'Bibliograf'
				//        && txt.substring(0, 14) != 'Puntos importa'
				//        && hAttr != 'keypoint'
				//        && txt != 'Sections') {
				if (tocDNS != "toc") {
					switch (true) { //with switch(true) we can do
						//comparisons in each case
						case (tagNumber > previous): //it means that we went down
							//one level (e.g. from h2 to h3)
							appHTML = appHTML + "<" + options.listType + ">" + "<li>" + beforeTxt + "<a href=\"#link/" + id + "\">" + txt + "</a>";
							previous = tagNumber;
							break;
						case (tagNumber == previous): //it means that stay on the
							//same level (e.g. h3 and
							//stay on it)
							appHTML = appHTML + "</li>" + "<li>" + beforeTxt + "<a href=\"#link/" + id + "\">" + txt + "</a>";
							break;
						case (tagNumber < previous): //it means that we went up but
							//we don't know how much levels
							//(e.g. from h3 to h2)
							while (tagNumber != previous) {
								appHTML = appHTML + "</" + options.listType + ">" + "</li>";
								previous--;
							}
							appHTML = appHTML + "<li>" + beforeTxt + "<a href=\"#link/" + id + "\">" + txt + "</a>";
							break;
					}
				}
				i++;
			});
			//corrects our last item, because it may have some opened ul's
			while (tagNumber != options.start && tagNumber > 0) {
				appHTML = appHTML + "</" + options.listType + ">";
				tagNumber--;
			}

			// Clean up our Percussion workaround entry
			// We had to include text within the empty container div to prevent
			// Percussion from messing up the divs.  Setting text to blank now
			// ----------------------------------------------------------------
			//if ( $("div.#pdq-toc-article").length == 1
			//                         && $("div.keyPoints").length == 0 ) {
			//    $("div.#_toc_section").text("");
			//    }

			//append our html to our object
			appHTML = options.stocTitle + "<" + options.listType + ">" + appHTML + "</" + options.listType + ">";

			// In the special case when we encounter a patient summary that
			// does contain citations (citations are only contained in HP
			// summaries except for one CAM summary) we need to suppress
			// the display of the TOC header without list items.
			emptyHTML = options.stocTitle + "<" + options.listType + ">" + "</" + options.listType + ">";
			if (appHTML != emptyHTML) {
				var hideDocTOC = "";
				if (options.search == 'article') hideDocTOC = " hide";
				appHTML = "<nav class='on-this-page" + hideDocTOC + "'>" + appHTML + "</nav>"
				obj.append(appHTML);
			}

			// SMOOTH SCROLL ------------------------------------------------
			// our pretty smooth scrolling here
			// acctually I've just compressed the code so you guys will think
			// that I'm the man.
			// Source: http://css-tricks.com/snippets/jquery/smooth-scrolling/
			//        if (options.smoothScroll == 1) {
			//            $(window).load(function(){
			//                function filterPath(string){return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'')}var locationPath=filterPath(location.pathname);var scrollElem=scrollableElement('html','body');obj.find('a[href*=#]').each(function(){var thisPath=filterPath(this.pathname)||locationPath;if(locationPath==thisPath&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,'')){var $target=$(this.hash),target=this.hash;if(target){var targetOffset=$target.offset().top;$(this).click(function(event){event.preventDefault();$(scrollElem).animate({scrollTop:targetOffset},400,function(){location.hash=target})})}}});function scrollableElement(els){for(var i=0,argLength=arguments.length;i<argLength;i++){var el=arguments[i],$scrollElement=$(el);if($scrollElement.scrollTop()>0){return el}else{$scrollElement.scrollTop(1);var isScrollable=$scrollElement.scrollTop()>0;$scrollElement.scrollTop(0);if(isScrollable){return el}}}return[]}
			//            });
			//        }
		});
		//console.log("In stoc End");
	};



	// *** END Functions *** ****************************************

	//$('a').click(function () {
	//    console.log("Hier bin ich");
	//    this.focus();
	//    });

	// Creating the Section Nav in the pdq-toptoc DIV
	// All content within the article tag is used
	// ------------------------------------------------------------
	$("#pdq-toptoc").topToc({
		search: "article"
	});

	// Preparing the sections with the show/hide attributes
	// ------------------------------------------------------------
	$("#pdq-toptoc ul").showSection({});

	// Creating the previous/next navigation links
	// ------------------------------------------------------------
	$("div.summary-sections").previousNext({
		footer: "Prev/Next"
	});

	// Creating the Enlarge button for tables
	// --------------------------------------
	// $("table.expandable-container").supersizeme( );

	// // Showing the previous/next section when the link is clicked
	// // Also, setting the corresponding section nav item to selected.
	// // ------------------------------------------------------------
	// $("div.summary-sections > section > div.row a").click(function() {
	//     $(document).scrollTop(0);
	//     var which = $(this).parent("div").attr("class");
	//     console.log(which);
	//     // Next section link is clicked
	//     if ($(this).parent("div").hasClass("next-link")) {
	//        $("section.show").removeClass("show")
	//                         .addClass("hide")
	//                         .next("section")
	//                         .removeClass("hide")
	//                         .addClass("show");
	//        $("div#pdq-toptoc li.selected").removeClass("selected")
	//                                       .next("li")
	//                                       .addClass("selected");
	//     }
	//     // Previous section link is clicked
	//     else {
	//        $("section.show").removeClass("show")
	//                         .addClass("hide")
	//                         .prev("section")
	//                         .removeClass("hide")
	//                         .addClass("show");
	//        $("div#pdq-toptoc li.selected").removeClass("selected")
	//                                       .prev("li")
	//                                       .addClass("selected");
	//     };
	// }).stop();

	// Creating the TOC entries by calling the stoc function
	// -----------------------------------------------------------
	// First create the div container for the article TOC
	var tocArticle = "<div id='pdq-toc-article'></div>";
	$("div#pdq-toptoc").after(tocArticle);
	// Then insert the list
	// The default TOC header for the document level TOC is 'On this page:'
	$("#pdq-toc-article").stoc({
		search: "article",
		start: 2,
		depth: 3,
		tocTitleEn: "On this page",
		tocTitleEs: "En esta p&#225;gina"
	});

	// Secondly creating the TOC container for sections
	// Note: This will only be used for TOC, not if Keypoints exist for the
	//       section
	var tocSection = "<div></div>";
	$("section.pdq-sections").prepend(tocSection);
	$("section.pdq-sections").each(function() {
		var sectionId = $(this).attr("id");
		$(this).children("div").attr("id", "_toc" + sectionId);
	});

	// Creating all of the section level TOCs
	// ------------------------------------------------------------
	// Output created:
	//$("#_toc_section_4_1").stoc( { search: "#_4", start: 3, depth: 2,
	//                           tocTitleEn: "",
	//                           tocTitleEs: "" });
	$("div.summary-sections").children("section").each(function() {
		var sectionId = $(this).attr("id");
		var tocId = $(this).children("section.pdq-sections").attr("id");
		var hasKeyPoints = $(this).find("div.key-points");

		// Section-level TOC are not created if KeyPoints exist
		// Note: The default TOC header gets suppressed for
		//       section level TOC
		// ----------------------------------------------------
		if (hasKeyPoints.length === 0) {
			$("#_toc" + tocId).stoc({
				search: "#" + sectionId,
				start: 3,
				depth: 2,
				tocTitleEn: "",
				tocTitleEs: ""
			});
		}
	});

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
		//Handle a normal load.
		'': function() {
			//Just make sure that the state gets set to initialized because we are displaying something
			//Note, a request for the URL or URL# will enter this, but will not fire a onhashchange event.
			if (navigationState == 'UNINITIALIZED') {
				navigationState = "INITIALIZED"
			}
		}
	});

});
