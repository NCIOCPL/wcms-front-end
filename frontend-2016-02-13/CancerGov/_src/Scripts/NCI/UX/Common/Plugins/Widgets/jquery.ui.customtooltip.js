/*!
 * jQuery UI Widget-factory plugin for creating tooltips.  This is for the creation and positioning of, but
 * not the actual triggering.  This will probably work very much like jQuery UI Dialog.
 * Author: @bryanp
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui"], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );

    return $.widget("nci.customtooltip", {

        //Options to be used as defaults
        options: {
            // The element or the selector for the element which will have the tooltip container
            // appended to.
            appendTo: "body",
            // Close the window when a user presses the enter key
            closeOnEscape: true,
            // Options passed to show function. (e.g. this is where to define the animation)
            show: null,
            //This is for extra classes added to the dialog
            dialogClass: "",
            // Should we display a close button or not.
            displayClose: true,
            // Close Text
            closeText: "Close",
            // Should this tooltip automatically option on creation?
            autoOpen: false,

            // jQuery UI positioning object.
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                // Ensure the titlebar is always visible <-- NOT NEEDED ANYMORE?
                using: function (pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css("top", pos.top - topOffset);
                    }
                }
            },

            // Callback Functions
            // Callback that is fired when the close button/close function is performed, but before it is closed.
            beforeClose: null,
            // Callback this is fired after the item is destroyed
            close: null,
            // Callback that is fired when the popup is focused
            focus: null,
            // Callback that is fired when the popup is opened, after the popup element has been shown.
            open: null
        },

        sizeRelatedOptions: {
            buttons: true,
            height: true,
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true,
            width: true
        },

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then you can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();

            // Save off the original CSS of the content for use later.
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };

            // Save the original position of the content
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };

            // Create the wrapper and add it to the DOM
            this._createWrapper();

            // Add the contents of this item to the tool tip.
            this.element
                .show()
                .addClass("nci-tooltip-content ui-widget-content")
                .appendTo(this.toolTip);

            if (this.options.displayClose) {
                this._createClosebar();
            }

            // Set the isOpen flag to false as the tooltip is not open
            this._isOpen = false;

            this._trackFocus();

        },

        // Create the closebar elements and display above the contents of this thing.
        _createClosebar: function () {
            //TODO: UPDATE THE CLASSES
            this.toolTipClosebar = $("<div>")
                .addClass("ui-dialog-titlebar ui-widget-header ui-helper-clearfix")
                .prependTo(this.toolTip);

            this._on(this.toolTipClosebar, {
                mousedown: function (event) {
                    // Don't prevent click on close button (#8838)
                    // Focusing a dialog that is partially scrolled out of view
                    // causes the browser to scroll it into view, preventing the click event
                    if (!$(event.target).closest(".ui-dialog-titlebar-close")) {
                        // Dialog isn't getting focus when dragging (#8063)
                        this.toolTip.trigger("focus");
                    }
                }
            });

            // Support: IE
            // Use type="button" to prevent enter keypresses in textboxes from closing the
            // dialog in IE (#9312)
            this.toolTipClosebarClose = $("<button type='button'></button>")
                .button({
                    label: this.options.closeText,
                    icons: {
                        primary: "ui-icon-closethick"
                    },
                    text: false
                })
                .addClass("ui-dialog-titlebar-close")
                .appendTo(this.toolTipClosebar);

            this._on(this.toolTipClosebarClose, {
                click: function (event) {
                    event.preventDefault();
                    this.close(event);
                }
            });
        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        _destroy: function () {

            var next,
                originalPosition = this.originalPosition;

            this._untrackInstance();

            //Reset the old element and remove it from the container.
            this.element
                .removeUniqueId()
                .css(this.originalCss)
                .detach();

            // Destroy the tool tip container.
            this.toolTip.remove();

            // Put the contents back where you found it?
            next = originalPosition.parent.children().eq(originalPosition.index);

            if (next.length && next[0] !== this.element[0]) {
                next.before(this.element);
            } else {
                originalPosition.parent.append(this.element);
            }
        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function (key, value) {
            switch (key) {
                case "someValue":
                    //this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    //this.options[ key ] = value;
                    break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply(this, arguments);
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        },

        // Initialization - called from "base" widget?
        _init: function () {
            if (this.options.autoOpen) {
                this.open();
            }
        },

        // This creates the tool tip container with the classes
        _createWrapper: function () {
            this.toolTip = $("<div>")
                .addClass("nci-customtooltip ui-widget ui-widget-content ui-front " + this.options.dialogClass)
                .hide()
                .attr({
                    // Setting the tabIndex makes the div focusable
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo())


            // Add some event handlers to our tool tip
            this._on(this.toolTip, {
                // Handle key events.
                keydown: function (event) {
                    // Check for closing on Escape
                    if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
                        event.keyCode === $.ui.keyCode.ESCAPE) {
                        event.preventDefault();
                        this.close(event);
                        return;
                    }

                    //TODO: Handle tabbing?  Don't know about this one, so skipping.  Maybe needed for accessibility
                }
                //TODO: Handle mousedown on the tooltip?  The original code has a mousedown handler...
            });

            // We assume that any existing aria-describedby attribute means
            // that the dialog content is marked up properly
            // otherwise we brute force the content as the description
            if (!this.element.find("[aria-describedby]").length) {
                this.toolTip.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                });
            }
        },

        // This is a function to determine the element to append the tooltip to.
        _appendTo: function () {
            //Try an get the "appendTo" option value and if it is set, use it
            var element = this.options.appendTo;
            if (element && ( element.jquery || element.nodeType )) {
                return $(element);
            }
            // Otherwise, try and find the item if not a node, or the body if not set.
            return this.document.find(element || "body").eq(0);
        },

        widget: function () {
            return this.toolTip;
        },

        // Return the instance variable isOpen indicating whether or not this tooltip is open.
        isOpen: function () {
            return this._isOpen;
        },

        open: function () {

            var that = this;

            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable();
                }
                return;
            }

            // Set the tooltip as being open
            this._isOpen = true;

            //Sets who opened the item??
            this.opener = $(this.document[0].activeElement);

            //Since we do not allow resizing, we do not need to use the _size method from uidialog

            //Position the tool tip to the options that were passed in
            this._position();

            //Bring the tooltip to the front
            this._moveToTop(null, true);

            //Show the item
            this._show(this.toolTip, this.options.show, function () {
                //
                that._focusTabbable();
                //
                that._trigger("focus");
            });

            // Track the tooltip immediately upon openening in case a focus event
            // somehow occurs outside of the tooltip before an element inside the
            // tooltip is focused
            this._makeFocusTarget();

            // Trigger the open event.
            this._trigger("open");
        },
        close: function (event) {
            var activeElement,
                that = this;

            if (!this._isOpen || this._trigger("beforeClose", event) === false) {
                return;
            }

            this._isOpen = false;
            this._focusedElement = null;
            this._untrackInstance();

            if (!this.opener.filter(":focusable").focus().length) {

                // support: IE9
                // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
                try {
                    activeElement = this.document[0].activeElement;

                    // Support: IE9, IE10
                    // If the <body> is blurred, IE will switch windows, see #4520
                    if (activeElement && activeElement.nodeName.toLowerCase() !== "body") {

                        // Hiding a focused element doesn't trigger blur in WebKit
                        // so in case we have nothing to focus on, explicitly blur the active element
                        // https://bugs.webkit.org/show_bug.cgi?id=47182
                        $(activeElement).blur();
                    }
                } catch (error) {
                }
            }

            this._hide(this.toolTip, this.options.hide, function () {
                that._trigger("close", event);
            });
        },

        _position: function () {
            // Need to show the dialog to get the actual offset in the position plugin
            var isVisible = this.toolTip.is(":visible");
            if (!isVisible) {
                this.toolTip.show();
            }
            this.toolTip.position(this.options.position);
            if (!isVisible) {
                this.toolTip.hide();
            }
        },


        // Set the focus on the best tabbable element.
        _focusTabbable: function () {
            // Set focus to the first match:
            // 1. An element that was focused previously
            // 2. First element inside the dialog matching [autofocus]
            // 3. Tabbable element inside the content element
            // 5. The close button
            // 6. The dialog itself
            var hasFocus = this._focusedElement;
            if (!hasFocus) {
                hasFocus = this.element.find("[autofocus]");
            }
            if (!hasFocus.length) {
                hasFocus = this.element.find(":tabbable");
            }
            if (!hasFocus.length) {
                if (this.options.displayClose) {
                    hasFocus = this.toolTipClosebarClose.filter(":tabbable");
                }
            }
            if (!hasFocus.length) {
                hasFocus = this.toolTip;
            }
            hasFocus.eq(0).trigger("focus");
        },

        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (event) {
                    this._makeFocusTarget();
                    this._focusedElement = $(event.target);
                }
            });
        },

        _makeFocusTarget: function () {
            this._untrackInstance();
            this._trackingInstances().unshift(this);
        },

        // Remove this instance from tracking.
        _untrackInstance: function () {
            var instances = this._trackingInstances(),
                exists = $.inArray(this, instances);
            if (exists !== -1) {
                instances.splice(exists, 1);
            }
        },

        _trackingInstances: function () {
            var instances = this.document.data("nci-customtooltip-instances");
            if (!instances) {
                instances = [];
                this.document.data("nci-customtooltip-instances", instances);
            }
            return instances;
        },


        // Bring the tooltip to the foreground
        moveToTop: function () {
            this._moveToTop();
        },

        // Bring the tooltip to the foreground
        _moveToTop: function (event, silent) {
            var moved = false,
                zIndices = this.toolTip.siblings(".ui-front:visible").map(function () {
                    return +$(this).css("z-index");
                }).get(),
                zIndexMax = Math.max.apply(null, zIndices);

            if (zIndexMax >= +this.toolTip.css("z-index")) {
                this.toolTip.css("z-index", zIndexMax + 1);
                moved = true;
            }

            if (moved && !silent) {
                this._trigger("focus", event);
            }
            return moved;
        }

    });

}));