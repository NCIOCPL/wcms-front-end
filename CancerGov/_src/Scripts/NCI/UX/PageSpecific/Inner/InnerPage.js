define(function(require) {
	require('Common/Enhancements/sharecomponent');
	require('Inner/Enhancements/showHideListingBodyField');
    var NCIAutocomplete = require('Modules/autocomplete/autocomplete');
    var DictionaryService = require('Data/DictionaryService');
		var bestBets = require('Modules/bestBets/bestBets');

	$(function() {

		require('Common/Enhancements/clinicalTrialsDelighter');
		require('Common/Enhancements/analytics.After').init();

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
		
		/* remove this code when testing complete
		$("#ui-id-2").html('<span id="ctl32_lblResultsForText">Results for:</span> <span id="ctl32_lblResultsForKeyword" class="term">ultrasound</span>')
            .after('<div class="featured sitewide-results"><h2 id="ui-id-3"><span id="ctl32_rptBestBets_ctl00_lblBBCatName">Best Bets for Ultrasound (Imaging)</span></h2><div class="managed list"><ul><li class="general-list-item general list-item"><div class="title-and-desc title desc container"><a onclick="NCIAnalytics.SiteWideSearchResults(this,true,\'1\');" class="title" href="/dictionary?cdrid=46157">Definition of Ultrasound</a></div></li><li class="general-list-item general list-item"><div class="description"><p class="body">Learn about tests and procedures that doctors might order in order to diagnose cancer.</p></div></li><li class="general-list-item general list-item"><div class="title-and-desc title desc container"><a onclick="NCIAnalytics.SiteWideSearchResults(this,true,\'3\');" class="title" href="https://imaging.cancer.gov/imaging_basics/cancer_imaging.htm">Cancer Imaging</a><div class="description"><p class="body">Imaging techniques - methods of producing pictures of the body -  play an important role in the detection, diagnosis, and treatment of cancer. This feature explains how imaging works and its many uses.</p></div></li></ul></div></div>');
						
						*/
		
		bestBets.init();
		DictionaryService.search('term', 'ultrasound', language);

	});
});
