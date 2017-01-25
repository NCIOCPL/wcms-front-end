define(function(require) {
    var $ = require('jquery');
    require('Patches/Hotfixes/WCMSFEQ-243');
    require('PDQ/pdqcis');
    $(function() {
        require('Common/Enhancements/analytics.After').init();
        require('PDQ/Enhancements/cisPrint').init();
    });
});
