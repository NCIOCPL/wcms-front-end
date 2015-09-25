requirejs.config({
	/**
	 * Path mappings for module names not found directly under baseUrl.
	 * @see http://requirejs.org/docs/api.html#config-paths
	 */
	paths: {
		// locations
		'app': 'app',

		// Common.js-included vendor libraries
		'respond': 'empty:',
		'modernizr': 'empty:',
		'jquery': 'empty:',
		'jquery-ui': 'empty:',

		// local vendor libraries
		'headroom': 'app/vendor/headroom',
		'routie': 'app/vendor/routie',

		// NOTE: DO NOT add Modernizr to this; we cannot load it with require.js

		// vendor jQuery plugins
		'jquery/headroom': 'app/vendor/jQuery.headroom',
		'jquery/jplayer': 'app/vendor/jquery.jplayer.min',
		'jquery/megamenu': 'app/vendor/jquery-accessibleMegaMenu',
		'jquery/scrolltofixed': 'app/vendor/jquery-scrolltofixed',
		'jquery/slick': 'app/vendor/slick',
		'jquery/touchswipe': 'app/vendor/jquery.touchSwipe.min'
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
		'jquery/headroom': ['headroom', 'jquery'],
		'jquery/jplayer': ['jquery'],
		'jquery/megamenu': ['jquery'],
		'jquery/slick': ['jquery'],
		'jquery/scrolltofixed': ['jquery'],
		'jquery/touchswipe': ['jquery']
	}
});
