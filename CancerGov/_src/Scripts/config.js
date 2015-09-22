requirejs.config({
	/**
	 * Path mappings for module names not found directly under baseUrl.
	 * @see http://requirejs.org/docs/api.html#config-paths
	 */
	paths: {
		// locations
		'app': 'app',
		'build': 'build',

		// CDN vendor libraries
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min',
		'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',

		// local vendor libraries
		'headroom': 'app/vendor/headroom',
		'respond': 'app/vendor/respond',
		'routie': 'app/vendor/routie',
		'slick': 'app/vendor/slick',

		// vendor jQuery plugins
		'jquery/headroom': 'app/vendor/jQuery.headroom',
		'jquery/jplayer': 'app/vendor/jquery.jplayer.min',
		'jquery/megamenu': 'app/vendor/jquery-accessibleMegaMenu',
		'jquery/scrolltofixed': 'app/vendor/jquery-scrolltofixed',
		'jquery/touchswipe': 'app/vendor/jquery-touchSwipe.min'
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
		'respond': {
			exports: 'respond'
		},
		// vendor jQuery plugins
		'jquery/headroom': ['headroom', 'jquery'],
		'jquery/scrolltofixed': ['jquery'],
		'jquery/megamenu': ['jquery'],
		'jquery/touchswipe': ['jquery']
	}
});
