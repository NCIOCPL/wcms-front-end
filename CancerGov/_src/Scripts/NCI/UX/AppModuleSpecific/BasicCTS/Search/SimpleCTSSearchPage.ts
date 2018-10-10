import { BaseCTSSearchPage } from './BaseCTSSearchPage';
import { CTSSimpleFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-simple-form-setup';
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics";

/**
 * Defined the class for loading the enhancements of the page
 * 
 * @class SimpleCTSSearchPage
 * @extends {BaseCTSSearchPage}
 */
class SimpleCTSSearchPage extends BaseCTSSearchPage {
	constructor() {
		super();
	}

	/**
	 * Wire up the on Ready functions.
	 * 
	 * @memberof SimpleCTSSearchPage
	 */
	onReady():void {
		let ctsSimpleFormSetup = new CTSSimpleFormSetup(this.Config.ClinicalTrialsAPIServer);
		ctsSimpleFormSetup.init();
		new CTSFieldValidator(ctsSimpleFormSetup.postValidationStep.bind(ctsSimpleFormSetup)).init();
		(<any>(CTSCommonAnalytics)).init();
	}
}

(function() { //encapsulation
	let searchPage:SimpleCTSSearchPage = new SimpleCTSSearchPage();
	searchPage.init();
})();