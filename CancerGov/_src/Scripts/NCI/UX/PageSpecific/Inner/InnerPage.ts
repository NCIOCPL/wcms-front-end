import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'UX/Common/Enhancements/sharecomponent';
import 'UX/PageSpecific/Inner/Enhancements/showHideListingBodyField';
import * as NCIAutocomplete from 'Modules/autocomplete/autocomplete';
import * as DictionaryService from 'Data/DictionaryService';
import * as ImageCarousel from 'UX/Common/Enhancements/image-carousel';
import * as VideoCarousel from 'UX/Common/Enhancements/video-carousel';
import FloatingDelighter from 'Modules/floatingDelighter';
import * as AnalyticsAfter from 'UX/Common/Enhancements/analytics.After';
import * as BestBets from 'Modules/bestBets/bestBets';
import patternInjector from 'Modules/patternInjector';
import nciOrgPatternSettings from './nciOrgPatternSettings';

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
        (<any>AnalyticsAfter).init();
        (<any>BestBets).init();


	}
    
}

// BEGIN 404 page redesign, NCISEO-280
window.onload = function () {
    const englishbutton = document.getElementById('englishl');
    const spanishbutton = document.getElementById('spanishl');
    const siteSearchForm2 = document.getElementById('siteSearchForm2')
    const sitesearch2 = document.getElementById('sitesearch2');
    const legendlanguageenglish = document.getElementById('try-search-header-english');
    const legendlanguagespanish = document.getElementById('try-search-header-spanish');
    spanishbutton.addEventListener("focus", function (e) {
        siteSearchForm2.action = "/espanol/buscar/resultados";
        sitesearch2.textContent = "Buscar";
        spanishbutton.checked = true;
        englishbutton.checked = false;
        legendlanguageenglish.classList.add("hide");
        legendlanguagespanish.classList.remove("hide");
    });
    englishbutton.addEventListener("focus", function (e) {
        siteSearchForm2.action = "/search/results";
        sitesearch2.textContent = "Search";
        spanishbutton.checked = false;
        englishbutton.checked = true;
        legendlanguagespanish.classList.add("hide");
        legendlanguageenglish.classList.remove("hide");
    });
};
 // END 404 page redesign, NCISEO-280

/**
 * Initialize InnerPage
 */
(function() { //encapsulation
	let innerPage:InnerPage = new InnerPage();
    innerPage.init();
    patternInjector(nciOrgPatternSettings, '.nci-organization__pattern');
})();