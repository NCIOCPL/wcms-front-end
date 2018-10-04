import $ from 'jquery';

const pluginName = "audiolinkplayer";
const swfPath = "/PublishedContent/files/global/flash/"; //Path to SWF File Used by jPlayer
const defaults = {
    // Add default settings here.
};

function Plugin ( element, options, player_instance ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this._player_instance = player_instance;

    this.init();
}

// Avoid Plugin.prototype conflicts
$.extend(Plugin.prototype, {
    init: function () {

        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.settings
        // you can add more functions like the one below and
        // call them like so: this.yourOtherFunction(this.element, this.settings).

        const $el = $(this.element);

        // Get the player_instance as this will be unavailable in the click handler below.
        const player_instance = this._player_instance;

        $el.on("click", function(event) {

            //Set the media file and play
            player_instance.jPlayer("setMedia", {
                mp3: $el.attr("href")
            }).jPlayer("play");

            //Make sure we do not navigate to the file.
            event.preventDefault();
            return false;
        });
    }

});

// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations
$.fn[ pluginName ] = function ( options ) {

    //There should be only one player instance, so fetch it from the document data
    var player_instance = $.data(document, "nci-audiolink-player" );

    //OR, initialize it if it has not been set
    if (!player_instance) {
        //Create an instance of the player.
        //This should happen on the first item being extended
        player_instance = $("<div>", {
            "id": "nci-audiolink-player",
            "class": "hidden"
        }).appendTo('body');

        player_instance.jPlayer({
            swfPath: swfPath,
            supplied: "mp3" //The type of files to be used.
        });

        $.data(document, "nci-audiolink-player", player_instance);
    }

    // Handle normal plugin initialization
    return this.each(function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options, player_instance ) );
        }
    });
};

