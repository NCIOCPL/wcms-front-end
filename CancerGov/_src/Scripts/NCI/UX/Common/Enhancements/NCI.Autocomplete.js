define(function(require) {
        /*======================================================================================================
		* function doAutocomplete
		*
		*  will generate an autocomplete box for an <input type="text"> element, using jQuery UI
		*
		* returns: null
		* parameters:
		*  !target[]            (string)(jQuery selector)    Specific(!) selector of the input to be autocompleted.
		*  !src[]               (string || function)         URL (string) or function returning a Promise of the autocomplete service.
		*  contains[false]      (boolean)                    Boolean variable describing whether the autocomplete is for "starts with" (false) or "contains" (true).
		*  queryParam["term"]   (string)                     Primary search querystring parameter.
		*  queryString{}        (object)                     Additional parts of the querystring to pass to the autocomplete service.
		*  opts{}               (object)                     Other options to pass to jQuery UI's autocomplete function.
		*
		*====================================================================================================*/
		function _doAutocomplete(target, src, contains, queryParam, queryString, opts) {
			var $ = require('jquery');

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
						$target.val(ui.item.item || ui.item.term);
					},
					select: function(event, ui) {
						event.preventDefault();
						event.stopPropagation();
						$target.val(ui.item.item || ui.item.term);
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
		}


	return {
        doAutocomplete: function(target, src, contains, queryParam, queryString, opts) {
            _doAutocomplete(target, src, contains, queryParam, queryString, opts);
        }
    };
});
