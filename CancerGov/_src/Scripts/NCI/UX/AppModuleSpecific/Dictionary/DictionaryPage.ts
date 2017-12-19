import { NCIBasePage } from 'UX/core';
import * as AutoSuggest from 'UX/AppModuleSpecific/Dictionary/Enhancements/autosuggest-et-al';

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
        // Do autosuggest et al.
        (<any>AutoSuggest).init(); 
	}
    
}

/**
 * Initialize DictionaryPage object
 */
(function() { //encapsulation
	let dictPage:DictionaryPage = new DictionaryPage();
	dictPage.init();
})();