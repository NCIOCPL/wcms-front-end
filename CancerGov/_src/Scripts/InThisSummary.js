// (function($) {})  --> Default jQuery structure for functions
// Everything goes within '{}'
//
// Function to hide/display the individual sections based on the TOC
// element clicked
// -----------------------------------------------------------------
(function($) {
	$.fn.showSection = function( options ) {
		// Adding some default settings
		var settings = $.extend({
			text: "Default Text",
			color: null
		}, options);

		return this.each( function() {
			var linkLabel = "<span id='_link' class='enlarge-link'>" +
			                  settings.text +
			                "</span>";
			$(this).addClass("normal");

			$("#_linkXXX").unbind().click(function() {
				if ( $("#figure").hasClass("normal")) {
					$( this ).text("Collapse");
				}
				else {
					$( "#_spacer").detach();
					$( this ).text("Enlarge");
				}
			});

			// First hide all sections and the document level TOC
			$( "#accordion > section").addClass("hide");
			$( "#_toc_article").addClass("hide");
			// ... and then show the first section of the page
			$( "#accordion > section").first()
				.removeClass("hide")
				.addClass("show");
			// ... also add the class to the topToc for the selected item
			$( "#_toptoc > ul > li").first()
				.addClass("selected");

			// Define the work to be done when the list items in the
			// "Sections" TOC are being clicked.
			// -----------------------------------------------------
			$(".toptoc li").unbind().click(function() {
				// In case we're clicking the selected list item do nothing
				if ( $( this ).hasClass("selected")) {
					x = 'do_nothing';
				}
				// If the 'View Entire document is clicked show everything
				else if ( $( this ).hasClass("viewall")) {
					$( ".selected").removeClass("selected");
					$( this ).addClass("selected");
					$("section.hide").removeClass("hide")
						.addClass("show");
					// Also show the document level TOC
					$( "#_toc_article" ).removeClass("hide")
						.removeClass("_toc_article")
						.addClass("show");
					// ... and hide the section level TOC
					$( "section div.show" ).removeClass("show")
						.addClass("hide");
					$( "div.previous-next-links").addClass("hide")
						.removeClass("show-for-large-up");
				}
				// In the normal case we hide the open section and display
				// the new one based on the clicked item
				else {
					// Highlighting of the TOC elements
					$( ".selected").removeClass("selected");
					$( this ).addClass("selected");
					// Also hide the document level TOC
					$( "#_toc_article.show" ).removeClass("show")
						.addClass("hide");
					// ... and restore the document level TOC
					$( "section div.hide" ).removeClass("hide")
						.addClass("show");
					// ... also need to remove the Next/Prev links
					// between sections
					$( "div.previous-next-links").removeClass("hide")
						.addClass("show-for-large-up");

					// Display of SummarySections
					var jumpTo = $( this ).find("span").attr("show");
					$( "section.show").removeClass("show").addClass("hide");
					jumpTo = "_section" + jumpTo.substring(0, jumpTo.length - 4);
					openSection = "#" + jumpTo;
					window.location.hash = openSection;

					// This is a dirty hack, sorry!!!
					// I don't know the section ID for the section that
					// needs to be opened but I know the pattern.  I'm
					// looping over all section IDs and when I find the
					// one that has the same sequence number (number after
					// the last '_') as my list item I show that section
					//
					// Potential risk: I may have more than 50 sections
					// ---------------------------------------------------
					i = 1;
					while ( i < 50 ) {
						if ( $( openSection + "_" + i).hasClass("hide")  )   {
							openSection = openSection + "_" + i;
							$( openSection ).addClass("show");
							break;
						}
						i++;
					}

				}
			});
		});
	};

}(jQuery));
