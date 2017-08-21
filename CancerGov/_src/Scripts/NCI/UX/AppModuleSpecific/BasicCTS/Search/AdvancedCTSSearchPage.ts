import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import { BaseCTSSearchPage } from './BaseCTSSearchPage';
import { CTSAdvancedFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-advanced-form-setup';
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics";
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm";
import "../../../../Plugins/jquery.nci.equal_heights";

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
		new CTSAdvancedFormSetup(this.Config.ClinicalTrialsAPIServer).init();
		new CTSFieldValidator().init();
		(<any>(CTSCommonAnalytics)).init();
		(<any>(FeedbackForm)).init();
		(<any>jQuery('[data-match-height]')).NCI_equal_heights();
	}
}

(function() { //encapsulation
	let searchPage:AdvancedCTSSearchPage = new AdvancedCTSSearchPage();
	$(searchPage.onReady.bind(searchPage))
})();