define(function(require) {
    var $script = require('scriptjs');
    require('Common/Enhancements/analytics');

    var SiteWideSearch = require('Common/Enhancements/SiteWideSearch');
    var megaMenuModule = require('Modules/megaMenu/megaMenu');
    var headroomPlugin = require('Modules/headroom/headroom');

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


        /*** END header component ***/
    })

});