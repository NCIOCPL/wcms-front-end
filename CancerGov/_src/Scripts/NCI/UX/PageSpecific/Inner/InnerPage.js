define(function(require) {
	require('Common/Enhancements/sharecomponent');
	require('Inner/Enhancements/showHideListingBodyField');
    var NCIAutocomplete = require('Modules/autocomplete/autocomplete');
    var DictionaryService = require('Data/DictionaryService');

	$(function() {

		require('Common/Enhancements/clinicalTrialsDelighter');
		require('Common/Enhancements/analytics.After').init();
        require('Inner/Enhancements/video-carousel').init();       
        

        // overriding dictionary pages' inline script
		// set flag to recreate autocomplete on dictionary pages
        var isAutocompleteDone = false;

		// overload dictionary autocomplete once it's been created

        $( "#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_AutoComplete1").on( "autocompletecreate", function( event, ui ) {

            var $target = $(this);

            if (!isAutocompleteDone) {

                // destroy autocomplete and remake it in our image
                // this cannot run in the create callback so we async it to run shortly after
                setTimeout(function () {
                    var language = $('html').attr('lang') === 'es' ? 'Spanish' : 'English';
                    var isContains = function(){
                        return $('#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContains').prop("checked")?'contains':'begins'
                    };

                    var dictionary = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

                    // destroy the old autocomplete
                    $target.autocomplete('destroy');

                    isAutocompleteDone = true;

                    // create a new autocomplete
                    NCIAutocomplete.doAutocomplete($target,function (term) {
                        return DictionaryService.searchSuggest(dictionary, term, language, isContains())
                    });

                    // remove the change event on these radio buttons that remake autocomplete on each change
                    $('#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioStarts,#ctl34_ctl00_dictionarySearchBlock_dictionarySearchBlock_radioContains').removeAttr('onchange').off('change');


                }, 100);

            }
        });


	});
});
