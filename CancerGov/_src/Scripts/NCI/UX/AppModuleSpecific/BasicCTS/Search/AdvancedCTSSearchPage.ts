import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import { loadScript } from '../../../../Utilities';
import { BaseCTSSearchPage } from './BaseCTSSearchPage';
import { CTSAdvancedFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-advanced-form-setup';
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics";

/**
 * Defined the class for loading the enhancements of the page
 * 
 * @class SimpleCTSSearchPage
 * @extends {BaseCTSSearchPage}
 */
class AdvancedCTSSearchPage extends BaseCTSSearchPage {
	constructor() {
		super();
	}

	onReady():void {
		const select2Script = loadScript('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js')
			.then(scriptElement => {
				new CTSAdvancedFormSetup(this.Config.ClinicalTrialsAPIServer).init();
				new CTSFieldValidator().init();
				(<any>(CTSCommonAnalytics)).init();
			})
			.catch(err => {throw(err)})
	}
}

(function() { //encapsulation
	let searchPage:AdvancedCTSSearchPage = new AdvancedCTSSearchPage();
	searchPage.init();
})();