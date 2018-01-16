define(function(require) {
    var $ = require('jquery');
    var AdobeAnalytics = require('Patches/AdobeAnalytics');

	/***
	* Main function
	*/
	function _initialize() {
        var pageName = 'www.cancer.gov/';
		var s = AdobeAnalytics.getSObject();
        if(typeof(s) !== 'undefined') {
            pageName = s.pageName;
        }

        /* Initialize analytics onclicks for seach button and A-Z list */

        // Look for the "data-dict-type" attribute 
        var $dict = $('[data-dict-type]');

        // Set dictionary value (e.g. 'term', 'drug', or 'genetic') if a matching ID is found.
        var dictionary = '';
        if($dict.length > 0) {
            dictionary = $dict.data('dict-type').trim();            
        }

        // Set language.
        var language = 'English';
        var isSpanish = false;
        if ($('html').attr('lang') === 'es') {
            language = 'Spanish';
            isSpanish = true;
        }
    
        // Set up analytics onclick functions for A-Z list
        $('.az-list a').on('click.analytics', function(e) {
            console.log("Clicked dictionary expand list");
            var $this = $(this);
            var expandVal = $this.text();

            if(dictionary === "term") {
                if(language === "Spanish") {
                    NCIAnalytics.TermsDictionarySearchAlphaListSpanish($this, expandVal);
                }
                else {
                    NCIAnalytics.TermsDictionarySearchAlphaList($this, expandVal)
                }
            }
            if(dictionary === "genetic") {
                NCIAnalytics.GeneticsDictionarySearchAlphaList($this, expandVal);
            }
            if(dictionary === "drug") {
                    NCIAnalytics.DrugDictionarySearchAlphaList($this, expandVal);
            }
        });

        // Set up analytics onsubmit fuction for search button click
        $('#aspnetForm').submit(function(e) {
            var $this = $(this);
            console.log("Submitted dictionary search form");
            if(dictionary === "term") {
                    NCIAnalytics.TermsDictionarySearch($this, isSpanish)
            }
            if(dictionary === "genetic") {
                    NCIAnalytics.GeneticsDictionarySearchNew($this);
            }
             if(dictionary === "drug") {
                    NCIAnalytics.DrugDictionarySearch($this);
            }
        });
    }

    // Dynamically-generated radio/autoComplete element IDs
    var ids = {
        radioStarts: 'radioStarts',
        radioContains: 'radioContains'
    }
    
    /**
     * Checks whether 'contains' radio button has been selected.
	 * @type {Boolean}
     */
    function IsContains() {
        var ret = false;
        if ($("input[data-autosuggest='" + ids.radioContains + "']").prop("checked"))
            ret = true;    
        return ret;
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
