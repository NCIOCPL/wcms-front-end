/**
 * This fie is deprecated.  Use NCI/Modules/proactiveLiveHelp instead.
 */

define(function(require){

	var $ = require('jquery');
	var CookieManager = require('js-cookie');
	var LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');
	var DateUtility = require('UX/Common/Enhancements/DateUtility');

	// List of pages where the proactive search is active.
	// These values MUST, MUST, MUST be lowercase.
	var CTS_URLS = [
		"/about-cancer/treatment/clinical-trials/search",
		// 'basic' included for initial development, can be removed once paths updated on all tiers
		"/about-cancer/treatment/clinical-trials/basic",
		"/about-cancer/treatment/clinical-trials/search/r",
		"/about-cancer/treatment/clinical-trials/search/v",
		"/about-cancer/treatment/clinical-trials/advanced-search",
		"/about-cancer/treatment/clinical-trials/search/results",
		"/about-cancer/treatment/clinical-trials/search/view"
	];

	var POPUP_DELAY_SECONDS = 90;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Questions about Clinical Trials?";
	var POPUP_MESSAGE = '<p>Chat with an Information Specialist who can help you.</p>';

	// Constants for opting out of the proactive prompt.
	var OPT_OUT_COOKIE_NAME = "pcs4cts-opt";
	var OPT_OUT_DURATION_DAYS = 30;

	// Constants for the pop-up timer.
	var TIMING_COOKIE_NAME = "pcs4cts";
	var TIMER_INTERVAL = 5; // seconds

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

	function _localToEasternTime(localDate) {
		var EDT_OFFSET = -4; // Daylight Savings time offset
		var EST_OFFSET = -5; // Standard time offset   		

		// First, convert local time to UTC
		var dateUTC = new Date(localDate.getUTCFullYear(),
						localDate.getUTCMonth(),
						localDate.getUTCDate(),
						localDate.getUTCHours(),
						localDate.getUTCMinutes(),
						localDate.getUTCSeconds());

		var easternTime = new Date(dateUTC.getTime());

		if (DateUtility.IsDaylightSavingsTime(localDate)) {
			// Adjust hours to EDT from UTC
			easternTime.setUTCHours(easternTime.getUTCHours() + EDT_OFFSET);
		}
		else {
			// Adjust hours to EST from UTC
			easternTime.setUTCHours(easternTime.getUTCHours() + EST_OFFSET);
		}

		return easternTime;
	}

	/*
		Live Help is only available between 8:00 AM and 11:00 PM US Eastern Time.
		Skip holidays. Skip weekends.
	*/
	function _liveHelpIsAvailable() {

		var isAvailable = false;

		var dateNow = new Date(); // Local time to user
		var dateEastern = _localToEasternTime(dateNow);
		if (_isBusinessHours(dateEastern)
			&& _dateIsWorkDay(dateEastern)
			&& !_isHoliday(dateEastern)) {
			isAvailable = true;
		}
		return isAvailable;
	}

	function _isBusinessHours(dateEastern) {

		var duringHours = false;
		var hour = dateEastern.getHours();

		if ((hour >= 9 && hour < 21))
			duringHours = true;

		return duringHours;
	}

	function _dateIsWorkDay(dateEastern) {
		var weekday = true;
		day = dateEastern.getDay();

		switch (day) {
			// Sunday
			case 0:
				weekday = false;
				break;

			case 1: // Monday
			case 2: // Tuesday
			case 3: // Wednesday
			case 4: // Thursday
			case 5: // Friday
				weekday = true;
				break;

			// Saturday
			case 6:
				weekday = false;
				break;
		}
		return weekday;
	}

	function _findObservedHoliday(holiday) {
		/*
		When a federal holiday falls on a Saturday, it is usually observed on the preceding Friday. 
		When the holiday falls on a Sunday, it is usually observed on the following Monday.
		*/

		var dayOfWeek = holiday.getDay();

		if (dayOfWeek == 6) {
			// Holiday fell on a Saturday, is observed on Friday
			holiday.setDate(holiday.getDate() - 1);
		}
		else if (dayOfWeek == 0) {
			// Holiday fell on a Sunday, is observed on Monday
			holiday.setDate(holiday.getDate() + 1)
		}

		return holiday;
	}

	function _isHoliday(dateEastern) {
		var THURSDAY = 4;
		var MONDAY = 1;

		date = dateEastern.getDate();
		day = dateEastern.getDay();
		month = dateEastern.getMonth(); // Months are zero-based. 0 = Jan | 11 = Dec.

		var holidayDate = new Date();
		holidayDate.setHours(0, 0, 0, 0);

		// New Years
		holidayDate.setDate(1);
		holidayDate.setMonth(0); // January
		var observedHoliday = _findObservedHoliday(holidayDate);
		if (month == observedHoliday.getMonth() && date == observedHoliday.getDate()) {
			return true; // New Year's Day
		}

		// Martin Luther King, Jr. Day
		// Falls on the 3rd Monday in January    
		holidayDate.setDate(1);
		holidayDate.setMonth(0); // January		
		// Find Monday.
		while (holidayDate.getDay() != MONDAY) {
			holidayDate.setDate(holidayDate.getDate() + 1);
		}
		// Add 2 weeks.
		holidayDate.setDate(holidayDate.getDate() + 14);
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // MLK Jr. day
		}

		// George Washington's birthday
		// Falls on the 3rd Monday in February    
		holidayDate.setDate(1);
		holidayDate.setMonth(1); // February		
		// Find Monday.
		while (holidayDate.getDay() != MONDAY) {
			holidayDate.setDate(holidayDate.getDate() + 1);
		}
		// Add 2 weeks.
		holidayDate.setDate(holidayDate.getDate() + 14);
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // George Washtington's birthday
		}

		// Memorial Day
		// Falls on the last Monday in May    
		holidayDate.setDate(1);
		holidayDate.setMonth(5); // June	
		// Find last day of May.
		holidayDate.setDate(holidayDate.getDate() - 1);
		while (holidayDate.getDay() != MONDAY) {
			holidayDate.setDate(holidayDate.getDate() - 1);
		}
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // Memorial Day
		}

		// Independence Day
		holidayDate.setDate(4);
		holidayDate.setMonth(6); // July
		var observedHoliday = _findObservedHoliday(holidayDate);
		if (month == observedHoliday.getMonth() && date == observedHoliday.getDate()) {
			return true; // Independence Day
		}

		// Labor Day
		// falls on the 1st Monday in September    
		holidayDate.setDate(1);
		holidayDate.setMonth(8); // September		
		// Find Monday.
		while (holidayDate.getDay() != MONDAY) {
			holidayDate.setDate(holidayDate.getDate() + 1);
		}
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // Labor Day
		}

		// Columbus Day
		// falls on the 2nd Monday in October    
		holidayDate.setDate(1);
		holidayDate.setMonth(9); // October		
		// Find Monday.
		while (holidayDate.getDay() != MONDAY) {
			holidayDate.setDate(holidayDate.getDate() + 1);
		}
		// Add 1 week.
		holidayDate.setDate(holidayDate.getDate() + 7);
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // Columbus Day
		}

		// Veteran's Day
		holidayDate.setDate(11);
		holidayDate.setMonth(10); // November
		var observedHoliday = _findObservedHoliday(holidayDate);
		if (month == observedHoliday.getMonth() && date == observedHoliday.getDate()) {
			return true; // Veteran's Day  
		}

		// Thanksgiving 
		// Falls on the 4th Thursday in November    
		holidayDate.setDate(1);
		holidayDate.setMonth(10);
		// Find Thursday.    
		while (holidayDate.getDay() != THURSDAY) {
			holidayDate.setDate(holidayDate.getDate() + 1);
		}
		// Add 3 weeks.
		holidayDate.setDate(holidayDate.getDate() + 21);
		if (month == holidayDate.getMonth() && date == holidayDate.getDate()) {
			return true; // Thanksgiving Day
		}

		// Christmas
		holidayDate.setDate(25);
		holidayDate.setMonth(11); // December
		var observedHoliday = _findObservedHoliday(holidayDate);
		if (month == observedHoliday.getMonth() && date == observedHoliday.getDate()) {
			return true; // Christmas   
		}
		return false;
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
