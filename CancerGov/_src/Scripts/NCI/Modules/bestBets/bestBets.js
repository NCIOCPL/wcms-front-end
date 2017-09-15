define(function (require) {


	// Add dependencies for this module
	var $ = require('jquery');
	var DictionaryService = require('Data/DictionaryService');
	var config = require('Modules/NCI.config');

	// Module variables
	// var publicVar = 'example',
	//    _privateVar = 'example',
	var _initialized = false;
	var lang = $('html').attr('lang') || 'en'; // set the language


	// Intended as a public function
	var _initialize = function (settings) {

		var term = _fetchTerm();
		$.when(_getDefinition(term)).done(function (termObject) {

			console.log(termObject);
			if (termObject.result.length > 0) {
				_render(termObject.result[0].term);
			}
		});

	};

	//Intended as a private function
	// get the term from the search results page within the results class
	var _fetchTerm = function () {
		var searchParam = $('.results .term:first').text();
		return searchParam;
	};

	// get the full definition from the dictionary service
	var _getDefinition = function (term) {
		return DictionaryService.search('term', _fetchTerm(), language);
	};

	// render the defintion to produce the content and html
	var _render = function (obj) {
		console.log("inside render with:", obj);
		var term = '<dt>' + obj.term + '</dt>';
		var audio = "";
		var pronunciation = "";
		
		// check if pronunciation exists before building the audio and pronunciation of the definition
		if (obj.pronunciation) {
			audio = '<a href="' + obj.pronunciation.audio + '" class="CDR_audiofile"><span class="hidden">listen</span></a> ';
			pronunciation = obj.pronunciation.key;
		}
		// toggle controls whether to show first sentence or full definition in mobile
		var toggle = '<div id="best-bets-toggle"><a href="#"><span id="definition-arrow"></span><span id="definitionShowHide">' + config.lang.Show[lang] + '</span> ' + config.lang.Definition_Show_Full[lang] + '</a></div>';
	
		var definition = obj.definition.html;
		// break the definition into first sentence and rest for display in mobile
		var definitionStart =  obj.definition.html.slice(0, definition.indexOf('. ') + 1);
		var definitionEnd = obj.definition.html.slice(definition.indexOf('. ') + 1);
		
		// in cases where there is only one sentence, assign it to first and make the rest an empty string
		if (definitionStart === '') {
			definitionStart = '<span id="definitionStart">' + definition + '</span>';
			definitionEnd = '';
			toggle = '';
		}
		else {
			definitionStart = '<span id="definitionStart">' + definitionStart + '</span>';
			definitionEnd = '<span id="definitionEnd">' + definitionEnd + '</span>';
		}
		

		console.log("definitionStart is:" + definitionStart);
		console.log("definitionEnd is:" + definitionEnd);
		
		// the box takes all the components and puts them together in the defintion box
		var box = '<div id="best-bet-definition"><h2>' + config.lang.Definition_Title[lang] + ':</h2><dl>' + term + '<dd>' + audio + pronunciation + ' </dd><dd>' + definitionStart + definitionEnd + moreInfo() + '</dd></dl>'  + toggle + ' </div><div id="dictionary_jPlayer"></div>';
		
		// html rules for within best bets
		if ($('.featured.sitewide-results')[0]) {
			var wrapper = $('<div class="large-4 small-12 columns collapse">' + box + '</div>');
			var target = $('.featured.sitewide-results');
			target.wrapInner('<div class="large-8 small-12 columns collapse"></div>').append(wrapper);
		// html rules for not within best bets
		} else {
			var wrapper = $('<div>' + box + '</div>');
			var target = $('.sitewide-results');
			wrapper.insertBefore(target);
		}
		// functionality for changing from compact to full definition in mobile
		var areWeExpanded = "yes";
		$("#best-bets-toggle a").on("click", function (event) {
			event.preventDefault();
			var $this = $(this);
			if ($this.is('.expanded')) {
				$('#definitionEnd').hide(250);
				$this.removeClass('expanded');
				$('#definitionShowHide').text(config.lang.Show[lang]);
				
			} else {
				$('#definitionEnd').show(250);
				$this.addClass('expanded');
				$('#definitionShowHide').text(config.lang.Hide[lang]);
			}
		});
		



		if (jQuery.jPlayer && !Modernizr.touch) {

			var my_jPlayer = $("#dictionary_jPlayer");

			my_jPlayer.jPlayer({
				swfPath: "/PublishedContent/files/global/flash/", //Path to SWF File Used by jPlayer
				//errorAlerts: true,
				supplied: "mp3" //The types of files which will be used.
			});

			//Attach a click event to the audio link
			$("a.CDR_audiofile").click(function (e) {
				e.preventDefault();
				my_jPlayer.jPlayer("setMedia", {
					mp3: $(this).attr("href") // Defines the m4v url
				}).jPlayer("play");
			});
		}

		function moreInfo() {
			// issue, some objects don't exist for some definitons, produces an error. I answered by checking for existance and then length
			if ((obj.videos && obj.videos.length > 0) || (obj.images && obj.images.length > 0) || (obj.related_drug_summary && obj.related.drug_summary.length > 0) || (obj.related.external && obj.related.external.length > 0) || (obj.related.summary && obj.related.summary.length > 0) || (obj.related.term && obj.related.term.length > 0)) {
				if (lang === "es") {
					return '<p id="moreInfo"><a href="https://www.cancer.gov/espanol/publicaciones/diccionario?CdrID=' + obj.id + '">' + config.lang.Dictionary_More_Information[lang] + '</a></p>';
				}
				else {
					return '<p id="moreInfo"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms?CdrID=' + obj.id + '">' + config.lang.Dictionary_More_Information[lang] + '</a></p>';
				}
			} else {
				return '';
			}
		}
	};

	/**
	 * Exposed functions and variables of this module.
	 */
	return {
		init: function (settings) {
			if (!_initialized) {
				_initialize(settings);
			}
		}
	};

});
