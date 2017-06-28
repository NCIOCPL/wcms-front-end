define(function (require) {


	// Add dependencies for this module
	var $ = require('jquery');
	var DictionaryService = require('Data/DictionaryService');
	var config = require('Modules/NCI.config');

	// Module variables
	// var publicVar = 'example',
	//    _privateVar = 'example',
	var _initialized = false;


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
	var _fetchTerm = function () {
		var searchParam = $('.results .term:first').text()
		return searchParam;
	};

	var _getDefinition = function (term) {
		var language = $('html').attr('lang') === 'es' ? 'Spanish' : 'English';
		return DictionaryService.search('term', _fetchTerm(), language);
	};

	var _render = function (obj) {
		console.log("inside render with:", obj);
		var term = obj.term;
		var definition = obj.definition.html;
		var definitionStart = obj.definition.html.substring(0, obj.definition.html.indexOf('. ') + 1);
		var definitionEnd = obj.definition.html.replace(definitionStart, '');
		var audio = "";
		var pronunciation = "";
		if (obj.pronunciation) {
			audio = obj.pronunciation.audio;
			pronunciation = obj.pronunciation.key;
		}
		var toggle = '<div id="best-bets-toggle"><a href="#"><span id="definition-arrow"></span><span id="definitionShowHide">Show</span> full definition</a></div>';
		var box = '<div id="best-bet-definition"><h2>Definition:</h2><dl><dt>' + term + '</dt><dd><a href="' + audio + '" class="CDR_audiofile"><span class="hidden">listen</span></a> ' + pronunciation + ' </dd><dd><span>' + definitionStart + '</span><span id="definitionEnd">' + definitionEnd + '</span></dd></dl>' + moreInfo() + toggle + ' </div><div id="dictionary_jPlayer"></div>';
		if ($('.featured.sitewide-results')[0]) {
			var wrapper = $('<div class="large-4 small-12 columns collapse">' + box + '</div>');
			var target = $('.featured.sitewide-results');
			target.wrapInner('<div class="large-8 small-12 columns collapse"></div>').append(wrapper);
		} else {
			var wrapper = $('<div>' + box + '</div>');
			var target = $('.sitewide-results');
			wrapper.insertBefore(target);
		}
		$("#best-bets-toggle a").on("click", function (event) {
			event.preventDefault();
			var $this = $(this);
			if ($this.is('.expanded')) {
				$('#definitionEnd').hide();
				$this.removeClass('expanded'); 
				$('#definitionShowHide').text('Show');
			} else {
				$('#definitionEnd').show();
				$this.addClass('expanded');
				$('#definitionShowHide').text('Hide');
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
				return '<p><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms?CdrID=' + obj.id + '">More information on dictionary page</a></p>';
			} else {
				return '';
			}
		}

		function displayContent() {
			// choose how to display the dictionary window
			var windowWidth = window.innerWidth || $(window).width();
			if (windowWidth > config.breakpoints.medium) {
				//Add your javascript for large screens here 
				console.log('bigger');
			} else {
				//Add your javascript for small screens here 
				console.log('smaller');
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
