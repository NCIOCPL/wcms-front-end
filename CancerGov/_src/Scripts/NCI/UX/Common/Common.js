define(function(require) {
    var $script = require('scriptjs');
    require('Common/Enhancements/analytics');

    var SiteWideSearch = require('Common/Enhancements/SiteWideSearch');
    var megaMenuModule = require('Modules/megaMenu/megaMenu');
    var headroomPlugin = require('Modules/headroom/headroom');

    // Patch to restore ui-focus-state to menu items
    $.widget( "ui.menu", $.ui.menu, {
        focus: function(event,ui){
            $('.ui-state-focus').removeClass('ui-state-focus');
            $(ui[0]).addClass('ui-state-focus');
            return this._super(null, arguments[1]);
        }
    });

    $.widget( "ui.autocomplete", $.ui.autocomplete, {
        _renderItem: function(ul,item){
            var lterm = this.term.replace(/[-[\]{}()*+?.,\^$|#\s]/g, '\$&');

            regexBold = new RegExp('(' + lterm + ')', 'i');
            var word = (item.value || item.term).replace(regexBold, "<strong>$&</strong>");

            return $("<li>")
                .data('data-value', item.value)
                .append(word)
                .appendTo(ul);
        }
    });

    jQuery(document).ready(function(jQuery) {
        /*** BEGIN header component ***/

        $script('//cdnjs.cloudflare.com/ajax/libs/ScrollToFixed/1.0.8/jquery-scrolltofixed-min.js', function () {
            // initialize scrollToFixed plugin
            var headerHeight = $('.fixedtotop').outerHeight();
            $('.fixedtotop').scrollToFixed({
                spacerClass: 'fixedtotop-spacer',
                fixed: function () {
                    $('.fixedtotop-spacer').height(headerHeight);
                }
            });
        });

        megaMenuModule.init();

        headroomPlugin.init();

        // This initializes jQuery UI Autocomplete on the site-wide search widget.
        SiteWideSearch.init();

    })

});