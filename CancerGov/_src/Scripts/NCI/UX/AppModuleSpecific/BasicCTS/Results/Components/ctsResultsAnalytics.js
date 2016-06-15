/**
* Create a CTSResultsAnalytics object with functions that can be called from the .vm HTML
*/
var CTSResultsAnalytics = {	
	/**
	* Track specified events and variables on page load
	* @param count - total number of result items
	* @param term - term or keyword used in search
	* @param zip - zip code used in search
	* @param age - age used in search
	*/
	trackOnPageLoad: function(count) {
		s.events='event2'; // Internal search event
		s.prop10=count; // # of results
		s.eVar11=s.prop11='clinicaltrials_basic'; // Search type
		s.eVar22=s.prop22='term|zip|age'; // Search criteria
		s.t();
	},
	debug: function() {
		//console.log("debugging statement");
	}	
};
