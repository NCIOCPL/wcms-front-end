define(function(require) {
    var $ = require('jquery');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    var flexVideo = require('Modules/videoPlayer/flexVideo');

    /***
    * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID
    * TODO: - fix issue w/multiple video playlists
    *       - test within an accordion
    *       - get video titles 
    *       - test within an accordion
    *       - make key configurable
    **/
    function _initialize() {
    
        // Hit the YouTube API and draw the carousel if this is page contains an inline carousel
        $( ".yt-carousel" ).each(function(i) {
            var $this = $(this);

            // YouTube API address & params
            var $playlistId = $this.attr("data-playlist-id");
            var $key = "AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8"; // key for dev work - replace this!!!!
            var $jsonUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
            
            // Retrieve video playlist data from the YouTube API. When the object is resolved, build the carousel HTML using each of the playlist's videos.
            $.get($jsonUrl, {
                    part        : 'snippet',
                    playlistId  : $playlistId,
                    tagmode     : 'any',
                    format      : 'json',
                    key         : $key,
                    maxResults  : 50
                })
            .then(function(data) {
                // Get the number of results
                var $count = data.pageInfo.totalResults;
                if($count > 50) { $count = 50; } 
                $this.find('.yt-carousel-count').text($count + ' Videos');

                // Initialize the selected player with the first item in the playlist
                var $initialID = data.items[0].snippet.resourceId.videoId;
                drawSelectedVideoMobile($initialID, $this, 1, $count);

                // Draw the carousel thumbnails
                // TODO: handle qty of > 50 (API only returns 50 at a time)
                vidIDList = [];
                $.each(data.items, function(i, item) {
                    $vid = item.snippet.resourceId.videoId;
                    $this.find('.yt-carousel-thumbs').append('<a class="yt-carousel-thumb" count="' + i + '" id="' + $vid + '"><img src="https://i.ytimg.com/vi/' + $vid + '/mqdefault.jpg"></a>');
                    vidIDList.push($vid);
                });

                // JS snippets for YouTube playlist carousel 
                // Draw slick slider for YT thumbnails
                $this.find('.yt-carousel-thumbs').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 860,
                        settings: {
                            slidesToShow: 2
                        }
                    }]
                });

                // Script for custom arrows
                $this.find('.yt-carousel-arrows .previous').click(function() {
                    $this.find('.yt-carousel-thumbs').slick("slickPrev");
                });
                $this.find('.yt-carousel-arrows .next').click(function() {
                    $this.find('.yt-carousel-thumbs').slick("slickNext");
                });
        
                // Change the video on carousel click
                $this.find('.yt-carousel-thumb').click(function() {
                    var $th = $(this);
                    var $thumbVideoID = $th.attr('id');
                    drawSelectedVideo($thumbVideoID, $this);
                });

                // Change the video upon mobile next arrow click
                $this.find('.yt-carousel-arrows .m-previous').click(function() {
                    $valueCurr = $('.flex-video').attr('data-video-id');
                    $indexPrev = vidIDList.indexOf($valueCurr) - 1;
                    if($indexPrev < 0) { 
                        $indexPrev = (vidIDList.length - 1);
                    }
                    $valuePrev = vidIDList[$indexPrev];
                    drawSelectedVideoMobile($valuePrev, $this, ($indexPrev + 1), vidIDList.length);
                });

                // Change the video upon mobile previous arrow click
                $this.find('.yt-carousel-arrows .m-next').click(function() {
                    $valueCurr = $('.flex-video').attr('data-video-id');
                    $indexNext = vidIDList.indexOf($valueCurr) + 1;
                    if($indexNext > (vidIDList.length - 1)) {
                        $indexNext = 0;
                    }
                    $valueNext = vidIDList[$indexNext];
                    drawSelectedVideoMobile($valueNext, $this, ($indexNext + 1), vidIDList.length);
                });

            }); // end $.get().then()
        }); // end $.each for video carousels

    }

    /**
     * Draw HTML elements for mobile view only, then render the selected video
     * @param {any} $vidID
     * @param {any} $el 
     */
    function drawSelectedVideoMobile($vidID, $el, $index, $total) {
        var $count = $el.find('.yt-carousel-m-count');
        $count.text($index + "/" + $total);
        drawSelectedVideo($vidID, $el);
    }

    /**
     * Update flex-video selector attributes with a new video ID, then render the selected video
     * @param {any} $vidID 
     * @param {any} $el 
     */
    function drawSelectedVideo($vidID, $el) {
        // Replace all instances of the YouTube video ID within the <figure> element
        var $selectedVideo = $el.find('.yt-carousel-selected .flex-video');
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
