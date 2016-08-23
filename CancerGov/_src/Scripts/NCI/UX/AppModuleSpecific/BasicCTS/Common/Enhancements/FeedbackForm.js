define(function(require){
    var $ = require('jquery');
    require('jquery-ui');

    function _openFeedbackForm($delighterControl) {
        var $dialog = $delighterControl.data("feedbackdialog");

        if (!$dialog) {
            $dialog = _createDialog();
            $delighterControl.data('feedbackdialog', $dialog);
        }

        $dialog.dialog('open');
        
    }

    /**
     * Create the feedback dialog
     * 
     * @returns    
     */
    function _createDialog() {

        var action = '/Feedback.Service'; 

        var $form = $('<form></form>', {
            name: 'ctsFeedback'
        });
        
        _addHidden($form, '__recipient', value='CTSFeedbackRecipient');
        var $messageInput = _addField($form);
        _addSubmit($form);


        $form.on('submit',function(event) {
            event.preventDefault();
            //loading gif
            _submitFeedback(action, $messageInput.val());   
            //close dialog 
        });

        var dialog = $('<div>').append($form).dialog({
            dialogClass: 'cts-feedback-dialog',
            title: 'Send us your feedback',
            autoOpen: false,
            modal: true,
            resizable: false,
            width: '600px'
        });
        return dialog;
    }

    /**
     * Submits the form feedback
     * 
     * @param {any} action
     * @param {any} content
     */
    function _submitFeedback(action, content) {        

        $.ajax({
            type: "POST",
            url: action,
            data: JSON.stringify({
                Message: content,
                URL: window.location.pathname + window.location.search,
                MailRecipiantKey: 'CTSFeedbackRecipient'
            }),
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            encode: true
        }).done(function(data) {
            //Show thank you message?
            
        }).error(function(err) {
            //Show error message on dialog.
            console.log(err);
        })
    }

    function _addHidden($form, name, value) {
        $("<input>", {
            id: "hidden1", //Make this unique
            type: "hidden",
            name: name,
            value: value
        })
    }

    function _addField($form) {
        var textInput = $('<textarea>', {
                id: "message",
                name: "message",
                rows: 10
        });

        $('<div>', {
            class: "row"
        }).append(
            $('<label>', {
                for: 'message',
                class: 'inline'
            }).html('Message <br> (please limit your message to 2,000 characters)')
        ).append(
            textInput
        ).appendTo($form);

        return textInput;
    }

    function _addSubmit($form) {
        $('<div>', {
            class: "row"
        }).append(
            $('<div>', {
                class: 'medium-8 right columns'
            }).append(
                $('<button>', {
                    type: 'submit',
                    class: 'submit button'
                }).text("Submit")
            )
        ).appendTo($form);        
    }

    // Initialization for this enhancement.
	function _initialize() {
        $delighterContainer = $(".delighter-rail");
        if ($delighterContainer) {

            var $feedbackDelighter = $("<a></a>", {
                href: "#"
            }).on('click', function(){
                _openFeedbackForm($feedbackDelighter);                
                return false;
            }).prependTo($delighterContainer)
            .append(
                $('<div></div>', {
                    class: "delighter cts-feedback"
                }).html(
                    '<h4>Send us your feedback</h4>' +
                    '<p>Help us make clinical trials searching better</p>'    
                )
            ); 

        }
	}

	/* Flag for telling whether this enhancement has been initialized. */
	var _initialized = false;
	
	/* Exposes functions from this module which are available from the outside. */
	return {
		init: function() {
			if(_initialized)
				return;

			_initialize();

			_initialized = true;
		}		
	};

});

