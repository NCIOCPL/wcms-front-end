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
									dataType: 'json'
								});
							} else {
								xhr = src.call(this, term)
									.done(function(data) {
										return data.result;
									});
							}

							$.when(xhr)
								.done(function(data) {
									// console.log(data);
									if(data.result) {
										response(data.result);
									} else {
										var values = [];
                                        for(var i = 0; i < data.length; i++){
                                        	values.push(data[i].item);
                                        }

										response(values);
									}
								})
								.fail(function() {
									response([]);
								});
						};
					})(),

					// Start autocomplete only after three characters are typed
					minLength: 3
				};

			var options = $.extend({}, defaultOptions, opts || {});

			$target.autocomplete(options);

			return $target;
		}


	return {
        doAutocomplete: function(target, src, contains, queryParam, queryString, opts) {
            _doAutocomplete(target, src, contains, queryParam, queryString, opts);
        }
    };
});
