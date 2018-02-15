import $ from 'jquery';
import CookieManager from 'js-cookie';
import LiveChat from 'BasicCTSCommon/Enhancements/LiveChat';
import DateUtility from 'Modules/utility/dateUtility';
import basePaths from './settings';
import ProactiveLiveHelp from './ProactiveLiveHelp';

// #########################################################################
// ####### UTILITY FUNCTIONS FOR VALIDATING PATHNAME AND RETRIEVING SETTINGS

// To avoid scanning every possible path on every page load, we're going to do a preliminary scan for base path matches 
// before scanning at a more granular level.
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

// END PATH VALIDATING UTILITY FUNCTIONS ##################################
// ########################################################################

// ########################################################################
// ######### UTILITY FUNCTIONS FOR VALIDATING LIVE HELP SHOULD BE AVAILABLE

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
    const isNotOptedOut = verifyOptInStatus(popupId);
    const isValidTimeToRun = isLiveHelpAvailable && isPastStartDate && isNotPastEndDate && isNotOptedOut;
    return isValidTimeToRun;
}

// END LIVE HELP STATUS UTILITY FUNCTIONS #################################
// ########################################################################

// ########################################################################
// ########################### PUBLIC API #################################

let isInitialized = false;

const initialize = () => {
    if(isInitialized) {
        return;
    }
    else {
        isInitialized = true;

        // Should pass in pathName to make testing even easier without correct routing
        const pathName = location.pathname.toLowerCase();
        const popupSettings = getPopupSettings(basePaths, pathName);

        // If we were able to retrieve a settings object we know we have a page match
        if(popupSettings) {
            const isValidTimeToRun = true // UNCOMMENT AFTER TESTING! verifyShouldLiveHelpRun(popupSettings);
            
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
            //TODO: DO WE NEED THIS? THIS DOESN'T WORK IF WE'RE TESTING FOR MULTIPLE TYPES ANYWAY, SINCE THERE IS NO SETTINGS
            // ON NON-LIVE HELP PAGES.
            // WE CAN REMOVE ALL TIMERS, BUT THAT ISN'T REALLY THE POINT EITHER.
            // If we're not on a page listed within the options.urls, clear the timer if it exists.
            // CookieManager.remove(options.popupID + '-timer');
        }

    }
                
}

export default initialize;


