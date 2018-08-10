define(function (require) {
	var NCI = {

		dictionary: require('Data/DictionaryService'),

		// doAutocomplete is used in backend JavaScript placed on the dictionary terms page "/publications/dictionaries/cancer-terms"
		doAutocomplete: require('Modules/autocomplete/autocomplete').doAutocomplete,

		window: {}
	};

	window.NCI = NCI;

	return NCI;
});
