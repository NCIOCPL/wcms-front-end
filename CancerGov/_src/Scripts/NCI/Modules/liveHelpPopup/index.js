
const $ = require('jquery');
const CookieManager = require('js-cookie');
const LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');
const DateUtility = require('Modules/utility/dateUtility');

            
const englishCTSSettings = {
    // ASK FRANK WHAT THE REQUIREMENTS ARE REGARDING THE REGEXS SINCE SPANISH SPECIFIES. ARE THERE EXCEPTIONS?
    urls: [
        "/about-cancer/treatment/clinical-trials/search",
        "/about-cancer/treatment/clinical-trials/basic",
        "/about-cancer/treatment/clinical-trials/search/a",
        "/about-cancer/treatment/clinical-trials/search/r",
        "/about-cancer/treatment/clinical-trials/search/v",
        "/about-cancer/treatment/clinical-trials/advanced-search",
        "/about-cancer/treatment/clinical-trials/search/results",
        "/about-cancer/treatment/clinical-trials/search/view",
        /^\/about-cancer\/treatment\/clinical-trials\/disease\/.*/,
        /^\/about-cancer\/treatment\/clinical-trials\/intervention\/.*/
    ],
    popupDelaySeconds: 1, // Number of seconds to delay before displaying the popup.

    // TODO: USE A TEMPLATE LITERAL FOR THESE MARKUPS (MAKES IT EXTENSIBLE FOR FUTURE POPUPS THAT HAVE A DIFFERENT LAYOUT)
    popupID: 'ProactiveLiveHelpForCTSPrompt',
    popupTitle: "Need Help Finding a Clinical Trial?",
    popupMessage: "<p>Information Specialists are available to help you search and answer your questions.</p>",
    optOutDurationDays: 30,
    timerIntervalSeconds: 5,
    interactionDelaySeconds: 10,	// Minimum number of seconds to wait after a user interaction before displaying the prompt.
    startDate: new Date(0), // default start data is 1/1/1970
    endDate: null
}

const spanishCTSSettings = {
    urls: [
        '/espanol/cancer/tratamiento/medicamentos',
        '/espanol/cancer/tratamiento/medicamentos/indice-de-medicamentos',
        '/espanol/cancer/tratamiento/medicamentos/enfermedades-relacionadas-con-cancer',
        '/espanol/cancer/tratamiento/medicamentos/uso-extraoficial',
        '/espanol/cancer/tratamiento/estudios-clinicos',
        '/espanol/cancer/tratamiento/estudios-clinicos/guia-estudios-clinicos',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/donde-se-realizan',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/tipos',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/fases',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/asignacion-azar',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/placebo',
        '/espanol/cancer/tratamiento/estudios-clinicos/que-son-estudios/miembros-equipo-investigacion',
        '/espanol/cancer/tratamiento/estudios-clinicos/pago',
        '/espanol/cancer/tratamiento/estudios-clinicos/pago/cobertura-de-seguro',
        '/espanol/cancer/tratamiento/estudios-clinicos/pago/gestion-con-plan-de-salud',
        '/espanol/cancer/tratamiento/estudios-clinicos/pago/programas-federales',
        '/espanol/cancer/tratamiento/estudios-clinicos/seguridad-paciente',
        '/espanol/cancer/tratamiento/estudios-clinicos/seguridad-paciente/consentimiento',
        '/espanol/cancer/tratamiento/estudios-clinicos/seguridad-paciente/asentimiento-ninos',
        '/espanol/cancer/tratamiento/estudios-clinicos/seguridad-paciente/revision-cientifica',
        '/espanol/cancer/tratamiento/estudios-clinicos/seguridad-paciente/terminacion-estudio',
        '/espanol/cancer/tratamiento/estudios-clinicos/decidir-participar',
        '/espanol/cancer/tratamiento/estudios-clinicos/preguntas',
        '/espanol/cancer/tratamiento/estudios-clinicos/patrocinados-por-nci',
    ],
    popupDelaySeconds: 1, // Number of seconds to delay before displaying the popup.

    // TODO: USE A TEMPLATE LITERAL FOR THESE MARKUPS (MAKES IT EXTENSIBLE FOR FUTURE POPUPS THAT HAVE A DIFFERENT LAYOUT)
    popupID: 'ProactiveLiveHelpForCTSPrompt',
    popupTitle: "¿Necesita ayuda en encontrar un estudio clínico?",
    popupMessage: "<p>Especialistas de Información están disponibles para ayudarle en hacer una búsqueda y contestar a sus preguntas.</p>",
    optOutDurationDays: 30,
    timerIntervalSeconds: 5,
    interactionDelaySeconds: 10,	// Minimum number of seconds to wait after a user interaction before displaying the prompt.
    startDate: new Date(0), // default start data is 1/1/1970
    endDate: null    
}

