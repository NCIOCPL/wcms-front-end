//Selective imports in modular pattern
import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import { BaseCTSSearchPage } from './BaseCTSSearchPage';
import { CTSBasicFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-basic-form-setup';
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
class BasicCTSSearchPage extends BaseCTSSearchPage {
	constructor() {
		super();
	}

	onReady():void {
		new CTSBasicFormSetup(this.Config.ClinicalTrialsAPIServer).init();
		new CTSFieldValidator().init();
		(<any>(CTSCommonAnalytics)).init();
		(<any>(FeedbackForm)).init();
		(<any>jQuery('[data-match-height]')).NCI_equal_heights();
	}
}

(function() { //encapsulation
	let searchPage:BasicCTSSearchPage = new BasicCTSSearchPage();
	searchPage.init();
})();