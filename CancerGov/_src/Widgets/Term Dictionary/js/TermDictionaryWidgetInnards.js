var NCI = NCI || {};

/* BEGIN NCI.dictionary */
// TODO: require() this
/**
 * jQuery XMLHttpRequest object
 * @external jqXHR
 * @see {@link http://api.jquery.com/Types/#jqXHR}
 * @see {@link http://api.jquery.com/jQuery.ajax/#jqXHR}
 */

/**
 * NCI dictionary namespace.
 * @namespace
 */
NCI.dictionary = {
	/**
	 * Enumeration for the available dictionaries.
	 * @readonly
	 * @enum {string}
	 */
	dictionaries: {
		/** NCI Dictionary of Cancer Terms */
		term: 'term',
		/** NCI Drug Dictionary */
		drug: 'drug',
		/** NCI Dictionary of Genetic Terms */
		genetic: 'genetic'
	},

	/**
	 * Base endpoint for the dictionary webservice.
	 * @readonly
	 */
	endpoint: '/Dictionary.Service/v1',

	/**
	 * Performs a search for terms with names that start with or contain certain text.
	 * @param {NCI.dictionary.dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetic'.
	 * @param {string} searchText - The text to search for.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetic and drug dictionaries, only 'English' is valid.
	 * @param {string} [searchType='begins'] - What kind of search to perform. Valid values are: 'begins', 'contains'.
	 * @param {number} [offset=0] - Offset into the list of results for the first record to return.
	 * @param {number} [maxResults=0] - The maximum number of results to return. If a value of less than 10 is specified, maxResults is ignored and 10 is used instead.
	 * @return {external:jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service.
	 */
	search: function(dictionary, searchText, language, searchType, offset, maxResults) {
		var that = this;

		// validate `dictionary`
		if (!dictionary || // no dictionary specified
			!that.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			return $.Deferred().reject();
		}

		// validate `searchText`
		if (!searchText) { // no searchText, cannot run an empty search
			return $.Deferred().reject();
		}

		var method = 'search';
		language = language || 'English';
		searchType = searchType || 'begins';
		offset = offset || 0;
		maxResults = maxResults || 0;

		return $.getJSON(that.endpoint + '/' + method, {
			dictionary: dictionary,
			searchText: searchText,
			language: language,
			searchType: searchType,
			offset: offset,
			maxResuts: maxResults
		});
	},

	/**
	 * Lightweight method to search for terms matching searchText. This method is intended for use with autosuggest and returns a maximum of 10 results.
	 * @param {NCI.dictionary.dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetic'.
	 * @param {string} searchText - The text to search for.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetic and drug dictionaries, only 'English' is valid.
	 * @param {string} [searchType='begins'] - What kind of search to perform. Valid values are: 'begins', 'contains', 'magic'.
	 * @return {external:jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service.
	 */
	searchSuggest: function(dictionary, searchText, language, searchType) {
		var that = this;

		// validate `dictionary`
		if (!dictionary || // no dictionary specified
			!that.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			return $.Deferred().reject();
		}

		// validate `searchText`
		if (!searchText) { // no searchText, cannot run an empty search
			return $.Deferred().reject();
		}

		var method = 'searchSuggest';
		language = language || 'English';
		searchType = searchType || 'begins';

		return $.getJSON(that.endpoint + '/' + method, {
			dictionary: dictionary,
			searchText: searchText,
			language: language,
			searchType: searchType
		});
	},

	/**
	 * Performs a search for a single specific term given the term's CDR ID.
	 * @param {NCI.dictionary.dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetic'.
	 * @param {string} termID - ID of the term to retrieve.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetic and drug dictionaries, only 'English' is valid.
	 * @return {external:jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service.
	 */
	getTerm: function(dictionary, termID, language) {
		var that = this;

		// validate `dictionary`
		if (!dictionary || // no dictionary specified
			!that.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			return $.Deferred().reject();
		}

		// validate `termID`
		if (!termID) { // no termID, cannot run an empty search
			return $.Deferred().reject();
		}

		var method = 'getTerm';
		language = language || 'English';

		return $.getJSON(that.endpoint + '/' + method, {
			dictionary: dictionary,
			termId: termID,
			language: language
		});
	}
};
/* END NCI.dictionary */