// To avoid scanning every possible path on every page load, we're going to do a preliminary scan for base path matches 
// before scanning at a more granular level.
const basePaths = [
    {
        path: /^about-cancer\/treatment\/clinical-trials/,
        settings: englishCTSSettings
    },
    {
        path: /^espanol\/cancer\/tratamiento/,
        settings: spanishCTSSettings
    }
];

const testForBasePathMatch = (basePaths, pathName = '/i/am/not/a/palindrome/or/a/valid/path') => {
    for(let i = 0; i < basePaths.length; i++) {
        if(pathName.match(basePaths[i].path)) {
            return basePaths[i].settings;
        }
    }
    return null;
}

const testForExactPathMatch = (pathName, paths) => {
    //Note: paths can be either strings or Regexs
    for(let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if(path instanceof RegExp) {
            if(pathName.match(path)) return true;
        }
        else if (typeof path === 'string'){
            if(pathName === path) return true;
        }
    }
    return false;
 }

const getPopupSettings = (basePaths, pathName = '/i/am/not/a/palindrome/or/a/valid/path') => {
    const settings = testForBasePathMatch(basePaths, pathName);
    if(settings) {
        // For now we don't have to worry about exceptions or whitelists! :)
        const isExactPathMatch = testForExactPathMatch(pathName, settings.urls);
        if(isExactPathMatch) return settings;
    }
    return null;
}

// Live Help is only available between 8:00 AM and 11:00 PM US Eastern Time.
// Skip holidays. Skip weekends.
const verifyLiveHelpIsCurrentlyAvailable = () => {
    const dateNow = new Date(); // Local time to user
    const dateEastern = DateUtility.localToEasternTime(dateNow);
    const isCurrentlyAvailable = DateUtility.isBusinessHours(dateEastern) 
                                    && DateUtility.dateIsWorkDay(dateEastern) 
                                    && !DateUtility.isHoliday(dateEastern);
    return isCurrentlyAvailable;
}

const verifyOptInStatus = popupId => {
    return !!CookieManager.get(popupId + '-opt');
}

const getSecondsSinceLastInteraction = lastActivityTime => {
    const now = new Date().getTime(); // Time in milliseconds
    const elapsed = now - lastActivityTime;
    return Math.floor(elapsed / 1000);
}

// Verify if current time is beyond end date.
const verifyIsPastDate = date => {
    if (!date) return false;

    const currentLocalTime = new Date();
    const dateEastern = DateUtility.localToEasternTime(currentLocalTime);
    const endDate = new Date(date);
    return dateEastern > endDate;
}

const verifyShouldLiveHelpRun = ({ startDate, endDate, popupId }) => {
    const isLiveHelpAvailable = verifyLiveHelpIsCurrentlyAvailable();
    const isPastStartDate = verifyIsPastDate(startDate);
    const isNotPastEndDate = !verifyIsPastDate(endDate);
    // Replace result after testing (localhost doesn't work)
    const isNotOptedOut = true // verifyOptInStatus(popupId);
    const isValidTimeToRun = isLiveHelpPage && isLiveHelpAvailable && isPastStartDate && isNotPastEndDate && isNotOptedOut;
    return isValidTimeToRun;
}

class ProactiveLiveHelp {
    constructor(options) {
        this.options = options;
        // internal settings
        this.userActivity = {
            lastActivityTime : 0,	// Time of the last keypress.
            activeElement : null	// Last element being interacted with.
        };
        this.popupStatus = false;
        this.countdownIntervalID = "";
        this.initializeActivityCheck();
        this.initializeCountdownTimer();
    }

