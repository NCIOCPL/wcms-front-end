define(function(require) {
    var $ = require('jquery');
    require('slick-carousel');
    require('Modules/carousel/slick-patch');
    var flexVideo = require('Modules/videoPlayer/flexVideo');
    var AdobeAnalytics = require('Patches/AdobeAnalytics');

    function _initialize() {    
        //custom function showing current slide
        var $status = $('.pagingInfo');
        var $slickElement = $('.slider');

        $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + '/' + slick.slideCount);
        });

        // Script for carousel
        $(function() {
            $('.slider').each(function(i, el) {
                var $slickEl = $(el).slick({
                    lazyLoad: 'ondemand',
                    arrows: true,
                    slidesToShow: 1,
                    previewMode: true,
                    centerItems: true,
                    slidesToScroll: 1,
                    speed: 500,
                    dots: false,
                    //customPaging: function(slider,index){return index + ' of ' + slider.slideCount;},
                    customPaging : function(slider, i) {
                        var thumb = $(slider.$slides[i]).data();
                        return '<a>'+i+'</a>'; },
                    responsive: [
                        //alter breakpoint settings for image carousel
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 1,
                                speed: 1000,
                                slidesToScroll: 1
                            }
                        },

                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                speed: 700,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                speed: 500,
                                slidesToScroll: 1
                            }
                        }
                    ]
                })

                // Script for custom arrows
                // NOTE: The slick library comes with arrows, but they are pre-styled
                // and they go after the carousel. Front End Devs can decide if they'd
                // rather style the old ones or edit the HTML of the new ones, but
                // make sure to change arrow setting in .slick() declaration
                $('.ic-controls .previous').click(function() {
                    $('.slider').slick("slickPrev");
                });
                $('.ic-controls .next').click(function() {
                    $('.slider').slick("slickNext");
                });
            });
        });



        $('.slider').closest('section').click(function() {
			$('.slider').slick('setPosition');
        });

        /*// Set variable for analytics functions
        var pageName = 'www.cancer.gov/';
		var s = AdobeAnalytics.getSObject();
        if(typeof(s) !== 'undefined') {
            pageName = s.pageName;
        }

        var imgNum = $('.slider').find('.slick-active').data('slick-index');
        console.log("before click/swipe index: " + imgNum);

        // Record analytics on clicks of arrows in carousel
        $('.arrows-for-ic-carousel button').on('click', (function() {
            var $this = $(this);
            var title = $this.closest('#ic').find('.ic-carousel-title h4').text();
            var direction = $this.attr('class');
            imgNum = $('.slider').find('.slick-active').data('slick-index');
            console.log("after click/swipe index: " + imgNum);
            
            NCIAnalytics.ImageCarouselClickSwipe($this, title, "click", direction, imgNum, pageName);
            })
        );

        // Record analytics on left or right swipes on carousel
        $('.slider').on('swipe', function(event, slick, direction) {
            var $this = $(this);
            var title = $this.closest('#ic').find('.ic-carousel-title h4').text();
            imgNum = $('.slider').find('.slick-active').data('slick-index');
            console.log("after click/swipe index: " + imgNum);
            NCIAnalytics.ImageCarouselClickSwipe($this, title, "swipe", direction, imgNum, pageName);
        });*/
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