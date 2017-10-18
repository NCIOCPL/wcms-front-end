define(function(require) {
    var $ = require('jquery');
    var flexVideo = require('Modules/videoPlayer/flexVideo');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    require('Vendor/google-apis/js/api');

    /* TODO: - make key configurable
    *        - handle initial loading screen
    *        - convert to .ts and refactor
    */

    /***
     * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID. 
     * The client should only be loaded if this page contains the YouTube carousel HTML snippet.
     **/
    function _initialize() {
        if($('.yt-carousel').length) {
            handleClientLoad();
        }
    }

    /**
     * Load the API's client.
     */
    function handleClientLoad() {
        gapi.load('client', {
            callback: function() {
                // Handle gapi.client initialization.
                initClient();
            },
            onerror: function() {
               // Handle loading error.
                alert('gapi.js failed to load.');
            },
            timeout: 5000, // 5 seconds.
            ontimeout: function() {
                // Handle timeout.
                alert('gapi.js did not load in a timely manner.');
            }
        });
    }

    /**
     * Initialize the API client and draw HTML
     */
    function initClient() {
            
            // YouTube API address & params
            var $key = 'AIzaSyAc7H6wMKjEqxe2J9iHNnc9OBZhfa6TXN8'; // key for dev work - replace this!!!!
            var $discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']

            // console.log('1. loading client');
            // Initialize the gapi.client object, which app uses to make API requests.
            // API URL pattern: googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=_MY_PLAYLIST_ID_&key=_MY_GOOLE_API_KEY_&maxResults=50
            // Get API key from API Console.
            gapi.client.init({
                'apiKey': $key,
                'discoveryDocs': $discoveryDocs
            })
            .then(function() {
                // console.log('2. client loaded');
                
                // For each video carousel on the page, build the collection, download images, and draw HTML.
                $(".yt-carousel").each(function(i) {
                    var $this = $(this);
                    var $playlistId = $this.attr("data-playlist-id");
                    var $carouselTitle = $this.find('h4').text();
            
                    // console.log('3. BEGIN retrieiving playlist items data (' + i + ')');
                    // Get the list of items...
                    gapi.client.youtube.playlistItems.list({
                        playlistId: $playlistId,
                        part: 'snippet',
                        maxResults: 50
                    })
                    // ...then build the HTML
                    .then(function(data) {

                        // console.log('4. END retrieiving playlist items data (' + i + ')');
                        // console.log('5. BEGIN enhancement to draw HTML from items (' + i + ')');
                        // Get total number of YouTube video items, maxed out at 50
                        var $count = data.result.pageInfo.totalResults;
                        if ($count > 50) {
                            $count = 50;
                        }
                        $this.find('.yt-carousel-count').text($count + ' Videos');

                        // Initialize the selected player with the first item in the playlist
                        var $initialID = data.result.items[0].snippet.resourceId.videoId;
                        var $initialTitle = data.result.items[0].snippet.title;
                        drawSelectedVideoMobile($initialID, $initialTitle, $this, 0, $count);
                        
                        // Draw the carousel thumbnails
                        $.each(data.result.items, function(j, item) {
                            $vid = item.snippet.resourceId.videoId;
                            $title = item.snippet.title;
                            $this.find('.yt-carousel-thumbs').append('<div class="ytc-thumb-container"><a class="yt-carousel-thumb" id="' + 
                                $vid + '"><img src="https://i.ytimg.com/vi/' +
                                $vid + '/mqdefault.jpg" alt="' +
                                $title + '"></a><span>' +
                                $title + '</span></div>'
                            );
                        });

                        // JS snippets for YouTube playlist carousel 
                        // Draw slick slider for YT thumbnails
                        $this.find('.yt-carousel-thumbs').slick({
                            infinite: true,
                            slidesToShow: 3,
                            slidesToScroll: 3
                            // TODO: find workaround for responsive bug
                            // https://github.com/kenwheeler/slick/issues/542
                            // ,responsive: [
                            // {
                            //   breakpoint: 860,
                            //   settings: {
                            //     slidesToShow: 2,
                            //     slidesToScroll: 2
                            //   }
                            // }]
                        });

                        // Script for custom arrows
                        $this.find('.yt-carousel-arrows .previous').click(function() {
                            $this.find('.yt-carousel-thumbs').slick("slickPrev");
                        });
                        $this.find('.yt-carousel-arrows .next').click(function() {
                            $this.find('.yt-carousel-thumbs').slick("slickNext");
                        });

                        // Change the video on carousel click
                        $this.find('.slick-current .yt-carousel-thumb').first().addClass('ytc-clicked');
                        $this.find('.yt-carousel-thumb').click(function() {
                            var $th = $(this);

                            // Add 'ytc-clicked' class to thumbnail for selected item styling
                            $this.find('.ytc-clicked').removeClass('ytc-clicked');
                            $th.addClass('ytc-clicked'); 

                            // Get data from clicked thumnail and pass to draw function
                            var $thumbIndex = $th.closest('.slick-slide').attr('data-slick-index');
                            var $thumbVideoTitle = $th.text();
                            var $thumbVideoID = $th.attr('id');
                            if($thumbVideoID.length < 1) {
                                // For cases where slick does not clone the thumbnail link ID
                                var $img = $th.find('img').attr('src');
                                $thumbVideoID = $img.split('/')[4];
                            }
                            drawSelectedVideoMobile($thumbVideoID, $thumbVideoTitle, $this, $thumbIndex, $count);

                            // Trigger analytics
                            doCarouselAnalytics($this, $carouselTitle, 'click',  $thumbIndex);
                        });

                        // Change the video upon mobile next arrow click
                        $this.find('.yt-carousel-arrows .m-previous').click(function() {
                            $indexPcurr = $this.find('.flex-video').attr('ytc-index');
                            $indexPrev = --$indexPcurr;
                            if ($indexPrev < 0) {
                                $indexPrev = ($count - 1);
                            }
                            $selPrev = $this.find(".slick-slide[data-slick-index='" + $indexPrev + "']");
                            $idPrev = $selPrev.find('.yt-carousel-thumb').attr('id');
                            $titlePrev = $selPrev.text();
                            drawSelectedVideoMobile($idPrev, $titlePrev, $this, $indexPrev, $count);
                            doCarouselAnalytics($this, $carouselTitle, 'swipe',  $indexPrev);
                        });

                        // Change the video upon mobile previous arrow click
                        $this.find('.yt-carousel-arrows .m-next').click(function() {
                            $indexNcurr = $this.find('.flex-video').attr('ytc-index');
                            $indexNext = ++$indexNcurr;
                            if ($indexNext > ($count - 1)) {
                                $indexNext = 0;
                            }
                            $selNext = $this.find(".slick-slide[data-slick-index='" + $indexNext + "']");
                            $idNext = $selNext.find('.yt-carousel-thumb').attr('id');
                            $titleNext = $selNext.text();
                            drawSelectedVideoMobile($idNext, $titleNext, $this, $indexNext, $count);
                            doCarouselAnalytics($this, $carouselTitle, 'swipe',  $indexNext);
                        });
                        // console.log('6. END enhancement to draw HTML from items (' + i + ')');
                    })
                })
            });
            
            // // If we're inside a collapsed accordion, do a refresh of the slick carousel's position. 
            // // This is a fix for slick image initialization error. 
            // $('.yt-carousel-thumbs').closest('section').click(function() {
            //     $('.yt-carousel-thumbs').slick('setPosition');
            // }); 

    }

    /**
     * Draw HTML elements for mobile view only, then render the selected video
     * @param {any} $vidID
     * @param {any} $el 
     */
    function drawSelectedVideoMobile($vidID, $vidTitle, $el, $index, $total) {
        var $pager = $el.find('.yt-carousel-pager');
        var $pos = 1 + parseInt($index);
        $pager.text($pos + "/" + $total);
        drawSelectedVideo($vidID, $vidTitle, $el, $index);
    }

    /**
     * Update flex-video selector attributes with a new video ID, then render the selected video
     * @param {any} $vidID 
     * @param {any} $el 
     */
    function drawSelectedVideo($vidID, $vidTitle, $el, $index) {
        // Replace all instances of the YouTube video ID within the <figure> element
        var $selectedVideo = $el.find('.yt-carousel-selected .flex-video');
        $selectedVideo.attr('id', 'ytplayer-' + $vidID);
        $selectedVideo.attr('data-video-id', $vidID);
        $selectedVideo.attr('data-video-title', $vidTitle);
        $selectedVideo.attr('ytc-index', $index);
        $selectedVideo.find('noscript a').attr('href', 'https://www.youtube.com/watch?v=' + $vidID);
        $selectedVideo.find('noscript a').attr('title', $vidTitle);

        // Rebuild the YouTube embedded video from the updated flex-video element
        // flexVideo.init() enables the embedding of YouTube videos and playlists as iframes.
        (function() {
            flexVideo.init();
        })();
    }

    /**
     * Track analytics for click events on video carousel items.
     * @param {any} sender 
     * @param {any} title 
     * @param {any} action 
     * @param {any} index 
     */
    function doCarouselAnalytics(sender, title, action, index){
        if(typeof(NCIAnalytics !== 'undefined')) {
            var safeTitle = title;
            if(title.length > 50) {
                safeTitle = title.substring(0,50);
            }
            var value = 'vidcar_' + safeTitle + '_' + action + '_' + index;
            NCIAnalytics.VideoCarouselClickSwipe(sender, value); 
        }
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