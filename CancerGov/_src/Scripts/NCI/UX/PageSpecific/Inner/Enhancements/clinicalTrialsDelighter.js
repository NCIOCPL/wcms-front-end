define(function(require) {
    var $ = require('jquery');
    var AdobeAnalytics = require('Patches/AdobeAnalytics');

    /* Display the delighter on all pages under the /clinical-trials path, except for the search/results/view pages
     * TODO: add this as a require for landing pages as well
     * ---------------------------------------------------------------- */
    if( location.pathname.indexOf("about-cancer/treatment/clinical-trials") > -1 ) {
        if( location.pathname.indexOf("/clinical-trials/search") == -1 ) {
            var delighter = $('<div id="delighter-innerpage"><a href="/about-cancer/treatment/clinical-trials/search">Find a <br/>Clinical Trial</a></div>');
            delighter.find('a').on('click.analytics',function(e){
                var s = AdobeAnalytics.getSObject();
                NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
            });
            delighter.insertAfter('#PageOptionsControl1');
        }
    }
});
