import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'UX/Common/Enhancements/sharecomponent';
import 'UX/PageSpecific/Inner/Enhancements/showHideListingBodyField';
import * as NCIAutocomplete from 'Modules/autocomplete/autocomplete';
import * as DictionaryService from 'Data/DictionaryService';
import * as ImageCarousel from 'UX/Common/Enhancements/image-carousel';
import * as VideoCarousel from 'UX/Common/Enhancements/video-carousel';
import FloatingDelighter from 'Modules/floatingDelighter';
import * as BestBets from 'Modules/bestBets/bestBets';
import patternInjector from 'Modules/patternInjector';
import nciOrgPatternSettings from './nciOrgPatternSettings';
import { default as bindDirectoryFormSearch } from './Enhancements/directory-search-results';

import './InnerPage.scss';

/**
 * Class representing CancerGov inner pages.
 * 
 * @export
 * @abstract
 * @class InnerPage
 */
class InnerPage extends NCIBasePage {
    /**
    * Gets the running CDEConfiguration for this environment.
    * 
    * @protected
    * @type {CDEConfiguration}
    */
    protected Config: CDEConfiguration;

    /**
    * Creates an instance of InnerPage.
    * @param {string} apiHost 
    */
    constructor() { 
        super();
        let configSvc:CDERuntimeConfig = new CDERuntimeConfig();
        this.Config = configSvc.getConfiguration();
    }

	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof InnerPage
	 */
	onReady():void {
        // Build image carousels
        (<any>ImageCarousel).init();

        // Build video carousels
        (<any>VideoCarousel).apiInit(this.Config.GoogleAPIKey);

        // Run delighter and analytics 'after' init() functions
        (<any>FloatingDelighter)();
        (<any>BestBets).init();


	}
    
}

/**
 * Initialize InnerPage
 */
(function() { //encapsulation
	let innerPage:InnerPage = new InnerPage();
    innerPage.init();
    patternInjector(nciOrgPatternSettings, '.nci-organization__pattern');
    bindDirectoryFormSearch();
})();