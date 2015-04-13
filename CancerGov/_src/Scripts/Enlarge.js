// (function($) {})  --> Default jQuery structure for functions
// Everything goes within '{}'
//
// Function to create an "Enlarge" button to click in order to 
// display a table or image using the entire window area
// --------------------------------------------------------------
(function($) {

    function getFigOrMakeOne(element) {
        var fig = false;

        if (element.parents('figure').length <= 0) {
            fig = $('<figure></figure>');
            fig.addClass("table");
            fig.insertBefore(element);
            element.appendTo(fig);
            //Get the caption
            var tcaption = element.find("caption");
            //If there is table caption, make that the figure caption.
            if (tcaption) {
                var fcaption = $('<figcaption></figcaption>');
                //Add ID, base it on table id if there is one.
                var table_id = element.attr("id");
                if (table_id) {
                    fcaption.attr("id", table_id + "_cap");
                } else {
                    fcaption.attr("id", $.uniqueId()); //Note jQueryUI function
                }
                //Add aria-labelledby to table
                element.attr("aria-labelledby", fcaption.attr("id"));
                //Move contents of caption to figcaption and remove old caption
                fcaption.append(tcaption.contents());
                tcaption.remove();
                //Set the title on the table for later use.
                element.data("caption", fcaption.contents());
                //Add the caption to the figure - make sure it is first.
                fig.append(fcaption)
            }
            //Add the table to the caption
            fig.append(element);
        } else {
            //Grab fig...
        }

        return fig;

    }

    function enlargeTable(fig, settings) {
        //Enlarge Table
        fig.data('scrollWrapper').removeClass('has-scroll');
        fig.data('scrollWrapper').removeClass('scrollable');

        fig.dialog({
            width: $(window).width() - 40,
            height: fig.height(),
            draggable: false,
            resizable: false,
            modal: false,
            title: '', //No title, we are hiding it anyway...
            dialogClass: 'table-enlarged',
            create: function (event, ui) {
                //Make the window's scrollbars go away
                //$("body").css({ overflow: 'hidden'});
                //hide enlarge button
                if (fig.data('enlargeBtn')) {
                    fig.data('enlargeBtn').hide();
                }
                //add close block
                var closeBlock = $("<div/>", {
                    'class': 'popup-close'
                });
                //setup close link
                var closeLink = $("<a/>", {
                    'href': '#'
                }).append($("<span/>", {
                    'class': 'hidden',
                    'html': settings.closeTxt
                }));
                //Setup click handler to close the dialog
                closeLink.click(function () {
                    fig.dialog('close');
                    return false;
                });
                closeBlock.append(closeLink);
                fig.prepend(closeBlock);
            },
            beforeClose: function (event, ui) {
                //Make the window's scrollbars come back
                //$("body").css({ overflow: 'inherit'});
                //remove close
                fig.find(".popup-close").remove();
                //show enlarge button
                if (fig.data('enlargeBtn')) {
                    fig.data('enlargeBtn').show();
                }
            },
            open: function () {
                $(this).scrollTop(0);
                //Replace Enlarge?
            },
            close: function (event, ui) {
                //This removes the dialog and puts the contents back where it got it from
                $(this).dialog('destroy');
                fig.data('scrollWrapper').addClass('has-scroll');
                fig.data('scrollWrapper').addClass('scrollable');
            }
        });
    }

    /**
     * Function for adding in large table capabilities.  This is the scrolling and enlarge button.
     *
     */
    function enhanceLargeTable(fig, settings) {

        //Add wrapper to indicate table has scroll area
        fig.data('scrollWrapper').addClass('has-scroll');

        //Determine the current width.
        var curWidth = window.innerWidth || $(window).width();

        if (curWidth <= settings.thresholdForEnlarge) { //Should be no enlarge...
            //Less than the threshold for enlarging.  Don't do anything?
        } else {
            //Add Enlarge button before scroll wrapper.
            var enlargeButton = $('<a/>', {
                'class': 'article-image-enlarge no-resize',
                'href': '#',
                'onclick': 'return false;',
                'html': settings.enlargeTxt
            }).insertBefore(fig.data('scrollWrapper'));

            //Set the enlarge button as data on the figure for easy retrieval
            fig.data('enlargeBtn', enlargeButton);

            // Create the click event on the Enlarge link
            // -------------------------------------------
            enlargeButton.unbind().click(function () {
                enlargeTable(fig, settings);
            });
        }
    }

    /**
     * Helper to remove enlarge button
     */
    function removeEnlargeButton(fig) {
        var enlarge = fig.data('enlargeBtn');
        if (enlarge) {
            enlarge.remove();
            fig.data('enlargeBtn', false);
        }
    }

    /**
     * Initialization function for plugin
     */
    $.fn.overflowEnlarge = function( options ) {

        // Adding some default settings
        var settings = $.extend({
            text: "Default Text",
            color: null,
            enlargeTxt : ($('meta[name="content-language"]').attr('content') == 'es') ? "Ampliar" : "Enlarge",
            collapseTxt : ($('meta[name="content-language"]').attr('content') == 'es') ? "Cerrar" : "Close",
            thresholdForEnlarge : 1024
        }, options);

        // Creating the "Enlarge" link above the table or figure
        // -----------------------------------------------------------
        return this.each( function() {

            var element = $(this);

            //We want the table to be in a figure tag and for its table caption to be
            //a figcaption.  If the table is already in a figure, we do not want to do this.
            var fig = getFigOrMakeOne(element);

            // Create the wrapper element
            var scrollWrapper = $('<div />', {
                'class': 'scrollable',
                'html': '<div />' // The inner div is needed for styling
            }).insertBefore(element);

            // Move the scrollable element inside the wrapper element
            element.appendTo(scrollWrapper.find('div'));

            //Set a reference on the figure for the table.
            fig.data('theTable',element);

            // Store a reference to the wrapper element
            fig.data('scrollWrapper', scrollWrapper);

            // Check if the element is wider than its parent and thus needs to be scrollable
            if (fig.data('theTable').outerWidth() > fig.data('theTable').parent().outerWidth()) {
                //It meets our conditions, enlargify the contents
                enhanceLargeTable(fig, settings);
            }


            // When the viewport size is changed, check again if the element needs to be scrollable
            $(window).on('resize orientationchange', function () {
                var curWidth = window.innerWidth || $(window).width();

                //If popup is open and the curWidth < [Threshold for Enlarging], close the window
                if (fig.dialog("instance") != undefined) { //Since we always destroy dialog, instance means exists and open

                    if (curWidth <= settings.thresholdForEnlarge) {
                        //Smaller than desktop breakpoint, close window
                        fig.dialog('close');

                        //Remove Enlarge
                        removeEnlargeButton(fig);

                        //Now we must check to see if the table is no longer too big.


                    } else {
                        //If the window is going to be larger than the current available space,
                        //then resize the window
                    }
                } else {
                    if (fig.data('theTable').outerWidth() > fig.data('theTable').parent().outerWidth()) {
                        enhanceLargeTable(fig, settings);
                    } else {
                        // We are no longer too wide for our container.

                        //Remove Scroll Classes
                        fig.data('scrollWrapper').removeClass('has-scroll');
                        fig.data('scrollWrapper').removeClass('scrollable');

                        //Remove Enlarge
                        if (curWidth < settings.thresholdForEnlarge) {
                            removeEnlargeButton(fig);
                        }
                    }
                }
            });

        });
    };

}(jQuery));
