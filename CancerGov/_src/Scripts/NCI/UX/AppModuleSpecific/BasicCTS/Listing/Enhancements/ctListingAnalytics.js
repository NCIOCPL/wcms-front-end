import $ from 'jquery';

function _initialize() {
	
	/* Get our page number from the URL, if it exists */	
	var url = document.URL;
	var pn = 1;
	if(url.indexOf('pn=') > -1) {
		var pnq = url.match(/pn=[0-9]*/g); // get the "pn=xx" query value
		pn = pnq[0].replace('pn=',''); // strip out the "pn=" for the page number
		if(pn.length < 1) {
			pn = 1;
		}
	}
	
	/* Track clicks of individual results */
	$('.ct-list-item').each(function(i, el) {
		$(el).on('click', 'a', function(event) {
			var $this = $(this);
			var rank = $this.index('.ct-list-item a') + 1;
			rank += ('|page ' + pn);
			var formName = "clinicaltrials_custom";
			NCIAnalytics.CTSResultsWithFormClick($this, rank, formName);
		});
	});
}

let initialized = false;
export default {
	init: function() {
		if (initialized) {
			return;
		}
		
		initialized = true;
		_initialize();
	}
}
