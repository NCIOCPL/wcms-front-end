import "Plugins/jquery.nci.equal_heights";

import * as CTSFormSearchSetup from "UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics"; 


//var $ = require('jquery');
//require('Plugins/jquery.nci.equal_heights');

$(document).ready(function(){
	//CTSFormSearchSetup.init();
	(<any>(CTSFormSearchSetup)).init();
	// require('BasicCTSAdvSearch/Enhancements/BasicCTSAdvSearchFormSetup').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/ctsCommonAnalytics').init();
	// require('UX/AppModuleSpecific/BasicCTS/Common/Enhancements/FeedbackForm').init();
	// $('[data-match-height]').NCI_equal_heights();
});  
