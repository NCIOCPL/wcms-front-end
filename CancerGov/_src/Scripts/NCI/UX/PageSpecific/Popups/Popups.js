define(function(require) {
	var $script = require('scriptjs');

	$script([
			'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js'
		],function(){
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
