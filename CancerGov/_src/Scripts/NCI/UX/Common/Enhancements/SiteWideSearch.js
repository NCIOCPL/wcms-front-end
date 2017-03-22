/*** BEGIN Site-Wide Search
   * This initializes jQuery UI Autocomplete on the site-wide search widget.
***/
define(function(require) {
    var jQuery = require('jquery');
    var NCIAutocomplete = require('Modules/autocomplete/autocomplete');
    var initialized = false;

    function _initialize() {
        require('jquery-ui');

        var newWidth = window.innerWidth || $(window).width(),
            oldWidth = newWidth;

        var language = "English";
        if ($('html').attr("lang") === "es") {
            language = "Spanish";
        }

        var keywordElem = "#swKeyword";
        if ($(keywordElem).length === 0) {
            return;
        }
        var svcUrl = "/AutoSuggestSearch.svc/SearchJSON/" + language;


        var setAutocompleteOptions = function(element) {
            var windowWidth = window.innerWidth || $(window).width(),
                position,
                resizeMenu;

            if(windowWidth <= NCI.Breakpoints.large) {
                // if mobile, make the autocomplete list full-width
                position = {
                    my: "left top",
                    at: "left bottom",
                    of: "#nvcgSlMainNav"
                };

                resizeMenu = function() {
                    this.menu.element.outerWidth("100%");
                };
            } else {
                // if desktop, make the autocomplete list work as default
                position = $.ui.autocomplete.prototype.options.position;
                resizeMenu = $.ui.autocomplete.prototype._resizeMenu;
            }

            $(element).autocomplete('option', 'position', position)
                .data('ui-autocomplete')._resizeMenu = resizeMenu;
        };

        NCIAutocomplete.doAutocomplete(keywordElem, svcUrl, false, "term");
        setAutocompleteOptions(keywordElem);

        $(window).on('resize.NCI.search', function() {
            setAutocompleteOptions(keywordElem);

            $(keywordElem).autocomplete('close');
        });
        
        initialized = true;
    }   
	
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			_initialize();

			initialized = true;
		}
	};
});

/*** END Site-Wide Search ***/
