define(function(require) {
    var $ = require('jquery');
	var AdobeAnalytics = require('Patches/AdobeAnalytics');

    var delighter = $('<div id="delighter-homePage"><a href="/about-cancer/treatment/clinical-trials/search">Find a <br/>Clinical Trial</a></div>');
    delighter.find('a').on('click.analytics',function(e){
		var s = AdobeAnalytics.getSObject();
        NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
    });
    delighter.insertAfter('#PageOptionsControl1');

});