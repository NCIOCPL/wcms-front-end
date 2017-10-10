define(function(require) {
    var $ = require('jquery');
    var $script = require('scriptjs'); 
    require('Modules/carousel/slick-patch');
    var flexVideo = require('Modules/videoPlayer/flexVideo');


    /***
    * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID
    * TODO: import from node packages, not 3rd party URL
    *       refactor API call 
    *       make key configurable
    **/
    function _initialize() {
        $script('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',function(){
            
            require('Modules/carousel/slick-patch');
            var flexVideo = require('Modules/videoPlayer/flexVideo');            

            // Script for carousel
            $(function() {                   
    
                // Hit the YouTube API and draw the carousel if this is page contains an inline carousel
                if ($(".yt-carousel")[0]) {
    
                    // YouTube API address & params
                    var $playlistId = $(".yt-carousel").attr("data-playlist-id");
                    var $key = "AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8"; // key for dev work - replace this!!!!
                    var $maxResults = "50";
                    var $jsonUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId=" + $playlistId + "&key=" + $key + "&maxResults=" + $maxResults;
                    
                    // Retrieve video playlist data from the YouTube API. When the object is resolved, build the carousel HTML using each of the playlist's videos.
                    $.getJSON($jsonUrl, {
                            tagmode: "any",
                            format: "json"
                        })
                        .done(function(data) {
                            // Initialize the selected player with the first item in the playlist
                            var $initialID = (data.items[0].snippet.resourceId.videoId); 
                            drawSelectedVideo($initialID);                        
                            
                            // Draw the carousel thumbnails
                            // TODO: handle qty of > 50 (API only returns 50 at a time)
                            $.each(data.items, function(i, item) {
                                $vid = item.snippet.resourceId.videoId;
                                $('.yt-carousel-thumbs').append('<a class="yt-carousel-thumb" id="' + $vid + '"><img src="https://i.ytimg.com/vi/' + $vid + '/mqdefault.jpg"></a>');
                            });
                            
                            // JS snippets for YouTube playlist carousel 
                            // Draw slick slider for YT thumbnails
                            $('.yt-carousel-thumbs').slick({
                                infinite: true,
                                slidesToShow: 3,
                                slidesToScroll: 1
                            });
    
                            // Script for custom arrows
                            $('.yt-carousel-arrows .previous').click(function() {
                                $('.yt-carousel-thumbs').slick("slickPrev");
                            });
                            $('.yt-carousel-arrows .next').click(function() {
                                $('.yt-carousel-thumbs').slick("slickNext");
                            });
                    
                            // Change the video on carousel click
                            $('.yt-carousel-thumb').click(function() {
                                var $this = $(this);
                                var $thumbVideoID = $this.attr('id');
                                drawSelectedVideo($thumbVideoID);
                            });
                        });
                }                
    
            });
        });
    }

    /**
    * Update flex-video selector attributes with a new video ID
    */
    function drawSelectedVideo($vidID) {
        // Replace all instances of the YouTube video ID within the <figure> element
        var $selectedVideo = $('.yt-carousel-selected .flex-video');
        $selectedVideo.attr('id', 'ytplayer-' + $vidID);
        $selectedVideo.attr('data-video-id', $vidID);
        $selectedVideo.find('noscript a').attr('href', 'https://www.youtube.com/watch?v=' + $vidID);

        // Rebuild the YouTube embedded video from the updated flex-video element    
        // flexVideo.init() enables the embedding of YouTube videos and playlists as iframes.
        (function() {
            flexVideo.init();
        })();
    }

    /**
     * Identifies if this enhancement has been initialized or not.
     * @type {Boolean}
     */
    var initialized = false;

    /**
     * Exposed functions available to this module.
     */
    return {
        init: function() {
            if (initialized) {
                return;
            }

            _initialize();
            initialized = true;
        }
    };
});
