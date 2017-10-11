define(function(require) {
    var $ = require('jquery');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    var flexVideo = require('Modules/videoPlayer/flexVideo');

    // Initialize array of YouTube video IDs
    var videoList = [];
    
    /***
    * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID
    * TODO: - clean up logic for multiple carousels on one page
    *       - add logic for 50+ item lists
    *       - refactor API call 
    *       - make key configurable
    **/
    function _initialize() {
    
        // Hit the YouTube API and draw the carousel if this is page contains an inline carousel
        $( ".yt-carousel" ).each(function() {
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
                }
            )
            .done(function(data) {
                // Initialize the selected player with the first item in the playlist
                var $initialID = data.items[0].snippet.resourceId.videoId;
                drawSelectedVideo($initialID, $this);

                // Get the number of results
                var $count = data.pageInfo.totalResults;
                $this.find('.yt-carousel-count').text($count + ' Videos');
                
                videoList = []; // Clear the video list
                setVideoList($jsonUrl, $playlistId, $key);
                console.log(videoList);

                // Draw the carousel thumbnails
                // TODO: handle qty of > 50 (API only returns 50 at a time)
                $.each(data.items, function(i, item) {
                    $vid = item.snippet.resourceId.videoId;
                    $this.find('.yt-carousel-thumbs').append('<a class="yt-carousel-thumb" count="' + i + '" id="' + $vid + '"><img src="https://i.ytimg.com/vi/' + $vid + '/mqdefault.jpg"></a>');
                });
                
                // JS snippets for YouTube playlist carousel 
                // Draw slick slider for YT thumbnails
                $this.find('.yt-carousel-thumbs').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1
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
            });
        });

    }

    /**
     * Get playlist JSON from the YouTube API and build a complete list of videos associated with 
     * a playlist ID.
     * @param {any} $url 
     * @param {any} $plid 
     * @param {any} $key 
     * @param {any} $npt 
     */
    function setVideoList($url, $plid, $key, $npt)
    {
        $.get(
            $url, {
            part          : 'snippet',
            playlistId    : $plid, 
            tagmode       : 'any',
            format        : 'json',
            key           : $key,            
            pageToken     : $npt, 
            maxResults    : 50
            },
            function(data) { 
                $.each(data.items, function(i, item) {
                    $vid = item.snippet.resourceId.videoId;
                    videoList.push($vid);
                });
                // If the nextPageToken property exists, there are more results. Call the method again 
                // with the pageToken value set.
                if(typeof(data.nextPageToken) !== 'undefined')
                {
                    setVideoList($url, $plid, $key, data.nextPageToken)
                }
            }
        );
    }    

    /**
     * Update flex-video selector attributes with a new video ID 
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
