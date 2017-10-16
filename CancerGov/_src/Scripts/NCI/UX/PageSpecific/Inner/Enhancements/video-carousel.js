define(function(require) {
    var $ = require('jquery');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    var flexVideo = require('Modules/videoPlayer/flexVideo');
    require('Vendor/gapi');

    /***
     * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID
     * TODO: - fix issue w/multiple video playlists on mobile
     *       - make key configurable
     *       - fix transition from mobile to desktop
     *       - refactor and clean up ID/title collections 
     *       - refactor list building logic into facade
     **/
    function _initialize() {
        handleClientLoad();
    }

    /**
     * Load the API's client and auth2 modules.
     * Call the initClient function after the modules load.
     */
    function handleClientLoad() {
        console.log('== BEGIN initClient() ==');
        gapi.load('client', initClient);
        console.log('== END initClient() ==');                
    }

    function initClient() {
        $(".yt-carousel").each(function(i) {
            var $this = $(this);

            console.log('1. loading client (' + i + ')');
            
            // YouTube API address & params
            var $playlistId = $this.attr("data-playlist-id");
            var $key = 'AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8'; // key for dev work - replace this!!!!
            var $discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']

            // Initialize the gapi.client object, which app uses to make API requests.
            // Get API key and client ID from API Console.
            // 'scope' field specifies space-delimited list of access scopes
            // Sample API URL: https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId=PLYKy4VbxNln61Inca7txbOLqAxJNMZypg&key=AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8
            gapi.client.init({
                'apiKey': $key,
                'discoveryDocs': $discoveryDocs
            })
            .then(function() {
                console.log('2. client loaded (' + i + ')');
                console.log('3. BEGIN retrieiving playlist items data (' + i + ')');                
                gapi.client.youtube.playlistItems.list({
                        playlistId: $playlistId,
                        part: 'snippet',
                        maxResults: 50
                    })
                    .then(function(data) {
                        //console.log(data);
                        //console.log(data.result.items);
                        console.log('4. END retrieiving playlist items data (' + i + ')');

                        console.log('5. BEGIN enhancement to draw HTML from items (' + i + ')');
                        var $count = data.result.pageInfo.totalResults;
                        if ($count > 50) {
                            $count = 50;
                        }
                        $this.find('.yt-carousel-count').text($count + ' Videos');

                        // Initialize the selected player with the first item in the playlist
                        var $initialID = data.result.items[0].snippet.resourceId.videoId;
                        var $initialTitle = data.result.items[0].snippet.title;
                        drawSelectedVideoMobile($initialID, $initialTitle, $this, 1, $count);

                        // Draw the carousel thumbnails
                        // TODO: handle qty of > 50 (API only returns 50 at a time)
                        vidIDList = [];
                        vidTitleList = [];
                        $.each(data.result.items, function(i, item) {
                            $vid = item.snippet.resourceId.videoId;
                            $title = item.snippet.title;
                            $this.find('.yt-carousel-thumbs').append('<a class="yt-carousel-thumb" count="' + i +
                                '" id="' + $vid +
                                '"><img src="https://i.ytimg.com/vi/' +
                                $vid + '/mqdefault.jpg" alt="' +
                                $title + '">' +
                                $title + '</a>'
                            );
                            vidIDList.push($vid);
                            vidTitleList.push($title);
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
                            if($thumbVideoID.length < 1) {
                                // For for cases where slick does not clone the thumbnail link ID
                                var $img = $th.find('img').attr('src');
                                $thumbVideoID = $img.split('/')[4];
                            }
                            var $thumbVideoTitle = $th.text();
                            drawSelectedVideo($thumbVideoID, $thumbVideoTitle, $this);
                        });

                        // Change the video upon mobile next arrow click
                        $this.find('.yt-carousel-arrows .m-previous').click(function() {
                            $valueCurr = $('.flex-video').attr('data-video-id');
                            $indexPrev = vidIDList.indexOf($valueCurr) - 1;
                            if ($indexPrev < 0) {
                                $indexPrev = (vidIDList.length - 1);
                            }
                            $valuePrev = vidIDList[$indexPrev];
                            $titlePrev = vidTitleList[$indexPrev];
                            drawSelectedVideoMobile($valuePrev, $titlePrev, $this, ($indexPrev + 1), $count);
                        });

                        // Change the video upon mobile previous arrow click
                        $this.find('.yt-carousel-arrows .m-next').click(function() {
                            $valueCurr = $('.flex-video').attr('data-video-id');
                            $indexNext = vidIDList.indexOf($valueCurr) + 1;
                            if ($indexNext > (vidIDList.length - 1)) {
                                $indexNext = 0;
                            }
                            $valueNext = vidIDList[$indexNext];
                            $titleNext = vidTitleList[$indexNext];
                            drawSelectedVideoMobile($valueNext, $titleNext, $this, ($indexNext + 1), $count);
                        });
                        console.log('6. END enhancement to draw HTML from items (' + i + ')');                        
                        
                    })

                //console.log(gapi)
            });
            // .fail(function() {
            //     console.log('Error retrieving data from YouTube API. Verify the GET request URL.');
            // });
        })

    }


    /**
     * Draw HTML elements for mobile view only, then render the selected video
     * @param {any} $vidID
     * @param {any} $el 
     */
    function drawSelectedVideoMobile($vidID, $vidTitle, $el, $index, $total) {
        var $count = $el.find('.yt-carousel-m-count');
        $count.text($index + "/" + $total);
        drawSelectedVideo($vidID, $vidTitle, $el);
    }

    /**
     * Update flex-video selector attributes with a new video ID, then render the selected video
     * @param {any} $vidID 
     * @param {any} $el 
     */
    function drawSelectedVideo($vidID, $vidTitle, $el) {
        // Replace all instances of the YouTube video ID within the <figure> element
        var $selectedVideo = $el.find('.yt-carousel-selected .flex-video');
        $selectedVideo.attr('id', 'ytplayer-' + $vidID);
        $selectedVideo.attr('data-video-id', $vidID);
        $selectedVideo.attr('data-video-title', $vidTitle);
        $selectedVideo.find('noscript a').attr('href', 'https://www.youtube.com/watch?v=' + $vidID);
        $selectedVideo.find('noscript a').attr('title', $vidTitle);

        // Draw the video title
        $el.find('h3').text($vidTitle);

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