import "Plugins/jquery.nci.equal_heights";

import * as AdvancedSearchFormSetup from "UX/AppModuleSpecific/BasicCTS/AdvSearch/Enhancements/BasicCTSAdvSearchFormSetup"; 
import * as CTSCommonAnalytics from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics"; 
import * as FeedbackForm from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm"; 

//var $ = require('jquery');
//require('Plugins/jquery.nci.equal_heights');

$(document).ready(function(){
	(<any>(AdvancedSearchFormSetup)).init();
	(<any>(CTSCommonAnalytics)).init();
	(<any>(FeedbackForm)).init();
	// require('BasicCTSAdvSearch/Enhancements/BasicCTSAdvSearchFormSetup').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm').init();
	// $('[data-match-height]').NCI_equal_heights();
});  
