// scrolling behavior
$(document).ready(function () {
	// prevent default scroll-to-anchor behavior; the proper position will be scroll to later
	setTimeout(function () {
		window.scrollTo(0, 0);
		var anchor = deepLink();
		NCI.scrollTo(anchor);
	}, 1);

	$(window).on('hashchange', function () {
		//setTimeout(function() {
		//	window.scrollTo(0, 0);
		var anchor = deepLink();
		NCI.scrollTo(anchor);
		//}, 1);
	});

	function deepLink() {
		var openSection = window.location.href.split("#")[1];
		var tocId,
			sectionId,
			anchor = "";

		// if no hash at all, then do nothing (e.g, "<url>")
		if (typeof openSection === "undefined") {
			return anchor;
		}

		// if hash points to a TOC section (e.g., "<url>#_section_118_1")
		else if (openSection.indexOf("section") > -1) {
			// get the section's "_NNN_toc" TOC ID (e.g., "_118_toc")
			tocId = openSection.substring(8) + "_toc";
			// get the corresponding section's "_section_NNN_I" section ID (e.g., "_section_118_1")
			sectionId = $("#" + tocId).closest('section').attr('id');
			// set the anchor to the section
			anchor = sectionId;

			// show the section
			showSection(tocId, sectionId);
		}
		// if hash points to specific page content (e.g., "<url>#_119")
		else {
			// get the jQuery object of the specific page content, for later scrolling
			anchor = openSection;
			var $anchor = $("#" + anchor);
			// get the parent section's "_section_NNN_I" section ID (e.g., "_section_118_1")
			sectionId = $($anchor).closest('#accordion > section').attr('id');
			// get the parent section's "_NNN_toc" TOC ID (e.g., "_118_toc")
			tocId = "_" + sectionId.split("_")[2] + "_toc";
			// show the section
			showSection(tocId, sectionId);
		}
		return anchor;
	}

	function showSection(tocId, sectionId) {
		/* Desktop */
		// show the section
		$("section.show").removeClass("show").addClass("hide");
		$("section#" + sectionId).removeClass("hide").addClass("show");

		// select the section
		$(".toptoc li.selected").removeClass("selected");
		$(".toptoc span[show=" + tocId + "]").closest("li").addClass("selected");

		/* Mobile */
		var $accordion = $('#accordion');
		// close other sections
		/* This isn't working!
		 * -Wade, 11/03/2014
		$accordion.accordion('option', 'active', 0);
		*/
		// show the section
		var accordionId = $("#" + sectionId).children('.ui-accordion-content').attr('id')
		if (typeof accordionId !== "undefined") {
			accordionId = accordionId.replace('ui-id-', '') - 1;
			$accordion.accordion('option', "active", accordionId);
		}
	}
});

// make previous/next links
$(document).ready(function () {
	var pageLang = document.documentElement.lang || 'en';
	var nextText = {
		'en': 'Next section',
		'es': 'Siguiente secci&oacute;n'
	};
	var prevText = {
		'en': 'Previous section',
		'es': 'Secci&oacute;n anteri&oacute;r'
	};
	$('#accordion > section').each(function (index, value) {
		// IDs of the previous and next h2 elements. This allows us to print anchors to the previous and next section
		var prev = $(this).prev("#accordion > section").children('h2');
		var next = $(this).next("#accordion > section").children('h2');
		var appendable = "";
		if ((prev.length !== 0) || (next.length !== 0)) {
			// start printing section links
			appendable += "<div class='row show-for-large-up previous-next-links collapse'>";

			appendable += "<div class='large-6 columns previous-link'>";
			if (prev.length !== 0) {
				var prevId = "_section" + prev.attr('id').substring(0, prev.attr('id').length - 4);
				// print previous section link
				appendable += "<a href='#" + prevId + "'>&lt; " + prevText[pageLang] + "</a><br /><em>" + prev.text() + "</em>";
			}
			appendable += "</div>";

			appendable += "<div class='large-6 columns next-link'>";
			if (next.length !== 0) {
				var nextId = "_section" + next.attr('id').substring(0, next.attr('id').length - 4);
				// print next section link
				appendable += "<a href='#" + nextId + "'>" + nextText[pageLang] + " &gt;</a><br /><em>" + next.text() + "</em>";
			}
			appendable += "</div>";

			appendable += "</div>";
		}
		$(this).append(appendable);
	});
});