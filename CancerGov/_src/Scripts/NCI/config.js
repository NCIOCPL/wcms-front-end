requirejs.config({
	/**
	 * Path mappings for module names not found directly under baseUrl.
	 * @see http://requirejs.org/docs/api.html#config-paths
	 */
	paths: {
		// locations
		'Common': 'UX/Common',
		'CTHP': 'UX/PageSpecific/CTHP',
		'Home': 'UX/PageSpecific/Home',
		'Inner': 'UX/PageSpecific/Inner',
		'Landing': 'UX/PageSpecific/Landing',
		'PDQ': 'UX/PageSpecific/PDQ',
		'Topic': 'UX/PageSpecific/Topic',
		//So the following are required because of how a stand-alone require
		//file gets built.  At the end it calls require('JSNAME') and if it 
		//is not in this file, then require looks for it relative to the 
		//current page.  Absolutely silly, but oh well.  
		'BasicCTSSearch': 'UX/AppModuleSpecific/BasicCTS/Search',
		'BasicCTSResults': 'UX/AppModuleSpecific/BasicCTS/Results',
		'BasicCTSView': 'UX/AppModuleSpecific/BasicCTS/View',
		'BasicCTSCommon': 'UX/AppModuleSpecific/BasicCTS/Common',
		'BasicCTSPrint': 'UX/AppModuleSpecific/BasicCTS/Print',
		'Vendor': 'Vendor',
		'generated' : 'Generated',

		// Common.js-included vendor libraries
		'respond': 'empty:',
		'modernizr': 'empty',
		'jquery': 'empty:',
		'jquery-ui': 'empty:',

		// local vendor libraries
		'headroom': 'Vendor/headroom',
		'routie': 'Vendor/routie',
		'placeholders': 'Vendor/placeholders.min',
		'js-cookie' : '../../../bower_components/js-cookie/src/js.cookie',
		'spin': '../../../bower_components/spin.js/spin',
		'Spinner': '../../../bower_components/spin.js/jquery.spin',
		'brite':'../../../bower_components/britejs/dist/brite',
		'hbs':'../../../bower_components/require-handlebars-plugin/hbs',

		// NOTE: DO NOT add Modernizr to this; we cannot load it with require.js

		// vendor jQuery plugins
		'jquery/headroom': 'Vendor/jQuery.headroom',
		'jquery/jplayer': 'Vendor/jquery.jplayer.min',
		'jquery/megamenu': 'Vendor/jquery-accessibleMegaMenu',
		'jquery/scrolltofixed': 'Vendor/jquery-scrolltofixed',
		'jquery/slick': 'Vendor/slick',
		'jquery/touchswipe': 'Vendor/jquery.touchSwipe.min',
		'jquery/throttledebounce': 'Vendor/jquery.ba-throttle-debounce.min'
	},
	/**
	 * Configure the dependencies, exports, and custom initialization for older, traditional "browser globals" scripts that do not use define() to declare the dependencies and set a module value.
	 * @see http://requirejs.org/docs/api.html#config-shim
	 */
	shim: {
		// vendor libraries
		'headroom': {
			exports: 'Headroom'
		},
		'routie': {
			exports: 'routie'
		},

		// NOTE: DO NOT add Modernizr to this; we cannot load it with require.js

		// vendor jQuery plugins
		'jquery/headroom': ['Patches/Vendor/headroom_patch', 'jquery'],
		'jquery/jplayer': ['jquery'],
		'jquery/megamenu': ['jquery'],
		'jquery/slick': ['jquery'],
		'jquery/scrolltofixed': ['jquery'],
		'jquery/touchswipe': ['jquery'],
		'jquery/throttledebounce': ['jquery']
	},
	hbs: {
		helpers: true,
		templateExtension: 'hbs',
		partialUrl: ''
	}
});

define('jquery', [], function() {
	return jQuery;
});

define('jquery-ui', ['jquery'], function() {});

define('brite', [], function() { return brite});
