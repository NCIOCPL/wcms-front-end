define(function(require){
	var $ = require('jquery');
	var LiveChat = require('BasicCTSCommon/Enhancements/LiveChat');

	// Initialization for this enhancement.
	function _initialize() {
		LiveChat.init();
		_initializeAnalytics();
		_setLiveChatLink();
	}

	// Connect the live chat delighter to the live chat window.
	function _setLiveChatLink(){
		var button = $(".delighter.cts-livehelp .live-help-button");
		if(!!button){
			button.click(function(e){
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
				console.log("delighter click recorded");
			});
			console.log("delighter connected");
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
