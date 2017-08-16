import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/string/includes';
import { CTSSimpleFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-simple-form-setup';
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics";
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm";
//import "../../../../Plugins/jquery.nci.equal_heights";

(function() { //encapsulation
	$(function() { //document.ready shorthand
		new CTSSimpleFormSetup("clinicaltrialsapi-int.cancer.gov").init();
		new CTSFieldValidator().init();
//		(<any>(CTSCommonAnalytics)).init();
		(<any>(FeedbackForm)).init();
//		(<any>jQuery('[data-match-height]')).NCI_equal_heights();
	});
})();