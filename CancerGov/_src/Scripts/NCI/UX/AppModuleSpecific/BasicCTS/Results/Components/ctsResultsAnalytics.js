/**
* Create a CTSResultsAnalytics object with functions that can be called from the .vm HTML
*/
var CTSResultsAnalytics = {	
	isEnabled: true,
	/**
	* Track specified events and variables on page load
	* @param
	* @param
	* @param 
	*/
	trackOnPageLoad: function() {
		s.events='event2'; // Internal search event
		s.prop10='#'; // # of results
		s.eVar11=s.prop11='clinicaltrials_basic'; // Search type
		s.eVar22=s.prop22='term|zip|age'; // Search criteria
		s.t();
	},
	debug: function() {
		//console.log("debugging statement");
	}	
};

