define(function(require) {
    var $ = require('jquery');
	var AdobeAnalytics = require('Patches/AdobeAnalytics');
	var ctsPath = '/about-cancer/treatment/clinical-trials/search';
	var pathName = location.pathname.replace(/\/$/, "");
	
    /* Only display the delighter on the NCI Home page but not on other
     * pages regardless if they are using the home page template
     * ---------------------------------------------------------------- */
    if( $("body").hasClass("ncihome") ) {
		var delighter = $('<div id="delighter-homePage"><a href="' + ctsPath + '">Find a <br/>Clinical Trial</a></div>');
		delighter.find('a').on('click.analytics',function(e){
			var s = AdobeAnalytics.getSObject();
			NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
		});
		delighter.insertAfter('#PageOptionsControl1');
	}

	/* Display the delighter on all pages under the /clinical-trials path, except for the search/results/view pages
     * ---------------------------------------------------------------- */
    else if( pathName.indexOf("about-cancer/treatment/clinical-trials") > -1 ) {
		if(pathName.indexOf(ctsPath) == -1 && pathName.indexOf('advanced-search') == -1 || /\/v$/.test(pathName))
		{
            var delighter = $('<div id="delighter-innerpage"><a href="' + ctsPath + '">Find a <br/>Clinical Trial</a></div>');
            delighter.find('a').on('click.analytics',function(e){
                var s = AdobeAnalytics.getSObject();
                NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
            });
            delighter.insertAfter('#PageOptionsControl1');
        }
    }	

});

