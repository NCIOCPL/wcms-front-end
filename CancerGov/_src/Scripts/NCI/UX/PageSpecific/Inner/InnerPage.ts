import { CDERuntimeConfig, CDEConfiguration } from 'Services/cde-configuration-service';
import { NCIBasePage } from 'UX/core';
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import 'UX/Common/Enhancements/sharecomponent';
import 'UX/PageSpecific/Inner/Enhancements/showHideListingBodyField';
import * as NCIAutocomplete from 'Modules/autocomplete/autocomplete';
import * as DictionaryService from 'Data/DictionaryService';
import * as ImageCarousel from 'UX/PageSpecific/Inner/Enhancements/image-carousel';
import * as VideoCarousel from 'UX/PageSpecific/Inner/Enhancements/video-carousel';
import * as AnalyticsAfter from 'UX/Common/Enhancements/analytics.After';
import 'UX/Common/Enhancements/clinicalTrialsDelighter';

/**
 * Base class for all CTS Search Form Pages.
 * 
 * @export
 * @abstract
 * @class BaseCTSSearchPage
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
	 * @memberof SimpleCTSSearchPage
	 */
	onReady():void {

        // Build image or video carousels
        (<any>ImageCarousel).init();
        (<any>VideoCarousel).init();

        // overriding dictionary pages' inline script
		// set flag to recreate autocomplete on dictionary pages
        var isAutocompleteDone = false;

		// overload dictionary autocomplete once it's been created
        $( "#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_AutoComplete1").on( "autocompletecreate", function( event, ui ) {

            var $target = $(this);

            if (!isAutocompleteDone) {

                // destroy autocomplete and remake it in our image
                // this cannot run in the create callback so we async it to run shortly after
                setTimeout(function () {
                    var language = $('html').attr('lang') === 'es' ? 'Spanish' : 'English';
                    var isContains = function(){
                        return $('#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContains').prop("checked")?'contains':'begins'
                    };

                    var dictionary = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

                    // destroy the old autocomplete
                    (<any>$target).autocomplete('destroy'); 

                    isAutocompleteDone = true;

                    // create a new autocomplete
                    (<any>NCIAutocomplete).doAutocomplete($target,function (term) {
                        return (<any>DictionaryService).searchSuggest(dictionary, term, language, isContains())
                    });

                    // remove the change event on these radio buttons that remake autocomplete on each change
                    $('#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioStarts,#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContains').removeAttr('onchange').off('change');


                }, 100);

            }
        });

        // Do analytics 'after' functions
        (<any>AnalyticsAfter).init();        
	}    
    
}

/**
 * Initialize InnerPage
 */
(function() { //encapsulation
	let searchPage:InnerPage = new InnerPage();
	searchPage.init();
})();