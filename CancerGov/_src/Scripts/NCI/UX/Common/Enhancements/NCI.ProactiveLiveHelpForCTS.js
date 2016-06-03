define(function(require){
	
	var $ = require('jquery');

	// Load the set of scripts needed by the chat pop-up.
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/yahoo-dom-event/yahoo-dom-event.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/connection/connection-min.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/animation/animation-min.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/container/container-min.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/history/history-min.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/json/json-min.js');
	//require('https://livehelp.cancer.gov/rnt/rnw/yui_2.7/element/element-min.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Ajax.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Text.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.UI.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.UI.AbuseDetection.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Url.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Event.js');
	//require('https://livehelp.cancer.gov/euf/rightnow/debug-js/TreeViewAriaPlugin.js');
	//require('https://livehelp.cancer.gov/cgi-bin/nci.cfg/php/euf/application/development/source/widgets/custom/chat/nciChatLaunchButton/logic.js');
	
	
	var CTS_URLS = ["/grants-training/grants-process/mechanisms/grants"];

	var POPUP_DELAY_SECONDS = 5;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Chat Online";
	var POPUP_MESSAGE = "\u003Cp\u003ENeed help? Would you like to speak to an NCI Information Specialist about finding a clinical trial?\u003C\/p\u003E";
	var POPUP_WIDTH = 300;
	var POPUP_HEIGHT = 300;

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Initialization for the enhancement.
	function _initialize() {
		// Set up a delay for the "Do you want help?" popup.
		setTimeout(_setupPrompt, POPUP_DELAY_SECONDS * 1000);
	}

	var popupStatus = false;
	
	// Display a message prompting the user to choose whether they
	// would like to do a chat with a Live Help Specialist.
	function _setupPrompt() {
		// Scroll to top.
		$("html, body").animate({scrollTop: 0}, "slow");

		var popupBody = POPUP_MESSAGE + "\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\n\u003Cp id=\u0022chat_button\u0022\u003E\n\t\u003Cinput type=\u0022button\u0022 name=\u0022chat-button\u0022 class=\u0022chat-buttons\u0022 value=\u0022Chat Now\u0022 \u003E\n\u003C\/p\u003E";
		
		// Create the pop up.
		$('body').append("<div id='" + POPUP_WINDOW_ID + "'><a id='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + POPUP_TITLE + "</h1><div id='popup-message-content'>" + popupBody + "</div></div><div id='popup-message-background'></div>");
		
		// Attach click handler here.
		
		// Center and display the pop up.
		_centerPrompt(POPUP_WIDTH, POPUP_HEIGHT);
		_loadPrompt();
		
		// Set up event handlers for the various ways to close the pop up
		$("#popup-message-close").click(function() { _dismissPrompt(); });
		$("#popup-message-background").click(function() { _dismissPrompt(); });
		$(document).keypress(function(e) { if( e.keyCode == 27 && popupStatus == true) _dismissPrompt(); });
	}
	
	function _centerPrompt(width, height) {
		// Request data for centering.
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupElementID = "#" + POPUP_WINDOW_ID

		var popupWidth = 0;
		if (typeof width == "undefined") {
			popupWidth = $(popupElementID).width();
		} else {
			popupWidth = width;
		}
		var popupHeight = 0;
		if (typeof height == "undefined") {
			popupHeight = $(popupElementID).height();
		} else {
			popupHeight = height;
		}

		// Centering.
		jQuery(popupElementID).css({
			"position": "absolute",
			"width" : popupWidth + "px",
			"height" : popupHeight + "px",
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});

	}

	function _loadPrompt() {
		// Loads popup only if it is disabled.
		if (popupStatus === false) {
			jQuery("#popup-message-background").css({"opacity": "0.7"});
			jQuery("#popup-message-background").fadeIn("slow");
			jQuery("#" + POPUP_WINDOW_ID).fadeIn("slow");
			popupStatus = true;
		}
	}

	function _dismissPrompt() {
		if(popupStatus === true) {
			jQuery("#popup-message-background").fadeOut("slow");
			jQuery("#" + POPUP_WINDOW_ID).fadeOut("slow");
			jQuery('#popup-message-content').empty().remove();
			popupStatus = false;
		}
	}
	
	/* Flag for telling whether this enhancement has been initialized. */
	var initialized = false;

	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			if(CTS_URLS.find(function(url){return url === location.pathname.toLowerCase();})) {
				_initialize();

				initialized = true;
			}
		}
	};
});
