define(function(require) {
    require('./PDQPage.scss');
    var $ = require('jquery');
    require('PDQ/pdqcis');
    require('Patches/Hotfixes/WCMSFEQ-243');
    $(function() {
        require('Common/Enhancements/analytics.After').init();
        require('PDQ/Enhancements/cisPrint').init();
    });
});
