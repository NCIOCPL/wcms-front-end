import './index.scss';
import AdobeAnalytics from 'Patches/AdobeAnalytics';

let isInitialized = false;

const buildDelighter = (id, href, innerHTML) => {
    const delighter = document.createElement('div');
    delighter.id = id;
    const link = document.createElement('a');
    link.href = href;
    link.innerHTML = innerHTML;
    delighter.appendChild(link);

    return delighter;
}

const init = () => {
    if(isInitialized) return;
    isInitialized = true;

    const ctsPath = '/about-cancer/treatment/clinical-trials/search';
    const pathName = location.pathname.replace(/\/$/, "").toLowerCase();
    const isHomePage = document.body.classList.contains('ncihome');
    const delighterSibling = document.getElementById('PageOptionsControl1');

    const delighter = buildDelighter('delighter-innerpage', '#', 'HELLLO');
    delighterSibling.insertAdjacentElement('afterend', delighter);

}

export default init;


// define(function(require) {
    // require('./index.scss');
    // var $ = require('jquery');
    // var AdobeAnalytics = require('Patches/AdobeAnalytics');

	// var ctsPath = '/about-cancer/treatment/clinical-trials/search';
	// var pathName = location.pathname.replace(/\/$/, "").toLowerCase();
    
    // function _initialize() {    
    //     /* Only display the delighter on the NCI Home page but not on other
    //     * pages regardless if they are using the home page template
    //     * ---------------------------------------------------------------- */
    //     if( $("body").hasClass("ncihome") ) {
    //         var delighter = $('<div id="delighter-homePage"><a href="' + ctsPath + '">Find a <br/>Clinical Trial</a></div>');
    //         delighter.find('a').on('click.analytics',function(e){
    //             var s = AdobeAnalytics.getSObject();
    //             NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
    //         });
    //         delighter.insertAfter('#PageOptionsControl1');
    //     }

    //     /* Display the delighter on all pages under the /clinical-trials path, except for the search/results/view pages
    //     * ---------------------------------------------------------------- */
    //     else if( pathName.indexOf("about-cancer/treatment/clinical-trials") > -1 ) {
    //         // if(pathName.indexOf(ctsPath) == -1 && pathName.indexOf('advanced-search') == -1 || /\/v$/.test(pathName))
    //         if(pathName.indexOf(ctsPath) == -1 && pathName.indexOf('advanced-search') == -1 ||
    //         pathName.match('/about-cancer/treatment/clinical-trials/search/trial-guide') ||
    //         pathName.match('/about-cancer/treatment/clinical-trials/search/help'))
    //         {
    //             var delighter = $('<div id="delighter-innerpage"><a href="' + ctsPath + '">Find a <br/>Clinical Trial</a></div>');
    //             delighter.find('a').on('click.analytics',function(e){
    //                 var s = AdobeAnalytics.getSObject();
    //                 NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);
    //             });
    //             delighter.insertAfter('#PageOptionsControl1');
    //         }
    //     }
    // }


// 	/**
// 	 * Identifies if this enhancement has been initialized or not.
// 	 * @type {Boolean}
// 	 */
// 	var initialized = false;

// 	/**
// 	 * Exposed functions available to this module.
// 	 */
// 	return {
// 		init: function() {
// 			if (initialized) {
// 				return;
// 			}

// 			_initialize();

// 			initialized = true;
// 		}
// 	};

// });

