define(function(require){
	
	var $ = require('jquery');
	var CookieManager = require('js-cookie');

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
	var POPUP_MESSAGE = '<p>Would you like to speak to an NCI Information Specialist about finding a clinical trial?</p>';
	var PROMPT_WIDTH = 400;
	var PROMPT_HEIGHT = 200;
	
	// Constants for opting out of the proactive prompt.
	var OPT_OUT_COOKIE_NAME = "pcs4cts-opt";
	var OPT_OUT_DURATION_DAYS = 30;

	// Constants for the pop-up timer.
	var TIMING_COOKIE_NAME = "pcs4cts";
	var TIMER_INTERVAL = 10; // seconds

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Initialization for the enhancement.
	function _initialize() {
		if(_isACtsPage(location.pathname) && !_userIsOptedOut()) {
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
	function _displayPrompt() {
		// Scroll to top.
		//$("html, body").animate({scrollTop: 0}, "slow");

		var popupBody = POPUP_MESSAGE
			+ '<form onsubmit="return false;">'
			+ '<input id="chat-button" type="button" name="rn_nciChatLaunchButton_4_Button" class="chat-buttons" value="Chat Now">'
			+ '</form>';
		
		// Create the pop up.
		$('body').append('<div id="' + POPUP_WINDOW_ID + '" class="ProactiveLiveHelpPrompt"><a class="close">X</a><img src="/publishedcontent/images/images/design-elements/css/proactive-chat-woman.jpg" alt="woman with headset" /><h2 class="title">' + POPUP_TITLE + '</h2><div id="popup-message-content">' + popupBody + '</div></div>');
		
		$("#chat-button").click(function(){
			window.open("https://nci--tst.custhelp.com/app/chat/chat_landing?_icf_22=92", "ProactiveLiveHelpForCTS", "height=600,width=633");
			_dismissPrompt();
		});
		
		// Center and display the pop up.
		_makePromptVisible();
		
		// Set up event handlers for the various ways to close the pop up
		$(".ProactiveLiveHelpPrompt .close").click(function() { _dismissPrompt(); });
		$(document).keypress(function(e) {if( e.keyCode == 27 && popupStatus == true) _dismissPrompt();});
	}

	function _makePromptVisible() {
		// Loads popup only if it is disabled.
		if (popupStatus === false) {
			$("#" + POPUP_WINDOW_ID).hide().fadeIn("slow");
			popupStatus = true;
		}
	}

	function _dismissPrompt() {
		if(popupStatus === true) {
			//$("#popup-message-background").fadeOut("slow");
			$("#" + POPUP_WINDOW_ID).fadeOut("slow");
			$('#popup-message-content').empty().remove();
			popupStatus = false;
			
			// In any event where the prompt is being dismissed, opt the user
			// out of seeing the pop-up again.
			_setUserToOptedOut();
		}
	}
	
	function _userIsOptedOut() {
		var optedOut = !!CookieManager.get(OPT_OUT_COOKIE_NAME);
		console.log("User is opted out: " + optedOut);
		return optedOut;
	}
	
	function _setUserToOptedOut() {
		CookieManager.set(OPT_OUT_COOKIE_NAME, 'true', { expires: OPT_OUT_DURATION_DAYS });
	}

	var _countdownIntervalID;
	
	function _initializeCountdownTimer(){
		
		// If the timer cookie doesn't exist, create it.
		if(!CookieManager.get(TIMING_COOKIE_NAME)){
			CookieManager.set(TIMING_COOKIE_NAME, POPUP_DELAY_SECONDS);
			console.log('tick: ' + POPUP_DELAY_SECONDS);
		}

		// Set the time before checking whether to display the prompt to the less
		// of either the TIMER_INTERVAL, or the existing time left on the timer.
		var timeleft = _getCountdownTimeRemaining();
		var tick = (( timeleft >= TIMER_INTERVAL ) ? TIMER_INTERVAL : timeleft) * 1000;
		console.log("Milliseconds remaining: " + tick);
		_countdownIntervalID = window.setInterval(_decrementCountdownTimer, tick);
	}
	
	function _decrementCountdownTimer(){
		var timeleft = _getCountdownTimeRemaining();
		timeleft -= TIMER_INTERVAL;
		CookieManager.set(TIMING_COOKIE_NAME, timeleft);
		console.log('tick: ' + timeleft);
		
		// If the timer hasn't run out yet, keep ticking.
		if(timeleft <= 0) {
			// Otherwise, clear the interval timer and diplay the prompt.
			window.clearInterval(_countdownIntervalID);
			_displayPrompt();
		}
	}
	
	// Get the amount of time left on the countdown timer. If the
	// timer hasn't been set, return POPUP_DELAY_SECONDS. Guarantee a
	// minimum of zero seconds.
	function _getCountdownTimeRemaining(){
		var timeleft = CookieManager.get(TIMING_COOKIE_NAME);
		if(!timeleft)
			timeleft = POPUP_DELAY_SECONDS;
		timeleft = Number(timeleft);
		if(timeleft < 0)
			timeleft = 0;
		return timeleft;
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
