/*!
 * jQuery UI Widget-factory plugin for autosuggest text boxes that allow a user to type
 * ahead, and select a single item from a list of items.
 * Author: @bryanp
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui"], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    return $.widget("nci.highlighterautocomplete", $.ui.autocomplete, {
        //override options.  Let's make sure we don't break things...
        options: {
            minLength: 3,
            fetchSrc: null,
            contains:false,
            queryParam: 'term',
            queryString: {},
            appendTo: 'appendTo',
            focus: function(event, ui) {
                event.preventDefault();
                event.stopPropagation();
                $(this).val(ui.item.item || ui.item.term);
            },
            select: function(event, ui) {
                event.preventDefault();
                event.stopPropagation();
                $(this).val(ui.item.item || ui.item.term);
            },
            // Set AJAX service source
            source: (function() {
                var xhr;

                return function( request, response ) {
                    var src = this.options.fetchSrc;
                    var dataQuery = $.extend({}, this.options.queryString || {});
                    var term = request.term;
                    dataQuery[this.options.queryParam] = term;

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
            })()            
        },
        _renderItem : function(ul, item) {
            //Escape bad characters
            var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, '\$&');
            var regexBold = new RegExp();

            if (this.options.contains) {
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

        }
    });

}));