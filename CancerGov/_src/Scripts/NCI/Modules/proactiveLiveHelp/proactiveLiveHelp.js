define(function(require){

    var $ = require('jquery');
    var CookieManager = require('js-cookie');
    var LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');
    var DateUtility = require('Modules/utility/dateUtility');


    var PLH = function(settings) {
        this.defaultOptions = {
            // List of pages where the proactive search is active.
            // These values MUST, MUST, MUST be lowercase.
            urls: [
                // must specify at least one url
            ],
            popupDelaySeconds: 90, // Number of seconds to delay before displaying the popup.
            popupID: "ProactiveLiveHelp", // Pop up window element's ID.
            popupTitle: "Questions about this page?", // Title text within popup
            popupMessage: '<p>Chat with an Information Specialist who can help you.</p>', //body text within popup
            optOutDurationDays: 5,
            timerIntervalSeconds: 5,
            interactionDelaySeconds: 10,	// Minimum number of seconds to wait after a user interaction before displaying the prompt.
            startDate: new Date(0), // default start data is 1/1/1970
            endDate: null
        };

        // internal settings
        this.userActivity = {
            lastActivityTime : 0,	// Time of the last keypress.
            activeElement : null	// Last element being interacted with.
        };
        this.popupStatus = false;
        this.countdownIntervalID = "";
    };


    // Initialization for the enhancement.
    PLH.prototype = {
        initialize: function (settings) {

            this.options = $.extend({}, this.defaultOptions, settings);

            if (isALiveHelpPage(this.options.urls) && !this.userIsOptedOut() && liveHelpIsAvailable() && _isPastDate(this.options.startDate) && !_isPastDate(this.options.endDate)) {
                this.initializeActivityCheck();
                this.initializeCountdownTimer();
            }
            else {
                // If we're not on a page listed within the options.urls, clear the timer if it exists.
                CookieManager.remove(this.options.popupID + '-timer');
            }
        },

        // Display a message prompting the user to choose whether they
        // would like to do a chat with a Live Help Specialist.
        displayPrompt: function () {
            // Before displaying, check whether the user has recently interacted with the UI.
            // If this fires on page load (i.e. the timer has already expired), then the last
            // interaction time is 1/1/1970.

            var self = this;

            if(this.getSecondsSinceLastInteraction() < this.options.interactionDelaySeconds){
                window.setTimeout(self.displayPrompt, 1000); // Retry in a second.
                return;
            }

            var popupBody = this.options.popupMessage
                + '<form onsubmit="return false;">'
                + '<input id="chat-button" type="button" name="rn_nciChatLaunchButton_4_Button" class="chat-button" value="Chat Now">'
                + '</form>'
                + '<div class="live-help"></div>';

            // Create the pop up.
            $('body').append('<div id="' + this.options.popupID + '" class="ProactiveLiveHelpPrompt"><a class="close">X</a><h2 class="title">' + this.options.popupTitle + '</h2><div class="content">' + popupBody + '</div></div>');

            $("#chat-button").on('click.PLH', function () {
                LiveChat.openChatWindow();
                self.dismissPrompt();
            });

            // Center and display the pop up.
            this.makePromptVisible();

            // Set up event handlers for the various ways to close the pop up
            $(".ProactiveLiveHelpPrompt .close").on('click.PLH', function () {

                self.dismissPrompt();
            });
            $(document).keypress(function (e) {
                if (e.keyCode == 27 && this.popupStatus == true) self.dismissPrompt();
            });

            // Hook up analytics for the dynamically created elements.
            activatePromptAnalytics();
        },

        makePromptVisible: function () {
            // Loads popup only if it is disabled.
            if (this.popupStatus === false) {
                $("#" + this.options.popupID).hide().fadeIn("slow");
                this.popupStatus = true;
            }
        },
        dismissPrompt: function () {
            if (this.popupStatus === true) {
                //$("#popup-message-background").fadeOut("slow");
                $("#" + this.options.popupID).fadeOut("slow");
                $('#popup-message-content').empty().remove();
                this.popupStatus = false;

                // In any event where the prompt is being dismissed, opt the user
                // out of seeing the pop-up again.
                this.setUserToOptedOut();

                // If possible, return focus to the last-known UI element.
                if (!!this.userActivity.activeElement)
                    this.userActivity.activeElement.focus();
            }
        },
        userIsOptedOut: function () {
            return !!CookieManager.get(this.options.popupID + '-opt');
        },
        setUserToOptedOut: function () {
            CookieManager.set(this.options.popupID + '-opt', 'true', {expires: this.options.optOutDurationDays});
        },


        initializeCountdownTimer: function () {

            // Set the time before checking whether to display the prompt to the less
            // of either the TIMER this.INTERVAL, or the existing time left on the timer.

            var timeleft = this.getCountdownTimeRemaining();
            //set a minimum tick equal to timerIntervalSeconds
            var tick = (( timeleft >= this.options.timerIntervalSeconds ) ? this.options.timerIntervalSeconds : timeleft) * 1000;

            this.countdownIntervalID = window.setInterval(this.decrementCountdownTimer.bind(this), tick);
        },

        decrementCountdownTimer: function () {
            var timeleft = this.getCountdownTimeRemaining();
            timeleft -= this.options.timerIntervalSeconds;
            CookieManager.set(this.options.popupID + '-timer', timeleft);

            // If the timer hasn't run out yet, keep ticking.
            if (timeleft <= 0) {
                // Otherwise, clear the interval timer and display the prompt.
                window.clearInterval(this.countdownIntervalID);
                this.displayPrompt();
            }
        },

        // Get the amount of time left on the countdown timer. If the
        // timer hasn't been set, return POPUP_DELAY_SECONDS. Guarantee a
        // minimum of zero seconds.
        getCountdownTimeRemaining: function () {
            var timeleft = CookieManager.get(this.options.popupID + '-timer');
            if (!timeleft)
                timeleft = this.options.popupDelaySeconds;
            timeleft = Number(timeleft);
            if (timeleft < 0)
                timeleft = 0;
            return timeleft;
        },

        // Check for keyboard activity in order to avoid displaying the prompt while
        // the user is interacting with an existing UI element.
        initializeActivityCheck: function () {
            $(document).on('keypress.PLH',this.recordUserInteraction.bind(this)); // keystroke.
            $(document).on('click.PLH',this.recordUserInteraction.bind(this)); // Mouse click
        },

        recordUserInteraction: function (event) {
            // Date.now() is not supported by IE before version 9.
            this.userActivity.lastActivityTime =  new Date().getTime();
            this.userActivity.activeElement = document.activeElement;
        },

        getSecondsSinceLastInteraction: function () {
            var now = new Date().getTime(); // Time in milliseconds
            var elapsed = now - this.userActivity.lastActivityTime;
            return Math.floor(elapsed / 1000);
        }
        //Math.floor((new Date().getTime() - lastActivityTime) / 1000);


    };

    // Checks whether the specified url is part of the Clnical Trial Search set.
    function isALiveHelpPage (urls) {
        var matchFound = false;
        var itemCount = urls.length;

        // so we don't have to worry about casing.
        var url = location.pathname.toLowerCase();
        for (var i = 0; i < itemCount; ++i) {
			if(typeof urls[i] === "string") {
				if (url === urls[i].toLowerCase()) {
					matchFound = true;
					break;
				}
			}
			else {
				if(urls[i].test(url)) {
					matchFound = true;
					break;
				}
			}
        }

        return matchFound;
    }

    function activatePromptAnalytics () {
        // Record prompt activation.
        if (NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptDisplay)
            NCIAnalytics.RecordProactiveChatPromptDisplay($(".ProactiveLiveHelpPrompt"));


        // Set up analytics handler for "Chat Now" button.
        var button = $(".ProactiveLiveHelpPrompt .chat-button");
        if (!!button) {
            button.on('click.PLH',function () {
                if (NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptClick)
                    NCIAnalytics.RecordProactiveChatPromptClick(this);
            });
        }

        // Set up analytics for dismissal button.
        button = $(".ProactiveLiveHelpPrompt .close");
        if (!!button) {
            button.on('click.PLH',function () {
                if (NCIAnalytics && NCIAnalytics.RecordProactiveChatPromptDismissal)
                    NCIAnalytics.RecordProactiveChatPromptDismissal(this);
            });
        }
    }

    function _isPastDate(date){
        if (!date) return false;
        var dateNow = new Date(); // Local time to user
        var dateEastern = DateUtility.localToEasternTime(dateNow);
        var endDate = new Date(date);

        // check if current time is beyond the end date
        return dateEastern > endDate
    }

    /*
     Live Help is only available between 8:00 AM and 11:00 PM US Eastern Time.
     Skip holidays. Skip weekends.
     */
    function liveHelpIsAvailable() {

        var isAvailable = false;

        var dateNow = new Date(); // Local time to user
        var dateEastern = DateUtility.localToEasternTime(dateNow);
        if (DateUtility.isBusinessHours(dateEastern)
            && DateUtility.dateIsWorkDay(dateEastern)
            && !DateUtility.isHoliday(dateEastern)) {
            isAvailable = true;
        }
        return isAvailable;
    }

    /* Exposes functions from this module which are available from the outside. */
    return PLH
});