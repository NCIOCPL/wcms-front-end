define(function(require) {
    var CONFIG = require('Modules/NCI.config');
	var $script = require('scriptjs');

	$script([CONFIG.CDN.jquery, CONFIG.CDN.jplayer], function(){
        	require('Common/Enhancements/popup_functions');

        	if (jQuery.jPlayer && !Modernizr.touch) {

                var my_jPlayer = $("#dictionary_jPlayer");

                my_jPlayer.jPlayer({
                    swfPath: "/PublishedContent/files/global/flash/", //Path to SWF File Used by jPlayer
                    //errorAlerts: true,
                    supplied: "mp3" //The types of files which will be used.
                });

                //Attach a click event to the audio link
                $("a.CDR_audiofile").click(function(e) {
                	e.preventDefault();
                    my_jPlayer.jPlayer("setMedia", {
                        mp3: $(this).attr("href") // Defines the m4v url
                    }).jPlayer("play");
                });
            }
	});

});
