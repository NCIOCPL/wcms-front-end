/**
* Create a CTSResultsAnalytics object with functions that can be called from the .vm HTML
*/
var CTSResultsAnalytics = {	
	/**
	* Track specified events and variables on page load
	* @param count - total number of result items
	* @param fields - combination of term or keyword, zip, and/or age used in search
	*/
	trackOnPageLoad: function(count, fields) {
		s.events='event2'; // Internal search event
		s.prop10=count; // # of results
		s.eVar11=s.prop11='clinicaltrials_basic'; // Search type
		s.eVar22=s.prop22=fields; // Search parameters
		s.t();
	},
	debug: function() {
		//console.log("debugging statement");
	}	
};
