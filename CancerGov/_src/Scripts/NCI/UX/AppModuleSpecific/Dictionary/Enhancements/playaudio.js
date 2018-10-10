import $ from 'jquery';

/***
* Main function
*/
function _initialize() {

	//Hookup JPlayer for Audio
	if (jQuery.jPlayer) {
		var my_jPlayer = $("#dictionary_jPlayer");

		my_jPlayer.jPlayer({
			supplied: "mp3" //The types of files which will be used.
		});

		//Attach a click event to the audio link
		$(".CDR_audiofile").click(function() {
			my_jPlayer.jPlayer("setMedia", {
				mp3: $(this).attr("href") // Defines the m4v url
			}).jPlayer("play");

			return false;
		});
	}

} 

let initialized = false;
export default {
	init: function() {
		if (initialized) {
			return;
		}
		
		initialized = true;
		_initialize();
	}
}
