define(function(require) {
    var $ = require('jquery');
    var AdobeAnalytics = require('Patches/AdobeAnalytics');

    /* Only display the delighter on the NCI Home page but not on other
     * pages regardless if they are using the home page template
     * ---------------------------------------------------------------- */
    if( location.pathname.indexOf("about-cancer/treatment/clinical-trials/") > -1 ) {
        var delighter = $('<div id="delighter-innerpage"><a href="/about-cancer/treatment/clinical-trials/search">Find a <br/>Clinical Trial</a></div>');
        delighter.find('a').on('click.analytics',function(e){
            var s = AdobeAnalytics.getSObject();
            NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
        });
        delighter.insertAfter('#PageOptionsControl1');
    }
});
