import { NCIBasePage } from 'UX/core';
import * as DictionaryService from 'Data/DictionaryService';
import * as AutoSuggest from 'UX/AppModuleSpecific/Dictionary/Enhancements/autosuggest';
import * as PlayAudio from 'UX/AppModuleSpecific/Dictionary/Enhancements/playaudio';
import * as Analytics from 'UX/AppModuleSpecific/Dictionary/Enhancements/analytics';

/**
 * Class representing CancerGov Dictionary pages.
 * 
 * @export
 * @abstract
 * @class DictionaryPage
 */
class DictionaryPage extends NCIBasePage {
    /**
    * Creates an instance of DictionaryPage.
    */
    constructor() { 
        super();
    }

	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof DictionaryPage
	 */
	onReady():void {
        // Do autosuggest and dictionary click audio
		(<any>PlayAudio).init(); 
		(<any>AutoSuggest).init();
		(<any>Analytics).init();
	}
    
}

/**
 * Initialize DictionaryPage object
 */
(function() { //encapsulation
	let dictPage:DictionaryPage = new DictionaryPage();
	dictPage.init();
})();