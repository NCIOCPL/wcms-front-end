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
		term: 'term',
		drug: 'drug',
		genetics: 'genetics'
	},

	/**
	 * Performs a search for terms with names that start with or contain certain text.
	 * @function search
	 * @param {dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetics'.
	 * @param {string} searchText - The text to search for.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetics and drug dictionaries, only 'English' is valid.
	 * @param {string} [searchType='begins'] - What kind of search to perform. Valid values are: 'begins', 'contains'.
	 * @param {number} [offset=0] - Offset into the list of results for the first record to return.
	 * @param {number} [maxResults=0] - The maximum number of results to return. If a value of less than 10 is specified, maxResults is ignored and 10 is used instead.
	 * @return {jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service. @see http://api.jquery.com/jQuery.ajax/#jqXHR for details.
	 */
	search: function(dictionary, searchText, language, searchType, offset, maxResults) {
		// validate `dictionary`
		if(!dictionary || // no dictionary specified
			!this.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			// TODO: error out properly
			return;
		}

		// validate `searchText`
		if(!searchText) { // no searchText, cannot run an empty search
			// TODO: error out properly
			return;
		}

		var svcUrl = '/DictionaryService.svc/v1/search';
		language = language || 'English';
		searchType = searchType || 'begins';
		offset = offset || 0;
		maxResults = maxResults || 0;

		return $.ajax({
			url: svcUrl,
			data: {
				dictionary: dictionary,
				searchText: searchText,
				language: language,
				searchType: searchType,
				offset: offset,
				maxResuts: maxResults
			},
			dataType: 'json'
		});
	},

	/**
	 * Lightweight method to search for terms matching searchText. This method is intended for use with autosuggest and returns a maximum of 10 results.
	 * @function search
	 * @param {dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetics'.
	 * @param {string} searchText - The text to search for.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetics and drug dictionaries, only 'English' is valid.
	 * @param {string} [searchType='begins'] - What kind of search to perform. Valid values are: 'begins', 'contains', 'magic'.
	 * @return {jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service. @see http://api.jquery.com/jQuery.ajax/#jqXHR for details.
	 */
	searchSuggest: function(dictionary, searchText, language, searchType) {
		// validate `dictionary`
		if(!dictionary || // no dictionary specified
			!this.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			// TODO: error out properly
			return;
		}

		// validate `searchText`
		if(!searchText) { // no searchText, cannot run an empty search
			// TODO: error out properly
			return;
		}

		var svcUrl = '/DictionaryService.svc/v1/searchSuggest';
		language = language || 'English';
		searchType = searchType || 'begins';

		return $.ajax({
			url: svcUrl,
			data: {
				dictionary: dictionary,
				searchText: searchText,
				language: language,
				searchType: searchType
			},
			dataType: 'json'
		});
	},

	/**
	 * Performs a search for a single specific term given the term's CDR ID.
	 * @function getTerm
	 * @param {dictionaries} dictionary - The dictionary to use for search and results. Valid values are: 'term', 'drug', 'genetics'.
	 * @param {string} termID - ID of the term to retrieve.
	 * @param {string} [language='English'] - The language to use for search and results. Valid values are: 'English', 'Spanish'. For the genetics and drug dictionaries, only 'English' is valid.
	 * @return {jqXHR} - The jQuery XHR object returned by the AJAX call to the dictionary service. @see http://api.jquery.com/jQuery.ajax/#jqXHR for details.
	 */
	getTerm: function(dictionary, termID, language) {
		// validate `dictionary`
		if(!dictionary || // no dictionary specified
			!this.dictionaries[dictionary] // dictionary specified, but not in the allowed list of dictionaries
		) {
			// TODO: error out properly
			return;
		}

		// validate `termID`
		if(!termID) { // no termID, cannot run an empty search
			// TODO: error out properly
			return;
		}

		var svcUrl = '/DictionaryService.svc/v1/getTerm';
		language = language || 'English';

		return $.ajax({
			url: svcUrl,
			data: {
				dictionary: dictionary,
				termId: termID,
				language: language
			},
			dataType: 'json'
		});
	},
};
