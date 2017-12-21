define(function(require) {
    var $ = require('jquery');
    require('jplayer');

	/***
	* Main function
	*/
	function _initialize() {

        //Hookup JPlayer for Audio
        if (jQuery.jPlayer && !Modernizr.touch) {
            var my_jPlayer = $("#dictionary_jPlayer");

            my_jPlayer.jPlayer({
                swfPath: "/PublishedContent/files/global/flash/", //Path to SWF File Used by jPlayer
                //errorAlerts: true,
                supplied: "mp3" //The types of files which will be used.
            });

            //Attach a click event to the audio link
            $(".CDR_audiofile").click(function() {
                my_jPlayer.jPlayer("setMedia", {
                    mp3: $(this).attr("href") // Defines the m4v url
                }).jPlayer("play");

                return false;
            });
        }

        // Kick off autosuggest
        autoFunc();
    }

    // Dynamically-generated radio/autoComplete element IDs
    // TODO: refactor this and remove hardcoded values    
    var ids = {
        radioStarts: "ctl32_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioStartsxxx",
        radioContains: "ctl32_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContainsxxx",
        AutoComplete1: "ctl32_ctl00_dictionarySearchBlock_dictionarySearchBlock_AutoComplete1"
    }
    
    /**
     * Autocomplete functionality.
     * TODO: fix autoFunc() console error
     */
    function autoFunc() {
        // Look for the "dict-data" pattern in the results div ID.
        var prepend = 'dict-data-';
        var $dict = $("div[id*='" + prepend + "']");

        // Set dictionary value (e.g. 'term', 'drug', or 'genetic') if a matching ID is found.
        var dictionary = '';
        if($dict.length = 1) {
            dictionary = $dict.attr('id').replace(prepend,'');
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
                NCI.doAutocomplete('#' + ids.AutoComplete1, function(term) {
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
        if ($("#" + ids.radioContains).prop("checked"))
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
