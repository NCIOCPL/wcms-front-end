define(function(require) {
    require('Common/Enhancements/analytics');
    require('StyleSheets/nvcg.scss');
    require('jquery/scrollToFixed');
    require('jquery-touchswipe');

    var SiteWideSearch = require('Common/Enhancements/sitewidesearch');
    var megaMenuModule = require('Modules/megamenu/megamenu');
    var headroomPlugin = require('Modules/headroom/headroom');
    var DeepLinkPatch = require('Modules/utility/deepLinkPatch');

    // Patch to restore ui-focus-state to menu items
    $.widget( "ui.menu", $.ui.menu, {
        focus: function(event,ui){
            $('.ui-state-focus').removeClass('ui-state-focus');
            $(ui[0]).addClass('ui-state-focus');
            return this._super(null, arguments[1]);
        }
    });

    $.widget( "ui.accordion", $.ui.accordion, {
        destroy: function(){
            //jquery-ui destroy method does not remove ui-state-active from headers for some reason
            for (var i = 0; i < this.element.length; i++) {
                $(this.element[i]).find('.ui-accordion-header').removeClass('ui-state-active');
            }
            return this._super()
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

    (function() {
        DeepLinkPatch.init();
    })();

    // DOM Ready
    $(function() {
        /*** BEGIN header component ***/

        // initialize scrollToFixed plugin
        var headerHeight = $('.fixedtotop').outerHeight();
        $('.fixedtotop').scrollToFixed({
            spacerClass: 'fixedtotop-spacer',
            fixed: function () {
                $('.fixedtotop-spacer').height(headerHeight);
            }
        });

        megaMenuModule.init();

        headroomPlugin.init();

        // This initializes jQuery UI Autocomplete on the site-wide search widget.
        SiteWideSearch.init();

    })

});