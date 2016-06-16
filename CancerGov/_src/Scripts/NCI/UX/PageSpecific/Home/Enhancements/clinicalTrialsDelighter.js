define(function(require) {
    var $ = require('jquery');

    var delighter = $('<div id="delighter-homePage"><a href="/about-cancer/treatment/clinical-trials/search">Find a <br/>Clinical Trial</a></div>');
    delighter.find('a').on('click.analytics',function(e){
        var pageName = document.location.hostname + document.location.pathname;
        NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', pageName);
    });
    delighter.insertAfter('#PageOptionsControl1');

});