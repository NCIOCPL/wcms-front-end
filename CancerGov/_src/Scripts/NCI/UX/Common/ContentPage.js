define(function(require) {

    var $ = require('jquery');
	var $script = require('scriptjs');
    require('Common/Enhancements/popup_functions');
	//require('scrolltofixed');
	var NCI = require('Common/Enhancements/NCI');
	//var search = require('Modules/search/search.js');
	var exitDisclaimer = require('Common/Enhancements/exitDisclaimer');
	var backToTop = require('Modules/backToTop/backToTop');
	var NCIAccordion = require('Modules/accordion/accordion');
	var tableToggle = require('Modules/tableToggle/tableToggle');
	var flexVideo = require('Modules/videoPlayer/flexVideo');
	var formControls = require('Modules/forms/formControls');
	var tooltips = require('Modules/tooltips/referenceTooltip');


	//require('Modules/autocomplete/autocomplete');
	require('Common/Plugins/Enlarge');
	require('Plugins/jquery.nci.prevent_enter');
	//require('fork-placeholders.js');


	$(document).ready(function() {

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
			var ProactiveLiveHelp = require("Modules/proactiveLiveHelp/proactiveLiveHelp");

			var ProactiveLiveHelpforCTS = new ProactiveLiveHelp();
			var ProactiveLiveHelpforColorectal = new ProactiveLiveHelp();

			//console.log(ProactiveLiveHelp);

			ProactiveLiveHelpforCTS.initialize({
				urls: [
					"/about-cancer/treatment/clinical-trials/search",
					"/about-cancer/treatment/clinical-trials/basic",
					"/about-cancer/treatment/clinical-trials/search/r",
					"/about-cancer/treatment/clinical-trials/search/v",
					"/about-cancer/treatment/clinical-trials/advanced-search",
					"/about-cancer/treatment/clinical-trials/search/results",
					"/about-cancer/treatment/clinical-trials/search/view",
					/^\/about-cancer\/treatment\/clinical-trials\/disease\/.*/,
					/^\/about-cancer\/treatment\/clinical-trials\/intervention\/.*/
				],
				popupID: 'ProactiveLiveHelpForCTSPrompt',
				popupTitle: "Questions about Clinical Trials?",
				optOutDurationDays: 30,
				popupDelaySeconds: 90
			});
			// END Clinical Trial Search Setup

			// Proactive Live Help for Colo-rectal Cancer Type Pages
			// END Date has passed. Turning off code.
			// ProactiveLiveHelpforColorectal.initialize({
			// 	urls: [
			// 		'/types/colorectal',
			// 		'/types/colorectal/patient/colon-treatment-pdq',
			// 		'/types/colorectal/patient/rectal-treatment-pdq',
			// 		'/types/colorectal/patient/colorectal-prevention-pdq',
			// 		'/types/colorectal/patient/colorectal-screening-pdq',
			// 		'/types/colorectal/hp',
			// 		'/types/colorectal/hp/colon-treatment-pdq',
			// 		'/types/colorectal/hp/rectal-treatment-pdq',
			// 		'/types/colorectal/hp/colorectal-prevention-pdq',
			// 		'/types/colorectal/hp/colorectal-genetics-pdq',
			// 		'/types/colorectal/hp/colorectal-screening-pdq',
			// 		'/types/colorectal/research',
			// 		'/types/colorectal/screening-fact-sheet',
			// 		'/types/colorectal/did-you-know-colorectal-cancer-screening-video',
			// 		'/types/colorectal/research/cetuximab-chemo-no-benefit',
			// 		'/types/colorectal/research/colonoscopy-reduces-deaths',
			// 		'/types/colorectal/research/eflornithine-sulindac',
			// 		'/types/colorectal/research/folfox-celecoxib',
			// 		'/types/colorectal/research/preop-treatment',
			// 		'/types/colorectal/research/screening-sigmoidoscopy',
			// 		'/types/colorectal/research/aspirin-reduces-risk',
			// 		'/types/colorectal/research/TAS-102-overall-survival',
			// 		'/types/colorectal/research/bevacizumab-severe-side-effects',
			// 		'/types/colorectal/research/virtual-colonoscopy-results-qa',
			// 		'/types/colorectal/research/polyp-fiber-prevention-qa',
			// 		'/about-cancer/treatment/drugs/colorectal'
			// 	],
			// 	popupID: 'PLH-colorectal',
			// 	popupTitle: 'Questions about Colorectal Cancer?',
			// 	optOutDurationDays: 14,
			// 	popupDelaySeconds: 30,
			// 	start:'03/01/2017',
			// 	endDate:'04/01/2017'
			// });
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
			$("#content table").overflowEnlarge();
		})();
	});
	// END Table Resizing

});