/* BEGIN NCI.doAutocomplete */
// TODO: require() this
NCI.doAutocomplete = function(target, src, contains, queryParam, queryString, opts) {
	var appendTo = null,
		$target = $(target);
	if(target !== "#swKeyword") {
		appendTo = $target.parent();
	}
	var queryParameter = queryParam || "term",
		regexIsContains = contains || false,
		defaultOptions = {
			appendTo: appendTo,
			// Set AJAX service source
			source: (function() {
				var xhr;

				return function( request, response ) {
					var dataQuery = $.extend({}, queryString || {});
					var term = request.term;
					dataQuery[queryParameter] = term;

					if (xhr && xhr.abort) {
						xhr.abort();
					}
					if (typeof src === 'string') {
						xhr = $.ajax({
							url: src,
							data: dataQuery,
							dataType: 'json',
						});
					} else {
						xhr = src.call(this, term)
							.done(function(data) {
								return data.result;
							});
					}

					$.when(xhr)
						.done(function(data) {
							if(data.result) {
								response(data.result);
							} else {
								response(data);
							}
						})
						.fail(function() {
							response([]);
						});
				};
			})(),

			// Start autocomplete only after three characters are typed
			minLength: 3,

			focus: function(event, ui) {
				event.preventDefault();
				event.stopPropagation();
				$target.val(ui.item.item);
			},
			select: function(event, ui) {
				event.preventDefault();
				event.stopPropagation();
				$target.val(ui.item.item);
			}
		};

	var options = $.extend({}, defaultOptions, opts || {});

	$target.autocomplete(options)
		.data('ui-autocomplete')._renderItem = function(ul, item) {
			//Escape bad characters
			var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, '\$&');
			var regexBold = new RegExp();

			if (regexIsContains) {
				// highlight autocomplete item if it appears anywhere
				regexBold = new RegExp('(' + lterm + ')', 'i');
			} else {
				// highlight autocomplete item if it appears at the beginning
				regexBold = new RegExp('(^' + lterm + '|\\s+' + lterm + ')', 'i');
			}
			var word = (item.item || item.term).replace(regexBold, "<strong>$&</strong>");

			return $("<li></li>")
				.data('ui-autocomplete-item', item)
				.append(word)
				.appendTo(ul);
		};

	return $target;
};
/* END NCI.doAutocomplete */


var parentHostname = parentHostname || (document.referrer === "" ? location.hostname : document.referrer.match(new RegExp("(http|ftp|https)://(.*?)/.*$"))[2]);

var longLang = "English",
	shortLang = "en";
if ($('html').attr("lang") === "es") {
	longLang = "Spanish";
	shortLang = "es";
}

var i18nText = {
	results: {
		en: 'results found for',
		es: 'resultados de'
	},
	dictionaryLink: {
		en: '/publications/dictionaries/cancer-terms',
		es: '/espanol/publicaciones/diccionario'
	},
	dictionaryText: {
		en: 'For pronunciations and other information, read this definition on the NCI website.',
		es: 'Para escuchar la pronunciaci&oacute;n y ver informaci&oacute;n adicional de este t&eacute;rmino, lea la definici&oacute;n en el sitio web del NCI.'
	}
};

function loadResults(searchTerm) {
	NCI.dictionary.search('term', searchTerm, longLang)
		.done(function(data) {
			var results = data.result;
			var result;

			var terms = $('<ul>').append(
				$('<li>').html(results.length + ' ' + i18nText.results[shortLang] + ': <b>' + searchTerm + '</b>')
			);

			for (var i = 0, len = results.length; i < len; i++) {
				result = results[i];

				terms.append(
					$('<li>').html('<a href="javascript:;" onclick="loadDefinition(' + result.term.id + ');">' + result.term.term + '</a>')
				);
			}

			$('#output')
				.html(terms)
				.focus();
		});
}

function loadDefinition(id) {
	NCI.dictionary.getTerm('term', id, longLang)
		.done(function(data) {
			var result = data;

			$('#search').val('');

			$('#output')
				// reset HTML
				.html('')
				.append($('<p>').append($('<b>').text(result.term.term.item)))
				.append($('<p>').html(result.term.definition.html))
				.append($('<p>').append(
					$('<a>')
						.attr({
							href: i18nText.dictionaryLink[shortLang] + '?CdrID=' + result.term.id + '&cid=cdw_' + parentHostname,
							target: "_blank"
						})
						.html(i18nText.dictionaryText[shortLang])
						.on('click.NCI.analytics', function(e) {
							NCIAnalytics.ClickThrough(e.target);
						})
				))
				.scrollTop(0)
				.focus();
		});
}

function doSearch(e) {
	var searchTerm = $('#search').val();

	if ((e === null || e.keyCode === 13) && searchTerm !== '') {
		NCIAnalytics.SiteSearch(this, searchTerm);
		loadResults(searchTerm);
	}
}

// AutoComplete Stuff
$(function($) {
	var keywordElem = "#search";
	if ($(keywordElem).length === 0) {
		return;
	}

	NCI.doAutocomplete(keywordElem, function(term){return NCI.dictionary.searchSuggest('term', term, longLang);}, false);
});
