import { CTSBaseFormSetup } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-base-form-setup';
// TODO: replace base form setup with advanced form setup
import { CTSFieldValidator } from 'UX/AppModuleSpecific/BasicCTS/Search/Enhancements/cts-field-validator';
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics"; 
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm"; 
import "../../../../Plugins/jquery.nci.equal_heights";

$(document).ready(function(){
	new CTSBaseFormSetup("clinicaltrialsapi-stage.cancer.gov").init();
	new CTSFieldValidator().init();
	(<any>(CTSCommonAnalytics)).init();
	(<any>(FeedbackForm)).init();
	(<any>jQuery('[data-match-height]')).NCI_equal_heights();
});  
