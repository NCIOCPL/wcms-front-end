import './index.scss';
import AdobeAnalytics from 'Patches/AdobeAnalytics';

const cts = {
    href: '/about-cancer/treatment/clinical-trials/search',
    innerHTML: `Find A Clinical Trial`,
    classList: ['floating-delighter--cts']
};

const socialMedia = {
    href: '#',
    innerHTML: 'Social Media',
    classList: ['floating-delighter--social-media']
};

const pages = {
    '/': cts,
    '/mock/homepage': cts,
    '/about-cancer/treatment/clinical-trials/search/trial-guide': cts,
    '/about-cancer/treatment/clinical-trials/search/help': cts,
    // '/social-media': socialMedia
}

let isInitialized = false;

const getDelighterSettings = pathName => pages[pathName];

const buildDelighter = ({href, innerHTML, classList}) => {
    const delighter = document.createElement('div');
    delighter.classList.add('floating-delighter');
    classList.map(className => delighter.classList.add(className))
    const link = document.createElement('a');
    link.href = href;

    // This is a stopgap hardcoded until Analytics is brought in line. Needs to be changed this release. Ignore all ugliness (I'm looking at you Frank).
    const analyticsClickEvent = () => {
        var s = AdobeAnalytics.getSObject();
        NCIAnalytics.HomePageDelighterClick($(this), 'hp_find', s.pageName);        
    }
    link.addEventListener('click', analyticsClickEvent)

    link.innerHTML = innerHTML;
    delighter.appendChild(link);


    return delighter;
}

const init = () => {
    if(isInitialized) {
        return;
    }
    else {
        isInitialized = true;
    }

    // This regex strips the tailing slash from every path except the root
    const pathName = location.pathname.replace(/[^\^]\/$/, "").toLowerCase();
    const delighterSettings = getDelighterSettings(pathName);

    if(delighterSettings) {
        const delighterElement = buildDelighter(delighterSettings);
        const delighterSibling = document.getElementById('PageOptionsControl1');
    
        delighterSibling.insertAdjacentElement('afterend', delighterElement);
        return delighterElement;
    }

    return
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

