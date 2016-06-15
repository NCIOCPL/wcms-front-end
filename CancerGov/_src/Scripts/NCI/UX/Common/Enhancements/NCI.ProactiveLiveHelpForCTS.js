define(function(require){
	
	var $ = require('jquery');
	var CookieManager = require('js-cookie');
	var LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');

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

	var POPUP_DELAY_SECONDS = 180;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Need help?";
	var POPUP_MESSAGE = '<p>Speak to an NCI Information Specialist about a clinical trial</p>';
	var PROMPT_WIDTH = 400;
	var PROMPT_HEIGHT = 200;
	
	// Constants for opting out of the proactive prompt.
	var OPT_OUT_COOKIE_NAME = "pcs4cts-opt";
	var OPT_OUT_DURATION_DAYS = 30;

	// Constants for the pop-up timer.
	var TIMING_COOKIE_NAME = "pcs4cts";
	var TIMER_INTERVAL = 10; // seconds

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Track activity to prevent displaying the prompt while the user
	// is interacting with another UI element.
	
	var INTERACTION_DELAY_SECONDS = 10;	// Minimum number of seconds to wait after a user
										// interaction before displaying the prompt.
	var _userActivity = {
		lastActivityTime : 0,	// Time of the last keypress.
		activeElement : null	// Last element being interacted with.
	}
	
	
	// Initialization for the enhancement.
	function _initialize() {

		if(_isACtsPage(location.pathname) && !_userIsOptedOut() && _liveHelpIsAvailable()){
			_initializeActivityCheck();
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
		// Before displaying, check whether the user has recently interacted with the UI.
		// If this fires on page load (i.e. the timer has already expired), then the last
		// interaction time is 1/1/1970.
		if(_getSecondsSinceLastInteraction() < INTERACTION_DELAY_SECONDS){
			window.setTimeout(_displayPrompt, 1000); // Retry in a second.
			return;
		}

		var popupBody = POPUP_MESSAGE
			+ '<form onsubmit="return false;">'
			+ '<input id="chat-button" type="button" name="rn_nciChatLaunchButton_4_Button" class="chat-button" value="Chat Now">'
			+ '</form>'
			+ '<div class="live-help"</div>';
		
		// Create the pop up.
		$('body').append('<div id="' + POPUP_WINDOW_ID + '" class="ProactiveLiveHelpPrompt"><a class="close">X</a><h2 class="title">' + POPUP_TITLE + '</h2><div class="content">' + popupBody + '</div></div>');
		
		$("#chat-button").click(function(){
			LiveChat.openChatWindow();
			_dismissPrompt();
		});
		
		// Center and display the pop up.
		_makePromptVisible();
		
		// Set up event handlers for the various ways to close the pop up
		$(".ProactiveLiveHelpPrompt .close").click(function() { _dismissPrompt(); });
		$(document).keypress(function(e) {if( e.keyCode == 27 && popupStatus == true) _dismissPrompt();});
		
		// Hook up analytics for the dynamically created elements.
		_activatePromptAnalytics();
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
			
			// If possible, return focus to the last-known UI element.
			if(!!_userActivity.activeElement)
				_userActivity.activeElement.focus();
		}
	}
	
	function _userIsOptedOut() {
		var optedOut = !!CookieManager.get(OPT_OUT_COOKIE_NAME);
		return optedOut;
	}
	
	function _setUserToOptedOut() {
		CookieManager.set(OPT_OUT_COOKIE_NAME, 'true', { expires: OPT_OUT_DURATION_DAYS });
	}


	function _activatePromptAnalytics(){
		// Record prompt activation.
		if(NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptDisplay)
			NCIAnalytics.RecordProactiveChatPromptDisplay($(".ProactiveLiveHelpPrompt"));


		// Set up analytics handler for "Chat Now" button.
		var button = $(".ProactiveLiveHelpPrompt .chat-button");
		if(!!button) {
			button.click(function(){
				if(NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptClick)
					NCIAnalytics.RecordProactiveChatPromptClick(this);
			});
		}

		// Set up analytics for dismissal button.
		button = $(".ProactiveLiveHelpPrompt .close");
		if(!!button) {
			button.click(function(){
				if(NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptDismissal)
					NCIAnalytics.RecordProactiveChatPromptDismissal(this);
			});
		}
	}



	var _countdownIntervalID;
	
	function _initializeCountdownTimer(){
		
		// If the timer cookie doesn't exist, create it.
		if(!CookieManager.get(TIMING_COOKIE_NAME)){
			CookieManager.set(TIMING_COOKIE_NAME, POPUP_DELAY_SECONDS);
		}

		// Set the time before checking whether to display the prompt to the less
		// of either the TIMER_INTERVAL, or the existing time left on the timer.
		var timeleft = _getCountdownTimeRemaining();
		var tick = (( timeleft >= TIMER_INTERVAL ) ? TIMER_INTERVAL : timeleft) * 1000;
		_countdownIntervalID = window.setInterval(_decrementCountdownTimer, tick);
	}
	
	function _decrementCountdownTimer(){
		var timeleft = _getCountdownTimeRemaining();
		timeleft -= TIMER_INTERVAL;
		CookieManager.set(TIMING_COOKIE_NAME, timeleft);
		
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
	
	/*
		Live Help is only available between 8:00 AM and 11:00 PM US Eastern Time.
		This (currently) translates as later than 1200 UTC or less than 0300 UTC.
		Skip holidays. Skip weekends.
		
		(This is obviously a huge kludge. Ideally, we can get a simple yes/no from the
		 live help server.)
	*/
	function _liveHelpIsAvailable(){
		return true;
		var isOpen = false;
		
		var dateNow = new Date();
		
		if( _isBusinessHours(dateNow)
			&& _dateIsNotTheWeekend(dateNow)
			&& _dateIsNotAHoliday(dateNow)){
			isOpen = true;
		}
		return isOpen;
	}

	function _isBusinessHours(theDate){
		var duringHours = false;
		var utcHour = theDate.getUTCHours();
		// EDT 0800 == UTC 1200
		// EDT 2300 == UTC 0300 (a day later, but that's a different check)
		if(( utcHour >= 12 || utcHour <	 3 ))
			duringHours = true;
		return duringHours;
	}

	function _dateIsNotTheWeekend(theDate){
		/*
			So here's the crazy bit.  On UTC time, from 0000-0400, the date on the
			US East Coast is one day earlier.

			                    11111111112222|          111111111122222            11
			UTC TIME 01234|5678901234567890123|01234|5678901234567890123|01234|5678901
			UTC     |    Saturday             |    Sunday               |   Monday
			EDT  Fri      |     Saturday            |         Sunday          |  Mon
			
			So we have have to handle these cases:
			Case 1: Day is Saturday and the time is before 0400 - NOT Weekend
			Case 2: Day is Saturday and the time is 0400 or later - Weekend
			Case 3: Day is Sunday - Weekend
			Case 4: Day is Monday and the time is before 0400 - Weekend
			Case 5: Day is Monday and the time ias 0400 or later - NOT Weekend
			Case 6: Any other day - NOT Weekend
		*/

		var weekday = true;
		hour = theDate.getUTCHours();
		day = theDate.getUTCDay();
		
		switch(day) {
			// Sunday
			case 0:
				weekday = false;
				break;
			
			// Monday
			case 1: 
				if(hour < 4) // Still Sunday UDT
					weekday = false;
				else
					weekday = true;
				break;
				
			case 2: // Tuesday
			case 3: // Wednesday
			case 4: // Thursday
			case 5: // Friday
				weekday = true;
				break;

			// Saturday
			case 6:
				if(hour < 4) // Still Friay UDT
					weekday = true;
				else
					weekday = false;
				break;
		}

		return weekday;
	}
	
	function _dateIsNotAHoliday(theDate){
		
		var nonHoliday = true;
		
		/*
			So here's the crazy bit.  On UTC time, from 0000-0400, the date on the
			US East Coast is one day earlier.
			
			UTC    12222            11111111112222|          1111111111222
			TIME   90123|01234|5678901234567890123|01234|56789012345678901
			UTC    Jul 3|          July 4         |    July 5
			EDT     July 3    |         July 4          |       July 5

			Indepdence Day and Labor Day are both on Mondays, so the day before
			is a Sunday and Live Help is closed (handled by the weekend check).
			But at Midnight UTC, it's still the holiday on the US East coast
			
			So we have to check two cases:
			Case 1: 0400 and later, compare to the US holiday date.
			Case 2: 0359 and earlier, comapre to the day after the holiday.
		*/

		hour = theDate.getUTCHours();
		day = theDate.getUTCDate();
		month = theDate.getUTCMonth() + 1; // Months are zero-based. Add one for readability.
		
		if(hour >= 4 ){  // 0400 (midnight EDT) and later.
			if( month == 7 && day == 4) nonHoliday = false; // Independence Day
			if( month == 9 && day == 5) nonHoliday = false; // Labor Day
		} else { // 0359 and earlier (midnight EDT)
			if( month == 7 && day == 5) nonHoliday = false; // Independence Day
			if( month == 9 && day == 6) nonHoliday = false; // Labor Day
		}

		return nonHoliday;
	}
	
	// Check for keyboard activity in order to avoid displaying the prompt while
	// the user is interacting with an existing UI element.
	function _initializeActivityCheck() {
		$(document).keypress(function(e){_recordUserInteraction(e);}); // keystroke.
		$(document).click(function(e){_recordUserInteraction(e);}); // Mouse click
	}
	
	
	function _recordUserInteraction(event) {
		// Date.now() is not supported by IE before version 9.
		_userActivity.lastActivityTime =  new Date().getTime();
		_userActivity.activeElement = document.activeElement;
	}
	
	function _getSecondsSinceLastInteraction() {
		var now = new Date().getTime(); // Time in milliseconds
		var elapsed = now - _userActivity.lastActivityTime;
		return Math.floor(elapsed / 1000);
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
