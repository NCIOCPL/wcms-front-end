define(function(require) {
	var $ = require('jquery');

	
	function _trackSearchFields($locationsContainer) {	
		//Fetch 
		var count = '';
		
		var count = $('span[data-basiccts-searchparam="n"]').text();
		var type = $('span[data-basiccts-searchparam="t"]').text();
		var keyword = $('span[data-basiccts-searchparam="q"]').text();
		var age = $('span[data-basiccts-searchparam="a"]').text();
		var zip = $('span[data-basiccts-searchparam="z"]').text();

		var allParams = [];
		
		if(type)
			allParams.push(type);
		else if (keyword)
			allParams.push(keyword);
		else 
			allParams.push("none");

		if (zip)
			allParams.push(zip);
		else
			allParams.push("none");
		
		if (age)
			allParams.push(age);
		else
			allParams.push("none");
		
		var allParamStr = allParams.join("|");
		
		
		var clickParams = new NCIAnalytics.ClickParams(true, 'nciglobal', 'o', 'formAnalysis|clinicaltrials_basic|results');
          var props = {};
          var evars = {};
          var events = [2];

        props[10] = count;
		evars[11] = props[11] = 'clinicaltrials_basic';
		evars[22] = props[22] = allParamStr;
		
            clickParams.Props = props;
            clickParams.Evars = evars;
            clickParams.Events = events;
            clickParams.LogToOmniture();
	}

	
	/***
	* Main function
	*/
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
		$('.clinical-trial-individual-result').each(function(i, el) {
			$(el).on('click', 'a', function(event) {
				var $this = $(this);
					rank = $this.index('.clinical-trial-individual-result a') + 1;
					rank += ('|page ' + pn);
					NCIAnalytics.CTSResultsClick($this, rank);
			});
		});	
		_trackSearchFields();
	}

	/**
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();
			initialized = true;
		}
	};
});
