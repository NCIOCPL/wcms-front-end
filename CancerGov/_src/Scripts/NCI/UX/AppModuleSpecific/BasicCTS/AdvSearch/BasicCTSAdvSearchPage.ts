import { BasicCTSAdvSearchFormSetup } from 'UX/AppModuleSpecific/BasicCTS/AdvSearch/Enhancements/BasicCTSAdvSearchFormSetup';
import { CTSFieldValidation } from 'UX/AppModuleSpecific/BasicCTS/AdvSearch/Enhancements/cts-field-validation';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics"; 
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm"; 
import "../../../../Plugins/jquery.nci.equal_heights";

$(document).ready(function(){
	new BasicCTSAdvSearchFormSetup("clinicaltrialsapi-stage.cancer.gov").init();
	new CTSFieldValidation().init();
	(<any>(CTSCommonAnalytics)).init();
	(<any>(FeedbackForm)).init();
	(<any>jQuery('[data-match-height]')).NCI_equal_heights();
});  
