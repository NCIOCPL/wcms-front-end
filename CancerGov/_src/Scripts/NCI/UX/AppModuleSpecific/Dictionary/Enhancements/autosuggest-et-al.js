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

    // Autocomplete functionality
    var ids = {
        radioContains: "ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContains", // TODO: clean up
        AutoComplete1: "ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_AutoComplete1" // TODO: clean up
    }    

    function autoFunc() {
        var dictionary = "term"; // TODO: get values dynamically
        var language = 'English';
        if ($('html').attr('lang') === 'es') {
            language = 'Spanish';
        }
        var isContains = IsContains();
    
        (function(factory) {
            if (typeof define === 'function' && define.amd && typeof require === 'function') {
                // AMD
                require(['Common/Enhancements/NCI', 'Data/DictionaryService'], factory);
            } else {
                // Browser globals
                factory(NCI, NCI.dictionary);
            }
        }(function(NCI, DictionaryService) {
            NCI.doAutocomplete('#' + ids.AutoComplete1, function(term) {
                return DictionaryService.searchSuggest(dictionary, term, language, isContains ? 'contains' : 'begins');
            }, isContains);
        }));
    }
    
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
