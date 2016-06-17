define(function(require){
	var $ = require('jquery');
	var LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');

	// Initialization for this enhancement.
	function _initialize() {
		LiveChat.init();
		_initializeAnalytics();
		_setLiveChatLinks();
	}

	function _setLiveChatLinks(){
		// Connect the live chat delighter button to the live chat window.
		var button = $(".delighter.cts-livehelp .live-help-button");
		if(!!button){
			button.click(function(e){
				LiveChat.openChatWindow();
				// Prevent any <a> tags from firing.
				e.preventDefault();
			});
		}
		
		// Conect the inline "chat online" link to the live chat window.
		var link = $("#cgvBody .live-help-link");
		if(!!link){
			link.click(function(e){
				LiveChat.openChatWindow();
				// Prevent any <a> tags from firing.
				e.preventDefault();
			});
		}
	}

	// Attach analytics to live help chat buttons in the delighter rail.
	function _initializeAnalytics(){
		$(".delighter.cts-livehelp .live-help-button").each(function(i,el){
			$(el).click(function(e){
				if(!!NCIAnalytics && !!NCIAnalytics.RecordDelighterRailClick)
					NCIAnalytics.RecordDelighterRailClick(this, 'livehelp');
			});
		});
	}

	
	/* Flag for telling whether this enhancement has been initialized. */
	var initialized = false;
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			_initialize();

			initialized = true;
		}
	};
	
});
