define(function(require) {
    var $ = require('jquery');

    // Initialization for the enhancement.
    function _initialize() {
        var $videos = $(".feature .video");

        if($videos[0]){

            //Add the YouTube JavaScript API
            var firstScriptTag = document.getElementsByTagName('script')[0];
            var tag = document.createElement('script');
            tag.id = 'youtubeAPI';
            tag.src = 'https://www.youtube.com/iframe_api';
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            $videos.on("click", "a", function(e){
                e.preventDefault();
                var url = $(this).parent().attr('data-video');
                var id = url.substring(url.indexOf("?v=")+3);

                new YT.Player(this, {
                    videoId: id,
                    playerVars: { 'autoplay': 1, 'controls': 2 }
                });
            });
        }

        // hide the header on BRP page
		/// If the ".hide-page-title" class exists on the page, add the "hidden" class to the Page Title
		/// TODO: Move this outside of the NCI.Video.js module - it would be better to make this a 
		/// more general function
        if($(".hide-page-title").length > 0) {
            $(".resize-content > h1").addClass("hidden");
        }
    }



    /* Flag for telling whether this enhancement has been initialized. */
    var initialized = false;

    /* Exposes functions from this module which are available from the outside. */
    return {
        init: function() {
            if(initialized)
                return;

            _initialize();

            initialized = true;
        }
    };

});