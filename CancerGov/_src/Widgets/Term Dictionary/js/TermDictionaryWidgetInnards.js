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
	var svcUrl = "/TermDictionary.svc/SearchJSON/" + longLang,
		params = {
			searchTerm: searchTerm
		};

	$.getJSON(svUrl, params, function(data) {
		if (data.length === 1) {
			loadDefinition(data[0].id);
		} else {
			var terms = $('<ul>').append(
				$('<li>').html(data.length + ' ' + i18nText.results[shortLang] + ': <b>' + searchTerm + '</b>')
			);

			for (var i = 0, len = data.length; i < len; i++) {
				terms.append(
					$('<li>').html('<a href="javascript:;" onclick="loadDefinition(' + data[i].id + ');">' + data[i].item + '</a>')
				);
			}

			$('#search').val('');
			$('#output').html(terms);
		}
	});
}

function loadDefinition(id) {
	var svcUrl = "/TermDictionary.svc/GetTermDictionaryByIdJSON/" + longLang,
		params = {
			TermId: id,
			Audience: 'Patient'
		};

	$.getJSON(svUrl, params, function(data) {
		var $output = $('#output');
		$output.append($('<p>').append($('<b>').text(data.item)));
		$output.append($('<p>').html(data.TermDictionaryDetail.DefinitionHTML));
		$output.append($('<p>').append(
			$('<a>')
				.attr({
					href: i18nText.dictionaryLink[shortLang] + '?CdrID=' + data.id,
					target: "_blank"
				})
				.text(i18nText.dictionaryText[shortLang])
		));

		$('#output').scrollTop(0);
		$('#search').val('');
	});
}

function doSearch(e) {
	var searchTerm = $('#search').val();

	if ((e === null || e.keyCode === 13) && searchTerm !== '') {
		NCIAnalytics.SiteSearch(this, searchTerm);
		loadResults(searchTerm);
	}
}

function doAutocomplete(target, url, contains, queryParam, queryString, opts) {
	var appendTo = null,
		$target = $(target);
	if (target !== "#swKeyword") {
		appendTo = $target.parent();
	}
	var queryParameter = queryParam || "term",
		regexIsContains = contains || false,
		defaultOptions = {
			appendTo: appendTo,
			// Set AJAX service source
			source: (function() {
				var xhr;

				return function(request, response) {
					var dataQuery = $.extend({}, queryString || {});
					dataQuery[queryParameter] = request.term;

					if (xhr) {
						xhr.abort();
					}
					xhr = $.ajax({
						url: url,
						data: dataQuery,
						dataType: "json",
						success: function(data) {
							response(data);
						},
						error: function() {
							response([]);
						}
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
			var word = item.item.replace(regexBold, "<strong>$&</strong>");

			return $("<li></li>")
				.data('ui-autocomplete-item', item)
				.append(word)
				.appendTo(ul);
		};

	return $target;
}

// AutoComplete Stuff
$(function($) {
	var keywordElem = "#search";
	if ($(keywordElem).length === 0) {
		return;
	}
	var svcUrl = "/TermDictionary.svc/SuggestJSON/" + longLang;

	doAutocomplete(keywordElem, svcUrl, false, "term");
});
