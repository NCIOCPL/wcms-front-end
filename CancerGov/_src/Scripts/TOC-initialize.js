/* Kick off the Table of Content javascript */
$(function () {
	$(".on-this-page, #my-toc").stoc_v03({
		/* div ID to search on */
		search: "#accordion",
		/* only search one level of headings (h2, specified by 'start') */
		depth: 1,
		/* start at Heading level 2 */
		start: 2,
		/* title - On This Page */
		tocTitleEn: "<h2>On This Page</h2>"
	});
});

/* Either apply or destroy the section accordion that we only want on small/medium screens */

/* first, wrap the content for each accordion in a div to create each panel */
$('#accordion h2').each(function (index) {
	$(this).nextUntil('h2').wrapAll('<div class="clearfix"></div>');
});

/* on window load AND resize */
$(window).on('load resize', function () {
	/* determine window width */
	var width = window.innerWidth || $(window).width();

	/* If the width is less than or equal to 1024px (small/medium screens) */
	if (width <= 1024) {
		/* wrap all content following each h2 in a div so that it can be opened/closed with the jQuery UI accordion */

		/* ... build the accordion */
		$("#accordion").accordion({
			heightStyle: "content",
			header: "h2",
			collapsible: true,
			active: false,
			/* override default functionality of accordion that only allows for a single pane to be open
			 * source: http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once */
			beforeActivate: function (event, ui) {
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
				currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

				// Toggle the panel's icon
				currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e', isPanelSelected).toggleClass('ui-icon-triangle-1-s', !isPanelSelected);

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
				"header": "ui-icon-circle-plus-right-e",
				"headerSelected": "ui-icon-circle-minus-right-s"
			}
		});

		/* else, the window must be large */
	} else {
		/* destroy the accordion if it's already been initialized */
		if (typeof $("#accordion").data("ui-accordion") != "undefined") {
			$("#accordion").accordion("destroy");
		}
	}
});
