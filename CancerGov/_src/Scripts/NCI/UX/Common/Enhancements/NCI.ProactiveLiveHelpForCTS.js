define(function(require){
	
	var $ = require('jquery');

	
	var CTS_URLS = ["/grants-training/grants-process/mechanisms/grants"];

	var POPUP_DELAY_SECONDS = 5;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Chat Online";
	var POPUP_BODY = "\u003Cp\u003ENeed help? Would you like to speak to an NCI Information Specialist about finding a clinical trial?\u003C\/p\u003E\n\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\n\u003Cp id=\u0022cheat_button\u0022\u003E\n\t\u003Cimg src =\u0022https:\/\/livehelp.cancer.gov\/euf\/assets\/themes\/nci\/nci-img\/quit-smoking-button.gif\u0022 alt=\u0022Activate Chat\u0022\/ style=\u0022cursor:pointer\u0022\u003E\n\u003C\/p\u003E";
	var POPUP_WIDTH = 300;
	var POPUP_HEIGHT = 300;

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Initialization for the enhancement.
	function _initialize() {
		// Set up a delay for the "Do you want help?" popup.
		setTimeout(_displayPrompt, POPUP_DELAY_SECONDS * 1000);
	}

	var popupStatus = false;
	
	// Display a message prompting the user to choose whether they
	// would like to do a chat with a Live Help Specialist.
	function _displayPrompt() {
		// Scroll to top.
		$("html, body").animate({scrollTop: 0}, "slow");
		
		// Create the pop up.
		//$('body').append("<div id='" + POPUP_WINDOW_ID + "' class='proactive-live-help'><a class='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + POPUP_TITLE + "</h1><div id='popup-message-content'>" + POPUP_BODY + "</div></div><div class='proactive-live-help-background'></div>");
		//$('body').append("<div id='popup-message-window'><a id='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + POPUP_TITLE + "</h1><div id='popup-message-content'>" + POPUP_BODY + "</div></div><div id='popup-message-background'></div>");
		$('body').append("<div id='" + POPUP_WINDOW_ID + "'><a id='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + POPUP_TITLE + "</h1><div id='popup-message-content'>" + POPUP_BODY + "</div></div><div id='popup-message-background'></div>");
		
		// Attach click handler here.
		
		_centerPrompt(POPUP_WIDTH, POPUP_HEIGHT);
		_loadPrompt();
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
