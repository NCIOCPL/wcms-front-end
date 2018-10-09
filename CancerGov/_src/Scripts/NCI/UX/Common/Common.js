define(function (require) {
	// Polyfills for older browsers
	require('./polyfills/custom_event');
	require('./polyfills/replaceWith');
	require('es6-promise/auto');
	require('core-js/fn/array/from');
	require('core-js/fn/array/find');
	require('core-js/fn/array/includes');
	require('core-js/fn/object/assign');
	require('core-js/fn/object/entries');
	require('core-js/fn/string/includes');
	require('core-js/fn/string/starts-with');

	var initializeCustomEventHandler = require('Modules/customEventHandler').default;
	initializeCustomEventHandler();

	require('Common/Enhancements/analytics');
	require('StyleSheets/nvcg.scss');

	var $ = require('jquery');
	require('Common/Enhancements/jQueryUIExtensions');
	require('Common/Enhancements/popup_functions');
	//require('Modules/autocomplete/autocomplete');
	require('Common/Plugins/Enlarge');
	require('Plugins/jquery.nci.prevent_enter');
	//require('fork-placeholders.js');

	var Page = require('Common/Enhancements/NCI.page');
	var search = require('Modules/search/search').default;
	var mobilemenu = require('Modules/nav/mobilemenu').default;
	var sectionmenu = require('Modules/nav/sectionmenu').default;
	var exitDisclaimer = require('Common/Enhancements/exitDisclaimer');
	var backToTop = require('Modules/backToTop/backToTop');
	var NCIAccordion = require('Modules/accordion/accordion');
	var tableToggle = require('Modules/tableToggle/tableToggle');
	var flexVideo = require('Modules/videoPlayer/flexVideo');
	var formControls = require('Modules/forms/formControls');
	var tooltips = require('Modules/tooltips/referenceTooltip');

	// Unfortunately AMD doesn't play nice with export default;
	var proactiveLiveHelp = require('Modules/liveHelpPopup').default;
	var sortablejs = require('Modules/sortableTables').default;
	var pageOptions = require('Modules/pageOptions').default;

	var SiteWideSearch = require('Common/Enhancements/sitewidesearch');
	var megaMenuModule = require('Modules/megamenu/megamenu');
	var headroomPlugin = require('Modules/headroom/headroom');
	var DeepLinkPatch = require('Modules/utility/deepLinkPatch');

	DeepLinkPatch.init();

	//DOM Ready event
	$(document).ready(function() {
		/*** BEGIN header component ***/
		megaMenuModule.init();

		headroomPlugin.init();

		// This initializes jQuery UI Autocomplete on the site-wide search widget.
		SiteWideSearch.init();

		/*** BEGIN dictionary toggle ***/
		// var dictionaryToggle = function () {
		// 	$("#utility-dropdown").slideToggle(0, function () {
		// 		$("#utility-dictionary").toggleClass('active');
		// 	});
		// }

		/*** BEGIN back-to-top ***/
		backToTop.init();

		/*** BEGIN mobile nav ("off-canvas flyout functionality") ***/

		// OCEPROJECT-3098 HACK to fix the Spanish mega menu on the Spanish homepage
		if (/^\/espanol\/?$/.test(location.pathname)) {
			$('#mega-nav .contains-current').removeClass('contains-current');
		}

		mobilemenu();

		sectionmenu();

		search.init();

		/*** END mobile nav ***/

		/*** BEGIN Exit Disclaimer
		 * This script looks for URLs where the href points to websites not in the federal domain (.gov) and if it finds one, it appends an image to the link. The image itself links to the exit disclaimer page.
		 ***/

		exitDisclaimer.init();

		/*** BEGIN Page Options */
		pageOptions();

		/*** END Page Options **/

		/*** BEGIN table toggling
		 * This allows for toggling between tables.
		 * An example can be seen on grants-research-funding.shtml,
		 * as of the first commit with this code.
		 ***/

		// for each toggleable section...
		tableToggle.init();

		/*** END table toggling ***/

		/*** BEGIN video embedding
		 * This enables the embedding of YouTube videos and playlists as iframes.
		 ***/
		flexVideo.init();

		/*** BEGIN form controls ***/
		formControls.init();

		/*** BEGIN accordionizer ***/
		NCIAccordion.makeAllAccordions();

		/*** BEGIN page outlining ***/
		// generate the page outline -- this is used for all page-/document-level navigation
		// set up outlines
		$('article').each(function () {
			var $this = $(this);

			// check if there already is a built outline for this article
			if ($this.data('nci-outline')) {
				return;
			}

			// otherwise, build and set the outline
			var outline = Page.makeOutline(this);
			$this.data('nci-outline', outline);
		});

		if ($('article').length > 0) {
			Page.buildOTP();
		}
		/*** END page outlining ***/

		/*** BEGIN HACK for Blog Series titles
		 * TODO: remove when Blog Dynamic List Percussion template is updated
		 * with class name for <h3> ***/

		$('div.blog-post').each(function () {
			if ($(this).find('a.comment-count').length < 1) {
				($(this).find('div.post-title h3').addClass('no-comments'))
			}
		});

		// reference tooltips
		tooltips.init();

		// initialize the prevent-enter enhancement
		$('[data-prevent-enter="true"]').NCI_prevent_enter();

		// Proactive Live Help for CTS
		proactiveLiveHelp();

	});// END: DOM Ready event

	$(window).on('load', function () {
		// BEGIN Table Resizing
		//Table enlarging & scrollbar adding.
		//This marks all tables as scrollable, but only adds a shadow to the right side if it is scrolling.
		//Inspired by http://www.456bereastreet.com/archive/201309/responsive_scrollable_tables/

		$("#content table:not(.no-auto-enlarge)").overflowEnlarge();

		// IMPORTANT: sortabletables-js requires a specific DOM structure for the table it is added to
		// (consult https://github.com/BtheGit/sortable-js for more documentation). Because of this, it needs
		// to run AFTER the enlarge function above, which does some rewriting of the DOM to wrap a table in a figure 
		// element, among other things.

		// NOTE: The custom settings are handled in a local wrapper module

		sortablejs();
	}); // END: Window Load Event
});