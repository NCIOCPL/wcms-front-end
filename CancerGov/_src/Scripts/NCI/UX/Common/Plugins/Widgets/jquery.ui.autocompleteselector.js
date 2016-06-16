/*!
 * jQuery UI Widget-factory plugin for autosuggest text boxes that allow a user to type
 * ahead, and select a single item from a list of items.
 * Author: @bryanp
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui", 'Common/Plugins/Widgets/jquery.ui.highlighterautocomplete'], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    return $.widget("nci.autocompleteselector", {

        options: {
            fetchSrc: false, //String or Promise
            queryParam: false,
            buttonText: 'Clear Selection'
        },
        _create: function () {     
   
            var $el = $(this.element);
            var thisautosuggest = this;

            thisautosuggest.$hiddenInput = $('<input type="hidden" id="t" name="t" />');
            $el.after(thisautosuggest.$hiddenInput);

            $el.highlighterautocomplete({
                fetchSrc: thisautosuggest.options.fetchSrc,
                queryParam: thisautosuggest.options.queryParam,
                select: function(event, ui) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).val(ui.item.item || ui.item.term);
                    thisautosuggest.$hiddenInput.val(ui.item.id);

                    // Add unselect button
                    if (!thisautosuggest.$unselectBtn) {
                        thisautosuggest.$unselectBtn = $('<button class="remove-suggestion" type="button">'+ thisautosuggest.options.buttonText +'</button>');
                        $el.after(thisautosuggest.$unselectBtn);
                        thisautosuggest.$unselectBtn.click(function() {
                            thisautosuggest.$hiddenInput.val('');
                            $el.val('').attr('disabled', false).focus();
                            thisautosuggest.$unselectBtn.hide();
                        });
                    } else {
                        thisautosuggest.$unselectBtn.show();
                    }
                    
                    //Disable our text box
                    $el.attr('disabled', true);
                },
                close:function(event,ui){
                    if(event.originalEvent){
                        if(event.originalEvent.type === 'menuselect'){
                            $el.removeClass("error").prev('.error-msg').css('visibility','hidden');
                            $el.next().focus();
                        }
                    }
                }

            });
        }


    });

}));