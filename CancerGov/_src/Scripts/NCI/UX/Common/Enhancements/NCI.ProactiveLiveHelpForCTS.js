define(function(require){
	
	var $ = require('jquery');

	// Load all the scripts for the actual chat mechanism.  The 'chat-main' alias
	// and enforcement of load-order is done through a shim-config (with paths)
	// in the main config.js.
	require('chat-main');
	
	
	var CTS_URLS = [
		"/grants-training/grants-process/mechanisms/grants",
		"/about-cancer/treatment/clinical-trials/basic"
	];

	// Which chat server should be used? Test or production.
	var HOST_SERVER="nci--tst.custhelp.com";

	var POPUP_DELAY_SECONDS = 5;	// Number of seconds to delay before displaying the popup..
	var POPUP_TITLE	= "Chat Online";
	var POPUP_MESSAGE = "\u003Cp\u003ENeed help? Would you like to speak to an NCI Information Specialist about finding a clinical trial?\u003C\/p\u003E";
	var POPUP_WIDTH = 300;
	var POPUP_HEIGHT = 300;

	var POPUP_WINDOW_ID = "ProactiveLiveHelpForCTSPrompt";	// Pop up window element's ID.

	// Initialization for the enhancement.
	function _initialize() {
		// Set up a delay for the "Do you want help?" popup.
		setTimeout(_setupPrompt, POPUP_DELAY_SECONDS * 1000);
	}

	var popupStatus = false;
	
	// Display a message prompting the user to choose whether they
	// would like to do a chat with a Live Help Specialist.
	function _setupPrompt() {
		// Scroll to top.
		$("html, body").animate({scrollTop: 0}, "slow");

					 // <form class=''><input id='rn_History_Field' type='hidden'/></form>
		var popupBody = "\u003Cform class=''\u003E\u003Cinput id='rn_History_Field' type='hidden'/\u003E\u003C/form\u003E"
			+ POPUP_MESSAGE
			// <form id="rn_ChatLaunchFormOpen_2_Form" onsubmit="return false;">
			+ "\u003Cform id=\u0022rn_ChatLaunchFormOpen_2_Form\u0022 onsubmit=\u0022return false;\u0022\u003E"
			//<div id="rn_nciChatLaunchButton_4">
			+ "\u003Cdiv id=\u0022rn_nciChatLaunchButton_4\u0022\u003E"
			//<input id="rn_nciChatLaunchButton_4_Button" type="image"  class="chat-buttons" name="cancer-info" src="/euf/assets/themes/nci/nci-img/quit-smoking-button.gif" title="Smoking Cessation Assistance" alt="Smoking Cessation Assistance"></input>
			+ "\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\n\u003Cp id=\u0022rn_nciChatLaunchButton_4_Button\u0022\u003E\n\t\u003Cinput type=\u0022button\u0022 name=\u0022rn_nciChatLaunchButton_4_Button\u0022 class=\u0022chat-buttons\u0022 value=\u0022Chat Now\u0022 \u003E\n\u003C\/p\u003E"
			// </div></form>
			+ "\u003C/div\u003E\u003C/form\u003E";
		
		// Create the pop up.
		$('body').append("<div id='" + POPUP_WINDOW_ID + "'><a id='popup-message-close'>X</a><br /><h1 class='popup-message-title'>" + POPUP_TITLE + "</h1><div id='popup-message-content'>" + popupBody + "</div></div><div id='popup-message-background'></div>");
		
		_connectChatToButton();
		
		// Attach click handler here.
		// In the for-real version, we'll probably rename "chat_button" to rn_nciChatLaunchButton_4_Button and
		// let the chat frameowrk attach to that as the trigger button.
		//jQuery("#cheat_button").click(function() {jQuery("#rn_nciChatLaunchButton_4_Button").click(); jQuery(this).unbind('click')});
		//jQuery("#rn_nciChatLaunchButton_4_Button").click(function() {alert("This is where the chat dialog would appear."); jQuery(this).unbind('click')});
		
		// Center and display the pop up.
		_centerPrompt(POPUP_WIDTH, POPUP_HEIGHT);
		_displayPrompt();
		
		// Set up event handlers for the various ways to close the pop up
		$("#popup-message-close").click(function() { _dismissPrompt(); });
		$("#popup-message-background").click(function() { _dismissPrompt(); });
		$(document).keypress(function(e) { if( e.keyCode == 27 && popupStatus == true) _dismissPrompt(); });
	}
	
	function _centerPrompt(width, height) {
		// Request data for centering.
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var popupElementID = "#" + POPUP_WINDOW_ID

		var popupWidth = 0;
		if (typeof width == "undefined") {
			popupWidth = $(popupElementID).width();
		} else {
			popupWidth = width;
		}
		var popupHeight = 0;
		if (typeof height == "undefined") {
			popupHeight = $(popupElementID).height();
		} else {
			popupHeight = height;
		}

		// Centering.
		jQuery(popupElementID).css({
			"position": "absolute",
			"width" : popupWidth + "px",
			"height" : popupHeight + "px",
			"top": windowHeight / 2 - popupHeight / 2,
			"left": windowWidth / 2 - popupWidth / 2
		});

	}

	function _displayPrompt() {
		// Loads popup only if it is disabled.
		if (popupStatus === false) {
			jQuery("#popup-message-background").css({"opacity": "0.7"});
			jQuery("#popup-message-background").fadeIn("slow");
			jQuery("#" + POPUP_WINDOW_ID).fadeIn("slow");
			popupStatus = true;
		}
	}

	function _dismissPrompt() {
		if(popupStatus === true) {
			jQuery("#popup-message-background").fadeOut("slow");
			jQuery("#" + POPUP_WINDOW_ID).fadeOut("slow");
			jQuery('#popup-message-content').empty().remove();
			popupStatus = false;
		}
	}

	function _connectChatToButton() {
		RightNow.Url.setParameterSegment(5);
		RightNow.Interface.Constants =
		{"ACTION_ADD":1,"ANY_FILTER_VALUE":"~any~","EUF_DT_CHECK":12,"EUF_DT_DATE":1,"EUF_DT_DATETIME":2,"EUF_DT_FATTACH":11,"EUF_DT_HIERMENU":9,"EUF_DT_INT":5,"EUF_DT_MEMO":6,"EUF_DT_PASSWORD":7,"EUF_DT_RADIO":3,"EUF_DT_SELECT":4,"EUF_DT_THREAD":10,"EUF_DT_VARCHAR":8,"INT_NULL":-2147483647,"CAN_USE_ARIA":false,"API_VALIDATION_REGEX_EMAIL":"((([-_!#$%&'*+\/=?^~`{|}\\w]+([.][-_!#$%&'*+\/=?^~`{|}\\w]*)*)|(\"[^\"]+\"))@[0-9A-Za-z]+([\\-]+[0-9A-Za-z]+)*(\\.[0-9A-Za-z]+([\\-]+[0-9A-Za-z]+)*)+[;, ]*)+"};
		YAHOO.util.Event.throwErrors = true;
		RightNow.Interface.setMessagebase(function(){return {"WARNING_LBL":"Warning","INFORMATION_LBL":"Information","HELP_LBL":"Help","ERROR_REQUEST_ACTION_COMPLETED_MSG":"There was an error with the request and the action could not be completed.","OK_LBL":"OK","DIALOG_LBL":"dialog","DIALOG_PLEASE_READ_TEXT_DIALOG_MSG_MSG":"dialog, please read above text for dialog message","BEG_DIALOG_PLS_DISMISS_DIALOG_BEF_MSG":"Beginning of dialog, please dismiss dialog before continuing","END_DIALOG_PLS_DISMISS_DIALOG_BEF_MSG":"End of dialog, please dismiss dialog before continuing","ERR_SUBMITTING_FORM_DUE_INV_INPUT_LBL":"There was an error submitting the form due to invalid input","ERR_SUBMITTING_SEARCH_MSG":"There was a problem with your request.  Please change your search terms and try again.","CLOSE_CMD":"Close","BACK_LBL":"Back","FOLLOWING_WIDGET_JAVASCRIPT_SYNTAX_MSG":"The following widget JavaScript either has a syntax error or its class name is not correct: ","YOU_HAVE_PCT_D_WARNINGS_PAGE_LBL":"You have %d warnings on this page","YOU_HAVE_ONE_WARNING_PAGE_LBL":"You have 1 warning on this page.","YOU_HAVE_PCT_D_ERRORS_PAGE_LBL":"You have %d errors on this page.","YOU_HAVE_ONE_ERROR_PAGE_LBL":"You have 1 error on this page.","CHAT_IS_NOT_AVAILABLE_MSG":"Chat is not available."};});
		RightNow.Interface.setConfigbase(function(){return {"DE_VALID_EMAIL_PATTERN":"^(([-!#$%&'*+\/=?^~`{|}\\w]+(\\.[-!#$%&'*+\/=?^~`{|}\\w]+)*)|(\"[^\"]+\"))@[0-9A-Za-z]+(-[0-9A-Za-z]+)*(\\.[0-9A-Za-z]+(-[0-9A-Za-z]+)*)+$","CP_HOME_URL":"home","CP_FILE_UPLOAD_MAX_TIME":300,"OE_WEB_SERVER":HOST_SERVER};});
		YAHOO.util.Event.onDOMReady(function(){this.Dialog.setRenderDiv(); this.prepareVirtualBufferUpdateTrigger(); this.ariaHideFrames();}, null, RightNow.UI);
		YAHOO.util.Event.onDOMReady(function(){
		var W = RightNow.Widget,
		c = 'createWidgetInstance';
		W[c]({"i":{"c":"nciChatLaunchButton","n":"nciChatLaunchButton_4","w":4},"a":{"label_button":"Smoking Cessation Assistance","loading_icon_path":"images\/indicator.gif","chat_landing_page":"\/app\/chat\/chat_landing","launch_width":380,"launch_height":560,"error_location":"rn_ErrorLocation","open_in_new_window":true,"protocol_selection":"auto","post_contact_fields":false,"button_type":"quitting_smoking"},"j":{"chatWindowName":"nci__tst1","baseUrl":"https:\/\/" + HOST_SERVER,"isLoggedIn":false,"buttonType":"quitting_smoking","disabled_img":"\/euf\/assets\/themes\/nci\/nci-img\/cis-livehelp-quitsmoking-onlick-button.gif","img":"\/euf\/assets\/themes\/nci\/nci-img\/quit-smoking-button.gif"}},'nciChatLaunchButton_4','custom/chat/nciChatLaunchButton','nciChatLaunchButton','4',true);
		RightNow.Url.transformLinks();});

		var _rnq=_rnq||[];_rnq.push({"debug":true,"s":"VYzjzadm","uh":"af25197a","uc":HOST_SERVER + "\/app\/chat\/chat_launch","b":"ca99729","i":"nci__tst:nci","f":"rnw","p":"Customer Portal","v":"14.2.0.1-b131-sp5","th":"www.rnengage.com"});
		(function(f){var b,d,a=document.createElement("iframe"),c=document.getElementsByTagName("script");a.src="javascript:false";a.title="";a.role="presentation";(a.frameElement||a).style.cssText="width:0;height:0;border:0";c=c[c.length-1];c.parentNode.insertBefore(a,c);try{b=a.contentWindow.document}catch(g){d=document.domain,a.src="javascript:var d=document.open();d.domain='"+d+"';void(0);",b=a.contentWindow.document}b.open()._l=function(){for(var a;f.length;)a=this.createElement("script"),d&&(this.domain=
		d),a.src=f.pop(),this.body.appendChild(a)};b.write('<body onload="document._l();">');b.close()})(["https://www.rnengage.com/api/e/ca99729/e.js","//www.rnengage.com/api/1/javascript/acs.debug.js"]);

	}
	
	/* Flag for telling whether this enhancement has been initialized. */
	var initialized = false;

	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(initialized)
				return;

			if(CTS_URLS.find(function(url){return url === location.pathname.toLowerCase();})) {
				_initialize();

				initialized = true;
			}
		}
	};
});
