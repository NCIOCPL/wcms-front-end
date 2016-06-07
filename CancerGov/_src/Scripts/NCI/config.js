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
		'BasicCTS': 'UX/AppModuleSpecific/BasicCTS',
		'Vendor': 'Vendor',

		// Common.js-included vendor libraries
		'respond': 'empty:',
		'modernizr': 'empty:',
		'jquery': 'empty:',
		'jquery-ui': 'empty:',

		// local vendor libraries
		'headroom': 'Vendor/headroom',
		'routie': 'Vendor/routie',
		'placeholders': 'Vendor/placeholders.min',
		'js-cookie' : '../../../bower_components/js-cookie/src/js.cookie',

		// NOTE: DO NOT add Modernizr to this; we cannot load it with require.js

		// vendor jQuery plugins
		'jquery/headroom': 'Vendor/jQuery.headroom',
		'jquery/jplayer': 'Vendor/jquery.jplayer.min',
		'jquery/megamenu': 'Vendor/jquery-accessibleMegaMenu',
		'jquery/scrolltofixed': 'Vendor/jquery-scrolltofixed',
		'jquery/slick': 'Vendor/slick',
		'jquery/touchswipe': 'Vendor/jquery.touchSwipe.min'
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
		'jquery/touchswipe': ['jquery']
	}
});

define('jquery', [], function() {
	return jQuery;
});

define('jquery-ui', ['jquery'], function() {});
