define(function(require) {
    var $ = require('jquery');
    var FlexVideoAPI = require('Modules/videoPlayer/flex-video-api');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    require('Vendor/google-apis/js/api');

    /***
     * This snippet uses the slick library to dynamically draw a clickable image carousel based on the playlist ID. 
     * The client should only be loaded if this page contains the YouTube carousel HTML snippet.
     *
     * TODO: - handle initial loading screen
     *       - convert to .ts and refactor
     *       - auto-start videos?
     * 
     **/
    function _initialize(key) {
        if($('.yt-carousel').length) {
            handleClientLoad(key);
        }
    }

    /**
     * Load the API's client.
     */
    function handleClientLoad(key) {
        gapi.load('client', {
            callback: function() { 
                // Handle gapi.client initialization.
                if(typeof(key) == 'undefined') {
                    console.log('No API key provided for carousel initialization.');
                } else {
                    initClient(key);
                }
            },
            onerror: function() {
               // Handle loading error.
                console.log('Google api.js failed to load.');
            },
            timeout: 5000, // 5 seconds.
            ontimeout: function() {
                // Handle timeout.
                console.log('Google api.js did not load in a timely manner.');
            }
        });
    }

    /**
     * Initialize the API client and draw HTML
     */
    function initClient(key) {
            
            // YouTube API address & params
            // TODO: see if we can do without discoveryDocs
            var $key = key; 
            var $discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']

            // Initialize the gapi.client object, which app uses to make API requests.
            // API URL pattern: googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=_MY_PLAYLIST_ID_&key=_MY_GOOLE_API_KEY_&maxResults=50
            // Get API key from API Console.
            gapi.client.init({
                'apiKey': $key,
                'discoveryDocs': $discoveryDocs
            })
            .then(function() {
                // For each video carousel on the page, build the collection, download images, and draw HTML.
                $(".yt-carousel").each(function(i) {

                    var $this = $(this);
                    var $playlistId = $this.attr("data-playlist-id");
                    var $carouselTitle = $this.find('h4').text();
            
                    // Draw the containers for the carousel thumbnails and arrows
                    appendCarouselControls($this);

                    // Get the list of items...
                    gapi.client.youtube.playlistItems.list({
                        playlistId: $playlistId,
                        part: 'snippet',
                        maxResults: 50
                    })
                    // ...then build the HTML
                    .then(function(data) {
                        // Create vars for commonly used selectors
                        var $carouselThumbs = $this.find('.yt-carousel-thumbs');                        

                        // Get total number of YouTube video items, maxed out at 50
                        var $count = data.result.pageInfo.totalResults;
                        if ($count > 50) {
                            $count = 50;
                        }

                        // Draw the total count; hide the desktop arrows if there are 3 or less videos
                        $this.find('.yt-carousel-count').text($count + ' Videos');
                        if ($count <= 3) {
                            $this.find('.yt-carousel-controls button').addClass('hidden');
                        }

                        // Initialize the selected player with the first item in the playlist
                        var $initialID = data.result.items[0].snippet.resourceId.videoId;
                        var $initialTitle = data.result.items[0].snippet.title;
                        drawSelectedVideo($initialID, $initialTitle, $this, 0, $count);

                        // Draw the carousel thumbnails
                        $.each(data.result.items, function(j, item) {
                            $vid = item.snippet.resourceId.videoId;
                            $title = item.snippet.title;
                            appendCarouselThumbnails($carouselThumbs, $vid, $title);
                        });

                        // JS snippets for YouTube playlist carousel 
                        createSlickCarousel($this, $carouselThumbs);

                        // Change the video on carousel click
                        $this.find('.slick-current .yt-carousel-thumb').first().addClass('ytc-clicked'); // init selector
                        $this.find('.yt-carousel-thumb').click(function() {
                            var $thumb = $(this);                            
                            doThumbClickActions($this, $thumb, $count, $carouselTitle);
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
                            drawSelectedVideo($idPrev, $titlePrev, $this, $indexPrev, $count);
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
                            drawSelectedVideo($idNext, $titleNext, $this, $indexNext, $count);
                            doCarouselAnalytics($this, $carouselTitle, 'swipe',  $indexNext);
                        });
                        
                    }) // end HTML drawing
                }) // end yt-carousel.each()
            }); // end .then() after client init
            
            // // If we're inside a collapsed accordion, do a refresh of the slick carousel's position. 
            // // This is a fix for slick image initialization error. 
            // $('.yt-carousel-thumbs').closest('section').click(function() {
            //     $('.yt-carousel-thumbs').slick('setPosition');
            // }); 
    }


    /**
     * Draw a carousel thumbnail element & attributes
     * @param {any} $item 
     * @param {any} $id 
     * @param {any} $title 
     */
    function appendCarouselThumbnails($item, $id, $title) {
        var $thumbBlob = '<div class="ytc-thumb-container">' +
                           '<a class="yt-carousel-thumb" id="' + $id + '">' + 
                             '<img src="https://i.ytimg.com/vi/' + $id + '/mqdefault.jpg" alt="' + $title + '">' + 
                           '</a>' +
                           '<span>' + $title + '</span>' + 
                         '</div>'
        $item.append($thumbBlob);
    }

    /**
     * Draw the containers for the carousel thumbnails and arrows
     * TODO: hide arrows if < 4 items
     * @param {any} $el 
     */
    function appendCarouselControls($el) {
        var $prev = 'previous';
        var $next = 'next';
        if($('.yt-carousel.ytc-spanish').length) {
            $prev = 'anterior';    
            $next = 'siguiente';
        }

        var $countBlob = '<p class="yt-carousel-count"></p>';
        var $carouselControls = '<div class="row yt-carousel-controls">' + 
                                '<div class="yt-carousel-thumbs columns small-10"></div>' +
                                '<div class="yt-carousel-arrows columns small-2">' +
                                  '<button class="previous" type="button" value="' + $prev + '" alt="' + $prev + '"></button>' + 
                                  '<button class="next" type="button" value="'+ $next +'" alt="'+ $next +'"></button>' + 
                                '</div>' + 
                              '</div>';
        var $mobileControls = '<div class="row yt-carousel-m-controls">' + 
                                '<div class="yt-carousel-pager columns small-9"></div>' + 
                                '<div class="yt-carousel-arrows columns small-3">' + 
                                  '<button class="m-previous" type="button" value="' + $prev + '" alt="' + $prev + '"></button>' + 
                                  '<button class="m-next" type="button" value="'+ $next +'" alt="'+ $next +'"></button>' + 
                                '</div>' +
                              '</div>';

        $el.find('h4').after($countBlob);
        $el.append($carouselControls + $mobileControls);
    }


    /**
     * Update flex-video selector attributes with a new video ID, then draw the selected video, mobile elements, and
     * fire off onstatechanged events 
     * @param {any} $vidID 
     * @param {any} $vidTitle 
     * @param {any} $el 
     * @param {any} $index 
     * @param {any} $total 
     */
    function drawSelectedVideo($vidID, $vidTitle, $el, $index, $total) {
        // Replace all instances of the YouTube video ID within the <figure> element
        var $selectedVideo = $el.find('.yt-carousel-selected .flex-video');
        $selectedVideo.attr('id', 'ytplayer-' + $vidID);
        $selectedVideo.attr('data-video-id', $vidID);
        $selectedVideo.attr('data-video-title', $vidTitle);
        $selectedVideo.attr('ytc-index', $index);
        $selectedVideo.find('noscript a').attr('href', 'https://www.youtube.com/watch?v=' + $vidID);
        $selectedVideo.find('noscript a').attr('title', $vidTitle);

        // Draw mobile HTML elements 
        var $pager = $el.find('.yt-carousel-pager');
        var $pos = 1 + parseInt($index);
        $pager.text($pos + "/" + $total);

        // Rebuild the YouTube embedded video from the updated flex-video element, then draw the player.
        // FlexVideoAPI.init() enables the embedding of YouTube videos and playlists as iframes.
        $selectedVideo.children('iframe').remove();
        FlexVideoAPI.init();

        //************ Begin YouTube API onPlayer functions  ************//        
        /**
         * The API will call this function when the page has finished downloading the JavaScript for the player API, 
         * which enables us to then use the API on the page
         */
        //var player;        
        function onYouTubeIframeAPIReady() {
            new YT.Player('flex-video-api', {
                events : {
                    'onReady' : onPlayerReady,
                    'onStateChange' : onPlayerStateChange
                }
            })
        }

        // Function to execute when the onReady event fires
        function onPlayerReady() {
            // If we want to fire off anything when the player is ready, add it here
        }

        // Call the onPlayerStateChange function when the player's state changes, which may indicate that the player is playing, paused, finished, etc
        function onPlayerStateChange(e) {
            if(e.data == 0) {
                $indexNcurr = $el.find('.flex-video').attr('ytc-index');
                $indexNext = ++$indexNcurr;
                if($indexNext <= ($total - 1)) {
                    $selNext = $el.find(".slick-slide[data-slick-index='" + $indexNext + "']");
                    $idNext = $selNext.find('.yt-carousel-thumb').attr('id');
                    $titleNext = $selNext.text();
                    drawSelectedVideo($idNext, $titleNext, $el, $indexNext, $total);
                    doCarouselAnalytics($el, $titleNext, 'swipe',  $indexNext);
                }
            }
        }

        // Initialize
        onYouTubeIframeAPIReady();
        //************ End YouTube API onPlayer functions  ************//
    }
    
    /**
     * slick-carousel calls to draw the YouTube playlist carousel 
     * @param {any} $el 
     * @param {any} $item 
     */
    function createSlickCarousel($el, $item){
        // Draw slick slider for YT thumbnails
        $item.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
            // TODO: find workaround for responsive bug
            // https://github.com/kenwheeler/slick/issues/542
        });

        // Script for custom arrows
        $el.find('.yt-carousel-arrows .previous').click(function() {
            $item.slick("slickPrev");
        });
        $el.find('.yt-carousel-arrows .next').click(function() {
            $item.slick("slickNext");
        });
    }


    /**
     * Track analytics for click events on video carousel items.
     * @param {any} sender 
     * @param {any} title 
     * @param {any} action 
     * @param {any} index 
     */
    function doThumbClickActions($el, $thumb, $total, $title){
        // Add 'ytc-clicked' class to thumbnail for selected item styling
        $el.find('.ytc-clicked').removeClass('ytc-clicked');
        $thumb.addClass('ytc-clicked'); 

        // Get data from clicked thumnail and pass to draw function
        var $thumbIndex = $thumb.closest('.slick-slide').attr('data-slick-index');
        var $thumbVideoTitle = $thumb.text();
        var $thumbVideoID = $thumb.attr('id');
        if($thumbVideoID.length < 1) {
            // For cases where slick does not clone the thumbnail link ID
            var $img = $thumb.find('img').attr('src');
            $thumbVideoID = $img.split('/')[4];
        }
        drawSelectedVideo($thumbVideoID, $thumbVideoTitle, $el, $thumbIndex, $total);
        doCarouselAnalytics($el, $title, 'click',  $thumbIndex);
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
        },
        apiInit: function(key) {
            if (initialized) {
                return;
            }

            _initialize(key);
            initialized = true;
        }
    };
});