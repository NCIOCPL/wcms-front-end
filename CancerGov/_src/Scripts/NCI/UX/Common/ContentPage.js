define(function(require) {

    var $ = require('jquery');
    require('Common/Enhancements/popup_functions');
	var NCI = require('Common/Enhancements/NCI');
	//var search = require('Modules/search/search.js');
	var exitDisclaimer = require('Common/Enhancements/exitDisclaimer');
	var backToTop = require('Modules/backToTop/backToTop');
	var NCIAccordion = require('Modules/accordion/accordion');
	var tableToggle = require('Modules/tableToggle/tableToggle');
	var flexVideo = require('Modules/videoPlayer/flexVideo');
	var formControls = require('Modules/forms/formControls');
	var tooltips = require('Modules/tooltips/referenceTooltip');
	var proactiveLiveHelp = require('Modules/liveHelpPopup').default;
	var sortablejs = require('Modules/sortableTables').default;


	//require('Modules/autocomplete/autocomplete');
	require('Common/Plugins/Enlarge');
	require('Plugins/jquery.nci.prevent_enter');
	//require('fork-placeholders.js');

	//DOM Ready event
	$(function() {

		/*** BEGIN dictionary toggle ***/
		(function() {
			var dictionaryToggle = function() {
				$("#utility-dropdown").slideToggle(0, function () {
					$("#utility-dictionary").toggleClass('active');
				});
			}
		})();
		/*** END dictionary togle ***/

		/*** BEGIN back-to-top ***/
		(function() {
			backToTop.init();
		})();
		/*** END back-to-top ***/

		/*** BEGIN mobile nav ("off-canvas flyout functionality") ***/
		(function() {
			// OCEPROJECT-3098 HACK to fix the Spanish mega menu on the Spanish homepage
			if(/^\/espanol\/?$/.test(location.pathname)) {
				$('#mega-nav .contains-current').removeClass('contains-current');
			}

			NCI.Nav.init();

			NCI.Search.init();
		})();
		/*** END mobile nav ***/

		/*** BEGIN Exit Disclaimer
		 * This script looks for URLs where the href points to websites not in the federal domain (.gov) and if it finds one, it appends an image to the link. The image itself links to the exit disclaimer page.
		 ***/
		(function() {
			exitDisclaimer.init();
		})();
		/*** END Exit Disclaimer ***/

		/*** BEGIN Page Options
		 * This functions the font resizer.
		 ***/
		 // MOVED TO NCI.PageOptions.FontResizer.js
     // moved to Modules > fontResizer > fontResizer.js
		(function() {
			NCI.PageOptions.init();
		})();
		/*** END Page Options **/

		/*** BEGIN table toggling
		 * This allows for toggling between tables.
		 * An example can be seen on grants-research-funding.shtml,
		 * as of the first commit with this code.
		 ***/
		(function() {
			// for each toggleable section...
			tableToggle.init();
		})();
		/*** END table toggling ***/

		/*** BEGIN video embedding
		 * This enables the embedding of YouTube videos and playlists as iframes.
		 ***/
		(function() {
			flexVideo.init();
		})();
		/*** END video embedding ***/

		/*** BEGIN form controls ***/
		(function() {
			formControls.init();
		})();
		/*** END form controls ***/

		/*** BEGIN accordionizer ***/
		(function() {
			NCIAccordion.makeAllAccordions();
		})();
		/*** END accordionizer ***/

		/*** BEGIN page outlining ***/
		(function() {
			// generate the page outline -- this is used for all page-/document-level navigation
			// set up outlines
			$('article').each(function() {
				var $this = $(this);

				// check if there already is a built outline for this article
				if ($this.data('nci-outline')) {
					return;
				}

				// otherwise, build and set the outline
				var outline = NCI.page.makeOutline(this);
				$this.data('nci-outline', outline);
			});

			if ($('article').length > 0) {
				NCI.buildOTP();
			}
		})();
		/*** END page outlining ***/

		/*** BEGIN HACK for Blog Series titles
		* TODO: remove when Blog Dynamic List Percussion template is updated
		* with class name for <h3> ***/
		(function() {
			$('div.blog-post').each(function () {
				if ($(this).find('a.comment-count').length < 1) {
					($(this).find('div.post-title h3').addClass('no-comments'))
				}
			});
		})();
		/*** END HACK for Blog Series titles ***/

		// reference tooltips
		(function () {
			tooltips.init();
		})();
		//END REFERENCE TOOL TIPS

		// initialize the prevent-enter enhancement
		(function () {
			$('[data-prevent-enter="true"]').NCI_prevent_enter();
		})();


		// Proactive Live Help for CTS
		(function () {
			proactiveLiveHelp();
		})();

		// Blue Ribbon Panel - Page Specific
    // removed on 6.7.17 by MTN require to NCI.Video.js, pages/fuctionality no longer used
		// require("Common/Enhancements/NCI.Video").init();

        // BEGIN Spanish Analytics tracking
        $('html[lang="es"]').find('a.news-govdelivery, a.blogRSS').on('click', function() {
            s.linkTrackVars = 'prop4,prop5';
            s.prop4 = 'GovDeliveryEsp';
            s.prop5 = 'www.cancer.gov' + location.pathname.toLowerCase();
            s.tl(this, 'o', 'GovDeliveryEsp');
        });
		// END Spanish Analytics Tracking
		
		
	});
	
	// BEGIN Table Resizing
	$(window).on('load', function () {
		//Table enlarging & scrollbar adding.
		//This marks all tables as scrollable, but only adds a shadow to the right side if it is scrolling.
		//Inspired by http://www.456bereastreet.com/archive/201309/responsive_scrollable_tables/
		(function () {
			$("#content table:not(.no-auto-enlarge)").overflowEnlarge();
		})();
		
		// IMPORTANT: sortabletables-js requires a specific DOM structure for the table it is added to
		// (consult https://github.com/BtheGit/sortable-js for more documentation). Because of this, it needs
		// to run AFTER the enlarge function above, which does some rewriting of the DOM to wrap a table in a figure 
		// element, among other things.

		// NOTE: The custom settings are handled in a local wrapper module
		(function () {
			sortablejs();
		}())
	});
	// END Table Resizing

});
