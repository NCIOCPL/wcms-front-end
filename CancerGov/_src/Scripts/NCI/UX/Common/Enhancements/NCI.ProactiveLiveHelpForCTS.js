define(function(require){
	
	var $ = require('jquery');
	var CookieManager = require('jscookie');  // js-cookie v2.1.2, from https://github.com/js-cookie/js-cookie

	// List of pages where the proactive search is active.
	// These values MUST, MUST, MUST be lowercase.
	var CTS_URLS = [
		"/about-cancer/treatment/clinical-trials/basic",
		"/about-cancer/treatment/clinical-trials/basic/results",
		"/about-cancer/treatment/clinical-trials/basic/view",
		"/about-cancer/treatment/clinical-trials/search",
		"/about-cancer/treatment/clinical-trials/search/results",
		"/about-cancer/treatment/clinical-trials/search/view"
	];

	// Which chat server should be used? Test or production.
	var HOST_SERVER="nci--tst.custhelp.com";

	var POPUP_DELAY_SECONDS = 30;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Need Help?";
	var POPUP_MESSAGE = "\u003Cp\u003EWould you like to speak to an NCI Information Specialist about finding a clinical trial?\u003C\/p\u003E";
	var PROMPT_WIDTH = 400;
	var PROMPT_HEIGHT = 200;
	
	var OPT_OUT_COOKIE_NAME = "pcs4cts-opt";
	var TIMING_COOKIE_NAME = "pcs4cts";
	var TIMER_INTERVAL = 10; // seconds

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Initialization for the enhancement.
	function _initialize() {
//		// Set up a countdown for the "Do you want help?" popup.
//		CookieManager.set(TIMING_COOKIE_NAME, 'Everybod dance!');
//		setTimeout(_setupPrompt, POPUP_DELAY_SECONDS * 1000);

		if(_isACtsPage(location.pathname)) {
			// Set up a countdown for the "Do you want help?" popup.
			_initializeCountdownTimer();
		} else {
			// If we're not on a CTS page, clear the timer if it exists.
			CookieManager.remove(TIMING_COOKIE_NAME);
		}

	}
	
	var popupStatus = false;
	
	// Display a message prompting the user to choose whether they
	// would like to do a chat with a Live Help Specialist.
	function _setupPrompt() {
		// Scroll to top.
		//$("html, body").animate({scrollTop: 0}, "slow");

		var popupBody = POPUP_MESSAGE
			// <form onsubmit="return false;">
			+ "\u003Cform onsubmit=\u0022return false;\u0022\u003E"
			//<div>
			+ "\u003Cdiv\u003E"
			//<input id="chat-button" type="image"  class="chat-buttons" name="cancer-info" src="/euf/assets/themes/nci/nci-img/quit-smoking-button.gif" title="Cancer Information" alt="Smoking Cessation Assistance"></input>
			+ "\u003Cp id=\u0022rn_nciChatLaunchButton_4_Button\u0022\u003E\n\t\u003Cinput id=\u0022chat-button\u0022 type=\u0022button\u0022 name=\u0022rn_nciChatLaunchButton_4_Button\u0022 class=\u0022chat-buttons\u0022 value=\u0022Chat Now\u0022 \u003E\n\u003C\/p\u003E"
			// </div></form>
			+ "\u003C/div\u003E\u003C/form\u003E";
		
		// Create the pop up.
		$('body').append("<div id='" + POPUP_WINDOW_ID + "' class='ProactiveLiveHelpPrompt'><a class='close'>X</a><br /><h2 class='title'>" + POPUP_TITLE + "</h2><div id='popup-message-content'>" + popupBody + "</div></div>");
		
		$("#chat-button").click(function(){
			window.open("https://nci--tst.custhelp.com/app/chat/chat_landing?_icf_22=92", "ProactiveLiveHelpForCTS", "height=600,width=633");
			_dismissPrompt();
		});
		
		// Center and display the pop up.
		_centerPrompt(PROMPT_WIDTH, PROMPT_HEIGHT);
		_displayPrompt();
		
		// Set up event handlers for the various ways to close the pop up
		$(".ProactiveLiveHelpPrompt .close").click(function() { _dismissPrompt(); });
		$(document).keypress(function(e) {if( e.keyCode == 27 && popupStatus == true) _dismissPrompt();});
	}
	
	function _centerPrompt(width, height) {
		// Request data for centering.
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupElementID = "#" + POPUP_WINDOW_ID;

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
			"width" : popupWidth + "px",
			"height" : popupHeight + "px",
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});

	}

	function _displayPrompt() {
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

	var _countdownIntervalID;
	
	function _initializeCountdownTimer(){
		
		// If the timer cookie doesn't exist, create it.
		if(!CookieManager.get(TIMING_COOKIE_NAME)){
			CookieManager.set(TIMING_COOKIE_NAME, POPUP_DELAY_SECONDS);
			console.log('tick: ' + POPUP_DELAY_SECONDS);
		}
		
		_countdownIntervalID = window.setInterval(_decrementCountdownTimer, TIMER_INTERVAL * 1000);
	}
	
	function _decrementCountdownTimer(){
		var timeleft = CookieManager.get(TIMING_COOKIE_NAME);
		if(timeleft) {
			timeleft -= TIMER_INTERVAL;
			console.log('tick: ' + timeleft);
			
			// If the timer hasn't run out yet, keep ticking.
			if(timeleft > 0) {
				CookieManager.set(TIMING_COOKIE_NAME, timeleft);
			} else {
				// Otherwise, clear the interval timer and diplay the prompt.
				window.clearInterval(_countdownIntervalID);
				console.log("Party Time!");
			}
		}
	}
	
	// Checks whether the specified url is part of the Clnical Trial Search set.
	function _isACtsPage(url){
		var matchFound = false;
		var itemCount = CTS_URLS.length;
		
		// so we don't have to worry about casing.
		url = url.toLowerCase();
		for(var i = 0; i < itemCount; ++i) {
			if(url ===  CTS_URLS[i]){
				matchFound = true;
				break;
			}
		}
		
		return matchFound;
	}
	
	/* Flag for telling whether this enhancement has been initialized. */
	var initialized = false;
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			_initialize();

			initialized = true;
		}
	};
});
