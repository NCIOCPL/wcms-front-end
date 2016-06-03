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

		// NOTE: DO NOT add Modernizr to this; we cannot load it with require.js

		// vendor jQuery plugins
		'jquery/headroom': 'Vendor/jQuery.headroom',
		'jquery/jplayer': 'Vendor/jquery.jplayer.min',
		'jquery/megamenu': 'Vendor/jquery-accessibleMegaMenu',
		'jquery/scrolltofixed': 'Vendor/jquery-scrolltofixed',
		'jquery/slick': 'Vendor/slick',
		'jquery/touchswipe': 'Vendor/jquery.touchSwipe.min',
		
		// Support files for the RightNow chat button in the Clinical Trial Search
		// proactive chat button.  These must be loaded in the order listed.
		'chat-yahoo-dom' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/yahoo-dom-event/yahoo-dom-event',
		'chat-conn' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/connection/connection-min',
		'chat-anim' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/animation/animation-min',
		'chat-yui-container' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/container/container-min',
		'chat-yui-hist' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/history/history-min',
		'chat-yui-json' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/json/json-min',
		'chat-yui-elem' : 'https://livehelp.cancer.gov/rnt/rnw/yui_2.7/element/element-min',
		'chat-rn' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow',
		'chat-rn-ajax' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Ajax',
		'chat-rn-text' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Text',
		'chat-rn-ui' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.UI',
		'chat-rn-abuse' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.UI.AbuseDetection',
		'chat-rn-url' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Url',
		'chat-rn-event' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/RightNow.Event',
		'chat-rn-tree' : 'https://livehelp.cancer.gov/euf/rightnow/debug-js/TreeViewAriaPlugin',
		'chat-main' : 'https://livehelp.cancer.gov/cgi-bin/nci.cfg/php/euf/application/development/source/widgets/custom/chat/nciChatLaunchButton/logic'
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

		// Support files for the RightNow chat button in the Clinical Trial Search
		// proactive chat button.  These must be loaded in the order listed.
		'chat-conn' : 			['chat-yahoo-dom'],
		'chat-anim' : 			['chat-conn'],
		'chat-yui-container' :	['chat-anim'],
		'chat-yui-hist' : 		['chat-yui-container'],
		'chat-yui-json' : 		['chat-yui-hist'],
		'chat-yui-elem' : 		['chat-yui-json'],
		'chat-rn' : 			['chat-yui-elem'],
		'chat-rn-ajax' : 		['chat-rn'],
		'chat-rn-text' : 		['chat-rn-ajax'],
		'chat-rn-ui' : 			['chat-rn-text'],
		'chat-rn-abuse' : 		['chat-rn-ui'],
		'chat-rn-url' : 		['chat-rn-abuse'],
		'chat-rn-event' : 		['chat-rn-url'],
		'chat-rn-tree' : 		['chat-rn-event'],
		'chat-main' : 			['chat-rn-tree']
		
	}
});

define('jquery', [], function() {
	return jQuery;
});

define('jquery-ui', ['jquery'], function() {});