    // Display a message prompting the user to choose whether they
    // would like to do a chat with a Live Help Specialist.
    displayPrompt() {
        // Before displaying, check whether the user has recently interacted with the UI.
        // If this fires on page load (i.e. the timer has already expired), then the last
        // interaction time is 1/1/1970.

        const self = this;
        const secondsSinceLastInteraction = this.getSecondsSinceLastInteraction(this.userActivity.lastActivityTime);
        if(secondsSinceLastInteraction < this.options.interactionDelaySeconds){
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
    }

    makePromptVisible() {
        // Loads popup only if it is disabled.
        if (this.popupStatus === false) {
            $("#" + this.options.popupID).hide().fadeIn("slow");
            this.popupStatus = true;
        }
    }

    dismissPrompt() {
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
    }

    setUserToOptedOut() {
        CookieManager.set(this.options.popupID + '-opt', 'true', {expires: this.options.optOutDurationDays});
    }


    initializeCountdownTimer() {

        // Set the time before checking whether to display the prompt to the less
        // of either the TIMER this.INTERVAL, or the existing time left on the timer.

        var timeleft = this.getCountdownTimeRemaining();
        //set a minimum tick equal to timerIntervalSeconds
        var tick = (( timeleft >= this.options.timerIntervalSeconds ) ? this.options.timerIntervalSeconds : timeleft) * 1000;

        this.countdownIntervalID = window.setInterval(this.decrementCountdownTimer.bind(this), tick);
    }

    decrementCountdownTimer() {
        var timeleft = this.getCountdownTimeRemaining();
        timeleft -= this.options.timerIntervalSeconds;
        CookieManager.set(this.options.popupID + '-timer', timeleft);

        // If the timer hasn't run out yet, keep ticking.
        if (timeleft <= 0) {
            // Otherwise, clear the interval timer and display the prompt.
            window.clearInterval(this.countdownIntervalID);
            this.displayPrompt();
        }
    }

    // Get the amount of time left on the countdown timer. If the
    // timer hasn't been set, return POPUP_DELAY_SECONDS. Guarantee a
    // minimum of zero seconds.
    getCountdownTimeRemaining() {
        var timeleft = CookieManager.get(this.options.popupID + '-timer');
        if (!timeleft) {
            timeleft = this.options.popupDelaySeconds;
                    }
        timeleft = Number(timeleft);
        if (timeleft < 0)
            timeleft = 0;
        return timeleft;
    }

    // Check for keyboard activity in order to avoid displaying the prompt while
    // the user is interacting with an existing UI element.
    initializeActivityCheck() {
        //TODO: CHECK HOW THESE CUSTOM JQUERY LISTENERS WORK TO MIMIC EFFECT
        $(document).on('keypress.PLH',this.recordUserInteraction.bind(this)); // keystroke.
        $(document).on('click.PLH',this.recordUserInteraction.bind(this)); // Mouse click
    }

    recordUserInteraction(event) {
        // Date.now() is not supported by IE before version 9.
        this.userActivity.lastActivityTime =  new Date().getTime();
        this.userActivity.activeElement = document.activeElement;
    }
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


let isInitialized = false;

const initialize = () => {
    if(isInitialized) {
        return;
    }
    else {
        isInitialized = true;

        // Should pass in pathName to make testing even easier without correct routing
        const pathName = location.pathname.toLowerCase();
        const popupSettings = getPopupSettings(pathName);

        // If we were able to retrieve a settings object we know we have a page match
        if(popupSettings) {
            // Are there mitigating circumstances why the popup shouldn't run even though it's a page match?
            const isValidTimeToRun = verifyShouldLiveHelpRun(popupSettings);
            
            if(isValidTimeToRun) {
                // TODO: Make it possible to add exceptional rules in the url rules of the individual settings
                // Certain pages use expedited help popups
                if((window.location.href.indexOf("about-cancer/treatment/clinical-trials/disease") > -1) || (window.location.href.indexOf("about-cancer/treatment/clinical-trials/intervention") > -1))  {
                    popupSettings.popupDelaySeconds = 30;
                }
    
                const ProactiveLiveHelpforCTS = new ProactiveLiveHelp(popupSettings);
            }
        }
        else {
            //TODO: DO WE NEED THIS? THIS DOESN'T WORK IF WE'RE TESTING FOR MULTIPLE TYPES ANYWAY
            // If we're not on a page listed within the options.urls, clear the timer if it exists.
            CookieManager.remove(options.popupID + '-timer');
        }

    }
                
}

module.exports = initialize;


