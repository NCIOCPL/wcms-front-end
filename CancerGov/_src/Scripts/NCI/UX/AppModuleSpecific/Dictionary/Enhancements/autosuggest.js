define(function(require) {
    var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {

        // Initialize autosuggest and kick off if radio button is changed
        autoFunc();
        $("input[data-autosuggest*='dict-radio']").change(function() { 
            autoFunc();
        });
    } 

    // Dynamically-generated radio/autoComplete element IDs
    var ids = {
        radioStarts: 'dict-radio-starts',
        radioContains: 'dict-radio-contains',
        autoComplete: 'dict-autocomplete'
    }
    
    /**
     * Autocomplete functionality.
     */
    function autoFunc() {
        // Look for the "data-dict-type" attribute 
        var $dict = $('[data-dict-type]');

        // Set dictionary value (e.g. 'term', 'drug', or 'genetic') if a matching ID is found.
        var dictionary = '';
        if($dict.length > 0) {
            dictionary = $dict.data('dict-type').trim();            
        }

        // Set language.
        var language = 'English';
        if ($('html').attr('lang') === 'es') {
            language = 'Spanish';
        }
    
        // Do autocomplete
        var isContains = IsContains();        
        (function(factory) {
            factory(NCI, NCI.dictionary);
            } (function(NCI, DictionaryService) {
                NCI.doAutocomplete("input[data-autosuggest='" + ids.autoComplete + "']", function(term) {
                    return DictionaryService.searchSuggest(dictionary, term, language, isContains ? 'contains' : 'begins');
                }, isContains);
            })
        );
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
