import "Plugins/jquery.nci.equal_heights";
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics"; 
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm"; 
import { BasicCTSAdvSearchFormSetup } from 'UX/AppModuleSpecific/BasicCTS/AdvSearch/Enhancements/BasicCTSAdvSearchFormSetup';

$(document).ready(function(){
	// TODO: fix imports, create config instead of hardcoding API address here
	new BasicCTSAdvSearchFormSetup("clinicaltrialsapi.cancer.gov").init();
	(<any>(CTSCommonAnalytics)).init();
	(<any>(FeedbackForm)).init();
    // var $ = require('jquery');
	// require('BasicCTSAdvSearch/Enhancements/BasicCTSAdvSearchFormSetup').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm').init();
	// $('[data-match-height]').NCI_equal_heights();
});  
