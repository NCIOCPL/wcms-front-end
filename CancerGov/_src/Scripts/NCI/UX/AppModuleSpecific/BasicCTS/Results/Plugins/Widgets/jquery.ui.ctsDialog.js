(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui"], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {
      //extend jQuery UI dialog
  return $.widget( "ui.ctsDialog", $.ui.dialog, {
        options: {
            clickOutside: true,
            titleBar: false,
            closeBtn: true,
            responsive: true
        },
        open: function(){
            var self = this;

            this._super();

            if(this.options.clickOutside) {
                $('.ui-widget-overlay').addClass('clickable').on('click', function (evt) {
                    self.close();
                });
            }

            // make resizable
            if(this.options.responsive === true) {
                this._resize();
                $(window).on("resize.ui-dialog orientationchange.ui-dialog", function () {
                    self._resize();
                });
            }
        },
        close: function(){
            if(this.options.responsive === true) {
                $(window).off("resize.ui-dialog orientationchange.ui-dialog");
            }
            this._super();
        },
        _create: function(evt, ui){

            this._super();
            this.uiDialog.css({'max-width':this.options.maxWidth});

        },
        _createTitlebar: function(){
            if(!this.options.titleBar) {
                this.uiDialogTitlebarClose = $("<button type='button' class='ui-dialog-close'></button>")
                    .button( {
                        label: $( "<a>" ).text( 'hide' ).html(),
                        icon: "ui-icon-closethick",
                        showLabel: false
                    })
                    .prependTo(this.uiDialog);

                this._on(this.uiDialogTitlebarClose, {
                    click: function (event) {
                        event.preventDefault();
                        this.close(event);
                    }
                });
                if(!this.options.closeBtn) {
                    this.uiDialogTitlebarClose.hide();
                }
            } else {
                this._super();
            }
        },
        _resize: function () {
            var elem = this.element,
                oWidth = elem.parent().outerWidth(),
                wWidth = $(window).width(),
                setWidth = Math.min(wWidth * this.options.scaleW, oWidth);

            elem.ctsDialog("option", "width", setWidth).parent().css("max-width", setWidth);
            elem.ctsDialog("option", "position", { my: "center", at: "center", of: window });
        }
    });

}));